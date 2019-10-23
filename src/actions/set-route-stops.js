import {
  ADD_ROUTE_STOP,
  ADD_ROUTE_STOPS,
  CANCEL_SEARCH,
  EDIT_ROUTE_STOP,
  REMOVE_ROUTE_STOP,
  SORT_BUS_STOP_INDEX,
  SEARCH_STOPS
} from "../constants/action-types";

/**
 * Action creator to set active points (origin and destination)
 * @param {Function} dispatch The dispatch function to update the state.
 * @param {Object} stop A single bus stop.
 */
const addBusStop = (dispatch, stop) => {
  return dispatch({
    type: ADD_ROUTE_STOP,
    payload: stop
  });
};

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

const searchBusStops = (dispatch, payload) => {
  return dispatch({
    type: SEARCH_STOPS,
    payload
  });
};

const cancelSearch = dispatch => {
  return dispatch({
    type: CANCEL_SEARCH
  });
};

export {
  addBusStop,
  addBusStops,
  cancelSearch,
  editBusStop,
  removeBusStop,
  searchBusStops,
  sortBusStopIndex
};
