import { getDistance } from "../utils/sort-distance";

/**
 *
 * @param {Object} data The response from API
 * @param {Object} origin Coordinates of the origin
 */

class BusStopModel {
  constructor(data, originCoords) {
    const { id, name, coordinates } = data;

    this.id = id;
    this.name = name;
    this.coordinates = {
      lat: coordinates.lat,
      lng: coordinates.lng
    };
    this.distanceFromOrigin = originCoords
      ? getDistance(originCoords, this.coordinates)
      : data.distanceFromOrigin;
  }

  static fromJSON(data, originCoords) {
    const {
      place_id,
      name,
      geometry: { location }
    } = data;

    const id = place_id;
    const coordinates = {
      lat: location.lat(),
      lng: location.lng()
    };
    console.log(coordinates, originCoords);
    const distanceFromOrigin = getDistance(originCoords, coordinates);
    console.log(distanceFromOrigin);

    return {
      id,
      name,
      coordinates,
      distanceFromOrigin
    };
  }
}

export default BusStopModel;
