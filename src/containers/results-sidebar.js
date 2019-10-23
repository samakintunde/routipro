import React, { useState, useContext } from "react";
import { Collapse, Drawer } from "antd";
import { motion } from "framer-motion";
import uuid from "uuid/v5";
import { DragDropContext } from "react-beautiful-dnd";

import { RouteForm, AddStopForm, Results } from "./index";
import { RoundButton } from "../components";
import {
  addBusStop,
  editBusStop,
  removeBusStop,
  sortBusStopIndex
} from "../actions/set-route-stops";
import { RouteContext } from "../context/route-context";
import BusStopModel from "../models/bus-stop";

const { Panel } = Collapse;

const ResultsSidebar = () => {
  // STATE
  const [stopFormOpen, setStopFormOpen] = useState(false);

  // STORE (CONTEXT)
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
    const { id, name, lat, lng } = stop;
    const originCoords = route.origin.coordinates;

    const newBusStop = new BusStopModel(
      {
        id: id || uuid("routipro.dev", uuid.DNS),
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

  return (
    <motion.div
      className="cell large-4 grid-y results-container"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      transition={{ ease: "easeOut", duration: 0.56 }}
    >
      <DragDropContext onDragEnd={handleBusStopDrag}>
        <div className="cell grid-x">
          <Collapse
            defaultActiveKey={["1"]}
            className="width-100"
            expandIconPosition="right"
          >
            <Panel header="Find Stops" key="1">
              <RouteForm />
            </Panel>
          </Collapse>
        </div>
        <div className="grid-x section--sm">
          <small className="cell auto">
            <p>
              From{" "}
              <strong className="color-primary-darkest">
                {route.origin.name}
              </strong>{" "}
              to{" "}
              <strong className="color-primary-darkest">
                {route.destination.name}
              </strong>
            </p>
          </small>
          <small className="cell small-offset-1 shrink">
            <p>
              <strong className="color-primary-darkest">
                {route.stops.length}
              </strong>{" "}
              results
            </p>
          </small>
        </div>
        <Results
          stops={route.stops}
          handleBusStopDelete={handleBusStopDelete}
          handleBusStopEdit={handleBusStopEdit}
        />

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

export default ResultsSidebar;
