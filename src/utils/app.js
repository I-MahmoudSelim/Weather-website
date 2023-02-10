const codeGeo = require("./codeGeo");
const getWeather = require("./getWeather");

async function weatherApp(city) {
    const locationData = await codeGeo(city);
    const weather = await getWeather(locationData.locationData)
    if (locationData.anotherCities.length > 0) {
        return { weather, anotherCities: locationData.anotherCities }
    }
}

module.exports = weatherApp;