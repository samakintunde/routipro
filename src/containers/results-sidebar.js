import React, { useState, useContext, useEffect } from "react";
import { Button, Collapse, Drawer, Input } from "antd";
import { motion } from "framer-motion";
import uuid from "uuid/v5";
import { DragDropContext } from "react-beautiful-dnd";
import fuzzysort from "fuzzysort";

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
import { debounce } from "../utils/debounce";

const { Panel } = Collapse;
const { Search } = Input;

// FUZZY SEARCH OPTIONS
const searchOptions = {
  key: "name",
  threshhold: -500
};

const ResultsSidebar = () => {
  // STORE (CONTEXT)
  const { route, dispatchRoute } = useContext(RouteContext);
  const { stops } = route;

  // STATE
  const [stopFormOpen, setStopFormOpen] = useState(false);
  const [queriedStops, setQueriedStops] = useState(stops);
  const [query, setQuery] = useState("");

  // LIFECYCLE
  useEffect(() => setQueriedStops(stops), [stops]);

  stops.forEach(t => (t.filePrepared = fuzzysort.prepare(t.name)));

  const handleBusStopDelete = stop => {
    removeBusStop(dispatchRoute, stop);
  };

  const handleBusStopDragEnd = result => {
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

  const handleSearch = e => {
    const { value } = e.target;
    setQuery(value);

    if (value) {
      const searchResults = fuzzysort
        .go(value, stops, searchOptions)
        .map(result => result.obj);
      debounce(setQueriedStops(searchResults), 5000);
    } else {
      setQueriedStops(stops);
    }
  };

  const handleDeleteSearch = e => {
    setQuery("");
    setQueriedStops(stops);
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
      <DragDropContext
        onDragEnd={handleBusStopDragEnd}
        onDragStart={hanleBusStopDragStart}
      >
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
          <div className="cell small-12 grid-x">
            <div className="cell small-3">Search Results</div>
            <div className="cell auto">
              <Search
                size="small"
                placeholder="Search"
                value={query}
                onChange={handleSearch}
              ></Search>
            </div>
            {(queriedStops.length !== 0 || query) && (
              <motion.div
                className="cell shrink controls"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <Button
                  className="danger"
                  type="link"
                  size="small"
                  onClick={handleDeleteSearch}
                >
                  clear search
                </Button>
              </motion.div>
            )}
          </div>
        </div>
        <Results
          stops={queriedStops}
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
