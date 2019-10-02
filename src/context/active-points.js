import React, { createContext, useReducer } from "react";
import { initialState, reducer } from "../reducers/active-points";

const ActivePointsContext = createContext(initialState);

const ActivePointsProvider = ({ children }) => {
  const [activePoints, dispatchActivePoints] = useReducer(
    reducer,
    initialState
  );

  return (
    <ActivePointsContext.Provider
      value={{ activePoints, dispatchActivePoints }}
    >
      {children}
    </ActivePointsContext.Provider>
  );
};

export { initialState, ActivePointsContext, ActivePointsProvider };
