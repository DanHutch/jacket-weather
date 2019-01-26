{
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

  getWeather(location) {
    let xhr = new XMLHttpRequest();
    // let location = locationInput.value;
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
    console.log(weatherInfo);
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

function getAndSetWeather() {
  weather = new WeatherGetter;
  weather.getWeather(locationInput.value);
}

locationInput.addEventListener('keyup', checkGetWeatherActive);
locationInput.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    weatherButton.click();
  }
})
weatherButton.addEventListener('click', getAndSetWeather);
}
