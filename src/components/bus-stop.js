import React, { useState } from "react";
import { Icon } from "antd";
import { motion } from "framer-motion";
import { Draggable } from "react-beautiful-dnd";
import uuid from "uuid/v5";

import { Map } from "./";

const BusStop = props => {
  const { index, stop, handleDelete } = props;
  const { name, coordinates } = stop;

  const [active, setActive] = useState(false);

  const handleMapRender = e => {
    if (active) return;
    setActive(true);
  };

  return (
    <Draggable draggableId={stop.id} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <motion.div
            className="cell grid-y bus-stop"
            key={index}
            onClick={handleMapRender}
          >
            <div className="cell">
              <div className="grid-x align-justify">
                <p className="font-bold">{name}</p>
                <div onClick={() => handleDelete(stop)}>
                  <Icon
                    type="close-circle"
                    theme="filled"
                    className="bus-stop__close-btn"
                  />
                </div>
              </div>
              <Map index={index} stop={stop} active={active}></Map>
              <div className="grid-x">
                <p className="cell small-6 grid-y">
                  <strong>Long: </strong>
                  <span>{coordinates.lng}</span>
                </p>
                <p className="cell small-6 grid-y">
                  <strong>Lat: </strong>
                  <span>{coordinates.lat}</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </Draggable>
  );
};

export default BusStop;
