import React, { createContext, useReducer } from "react";
import { initialState, routeReducer } from "../reducers/route-reducer";

const RouteContext = createContext(initialState);

const RouteProvider = ({ children }) => {
  const [route, dispatchRoute] = useReducer(routeReducer, initialState);

  return (
    <RouteContext.Provider value={{ route, dispatchRoute }}>
      {children}
    </RouteContext.Provider>
  );
};

export { initialState, RouteContext, RouteProvider };
