const request = require('postman-request');

const ACCESS_TOKEN = process.env.TOKEN_API_KEY;

const geocode = (address,callback)=> {
  
  const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
          + encodeURIComponent(address) + '.json?access_token='
          + ACCESS_TOKEN + '&limit=1';

  request({ url: geourl, json: true }, (error, {body}) => {
      if (error) {
          callback('Unable to connect to location services!', undefined);
      } else if (body.features.length === 0) {
          callback('Unable to find location. Try to '
                   + 'search another location.',undefined);
      } else {
          callback(undefined,{
              latitude: body.features[0].center[1],
              longitude: body.features[0].center[0],
              location: body.features[0].place_name
          })
      }
  })
}

module.exports = geocode