const express = require("express");
const { json } = require("express/lib/response");
const https = require("https");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res){
   console.log(req.body.cityName);

const query = req.body.cityName;
const apiKey = "4c4a45fe84637be9ef342ccf531122ed";
const unit = "metric";

const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey + "";

https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {

        console.log(data);
        const weatherData = JSON.parse(data);

        console.log(weatherData);

        const temp = weatherData.main.temp;
        console.log(temp);

        const weatherDescription = weatherData.weather[0].description;
        console.log(weatherDescription);

        const weatherIcon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

        const weatherCity = weatherData.name;


        res.write("<h1>The weather is currently " + weatherDescription + ". </h1>");

        res.write("<h1>The temperature in " + weatherCity + " is " + temp + " degrees celsius.</h1>")

        res.write("<img src =" + imageURL + ">");

        res.send();

    })

})


})


app.listen(3000, function () {
    console.log("Server is running at port 3000");
})