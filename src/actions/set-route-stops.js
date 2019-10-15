import {
  ADD_ROUTE_STOPS,
  EDIT_ROUTE_STOP,
  REMOVE_ROUTE_STOP,
  SORT_BUS_STOP_INDEX
} from "../constants/action-types";

/**
 * Action creator to set active points (origin and destination)
 * @param {Function} dispatch The dispatch function to update the state.
 * @param {Object} stops An array containing the list of bus stops.
 */
const addBusStop = (dispatch, stop) => {
  return dispatch({
    type: ADD_ROUTE_STOPS,
    payload: stop
  });
};

/**
 * Action creator to set active points (origin and destination)
 * @param {Function} dispatch The dispatch function to update the state.
 * @param {Object} stop An object containing the bus stop to remove.
 */
const removeBusStop = (dispatch, stop) => {
  return dispatch({
    type: REMOVE_ROUTE_STOP,
    payload: stop
  });
};

const editBusStop = (dispatch, stop) => {
  return dispatch({
    type: EDIT_ROUTE_STOP,
    payload: stop
  });
};

/**
 * Action creator to set active points (origin and destination)
 * @param {Function} dispatch The dispatch function to update the state.
 * @param {Object} payload An object containing the bus stop, index and destination to remove.
 */
const sortBusStopIndex = (dispatch, payload) => {
  return dispatch({
    type: SORT_BUS_STOP_INDEX,
    payload
  });
};

export { addBusStop, editBusStop, removeBusStop, sortBusStopIndex };
