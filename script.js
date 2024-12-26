// Constants and utility functions
const apiKey = "cb9300d5282c572d019c041f24dca38c";

// DOM elements
const mainWrapper = document.querySelector(".main-wrapper");

// API fetch function
async function fetchWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    return {
      name: data.name,
      country: data.sys.country,
      temp: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

// UI creation for GPS tab
function createGPSSection() {
  const title = document.createElement("div");
  const titleHeader = document.createElement("h1");
  titleHeader.textContent = "Weather App";
  title.className = "title-name";
  title.appendChild(titleHeader);
  mainWrapper.appendChild(title);

  const gpsSection = document.createElement("div");
  const gpsImage = document.createElement("img");
  const gpsHeader = document.createElement("h1");
  const gpsButton = document.createElement("button");
  gpsSection.className = "gps-section";
  gpsImage.className = "gps-icon";
  gpsImage.src = "./images/gps.png"; // Keeping the original GPS image
  gpsHeader.textContent = "Location Search";
  gpsSection.appendChild(gpsImage);
  gpsSection.appendChild(gpsHeader);
  gpsSection.appendChild(gpsButton);
  mainWrapper.appendChild(gpsSection);
}

// UI Creation for weather information
function createWeatherInfo(data) {
  if (!data) return;

  // Clear previous weather info if it exists
  const existingWeatherInfo = document.querySelector(".weather-info");
  if (existingWeatherInfo) {
    existingWeatherInfo.remove();
  }

  const weatherInfo = document.createElement("div");
  weatherInfo.className = "weather-info";

  // Header with city name and country flag
  const weatherHeader = document.createElement("div");
  weatherHeader.className = "weather-header";

  const weatherCity = document.createElement("h1");
  weatherCity.className = "weather-city";
  weatherCity.textContent = `${data.name}`;

  // Country flag
  const countryFlag = document.createElement("img");
  countryFlag.className = "country-flag";
  countryFlag.src = `https://flagcdn.com/w40/${data.country.toLowerCase()}.png`;
  countryFlag.alt = `${data.country} flag`;

  weatherHeader.appendChild(weatherCity);
  weatherHeader.appendChild(countryFlag);

  // Description and weather icon
  const weatherMain = document.createElement("div");
  weatherMain.className = "weather-main";

  const weatherDescription = document.createElement("p");
  weatherDescription.className = "weather-description";
  weatherDescription.textContent = data.description;

  const weatherIcon = document.createElement("img");
  weatherIcon.className = "weather-icon";
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.icon}.png`; // Using the icon from the fetched data
  weatherIcon.alt = data.description;

  weatherMain.appendChild(weatherDescription);
  weatherMain.appendChild(weatherIcon);

  // Temperature
  const weatherTemp = document.createElement("h2");
  weatherTemp.className = "weather-temp";
  weatherTemp.textContent = `${data.temp}°C`;

  // Additional info (wind speed, humidity, etc.)
  const weatherDetails = document.createElement("div");
  weatherDetails.className = "weather-details";

  const windSpeed = document.createElement("div");
  windSpeed.className = "weather-detail";
  windSpeed.innerHTML = `<i class='bx bx-wind bx-sm'></i> <span>${data.windSpeed} m/s</span>`;

  const humidity = document.createElement("div");
  humidity.className = "weather-detail";
  humidity.innerHTML = `<i class='bx bx-water bx-sm'></i> <span>${data.humidity}%</span>`;

  weatherDetails.appendChild(windSpeed);
  weatherDetails.appendChild(humidity);

  // Append everything to the main weather info div
  weatherInfo.appendChild(weatherHeader);
  weatherInfo.appendChild(weatherMain);
  weatherInfo.appendChild(weatherTemp);
  weatherInfo.appendChild(weatherDetails);

  mainWrapper.appendChild(weatherInfo);
}

function createSearchBar() {
  // Create the main container for the search bar
  const searchBar = document.createElement("div");
  searchBar.className = "search-bar";

  // Create the input field
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.id = "search-input";
  searchInput.className = "search-input";
  searchInput.placeholder = "Enter city name...";

  // Create the search button
  const searchButton = document.createElement("button");
  searchButton.className = "search-button";

  // Create and set the icon inside the button
  const icon = document.createElement("i");
  icon.className = "bx bx-search-alt-2 bx-sm";
  searchButton.appendChild(icon);

  // Add event listener to the search button
  searchButton.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city) {
      fetchWeatherData(city).then((data) => {
        createWeatherInfo(data);
      });
    }
  });

  // Append the input and button to the search bar
  searchBar.appendChild(searchInput);
  searchBar.appendChild(searchButton);

  // Append the search bar to the main wrapper
  mainWrapper.appendChild(searchBar);
}

// Initialization
function init() {
  createGPSSection();
  createSearchBar();
}

// Run initialization when DOM is fully loaded
document.addEventListener("DOMContentLoaded", init);
