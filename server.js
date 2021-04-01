const express = require("express");
const request = require("request");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

let responseRecieved = 'stockholm'
// app.post("/", function (req, res) {
//   responseRecieved = req.body.location;
//   console.log(responseRecieved);
// });
 

        app.get("/current", (req, res) => {
          request(
            `http://api.openweathermap.org/data/2.5/weather?q=${responseRecieved}&appid=ef834ba6b77d78c6f0324aee2e241488`,
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
          `http://api.openweathermap.org/data/2.5/forecast?q=${responseRecieved}&appid=ef834ba6b77d78c6f0324aee2e241488`,
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
 




app.listen(80, () => {
  console.log("listening in port 80...");
});
