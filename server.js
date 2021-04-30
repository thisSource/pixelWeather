require('dotenv').config()
const { response } = require("express");
const express = require("express");
const request = require("request");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// let responseRecieved = 'stockholm'

let responseRecieved;
app.post("/", function (req, res) {
  responseRecieved = req.body.location;
  responseLongitude = req.body.longitude;
  responseLatitude = req.body.latitude;
 
console.log(responseRecieved);
console.log(responseLongitude);
console.log(responseLatitude);
console.log( `https://api.openweathermap.org/data/2.5/onecall?lat=${responseLatitude}&lon=${responseLongitude}&exclude=current,minutely,alerts,daily&appid=${process.env.WEATHER_API_KEY}`)


        app.get("/current", (req, res) => {
          request(
            `http://api.openweathermap.org/data/2.5/weather?lat=${responseLatitude}&lon=${responseLongitude}&appid=${process.env.WEATHER_API_KEY}`,
            (error, response, body) => {
              if (error) {
                console.log("Error");
              } else {
                let data = JSON.parse(body);
                res.send(data);
              }
            }
            );
        });
        // `http://api.openweathermap.org/data/2.5/forecast?lat=${responseLatitude}&lon=${responseLongitude}&appid=${process.env.WEATHER_API_KEY}`
        https://api.openweathermap.org/data/2.5/onecall?lat=${responseLatitude}&lon=${responseLongitude}&exclude=current,minutely,hourly,alerts&appid=${process.env.WEATHER_API_KEY}
     

        app.get("/forcastCurrent", (req, res) => {
          request(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${responseLatitude}&lon=${responseLongitude}&exclude=current,minutely,alerts,daily&appid=${process.env.WEATHER_API_KEY}`,
            (error, response, body) => {
              if (error) {
                console.log("Error");
              } else {
                let dataForcast = JSON.parse(body);
                res.send(dataForcast);
                console.log(dataForcast)
              }
            }
          );
        });

     
        app.get("/forecast", (req, res) => {
        request(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${responseLatitude}&lon=${responseLongitude}&exclude=current,minutely,hourly,alerts&appid=${process.env.WEATHER_API_KEY}`,
          (error, response, body) => {
            if (error) {
              console.log("Error");
            } else {
              let data = JSON.parse(body);
              res.send(data);
            }
          }
        );
      });
 
console.log(responseRecieved
  )
    
    app.get("/time", (req, res) => {
      request(
        `https://api.ipgeolocation.io/timezone?apiKey=${process.env.TIME_API_KEY}&lat=${responseLatitude}&long=${responseLongitude}`,
        (error, response, body) => {
          if (error) {
            console.log("Error");
          } else {
            let data = JSON.parse(body);
            res.send(data);
          }
        }
      );
    });

  });




app.listen(5000, () => {
  console.log("listening in port 5000...");
});
