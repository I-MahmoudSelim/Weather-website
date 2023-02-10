const axios = require("axios");

async function codeGeo(address) {
    const url = `http://api.positionstack.com/v1/forward?access_key=f389638ac00084f8ef9cbf60b6f003b9&query=${address}`;
    const response = await axios.get(url)
    if (response.data.data.length == 0) {
        throw new Error("Unablw to find city with this name!. Try another time.")
    } else {
        const locationData = {
            lat: response.data.data[0].latitude,
            lon: response.data.data[0].longitude
        }
        // console.log(response)
        anotherCities = []
        for (const city of response.data.data) {
            if (city.name !== response.data.data[0].name || city.region !== response.data.data[0].region)
                anotherCities.push({
                    lat: city.latitude,
                    lon: city.longitude,
                    name: `${city.name}, ${city.region}, ${city.country}`
                })
        }
        // console.log({ locationData, ...anotherCities })
        return { locationData, anotherCities: anotherCities }
    }
}
// codeGeo("BA3bos")
module.exports = codeGeo;