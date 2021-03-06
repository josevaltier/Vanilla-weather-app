function currentDate(timestamp) {
  let now = new Date(timestamp);
  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  return `${day}, ${month} ${date} - ${hours}:${minutes}`;
}

function getForecast(coordinates) {
  let apiKey = "ff39a1560b2a6b58581393d9865ab25f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
         <div class="forecast-date"><strong>${formatForecastDate(
           forecastDay.dt
         )}</strong></div>
          <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png";
            alt=""
            class="forecast-icon"
          />
        
          <div class="forecast-temp">
          <span class="forecast-max"><strong>${Math.round(
            forecastDay.temp.max
          )}º</strong></span> <span class="forecast-min">${Math.round(
          forecastDay.temp.min
        )}º </span>
          </div>
      </div> 
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showTemperature(response) {
  let mainTemp = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityValue = document.querySelector("#humidityValue");
  let windValue = document.querySelector("#windSpeed");
  let minimumTemperature = document.querySelector("#min-temp");
  let maximumTemperature = document.querySelector("#max-temp");
  let dateElement = document.querySelector("#date");
  let descriptionIconElement = document.querySelector("#descriptionIcon");
  mainTemp.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityValue.innerHTML = response.data.main.humidity;
  windValue.innerHTML = Math.round(response.data.wind.speed);
  minimumTemperature.innerHTML = Math.round(response.data.main.temp_min);
  maximumTemperature.innerHTML = Math.round(response.data.main.temp_max);
  dateElement.innerHTML = currentDate(response.data.dt * 1000);
  descriptionIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  descriptionIconElement.setAttribute(
    "alt",
    response.data.weather[0].description
  );

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "ff39a1560b2a6b58581393d9865ab25f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature).then(currentDate);
}

function searchSubmittedCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

function searchCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "ff39a1560b2a6b58581393d9865ab25f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmittedCity);

let locateMeButton = document.querySelector("#locate-me-button");
locateMeButton.addEventListener("click", searchCurrentLocation);

searchCity("London");
