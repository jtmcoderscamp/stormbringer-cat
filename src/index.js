/**
 * This file initializes the application
 * Code written here will be executed when application launches
 */

//console.log("...");
//import ".style.css";
require('./style.css');

const city = document.querySelector('.lakes');
city.addEventListener('click', check);

// check Kisajno when the web page is load
check();

function check() {
    let place;
    switch (city.value) {
        case 'lat=54.06592&lon=21.701493':
            place = 'Kisajno';
            break;
        case 'lat=53.712741&lon=21.633747':
            place = 'Warnołty'
            break;
        case 'lat=53.649835&lon=19.57533':
            place = 'Jeziorak'
            break;
        case 'lat=53.787905&lon=21.161813':
            place = 'Piłakno'
            break;
        case 'lat=53.704958&lon=21.432507':
            place = 'Krutyńskie'
            break;
            case "lat=53.767253&lon=21.733089":
                place = 'Śniardwy'
                break;
    }

    //  alert('You choose weather for the ' + place +' lake.');

    fn(city.value);

    function fn(location) {
        const apiKey = '&appid=b10515d6a4ef2b8b8a8a304e2cff855e';
        const checkToday = 'https://api.openweathermap.org/data/2.5/weather?';
        const checkHours = 'https://api.openweathermap.org/data/2.5/forecast?';

        fetch(checkToday + location + apiKey).then(blob => blob.json()).then(data => {
            changeToday(data, place);
        });

        fetch(checkHours + location + apiKey).then(blob => blob.json()).then(data => {
            changeHours(data, place);
        });
        // the last fetch for the weather for the next days - future solution

    }
}

function changeToday(data, place) {
    const lake = document.querySelector('.currenttempeurerat');
    lake.innerHTML = (place);

    const temperature = document.querySelector('.currenttemperature');
    temperature.innerHTML = Math.round(data.main.temp - 273) + '°C';

    const wind = document.querySelector('.wind');
    wind.innerHTML = 'Wind: ' + data.wind.speed + ' km/h';

   const time = document.querySelector('.sunset');
   time.innerHTML='Sunset: '+convertToTime(data.sys.sunrise)+'</br>Sunrise: '+ convertToTime(data.sys.sunset);

    const icon = document.querySelector('.temperature');
    icon.innerHTML= '<img src="http://openweathermap.org/img/wn/' + data["weather"][0]["icon"] +'@2x.png"></img>';

    // console.log(data);
}

function convertToTime(unixtime) {
    let date = new Date(unixtime * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let formattedTime = hours + ':' + minutes.substr(-2);
    return formattedTime;
  }


function changeHours(data) {
    const futureThree = document.querySelectorAll('.widgetcontent')[3];
    changefutureWeather(futureThree,data.list['0']);

    const futureSix = document.querySelectorAll('.widgetcontent')[4];
    changefutureWeather(futureSix,data.list['1']);
   
    const futureNine = document.querySelectorAll('.widgetcontent')[5];
    changefutureWeather(futureNine,data.list['2']);
    
    const futureTwelve = document.querySelectorAll('.widgetcontent')[6];
    changefutureWeather(futureTwelve,data.list['3']);

    const futureFifteen = document.querySelectorAll('.widgetcontent')[7];
    changefutureWeather(futureFifteen,data.list['4']);
    
   // console.log(data);
}

function changefutureWeather (futureHours, data)
{
    futureHours.firstElementChild.innerHTML = getTime(data.dt_txt);
    futureHours.children[1].innerHTML='<img src="http://openweathermap.org/img/wn/' + data["weather"][0]["icon"] +'@2x.png"></img>';
    futureHours.lastElementChild.innerHTML = Math.round(data.main.temp - 273) + '°C';
}

function getTime(time) {
    const t = time.split(' ');
    const hm = t[1].split(':');
    return hm[0] + ':' + hm[1];
}
