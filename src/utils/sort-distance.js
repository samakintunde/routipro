/**
 *
 * @param {Object} origin The starting point for our measurements
 * @param {Object} point The point we're measuring from the origin
 */
const getDistance = (origin, point, unit) => {
  const lat1 = origin.lat;
  const lng1 = origin.lng;

  const lat2 = point.lat;
  const lng2 = point.lng;

  if (lat1 === lat2 && lng1 === lng2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lng1 - lng2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;

    if (unit === "K") {
      dist = dist * 1.609344;
    }
    if (unit === "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
};

/**
 * Sorts the distance of a collection of locations
 * @param {Array} locations Collection of the locations containing a lat and long we want to sort
 * @param {Object} origin The starting point for our measurements
 * @param {Unit} unit The unit of the distance being measured
 */
const sortBusStops = (locations, property) => {
  return locations.sort(function(a, b) {
    return a[property] - b[property];
  });
};

export { getDistance, sortBusStops };
