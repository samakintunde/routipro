import React, { useState, useContext } from "react";
import axios from "axios";
import "./vendor/route-boxer";

import Header from "./components/header";
import Input from "./components/input";
import "./assets/scss/app.scss";
import {
  PLACES_API,
  PLACES_NEARBY_API,
  DIRECTIONS_API,
  PLACES_AUTOCOMPLETE_API
} from "./services/api";
import { ActivePointsContext } from "./context/active-points";
import {
  SET_ACTIVE_POINTS,
  SET_ACTIVE_START_POINT,
  SET_ACTIVE_END_POINT
} from "./actions/types";

const App = () => {
  const [form, setForm] = useState({
    start: "",
    end: ""
  });
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const { activePoints, dispatchActivePoints } = useContext(
    ActivePointsContext
  );
  // const rboxer = new RouteBoxer();
  // const distance = 5;
  // const { start, end } = activePoints;

  const handleFormSubmit = e => {
    e.preventDefault();
    // console.log("form", form);
    // dispatchActivePoints({ type: SET_ACTIVE_POINTS, payload: form });
    // console.log("activePoints", activePoints);
    // fetchRoute(activePoints);
    fetchPlace();
  };

  const fetchRoute = async ({ start, end }) => {
    const res = await axios.get(
      `${DIRECTIONS_API}&origin=place_id:${start.place_id}&destination=place_id:${end.place_id}&mode=transit`
    );
    console.log(res);
  };

  const fetchPlace = async () => {
    const resStart = await axios.get(
      `${PLACES_API}&types=${form.start}&inputtype=textquery&fields=name,icon,type,geometry/viewport,place_id`
    );
    const resEnd = await axios.get(
      `${PLACES_API}&types=${form.end}&inputtype=textquery&fields=name,icon,type,geometry/viewport,place_id`
    );
    console.log(resStart, resEnd);
  };

  const fetchPlaceSuggestions = async place => {
    const res = await axios.get(`${PLACES_AUTOCOMPLETE_API}&input=${place}`);
    setAutocompleteSuggestions(res.data.predictions);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    fetchPlaceSuggestions(value);
  };

  const handleSuggestionClick = (name, suggestion) => {
    setForm({ ...form, [name]: suggestion.description });

    if (name === "start") {
      dispatchActivePoints({
        type: SET_ACTIVE_START_POINT,
        payload: suggestion
      });
    } else {
      dispatchActivePoints({
        type: SET_ACTIVE_END_POINT,
        payload: suggestion
      });
    }
  };

  return (
    <div className="grid-container full app">
      <Header title="Routipro" />
      <div className="grid-container">
        <div className="grid-x">
          <div className="cell medium-6">
            <form className="form" action="#" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="start-point">Start</label>
                <Input
                  id="start-point"
                  type="text"
                  name="start"
                  value={form.start}
                  handleInput={handleInputChange}
                  handleSuggestion={handleSuggestionClick}
                  suggestions={autocompleteSuggestions}
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
                  suggestions={autocompleteSuggestions}
                />
              </div>
              <div className="form-group">
                <button
                  className="form-action button button--primary"
                  type="submit"
                >
                  Get Route Details
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
