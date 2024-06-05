document.getElementById('search-button').addEventListener('click', () => {
    const location = document.getElementById('location-input').value;
    if (location) {
        fetchWeather(location);
    }
});

async function fetchWeather(location) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            alert('Location not found');
        }
    } catch (error) {
        console.error('Error fetching the weather data:', error);
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity} %</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
}

// Optional: Get user's current location and fetch weather data
window.onload = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoordinates(lat, lon);
        });
    }
};

async function fetchWeatherByCoordinates(lat, lon) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            alert('Location not found');
        }
    } catch (error) {
        console.error('Error fetching the weather data:', error);
    }
}
