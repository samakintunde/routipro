import {
  SET_ACTIVE_POINTS,
  SET_ACTIVE_END_POINT,
  SET_ACTIVE_START_POINT
} from "../actions/types";

const initialState = {};

const reducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_ACTIVE_POINTS:
      return { ...state, ...payload };
    case SET_ACTIVE_START_POINT:
      return { ...state, start: payload };
    case SET_ACTIVE_END_POINT:
      return { ...state, end: payload };

    default:
      return state;
  }
};

export { initialState, reducer };
