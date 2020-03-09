import React, { useState } from "react";
import { Icon, Input } from "antd";
import { motion } from "framer-motion";
import { Draggable } from "react-beautiful-dnd";

import { Map } from "./";
import BusStopModel from "../models/bus-stop";

const BusStop = props => {
  const { index, stop, handleDelete, handleEdit, disableDrag } = props;
  const { name, coordinates } = stop;

  const [editing, setEditing] = useState(false);
  const [editedStop, setEditedStop] = useState({
    name: name,
    lat: coordinates.lat,
    lng: coordinates.lng
  });

  const activateEdit = () => {
    if (editing) {
      const data = {
        ...stop,
        name: editedStop.name,
        coordinates: {
          lat: editedStop.lat,
          lng: editedStop.lng
        }
      };
      const busStop = new BusStopModel(data);
      handleEdit({
        index,
        stop: busStop
      });
    }
    setEditing(!editing);
  };

  const handleStopEdit = e => {
    const { name, value } = e.target;

    setEditedStop({
      ...editedStop,
      [name]: value
    });
  };

  return (
    <Draggable
      draggableId={stop.id}
      index={index}
      isDragDisabled={editing || !disableDrag ? true : false}
    >
      {provided => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandlefProps}
          ref={provided.innerRef}
        >
          <motion.div
            className="cell grid-y bus-stop"
            key={index}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              height: 0,
              overflow: "hidden",
              opacity: 0,
              transition: 0.3
            }}
          >
            <div className="cell">
              <div className="grid-x align-justify">
                <div className="cell auto">
                  {!editing ? (
                    <p className="font-bold">{editedStop.name}</p>
                  ) : (
                    <Input
                      size="small"
                      name="name"
                      value={editedStop.name}
                      onChange={handleStopEdit}
                    />
                  )}
                </div>
                <div className="cell shrink grid-x">
                  <div
                    className="icon-container controls"
                    onClick={() => activateEdit()}
                  >
                    {editing ? (
                      <Icon type="check" className="success" />
                    ) : (
                      <Icon type="edit" className="normal" />
                    )}
                  </div>
                  {!editing && (
                    <div
                      className="icon-container controls"
                      onClick={() => handleDelete(stop)}
                    >
                      <Icon
                        type="close-circle"
                        theme="filled"
                        className="danger"
                      />
                    </div>
                  )}
                </div>
              </div>
              <Map
                index={index}
                stop={stop}
                editing={editing}
                handleEdit={handleEdit}
              ></Map>
              <div className="grid-x grid-padding-x">
                <p className="cell small-6 grid-y">
                  <strong>Long: </strong>
                  <span>
                    {!editing ? (
                      editedStop.lng
                    ) : (
                      <Input
                        size="small"
                        name="lng"
                        value={editedStop.lng}
                        onBlur={handleStopEdit}
                        onChange={handleStopEdit}
                      />
                    )}
                  </span>
                </p>
                <p className="cell small-6 grid-y">
                  <strong>Lat: </strong>
                  <span>
                    {!editing ? (
                      editedStop.lat
                    ) : (
                      <Input
                        size="small"
                        name="lat"
                        value={editedStop.lat}
                        onBlur={handleStopEdit}
                        onChange={handleStopEdit}
                      />
                    )}
                  </span>
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
