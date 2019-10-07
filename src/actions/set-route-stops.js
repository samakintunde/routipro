import { ADD_ROUTE_STOPS } from "../constants/action-types";

/**
 * Action creator to set active points (origin and destination)
 * @param {Function} dispatch The dispatch function to update the state.
 * @param {Array} stops An array containing the list of bus stops.
 */
const addBusStops = (dispatch, stops) => {
  return dispatch({
    type: ADD_ROUTE_STOPS,
    payload: stops
  });
};

export { addBusStops };
