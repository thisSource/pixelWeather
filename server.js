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
    

      app.get("/forecast", (req, res) => {
        request(
          `http://api.openweathermap.org/data/2.5/forecast?lat=${responseLatitude}&lon=${responseLongitude}&appid=${process.env.WEATHER_API_KEY}`,
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
 

    
    app.get("/time", (req, res) => {
      request(
        `https://api.ipgeolocation.io/timezone?apiKey=${process.env.TIME_API_KEY}&location=${responseRecieved}`,
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




app.listen(process.env.PORT || 80, () => {
  console.log("listening in port 80...");
});
