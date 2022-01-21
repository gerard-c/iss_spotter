const request = require('request');


const fetchMyIP = (callback) => {
  // API that provides IP
  request('https://api.ipify.org?format=json', (error, response, body) => {
    // Checks for error found by request
    if (error) {
      callback(error, null);
      return;
    }
    // Checks for invalid status code
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response ${body}`), null);
      return;
    }
    // IP passed into callback to be used by other functions
    callback(null, JSON.parse(body).ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  // API that provides coordinates via IP address
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    // Checks for error found by request
    if (error) {
      callback(error, null);
      return;
    }
    // Checks for invalid status code
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coords. Response ${body}`), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body);
    // coordinates passed into callback to be used by other functions
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  // API that provides info about visible orbit of ISS via coordinates
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    // Checks for error found by request
    if (error) {
      callback(error, null);
      return;
    }
    // Checks for invalid status code
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching flyover times. Response ${body}`), null);
      return;
    }
    // array containing 5 objects with info about ISS orbit passed into callback for later use
    callback(null, JSON.parse(body).response);
  });
};

// function that chains together previous functions, passing in results of previous callbacks and calling callbacks for next function in chain
const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, passes) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, passes);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };