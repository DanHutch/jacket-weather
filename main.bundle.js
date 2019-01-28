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

	  // function registerUser() {
	  //   prompt("Please enter your details below")
	  // }

	  var checkLogInLogOut = function checkLogInLogOut() {
	    if (sessionStorage.getItem("userKey") !== null) {
	      logInLogOut.innerHTML = '\n      <p>Currently logged in as ' + sessionStorage.getItem("user_email") + '</p>\n      <button class="logout-button button">Log Out</button>';
	      var logoutButton = document.querySelector('.logout-button');
	      logoutButton.addEventListener('click', logOut);
	    } else {
	      logInLogOut.innerHTML = '\n      <input class="login-email" type="text" placeholder="Email">\n      <input class="login-password" type="text" placeholder="Password">\n      <button class="login-button button" disabled>Log In</button>\n';

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
	  };

	  var checkLoginActive = function checkLoginActive() {
	    if (loginEmail.value !== "" && loginPassword.value !== "" && sessionStorage.getItem("userKey") == null) {
	      loginButton.disabled = false;
	      loginButton.classList.add("active");
	    } else {
	      loginButton.disabled = true;
	      loginButton.classList.remove("active");
	    }
	  };

	  var getAndSetWeather = function getAndSetWeather() {
	    var weather = new WeatherGetter();
	    weather.getWeather(locationInput.value);
	  };

	  var getNewWeather = function getNewWeather(place) {
	    var weather = new WeatherGetter();
	    weather.getWeather(place);
	  };

	  var sendLoginRequest = function sendLoginRequest() {
	    if (sessionStorage.getItem("userKey") !== null) {
	      alert("Already logged in.");
	    } else {
	      var weather = new WeatherGetter();
	      weather.sendLogin(loginEmail.value, loginPassword.value);
	    }
	  };

	  var logOut = function logOut() {
	    sessionStorage.clear();
	    favDrop.innerHTML = "";
	    alert("Successfully Logged Out.");
	    checkLogInLogOut();
	  };

	  sessionStorage.clear();
	  var loginEmail = void 0;
	  var loginPassword = void 0;
	  var loginButton = void 0;
	  var registerButton = void 0;
	  var favSelector = void 0;
	  var logInLogOut = document.querySelector('.login-logout');
	  var weatherButton = document.querySelector('.weather-button');
	  var locationInput = document.querySelector('.location-field');
	  var timeBox = document.querySelector('.time-box');
	  var snapshotBox = document.querySelector('.snapshot-box');
	  var box1 = document.querySelector('.item1');
	  var hourlyBox = document.querySelector('.hourly-box');
	  var dailyBox = document.querySelector('.daily-box');
	  var dataBox = document.querySelector('.data-box');
	  var glanceBox = document.querySelector('.at-a-glance-box');
	  var favDrop = document.querySelector('.fav-bar-container');

	  var WeatherGetter = function () {
	    function WeatherGetter() {
	      _classCallCheck(this, WeatherGetter);

	      this.url = 'https://infinite-badlands-14969.herokuapp.com/api/v1/forecast?';
	      this.weatherData = null;
	    }

	    _createClass(WeatherGetter, [{
	      key: 'sendLogin',
	      value: function sendLogin(email, password) {
	        var _this = this;

	        var xhr = new XMLHttpRequest();
	        var loginBody = JSON.stringify({ email: email, password: password });
	        xhr.onload = function () {
	          if (xhr.status >= 200 && xhr.status < 300) {
	            sessionStorage.setItem("user_email", email);
	            var loginResponse = JSON.parse(xhr.response)["data"]["attributes"];
	            sessionStorage.setItem("userKey", loginResponse.api_key);
	            alert('Hello, ' + email + '. Thank you for logging in!');
	            _this.getFavorites();
	            checkLoginActive();
	            checkLogInLogOut();
	          } else {
	            alert("Login Failed. Please enter a valid user email and password.");
	          }
	        };
	        xhr.open('POST', 'https://infinite-badlands-14969.herokuapp.com/api/v1/sessions');
	        xhr.setRequestHeader("Content-Type", "application/json");
	        xhr.send(loginBody);
	      }
	    }, {
	      key: 'getFavorites',
	      value: function getFavorites() {
	        var _this2 = this;

	        var xhr = new XMLHttpRequest();
	        xhr.onload = function () {
	          if (xhr.status >= 200 && xhr.status < 300) {
	            var favoritesResponse = JSON.parse(xhr.response)["data"];
	            _this2.renderFavorites(favoritesResponse);
	          }
	        };
	        xhr.open('GET', 'https://infinite-badlands-14969.herokuapp.com/api/v1/favorites?api_key=' + sessionStorage.getItem("userKey"));
	        xhr.setRequestHeader("Content-Type", "application/json");
	        xhr.send();
	      }
	    }, {
	      key: 'renderFavorites',
	      value: function renderFavorites(responseData) {
	        var favLocations = responseData.map(function (fav) {
	          var location = fav.attributes.location;
	          return '\n          <option value="' + location + '">' + location + '</option>';
	        }).join(" ");
	        favDrop.innerHTML = '\n      <form class="favs">\n        <select class="fav-bar" name="Favorites">\n        <option value="" disabled selected>- Select Favorite Location-</option>\n        ' + favLocations + '\n        </select>\n      </form>';
	        favSelector = document.querySelector('.fav-bar');
	        favSelector.addEventListener('change', function (e) {
	          getNewWeather(e.target.value);
	        });
	      }
	    }, {
	      key: 'getWeather',
	      value: function getWeather(location) {
	        var _this3 = this;

	        var xhr = new XMLHttpRequest();
	        xhr.onload = function () {
	          if (xhr.status >= 200 && xhr.status < 300) {
	            var weatherResponse = JSON.parse(xhr.response)["data"]["attributes"];
	            _this3.setBoxOne(weatherResponse);
	            _this3.setBoxTwo(weatherResponse);
	            _this3.setBoxThree(weatherResponse);
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
	        var city = weatherInfo.city;
	        var state = weatherInfo.state;
	        var country = weatherInfo.country;
	        var date_time = Date.parse(weatherInfo.date_time);
	        var formatted_date = this.formatDateAndTime(Date(date_time));
	        var high = weatherInfo.high_temp;
	        var low = weatherInfo.low_temp;
	        var summary = weatherInfo.summary;
	        var temp = weatherInfo.current_temp;

	        timeBox.innerHTML = '\n      <p class="city-state">' + city + ', ' + state + '</p>\n      <p class="country">' + country + '</p>\n      <p class="date-time">' + formatted_date + '</p>';

	        snapshotBox.innerHTML = '\n      <p class="snapshot-summary">' + summary + '</p>\n      <p class="current-temp-summary">' + (temp + '&deg') + '</p>\n      <p class="high-low">High: ' + (high + '&deg') + '  Low: ' + (low + '&deg') + '</p>';
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

	        glanceBox.innerHTML = '\n      <p class="current-summ">' + current_summary + '</p>\n      <p class="now">Now: ' + hourly_summary + '</p>\n      <p class="later">Later: ' + daily_summary + '</p>\n      ';
	        dataBox.innerHTML = '\n      <p class="feels-like">Feels Like: ' + (feels_like + '&deg') + '</p>\n      <p class="humidity">Humidity: ' + humidity + '%</p>\n      <p class="visibility">Visibility: ' + visibility + ' miles</p>\n      <p class="uv-index">UV Index: ' + uv_index + '</p>\n      ';
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

	        var dayOnly = function dayOnly(time) {
	          var dateTime = new Date(time * 1000);
	          var newTime = dateTime.toString().split(" ")[0];
	          return newTime;
	        };

	        var hourlyDivs = weatherInfo.hourlies.slice(0, 8).map(function (hourly) {
	          return '\n        <div class="hourly">\n          <p>' + hoursOnly(hourly.time) + '</p>\n          <p>' + hourly.icon + '<p>\n          <p>' + (hourly.temperature + '&deg') + '</p>\n        </div>';
	        });

	        var dailyDivs = weatherInfo.dailies.slice(0, 5).map(function (daily) {
	          if (daily.precipType === undefined) {
	            daily.precipType = "none";
	          };

	          return '\n        <div class="daily">\n          <div class="daily-element">' + dayOnly(daily.time) + '</div>\n          <div class="daily-element"><p>' + daily.icon + '</p><p class="daily-summary">' + daily.summary + '</p></div>\n          <div class="daily-element"><p>' + daily.precipType + '</p><p>' + Math.round(daily.precipProbability * 100) + '%</p></div>\n          <div class="daily-element">' + (daily.temperatureHigh + '&deg') + '</div>\n          <div class="daily-element">' + (daily.temperatureLow + '&deg') + '</div>\n        </div>\n        ';
	        });

	        hourlyBox.innerHTML = hourlyDivs.join(" ");
	        dailyBox.innerHTML = dailyDivs.join(" ");
	      }
	    }]);

	    return WeatherGetter;
	  }();

	  document.addEventListener('DOMContentLoaded', checkLogInLogOut);
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