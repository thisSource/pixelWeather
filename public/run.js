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
  optWidth = 560;
  optHeight = 750;
}

(function setResponsiveSize() {
  relWidth = window.innerWidth / optWidth;
  relHeight = window.innerHeight / optHeight;
})();


   //----------------------------------------------------------------------------------------------------------//
  //AUDIO FUNCTIONS


// const soundbutton = document.getElementById('soundbutton')
// soundbutton.addEventListener('click', playAudio())
  
let audioCount = 0;
let audio = new Audio('music/zeldaHappy.mp3')
function playAudio(){
  if (audioCount === 0){
      audio.play()

      audioCount = 1
  } else {
    audioCount = 0
    audio.pause();
  }
}

//WindowSize detection
// CROP IMAGE
if (window.innerWidth > 601) {
  croptWidthStart = 0;
  croptWidthEnd = 1;
} else {
  croptWidthStart = 0.3;
  croptWidthEnd = 0.6;
}

//----------------------------------------------------------------------------------------------------------//
//DOM ELEMENTS
//----------------------------------------------------------------------------------------------------------//
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
  if( localStorage.Location === undefined){
    locationInputSelect = "Stockholm"
  } else locationInputSelect = localStorage.Location
 
  let locationInputCountrySelect = "Sweden";
  let selectedLocation = e.target.value;

  if(selectedLocation === "karlshamn") {
   localStorage.setItem("Location", "Karlshamn")
    locationInputSelect = localStorage.Location
    locationInputCountrySelect = "Sweden"
    location.reload()
    
  }

  if(selectedLocation === "stockholm") {
    localStorage.setItem("Location", "Stockholm")
    locationInputSelect = localStorage.Location
    locationInputCountrySelect = "Sweden"
    location.reload()
  } 

  // Set text to the selected location
  locationSelector.options[locationSelector.selectedIndex].textContent = locationInputSelect;


//----------------------------------------------------------------------------------------------------------//
//WEATHER & TIME API // GET DATA
//----------------------------------------------------------------------------------------------------------//
let apiKeyWeather = "ef834ba6b77d78c6f0324aee2e241488";
let locationInput = locationInputSelect;
let locationCountryInput = locationInputCountrySelect;

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


const currentTimeData =
  "https://api.ipgeolocation.io/timezone?apiKey=f200af9f73d84b7abdcdaae87831b563&location=" +
  locationInput +
  "," +
  locationCountryInput;




(async function runWeatherAndTimeSystem() {
  //Fetch current Weather
  let responseCurrentWeather = await fetch(currentWeatherURL);
  let jsonCurrentWeather = await responseCurrentWeather.json();

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



  //FORECAST
  //Fetch 5-day 3h Weather forcast
  let responseForcastWeather = await fetch(forcastURL);
  let jsonForcastWeather = await responseForcastWeather.json();
  //Forcast +1 day AT 12.00
  let forecast_Plus1D_At_1200_WeatherId =
    jsonForcastWeather.list[9].weather[0].id;
  let forecast_Plus1D_At_1200_Description =
    jsonForcastWeather.list[9].weather[0].description;
  let forecast_Plus1D_At_1200_TemperatureInKelvin =
    jsonForcastWeather.list[9].main.temp;
  let forecast_Plus1D_At_1200_TemperatureInCelsius = (
    forecast_Plus1D_At_1200_TemperatureInKelvin - 273.15
  ).toFixed(1);
  let forecast_Plus1D_At_1200_WindSpeed = jsonForcastWeather.list[9].wind.speed;
  let forecast_Plus1D_At_1200_DirectionDegrees =
    jsonForcastWeather.list[9].wind.deg;


  // Forcast +2 day AT 12.00
  let forecast_Plus2D_At_1200_WeatherId =
    jsonForcastWeather.list[19].weather[0].id;
  let forecast_Plus2D_At_1200_Description =
    jsonForcastWeather.list[19].weather[0].description;
  let forecast_Plus2D_At_1200_TemperatureInKelvin =
    jsonForcastWeather.list[19].main.temp;
  let forecast_Plus2D_At_1200_TemperatureInCelsius = (
    forecast_Plus1D_At_1200_TemperatureInKelvin - 273.15
  ).toFixed(1);
  let forecast_Plus2D_At_1200_WindSpeed = jsonForcastWeather.list[19].wind.speed;
  let forecast_Plus2D_At_1200_DirectionDegrees =
    jsonForcastWeather.list[19].wind.deg;



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
  // let currentTimeInMinutes = 300

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

console.log("Is morning? " + isMorning)
console.log("Is day? " + isDay)
console.log("Is Night? " + isNight)

 

  //----------------------------------------------------------------------------------------------------------//
  //LOAD MATERIAL
  //----------------------------------------------------------------------------------------------------------//
  //Load city elements

  const cityImage = new Image();
  const cityBlackImage = new Image();
  // const windows = new Image();

  if (locationInput === "Stockholm") {
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

    cityBlackImage.src = "Images/Locations/Stockholm/StockholmCityBlackBox.png";
    // windows.src = "PlaceHolderImagesv1/windows.png";
  }

  // Load window
  const cityWindows = new Image();
  cityWindows.src = "Images/Locations/Stockholm/windows.png";


  if (locationInput === "Karlshamn") {
    if (currentMonth <= 3) {
      cityImage.src = "PlaceHolderImagesv1/Karlshamn/cityKarlshamnWinter2.png";
    }
    if (currentMonth > 2 && currentMonth < 9) {
      cityImage.src = "PlaceHolderImagesv1/Karlshamn/cityKarlshamnSummer2.png";
    }
    if (currentMonth > 8 && currentMonth < 12) {
      cityImage.src = "PlaceHolderImagesv1/Karlshamn/cityKarlshamnWAutumn2.png";
    }
    if (currentMonth === 12) {
      cityImage.src = "PlaceHolderImagesv1/Karlshamn/cityKarlshamnWinter2.png";
    }

    cityBlackImage.src = "PlaceHolderImagesv1//Karlshamn/cityKarlshamnBlack2.png";
    // windows.src = "PlaceHolderImagesv1/windows.png";
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
    moonA.src = "Images/moonandsun/mooncrescent.png";
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
    sunAndMoonCtx.drawImage(moonA, moonXPos, 150, 50, 50);
  
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
        0.4,
        0
      );
    }
    if (currentTimeInMinutes > 719) {
      skyBrightness = mapTo(
        currentTimeInMinutes,
        1000,
        1440,
        0,
        1
      );
    }

    // skyBrightness = 0
    // MAINPULATE SKY COLOR
    skyCtx.fillStyle = "rgb(0,0,0,"+ skyBrightness +")"
    skyCtx.fillRect(0,0,window.innerWidth, window.innerHeight)
    skyCtx.fill()
  }

  //----------------------------------------------------------------------------------------------------------//
  // CITY FUNCTIONS
  //----------------------------------------------------------------------------------------------------------//

  //DRAW CITY
  function cityDrawMain() {
    cityCtx.drawImage(
      cityImage,
      cityImage.naturalWidth * croptWidthStart,
      0,
      cityImage.naturalWidth * croptWidthEnd,
      cityImage.naturalHeight,
      0,
      cityHeight - 650 * relHeight,
      cityWidth,
      cityHeight - 110 * relHeight
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
      cityWidth,
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
      cityBlackWidth,
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
        1,
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

       
          //Set weather id to current
      if(selectedItemForcast === "today" || clickedItemForcast === "buttonCurrentWeather") {
      weatherId = currentWeatherId;
      weatherSelectText = "Today";
      selectedWeatherDescription = currentWeatherDescription;
      selectedTemp = currentTemperatureInCelsius;
      selectedWinddirection = currentWindDirectionDegrees;
      selectedWindSpeed = currentWindSpeedMs;
      currentTimeInMinutes = Number(currentHour) * 60 + Number(currentMinutes); //reset time
      if(isMorning === true){
        skyImage.src = "Images/Sky/morningSky.png";
      }
    
      if(isDay === true){
        skyImage.src = "Images/Sky/skySunny.png";
      }
    
      if(isNight === true){
        skyImage.src = "Images/Sky/nightSky.png";
      }
      // currentTimeInMinutes = 300
    }

            //Set weather id to tomorrow at 12.00

    if(selectedItemForcast === "tomorrowAt12") {
  
      weatherId = forecast_Plus1D_At_1200_WeatherId
      weatherSelectText = "Tomorrow at 12.00";
      selectedWeatherDescription = forecast_Plus1D_At_1200_Description;
      selectedTemp = forecast_Plus1D_At_1200_TemperatureInCelsius;
      selectedWinddirection = forecast_Plus1D_At_1200_DirectionDegrees;
      selectedWindSpeed = forecast_Plus1D_At_1200_WindSpeed;    
      currentTimeInMinutes = 720 //Sets the time to 12.00
      skyImage.src = "Images/Sky/skySunny.png";
      isDay = true
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


    } 
  
    weatherLocation.textContent = locationInputSelect
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
    xSpeedByWindSpeed = 0.3;
  }
  if (windSpeed > 7) {
    xSpeedByWindSpeed = 0.5;
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

  //  weatherId = 311

  //WEATHER TYPES
  //----------------------------------------------------------------------------------------------------------//
  //SET WEATHER VARS BASED ON WEATHER ID
  // https://openweathermap.org/weather-conditions
 //ID 200- 232 Thunderstorm
  //----------------------------------------------------------------------------------------------------------//
  // 200 - Thunderstorm with light rain	
  if(weatherId === 200){
 //Clouds
 xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
 numberOfClouds = 50;
 cloudSizeMuliply = 1;
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
 a = 0.4;

        //Audio
audio = new Audio('music/zeldaSad.mp3')
  }



    //ID 300- 321 Drizzle
  //----------------------------------------------------------------------------------------------------------//
  // 300 - light intensity drizzle
  if (weatherId === 300) {
    //Clouds
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
    numberOfClouds = 50;
    cloudSizeMuliply = 1;
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

           //Audio
   audio = new Audio('music/zeldaSad.mp3')
  }
  // 301 Drizzle
  if (weatherId === 301) {
    //Clouds
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
    numberOfClouds = 70;
    cloudSizeMuliply = 1;
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
   audio = new Audio('music/zeldaSad.mp3')
  }
  //302 - 321 Heavy dizzle
  if (weatherId > 301 && weatherId < 322) {
    //Clouds
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
    numberOfClouds = 100;
    cloudSizeMuliply = 1;
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
   audio = new Audio('music/zeldaSad.mp3')
  }


   //ID 500- 531 Rain
  //----------------------------------------------------------------------------------------------------------//
  // 500 - Light Rain
  if (weatherId === 500) {
    //Clouds
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
    numberOfClouds = 50;
    cloudSizeMuliply = 1;
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
   audio = new Audio('music/zeldaSad.mp3')
  }

  // 501 - Moderate Rain
  if (weatherId === 501) {
    //Clouds
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
    numberOfClouds = 50;
    cloudSizeMuliply = 1;
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
   audio = new Audio('music/zeldaSad.mp3')
  }

   // 502 - heavy intensity rain
   if (weatherId === 502) {
    //Clouds
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
    numberOfClouds = 100;
    cloudSizeMuliply = 1;
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
   audio = new Audio('music/zeldaSad.mp3')

  }

   //ID 600- 622 SNOW
  //----------------------------------------------------------------------------------------------------------//
   // 600 - Light Snow
   if (weatherId === 600) {
    //Clouds
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
    numberOfClouds = 50;
    cloudSizeMuliply = 1;
    setCloudBrightness = 50;
     //Clouds
     cloudImage.src = "Images/Clouds/stormcloud1.png";
     cloudImg = cloudImage;
     //Snow 
    numberOfSnowFlakes = 50;

           //Audio
   audio = new Audio('music/zeldaSad.mp3')
  }

     // 601 - Snow
     if (weatherId === 601) {
      //Clouds
      xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
      numberOfClouds = 50;
      cloudSizeMuliply = 1;
      setCloudBrightness = 10;
       //Clouds
       cloudImage.src = "Images/Clouds/stormcloud1.png";
       cloudImg = cloudImage;
       //Snow 
      numberOfSnowFlakes = 200;

             //Audio
   audio = new Audio('music/zeldaSad.mp3')
    }

   // 615 Light Snow and Rain
   if (weatherId === 615) {
    //Clouds
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
    numberOfClouds = 50;
    cloudSizeMuliply = 1;
    setCloudBrightness = 50;
     //Clouds
     cloudImage.src = "Images/Clouds/cloud1.png";
     cloudImg = cloudImage;
     //Rain 
    numberOfRainDrops = 50;
     //Snow 
    numberOfSnowFlakes = 50;

           //Audio
   audio = new Audio('music/zeldaSad.mp3')
  }


  //ID 800- 804
  //----------------------------------------------------------------------------------------------------------//
   // 800 - Clear

   if (weatherId === 800) {
    //Clouds
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
    numberOfClouds = 20;
    cloudSizeMuliply = 0.3;
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
      audio = new Audio('music/zeldaHappy.mp3')
  }

  // 801 - Few clouds
  if (weatherId === 801) {
    //Clouds
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
    numberOfClouds = 5;
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
      audio = new Audio('music/zeldaHappy.mp3')
  }
  // 802
  if (weatherId === 802) {
    //Clouds
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
    numberOfClouds =  7;
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

      //Audio
      audio = new Audio('music/zeldaHappy.mp3')
  }
   // 803
   if (weatherId === 803) {
    //Clouds
    xSpeedByWindSpeed = xSpeedByWindSpeed * windDirection;
    numberOfClouds = 15;
    cloudSizeMuliply = 1;
    setCloudBrightness = 25;
   //Clouds
   cloud1.src = 'Images/Clouds/cloud1.png'
   cloud2.src = 'Images/Clouds/cloud2.png'
   cloud3.src = 'Images/Clouds/cloud3.png'
   cloud4.src = 'Images/Clouds/cloud4.png'
   cloud5.src = 'Images/Clouds/cloud5.png'
   
   //Audio
   audio = new Audio('music/zeldaHappy.mp3')

   r = 0
   g = 0
   b = 0
   a = 0

      //Audio
      audio = new Audio('music/zeldaHappy.mp3')
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

        //Audio
   audio = new Audio('music/zeldaHappy.mp3')
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
weatherCtx.drawImage(cloud2,this.xPos + 60, this.yPos -70,this.length,this.height)
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
      0,
      0.5 
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
      0.5,
      0
    );
  }

  weatherCtx.globalAlpha = cloudAlpha;

  //RAIN
  //----------------------------------------------------------------------------------------------------------//
  let particlesArray = [];
  const numberOfParticles = numberOfRainDrops;
  

  let dropImage = new Image();

  if(isMorning === true){
    dropImage.src = "Images/rainandsnow/rain11.png"
  }
  if(isDay === true){
    dropImage.src = "Images/rainandsnow/rain11.png"

  }
  if(isNight === true){
    dropImage.src = "Images/rainandsnow/rain11.png"
  }
  
  
  
  rainCtx.globalAlpha = 1
  
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3 + 1 - drizzleVar;
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
    snowImage.src = "PlaceHolderImagesv1/snowflakes.png"
  }
  if(isDay === true){
    snowImage.src = "PlaceHolderImagesv1/snowflakes.png"
  }
  if(isNight === true){
    snowImage.src = "PlaceHolderImagesv1/snowflakes.png"
  }
  
    
  class SnowParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 8 + 2;
      this.weight = Math.random() * 0.1 + 0.15;
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
bolt.src = 'images/Sky/thunder1.png'

function drawThunder (){
  skyCtx.drawImage(bolt,0,0,weatherCanvas.width,weatherCanvas.height)
}
 

//----------------------------------------------------------------------------------------------------------//
//BIRD ANIMATION
//----------------------------------------------------------------------------------------------------------//

let bird1 = new Image();
bird1.src = 'Images/Locations/Stockholm/birdspritesheet1.png';
let bird2 = new Image();
bird2.src = 'Images/Locations/Stockholm/birdspritesheet2.png';
let bird3 = new Image();
bird3.src = 'Images/Locations/Stockholm/birdspritesheet3.png';


const scale = 1;
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

let birdStartPosX = 300 * relWidth
let birdStartPosY = 450 * relHeight
console.log(birdStartPosX)
console.log(birdStartPosY)
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

    //RUN CITY
    cityDrawMain();
    cityBlackDraw();
    cityWindowsDraw()

  
    // Set light of city according to weather.
    weatherLight(r,g,b,a)

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
    // drawThunder ()
   

    requestAnimationFrame(update);
  })();
} // LAST LINE SET FORECAST TRUE OR FALSE

})(); //LAST LINE OF WEATHER AND TIME SYSTEM
} // LAST LINE SET LOCATION
