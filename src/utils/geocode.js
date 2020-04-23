const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXJmYXRzYXJvbGUiLCJhIjoiY2s5NDBrN3Z1MDE5NjNlbzFjaGF5d3F6aSJ9.el-d8nIxSl7Zfw1cN6jvJg&limit=1`

    request( { url, json: true}, (error, { body }) => {
        if (error) {
            callback('Something went wrong...', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find your search... Please provide a valid location.', undefined)
        } 
        else {
            const features = body.features
            callback(undefined, {
                latitude : features[0].center[1],
                longitude : features[0].center[0],
                location : features[0].place_name
            })
            
        }
    })    
}

module.exports = geocode

