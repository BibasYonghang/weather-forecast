const apiKey = "2dd7439b9cac28a5c3d2f88b6fbb45ac";
const errorMessage = document.querySelector(".error-message");

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch weather data");
    }

    const data = await response.json();

    displayWeather(data);
  } catch (error) {
    alert("Error: " + error.message);
  }
}

function displayWeather(data) {
  const cityName = document.getElementById("cityName");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");

  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  description.textContent = `Condition: ${data.weather[0].description}`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;

  document.getElementById("weatherInfo").classList.remove("hidden");
}

