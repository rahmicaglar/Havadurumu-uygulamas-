const apiKey = '417442aee90b418a4ad8c9409cebb061';  // OpenWeatherMap API anahtarınızı buraya ekleyin

document.getElementById('get-weather').addEventListener('click', () => {
    const city = document.getElementById('city').value;
    if (city) {
        getWeatherByCity(city);
    } else {
        alert('Please enter a city name');
    }
});

document.getElementById('detect-location').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByCoords(lat, lon);
        }, () => {
            alert('Unable to retrieve your location');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function getWeatherByCity(city) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error:', error));
}

function getWeatherByCoords(lat, lon) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error:', error));
}

function displayWeather(data) {
    if (data.cod === 200) {
        const resultDiv = document.getElementById('result');
        resultDiv.style.display = 'block';
        document.getElementById('city-name').textContent = data.name;
        document.getElementById('temp').textContent = `Temperature: ${data.main.temp}°C`;

        const description = data.weather[0].description;
        document.getElementById('desc').textContent = description;

        // Hava durumu durumuna göre ikon seçimi
        let iconClass = '';
        if (description.includes('clear sky') || description.includes('sunny')) {
            iconClass = 'fas fa-sun';
        } else if (description.includes('clouds')) {
            iconClass = 'fas fa-cloud';
        } else if (description.includes('rain')) {
            iconClass = 'fas fa-cloud-showers-heavy';
        } else if (description.includes('snow')) {
            iconClass = 'fas fa-snowflake';
        } else if (description.includes('thunderstorm')) {
            iconClass = 'fas fa-bolt';
        } else if (description.includes('mist') || description.includes('fog')) {
            iconClass = 'fas fa-smog';
        } else if (description.includes('night')) {
            iconClass = 'fas fa-moon';
        } else {
            iconClass = 'fas fa-cloud-sun';
        }

        document.getElementById('weather-icon').className = iconClass + ' fa-5x';

        resultDiv.classList.add('fade-in');
    } else {
        alert('City not found');
    }
}

