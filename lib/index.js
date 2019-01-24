let weatherButton = document.querySelector('.weather-button');
let locationInput = document.querySelector('.location-field');
let item3 = document.querySelector('.item3')

class WeatherGetter {

  constructor() {
    this.weatherData = null;

  }

  // let weatherData = null;

  checkGetWeatherActive() {
    if (locationInput.value !== "") {
      weatherButton.disabled = false;
      weatherButton.classList.add("active");
    }
    else {
      weatherButton.disabled = true;
      weatherButton.classList.remove("active");
    }
  }

  tryWeather() {
    getWeather(locationInput.value);
  }

  pageWriter() {
    debugger;
    item3.innerHTML = weather_data.city
  }

  getWeather() {
    let xhr = new XMLHttpRequest();
    let location = locationInput.value;

    xhr.onload = () => {
      if(xhr.status >= 200 && xhr.status < 300) {
        this.weatherData = JSON.parse(xhr.response)["data"]["attributes"];
        console.log(this.weatherData);
        debugger;
        pageWriter();
      }
      else {
        alert("Please enter a valid location")
        console.log(location)
        console.log('The request failed!');
      }
    };

    xhr.open('GET', `https://infinite-badlands-14969.herokuapp.com/api/v1/forecast?location=${location}`);
    xhr.send();

  }

}

weather = new WeatherGetter
weatherResults = weather.weatherData
locationInput.addEventListener('keyup', weather.checkGetWeatherActive);
weatherButton.addEventListener('click', weather.getWeather);
