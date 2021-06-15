const request = require('request')


const geocode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(location) + '.json?access_token=pk.eyJ1IjoidGRpbm5lbnkiLCJhIjoiY2tuaTN6ZjVtMDFiNjJvcGVkNnB4eDB1eSJ9.J0Lng98ZG19rWg9ge1YyHA'
    console.log(url)
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect!', undefined)
        } else if (!body.features) {
            callback('No matching results! Try again!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
        
    })
}
module.exports = geocode