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

  mainTemp.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityValue.innerHTML = response.data.main.humidity;
  windValue.innerHTML = Math.round(response.data.wind.speed);
  minimumTemperature.innerHTML = Math.round(response.data.main.temp_min);
  maximumTemperature.innerHTML = Math.round(response.data.main.temp_max);
  dateElement.innerHTML = currentDate(response.data.dt * 1000);
}

let apiKey = "ff39a1560b2a6b58581393d9865ab25f";

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature).then(currentDate);
