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
	    weather.getWeather();
	    // weather.setWeather(weatherData);
	    // weather.setWeather(locationInput.value);
	  };

	  var weatherButton = document.querySelector('.weather-button');
	  var locationInput = document.querySelector('.location-field');
	  var weatherData = null;

	  var WeatherGetter = function () {
	    function WeatherGetter() {
	      _classCallCheck(this, WeatherGetter);

	      this.url = 'https://infinite-badlands-14969.herokuapp.com/api/v1/forecast?';
	      this.weatherData = null;
	    }

	    _createClass(WeatherGetter, [{
	      key: 'getWeather',
	      value: function getWeather() {
	        var _this = this;

	        var xhr = new XMLHttpRequest();
	        var location = locationInput.value;
	        xhr.onload = function () {
	          if (xhr.status >= 200 && xhr.status < 300) {
	            var weatherResponse = JSON.parse(xhr.response)["data"]["attributes"];
	            _this.setWeather(weatherResponse);
	          } else {
	            alert("Please enter a valid location");
	          }
	        };
	        xhr.open('GET', 'https://infinite-badlands-14969.herokuapp.com/api/v1/forecast?location=' + location);
	        xhr.send();
	      }
	    }, {
	      key: 'setWeather',
	      value: function setWeather(weatherInfo) {
	        console.log(weatherInfo);
	      }

	      // getWeather(place) {
	      //   fetch(this.url + `location=${place}`)
	      //   .then(response => response.json())
	      //   .then(weatherData => this.weatherData = weatherData.data.attributes)
	      //   debugger;
	      //   // .then(weather => this.setWeather(weather))
	      // }

	    }]);

	    return WeatherGetter;
	  }();

	  locationInput.addEventListener('keyup', checkGetWeatherActive);
	  weatherButton.addEventListener('click', getAndSetWeather);
	}

/***/ })
/******/ ]);