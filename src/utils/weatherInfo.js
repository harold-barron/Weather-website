const request = require('postman-request')
class weatherInformation {

    static currentWeater = (city,callback) =>
    {
        const url = `http://api.weatherstack.com/current?access_key=83b46c1de879b55b85e7a874912e2e75&query=${city}`
        request({url: url, json: true},(error,response) =>
        {
            if (error)
            {
                callback('Unable to connect to weather service',undefined)
            }

            else if (response.body.error)
            {
                callback(`Unable to fin the location. ${response.body.error.info}`, undefined)
            }
            else
            {
                callback(undefined, {
                    currentWeater: response.body.current.weather_descriptions[0],
                    currentTempeature: response.body.current.temperature,
                    feelslike: response.body.current.feelslike,
                    weatherIco:  response.body.current.weather_icons[0],
                    localTime: response.body.location.localtime
                })
                // console.log(`${response.body.current.weather_descriptions[0]}. It's currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out`)
            }
        })
    }
}

module.exports = weatherInformation