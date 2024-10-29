// forecast.js

const apiKey = '05f6f3affb0012e369c8c93f5bb0cfaa'; // Replace with your OpenWeatherMap API key
const forecastContainer = document.getElementById('forecastContainer');
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

// Function to fetch weather forecast
async function getWeatherForecast(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();

        if (data.cod === "200") {
            displayForecast(data);
        } else {
            forecastContainer.innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        forecastContainer.innerHTML = `<p>Error fetching forecast: ${error.message}</p>`;
    }
}

// Function to display forecast data
function displayForecast(data) {
    forecastContainer.innerHTML = ''; // Clear previous results
    const forecastList = data.list;

    // Display forecast for every 8th data point (since OpenWeatherMap gives data every 3 hours)
    for (let i = 0; i < forecastList.length; i += 8) {
        const dayData = forecastList[i];
        const date = new Date(dayData.dt * 1000).toLocaleDateString();
        const temp = dayData.main.temp;
        const humidity = dayData.main.humidity;
        const windSpeed = dayData.wind.speed;
        const description = dayData.weather[0].description;
        const icon = dayData.weather[0].icon;

        // Create a card for each day of the forecast
        forecastContainer.innerHTML += `
            <div class="forecast-card">
                <h3>${date}</h3>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
                <p>Temp: ${temp}°C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
                <p>Condition: ${description}</p>
            </div>
        `;
    }
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherForecast(city);
    } else {
        forecastContainer.innerHTML = '<p>Please enter a city name.</p>';
    }
});
