import {
  SET_ACTIVE_POINTS,
  SET_ORIGIN_POINT,
  SET_DESTINATION_POINT
} from "../actions/types";

const initialState = {
  origin: {},
  destination: {}
};

const routePointsReducer = (state = initialState, action) => {
  const { payload, type } = action;
  console.log(action);
  switch (type) {
    case SET_ACTIVE_POINTS:
      console.log("from reducer", payload);
      return payload;
    case SET_ORIGIN_POINT:
      return { ...state, origin: payload };
    case SET_DESTINATION_POINT:
      return { ...state, destination: payload };

    default:
      return state;
  }
};

export { initialState, routePointsReducer };
