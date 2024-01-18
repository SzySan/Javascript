"use strict";
const app = express();

app.use(express.static("public"));

const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");

async function getWeather(city) {
  const key = "31dc11f0e6200bd206414faf39793234";
  const base =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  const jezyk = "&lang=pl";

  const response = await fetch(base + city + `&appid=${key}` + jezyk);
  var data = await response.json();

  console.log(data);

  const weatherIcon = document.querySelector(".weather-icon");
  const dane = document.querySelector(".weather-details");
  const box = document.querySelector(".boxTitle");
  const temperatura = document.querySelector(".temperature");

  if (data.weather[0].main === "Clouds") {
    weatherIcon.src = "images/cloud.png";
  } else if (data.weather[0].main === "Clear") {
    weatherIcon.src = "images/sun.png";
  } else if (data.weather[0].main === "Rain") {
    weatherIcon.src = "images/Rain1.png";
  } else if (data.weather[0].main === "Snow") {
    weatherIcon.src = "images/snow.png";
  }

  temperatura.innerHTML = `
          <div class="temperature">
            <div class="temp">
              ${Math.round(data.main.temp)}
              <span class="deg">°</span>
            </div>
          </div>`;

  dane.innerHTML = `

      <div class="weather-details">
            <div class="desc">${data.weather[0].description}</div>

            <ul class="param-list">
              <li>
                <span class="restParamLabel">Odczuwalna temperatura</span>
                <span class="restParamValue">${Math.round(
                  data.main.feels_like
                )}°C</span>
              </li>
              <li>
                <span class="restParamLabel">Wiatr</span>
                <span class="restParamValue">${Math.round(
                  data.wind.speed
                )}km/h</span>
              </li>
              <li>
                <span class="restParamLabel">Widoczność</span>
                <span class="restParamValue">${data.visibility} M</span>
              </li>
              <li>
                <span class="restParamLabel">Zachmurzenie</span>
                <span class="restParamValue">${data.clouds.all + "%"}</span>
              </li>
              <li>
                <span class="restParamLabel">Wilgotność</span>
                <span class="restParamValue">${data.main.humidity + "%"}</span>
              </li>
              <li>
                <span class="restParamLabel">Ciśnienie atmosferyczne</span>
                <span class="restParamValue">${data.main.pressure} hPa</span>
              </li>
            </ul>
          </div>`;

  box.innerHTML = `
          <div class="boxTitle">
            <span>Prognoza Pogody:${data.name} </span>
          </div>`;
}

searchBtn.addEventListener("click", () => {
  getWeather(searchBox.value);
});

// Przekierowywanie na inne strony

// function redirectToLogin() {
//   window.location.href = "/login";
// }

// function openRegisterModal() {
//   window.location.href = "/register";
// }
