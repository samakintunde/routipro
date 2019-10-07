import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const BusStop = props => {
  const { index, stop } = props;
  const { name, coordinates } = stop;
  const { google } = window;

  const [active, setActive] = useState(false);

  let map = null;

  /**
   * Initializes the Google Maps Client and renders a map
   */
  const initMap = (mapOptions, index) => {
    const mapEl = document.getElementById(`map-${index}`);
    if (!mapEl) return;
    map = new google.maps.Map(mapEl, mapOptions);
  };

  const handleMapRender = (location, index) => {
    if (active) return;
    setActive(true);

    const mapOptions = {
      center: new google.maps.LatLng(
        location.coordinates.lat,
        location.coordinates.lng
      ),
      marker: new google.maps.Marker({
        position: location.coordinates,
        map: map
      }),
      disableDefaultUI: true,

      gestureHandling: "cooperative",

      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 15
    };

    initMap(mapOptions, index);
  };

  return (
    <motion.div
      className="cell grid-y step"
      key={index}
      whileTap={{ scale: 0.8 }}
      onClick={e => handleMapRender(stop, index)}
    >
      <div className="cell">
        <p className="font-bold">{name}</p>
        <div className="cell step__map-container">
          <div
            className={`step__map ${active && "step__map--visible"}`}
            id={`map-${index}`}
          ></div>
        </div>
        <div className="grid-x">
          <p className="cell small-6">Long: {coordinates.lng}</p>
          <p className="cell small-6">Lat: {coordinates.lat}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default BusStop;
