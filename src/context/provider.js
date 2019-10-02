import React from "react";
import { ActivePointsProvider } from "./route-points-context";

const Provider = ({ children }) => {
  return <ActivePointsProvider>{children}</ActivePointsProvider>;
};

export default Provider;
