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
            callback(undefined, body.current.weather_descriptions[0])
        }
    })
}

module.exports = forecast
