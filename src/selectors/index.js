/**
 * Search bus stop
 * @param {Array} busStops Array of all bus stops
 * @param {String} query The name of the bus stop being searched for
 * @returns {Array} Result of the query
 */
const searchedBusStops = (busStops, query) => {
  return busStops.filter(busStop =>
    busStop.name.toLowerCase().includes(query.toLowerCase())
  );
};

export { searchedBusStops };
