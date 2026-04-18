const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherContainer = document.getElementById('weatherContainer');

async function fetchWeather(city) {
    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Ciudad no encontrada');
        
        const data = await response.json();
        createWeatherCard(data);
        cityInput.value = '';
    } catch (error) {
        alert(error.message);
    }
}

function createWeatherCard(data) {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4';
    card.innerHTML = `
        <div class="weather-card mx-auto">
            <button class="close-btn" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times-circle"></i>
            </button>
            <h3 class="text-neon">${data.name}, ${data.sys.country}</h3>
            <p class="text-uppercase mb-0">${data.weather[0].description}</p>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="icon" class="img-fluid">
            <div class="temp-main">${Math.round(data.main.temp)}°C</div>
            <div class="mt-3">
                <span>💧 Humedad: ${data.main.humidity}%</span><br>
                <span>💨 Viento: ${data.wind.speed} m/s</span>
            </div>
        </div>
    `;
    weatherContainer.prepend(card);
}

// Eventos
searchBtn.addEventListener('click', () => fetchWeather(cityInput.value));
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchWeather(cityInput.value);
});