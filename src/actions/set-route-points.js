import { SET_ROUTE_POINTS } from "../constants/action-types";

/**
 * Action creator to set active points (origin and destination)
 * @param {Function} dispatch The dispatch function to update the state.
 * @param {Object} data An object containing the origin and destination text
 */
const setActivePoints = (dispatch, data) => {
  const { origin, destination } = data;

  return dispatch({
    type: SET_ROUTE_POINTS,
    payload: {
      origin,
      destination
    }
  });
};

export { setActivePoints };
