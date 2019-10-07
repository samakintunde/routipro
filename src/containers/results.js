import React from "react";
import { Steps } from "antd";
import { motion } from "framer-motion";

import { RouteForm } from "./index";

const { Step } = Steps;

const Results = props => {
  const { route } = props;

  return (
    <motion.div className="cell large-4 grid-y padding-2 results">
      <div className="cell shrink grid-x">
        <RouteForm />
      </div>
      <div className="cell auto grid-x padding-top-1 padding-bottom-1">
        <div className="cell">
          <Steps progressDot current={1} direction="vertical" className="steps">
            {route.stops.map((stop, i) => {
              const {
                name,
                geometry: { location }
              } = stop;
              return (
                <Step
                  key={i}
                  title={name}
                  description={`Lng: ${location.lng} Lat: ${location.lat}`}
                />
              );
            })}
          </Steps>
        </div>
      </div>
    </motion.div>
  );
};

export default Results;
