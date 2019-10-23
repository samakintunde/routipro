import {
  SET_ROUTE_POINTS,
  ADD_ROUTE_STOP,
  ADD_ROUTE_STOPS,
  EDIT_ROUTE_STOP,
  SEARCH_STOPS,
  REMOVE_ROUTE_STOP,
  SORT_BUS_STOP_INDEX,
  SET_LOADING,
  CANCEL_SEARCH
} from "../constants/action-types";
import { makeObjectsOfArrayUnique } from "../utils/compare-object";
import { sortBusStops } from "../utils/sort-distance";

const initialState = {
  origin: {},
  destination: {},
  stops: [],
  loading: false,
  query: "",
  filteredStops: []
};

const routeReducer = (state = initialState, action) => {
  const { payload, type } = action;

  let stops;
  let sortedStops;

  switch (type) {
    case SET_ROUTE_POINTS:
      return { ...state, ...payload };
    case ADD_ROUTE_STOP:
      stops = [...state.stops, payload];
      stops = makeObjectsOfArrayUnique(stops, "name");
      sortedStops = sortBusStops(stops, "distanceFromOrigin");
      return { ...state, stops: sortedStops };

    case ADD_ROUTE_STOPS:
      stops = makeObjectsOfArrayUnique(payload, "name");
      sortedStops = sortBusStops(stops, "distanceFromOrigin");
      return { ...state, stops: sortedStops, filteredStops: sortedStops };

    case EDIT_ROUTE_STOP:
      stops = state.stops;
      stops[payload.index] = payload.stop;
      sortedStops = sortBusStops(stops, "distanceFromOrigin");
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

    case SEARCH_STOPS:
      stops = state.stops.filter(stop => {
        return stop.name.toLowerCase().includes(payload.toLowerCase());
      });
      return { ...state, query: payload, filteredStops: stops };

    case CANCEL_SEARCH:
      return { ...state, query: "", filteredStops: state.stops };

    case SET_LOADING:
      return { ...state, loading: payload };

    default:
      return state;
  }
};

export { initialState, routeReducer };
