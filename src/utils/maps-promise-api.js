const { google } = window;

const placesService = new PlacesService(document.querySelector(".dummy-map"));

const asyncFindPlace = request => {
  return new Promise((resolve, reject) => {
    google.placesService.findPlaceFromQuery(request, (results, status) => {
      if (
        status === PlacesServiceStatus.OK ||
        status === PlacesServiceStatus.ZERO_RESULTS
      ) {
        resolve(results);
      } else {
        reject(status);
      }
    });
  });
};

const asyncNearbySearch = request => {
  return new Promise(function(resolve, reject) {
    // Set Timeout to prevent Google QUERY_LIMIT
    setTimeout(() => {
      window.placesService.nearbySearch(request, function(results, status) {
        if (
          status === google.maps.places.PlacesServiceStatus.OK ||
          status === "ZERO_RESULTS"
        ) {
          resolve(results);
        } else {
          reject(new Error(status));
        }
      });
    }, 500 * i);
  });
};

export { asyncFindPlace, asyncNearbySearch };
