import React, { useState } from "react";
import axios from "axios";

import { Input } from "../components";
import { PLACES_AUTOCOMPLETE_API, PLACES_API } from "../services/api";

const RouteForm = () => {
  const [form, setForm] = useState({
    origin: "",
    destination: ""
  });

  const [suggestions, setSuggestions] = useState([]);

  /**
   * * Gets the details of the place you're searching for
   * @param {String} input The location being typed by the user
   * */
  const fetchPlaceSuggestions = async input => {
    const res = await axios.get(`${PLACES_AUTOCOMPLETE_API}&input=${input}`);
    setSuggestions(res.data.predictions);
  };

  /**
   * * Gets the details of the place you're searching for
   * @param {String} origin
   * @param {String} destination
   * */
  const fetchPlace = async (origin, destination) => {
    [origin, destination].forEach(async place => {
      const res = await axios.get(`${PLACES_API}&input=${place}`);
      console.log("res", res);
    });
  };

  /**
   * * Handles the value of the input as a controlled component
   * @param {EventListenerObject} e
   * */
  const handleInputChange = e => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

    fetchPlaceSuggestions(value);
  };

  /**
   * * Handles the submission of the form and extracts the origin and destination of the inputs in the form
   * @param {EventListenerObject} e
   * */
  const handleFormSubmit = e => {
    e.preventDefault();
    const { origin, destination } = form;
    fetchPlace(origin, destination);
  };

  /**
   * * Handles the click on an autocomplete suggestion. Sets it to state.
   * @param suggestion - A suggestion event
   */
  const handleSuggestionClick = () => {};

  return (
    <form className="form" onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label htmlFor="start-point">Start</label>
        <Input
          id="start-point"
          type="text"
          name="start"
          value={form.start}
          handleInput={handleInputChange}
          handleSuggestion={handleSuggestionClick}
          suggestions={suggestions}
        />
      </div>
      <div className="form-group">
        <label htmlFor="end-point">End</label>
        <Input
          id="end-point"
          type="text"
          name="end"
          value={form.end}
          handleInput={handleInputChange}
          handleSuggestion={handleSuggestionClick}
          suggestions={suggestions}
        />
      </div>
      <div className="form-group">
        <button className="form-action button button--primary" type="submit">
          Get Route Details
        </button>
      </div>
    </form>
  );
};

export default RouteForm;
