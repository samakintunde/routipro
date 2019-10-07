import { SORT_BUS_STOPS } from "../constants/action-types";

const sortBusStops = (dispatch, origin) => {
  return dispatch({
    type: SORT_BUS_STOPS,
    payload: origin
  });
};

export { sortBusStops };
