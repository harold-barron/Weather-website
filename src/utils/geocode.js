const request = require('postman-request')
class geoCode {
    static getGeoCode = (city,callback) =>
    {   
        const geoCodingUrl =  `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoiaGFyb2xkdmFubGVja3MiLCJhIjoiY2w1aW5lZWViMDJ3czNpbW5rOHM0Z21obiJ9.Kc0h4pudj72bFL5b92miGA&limit=1`
        request({url:geoCodingUrl, json:true}, (error,response) =>
        {
            if (error)
            {
                callback('Unable to connect to Geocoding service',undefined)
                // console.log('Unable to connect to Geocoding service')
            }
            else if (response.body.features.length === 0)
            {
                callback('Unable to find the location in Geocoding service',undefined)
                // console.log('Unable to find the location in Geocoding service')
            }
            else 
            {
                callback(undefined, {
                    longitud: response.body.features[0].center[0],
                    latitude:response.body.features[0].center[1],
                    location: response.body.features[0].place_name

                })
                // console.log(`For ${city} the latitud is ${latitude} and the longitud is ${longitud}`)
                
            }         
        })
        
    }

    
}
module.exports = geoCode