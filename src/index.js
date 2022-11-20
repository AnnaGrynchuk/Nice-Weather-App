function showTime() {
  let currentDate = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${minutes}`;
  }
  let day = days[currentDate.getDay()];
  let date = document.querySelector("#current-date");
  date.innerHTML = `${day}  ${hours}:${minutes}`;
}
showTime();

function showCityWeather(response) {
  let city = document.querySelector(".current-city");
  let temperature = document.querySelector("#current-temp");
  let currentTemp = Math.round(response.data.main.temp);
  temperatureInCelsius = response.data.main.temp;
  let humidity = document.querySelector("#current-humidity");
  let currentHumidity = Math.round(response.data.main.humidity);
  let wind = document.querySelector("#current-wind");
  let currentWind = Math.round(response.data.wind.speed);
  let description = document.querySelector("#description-weather");
  let currentCondition = response.data.weather[0].main;
  let icon = document.querySelector("#icon");

  city.innerHTML = response.data.name;
  temperature.innerHTML = `${currentTemp}°`;
  humidity.innerHTML = `humidity ${currentHumidity}%`;
  wind.innerHTML = `wind ${currentWind} km/h`;
  description.innerHTML = currentCondition;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", `${response.data.weather[0].main}`);
}

function searchCity(newCity) {
  let apiKey = "61039ae35a3412a36af0f0851361b11a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let celsiusUnit = document.querySelector("#btn-check-outlined");
  if (celsiusUnit.checked == false) {
    celsiusUnit.checked = true;
  }
  let searchingCity = document.querySelector(".search-city");
  searchCity(searchingCity.value);
}

function showCurrentWeather(location) {
  let latitude = location.coords.latitude;
  let longitude = location.coords.longitude;
  let apiKey = "61039ae35a3412a36af0f0851361b11a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  let celsiusUnit = document.querySelector("#btn-check-outlined");
  if (celsiusUnit.checked == false) {
    celsiusUnit.checked = true;
  }
  navigator.geolocation.getCurrentPosition(showCurrentWeather);
}

function temperatureToFahrenheit() {
  let temperature = document.querySelector(".current-temperature");
  let temperatureInFahrenheit = temperatureInCelsius * 1.8 + 32;
  temperature.innerHTML = Math.round(temperatureInFahrenheit);
}

function temperatureToCelsius() {
  let temperature = document.querySelector(".current-temperature");
  temperature.innerHTML = Math.round(temperatureInCelsius);
}

let searchButton = document.querySelector("#search-button");
let currentButton = document.querySelector("#current-button");
let temperatureInCelsius = null;
let fahrenheitUnit = document.querySelector("#btn-check-2-outlined");
let celsiusUnit = document.querySelector("#btn-check-outlined");

searchButton.addEventListener("submit", handleSearch);
currentButton.addEventListener("click", getCurrentLocation);
fahrenheitUnit.addEventListener("click", temperatureToFahrenheit);
celsiusUnit.addEventListener("click", temperatureToCelsius);

searchCity("Kyiv");
