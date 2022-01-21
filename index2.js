const { nextISSTimesForMyLocation } = require('./iss_promised');
const { issPasses } = require('./index.js')

nextISSTimesForMyLocation()
  .then((passes) => {
    issPasses(passes);
  })
  .catch((error) => {
    console.log(`Error: ${error.message}`);
  });