// DOM elements
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const locationBtn = document.getElementById("location-btn");
const weatherInfo = document.getElementById("weather-info");

// OpenWeatherMap API key and base URL
const API_KEY = "f5ec302a73a0dff7c1b53569070ee179";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Fetch weather data
async function fetchWeather(query) {
  try {
    const response = await fetch(
      `${"https://api.openweathermap.org/data/2.5/weather"}?${query}&appid=${"f5ec302a73a0dff7c1b53569070ee179"}&units=metric`
    );
    const data = await response.json();
    if (response.ok) {
      displayWeather(data);
    } else {
      weatherInfo.innerHTML = `<p>Error: ${data.message}</p>`;
    }
  } catch (error) {
    weatherInfo.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
  }
}

// Display weather information
function displayWeather(data) {
  const { name, main, weather, wind } = data;
  weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <p><strong>Temperature:</strong> ${main.temp}°C</p>
        <p><strong>Weather:</strong> ${weather[0].description}</p>
        <p><strong>Humidity:</strong> ${main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
    `;
}

// Event listeners
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(`q=${city}`);
  }
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(`lat=${latitude}&lon=${longitude}`);
      },
      () => {
        weatherInfo.innerHTML = "<p>Unable to access your location.</p>";
      }
    );
  } else {
    weatherInfo.innerHTML =
      "<p>Geolocation is not supported by your browser.</p>";
  }
});
