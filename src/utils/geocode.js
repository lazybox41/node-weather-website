const request = require("request");

const geocode = (address, callback) => {
    const geocodingURL =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(address) +
        ".json?access_token=pk.eyJ1IjoidmVkYW50ZDQxIiwiYSI6ImNrdzBod3lwMGQ5dDYzMHM3dWV4OTF3Z2kifQ.rJX82wiYhLzL4RyCkC_03g";

    request({ url: geocodingURL, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to location services!", undefined);
        } else if (
            response.body.features === undefined ||
            response.body.features.length === 0
        ) {
            callback("Unable to get coordinates!", undefined);
        } else {
            callback(undefined, response.body.features[0].geometry.coordinates);
        }
    });
};

module.exports = geocode;
