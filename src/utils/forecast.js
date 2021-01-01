const request = require('postman-request');

const forecast = (latitude,longitude,  callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=c0a7eb726efda261ec6f036dbc2f116e&query=${latitude} ${longitude}&units=f`;
 
    request({ url, json:true}, (error, {body})=>{
        if(error){
            callback('unable to connect weather service..', undefined)
        }else if(body.error){
            callback('cannot find location', undefined)
        }else{
            const temperature = body.current.temperature;
            const feelsLike= body.current.feelslike;
            const location= body.location.region;
            const placeName= body.location.name;
            const weatherDesc = body.current.weather_descriptions[0]

            callback(undefined, {
               message: `right now ${temperature} in ${placeName}, ${location}, but feels ${feelsLike}deg and it's ${weatherDesc}`
            })
        }
    })
}
 
module.exports = forecast;
