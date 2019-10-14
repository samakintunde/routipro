import { SET_ROUTE_POINTS } from "../constants/action-types";

/**
 * Action creator to set active points (origin and destination)
 * @param {Function} dispatch The dispatch function to update the state.
 * @param {Object} payload An object containing the origin and destination text
 */
const setActivePoints = (dispatch, payload) => {
  return dispatch({
    type: SET_ROUTE_POINTS,
    payload
  });
};

export { setActivePoints };
