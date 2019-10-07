import {
  SET_ROUTE_POINTS,
  ADD_ROUTE_STOPS,
  SORT_BUS_STOPS
} from "../constants/action-types";
import { makeObjectsOfArrayUnique } from "../utils/compare-object";
import { sortBusStops as sortStops } from "../utils/sort-distance";

const initialState = {
  origin: {},
  destination: {},
  stops: []
};

const routeReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_ROUTE_POINTS:
      return { ...state, ...payload };
    case ADD_ROUTE_STOPS:
      let stops = [...state.stops, payload];
      stops = makeObjectsOfArrayUnique(stops, "name");
      return { ...state, stops };
    case SORT_BUS_STOPS:
      let sortedStops = sortStops(state.stops, payload);
      console.log("sorted", sortedStops);
      return { ...state, stops: sortedStops };
    default:
      return state;
  }
};

export { initialState, routeReducer };
