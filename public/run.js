//----------------------------------------------------------------------------------------------------------//
//GLOBAL VARS
//----------------------------------------------------------------------------------------------------------//



//----------------------------------------------------------------------------------------------------------//
//RESPONSIVNESS
//----------------------------------------------------------------------------------------------------------//

// RESIZE update
window.onresize = function () {
  location.reload();
};

//Disable zoom
document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});

// DEVICE
// device detection
//TBA

//SET RESPONSIVE VALUES
//1366x768	COMPUTER
//360x640 MOBILE
//601x962 TABLET

let optWidth;
let optHeight;
let relWidth;
let relHeight;

let cropWidthStart;
let cropWidthEnd;

//SET OPT WIDTH AND HEIGHT IF SCREEN IS SMALL
if (window.innerWidth > 601) {
  optWidth = 1366; 
  optHeight = 768;
} else {
  optWidth = 360;
  optHeight = 760;
}

(function setResponsiveSize() {
  relWidth = window.innerWidth / optWidth;
  relHeight = window.innerHeight / optHeight;
})();





//WindowSize detection
// CROP IMAGE
if (window.innerWidth > 601) {
  croptWidthStart = 0;
  croptWidthEnd = 1;
} 
else {
  croptWidthStart = 0.43;
  croptWidthEnd = 0.42;
}

//----------------------------------------------------------------------------------------------------------//
//DOM ELEMENTS
//----------------------------------------------------------------------------------------------------------//
//ICONS
let currentForcastOverlay = document.getElementById('currentForcastOverlay')
let plus3 = document.getElementById('plus3')
let plus6 = document.getElementById('plus6')
let plus9 = document.getElementById('plus9')
let plus12 = document.getElementById('plus12')


let iconCanvas = document.getElementById('iconCanvas')
let iconCtx = iconCanvas.getContext('2d')
iconCanvas.width = window.innerWidth
iconCanvas.height = window.innerHeight


//SKY DOM
let skyCanvas = document.getElementById("skyCanvas");
let skyCtx = skyCanvas.getContext("2d");
let skyWidth = optWidth * relWidth;
let skyHeight = optHeight * relHeight;
skyCanvas.width = skyWidth;
skyCanvas.height = skyHeight;

//CITY DARK MASK
let cityBlackCanvas = document.getElementById("cityCanvasBlack");
let cityBlackCtx = cityBlackCanvas.getContext("2d");
let cityBlackWidth = optWidth * relWidth;
let cityBlackHeight = optHeight * relHeight;
cityBlackCanvas.width = cityBlackWidth;
cityBlackCanvas.height = cityBlackHeight;

//WEATHER DOM (clouds)
let weatherCanvas = document.getElementById("weather");
let weatherCtx = weatherCanvas.getContext("2d");
let weatherWidth = optWidth * relWidth;
let weatherHeight = optHeight * relHeight;
weatherCanvas.width = weatherWidth;
weatherCanvas.height = weatherHeight;

//RAIN/SNOW canvas
let rainCanvas = document.getElementById("rainCanvas");
let rainCtx = rainCanvas.getContext("2d");
let rainWidth = optWidth * relWidth;
let rainHeight = optHeight * relHeight;
rainCanvas.width = rainWidth;
rainCanvas.height = rainHeight;

//CITY CANVAS MAIN
let cityCanvas2 = document.getElementById("cityCanvasMain");
let cityCtx = cityCanvas2.getContext("2d");
let cityWidth = optWidth * relWidth;
let cityHeight = optHeight * relHeight;
cityCanvas2.width = cityWidth;
cityCanvas2.height = cityHeight;




//SUN AND MOON CANVAS
let sunAndMoonCanvas = document.getElementById("sunAndMoonCanvas");
let sunAndMoonCtx = sunAndMoonCanvas.getContext("2d");
let sunAndMoonWidth = optWidth * relWidth;
let sunAndMoonHeight = optHeight * relHeight;
sunAndMoonCanvas.width = sunAndMoonWidth;
sunAndMoonCanvas.height = sunAndMoonHeight;

//Set CANVAS ,argin if with over 1100
let textOverlayLocation = document.getElementById('textOverlayLocation')
let textOverlayForcast = document.getElementById('textOverlayForcast')
let textOverlayWeather = document.getElementById('textOverlayWeather')
let soundButtonOverlay = document.getElementById('soundButtonOverlay')
let creditsButtonOverlay = document.getElementById('creditsButtonOverlay')
let creditsBox= document.getElementById('creditsBox')
let closeCredits = document.getElementById('closeCredits')


if (window.innerWidth > 1450){
cityCanvas2.style.width = '80%'
cityCanvas2.style.height = '100%'
cityCanvas2.style.marginLeft = '10%';
weatherCanvas.style.width = '80%'
weatherCanvas.style.height = '100%'
weatherCanvas.style.marginLeft = '10%';
sunAndMoonCanvas.style.width = '80%'
sunAndMoonCanvas.style.height = '100%'
sunAndMoonCanvas.style.marginLeft = '10%';

}
textOverlayLocation.style.left = '12%'
textOverlayForcast.style.left = '12%'
textOverlayWeather.style.left = '12%'
soundButtonOverlay.style.right = '12%'
creditsButtonOverlay.style.right = '12%'

//DOM BUTTON ELEMENTS 
//SELECT LOCATION
let pageBody = document.querySelector("body");
let buttonStockholm = document.querySelector("#buttonStockholm");
let buttonKarlshamn = document.querySelector("#buttonKarlshamn");

let locationSelector = document.getElementById("locationSelector")
locationSelector.addEventListener("change", setLocation)

//Runs the event listener 
pageBody.addEventListener("load", setLocation, true);


//DOM TEXT OVERLAY ELEMETS
let weatherLocation = document.getElementById("weatherLocation");
let weatherDay = document.getElementById("weatherDay");
let weatherDescription = document.getElementById("weatherDescription");
let temperature = document.getElementById("temperature");
let windSpeedText = document.getElementById("windSpeedAndDirection");


// Set the location based on selection by user. Selection made by button press. Default city is Stockholm

function setLocation (e){
  let locationInputSelect
  let locationInputSelectLongitude;
  let locationInputSelectLatitude;
  if( sessionStorage.Location === undefined){
    locationInputSelect = "Stockholm"
    locationInputSelectLongitude =  18.110014
    locationInputSelectLatitude = 59.336889

  } else {locationInputSelect = sessionStorage.Location
          locationInputSelectLatitude = sessionStorage.Latitude
          locationInputSelectLongitude = sessionStorage.Longitude}
 
  let locationInputCountrySelect = "Sweden";
  let selectedLocation = e.target.value;

  if(selectedLocation === "karlshamn") {
   sessionStorage.setItem("Location", "Karlshamn")
   sessionStorage.setItem("Latitude", 56.172825)
    sessionStorage.setItem("Longitude", 14.863209)
    locationInputSelect = sessionStorage.Location
    locationInputSelectLongitude = sessionStorage.Longitude
    locationInputSelectLatitude = sessionStorage.Latitude
    locationInputCountrySelect = "Sweden"
    location.reload()
    
  }

  if(selectedLocation === "stockholm") {
    sessionStorage.setItem("Location", "Stockholm")
    sessionStorage.setItem("Latitude", 59.336889)
    sessionStorage.setItem("Longitude", 18.110014)
    locationInputSelect = sessionStorage.Location
    locationInputSelectLongitude = sessionStorage.Longitude
    locationInputSelectLatitude = sessionStorage.Latitude
    locationInputCountrySelect = "Sweden"
    location.reload()
  } 

    if (selectedLocation === 'mylocation'){
      getLocation()

      function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
       console.log("your location is unavailable")  
        }
      }
      
      function showPosition(position) {
        let navLat =position.coords.latitude.toFixed(6)
        let navLong = position.coords.longitude.toFixed(6)
        sessionStorage.setItem("Location", "mylocation")
        sessionStorage.setItem("Latitude", navLat)
        sessionStorage.setItem("Longitude", navLong);
        locationInputSelect = sessionStorage.Location
        locationInputSelectLongitude = sessionStorage.Longitude
        locationInputSelectLatitude = sessionStorage.Latitude
         location.reload()
      }
    }



  // Set text to the selected location
  // locationSelector.options[locationSelector.selectedIndex].textContent = locationInputSelect;

//----------------------------------------------------------------------------------------------------------//
//WEATHER & TIME API // GET DATA
//----------------------------------------------------------------------------------------------------------//
let locationInput = locationInputSelect;
let locationCountryInput = locationInputCountrySelect;

//POST TO SERVER // LOCATION

const data = {location: locationInput,
              latitude: locationInputSelectLatitude,
              longitude: locationInputSelectLongitude};

fetch('/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
}); 





let currentWeatherURL = '/current'
  // "http://api.openweathermap.org/data/2.5/weather?q=" +
  // locationInput +
  // "&appid=" +
  // apiKeyWeather;
let forcastURL = '/forecast'
  // "http://api.openweathermap.org/data/2.5/forecast?q=" +
  // locationInput +
  // "&appid=" +
  // apiKeyWeather;


const currentTimeData = '/time';
  // "https://api.ipgeolocation.io/timezone?apiKey=xxxxx&location=" +
  // locationInput +
  // "," +
  // locationCountryInput;




(async function runWeatherAndTimeSystem() {
  //Fetch current Weather
  let responseCurrentWeather = await fetch(currentWeatherURL);
  let jsonCurrentWeather = await responseCurrentWeather.json();
  weatherLocation.textContent = jsonCurrentWeather.name
  //CURRENT WEATHER
  //current weather reusltus
  let currentWeatherId = jsonCurrentWeather.weather[0].id;
  let currentWeatherDescription = jsonCurrentWeather.weather[0].description;
  let currentTemperatureInKelvin = jsonCurrentWeather.main.temp;
  let currentTemperatureInCelsius = (
    currentTemperatureInKelvin - 273.15
  ).toFixed(1);
  let currentWindSpeedMs = jsonCurrentWeather.wind.speed;
  let currentWindDirectionDegrees = jsonCurrentWeather.wind.deg;
  console.log(
    "Current weather " + "id: " + currentWeatherId,
    "description: " + currentWeatherDescription,
    "temp C° :" + currentTemperatureInCelsius,
    "windSpeed M/s: " + currentWindSpeedMs,
    "wind direction°: " + currentWindDirectionDegrees
  );
  // UNIX time Sunrise and Sunset

  let currentSunRiseUnix = jsonCurrentWeather.sys.sunrise;
  let currentSunSetUnix = jsonCurrentWeather.sys.sunset;

  let currentSunRiseDate = new Date(currentSunRiseUnix * 1000);
  let currentSunRiseHour = currentSunRiseDate.getHours();
  let currentSunRiseMinutes = currentSunRiseDate.getMinutes();
  let currentSunRiseTimeInMinutes =
    currentSunRiseHour * 60 + currentSunRiseMinutes;
  console.log(
    "current sunrise " + currentSunRiseHour,
    currentSunRiseMinutes,
    currentSunRiseTimeInMinutes
  );

  let currentSunSetDate = new Date(currentSunSetUnix * 1000);
  let currentSunSetHour = currentSunSetDate.getHours();
  let currentSunSetMinutes = currentSunSetDate.getMinutes();
  let currentSunSetTimeInMinutes =
    currentSunSetHour * 60 + currentSunSetMinutes;
  console.log(
    "current sunset " + currentSunSetHour,
    currentSunSetMinutes,
    currentSunSetTimeInMinutes
  );




  //Fetch 5-day 3h Weather forcast
  let responseForcastWeather = await fetch(forcastURL);
  let jsonForcastWeather = await responseForcastWeather.json();


  //FORECAST
//Fetch h forcast
let responseHCast = await fetch('/forcastCurrent')
let jsonHCast = await responseHCast.json()



let hCast_3_time = jsonHCast.hourly[3].dt 
let hCast_3_time_zone = hCast_3_time + jsonHCast.timezone_offset
let hCast_6_time = jsonHCast.hourly[8].dt 
let hCast_6_time_zone = hCast_6_time + jsonHCast.timezone_offset
let hCast_9_time = jsonHCast.hourly[13].dt 
let hCast_9_time_zone = hCast_9_time + jsonHCast.timezone_offset
let forcastTime_3;
let forcastTime_6;
let forcastTime_9;



let forCastTimeRaw_3 = new Date(hCast_3_time_zone*1000)
if(forCastTimeRaw_3.getHours() < 10){
  forcastTime_3 = `0${forCastTimeRaw_3.getHours()}:00`
} else forcastTime_3 = `${forCastTimeRaw_3.getHours()}:00`

let forCastTimeRaw_6 = new Date(hCast_6_time_zone*1000)
if(forCastTimeRaw_6.getHours() < 10){
  forcastTime_6 = `0${forCastTimeRaw_6.getHours()}:00`
} else forcastTime_6 = `${forCastTimeRaw_6.getHours()}:00`


let forCastTimeRaw_9 = new Date(hCast_9_time_zone*1000)
if(forCastTimeRaw_9.getHours() < 10){
  forcastTime_9 = `0${forCastTimeRaw_9.getHours()}:00`
} else forcastTime_9 = `${forCastTimeRaw_9.getHours()}:00`




//forecast current Weather IDs
let hCast_3_id = jsonHCast.hourly[3].weather[0].id
let hCast_6_id = jsonHCast.hourly[8].weather[0].id
let hCast_9_id = jsonHCast.hourly[13].weather[0].id

console.log(hCast_3_id)
console.log(hCast_6_id)
console.log(hCast_9_id)

//forecast current Temps
let hCast_3_temp = `${(jsonHCast.hourly[3].temp -273.15).toFixed(0)}°C`
let hCast_6_temp = `${(jsonHCast.hourly[8].temp -273.15).toFixed(0)}°C`
let hCast_9_temp = `${(jsonHCast.hourly[13].temp -273.15).toFixed(0)}°C`


let iconImgA = new Image()
let iconImgB = new Image()
let iconImgC = new Image()

//200 --> 233
if(hCast_3_id > 199 & hCast_3_id < 233){
  iconImgA.src = "http://openweathermap.org/img/wn/11n@2x.png"
}
if(hCast_6_id > 199 & hCast_6_id < 233){
  iconImgB.src = "http://openweathermap.org/img/wn/11n@2x.png"
}
if(hCast_9_id > 199 & hCast_9_id < 233){
  iconImgC.src = "http://openweathermap.org/img/wn/11n@2x.png"
}

//300 --> 321
if(hCast_3_id > 299 & hCast_3_id < 322){
  iconImgA.src = "http://openweathermap.org/img/wn/09n@2x.png"
}
if(hCast_6_id > 299 & hCast_6_id < 322){
  iconImgB.src = "http://openweathermap.org/img/wn/09n@2x.png"
}
if(hCast_9_id > 299 & hCast_9_id < 322){
  iconImgC.src = "http://openweathermap.org/img/wn/09n@2x.png"
}
//500 --> 531
if(hCast_3_id > 499 & hCast_3_id < 522){
  iconImgA.src = "http://openweathermap.org/img/wn/09n@2x.png"
}
if(hCast_6_id > 499 & hCast_6_id < 522){
  iconImgB.src = "http://openweathermap.org/img/wn/09n@2x.png"
}
if(hCast_9_id > 499 & hCast_9_id < 522){
  iconImgC.src = "http://openweathermap.org/img/wn/09n@2x.png"
}


//600 --> 631
if(hCast_3_id > 599 & hCast_3_id < 622){
  iconImgA.src = "http://openweathermap.org/img/wn/13n@2x.png"
}
if(hCast_6_id > 599 & hCast_6_id < 622){
  iconImgB.src = "http://openweathermap.org/img/wn/13n@2x.png"
}
if(hCast_9_id > 599 & hCast_9_id < 622){
  iconImgC.src = "http://openweathermap.org/img/wn/13n@2x.png"
}

//700 --> 781
if(hCast_3_id > 699 & hCast_3_id < 782){
  iconImgA.src = "http://openweathermap.org/img/wn/50n@2x.png"
}
if(hCast_6_id > 699 & hCast_6_id < 782){
  iconImgB.src = "http://openweathermap.org/img/wn/50n@2x.png"
}
if(hCast_9_id > 699 & hCast_9_id < 782){
  iconImgC.src = "http://openweathermap.org/img/wn/50n@2x.png"
}

//800 --> 800
if(hCast_3_id === 800){
  iconImgA.src = "http://openweathermap.org/img/wn/09n@2x.png"}
if(hCast_6_id === 800){
    iconImgB.src = "http://openweathermap.org/img/wn/09n@2x.png"}
if(hCast_9_id === 800){
  iconImgC.src = "http://openweathermap.org/img/wn/09n@2x.png"}


//801 --> 806
if(hCast_3_id > 800 & hCast_3_id  < 806){
  iconImgA.src = "http://openweathermap.org/img/wn/02n@2x.png"
}
if(hCast_6_id > 800 & hCast_6_id  < 806){
  iconImgB.src = "http://openweathermap.org/img/wn/02n@2x.png"
}
if(hCast_9_id > 800 & hCast_9_id  < 806){
  iconImgC.src = "http://openweathermap.org/img/wn/02n@2x.png"
}




// DRAWING ICONS
// -----------------------------------------------------------------------------------------------------------------------------------//
function drawIcons(){

  iconCtx.drawImage(iconImgA,iconCanvas.width/9 ,520*relHeight,40,40)
  iconCtx.drawImage(iconImgB,iconCanvas.width/9 + 50 ,520*relHeight,40,40)
  iconCtx.drawImage(iconImgC,iconCanvas.width/9 + 100 ,520*relHeight,40,40)

  iconCtx.shadowColor ="white"
  iconCtx.shadowBlur=7;
  iconCtx.lineWidth=1;
  iconCtx.font = "12px Arial";
  iconCtx.fillText(forcastTime_3,iconCanvas.width/9+5 ,(520 + 70)*relHeight)
  iconCtx.fillText(forcastTime_6,iconCanvas.width/9+55 ,(520 + 70)*relHeight)
  iconCtx.fillText(forcastTime_9,iconCanvas.width/9+105 ,(520 + 70)*relHeight)

  iconCtx.fillText(hCast_3_temp,iconCanvas.width/9+5 ,(520 + 90)*relHeight)
  iconCtx.fillText(hCast_6_temp,iconCanvas.width/9+55 ,(520 + 90)*relHeight)
  iconCtx.fillText(hCast_9_temp,iconCanvas.width/9+105 ,(520 + 90)*relHeight)

  iconCtx.shadowBlur=0;
  iconCtx.fillStyle = "black"
  iconCtx.fillText(forcastTime_3,iconCanvas.width/9+5 ,(520 + 70)*relHeight)
  iconCtx.fillText(forcastTime_6,iconCanvas.width/9+55 ,(520 + 70)*relHeight)
  iconCtx.fillText(forcastTime_9,iconCanvas.width/9+105 ,(520 + 70)*relHeight)
}





  //Forcast +1 day AT 12.00

  let forecast_Plus1D_At_1200_WeatherId =
  jsonForcastWeather.daily[1].weather[0].id;
let forecast_Plus1D_At_1200_Description =
  jsonForcastWeather.daily[1].weather[0].description;
let forecast_Plus1D_At_1200_TemperatureInKelvin =
  jsonForcastWeather.daily[1].temp.day;
let forecast_Plus1D_At_1200_TemperatureInCelsius = (
  forecast_Plus1D_At_1200_TemperatureInKelvin - 273.15
).toFixed(1);
let forecast_Plus1D_At_1200_WindSpeed = jsonForcastWeather.daily[1].wind_speed;
let forecast_Plus1D_At_1200_DirectionDegrees =
  jsonForcastWeather.daily[1].wind_deg;
 


  // Forcast +2 day AT 12.00
  let forecast_Plus2D_At_1200_WeatherId =
  jsonForcastWeather.daily[2].weather[0].id;
let forecast_Plus2D_At_1200_Description =
  jsonForcastWeather.daily[2].weather[0].description;
let forecast_Plus2D_At_1200_TemperatureInKelvin =
  jsonForcastWeather.daily[2].temp.day;
let forecast_Plus2D_At_1200_TemperatureInCelsius = (
  forecast_Plus1D_At_1200_TemperatureInKelvin - 273.15
).toFixed(1);
let forecast_Plus2D_At_1200_WindSpeed = jsonForcastWeather.daily[2].wind_speed;
let forecast_Plus2D_At_1200_DirectionDegrees =
  jsonForcastWeather.daily[2].wind_deg;



  console.log(
    "Forecast 1Day Plus At 12.00 " + "id: " + forecast_Plus1D_At_1200_WeatherId,
    "description: " + forecast_Plus1D_At_1200_Description,
    "temp C° :" + forecast_Plus1D_At_1200_TemperatureInCelsius,
    "windSpeed M/s: " + forecast_Plus1D_At_1200_WindSpeed,
    "wind direction°: " + forecast_Plus1D_At_1200_DirectionDegrees
  );

  //CURRENT TIME
  //Fetch current time
  let currentTimeandDate = await fetch(currentTimeData);
  let jsonCurrenTimeandDate = await currentTimeandDate.json();
  //Current date reuslt
  //Current month
  let currentYear = jsonCurrenTimeandDate.year;
  let currentMonth = Number(jsonCurrenTimeandDate.month);
  let currentDate = jsonCurrenTimeandDate.date.split("-");
  let currentDay = Number(currentDate[2]);

  let currentTime = jsonCurrenTimeandDate.time_24;
  let currentTimeSplit = currentTime.split(":");
  let currentHour = currentTimeSplit[0];
  let currentMinutes = currentTimeSplit[1];
  let lengthOfDay = currentSunSetTimeInMinutes - currentSunRiseTimeInMinutes;


  let currentTimeInMinutes = Number(currentHour) * 60 + Number(currentMinutes);
  // let currentTimeInMinutes = 1200
  console.log(
    "current year " + currentYear,
    "current month: " + currentMonth,
    // "current day " + currentDay,
    "current local time: " + currentTime,
    "current hour: " + currentHour,
    "current miuntes: " + currentMinutes,
    "current time in minutes: " + currentTimeInMinutes
  );



// IS MORNING DAY OR NIGHT
  
let isMorning;
let isDay;
let isNight;


if (currentTimeInMinutes <= 450) {
  isMorning = true;
  isDay = false;
  isNight = false;
 }
 
 if (currentTimeInMinutes > 450 && currentTimeInMinutes < 1000 ) {
   isMorning = false;
   isDay = true;
   isNight = false;
 }
 
 if (currentTimeInMinutes > 1000) {
   isMorning = false;
   isDay = false;
   isNight = true;
 }


// if (currentTimeInMinutes <= currentSunRiseTimeInMinutes) {
//  isMorning = true;
//  isDay = false;
//  isNight = false;
// }

// if (currentTimeInMinutes > currentSunRiseTimeInMinutes && currentTimeInMinutes < currentSunSetTimeInMinutes ) {
//   isMorning = false;
//   isDay = true;
//   isNight = false;
// }

// if (currentTimeInMinutes > currentSunSetTimeInMinutes) {
//   isMorning = false;
//   isDay = false;
//   isNight = true;
// }

console.log("Is morning? " + isMorning)
console.log("Is day? " + isDay)
console.log("Is Night? " + isNight)

 

  //----------------------------------------------------------------------------------------------------------//
  //LOAD MATERIAL
  //----------------------------------------------------------------------------------------------------------//
  //Load city elements



  const cityImage = new Image();
  const cityBlackImage = new Image();
  const cityWindows = new Image();

  console.log(locationInput)

  if (locationInput === "Stockholm") {
     // Load window
    if (currentMonth <= 3) {
      cityImage.src = "Images/Locations/Stockholm/stockholmCityAutumnDay.png";
    }
    if (currentMonth > 2 && currentMonth < 9) {
      cityImage.src = "Images/Locations/Stockholm/stockholmCitySunnyDay.png";
    }
    if (currentMonth > 8 && currentMonth < 12) {
      cityImage.src = "Images/Locations/Stockholm/stockholmCityAutumnDay.png";
    }
    if (currentMonth === 12) {
      cityImage.src = "Images/Locations/Stockholm/stockholmCityAutumnDay.png";
    }
    cityWindows.src = "Images/Locations/Stockholm/windows.png";

    cityBlackImage.src = "Images/Locations/Stockholm/StockholmCityBlackBox.png";
  }



  if (locationInput === "Karlshamn") {
    if (currentMonth <= 3) {
      cityImage.src = "Images/Locations/MyLocation/mylocationCitySunnyDay.png";
    }
    if (currentMonth > 2 && currentMonth < 9) {
      cityImage.src = "Images/Locations/MyLocation/mylocationCitySunnyDay.png";
    }
    if (currentMonth > 8 && currentMonth < 12) {
      cityImage.src = "Images/Locations/MyLocation/mylocationCitySunnyDay.png";
    }
    if (currentMonth === 12) {
      cityImage.src = "Images/Locations/MyLocation/mylocationCitySunnyDay.png";
    }

    cityBlackImage.src = "Images/Locations/MyLocation/mylocationCityBlackBox.png";
  }

  if (locationInput === "mylocation") {
    if (currentMonth <= 3) {
      cityImage.src = "Images/Locations/MyLocation/mylocationCitySunnyDay.png";
    }
    if (currentMonth > 2 && currentMonth < 9) {
      cityImage.src = "Images/Locations/MyLocation/mylocationCitySunnyDay.png";
    }
    if (currentMonth > 8 && currentMonth < 12) {
      cityImage.src = "Images/Locations/MyLocation/mylocationCitySunnyDay.png";
    }
    if (currentMonth === 12) {
      cityImage.src = "Images/Locations/MyLocation/mylocationCitySunnyDay.png";
    }
    cityWindows.src = "Images/Locations/MyLocation/emptyWindows.png";
    cityBlackImage.src = "Images/Locations/MyLocation/mylocationCityBlackBox.png";
  }


  //Load sky

  const skyImage = new Image();
  if(isMorning === true){
    skyImage.src = "Images/Sky/morningSky.png";
  }

  if(isDay === true){
    skyImage.src = "Images/Sky/skySunny.png";
  }

  if(isNight === true){
    skyImage.src = "Images/Sky/nightSky.png";
  }
  

  // Load Sun and Moon
  const sunA = new Image();
  sunA.src = "Images/moonandsun/sun.png";
  //----------------------------------------------------------------------------------------------------------//
  // WEATHER, DAY AND NIGHT CYCLE, SKY, SEASON IMPLEMENTATION SECTION
  //----------------------------------------------------------------------------------------------------------//
  // MOON CYCLE FUNCTION
  //----------------------------------------------------------------------------------------------------------//
  function getMoonPhase(year, month, day) {
    var daysInYear = (daysInMonth = jd = b = 0);

    if (month < 3) {
      year--;
      month += 12;
    }
    ++month;
    daysInYear = 365.25 * year;
    daysInMonth = 30.6 * month;
    totalDaysInelapse = daysInYear + daysInMonth + day - 694039.09; //jd is total days elapsed
    totalDaysInelapse /= 29.5305882; //divide by the moon cycle
    totalDaysInelapseInteger = parseInt(totalDaysInelapse); //int(jd) -> b, take integer part of jd
    totalDaysInelapse -= totalDaysInelapseInteger; //subtract integer part to leave fractional part of original jd
    totalDaysInelapseInteger = Math.round(totalDaysInelapse * 8); //scale fraction from 0-8 and round
    if (totalDaysInelapseInteger >= 8) {
      totalDaysInelapseInteger = 0; //0 and 8 are the same so turn 8 into 0
    }

    // 0 => New Moon
    // 1 => Waxing Crescent Moon
    // 2 => Quarter Moon
    // 3 => Waxing Gibbous Moon
    // 4 => Full Moon
    // 5 => Waning Gibbous Moon
    // 6 => Last Quarter Moon
    // 7 => Waning Crescent Moon

    return totalDaysInelapseInteger;
  }
  let currentMoonPhase = getMoonPhase(currentYear, currentMonth, currentDay);

  const moonA = new Image();
  if (currentMoonPhase < 3) {
    moonA.src = "Images/moonandsun/moonhalf.png";
  }
  if (currentMoonPhase < 5 && currentMoonPhase > 2) {
    moonA.src = "Images/moonandsun/mooncrescent.png";
  }
  if (currentMoonPhase === 4) {
    moonA.src = "Images/moonandsun/moonfull.png";
  }

  if (currentMoonPhase === 5) {
    moonA.src = "Images/moonandsun/moonfull.png";
  }
  if (currentMoonPhase < 8 && currentMoonPhase > 5) {
    moonA.src = "Images/moonandsun/moonhalf.png";
  }

  //----------------------------------------------------------------------------------------------------------//
  // DAY AND NIGHT CYCLES
  //----------------------------------------------------------------------------------------------------------//
  
  function sunAndMoon() {
    // SUNSET AND SUNRISE
    if (
      currentTimeInMinutes > currentSunRiseTimeInMinutes &&
      currentTimeInMinutes < currentSunSetTimeInMinutes
    ) {
      runSun();
     
    } else {
      runMoon();
  
    }
  }

  // SUN CYCLE
  //----------------------------------------------------------------------------------------------------------//

  // SET SUN POSITION
  let sunYPos;
  let sunXPos = mapTo(
    currentTimeInMinutes,
    0 + currentSunRiseTimeInMinutes,
    0 + currentSunRiseTimeInMinutes + lengthOfDay,
    0,
    window.innerWidth
  );
  if (currentTimeInMinutes < 720) {
    sunYPos = mapTo(
      currentTimeInMinutes,
      0 + currentSunRiseTimeInMinutes,
      0 + currentSunRiseTimeInMinutes + lengthOfDay / 2,
      window.innerHeight / 2,
      window.innerHeight / 6
    );
  } else {
    sunYPos = mapTo(
      currentTimeInMinutes,
      0 + currentSunRiseTimeInMinutes + lengthOfDay / 2,
      0 + currentSunRiseTimeInMinutes + lengthOfDay,
      window.innerHeight / 6,
      window.innerHeight / 2
    );
  }
  function runSun() {
    sunAndMoonCtx.drawImage(
      sunA,
      sunXPos * relWidth,
      sunYPos * relHeight,
      100,
      100
    );
   
  }

  // MOON CYCLE
  //----------------------------------------------------------------------------------------------------------//
  // SET MOON POSITION
  let moonYPos;
  let moonXPos;
  if (currentTimeInMinutes < currentSunRiseTimeInMinutes) {
    moonXPos = mapTo(
      currentTimeInMinutes,
      0,
      currentSunRiseTimeInMinutes,
      0,
      window.innerWidth / 2
    );
  } else {
    moonXPos = mapTo(
      currentTimeInMinutes,
      currentSunSetTimeInMinutes,
      1440,
      window.innerWidth / 2,
      window.innerWidth
    );
  }

  if (currentTimeInMinutes < 720) {
    sunYPos = mapTo(
      currentTimeInMinutes,
      0 + currentSunRiseTimeInMinutes,
      0 + currentSunRiseTimeInMinutes + lengthOfDay / 2,
      window.innerHeight / 2,
      window.innerHeight / 6
    );
  } else {
    sunYPos = mapTo(
      currentTimeInMinutes,
      0 + currentSunRiseTimeInMinutes + lengthOfDay / 2,
      0 + currentSunRiseTimeInMinutes + lengthOfDay,
      window.innerHeight / 6,
      window.innerHeight / 2
    );
  }
  function runMoon() {
    sunAndMoonCtx.drawImage(moonA, moonXPos, 150, 55, 55);
  
  }

  //----------------------------------------------------------------------------------------------------------//
  //SKY
  //----------------------------------------------------------------------------------------------------------//
  let skyBrightness;
  function runSky() {
    skyCtx.drawImage(
      skyImage,
      skyImage.naturalWidth * croptWidthStart,
      0,
      skyImage.naturalWidth * croptWidthEnd,
      skyImage.naturalHeight,
      0,
      0,
      skyWidth,
      skyHeight
    );

    // MAP RGBA TO TIME
    if (currentTimeInMinutes <= 719) {
      skyBrightness = mapTo(
        currentTimeInMinutes,
        currentSunRiseTimeInMinutes,
        500,
        0.6,
        0
      );
    }
    if (currentTimeInMinutes > 719) {
      skyBrightness = mapTo(
        currentTimeInMinutes,
        1000,
        1440,
        0,
        0.6
      );
    }

    // skyBrightness = 0
    // MAINPULATE SKY COLOR
    skyCtx.fillStyle = "rgb(0,0,0,"+ skyBrightness +")"
    skyCtx.fillRect(0,0,window.innerWidth, window.innerHeight)
    skyCtx.fill()
  }

  // Night color to sky
  function nightColor(){
    cityCtx.fillStyle = 'rgb(31, 15, 187,0.3)'
    cityCtx.rect(0,0,window.innerWidth, window.innerHeight)
    cityCtx.fill()
  }

  
  // Night color to sky
  function morningColor(){
    cityCtx.fillStyle = 'rgb(255, 0, 255,0.1)'
    cityCtx.rect(0,0,window.innerWidth, window.innerHeight)
    cityCtx.fill()
  }


  //----------------------------------------------------------------------------------------------------------//
  // CITY FUNCTIONS
  //----------------------------------------------------------------------------------------------------------//

  //DRAW CITY
  function cityDrawMain() {
    cityCtx.drawImage(
      cityImage,cityImage.naturalWidth * croptWidthStart,0,cityImage.naturalWidth * croptWidthEnd, cityImage.naturalHeight, 0, cityHeight - 650 * relHeight, cityWidth -1 * relWidth, cityHeight - 110 * relHeight
    );
  }

  function cityWindowsDraw(){
    cityBlackCtx.drawImage(
      cityWindows,
      cityWindows.naturalWidth * croptWidthStart,
      0,
      cityWindows.naturalWidth * croptWidthEnd,
      cityWindows.naturalHeight,
      0,
      cityHeight - 650 * relHeight,
      cityWidth -1 * relWidth,
      cityHeight - 110 * relHeight
    );
  }
  

  

  function cityBlackDraw() {
    cityBlackCtx.drawImage(
      cityBlackImage,
      cityBlackImage.naturalWidth * croptWidthStart,
      0,
      cityBlackImage.naturalWidth * croptWidthEnd,
      cityBlackImage.naturalHeight,
      0,
      cityBlackHeight - 650 * relHeight,
      cityBlackWidth -1 * relWidth,
      cityBlackHeight - 110 * relHeight
    );

    //DRAW CITY BLACK
  let cityBlackAlpha;

  // MAP ALPHA TO TIME (cityBlackAlpha)
// console.log(currentTimeInMinutes)
// console.log(currentSunRiseTimeInMinutes)

    if (currentTimeInMinutes <= currentSunRiseTimeInMinutes) {
      cityBlackAlpha = mapTo(
        currentTimeInMinutes,
        0,
        currentSunRiseTimeInMinutes+100,
        0.8,
        0 
      );
    }

    if (currentTimeInMinutes > currentSunRiseTimeInMinutes && currentTimeInMinutes < currentSunSetTimeInMinutes ) {
      cityBlackAlpha = 0
    }

    if (currentTimeInMinutes > currentSunSetTimeInMinutes) {
      cityBlackAlpha = mapTo(
        currentTimeInMinutes,
        currentSunSetTimeInMinutes-100,
        1350,
        0,
        0.7
      );
    }
    // console.log(cityBlackAlpha)

  cityBlackCtx.globalAlpha = cityBlackAlpha;
  }

  //----------------------------------------------------------------------------------------------------------//
  // WEATHER APPLICATION SECTION 
  //----------------------------------------------------------------------------------------------------------//

  // SET IF TO DISPLAY CURRENT WEATHER OR FORCAST
  let buttonCurrentWeather = document.querySelector("#buttonCurrentWeather");
  let buttonTomorrowWeather = document.querySelector("#buttonTomorrowWeather");

  let forcastSelector = document.getElementById("forcastSelector")
 buttonCurrentWeather.addEventListener("click", setForecastorCurrent)
 buttonTomorrowWeather.addEventListener("click", setForecastorCurrent)
 
  buttonCurrentWeather.click()
 
forcastSelector.addEventListener("change", setForecastorCurrent)

  function setForecastorCurrent (e){



    let weatherSelectText = "Today"
    let selectedWeatherDescription;
    let selectedTemp;
    let selectedWinddirection;
    let selectedWindSpeed;
    let selectedItemForcast = e.target.value;
    let clickedItemForcast = e.target.id;
    let weatherId = currentWeatherId;        
    let isToday = true

       
          //Set weather id to current
      if(selectedItemForcast === "today" || clickedItemForcast === "buttonCurrentWeather") {
      weatherId = currentWeatherId;
      weatherSelectText = "Today";
      selectedWeatherDescription = currentWeatherDescription;
      selectedTemp = currentTemperatureInCelsius;
      selectedWinddirection = currentWindDirectionDegrees;
      selectedWindSpeed = currentWindSpeedMs;
      currentTimeInMinutes = Number(currentHour) * 60 + Number(currentMinutes); //reset time
      isToday = true

      // currentTimeInMinutes = 1200
      if (currentTimeInMinutes <= currentSunRiseTimeInMinutes) {
        isMorning = true;
        isDay = false;
        isNight = false;
       }
       
       if (currentTimeInMinutes > currentSunRiseTimeInMinutes && currentTimeInMinutes < currentSunSetTimeInMinutes ) {
         isMorning = false;
         isDay = true;
         isNight = false;
       }
       
       if (currentTimeInMinutes > currentSunSetTimeInMinutes) {
         isMorning = false;
         isDay = false;
         isNight = true;
       }
       
      if(isMorning === true){
        skyImage.src = "Images/Sky/morningSky.png";
      }
    
      if(isDay === true){
        skyImage.src = "Images/Sky/skySunny.png";
      }
    
      if(isNight === true){
        skyImage.src = "Images/Sky/nightSky.png";
      }
      
    }

            //Set weather id to tomorrow at 12.00

    if(selectedItemForcast === "tomorrowAt12") {
      weatherId = forecast_Plus1D_At_1200_WeatherId
      weatherSelectText = "Tomorrow";
      selectedWeatherDescription = forecast_Plus1D_At_1200_Description;
      selectedTemp = forecast_Plus1D_At_1200_TemperatureInCelsius;
      selectedWinddirection = forecast_Plus1D_At_1200_DirectionDegrees;
      selectedWindSpeed = forecast_Plus1D_At_1200_WindSpeed;    
      currentTimeInMinutes = 720 //Sets the time to 12.00
      skyImage.src = "Images/Sky/skySunny.png";
      isDay = true
      isToday = false

    } 

    if(selectedItemForcast === "dayaftertomorrowAt12") {
      weatherId = forecast_Plus2D_At_1200_WeatherId
      weatherSelectText = "Day after tomorrow ";
      selectedWeatherDescription = forecast_Plus2D_At_1200_Description;
      selectedTemp = forecast_Plus2D_At_1200_TemperatureInCelsius;
      selectedWinddirection = forecast_Plus2D_At_1200_DirectionDegrees;
      selectedWindSpeed = forecast_Plus2D_At_1200_WindSpeed;    
      currentTimeInMinutes = 720 //Sets the time to 12.00
      skyImage.src = "Images/Sky/skySunny.png";
      isDay = true
      isToday = false
    } 
  







//Manually change location --->
    // weatherLocation.textContent = locationInputSelect
   
    weatherDescription.textContent = selectedWeatherDescription;
    temperature.textContent = selectedTemp + " °C"
    weatherDay.textContent = "Weather " + weatherSelectText;
    windSpeedText.textContent = "Wind speed " + selectedWindSpeed + " m/s"




  // WIND VARIABELS
  let windDirection = currentWindDirectionDegrees;
  let windSpeed = currentWindSpeedMs;
  let xSpeedByWindSpeed;
 

  // WIND SETUP
  //Set cloud/rain/snow movement direction from wind degree direction.
  if (windDirection < 181) {
    windDirection = -1;
  } else {
    windDirection = +1;
  }
  //Set cloud speed based on windSpeed

 if(windSpeed <=3){
  xSpeedByWindSpeed = 0.1;
 }
  if (windSpeed > 3) {
    xSpeedByWindSpeed = 0.2;
  }
  if (windSpeed > 7) {
    xSpeedByWindSpeed = 0.3;
  } 









  //Load weather images (clouds)
  //Call cloud images and set image to var
  let cloudImage = new Image();
  let cloudImg;
  

  //Cloud variabels  for types of weather
  let clouds = [];
  let numberOfClouds;
  let cloudSizeMuliply;

  let cloud1 = new Image()
  let cloud2 = new Image()
  let cloud3 = new Image()
  let cloud4 = new Image()
  let cloud5 = new Image()
  
 

  //Rain variabels for types of weather
  let numberOfRainDrops;
  let numberOfSnowFlakes;
  let drizzleVar = 0

// Set the light associated with weather.
function weatherLight(r,g,b,a){
  cityCtx.rect(0,0,weatherCanvas.width, weatherCanvas.height)
  cityCtx.fillStyle =  `rgb(${r},${g},${b},${a}`
  cityCtx.fill()
  }
   
   //Light vars
   let r,g,b,a;


   //Set thunder bool
   let isThunder = false

  //  weatherId = 804

  //WEATHER TYPES
  //----------------------------------------------------------------------------------------------------------//
  //SET WEATHER VARS BASED ON WEATHER ID
  // https://openweathermap.org/weather-conditions
 //ID 200- 232 Thunderstorm
  //----------------------------------------------------------------------------------------------------------//
  // 200 - Thunderstorm with light rain	
  if(weatherId > 199 && weatherId < 233){
 //Clouds
 xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
 numberOfClouds = 20;
 cloudSizeMuliply = 1.5;
 setCloudBrightness = 50;
  //Clouds
  cloud1.src = 'Images/Clouds/stormcloud1.png'
  cloud2.src = 'Images/Clouds/stormcloud2.png'
  cloud3.src = 'Images/Clouds/stormcloud3.png'
  cloud4.src = 'Images/Clouds/stormcloud4.png'
  cloud5.src = 'Images/Clouds/stormcloud5.png'
  //Rain 
 numberOfRainDrops = 70;

 r = 30;
 g = 30;
 b = 90;
 a = 0.4;

 isThunder = true

  }



    //ID 300- 321 Drizzle
  //----------------------------------------------------------------------------------------------------------//
  // 300 - light intensity drizzle
  if (weatherId === 300) {
    //Clouds
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
    numberOfClouds = 30;
    cloudSizeMuliply = 1.5;
    setCloudBrightness = 50;
    drizzleVar = 2
     //Clouds
     cloud1.src = 'Images/Clouds/stormcloud1.png'
     cloud2.src = 'Images/Clouds/stormcloud2.png'
     cloud3.src = 'Images/Clouds/stormcloud3.png'
     cloud4.src = 'Images/Clouds/stormcloud4.png'
     cloud5.src = 'Images/Clouds/stormcloud5.png'
     //Rain 
    numberOfRainDrops = 100;

    r = 30;
    g = 30;
    b = 90;
    a = 0.3;


  }
  // 301 Drizzle
  if (weatherId === 301) {
    //Clouds
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
    numberOfClouds = 40;
    cloudSizeMuliply = 1.5;
    setCloudBrightness = 50;
    drizzleVar = 1.5
     //Clouds
     cloud1.src = 'Images/Clouds/stormcloud1.png'
     cloud2.src = 'Images/Clouds/stormcloud2.png'
     cloud3.src = 'Images/Clouds/stormcloud3.png'
     cloud4.src = 'Images/Clouds/stormcloud4.png'
     cloud5.src = 'Images/Clouds/stormcloud5.png'
     //Rain 
    numberOfRainDrops = 300;

    r = 30;
    g = 30;
    b = 90;
    a = 0.4;

           //Audio
  }
  //302 - 321 Heavy dizzle
  if (weatherId > 301 && weatherId < 322) {
    //Clouds
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
    numberOfClouds = 40;
    cloudSizeMuliply = 1.5;
    setCloudBrightness = 50;
    drizzleVar = 1
     //Clouds
     cloud1.src = 'Images/Clouds/stormcloud1.png'
     cloud2.src = 'Images/Clouds/stormcloud2.png'
     cloud3.src = 'Images/Clouds/stormcloud3.png'
     cloud4.src = 'Images/Clouds/stormcloud4.png'
     cloud5.src = 'Images/Clouds/stormcloud5.png'
     //Rain 
    numberOfRainDrops = 400;

    r = 30;
    g = 30;
    b = 90;
    a = 0.4;

           //Audio
  }


   //ID 500- 531 Rain
  //----------------------------------------------------------------------------------------------------------//
  // 500 - Light Rain
  if (weatherId === 500) {
    //Clouds
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
    numberOfClouds = 40;
    cloudSizeMuliply = 1.5;
    setCloudBrightness = 50;
     //Clouds
     cloud1.src = 'Images/Clouds/stormcloud1.png'
     cloud2.src = 'Images/Clouds/stormcloud2.png'
     cloud3.src = 'Images/Clouds/stormcloud3.png'
     cloud4.src = 'Images/Clouds/stormcloud4.png'
     cloud5.src = 'Images/Clouds/stormcloud5.png'
     //Rain 
    numberOfRainDrops = 100;

    r = 30;
    g = 30;
    b = 90;
    a = 0.3;

           //Audio
  }

  // 501 - Moderate Rain
  if (weatherId === 501) {
    //Clouds
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
    numberOfClouds = 40;
    cloudSizeMuliply = 1.5;
    setCloudBrightness = 50;
     //Clouds
     cloud1.src = 'Images/Clouds/stormcloud1.png'
     cloud2.src = 'Images/Clouds/stormcloud2.png'
     cloud3.src = 'Images/Clouds/stormcloud3.png'
     cloud4.src = 'Images/Clouds/stormcloud4.png'
     cloud5.src = 'Images/Clouds/stormcloud5.png'
     //Rain 
    numberOfRainDrops = 200;

    r = 30;
    g = 30;
    b = 90;
    a = 0.4;

           //Audio
  }

   // 502 - heavy intensity rain
   if (weatherId === 502) {
    //Clouds
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
    numberOfClouds = 40;
    cloudSizeMuliply = 1.5;
    setCloudBrightness = 50;
     //Clouds
     cloud1.src = 'Images/Clouds/stormcloud1.png'
     cloud2.src = 'Images/Clouds/stormcloud2.png'
     cloud3.src = 'Images/Clouds/stormcloud3.png'
     cloud4.src = 'Images/Clouds/stormcloud4.png'
     cloud5.src = 'Images/Clouds/stormcloud5.png'
     //Rain 
    numberOfRainDrops = 300;

    r = 30;
    g = 30;
    b = 90;
    a = 0.4;

       //Audio

  }

    // 503 - 531 extreme and shower intensity rain
    if (weatherId > 502 && weatherId < 532) {
      //Clouds
      xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
      numberOfClouds = 40;
      cloudSizeMuliply = 1.5;
      setCloudBrightness = 50;
       //Clouds
       cloud1.src = 'Images/Clouds/stormcloud1.png'
       cloud2.src = 'Images/Clouds/stormcloud2.png'
       cloud3.src = 'Images/Clouds/stormcloud3.png'
       cloud4.src = 'Images/Clouds/stormcloud4.png'
       cloud5.src = 'Images/Clouds/stormcloud5.png'
       //Rain 
      numberOfRainDrops = 400;
  
      r = 30;
      g = 30;
      b = 90;
      a = 0.5;
  
         //Audio
  
    }

   //ID 600- 622 SNOW
  //----------------------------------------------------------------------------------------------------------//
   // 600 - Light Snow
   if (weatherId === 600) {
    //Clouds
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
    numberOfClouds = 40;
    cloudSizeMuliply = 1.5;
    setCloudBrightness = 50;
     //Clouds
         //Clouds
         cloud1.src = 'Images/Clouds/stormcloud1.png'
         cloud2.src = 'Images/Clouds/stormcloud2.png'
         cloud3.src = 'Images/Clouds/stormcloud3.png'
         cloud4.src = 'Images/Clouds/stormcloud4.png'
         cloud5.src = 'Images/Clouds/stormcloud5.png'
     //Snow 
    numberOfSnowFlakes = 50;
    r = 30;
    g = 30;
    b = 90;
    a = 0.5;



           //Audio
  }

     // 601 - Snow
     if (weatherId === 601) {
      xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
    numberOfClouds = 40;
    cloudSizeMuliply = 1.5;
    setCloudBrightness = 50;
     //Clouds
         //Clouds
         cloud1.src = 'Images/Clouds/stormcloud1.png'
         cloud2.src = 'Images/Clouds/stormcloud2.png'
         cloud3.src = 'Images/Clouds/stormcloud3.png'
         cloud4.src = 'Images/Clouds/stormcloud4.png'
         cloud5.src = 'Images/Clouds/stormcloud5.png'
     //Snow 
    numberOfSnowFlakes = 100;
    r = 30;
    g = 30;
    b = 90;
    a = 0.5;
           //Audio
    }

      // 602 - Heavy Snow
      if (weatherId === 602) {
        xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
      numberOfClouds = 40;
      cloudSizeMuliply = 1.5;
      setCloudBrightness = 50;
       //Clouds
           //Clouds
           cloud1.src = 'Images/Clouds/stormcloud1.png'
           cloud2.src = 'Images/Clouds/stormcloud2.png'
           cloud3.src = 'Images/Clouds/stormcloud3.png'
           cloud4.src = 'Images/Clouds/stormcloud4.png'
           cloud5.src = 'Images/Clouds/stormcloud5.png'
       //Snow 
      numberOfSnowFlakes = 400;
      r = 30;
      g = 30;
      b = 90;
      a = 0.5;
             //Audio
      }

       // 620-622 - Heavy Snow
       if (weatherId > 619 && weatherId < 623) {
        xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
        numberOfClouds = 40;
        cloudSizeMuliply = 1.5;
        setCloudBrightness = 50;
       //Clouds
           //Clouds
           cloud1.src = 'Images/Clouds/stormcloud1.png'
           cloud2.src = 'Images/Clouds/stormcloud2.png'
           cloud3.src = 'Images/Clouds/stormcloud3.png'
           cloud4.src = 'Images/Clouds/stormcloud4.png'
           cloud5.src = 'Images/Clouds/stormcloud5.png'
          //Snow 
          numberOfSnowFlakes = 300;
          r = 30;
          g = 30;
          b = 90;
          a = 0.5;
                //Audio
      }

   // 615 Light Snow and Rain
   if (weatherId > 610 && weatherId < 617) {
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
    numberOfClouds = 40;
    cloudSizeMuliply = 1.5;
    setCloudBrightness = 50;
   //Clouds
       //Clouds
       cloud1.src = 'Images/Clouds/stormcloud1.png'
       cloud2.src = 'Images/Clouds/stormcloud2.png'
       cloud3.src = 'Images/Clouds/stormcloud3.png'
       cloud4.src = 'Images/Clouds/stormcloud4.png'
       cloud5.src = 'Images/Clouds/stormcloud5.png'

       r = 30;
       g = 30;
       b = 90;
       a = 0.5;
     //Rain 
    numberOfRainDrops = 50;
     //Snow 
    numberOfSnowFlakes = 100;

           //Audio
  }

  // ID 700 - 781 Atmosphere
  //----------------------------------------------------------------------------------------------------------//
  if (weatherId > 699 && weatherId < 782) {
    //Clouds
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;

    numberOfClouds = 40;
    cloudSizeMuliply = 1.5;
    setCloudBrightness = 50;
     //Clouds
     cloud1.src = 'Images/Clouds/cloud1.png'
     cloud2.src = 'Images/Clouds/cloud2.png'
     cloud3.src = 'Images/Clouds/cloud3.png'
     cloud4.src = 'Images/Clouds/cloud4.png'
     cloud5.src = 'Images/Clouds/cloud5.png'

     r = 200
     g = 200
     b = 220
     a = 0.5

        //Audio
  }


  //ID 800- 804
  //----------------------------------------------------------------------------------------------------------//
   // 800 - Clear

   if (weatherId === 800) {
    //Clouds
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
    numberOfClouds = 3;
    cloudSizeMuliply = 0.5;
    setCloudBrightness = 0;
    //Clouds
    cloud1.src = 'Images/Clouds/cloud1.png'
    cloud2.src = 'Images/Clouds/cloud2.png'
    cloud3.src = 'Images/Clouds/cloud3.png'
    cloud4.src = 'Images/Clouds/cloud4.png'
    cloud5.src = 'Images/Clouds/cloud5.png'


   r = 0
   g = 0
   b = 0
   a = 0

      //Audio
  }

  // 801 - Few clouds
  if (weatherId === 801) {
    //Clouds
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
    numberOfClouds = 10;
    cloudSizeMuliply = 1;
    setCloudBrightness = 0;
    //Clouds
    cloud1.src = 'Images/Clouds/cloud1.png'
    cloud2.src = 'Images/Clouds/cloud2.png'
    cloud3.src = 'Images/Clouds/cloud3.png'
    cloud4.src = 'Images/Clouds/cloud4.png'
    cloud5.src = 'Images/Clouds/cloud5.png'

   r = 0
   g = 0
   b = 0
   a = 0

      //Audio
  }
  // 802
  if (weatherId === 802) {
    //Clouds
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
    numberOfClouds =  20;
    cloudSizeMuliply = 1;
    setCloudBrightness = 15;
    //Clouds
    cloud1.src = 'Images/Clouds/cloud1.png'
    cloud2.src = 'Images/Clouds/cloud2.png'
    cloud3.src = 'Images/Clouds/cloud3.png'
    cloud4.src = 'Images/Clouds/cloud4.png'
    cloud5.src = 'Images/Clouds/cloud5.png'


   r = 0
   g = 0
   b = 0
   a = 0

  
  }
   // 803
   if (weatherId === 803) {
    //Clouds
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
    numberOfClouds = 20;
    cloudSizeMuliply = 1;
    setCloudBrightness = 25;
   //Clouds
   cloud1.src = 'Images/Clouds/cloud1.png'
   cloud2.src = 'Images/Clouds/cloud2.png'
   cloud3.src = 'Images/Clouds/cloud3.png'
   cloud4.src = 'Images/Clouds/cloud4.png'
   cloud5.src = 'Images/Clouds/cloud5.png'
   
   //Audio

   r = 0
   g = 0
   b = 0
   a = 0

  }
  // 804
  if (weatherId === 804) {
    //Clouds
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;

    numberOfClouds = 50;
    cloudSizeMuliply = 1;
    setCloudBrightness = 50;
     //Clouds
     cloud1.src = 'Images/Clouds/cloud1.png'
     cloud2.src = 'Images/Clouds/cloud2.png'
     cloud3.src = 'Images/Clouds/cloud3.png'
     cloud4.src = 'Images/Clouds/cloud4.png'
     cloud5.src = 'Images/Clouds/cloud5.png'

     r = 0
     g = 0
     b = 0
     a = 0

  }

  // CLOUDS FUNCTIONS
  //----------------------------------------------------------------------------------------------------------//


// cloud as class

let cloudArray = []
let numOfClouds = numberOfClouds

class Cloud{
constructor(xPos, yPos, length, height){
  this.xPos = xPos * relWidth;
  this.yPos = yPos * relHeight;
  this.length = length * relWidth * cloudSizeMuliply
  this.height = height * relHeight * cloudSizeMuliply
  this.speed = xSpeedByWindSpeed
  this.randomNum = Math.random()*2
}

cloudUpdate(){
  this.xPos = this.xPos + this.speed

  if(this.xPos > weatherCanvas.width){
    this.xPos = -300
  }
  if(this.xPos < -310){
    this.xPos = weatherCanvas.width
  }
}

drawCloud () {

weatherCtx.drawImage(cloud1,this.xPos + 50, this.yPos -50,this.length,this.height)
// weatherCtx.drawImage(cloud2,this.xPos + 60, this.yPos -70,this.length,this.height)
weatherCtx.drawImage(cloud3,this.xPos-50, this.yPos+50,this.length,this.height)
weatherCtx.drawImage(cloud4,this.xPos-70, this.yPos+70,this.length,this.height)
weatherCtx.drawImage(cloud5,this.xPos, this.yPos,this.length,this.height)


  }
}

  //Clouds initialize/setup

function initClouds(){
  for(let i = 0; i < numOfClouds; i++){
    let xPos = Math.random() * weatherCanvas.width*2;
    let yPos = Math.random() * weatherCanvas.height+100;
    let length = randomInt(200, 500)
    let height = randomInt(100, 300)
    cloudArray.push(new Cloud(xPos,yPos, length, height))
  }
}
initClouds()
     
     function init() {
      for (let i = 0; i < numberOfParticles; i++) {
          const x = Math.random() * rainCanvas.width;
          const y = Math.random() * rainCanvas.height;
          particlesArray.push(new Particle(x ,y))
      }
    }


  //Cloud global alpha. Map cloudAlpha to time 
let cloudAlpha;

  if (currentTimeInMinutes <= currentSunRiseTimeInMinutes) {
    cloudAlpha = mapTo(
      currentTimeInMinutes,
      0,
      currentSunRiseTimeInMinutes,
      0.1,
      0.2
    );
  }

  if (currentTimeInMinutes > currentSunRiseTimeInMinutes && currentTimeInMinutes < currentSunSetTimeInMinutes ) {
    cloudAlpha = 0.5
  }

  if (currentTimeInMinutes > currentSunSetTimeInMinutes) {
    cloudAlpha = mapTo(
      currentTimeInMinutes,
      currentSunSetTimeInMinutes,
      1440,
      0.15,
      0.1
    );
  }
  weatherCtx.globalAlpha = cloudAlpha;

  //RAIN
  //----------------------------------------------------------------------------------------------------------//
  let particlesArray = [];
  const numberOfParticles = numberOfRainDrops;
  

  let dropImage = new Image();

  if(isMorning === true){
    dropImage.src = "Images/rainandsnow/rain13.png"
  }
  if(isDay === true){
    dropImage.src = "Images/rainandsnow/rain13.png"

  }
  if(isNight === true){
    dropImage.src = "Images/rainandsnow/rain13.png"
  }
  
  
  
  rainCtx.globalAlpha = 1
  
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 6 + 1 - drizzleVar;
      this.weight = Math.random() * 0.5 + 1;
      this.directionX = Math.random() *  xSpeedByWindSpeed * 2; // insert wind direction
      // this.r =  Math.random() * 255
      // this.g = Math.random() * 255
      // this.b = Math.random() * 255
      this.randomNum = Math.random() * 10
  
    }
    update() {
      if (this.y > rainCanvas.height) {
        this.y = 0 - this.size;
        this.weight = Math.random() * 0.5 + 1;
        this.x = Math.random() * rainCanvas.width * 1.3;
      }
      this.weight += 0.01;
      this.y += this.weight;
      this.x += this.directionX;
  
    }
    draw() {

      
      rainCtx.drawImage(dropImage, this.x, this.y, this.size, this.size*2)
      // rainCtx.rect(this.x, this.y, this.size, this.size*2)
      // rainCtx.fill()

    }
  }
  
  function init() {
    for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * rainCanvas.width;
        let y = Math.random() * rainCanvas.height;

        particlesArray.push(new Particle(x ,y))
    }
  }
  
  init();
//RAIN END  




//SNOW
  //----------------------------------------------------------------------------------------------------------//
  let snowParticlesArray = [];
  const numberOfSnowParticles = numberOfSnowFlakes;
  

  let snowImage = new Image();
  if(isMorning === true){
    snowImage.src = "Images/rainandsnow/snowflake3.png"
  }
  if(isDay === true){
    snowImage.src = "Images/rainandsnow/snowflake3.png"
  }
  if(isNight === true){
    snowImage.src = "Images/rainandsnow/snowflake3.png"
  }
  
    
  class SnowParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3 + 2;
      this.weight = Math.random() * 0.05 + 0.15;
      this.directionX = Math.random() *  xSpeedByWindSpeed * 2; // insert wind direction
      this.r =  Math.random() * 255
      this.g = Math.random() * 255
      this.b = Math.random() * 255
  
    }
    updateSnow() {
      if (this.y > rainCanvas.height) {
        this.y = 0 - this.size -50;
        this.weight = Math.random() * 0.1 + 0.15;
        this.x = Math.random() * rainCanvas.width * 1.3;
      }
      this.weight += 0.004;
      this.y += this.weight;
      this.x += this.directionX;
  
    }
    drawSnow() {
      rainCtx.drawImage(snowImage, this.x, this.y, this.size, this.size*2)
    }
  }
  
  function initSnow() {
    for (let i = 0; i < numberOfSnowParticles; i++) {
        const x = Math.random() * rainCanvas.width;
        const y = Math.random() * rainCanvas.height;
        snowParticlesArray.push(new SnowParticle(x ,y))
    }
  }
  
  initSnow();
//SNOW END  

//THUNDER
//----------------------------------------------------------------------------------------------------------//
const bolt = new Image()
bolt.src = 'Images/rainandsnow/thunder1.png'
const bolt2 = new Image()
bolt2.src = 'Images/rainandsnow/thunder2.png'
const bolt3 = new Image()
bolt3.src = 'Images/rainandsnow/thunder3.png'
const bolt4 = new Image()
bolt4.src = 'Images/rainandsnow/thunder4.png'
const bolt5 = new Image()
bolt5.src = 'Images/rainandsnow/thunder5.png'
const bolt6 = new Image()
bolt6.src = 'Images/rainandsnow/thunder6.png'

function drawThunder (){
  rainCtx.drawImage(bolt,0,0,weatherCanvas.width,weatherCanvas.height)
}
function drawThunder2 (){
  rainCtx.drawImage(bolt2,0,0,weatherCanvas.width,weatherCanvas.height)
}
function drawThunder3 (){
  rainCtx.drawImage(bolt3,0,0,weatherCanvas.width,weatherCanvas.height)
}
function drawThunder4 (){
  rainCtx.drawImage(bolt4,0,0,weatherCanvas.width,weatherCanvas.height)
}
function drawThunder5 (){
  rainCtx.drawImage(bolt5,0,0,weatherCanvas.width,weatherCanvas.height)
}
function drawThunder6 (){
  rainCtx.drawImage(bolt6,0,0,weatherCanvas.width,weatherCanvas.height)
}


let counter = 0
function runThunder(){
    counter = counter +1
if(counter > 100 && counter < 110){
  drawThunder()
  rainCtx.fillStyle = 'rgb(255,255,255,0.2)'
  rainCtx.rect(0,0,rainCanvas.width,rainCanvas.height)
  rainCtx.fill()
  }

  if(counter > 200 && counter < 210){
    drawThunder2()
    rainCtx.fillStyle = 'rgb(255,255,255,0.3)'
    rainCtx.rect(0,0,rainCanvas.width,rainCanvas.height)
    rainCtx.fill()
    }

    if(counter > 570 && counter < 575){
      drawThunder3()
      rainCtx.fillStyle = 'rgb(255,255,255,0.3)'
      rainCtx.rect(0,0,rainCanvas.width,rainCanvas.height)
      rainCtx.fill()
      }
      if(counter > 590 && counter < 596){
        drawThunder4()
        rainCtx.fillStyle = 'rgb(255,255,255,0.3)'
        rainCtx.rect(0,0,rainCanvas.width,rainCanvas.height)
        rainCtx.fill()
        }

        if(counter > 730 && counter < 740){
          drawThunder5()
          rainCtx.fillStyle = 'rgb(255,255,255,0.3)'
          rainCtx.rect(0,0,rainCanvas.width,rainCanvas.height)
          rainCtx.fill()
          }
          if(counter > 930 && counter < 935){
            drawThunder6()
            rainCtx.fillStyle = 'rgb(255,255,255,0.3)'
            rainCtx.rect(0,0,rainCanvas.width,rainCanvas.height)
            rainCtx.fill()
            }


  if (counter > 1000){
    counter = 0
  }
}


  // Leafs FUNCTIONS
  //----------------------------------------------------------------------------------------------------------//
  let leaf1 = new Image()
  leaf1.src = 'Images/Locations/Stockholm/leaves1.png'
  let leaf2 = new Image()
  leaf2.src = 'Images/Locations/Stockholm/leaves2.png'
  
  let numberOfLeafs = 1
  // Leaf as class
  
  let leafArray = []
  let numOfLeafs = numberOfLeafs
  
  
  class Leaf{
  constructor(xPos, yPos, length, height){
    this.xPos = xPos * relWidth;
    this.yPos = yPos * relHeight;
    this.length = length * relWidth
    this.height = height * relHeight
    this.speed = xSpeedByWindSpeed * randomInt(4,5)
    this.leafTurnSpeedHeight = randomInt(-1,2)
    this.randomNum = Math.random()*2
  }
  
  leafUpdate(){

    this.xPos = this.xPos + this.speed
    this.height = this.height + this.leafTurnSpeedHeight

    if(this.height > 23){
      this.leafTurnSpeedHeight = this.leafTurnSpeedHeight * -1
    }

    if(this.height < -23){
      this.leafTurnSpeedHeight = this.leafTurnSpeedHeight * -1
    }


  
    if(this.xPos > cityCanvas2.width){
      this.xPos = -20
    }
    if(this.xPos < -310){
      this.xPos = cityCanvas2.width
    }
    
  }
  
  leafDraw () {
    // leafCtx.drawImage(leaf1,this.xPos + 50, this.yPos -50,this.length,this.height)
    cityCtx.drawImage(leaf2,this.xPos + 60, this.yPos -70 ,this.length,this.height)

    }
  }
    //Leafs initialize/setup
  
  function initLeafs(){
    for(let i = 0; i < numOfLeafs; i++){
      let xPos = Math.random() * weatherCanvas.width*2;
      // let yPos = (Math.random() * weatherCanvas.height*2)+400;
      let yPos = window.innerHeight+200
      let length = randomInt(10, 20)
      let height = randomInt(10, 20)
      leafArray.push(new Leaf(xPos,yPos, length, height))
    }
  }
  initLeafs()
       

//----------------------------------------------------------------------------------------------------------//
//BIRD ANIMATION
//----------------------------------------------------------------------------------------------------------//

let bird1 = new Image();
bird1.src = 'Images/Locations/Stockholm/birdspritesheet1.png';
let bird2 = new Image();
bird2.src = 'Images/Locations/Stockholm/birdspritesheet2.png';
let bird3 = new Image();
bird3.src = 'Images/Locations/Stockholm/birdspritesheet3.png';


const scale = 1.5;
const width = 16;
const height = 18;
const scaledWidth = scale * width;
const scaledHeight = scale * height;

function drawFrame(birdNum, frameX, frameY, canvasX, canvasY) {
  cityCtx.drawImage(birdNum,
                frameX * width, frameY * height, width, height,
                canvasX, canvasY, scaledWidth, scaledHeight);
}

const cycleLoop = 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    2, 2, 2, 2,2, 2,2, 2,2, 2,2, 2,2, 2,2, 2,2, 2,2, 2,
      3, 3, 3, 3,3, 3,3, 3,3, 3,3, 3,3, 3,3, 3,3, 3,3, 3,];
      const cycleLoop2 = 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    2, 2, 2, 2,2, 2,2, 2,2, 2,2, 2,2, 2,2, 2,2, 2,2, 2,
      3, 3, 3, 3,3, 3,3, 3,3, 3,3, 3,3, 3,3, 3,3, 3,3, 3,];

let currentLoopIndex = 0;

let birdStartPosX = 100 * relWidth
let birdStartPosY = 450 * relHeight

let birdX = birdStartPosX
let birdY = birdStartPosY
let birdX1 = birdStartPosX
let birdY1 = birdStartPosY-10
let birdX2= birdStartPosX
let birdY2 = birdStartPosY +10
let birdSpeedX = 0.2
let birdSpeedY = 0
let birdSpeedX1 = 0.1
let birdSpeedY1 = 0
let birdSpeedX2 = 0.07
let birdSpeedY2 = 0

function runBirds(){
  cityCtx.clearRect(0, 0, cityCanvas2.width, cityCanvas2.height);
  drawFrame(bird1,cycleLoop[currentLoopIndex], 0, birdX, birdY);
  drawFrame(bird2,cycleLoop[currentLoopIndex], 0, birdX1, birdY1);
  drawFrame(bird3,cycleLoop2[currentLoopIndex], 0, birdX2, birdY2);

  currentLoopIndex++;
  if (currentLoopIndex >= cycleLoop.length) {
    currentLoopIndex = 0;
  }
}

function birdUpdate(){
  birdX = birdX + birdSpeedX
  birdY = birdY + birdSpeedY
  if (birdX > birdX + 50){
    birdSpeedX = birdSpeedX * -1
  }
  if(birdX < birdX - 50){
    birdSpeedX = birdSpeedX * -1
  }

  birdX1 = birdX1 + birdSpeedX1
  birdY1 = birdY1 + birdSpeedY1
  if (birdX1 > birdX1 + 50){
    birdSpeedX1 = birdSpeedX1 * -1
  }
  if(birdX1 < birdX1 - 50){
    birdSpeedX1 = birdSpeedX1 * -1
  }

  birdX2 = birdX2 + birdSpeedX2
  birdY2 = birdY2 + birdSpeedY2
  if (birdX2 > birdX2 + 50){
    birdSpeedX2 = birdSpeedX2 * -1
  }
  if(birdX2 < birdX2 - 50){
    birdSpeedX2 = birdSpeedX2 * -1
  }
}
//----------------------------------------------------------------------------------------------------------//
// BIRDS END

  //----------------------------------------------------------------------------------------------------------//
  //SETUP
  //----------------------------------------------------------------------------------------------------------//



  



  //----------------------------------------------------------------------------------------------------------//
  //UPDATE / DRAW / ANIMATE
  //----------------------------------------------------------------------------------------------------------//
  (function update() {
    rainCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    weatherCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    sunAndMoonCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    cityCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    cityBlackCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    skyCtx.clearRect(0,0, window.innerWidth, window.innerHeight)
    iconCtx.clearRect(0,0, window.innerWidth, window.innerHeight)
    //SET ICON
    //RUN SKY
    runSky();
    //RUN WEATHER
 // RUN MOON AND SUN
    sunAndMoon();


    for(let i = 0; i < cloudArray.length; i++){
      cloudArray[i].cloudUpdate()
      cloudArray[i].drawCloud()
    }
    runBirds()
    birdUpdate()
    if(isThunder === true){
      runThunder()
    }

    //RUN CITY
    cityDrawMain();
    cityBlackDraw();
    cityWindowsDraw()

 // RUN LEAVES
 for(let i = 0; i < leafArray.length; i++){
  leafArray[i].leafUpdate();
  leafArray[i].leafDraw();
}


  
    // Set light of city according to weather.
    weatherLight(r,g,b,a)
    // Set time light
    if(isNight === true && isDay !== true){
      nightColor()
    }

    if (isMorning === true && isDay !== true){
      morningColor()
    }
     // RUN RAIN
     for(let i = 0; i < particlesArray.length; i++){
      particlesArray[i].update();
      particlesArray[i].draw();
    }

     // RUN SNOW
     for(let i = 0; i <
       snowParticlesArray.length; i++){
      snowParticlesArray[i].updateSnow();
      snowParticlesArray[i].drawSnow();
     }


      if(isToday === true){
        drawIcons()
      }


    requestAnimationFrame(update);
  })();
} // LAST LINE SET FORECAST TRUE OR FALSE
// SET ICON




})(); //LAST LINE OF WEATHER AND TIME SYSTEM
} // LAST LINE SET LOCATION


       //----------------------------------------------------------------------------------------------------------//
  //AUDIO FUNCTIONS
  const soundbutton = document.getElementById('soundbutton')

  let audio = new Audio('music/mood.mp3')
  soundbutton.addEventListener("click", function(){
  if(audio.paused){
    audio.play();
    soundbutton.innerHTML = "Pause";
  } else {
    audio.pause();
    soundbutton.innerHTML = "Play";
    audio.currentTime = 0
  }
});


//GIVE CREDIT

creditsButtonOverlay.addEventListener('click', giveCredit)
closeCredits.addEventListener('click',closeCreditsFunc)