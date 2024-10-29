// previous-cautions.js

const apiKey = '05f6f3affb0012e369c8c93f5bb0cfaa'; // Replace with your OpenWeatherMap API key
const cautionList = document.getElementById('cautionList');
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

// Function to get city coordinates (latitude and longitude)
async function getCityCoordinates(cityName) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
        const data = await response.json();

        if (response.ok && data.coord) {
            return {
                lat: data.coord.lat,
                lon: data.coord.lon
            };
        } else {
            cautionList.innerHTML = `<li>City not found: ${data.message || 'Invalid city name.'}</li>`;
        }
    } catch (error) {
        cautionList.innerHTML = `<li>Error fetching city coordinates: ${error.message}</li>`;
    }
}

// Function to fetch air pollution data
async function getAirPollutionData(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const data = await response.json();

        if (response.ok && data.list && data.list.length > 0) {
            displayAirPollutionData(data.list[0]);
        } else {
            cautionList.innerHTML = `<li>No air pollution data available for this city.</li>`;
        }
    } catch (error) {
        cautionList.innerHTML = `<li>Error fetching air pollution data: ${error.message}</li>`;
    }
}

// Function to display air pollution data
function displayAirPollutionData(pollutionData) {
    cautionList.innerHTML = ''; // Clear previous results

    const { pm2_5, pm10, o3, co, no2, so2 } = pollutionData.components;

    cautionList.innerHTML = `
        <li><strong>PM2.5:</strong> ${pm2_5} µg/m³</li>
        <li><strong>PM10:</strong> ${pm10} µg/m³</li>
        <li><strong>Ozone (O3):</strong> ${o3} µg/m³</li>
        <li><strong>Carbon Monoxide (CO):</strong> ${co} µg/m³</li>
        <li><strong>Nitrogen Dioxide (NO2):</strong> ${no2} µg/m³</li>
        <li><strong>Sulfur Dioxide (SO2):</strong> ${so2} µg/m³</li>
    `;
}

// Event listener for the search button
searchBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();

    if (city) {
        const cityCoordinates = await getCityCoordinates(city);
        if (cityCoordinates) {
            getAirPollutionData(cityCoordinates.lat, cityCoordinates.lon);
        }
    } else {
        cautionList.innerHTML = '<li>Please enter a city name.</li>';
    }
});
