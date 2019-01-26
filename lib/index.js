{
  let loginEmail;
  let loginPassword;
  let loginButton;
  let registerButton;
  let logInLogOut = document.querySelector('.login-logout')
  let weatherButton = document.querySelector('.weather-button');
  let locationInput = document.querySelector('.location-field');
  let timeBox = document.querySelector('.time-box');
  let snapshotBox = document.querySelector('.snapshot-box');
  let box1 = document.querySelector('.item1');
  let hourlyBox = document.querySelector('.hourly-box');
  let dailyBox = document.querySelector('.daily-box');
  let dataBox = document.querySelector('.data-box');
  let glanceBox = document.querySelector('.at-a-glance-box');

  class WeatherGetter {

    constructor() {
      this.url = `https://infinite-badlands-14969.herokuapp.com/api/v1/forecast?`
      this.weatherData = null;
    }

    sendLogin(email, password) {
      let xhr = new XMLHttpRequest();
      let loginBody = JSON.stringify({ email: email, password: password})
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          let loginResponse = JSON.parse(xhr.response)["data"]["attributes"];
          sessionStorage.setItem("userKey", loginResponse.api_key);
          alert(`Hello, ${email}. Thank you for logging in!`);
          checkLoginActive();
          checkLogInLogOut();
        }
        else {
          alert("Login Failed. Please enter a valid user email and password.");
        }
      };
      xhr.open('POST', `https://infinite-badlands-14969.herokuapp.com/api/v1/sessions`);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        loginBody
      );
    }

    getWeather(location) {
      let xhr = new XMLHttpRequest();
      xhr.onload = () => {
        if(xhr.status >= 200 && xhr.status < 300) {
          let weatherResponse = JSON.parse(xhr.response)["data"]["attributes"];
          this.setBoxOne(weatherResponse);
          this.setBoxTwo(weatherResponse);
          this.setBoxThree(weatherResponse);
        }
        else {
          alert("Please enter a valid location");
        }
      };
      xhr.open('GET', `https://infinite-badlands-14969.herokuapp.com/api/v1/forecast?location=${location}`);
      xhr.send();
    }

    formatDateAndTime(dateTime) {
      let [day, month, dayNum, year, time] = dateTime.split(" ")
      let [hours, minutes] = time.split(":")
      let standardTime =  hours > 12 ? `${hours - 12}:${minutes}pm` : `${hours}:${minutes}am`
      return `${standardTime}, ${month} ${dayNum}`
      }

    setBoxOne(weatherInfo) {
      let city = weatherInfo.city;
      let state = weatherInfo.state;
      let country = weatherInfo.country;
      let date_time = Date.parse(weatherInfo.date_time);
      let formatted_date = this.formatDateAndTime(Date(date_time))
      let high = weatherInfo.high_temp;
      let low = weatherInfo.low_temp;
      let summary = weatherInfo.summary;
      let temp = weatherInfo.current_temp;

      timeBox.innerHTML = `
      <p class="city-state">${city}, ${state}</p>
      <p class="country">${country}</p>
      <p class="date-time">${formatted_date}</p>`

      snapshotBox.innerHTML = `
      <p class="snapshot-summary">${summary}</p>
      <p class="current-temp-summary">${temp + '&deg'}</p>
      <p class="high-low">High: ${high + '&deg'}  Low: ${low + '&deg'}</p>`
    }

    setBoxTwo(weatherInfo) {
      let current_summary = weatherInfo.summary;
      let hourly_summary = weatherInfo.hourly_summary;
      let daily_summary = weatherInfo.daily_summary;
      let feels_like = weatherInfo.feels_like;
      let humidity = weatherInfo.humidity;
      let visibility = weatherInfo.visibility;
      let uv_index = weatherInfo.uv_index;

      glanceBox.innerHTML = `
      <p class="current-summ">${current_summary}</p>
      <p class="now">Now: ${hourly_summary}</p>
      <p class="later">Later: ${daily_summary}</p>
      `;
      dataBox.innerHTML = `
      <p class="feels-like">Feels Like: ${feels_like + '&deg'}</p>
      <p class="humidity">Humidity: ${humidity}%</p>
      <p class="visibility">Visibility: ${visibility} miles</p>
      <p class="uv-index">UV Index: ${uv_index}</p>
      `
    }

    setBoxThree(weatherInfo) {

      let hoursOnly = (time) => {
        let dateTime = new Date (time * 1000);
        let newTime = (dateTime.toString().split(" "))[4];
        let [hours, minutes] = newTime.split(":");
        let standardTime = hours > 12 ? `${hours - 12}:${minutes}pm` : `${hours}:${minutes}am`;
        return `${standardTime}`;
      }

      let dayOnly = (time) => {
        let dateTime = new Date (time * 1000);
        let newTime = (dateTime.toString().split(" ") [0])
        return (newTime)
      }

      let hourlyDivs = weatherInfo.hourlies.slice(0, 8).map(function(hourly) {
        return (`
        <div class="hourly">
          <p>${hoursOnly(hourly.time)}</p>
          <p>${hourly.icon}<p>
          <p>${hourly.temperature + '&deg'}</p>
        </div>`)
      });

      let dailyDivs = weatherInfo.dailies.slice(0, 5).map(function(daily) {
        if(daily.precipType === undefined) {
          daily.precipType = "none"};

        return (`
        <div class="daily">
          <div class="daily-element">${dayOnly(daily.time)}</div>
          <div class="daily-element"><p>${daily.icon}</p><p class="daily-summary">${daily.summary}</p></div>
          <div class="daily-element"><p>${daily.precipType}</p><p>${Math.round(daily.precipProbability * 100)}%</p></div>
          <div class="daily-element">${daily.temperatureHigh + '&deg'}</div>
          <div class="daily-element">${daily.temperatureLow + '&deg'}</div>
        </div>
        `)
      });

      hourlyBox.innerHTML = hourlyDivs.join(" ");
      dailyBox.innerHTML = dailyDivs.join(" ");
    }
  }

  function checkGetWeatherActive() {
    if (locationInput.value !== "") {
      weatherButton.disabled = false;
      weatherButton.classList.add("active");
    }
    else {
      weatherButton.disabled = true;
      weatherButton.classList.remove("active");
    }
  }

  // function registerUser() {
  //   prompt("Please enter your details below")
  // }

  function checkLogInLogOut() {
    if(sessionStorage.getItem("userKey") !== null) {
      logInLogOut.innerHTML = `
      <button class="logout-button button">Log Out</button>`
      const logoutButton = document.querySelector('.logout-button');
      logoutButton.addEventListener('click', logOut);
    }
    else {
      logInLogOut.innerHTML = `
      <input class="login-email" type="text" placeholder="Email">
      <input class="login-password" type="text" placeholder="Password">
      <button class="login-button button" disabled>Log In</button>
`

      loginEmail = document.querySelector('.login-email');
      loginPassword = document.querySelector('.login-password');
      loginButton = document.querySelector('.login-button');
      // registerButton = document.querySelector('.register-button');
      // registerButton.addEventListener('click', registerUser);
      loginEmail.addEventListener('keyup', checkLoginActive);
      loginPassword.addEventListener('keyup', checkLoginActive);
      loginEmail.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
          loginButton.click();
        }
      });
      loginPassword.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
          loginButton.click();
        }
      });
      loginButton.addEventListener('click', sendLoginRequest);
    }
  }

  function checkLoginActive() {
    if (loginEmail.value !== "" && loginPassword.value !== "" && sessionStorage.getItem("userKey") == null) {
      loginButton.disabled = false;
      loginButton.classList.add("active");
    }
    else {
      loginButton.disabled = true;
      loginButton.classList.remove("active");
    }
  }

  function getAndSetWeather() {
    let weather = new WeatherGetter;
    weather.getWeather(locationInput.value);
  }


  function sendLoginRequest(){
    if(sessionStorage.getItem("userKey") !== null) {
      alert("Already logged in.")
    }
    else {
      let weather = new WeatherGetter;
      weather.sendLogin(loginEmail.value, loginPassword.value)
    }
  }

  function logOut() {
    sessionStorage.clear();
    alert("Successfully Logged Out.")
    checkLogInLogOut();
  }

  document.addEventListener('DOMContentLoaded', checkLogInLogOut)
  locationInput.addEventListener('keyup', checkGetWeatherActive);
  locationInput.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
      weatherButton.click();
    }
  });
  weatherButton.addEventListener('click', getAndSetWeather);

}
