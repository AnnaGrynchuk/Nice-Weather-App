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
  let currentTemp = Math.round(response.data.temperature.current);
  let humidity = document.querySelector("#current-humidity");
  let currentHumidity = Math.round(response.data.temperature.humidity);
  let wind = document.querySelector("#current-wind");
  let currentWind = Math.round(response.data.wind.speed);
  let description = document.querySelector("#description-weather");
  let currentCondition = response.data.condition.description;
  let icon = document.querySelector("#icon");

  city.innerHTML = response.data.city;
  temperature.innerHTML = `${currentTemp} <sup class="celsius">°C</sup>`;
  humidity.innerHTML = `humidity ${currentHumidity}%`;
  wind.innerHTML = `wind ${currentWind} km/h`;
  description.innerHTML = currentCondition;
  icon.setAttribute(
    "src",
    `${response.data.condition.icon_url}`
  );
  icon.setAttribute("alt", `${response.data.condition.icon}`);
  getForecast(response.data.city);
}

function searchCity(newCity) {
  let apiKey = "f0ef69o0e2435bt7a41ab3ca71f41430";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${newCity}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchingCity = document.querySelector(".search-city");
  searchCity(searchingCity.value);
}

function showCurrentWeather(location) {
  let latitude = location.coords.latitude;
  let longitude = location.coords.longitude;
  let apiKey = "f0ef69o0e2435bt7a41ab3ca71f41430";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentWeather);
}

function getForecast(newCity) {
  let apiKey = "f0ef69o0e2435bt7a41ab3ca71f41430";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${newCity}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[date.getDay()];
}

function showForecast(response) {
  let forecastDays = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastDays += ` <div class="col">
                          <div class="card forecast-card">
                             <div class="card-body">
                                <h5  class="forecast-day">${formatDay(day.time)}</h5>
                                <p class="card-text">
                                  <img  src="${day.condition.icon_url}" alt="${day.condition.icon}"/>
                                </p>
                              </div>
                             <div class="row row-cols-2 text-center ">
                                <div class="col temp-day">${Math.round(day.temperature.maximum)}°</div>
                                <div class="col temp-night">${Math.round(day.temperature.minimum)}°</div>
                             </div>  
                             <div class="forecast-description">${day.condition.description}</div>
                           </div>
                        </div>`
    }
  });
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastDays;
}

let searchButton = document.querySelector("#search-button");
let currentButton = document.querySelector("#current-button");
let temperatureInCelsius = null;
let fahrenheitUnit = document.querySelector("#btn-check-2-outlined");
let celsiusUnit = document.querySelector("#btn-check-outlined");

searchButton.addEventListener("submit", handleSearch);
currentButton.addEventListener("click", getCurrentLocation);

searchCity("Kyiv");
