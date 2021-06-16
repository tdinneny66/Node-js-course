const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a77166f67761e2a05a2feab964b48826&query=' + latitude + ',' + longitude + '&units=f'
    console.log(url)
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (!body) {
            callback('Uable to find location! Try a different location.', undefined)
        } else {
            console.log(body.current)
            callback(undefined, "It is currently " + body.current.weather_descriptions[0] + ". The temperature is " + body.current.temperature + ". The humidity is " + body.current.humidity + "%." + "<img src='" + body.current.weather_icons + "'>")
        }
    })
}

module.exports = forecast
