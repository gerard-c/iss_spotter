const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passes) => {
  if (error) {
    console.log(`Error in chaining: ${error}`);
  }
  console.log(passes);
})
