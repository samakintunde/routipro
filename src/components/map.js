import React from "react";

const Map = props => {
  const { index, active, stop } = props;
  const { coordinates } = stop;
  const { google } = window;

  let map = null;

  const mapImage = `https://maps.googleapis.com/maps/api/staticmap?zoom=18&size=960x320&maptype=roadmap&key=AIzaSyDWplqBHPUmNu-Z28uZTxUVHPpAnM9BrPM&center=${coordinates.lat},${coordinates.lng}`;

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
      <div className="cell bus-stop__map-container">
        <div
          className="bus-stop__map bus-stop__map--visible"
          id={`map-${index}`}
        ></div>
      </div>
    );
  } else {
    return (
      <div className="cell bus-stop__map-container">
        <img
          className="bus-stop__map bus-stop__map--visible"
          src={mapImage}
          alt=""
        />
      </div>
    );
  }
};

export default Map;
