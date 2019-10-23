const searchedBusStops = (busStops, query) => {
  return busStops.filter(busStop =>
    busStop.name.toLowerCase().includes(query.toLowerCase())
  );
};

export { searchedBusStops };
