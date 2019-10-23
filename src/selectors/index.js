import { createSelector } from "reselect";

const generateSelector = state => {
  const busStopsSelector = () => state.stops;
  const querySelector = () => state.query;

  const searchedBusStops = createSelector(
    busStopsSelector,
    querySelector,
    (busStops, query) =>
      busStops.filter(busStop => busStop.name.includes(query))
  );

  return {
    searchedBusStops
  };
};

export { generateSelector };
