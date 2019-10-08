import React from "react";
import { STATIC_MAP } from "../services/api";

const Map = props => {
  const { index, active, stop } = props;
  const { coordinates } = stop;
  const { google } = window;

  let map = null;

  // const mapImage = `${STATIC_MAP}&center=${coordinates.lat},${coordinates.lng}`;
  const mapImage =
    "https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=960x320&maptype=roadmap&key=AIzaSyDWplqBHPUmNu-Z28uZTxUVHPpAnM9BrPM&center=6.437283,3.451255";

  const mapOptions = {
    center: new google.maps.LatLng(coordinates.lat, coordinates.lng),
    marker: new google.maps.Marker({
      position: coordinates,
      map: map
    }),
    disableDefaultUI: true,
    gestureHandling: "cooperative",
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 15
  };

  /**
   * Initializes the Google Maps Client and renders a map
   */
  const initMap = mapOptions => {
    const mapEl = document.getElementById(`map-${index}`);
    if (!mapEl) return;
    map = new google.maps.Map(mapEl, mapOptions);
  };

  if (active) {
    setTimeout(() => {
      initMap(mapOptions);
    });
    return (
      <div className="cell step__map-container">
        <div
          className={`step__map "step__map--visible`}
          id={`map-${index}`}
        ></div>
      </div>
    );
  } else {
    console.log("image", mapImage);
    return (
      <div className="cell step__map-container">
        <img className={`step__map step__map--visible`} src={mapImage} alt="" />
      </div>
    );
  }
};

export default Map;
