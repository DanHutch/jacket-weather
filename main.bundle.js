/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	{
	  var checkGetWeatherActive = function checkGetWeatherActive() {
	    if (locationInput.value !== "") {
	      weatherButton.disabled = false;
	      weatherButton.classList.add("active");
	    } else {
	      weatherButton.disabled = true;
	      weatherButton.classList.remove("active");
	    }
	  };

	  var getAndSetWeather = function getAndSetWeather() {
	    weather = new WeatherGetter();
	    weather.getWeather(locationInput.value);
	  };

	  var weatherButton = document.querySelector('.weather-button');
	  var locationInput = document.querySelector('.location-field');
	  var timeBox = document.querySelector('.time-box');
	  var snapshotBox = document.querySelector('.snapshot-box');
	  var box1 = document.querySelector('.item1');
	  var hourlyBox = document.querySelector('.hourly-box');
	  var dailyBox = document.querySelector('.daily-box');

	  var WeatherGetter = function () {
	    function WeatherGetter() {
	      _classCallCheck(this, WeatherGetter);

	      this.url = 'https://infinite-badlands-14969.herokuapp.com/api/v1/forecast?';
	      this.weatherData = null;
	    }

	    _createClass(WeatherGetter, [{
	      key: 'getWeather',
	      value: function getWeather(location) {
	        var _this = this;

	        var xhr = new XMLHttpRequest();
	        // let location = locationInput.value;
	        xhr.onload = function () {
	          if (xhr.status >= 200 && xhr.status < 300) {
	            var weatherResponse = JSON.parse(xhr.response)["data"]["attributes"];
	            _this.setBoxOne(weatherResponse);
	            _this.setBoxTwo(weatherResponse);
	            _this.setBoxThree(weatherResponse);
	          } else {
	            alert("Please enter a valid location");
	          }
	        };
	        xhr.open('GET', 'https://infinite-badlands-14969.herokuapp.com/api/v1/forecast?location=' + location);
	        xhr.send();
	      }
	    }, {
	      key: 'formatDateAndTime',
	      value: function formatDateAndTime(dateTime) {
	        var _dateTime$split = dateTime.split(" "),
	            _dateTime$split2 = _slicedToArray(_dateTime$split, 5),
	            day = _dateTime$split2[0],
	            month = _dateTime$split2[1],
	            dayNum = _dateTime$split2[2],
	            year = _dateTime$split2[3],
	            time = _dateTime$split2[4];

	        var _time$split = time.split(":"),
	            _time$split2 = _slicedToArray(_time$split, 2),
	            hours = _time$split2[0],
	            minutes = _time$split2[1];

	        var standardTime = hours > 12 ? hours - 12 + ':' + minutes + 'pm' : hours + ':' + minutes + 'am';
	        return standardTime + ', ' + month + ' ' + dayNum;
	      }
	    }, {
	      key: 'setBoxOne',
	      value: function setBoxOne(weatherInfo) {
	        console.log(weatherInfo);
	        var city = weatherInfo.city;
	        var state = weatherInfo.state;
	        var country = weatherInfo.country;
	        var date_time = Date.parse(weatherInfo.date_time);
	        var formatted_date = this.formatDateAndTime(Date(date_time));
	        var high = weatherInfo.high_temp;
	        var low = weatherInfo.low_temp;
	        var summary = weatherInfo.summary;
	        var temp = weatherInfo.current_temp;

	        timeBox.innerHTML = '\n    <p class="city-state">' + city + ', ' + state + '</p>\n    <p class="country">' + country + '</p>\n    <p class="date-time">' + formatted_date + '</p>';

	        snapshotBox.innerHTML = '\n    <p class="snapshot-summary">' + summary + '</p>\n    <p class="current-temp-summary">' + (temp + '&deg') + '</p>\n    <p class="high-low">High: ' + (high + '&deg') + '  Low: ' + (low + '&deg') + '</p>\n    ';
	      }
	    }, {
	      key: 'setBoxTwo',
	      value: function setBoxTwo(weatherInfo) {
	        var current_summary = weatherInfo.summary;
	        var hourly_summary = weatherInfo.hourly_summary;
	        var daily_summary = weatherInfo.daily_summary;
	        var feels_like = weatherInfo.feels_like;
	        var humidity = weatherInfo.humidity;
	        var visibility = weatherInfo.visibility;
	        var uv_index = weatherInfo.uv_index;
	      }
	    }, {
	      key: 'setBoxThree',
	      value: function setBoxThree(weatherInfo) {

	        var hoursOnly = function hoursOnly(time) {
	          var dateTime = new Date(time * 1000);
	          var newTime = dateTime.toString().split(" ")[4];

	          var _newTime$split = newTime.split(":"),
	              _newTime$split2 = _slicedToArray(_newTime$split, 2),
	              hours = _newTime$split2[0],
	              minutes = _newTime$split2[1];

	          var standardTime = hours > 12 ? hours - 12 + ':' + minutes + 'pm' : hours + ':' + minutes + 'am';
	          return '' + standardTime;
	        };

	        var hourlyDivs = weatherInfo.hourlies.slice(0, 8).map(function (hourly) {
	          return '\n      <div class="hourly">\n        <p>' + hoursOnly(hourly.time) + '</p>\n        <p>' + hourly.icon + '<p>\n        <p>' + (hourly.temperature + '&deg') + '</p>\n      </div>';
	        });

	        var dailyDivs = weatherInfo.dailies.slice(0, 5).map(function (daily) {
	          return '\n      <div class="daily">\n        <div class="daily-element">' + daily.time + '</div>\n        <div class="daily-element"><p>' + daily.icon + '</p><p class="daily-summary">' + daily.summary + '</p></div>\n        <div class="daily-element"><p>' + daily.precipType + '</p><p>' + Math.round(daily.precipProbability * 100) + '%</p></div>\n        <div class="daily-element">' + daily.temperatureHigh + '</div>\n        <div class="daily-element">' + daily.temperatureLow + '</div>\n      </div>\n      ';
	        });

	        hourlyBox.innerHTML = hourlyDivs.join(" ");
	        dailyBox.innerHTML = dailyDivs.join(" ");
	      }

	      // getWeather(place) {
	      //   fetch(this.url + `location=${place}`)
	      //   .then(response => response.json())
	      //   .then(weatherData => this.weatherData = weatherData.data.attributes)
	      //   // .then(weather => this.setWeather(weather))
	      // }

	    }]);

	    return WeatherGetter;
	  }();

	  locationInput.addEventListener('keyup', checkGetWeatherActive);
	  locationInput.addEventListener('keypress', function (e) {
	    if (e.keyCode === 13) {
	      weatherButton.click();
	    }
	  });
	  weatherButton.addEventListener('click', getAndSetWeather);
	}

/***/ })
/******/ ]);