import React from "react";
import { RouteProvider } from "./route-context";

const Provider = ({ children }) => {
  return <RouteProvider>{children}</RouteProvider>;
};

export default Provider;
