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
  let humidity = document.querySelector("#current-humidity");
  let currentHumidity = Math.round(response.data.main.humidity);
  let wind = document.querySelector("#current-wind");
  let currentWind = Math.round(response.data.wind.speed);
  let description = document.querySelector("#description-weather");
  let currentCondition = response.data.weather[0].main;
  city.innerHTML = response.data.name;
  temperature.innerHTML = `${currentTemp}°`;
  humidity.innerHTML = `humidity ${currentHumidity}%`;
  wind.innerHTML = `wind ${currentWind} km/h`;
  description.innerHTML = currentCondition;
}

function searchCity(event) {
  event.preventDefault();
  let searchingCity = document.querySelector(".search-city");
  let newCity = searchingCity.value;
  let apiKey = "61039ae35a3412a36af0f0851361b11a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityWeather);
}

function showCurrentWeather(location) {
  let latitude = location.coords.latitude;
  let longitude = location.coords.longitude;
  let apiKey = "61039ae35a3412a36af0f0851361b11a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityWeather);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showCurrentWeather);
}
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("submit", searchCity);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

let temperature = document.querySelector(".current-temperature");

let tempInCelsius = temperature.innerHTML;
let tempInFahrenheit = tempInCelsius * 1.8 + 32;

function temperatureToFahrenheit() {
  temperature.innerHTML = tempInFahrenheit;
}

function temperatureToCelsius() {
  temperature.innerHTML = tempInCelsius;
}
let fahrenheitUnit = document.querySelector("#btn-check-2-outlined");
let celsiusUnit = document.querySelector("#btn-check-outlined");
fahrenheitUnit.addEventListener("click", temperatureToFahrenheit);
celsiusUnit.addEventListener("click", temperatureToCelsius);
