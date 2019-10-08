import React, { useState, useContext } from "react";
// import {  } from "lodash";
import axios from "axios";

import { AutoComplete, Button, Modal } from "antd";

import { RouteContext } from "../context/route-context";
import { PLACES_AUTOCOMPLETE_API } from "../services/api";
import { setActivePoints } from "../actions/set-route-points";

const RouteForm = props => {
  const { dispatchRoute } = useContext(RouteContext);

  const [form, setForm] = useState({
    origin: "",
    destination: ""
  });
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  /**
   * * Gets the details of the place you're searching for
   * @param {String} input The location being typed by the user
   * */
  const fetchPlaceSuggestions = async input => {
    const res = await axios.get(`${PLACES_AUTOCOMPLETE_API}&input=${input}`);
    try {
      const data = res.data.predictions.map(prediction => {
        return prediction.description;
      });
      setSuggestions(data);
    } catch (error) {
      setSuggestions([]);
    }
  };

  /**
   * * Handles the value of the input as a controlled component
   * @param {EventListenerObject} e
   * */
  const handleInputChange = (name, value) => {
    setForm({
      ...form,
      [name]: value
    });

    // setTimeout(() => {
    //   fetchPlaceSuggestions(value);
    // }, 100);
  };

  /**
   * * Handles the submission of the form and extracts the origin and destination of the inputs in the form
   * @param {EventListenerObject} e
   * */
  const handleFormSubmit = e => {
    e.preventDefault();
    const { origin, destination } = form;
    if (!origin || !destination) {
      return Modal.error({
        title: "Either the origin or the destination field is empty."
      });
    }
    setLoading(true);
    setActivePoints(dispatchRoute, { origin, destination });
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  };

  // if (route.stops.length && !loading) {
  //   return <Redirect to="/results" push />;
  // }

  return (
    <form className="cell grid-x form" onSubmit={handleFormSubmit}>
      <div className="cell large-6 form-group">
        <label htmlFor="start-point">Origin</label>
        <AutoComplete
          allowClear={true}
          id="origin"
          value={form.origin}
          dataSource={suggestions}
          onChange={val => handleInputChange("origin", val)}
        ></AutoComplete>
      </div>
      <div className="cell large-6 form-group">
        <label htmlFor="end-point">Destination</label>
        <AutoComplete
          allowClear={true}
          id="destination"
          value={form.destination}
          dataSource={suggestions}
          onChange={val => handleInputChange("destination", val)}
        ></AutoComplete>
      </div>
      <div className="cell large-12 align-center">
        <div className="form-group text-center">
          <Button
            className="button--primary"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Get Route Details
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RouteForm;
