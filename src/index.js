const path = require("path")
const express = require("express");
const app = express();
const hbs = require("hbs");
const weatherApp = require("./utils/app");
const getWeather = require("./utils/getWeather");

// define paths for express config
const publicPath = path.join(__dirname, "../public")
const viewspath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//  setup handelbar engine and views location
app.set("views", viewspath)
app.set("view engine", "hbs")
hbs.registerPartials(partialsPath);

// setup static dirctory to server
app.use(express.static(publicPath))

//build midlleware



// build express route to server
app.get("", (req, res) => {
    res.render("home", { name: "Weather" })
})

app.get("/help", (req, res) => {
    res.render("help", { name: "Help" })
})

app.get("/weather", async (req, res) => {
    if (!req.query.city) {
        res.render("home", { name: "Weather", msg: "If you did not write search term, you would not get search resault." })
    }
    try {
        const weather = await weatherApp(req.query.city)
        res.send({
            name: "Weather",
            location: weather.weather.location,
            tempertaure: weather.weather.tempertaure,
            feelslike: weather.weather.feelslike,
            time: weather.weather.time,
            icon: weather.weather.icon,
            desc: weather.weather.weather_description,
            cities: weather.anotherCities
        })
    } catch (error) {
        res.semd({ name: "Weather", msg: error })
    }
})

app.get("/weatherGS", async (req, res) => {
    if (!req.query.lat || !req.query.lon) {
        res.render("home", { name: "Weather", msg: "Wrong coordinates formula, search by city name." })
    }
    try {
        const location = {
            lat: req.query.lat,
            lon: req.query.lon,
            name: req.query.name
        };
        // console.log(location)
        const weather = await getWeather(location)
        // console.log(weather)

        res.send({
            name: "Weather",
            location: weather.location,
            tempertaure: weather.tempertaure,
            feelslike: weather.feelslike,
            time: weather.time,
            icon: weather.icon,
            desc: weather.weather_description,
        })
    } catch (error) {
        res.send({ name: "Weather", msg: error })
    }
})



app.listen(3000, () => {
    console.log("hello from the other port!")
})