const weather = document.querySelector(".js-weather");
const tempField = document.querySelector('.temp');
const locField = document.querySelector('.location');

// const ACESS_KEY = "ac17dab7d28789dac152e213ef2dccb0";
const WEATHER_KEY = API_KEY.weather;
const COORDS = 'coords';

// const tempIcn = document.createElement('icon')
// const locIcn = document.createElement('icon')
// tempIcn.classList.add('fas', 'fa-temperature-high')
// locIcn.classList.add('fas', 'fa-location-arrow')
const locIcn = `<i class="fas fa-location-arrow"></i>`;
const tempIcn = `<i class="fas fa-temperature-high"></i>`;

function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        tempField.innerHTML = `${tempIcn}   ${temperature}`;
        locField.innerHTML = `${locIcn}   ${place}`;
    });
}
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handelGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handelGeoErr(position){
    alert('Location Not Loaded')
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handelGeoSucces, handelGeoErr)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);

    }
}

function init(){
    loadCoords();
}

init();
