const cityForm = document.querySelector('form');
const card = document.querySelector('.weather');
const details = document.querySelector('.temperature');
const time = document.querySelector('img.time');

const updateUI = (data) => {
    
    const cityDets = data.cityDets;
    const weather = data.weather;

    details.innerHTML = `
            <div class="cityName">
            <h4>${cityDets.EnglishName}</h4>
            <p>${weather.WeatherText}</p>
        </div>

        <div class="degrees">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;c</span>
        </div>
    `;

    let timeSrc = weather.IsDayTime ? 'assets/img/day-img.jpg': 'assets/img/night-img.jpg' ;
    time.setAttribute('src', timeSrc);

    if( card.classList.contains('d-none')){
        card.classList.remove('d-none');
    };

};

const UpdateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return { cityDets, weather };

};

cityForm.addEventListener('submit', e => {

    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

     UpdateCity(city)
        .then( data =>  updateUI(data))
        .catch( err => console.log(err));

        localStorage.setItem('city', city);
});

if( localStorage.getItem('city')){
    UpdateCity(localStorage.getItem('city'))
    .then( data => updateUI(data))
    .catch( err => console.log(err));
}