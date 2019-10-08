import React, { useState } from "react";
import { motion } from "framer-motion";
import { Map } from "./";

const BusStop = props => {
  const { index, stop } = props;
  const { name, coordinates } = stop;

  const [active, setActive] = useState(false);

  const handleMapRender = e => {
    if (active) return;
    setActive(true);
  };

  return (
    <motion.div
      className="cell grid-y step"
      key={index}
      onClick={handleMapRender}
    >
      <div className="cell">
        <p className="font-bold">{name}</p>
        <Map index={index} stop={stop} active={active}></Map>
        <div className="grid-x">
          <p className="cell small-6">Long: {coordinates.lng}</p>
          <p className="cell small-6">Lat: {coordinates.lat}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default BusStop;
