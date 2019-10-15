import React, { useEffect, useContext, useRef } from "react";

import { RouteContext } from "../context/route-context";
import { addBusStop } from "../actions/set-route-stops";
import BusStopModel from "../models/bus-stop";

const RouteMap = () => {
  const { route, dispatchRoute } = useContext(RouteContext);

  const mapEl = useRef(null);

  const { google, RouteBoxer } = window;
  const {
    DirectionsService,
    DirectionsRenderer,
    LatLng,
    LatLngBounds,
    Map,
    MapTypeId
  } = google.maps;
  const { PlacesService } = google.maps.places;

  const routeBoxer = useRef(new RouteBoxer());

  let distance = 1;
  let boxpolys = null;
  let map = null;

  const mapOptions = {
    center: new LatLng(6.5244, 3.3792),
    mapTypeId: MapTypeId.ROADMAP,
    zoom: 8
  };

  /**
   * Initializes the Google Maps Client and renders a map
   */
  const init = () => {
    map = new Map(mapEl.current, mapOptions);
    // routeBoxer.current = new RouteBoxer();

    window.directionsService = new DirectionsService();
    window.directionsRenderer = new DirectionsRenderer({
      map: map
    });
    window.placesService = new PlacesService(map);
  };

  const makeRoute = route => {
    // Clear any previous route boxes from the map
    clearBoxes();

    // Convert the distance to box around the route from miles to km
    distance = distance * 1.609344;

    var request = {
      origin: route.origin.name,
      destination: route.destination.name,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    const getBusStopInBox = async coordinates => {
      const request = {
        bounds: new LatLngBounds(
          new LatLng(coordinates.southWest.lat(), coordinates.southWest.lng()),
          new LatLng(coordinates.northEast.lat(), coordinates.northEast.lng())
        ),
        // types: "bus_station"],
        keyword: "bus"
      };

      window.placesService.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          results.forEach(result => {
            const busStop = BusStopModel.fromJSON(
              result,
              route.origin.coordinates
            );
            addBusStop(dispatchRoute, busStop);
          });
        }
      });
    };

    // Make the directions request
    window.directionsService.route(request, function(result, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        window.directionsRenderer.setDirections(result);

        // Box around the overview path of the first route
        var path = result.routes[0].overview_path;
        var boxes = routeBoxer.current.box(path, distance);

        drawBoxes(boxes);

        const origin = {
          lat: result.routes[0].legs[0].start_location.lat(),
          lon: result.routes[0].legs[0].start_location.lng()
        };

        boxes.forEach((box, i) => {
          const coordinates = {
            southWest: box.getSouthWest(),
            northEast: box.getNorthEast()
          };
          getBusStopInBox(coordinates, origin);
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

  useEffect(() => makeRoute(route), [route.origin, route.destination]);

  return <div ref={mapEl} id="main-map" className="map"></div>;
};

export default RouteMap;
