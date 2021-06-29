function showTemperature(response) {
  console.log(response);
  let mainTemp = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityValue = document.querySelector("#humidityValue");
  let windValue = document.querySelector("#windSpeed");
  let minimumTemperature = document.querySelector("#min-temp");
  let maximumTemperature = document.querySelector("#max-temp");

  mainTemp.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityValue.innerHTML = response.data.main.humidity;
  windValue.innerHTML = Math.round(response.data.wind.speed);
  minimumTemperature.innerHTML = Math.round(response.data.main.temp_min);
  maximumTemperature.innerHTML = Math.round(response.data.main.temp_max);
}

let apiKey = "ff39a1560b2a6b58581393d9865ab25f";

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
