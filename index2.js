const { nextISSTimesForMyLocation } = require('./iss_promised');
const { issPasses } = require('./index.js')

nextISSTimesForMyLocation()
  .then((passes) => {
    issPasses(passes);
  })