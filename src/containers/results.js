import React, { useState } from "react";
import { motion } from "framer-motion";

import { RouteForm } from "./index";
import { BusStop } from "../components";

const Results = props => {
  const { route } = props;

  return (
    <motion.div className="cell large-4 grid-y padding-2 results">
      <div className="cell shrink grid-x">
        <RouteForm />
      </div>
      <div className="cell auto grid-x padding-top-1 padding-bottom-1">
        <div className="cell grid-y steps">
          {route.stops.map((stop, i) => {
            return <BusStop key={i} index={i} stop={stop} />;
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Results;
