import React from "react";
import { Result } from "antd";
import { motion } from "framer-motion";
import uuid from "uuid/v5";
import { Droppable } from "react-beautiful-dnd";

import { BusStop } from "../components";

const Results = props => {
  // PROPS
  const { stops, handleBusStopDelete, handleBusStopEdit, disableDrag } = props;

  // ANIMATION (FRAMER MOTION)
  const busStopVariants = {
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: "100%" }
  };

  const droppableId = new uuid("routipro.com", uuid.DNS);

  return (
    <>
      {stops.length !== 0 ? (
        <Droppable droppableId={droppableId}>
          {provided => (
            <div
              className="cell auto grid-x padding-top-1 padding-bottom-1 results"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <motion.div
                className="cell grid-y bus-stops"
                animate={stops ? "in" : "out"}
                variants={busStopVariants}
              >
                {stops.map((stop, i) => (
                  <BusStop
                    key={stop.name}
                    index={i}
                    stop={stop}
                    handleDelete={handleBusStopDelete}
                    handleEdit={handleBusStopEdit}
                    disableDrag={disableDrag}
                  />
                ))}
                {provided.placeholder}
              </motion.div>
            </div>
          )}
        </Droppable>
      ) : (
        <Result status="warning" title="Sorry, there were no results" />
      )}
    </>
  );
};

export default Results;
