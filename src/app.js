const express = require("express");
const hbs = require("hbs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDir));

app.get("", (req, res) => {
    res.render("index", {
        title: "WEATHER",
        name: "Vedant",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "ABOUT",
        name: "Vedant",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "HELP",
        name: "Vedant",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "Please Specify Address!" });
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error: error });
        } else {
            weather(data[1], data[0], (weatherError, weatherData) => {
                if (weatherError) {
                    return res.send({ error: weatherError });
                }
                res.send({
                    weatherDesc:
                        weatherData.weather_descriptions[0] +
                        ". It is " +
                        weatherData.temperature +
                        " degrees outside and it feels like " +
                        weatherData.feelslike +
                        " degrees. There's a " +
                        weatherData.precip +
                        "% chance of rain and humidity is " +
                        weatherData.humidity +
                        "%.",
                    location: req.query.address,
                });
            });
        }
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Help Article Not Found!",
        name: "Vedant",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404 Not Found!",
        name: "Vedant",
    });
});

app.listen(port, () => {
    console.log("Listening on PORT " + port);
});
