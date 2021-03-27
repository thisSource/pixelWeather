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
  request(
    `http://api.openweathermap.org/data/2.5/weather?q=${responseRecieved}&appid=ef834ba6b77d78c6f0324aee2e241488`,
    (error, response, body) => {
      if (error) {
        console.log("Error");
      } else {
        let data = JSON.parse(body);

        app.get("/current", (req, res) => {
          res.send(data);
        });
      }
    }
  );


request(
  `http://api.openweathermap.org/data/2.5/forecast?q=${responseRecieved}&appid=ef834ba6b77d78c6f0324aee2e241488`,
  (error, response, body) => {
    if (error) {
      console.log("Error");
    } else {
      let data = JSON.parse(body);

      app.get("/forecast", (req, res) => {
        // console.log(data)
        res.send(data);
      });
    }
  }
);




app.listen(3000, () => {
  console.log("listening in port 3000...");
});
