const currentTemp = document.querySelector('#current-temp');

const weatherIcon = document.querySelector('#weather-icon');

const captionDesc = document.querySelector('#captionDesc');

const highTemp = document.querySelector('#highTemp')

const lowTemp = document.querySelector('#lowTemp')

const humidity = document.querySelector('#humidity')

const sunriseTime = document.querySelector('#sunriseTime')

const sunsetTime = document.querySelector('#sunsetTime')


/*FORECAST API CONST*/
const todayTemp = document.querySelector('#todayTemp')
const tomorrowLabel = document.querySelector('#tomorrowLabel');
const tomorrowTemp = document.querySelector('#tomorrowTemp');
const dayAfterLabel = document.querySelector('#dayAfterLabel');
const dayAfterTemp = document.querySelector('#dayAfterTemp');






// PERSONAL CONST 

// ID: 7768fd940064b8a2c712f9ea48b82f59
// DIRECTIONS: -5.192262532474715, -80.62498775286652


const myKey="7768fd940064b8a2c712f9ea48b82f59"
const myLat="-5.192262532474715"
const myLong="-80.62498775286652"




const myURL = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;
const forecastURL = `//api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&units=imperial&appid=${myKey}`


// fecht and await 

async function apiFecht() {
    try{
        const response = await fetch(myURL);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        }

        else{
            throw Error(await response.text());
        }}

        catch (error){
            console.log(error);
        }
}


function convertUnixTime(unixTime) {
    const date = new Date(unixTime * 1000);
    return date.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit', hour12:true});
}


function displayResults(data){
    weatherIcon.setAttribute('SRC',`//openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    captionDesc.innerHTML = `${data.weather[0].description}`;
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;F`;
    highTemp.innerHTML = `${Math.round(data.main.temp_max)}&deg;F`;
    lowTemp.innerHTML = `${Math.round(data.main.temp_min)}&deg;F`;
    humidity.innerHTML = `${data.main.humidity}%`; 
    sunriseTime.innerHTML = convertUnixTime(data.sys.sunrise);
    sunsetTime.innerHTML = convertUnixTime(data.sys.sunset);
    todayTemp.innerHTML = `${Math.round(data.main.temp)}&deg;F`;
}





/* FORECAST API */

/* ---------- FUNCIONES ---------- */
function getForecastForDays(foreData) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(today.getDate() + 2);

    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    const dayAfterStr = dayAfter.toISOString().split('T')[0];

    const tomorrowForecast = foreData.list.filter(item => item.dt_txt.includes(`${tomorrowStr} 12:00:00`));
    const dayAfterForecast = foreData.list.filter(item => item.dt_txt.includes(`${dayAfterStr} 12:00:00`));

    return { tomorrowForecast, dayAfterForecast, tomorrowDate: tomorrow, dayAfterDate: dayAfter };
}

function displayForecast(foreData) {
    const { tomorrowForecast, dayAfterForecast, tomorrowDate, dayAfterDate } = getForecastForDays(foreData);

    if (tomorrowForecast.length > 0) {
        const tempF = Math.round(tomorrowForecast[0].main.temp);
        const dayName = tomorrowDate.toLocaleDateString('en-US', { weekday: 'long' });
        tomorrowLabel.innerHTML = `${dayName}`;
        tomorrowTemp.innerHTML = `${tempF}&deg;F`;
    }

    if (dayAfterForecast.length > 0) {
        const tempF = Math.round(dayAfterForecast[0].main.temp);
        const dayName = dayAfterDate.toLocaleDateString('en-US', { weekday: 'long' });
        dayAfterLabel.innerHTML = `${dayName}`;
        dayAfterTemp.innerHTML = `${tempF}&deg;F`;
    }
}

/* ---------- FETCH FORECAST ---------- */
async function apiForecast() {
    try {
        const response = await fetch(forecastURL);
        if (response.ok) {
            const foreData = await response.json();
            displayForecast(foreData);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}








apiFecht();
apiForecast();
