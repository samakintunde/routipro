import React, { useEffect } from "react";
// import { RouteBoxer } from "../vendor/RouteBoxer";

const Map = props => {
  const { google, RouteBoxer } = window;

  /**
   * Initializes the Google Maps Client and renders a map
   */
  const init = () => {
    // const boxpolys = null;
    // const directions = null;
    // const distance = null;

    // eslint-disable-next-line

    // const routeBoxer = new RouteBoxer();
    const mapOptions = {
      center: new google.maps.LatLng(6.5244, 3.3792),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 8
    };

    const map = new google.maps.Map(
      document.getElementById("main-map"),
      mapOptions
    );

    const directionService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({ map: map });
  };

  useEffect(init, [google]);

  // console.log("mapOptions", mapOptions);

  return <div id="main-map" className="map"></div>;
};

export default Map;
