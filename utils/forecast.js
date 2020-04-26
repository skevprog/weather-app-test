const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=073afa6f538b80c74b7efa05830146de&query=$${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      return callback('something happend', error);
    }

    if (body.error) {
      return callback('No location!', body.error);
    }
    const {
      current: { temperature, feelslike, weather_descriptions },
      location: { name, region, country },
    } = body;
    const location = `${name}, ${region}, ${country}`;
    const weather = `${weather_descriptions} It is currently ${temperature} degrees out. Feels like ${feelslike} degrees out.`;
    callback(undefined, { weather, location });
  });
};

module.exports = forecast;
