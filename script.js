// This function fetches weather data based on city input
document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    const apiKey = '05f6f3affb0012e369c8c93f5bb0cfaa'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('cityName').innerText = data.name;
            document.getElementById('temperature').innerText = `${data.main.temp} °C`;
            document.getElementById('weatherCondition').innerText = data.weather[0].description;
            document.getElementById('humidity').innerText = data.main.humidity;
            document.getElementById('windSpeed').innerText = data.wind.speed;
            document.getElementById('minTemp').innerText = data.main.temp_min;
            document.getElementById('maxTemp').innerText = data.main.temp_max;
            document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        })
        .catch(error => alert('City not found!'));
});
