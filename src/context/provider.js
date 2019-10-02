import React from "react";
import { ActivePointsProvider } from "./active-points";

const Provider = ({ children }) => {
  return <ActivePointsProvider>{children}</ActivePointsProvider>;
};

export default Provider;
