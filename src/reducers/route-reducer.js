import {
  SET_ROUTE_POINTS,
  ADD_ROUTE_STOPS,
  REMOVE_ROUTE_STOP,
  SORT_BUS_STOP_INDEX
} from "../constants/action-types";
import { makeObjectsOfArrayUnique } from "../utils/compare-object";
import { sortBusStops } from "../utils/sort-distance";

const initialState = {
  origin: {},
  destination: {},
  stops: []
};

const routeReducer = (state = initialState, action) => {
  const { payload, type } = action;

  let stops;

  switch (type) {
    case SET_ROUTE_POINTS:
      return { ...state, ...payload };
    case ADD_ROUTE_STOPS:
      stops = [...state.stops, payload];
      stops = makeObjectsOfArrayUnique(stops, "name");
      let sortedStops = sortBusStops(stops, "distanceFromOrigin");
      return { ...state, stops: sortedStops };
    case REMOVE_ROUTE_STOP:
      stops = state.stops.filter(stop => stop.id !== payload.id);
      return { ...state, stops };
    case SORT_BUS_STOP_INDEX:
      const { stop, source, destination } = payload;

      stops = state.stops;

      // Remove Source Element
      stops.splice(source, 1);

      // Get elements preceeding and after
      let prefixItems = stops.slice(0, destination);
      let suffixItems = stops.slice(destination);

      stops = [...prefixItems, stop, ...suffixItems];

      return { ...state, stops };

    default:
      return state;
  }
};

export { initialState, routeReducer };
