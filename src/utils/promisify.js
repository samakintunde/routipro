/**
 * mapsPromisify - Allows you use cool promises or async/await with google maps javascipt API
 * @param {Function} f The Google Maps method to promisify
 */
// placesService.findPlaceFromQuery(
//   {
//     query: query.name,
//     fields: ["geometry.location"]
//   },
//   (results, status) => {
//     if (status === PlacesServiceStatus.OK) {
//       let newRoutePoints = form;

//       newRoutePoints[field] = {
//         name: query.name,
//         coordinates: {
//           lat: results[0].geometry.location.lat(),
//           lng: results[0].geometry.location.lng()
//         }
//       };

//       setForm(newRoutePoints);
//       setActivePoints(dispatchRoute, form);
//     }
//   }
// );

// f = placesService.findPlaceFromQuery

// want to be able to promisifyMaps(f) and get function()

function promisifyMaps(f) {
  // return a wrapper-function
  return function(...args) {
    const _this = this;
    // Arrow function is used because they have no concept of arguments
    return new Promise(function(resolve, reject) {
      function callback(results, status) {
        // our custom callback for f
        if (status === "OK" || status === "ZER0_RESULTS") {
          resolve(results);
        } else {
          return reject(new Error(status));
        }
      }

      // append callback to the end of f arguments
      args.push(callback);

      // call the original function
      f.call(_this, args[0], args[1]);
    });
  };
}

export { promisifyMaps };
