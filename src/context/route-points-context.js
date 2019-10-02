import React, { createContext, useReducer } from "react";
import {
  initialState,
  routePointsReducer
} from "../reducers/route-points-reducer";

const ActivePointsContext = createContext(initialState);

const ActivePointsProvider = ({ children }) => {
  const [routePoints, dispatchRoutePoints] = useReducer(
    routePointsReducer,
    initialState
  );

  return (
    <ActivePointsContext.Provider value={{ routePoints, dispatchRoutePoints }}>
      {children}
    </ActivePointsContext.Provider>
  );
};

export { initialState, ActivePointsContext, ActivePointsProvider };
