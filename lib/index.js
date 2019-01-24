{
let weatherButton = document.querySelector('.weather-button');
let locationInput = document.querySelector('.location-field');
let weatherData = null;

class WeatherGetter {

  constructor() {
    this.url = `https://infinite-badlands-14969.herokuapp.com/api/v1/forecast?`
    this.weatherData = null;
  }

  getWeather() {
    let xhr = new XMLHttpRequest();
    let location = locationInput.value;
    xhr.onload = () => {
      if(xhr.status >= 200 && xhr.status < 300) {
        let weatherResponse = JSON.parse(xhr.response)["data"]["attributes"];
        this.setWeather(weatherResponse)
      }
      else {
        alert("Please enter a valid location")
      }
    };
    xhr.open('GET', `https://infinite-badlands-14969.herokuapp.com/api/v1/forecast?location=${location}`);
    xhr.send();
  }

  setWeather(weatherInfo) {
    console.log(weatherInfo);
  }

  // getWeather(place) {
  //   fetch(this.url + `location=${place}`)
  //   .then(response => response.json())
  //   .then(weatherData => this.weatherData = weatherData.data.attributes)
  //   debugger;
  //   // .then(weather => this.setWeather(weather))
  // }

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
  weather.getWeather();
  // weather.setWeather(weatherData);
  // weather.setWeather(locationInput.value);
}

locationInput.addEventListener('keyup', checkGetWeatherActive);
weatherButton.addEventListener('click', getAndSetWeather);
}
