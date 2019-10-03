const PROXY = "http://localhost:3020";

const PLACES_AUTOCOMPLETE_API = `${PROXY}/https://maps.googleapis.com/maps/api/place/autocomplete/json?language=en&components=country:ng&types=geocode&key=${process.env.REACT_APP_MAPS_API_KEY}`;

const PLACES_NEARBY_API = `${PROXY}/https://maps.googleapis.com/maps/api/nearbysearch/json?language=en&components=country:ng&type=bus_station&key=${process.env.REACT_APP_MAPS_API_KEY}`;

const PLACES_API = `${PROXY}/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?language=en&components=country:ng&key=${process.env.REACT_APP_MAPS_API_KEY}`;

const DIRECTIONS_API = `${PROXY}/https://maps.googleapis.com/maps/api/directions/json?language=en&components=country:ng&key=${process.env.REACT_APP_MAPS_API_KEY}`;

export {
  PLACES_API,
  PLACES_AUTOCOMPLETE_API,
  PLACES_NEARBY_API,
  DIRECTIONS_API
};