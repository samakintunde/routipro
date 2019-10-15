import React, { useState, useContext } from "react";
import { Input, Button, Drawer, InputNumber } from "antd";
import { motion } from "framer-motion";
import uuid from "uuid/v5";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { RouteForm } from "./index";
import { BusStop, RoundButton } from "../components";
import {
  addBusStop,
  removeBusStop,
  sortBusStopIndex
} from "../actions/set-route-stops";
import { RouteContext } from "../context/route-context";
import BusStopModel from "../models/bus-stop";

const Results = props => {
  const { route } = props;
  const [newBusStopForm, setNewBusStopForm] = useState({
    name: null,
    lat: null,
    lng: null
  });
  const [stopFormOpen, setStopFormOpen] = useState(false);

  const { dispatchRoute } = useContext(RouteContext);

  const handleInput = e => {
    const { name, value } = e.target;

    setNewBusStopForm({
      ...newBusStopForm,
      [name]: value
    });
  };

  const handleLatChange = value => {
    setNewBusStopForm({
      ...newBusStopForm,
      lat: value
    });
  };

  const handleLngChange = value => {
    setNewBusStopForm({
      ...newBusStopForm,
      lng: value
    });
  };

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

  const submitNewStop = e => {
    e.preventDefault();

    const { name, lat, lng } = newBusStopForm;
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
                    />
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        )}
        <Drawer
          title="Add New Stop"
          placement="bottom"
          visible={stopFormOpen}
          style={{ position: "absolute", right: 0, zIndex: 1 }}
          height="max-content"
          getContainer={false}
        >
          <form action="#" className="grid-y form" onSubmit={submitNewStop}>
            <div className="cell form-group">
              <label htmlFor="new-name">Name</label>
              <Input
                type="text"
                id="new-name"
                name="name"
                onChange={handleInput}
                autoComplete="false"
              />
            </div>

            <div className="cell form-group">
              <label htmlFor="new-lat">Latitude</label>
              <InputNumber id="new-lat" name="lat" onChange={handleLatChange} />
            </div>

            <div className="cell form-group">
              <label htmlFor="new-lng">Longitude</label>
              <InputNumber id="new-lng" name="lng" onChange={handleLngChange} />
            </div>

            <div className="cell form-group">
              <Button htmlType="submit" block className="button--primary">
                Add Stop
              </Button>
            </div>
          </form>
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