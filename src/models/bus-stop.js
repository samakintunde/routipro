import { getDistance } from "../utils/sort-distance";

/**
 *
 * @param {Object} data The response from API
 * @param {Object} origin Coordinates of the origin
 */
function BusStop(data, origin) {
  this.id = data.place_id;
  this.name = data.name;
  this.coordinates = data.geometry.location;
  this.distanceFromOrigin = getDistance(origin, this.coordinates);
}

export default BusStop;
