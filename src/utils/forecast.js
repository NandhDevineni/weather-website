const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cfac87f6ee35504b0fc8fd9490fc4c1c&query='+ latitude +','+ longitude;
    request({url:url, json: true}, (error, {body}) => {
        if(error){
            callback('unable to connect to weather server', undefined);
        } else if(body.error){
            callback('invalid location', undefined);
        } else{
            callback(undefined, body.current.weather_descriptions[0] + '. current temperature is '+ body.current.temperature + ' it feelslike ' + body.current.feelslike)
        }
    })
}
module.exports = forecast;