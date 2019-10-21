const { google } = window;

const placesService = new PlacesService(document.querySelector(".dummy-map"));

const asyncFindPlace = async request => {
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
