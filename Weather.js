const container = document.querySelector('.container');
        const search = document.querySelector('.search-box button');
        const weatherBox = document.querySelector('.weather-box');
        const weatherDetails = document.querySelector('.weather-details');
        const error404 = document.querySelector('.not-found');

        search.addEventListener('click', () => {
            const APIKey = 'fd8a4addb34a09c4a13e4d4acbcca58b';
            const city = document.querySelector('.search-box input').value;

            if (city === '') return;

            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
                .then(response => response.json())
                .then(json => {
                    if (json.cod === '404') {
                        container.style.height = '400px';
                        weatherBox.style.display = 'none';
                        weatherDetails.style.display = 'none';
                        error404.style.display = 'block';
                        error404.classList.add('fadeIn');
                        return;
                    }

                    error404.style.display = 'none';
                    error404.classList.remove('fadeIn');

                    const image = document.querySelector('.weather-box img');
                    const temperature = document.querySelector('.weather-box .temperature');
                    const description = document.querySelector('.weather-box .description');
                    const humidity = document.querySelector('.weather-details .humidity span');
                    const wind = document.querySelector('.weather-details .wind span');

                    switch (json.weather[0].main) {
                        case 'Clear':
                            image.src = 'images/clear.png';
                            break;

                        case 'Rain':
                            image.src = 'images/rain.png';
                            break;

                        case 'Snow':
                            image.src = 'images/snow.png';
                            break;

                        case 'Clouds':
                            image.src = 'images/cloud.png';
                            break;

                        case 'Mist':
                            image.src = 'images/mist.png';
                            break;

                        default:
                            image.src = '';
                            break;
                    }

                    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                    description.innerHTML = translateWeatherDescription(json.weather[0].main);
                    humidity.innerHTML = `${json.main.humidity}%`;
                    wind.innerHTML = `${parseInt(json.wind.speed)} Km/Jam`;

                    weatherBox.style.display = '';
                    weatherDetails.style.display = '';
                    weatherBox.classList.add('fadeIn');
                    weatherDetails.classList.add('fadeIn');
                    container.style.height = '590px';
                });
        });

        function translateWeatherDescription(weather) {
            const translations = {
                'Clear': 'Cerah',
                'Clouds': 'Berawan',
                'Rain': 'Hujan',
                'Drizzle': 'Gerimis',
                'Thunderstorm': 'Badai petir',
                'Snow': 'Salju',
                'Mist': 'Kabut',
                'Smoke': 'Asap',
                'Haze': 'Kabut',
                'Dust': 'Debu',
                'Fog': 'Kabut',
                'Sand': 'Pasir',
                'Ash': 'Abu vulkanik',
                'Squall': 'Angin kencang',
                'Tornado': 'Puting beliung'
            };

            return translations[weather] || weather;
        }