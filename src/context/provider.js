import React from "react";
import { RoutePointsProvider } from "./route-points-context";

const Provider = ({ children }) => {
  return <RoutePointsProvider>{children}</RoutePointsProvider>;
};

export default Provider;
