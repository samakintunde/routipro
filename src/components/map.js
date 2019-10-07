import React, { useEffect, useContext } from "react";
import axios from "axios";

import { RouteContext } from "../context/route-context";
import { addBusStops } from "../actions/set-route-stops";
import { PLACES_API } from "../services/api";
import { sortBusStops } from "../actions/sort-bus-stops";
import BusStop from "../models/bus-stop";

const Map = props => {
  const { route, dispatchRoute } = useContext(RouteContext);
  const { mapOptions } = props;

  const { google, RouteBoxer } = window;

  const routeBoxer = new RouteBoxer();

  let distance = 0.01;
  let boxpolys = null;
  let map = null;

  /**
   * Initializes the Google Maps Client and renders a map
   */
  const init = () => {
    map = new google.maps.Map(document.getElementById("main-map"), mapOptions);

    window.directionService = new google.maps.DirectionsService();
    window.directionsRenderer = new google.maps.DirectionsRenderer({
      map: map
    });
  };

  const makeRoute = () => {
    // e.preventDefault();
    // Clear any previous route boxes from the map
    clearBoxes();

    // Convert the distance to box around the route from miles to km
    distance = distance * 1.609344;

    var request = {
      origin: route.origin,
      destination: route.destination,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    const getBusStopInBox = async (coordinates, origin) => {
      const API = `${PLACES_API}&types=bus_station&input=bus&inputtype=textquery&fields=name,icon,type,geometry/location,place_id&locationbias=rectangle:${coordinates.southWest}|${coordinates.northEast}`;

      try {
        const res = await axios.get(API);
        // console.log("bus stop", new BusStop(res.data.candidates[0], origin));
        addBusStops(dispatchRoute, new BusStop(res.data.candidates[0], origin));
        // setTimeout(() => {
        //   sortBusStops(dispatchRoute, origin);
        // }, 16);
      } catch (error) {
        throw new Error(error);
      }
    };

    // Make the directions request
    window.directionService.route(request, async function(result, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        window.directionsRenderer.setDirections(result);

        // Box around the overview path of the first route
        var path = result.routes[0].overview_path;
        var boxes = routeBoxer.box(path, distance);
        drawBoxes(boxes);

        const origin = {
          lat: result.routes[0].legs[0].start_location.lat(),
          lon: result.routes[0].legs[0].start_location.lng()
        };

        // const sortedBoxes = sortBusStops(boxes, boxes[0]);

        boxes.map((box, i) => {
          getBusStopInBox(
            {
              southWest: `${box.oa.g},${box.ka.g}`,
              northEast: `${box.oa.h},${box.ka.h}`
            },
            origin
          );
        });
      } else {
        alert("Directions query failed: " + status);
      }
    });
  };

  // Draw the array of boxes as polylines on the map
  const drawBoxes = boxes => {
    boxpolys = new Array(boxes.length);
    for (var i = 0; i < boxes.length; i++) {
      boxpolys[i] = new google.maps.Rectangle({
        bounds: boxes[i],
        fillOpacity: 0,
        strokeOpacity: 1.0,
        strokeColor: "#000000",
        strokeWeight: 1,
        map: map
      });
    }
  };

  // Clear boxes currently on the map
  const clearBoxes = () => {
    if (boxpolys != null) {
      for (var i = 0; i < boxpolys.length; i++) {
        boxpolys[i].setMap(null);
      }
    }
    boxpolys = null;
  };

  useEffect(init, []);

  useEffect(makeRoute, [route.origin, route.destination]);

  return <div id="main-map" className="map"></div>;
};

export default Map;
