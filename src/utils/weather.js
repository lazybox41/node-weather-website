const request = require("request");

const weather = (lat, lon, callback) => {
    const weatherURL =
        "http://api.weatherstack.com/current?access_key=b7eb76770544d495bf8ceddd7d8d31c7&query=" +
        lat +
        "," +
        lon;

    request({ url: weatherURL, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to location services!", undefined);
        } else if (response.body.error) {
            callback("Unable to connect to services!", undefined);
        } else {
            callback(undefined, response.body.current);
        }
    });
};

module.exports = weather;
