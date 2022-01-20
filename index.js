const { fetchMyIP, fetchCoordsByIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

fetchCoordsByIP('37.19.212.34', (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log(data)
});