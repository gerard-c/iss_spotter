const { nextISSTimesForMyLocation } = require('./iss');

// final function places information about ISS passes into a readable phrase
// information about passes stored in array of objects, with each object being its own pass time
const issPasses = (passes) => {
  // iterates through array of objects
  for (const pass of passes) {
    // creates date object for each pass
    const date = new Date(0);
    // uses risetime key of pass object to set detailed information into date object
    date.setUTCSeconds(pass.risetime);
    // duration key of pass object stored in a variable
    const duration = pass.duration;
    // prints phrase with time/date/duration information from each pass
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  }
};

// call of chain function that sets everything off ending in ISS passes array
nextISSTimesForMyLocation((error, passes) => {
  if (error) {
    console.log(`Error in chaining: ${error}`);
  }
  // calls final function using passes array provided by chain
  issPasses(passes);
});

module.exports = { issPasses };
