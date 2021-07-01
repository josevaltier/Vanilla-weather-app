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
  celsiusTemp = response.data.main.temp;
  celsiusMaxTemp = response.data.main.temp_max;
  celsiusMinTemp = response.data.main.temp_min;
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

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  let maxTempElement = document.querySelector("#max-temp");
  let maxFahTemp = (celsiusMaxTemp * 9) / 5 + 32;
  let minTempElement = document.querySelector("#min-temp");
  let minFahTemp = (celsiusMinTemp * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  maxTempElement.innerHTML = Math.round(maxFahTemp);
  minTempElement.innerHTML = Math.round(minFahTemp);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let maxTempElement = document.querySelector("#max-temp");
  let minTempElement = document.querySelector("#min-temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  maxTempElement.innerHTML = Math.round(celsiusMaxTemp);
  minTempElement.innerHTML = Math.round(celsiusMinTemp);
}

function searchCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "ff39a1560b2a6b58581393d9865ab25f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

let celsiusTemp = null;
let celsiusMaxTemp = null;
let celsiusMinTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmittedCity);

let locateMeButton = document.querySelector("#locate-me-button");
locateMeButton.addEventListener("click", searchCurrentLocation);

searchCity("London");
