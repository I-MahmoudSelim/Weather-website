const axios = require("axios");
// const locationData = { lat: 31.0539, lon: 31.37787 }
async function getWeather(location) {
    // console.log(location)

    const URL = `http://api.weatherstack.com/current?access_key=9f1faa552e860177f2330ca1e2679a2e&query=${location.lat},${location.lon}&units=m`;
    const weatherData = await axios.get(URL);
    // console.log(weatherData.data)
    return ({
        location: `${weatherData.data.location.name}, ${weatherData.data.location.country}`,
        tempertaure: weatherData.data.current.temperature,
        feelslike: weatherData.data.current.feelslike,
        time: weatherData.data.current.observation_time,
        icon: weatherData.data.current.weather_icons,
        weather_description: weatherData.data.current.weather_descriptions
    })

}
// getWeather(locationData)
module.exports = getWeather;