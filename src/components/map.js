import React, {
  useEffect,
  useContext,
  useCallback
} from "react";
import RouteBoxer from "../vendor/RouteBoxer";
import {
  RoutePointsContext
} from "../context/route-points-context";
import {
  PROXY
} from "../services/api";
// import { RouteBoxer } from "../vendor/RouteBoxer";

const Map = props => {
  const {
    routePoints,
    dispatchRoutePoints
  } = useContext(RoutePointsContext);

  const {
    google
  } = window;

  const routeBoxer = new RouteBoxer();

  let distance = 0.5;
  let boxpolys = null;
  let directions = null;
  let map = null;
  /**
   * Initializes the Google Maps Client and renders a map
   */
  const init = () => {
    const mapOptions = {
      center: new google.maps.LatLng(6.5244, 3.3792),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 8
    };

    map = new google.maps.Map(document.getElementById("main-map"), mapOptions);

    window.directionService = new google.maps.DirectionsService();
    window.directionsRenderer = new google.maps.DirectionsRenderer({
      map: map
    });
  };

  const route = () => {
    // e.preventDefault();
    // Clear any previous route boxes from the map
    clearBoxes();

    // Convert the distance to box around the route from miles to km
    distance = distance * 1.609344;

    var request = {
      origin: routePoints.origin,
      destination: routePoints.destination,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    const getBusStopInBox = async coordinates => {
      const API = `${PROXY}/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyCKD7oyCZr-KDECsd1TB1pIqBzu248rQAs&types=bus_station&input=bus&inputtype=textquery&fields=name,icon,type,geometry/viewport,place_id&locationbias=rectangle:${coordinates.southWest}|${coordinates.northEast}`;

      const res = await fetch(API, {
        mode: "cors"
      });
      const data = await res.json();
      data.candidates.map(candidate => {
        console.log(candidate.name);
      });
    };

    // Make the directions request
    window.directionService.route(request, function (result, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        window.directionsRenderer.setDirections(result);

        // Box around the overview path of the first route
        var path = result.routes[0].overview_path;
        var boxes = routeBoxer.box(path, distance);
        drawBoxes(boxes);
        const processedBoxes = boxes.map((box, i) => {
          setTimeout(
            () =>
            getBusStopInBox({
              southWest: `${box.oa.g},${box.ka.g}`,
              northEast: `${box.oa.h},${box.ka.h}`
            }),
            50 * i
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

  useEffect(init, [google]);
  useEffect(route, [routePoints]);

  // console.log("mapOptions", mapOptions);

  return <div id = "main-map"
  className = "map" > < /div>;
};

export default Map;