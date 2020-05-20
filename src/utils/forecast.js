const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=3b2793203e5268ba41b8db80e49cecfb&query=${latitude},${longitude}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error || !body.current) {
      callback("Unable to find location", undefined);
    } else {
      const { temperature, feelslike, humidity, cloudcover } = body.current;
      callback(
        undefined,
        `It is currently ${temperature} degrees outside. It feels like ${feelslike} degrees.\nThe humidity is ${humidity}%, and the cloud cover is ${cloudcover}%.`
      );
    }
  });
};

module.exports = { forecast };
