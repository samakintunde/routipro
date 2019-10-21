import { SET_LOADING } from "../constants/action-types";

/**
 * Action Creator to enable loading and disable
 * @param {Function} dispatch The function to use in updating the state
 * @param {Boolean} payload The state of the loading
 */
const setLoading = (dispatch, payload) => {
  return dispatch({
    type: SET_LOADING,
    payload
  });
};

export { setLoading };
