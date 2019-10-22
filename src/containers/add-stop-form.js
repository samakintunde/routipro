import React, { useState } from "react";
import { AutoComplete, Button, InputNumber, Modal } from "antd";
import { debounce } from "../utils/debounce";

const AddStopForm = props => {
  // STATE
  const [suggestions, setSuggestions] = useState([]);
  const [newBusStop, setNewBusStop] = useState({
    id: null,
    name: null,
    lat: null,
    lng: null
  });

  // PROPS
  const { submitNewStop } = props;

  const { google } = window;
  const {
    AutocompleteService,
    AutocompleteSessionToken,
    PlacesService,
    PlacesServiceStatus
  } = google.maps.places;
  const autocompleteService = new AutocompleteService();
  const placesService = new PlacesService(
    document.querySelector(".dummy-map-1")
  );
  const sessionToken = new AutocompleteSessionToken();

  /**
   * * Gets the details of the place you're searching for
   * @param {Object} request The location being typed by the user
   * @param {Function} updateState The function to use in updating state
   * */
  const fetchPlaceSuggestions = (request, updateState) => {
    autocompleteService.getPlacePredictions(request, (predictions, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const refinedPredictions = Array.from(
          predictions,
          prediction => prediction.description
        );
        updateState(refinedPredictions);
      }
    });
  };

  const getPlaceDetails = (request, state, updateState) => {
    placesService.findPlaceFromQuery(request, (results, status) => {
      if (status === PlacesServiceStatus.OK) {
        updateState({
          name: results[0].name,
          id: results[0].place_id,
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        });
      }
    });
  };

  /**
   * Handle addition of name of new Bus Stop
   * @param {String} value
   */
  const handleNameInput = value => {
    setNewBusStop({
      ...newBusStop,
      name: value
    });

    const request = {
      input: value,
      componentRestrictions: { country: "ng" },
      token: sessionToken,
      types: ["geocode", "establishment"]
    };

    debounce(fetchPlaceSuggestions(request, setSuggestions), 500);
  };

  const handleNameSelect = (val, _) => {
    const request = {
      query: val,
      fields: ["geometry.location", "place_id", "name"]
    };

    getPlaceDetails(request, newBusStop, setNewBusStop);
  };

  const handleLatChange = value => {
    setNewBusStop({
      ...newBusStop,
      lat: value
    });
  };

  const handleLngChange = value => {
    setNewBusStop({
      ...newBusStop,
      lng: value
    });
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    const { name, lat, lng } = newBusStop;

    // Handle Empty fields in form error
    if (!name || !lat || !lng) {
      return Modal.error({
        title: "Either the name or the coordinates field is empty."
      });
    }

    submitNewStop(newBusStop);

    setNewBusStop({
      name: "",
      lat: "",
      lng: ""
    });
  };

  return (
    <form action="#" className="grid-y form" onSubmit={handleFormSubmit}>
      <div className="cell form-group">
        <label htmlFor="new-name">Name</label>
        <AutoComplete
          allowClear={true}
          dataSource={suggestions}
          id="new-name"
          onChange={handleNameInput}
          onSelect={handleNameSelect}
        />
      </div>

      <div className="cell form-group">
        <label htmlFor="new-lat">Latitude</label>
        <InputNumber
          id="new-lat"
          name="lat"
          value={newBusStop.lat}
          onChange={handleLatChange}
        />
      </div>

      <div className="cell form-group">
        <label htmlFor="new-lng">Longitude</label>
        <InputNumber
          id="new-lng"
          name="lng"
          value={newBusStop.lng}
          onChange={handleLngChange}
        />
      </div>

      <div className="cell form-group">
        <Button htmlType="submit" block className="button--primary">
          Add Stop
        </Button>
      </div>
      <div className="dummy-map-1" style={{ display: "none" }}></div>
    </form>
  );
};

export default AddStopForm;
