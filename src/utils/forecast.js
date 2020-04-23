const request = require('postman-request')

const forecast  = (latitude, longitude, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=173a88b1d2701cb56f3c58841dcc1d08&query=${latitude},${longitude}`

    request( { url, json: true}, (error, { body } ) => {
        if (error) {
            callback('Something went wrong...', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } 
        else {
            const current = body.current
            // const location = body.location.name
            const data = `Weather conditions : ${current.weather_descriptions}. The temperature is ${current.temperature} degrees. It feels like ${current.feelslike} degrees.`
            callback(undefined, data)
        }
    })
}

module.exports = forecast