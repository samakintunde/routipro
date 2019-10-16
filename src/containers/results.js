import React, { useState, useContext } from "react";
import { Drawer } from "antd";
import { motion } from "framer-motion";
import uuid from "uuid/v5";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { RouteForm, AddStopForm } from "./index";
import { BusStop, RoundButton } from "../components";
import {
  addBusStop,
  editBusStop,
  removeBusStop,
  sortBusStopIndex
} from "../actions/set-route-stops";
import { RouteContext } from "../context/route-context";
import BusStopModel from "../models/bus-stop";

const Results = props => {
  const [stopFormOpen, setStopFormOpen] = useState(false);

  const { route, dispatchRoute } = useContext(RouteContext);

  const handleBusStopDelete = stop => {
    removeBusStop(dispatchRoute, stop);
  };

  const handleBusStopDrag = result => {
    const { destination, source } = result;

    if (!destination) return;

    if (destination.index === source.index) return;

    sortBusStopIndex(dispatchRoute, {
      stop: route.stops[source.index],
      source: source.index,
      destination: destination.index
    });
  };

  const handleBusStopEdit = stop => {
    editBusStop(dispatchRoute, stop);
  };

  const submitNewStop = stop => {
    const { name, lat, lng } = stop;
    const originCoords = route.origin.coordinates;

    const newBusStop = new BusStopModel(
      {
        id: uuid("routipro.dev", uuid.DNS),
        name,
        coordinates: {
          lat,
          lng
        }
      },
      originCoords
    );
    addBusStop(dispatchRoute, newBusStop);
    setStopFormOpen(false);
  };

  const droppableId = new uuid("routipro.com", uuid.DNS);

  return (
    <motion.div
      className="cell large-4 grid-y results-container"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
    >
      <DragDropContext onDragEnd={handleBusStopDrag}>
        <div className="cell grid-x">
          <RouteForm />
        </div>
        <div className="grid-x section--sm">
          <p>
            From <strong>{route.origin.name}</strong> to{" "}
            <strong>{route.destination.name}</strong>
          </p>
          <p>{route.stops.length} results</p>
        </div>
        {route.stops.length !== 0 && (
          <Droppable droppableId={droppableId}>
            {provided => (
              <div
                className="cell auto grid-x padding-top-1 padding-bottom-1 results"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div className="cell grid-y bus-stops">
                  {route.stops.map((stop, i) => (
                    <BusStop
                      key={stop.id}
                      index={i}
                      stop={stop}
                      handleDelete={handleBusStopDelete}
                      handleEdit={handleBusStopEdit}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        )}
        <Drawer
          className="add-stop-form"
          title="Add New Stop"
          placement="bottom"
          visible={stopFormOpen}
          onClose={() => setStopFormOpen(false)}
          height="max-content"
          getContainer={false}
        >
          <AddStopForm submitNewStop={submitNewStop} />
        </Drawer>
        <div className="fab-container">
          {!stopFormOpen && (
            <RoundButton
              icon={stopFormOpen ? "close" : "plus"}
              handleClick={() => setStopFormOpen(true)}
            />
          )}
        </div>
      </DragDropContext>
    </motion.div>
  );
};

export default Results;
