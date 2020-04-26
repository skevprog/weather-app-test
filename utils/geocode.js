const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoicm9uaW5rZXYiLCJhIjoiY2s5ZXpmeGtnMDdzNjNlbncxdXJvand0byJ9.hjMkMzoayPF6cdJcK2JBDg`;

  request({ url, json: true }, (error, { body }) => {
    // error = Low level error (no internet for example)
    if (error) {
      return callback('something happend', error);
    }

    if (body.features && body.features.length === 0) {
      return callback('Try another search!');
    }

    if (body.error) {
      return callback('Something went wrong no features');
    }
    const [longitude, latitude] = body.features[0].center;
    callback(undefined, { latitude, longitude });
  });
};

module.exports = geocode;
