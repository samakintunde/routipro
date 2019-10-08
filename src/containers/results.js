import React, { useState, useContext } from "react";
import { Input, Button } from "antd";
import { motion } from "framer-motion";

import { RouteForm } from "./index";
import { BusStop, RoundButton } from "../components";
import { addBusStop } from "../actions/set-route-stops";
import { RouteContext } from "../context/route-context";

const Results = props => {
  const { route } = props;
  const [newBusStopForm, setNewBusStopForm] = useState({
    name: null,
    lat: null,
    lng: null
  });
  const [addFormOpen, setAddFormOpen] = useState(false);

  const { dispatchRoute } = useContext(RouteContext);

  const openAddStop = () => {
    setAddFormOpen(!addFormOpen);
  };

  const addStop = () => {
    addBusStop(dispatchRoute);
  };

  return (
    <motion.div className="cell large-4 grid-y padding-2 results">
      <div className="cell shrink grid-x">
        <RouteForm />
      </div>
      <div className="cell auto grid-x padding-top-1 padding-bottom-1">
        <div className="cell grid-y steps">
          {route.stops.map((stop, i) => (
            <BusStop key={i} index={i} stop={stop} />
          ))}
        </div>
        <motion.div
          className="cell large-4 results__input-container form"
          initial={{ y: "100%" }}
          animate={{ y: addFormOpen ? 0 : "100%" }}
        >
          <form action="#" className="form">
            <label htmlFor="">Name</label>
            <Input type="text" />
            <div className="grid-x form-group">
              <div className="cell small-6">
                <label htmlFor="">Longitude</label>
                <Input type="text" name="lng" />
              </div>
              <div className="cell small-6">
                <label htmlFor="">Latitude</label>
                <Input type="text" name="lat" />
              </div>
            </div>
            <Button
              type="submit"
              block
              className="button--primary"
              onClick={addStop}
            >
              Add Stop
            </Button>
          </form>
        </motion.div>
        <div className="fab-container">
          <RoundButton
            icon={addFormOpen ? "close" : "plus"}
            handleClick={openAddStop}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Results;
