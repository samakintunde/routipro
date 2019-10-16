/**
 * mapsPromisify - Allows you use cool promises or async/await with google maps javascipt API
 * @param {Function} f The Google Maps method to promisify
 */
function mapsPromisify(f) {
  const _this = this;
  // return a wrapper-function
  return function(...args) {
    // const _this = window;
    // Arrow function is used because they have no concept of arguments
    return new Promise(function(resolve, reject) {
      function callback(results, status) {
        // our custom callback for f
        if (status !== "OK") {
          return reject(new Error(status));
        } else {
          resolve(results);
        }
      }

      // append callback to the end of f arguments
      args.push(callback);

      // call the original function
      f.call(_this, ...args);
    });
  };
}

export { mapsPromisify };
