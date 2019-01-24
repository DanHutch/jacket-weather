{
let weatherButton = document.querySelector('.weather-button');
let locationInput = document.querySelector('.location-field');

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
        this.setBoxOne(weatherResponse)
        this.setBoxTwo(weatherResponse)
        this.setBoxThree(weatherResponse)
      }
      else {
        alert("Please enter a valid location")
      }
    };
    xhr.open('GET', `https://infinite-badlands-14969.herokuapp.com/api/v1/forecast?location=${location}`);
    xhr.send();
  }

  setBoxOne(weatherInfo) {
    console.log(weatherInfo);
    let city = weatherInfo.city;
    let state = weatherInfo.state;
    let country = weatherInfo.country;
    let date_time = weatherInfo.date_time;
    let high = weatherInfo.high_temp;
    let low = weatherInfo.low_temp;
    let summary = weatherInfo.summary;
    let temp = weatherInfo.current_temp

  }

  setBoxTwo(weatherInfo) {
    let current_summary = weatherInfo.summary;
    let hourly_summary = weatherInfo.hourly_summary;
    let daily_summary = weatherInfo.daily_summary;
    let feels_like = weatherInfo.feels_like;
    let humidity = weatherInfo.humidity;
    let visibility = weatherInfo.visibility
    let uv_index = weatherInfo.uv_index

  }

  setBoxThree(weatherInfo) {
    let hourlyOneTime = weatherInfo.hourlies[0].time;
    let hourlyOneIcon = weatherInfo.hourlies[0].icon;
    let hourlyOneTemp = weatherInfo.hourlies[0].temperature;
    let hourlyTwoTime = weatherInfo.hourlies[1].time;
    let hourlyTwoIcon = weatherInfo.hourlies[1].icon;
    let hourlyTwoTemp = weatherInfo.hourlies[1].temperature;
    let hourlyThreeTime = weatherInfo.hourlies[2].time;
    let hourlyThreeIcon = weatherInfo.hourlies[2].icon;
    let hourlyThreeTemp = weatherInfo.hourlies[2].temperature;
    let hourlyFourTime = weatherInfo.hourlies[3].time;
    let hourlyFourIcon = weatherInfo.hourlies[3].icon;
    let hourlyFourTemp = weatherInfo.hourlies[3].temperature;
    let hourlyFiveTime = weatherInfo.hourlies[4].time;
    let hourlyFiveIcon = weatherInfo.hourlies[4].icon;
    let hourlyFiveTemp = weatherInfo.hourlies[4].temperature;
    let hourlySixTime = weatherInfo.hourlies[5].time;
    let hourlySixIcon = weatherInfo.hourlies[5].icon;
    let hourlySixTemp = weatherInfo.hourlies[5].temperature;
    let hourlySevenTime = weatherInfo.hourlies[6].time;
    let hourlySevenIcon = weatherInfo.hourlies[6].icon;
    let hourlySevenTemp = weatherInfo.hourlies[6].temperature;
    let hourlyEightTime = weatherInfo.hourlies[7].time;
    let hourlyEightIcon = weatherInfo.hourlies[7].icon;
    let hourlyEightTemp = weatherInfo.hourlies[7].temperature;
    let dailyOneSummary = weatherInfo.dailies[0].summary;
    let dailyOneSummaryIcon = weatherInfo.dailies[0].icon
    let dailyOnePrecipType = weatherInfo.dailies[0].precipType;
    let dailyOneHigh = weatherInfo.dailies[0].temperatureHigh;
    let dailyOneLow = weatherInfo.dailies[0].temperatureLow;
    let dailyTwoSummary = weatherInfo.dailies[1].summary;
    let dailyTwoSummaryIcon = weatherInfo.dailies[1].icon
    let dailyTwoPrecipType = weatherInfo.dailies[1].precipType;
    let dailyTwoHigh = weatherInfo.dailies[1].temperatureHigh;
    let dailyTwoLow = weatherInfo.dailies[1].temperatureLow;
    let dailyThreeSummary = weatherInfo.dailies[2].summary;
    let dailyThreeSummaryIcon = weatherInfo.dailies[2].icon
    let dailyThreePrecipType = weatherInfo.dailies[2].precipType;
    let dailyThreeHigh = weatherInfo.dailies[2].temperatureHigh;
    let dailyThreeLow = weatherInfo.dailies[2].temperatureLow;
    let dailyFourSummary = weatherInfo.dailies[3].summary;
    let dailyFourSummaryIcon = weatherInfo.dailies[3].icon
    let dailyFourPrecipType = weatherInfo.dailies[3].precipType;
    let dailyFourHigh = weatherInfo.dailies[3].temperatureHigh;
    let dailyFourLow = weatherInfo.dailies[3].temperatureLow;
    let dailyFiveSummary = weatherInfo.dailies[4].summary;
    let dailyFiveSummaryIcon = weatherInfo.dailies[4].icon
    let dailyFivePrecipType = weatherInfo.dailies[4].precipType;
    let dailyFiveHigh = weatherInfo.dailies[4].temperatureHigh;
    let dailyFiveLow = weatherInfo.dailies[4].temperatureLow;

  }

  // getWeather(place) {
  //   fetch(this.url + `location=${place}`)
  //   .then(response => response.json())
  //   .then(weatherData => this.weatherData = weatherData.data.attributes)
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
locationInput.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    weatherButton.click();
  }
})
weatherButton.addEventListener('click', getAndSetWeather);
}
