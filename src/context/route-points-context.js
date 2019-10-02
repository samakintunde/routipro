import React, { createContext, useReducer } from "react";
import {
  initialState,
  routePointsReducer
} from "../reducers/route-points-reducer";

const RoutePointsContext = createContext(initialState);

const RoutePointsProvider = ({ children }) => {
  const [routePoints, dispatchRoutePoints] = useReducer(
    routePointsReducer,
    initialState
  );

  return (
    <RoutePointsContext.Provider value={{ routePoints, dispatchRoutePoints }}>
      {children}
    </RoutePointsContext.Provider>
  );
};

export { initialState, RoutePointsContext, RoutePointsProvider };
