$(document).ready(initializeApp);

function initializeApp() {
  const lat = 33.7;
  const long = -117.8;
  const distance = 100;
  const bearing = generateRandomBearing();
  const position = calculateSecondPosition(lat, long, bearing, distance);
  $('.bearing').after(bearing);
  $('.position').after(position.lat + " " + position.long);
  $('.distance').after(distance);
  getWeatherData(position.lat, position.long);
  getTrailData(position.lat, position.long);
  getCampgroundData(position.lat, position.long);
  getRestaurantData(position.lat, position.long);
}

function generateRandomBearing() {
  const compassSectors = {
    north: true,
    northEast: true,
    east: true,
    southEast: true,
    south: true,
    southWest: true,
    west: true,
    northWest: true,
  }
  return Math.floor(Math.random() * 360);
}

function calculateSecondPosition(lat1, lon1, bearing, distance) {
  const radius = 3958.761;
  lat1 *= Math.PI / 180;
  lon1 *= Math.PI / 180;
  const lat2 = Math.asin(Math.sin(lat1) * Math.cos(distance / radius) +
    Math.cos(lat1) * Math.sin(distance / radius) *
    Math.cos(bearing * Math.PI / 180));
  const lon2 = lon1 +
    Math.atan2(Math.sin(bearing * Math.PI / 180) * Math.sin(distance / radius) *
    Math.cos(lat1), Math.cos(distance / radius) - Math.sin(lat1) * Math.sin(lat2));
  return {
    'lat': lat2 * 180 / Math.PI,
    'long': lon2 * 180 / Math.PI
  };
}

function getWeatherData(lat, long){
  const options = {
      url: 'http://api.weatherbit.io/v2.0/forecast/daily',
      method: 'GET',
      data: {
        days: '3',
        lat: lat.toFixed(2),
        lon: long.toFixed(2),
        key: config.weather.API_KEY
      },
      success: function(response){
        console.log("weather success", response);
        const div = '<div>';
        const data = response;
        let location = data.city_name + ', ';
        location +=
          data.country_code == 'US' ? data.state_code : data.country_code;
        $('.location').append(div + location);
        $('.weather').append(div + data.data[0].weather.description);
        $('.weather').append(div + 'icon ' + data.data[0].weather.icon);
        $('.weather').append(div + 'high ' + data.data[0].high_temp);
        $('.weather').append(div + 'low ' + data.data[0].low_temp);
        $('.weather').append(div + 'percip ' + data.data[0].percip);
        $('.weather').append(div + 'wind ' + data.data[0].wind_spd);
        $('.weather').append(div + 'gusts ' + data.data[0].wind_gust_spd);
      },
      error: function(response){
        console.log("weather error");
      }
    }
  $.ajax(options);
}

// weather data need:
// city_name
// country_code
// data[0].
//   high_temp
//   low_temp
//   percip
//   weather.icon
//   weather.description
//   wind_gust_spd
//   wind_spd
// state_code


function getTrailData(lat, long){
  const options = {
      url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
      method: 'GET',
      headers: {},
      data: {
        location: lat + ', ' + long,
        radius: '6000',
        key: config.trails.API_KEY,
        keyword: 'trailhead'
      },
      success: function(response){
        console.log("trail success", response);
        const data = response;
        $('.trails').append(data.results[0].name);
      },
      error: function(response){
        console.log("trail error");
      }
    }
  $.ajax(options);
}

function getCampgroundData(lat, long){
  const options = {
      url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
      method: 'GET',
      headers: {},
      data: {
        location: lat + ', ' + long,
        radius: '6000',
        key: config.trails.API_KEY,
        keyword: 'campground'
      },
      success: function(response){
        console.log("campground success", response);
        const data = response;
        $('.campgrounds').append(data.results[0].name);
      },
      error: function(response){
        console.log("campground error");
      }
    }
  $.ajax(options);
}

function getRestaurantData(lat, long){
  const options = {
      url: 'https://api.yelp.com/v3/businesses/search',
      method: 'GET',
      headers: {
        authorization: config.yelp.API_KEY,
        "Content-type": "application/json"
      },
      data: {
        term: 'restaurant',
        latitude: lat,
        longitude: long,
        sort_by: 'rating',
        radius: '10000',
        price: '1,2',
        limit: '10'
      },
      success: function(response){
        console.log("yelp success", response);
        const data = response;
        $('.restaurants').append(data.businesses[0].name);
      },
      error: function(response){
        console.log("yelp error");
      }
    }
  $.ajax(options);
}
