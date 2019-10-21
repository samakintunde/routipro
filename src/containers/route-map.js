import React, { useEffect, useContext, useRef } from "react";

import { RouteContext } from "../context/route-context";
import { addBusStops } from "../actions/set-route-stops";
import BusStopModel from "../models/bus-stop";
import { mapsPromisify } from "../utils/promisify";
import { setLoading } from "../actions/set-loading";

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
    routeBoxer.current = new RouteBoxer();

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

    const getBusStopInBox = async (coordinates, i) => {
      const request = {
        bounds: new LatLngBounds(
          new LatLng(coordinates.southWest.lat(), coordinates.southWest.lng()),
          new LatLng(coordinates.northEast.lat(), coordinates.northEast.lng())
        ),
        // types: ["bus_station"]
        keyword: "bus"
      };

      // Promisified Nearby Search
      function asyncNearbySearch(request) {
        return new Promise(function(resolve, reject) {
          // Set Timeout to prevent Google QUERY_LIMIT
          setTimeout(() => {
            window.placesService.nearbySearch(request, function(
              results,
              status
            ) {
              if (
                status === google.maps.places.PlacesServiceStatus.OK ||
                status === "ZERO_RESULTS"
              ) {
                resolve(results);
              } else {
                reject(new Error(status));
              }
            });
          }, 500 * i);
        });
      }

      return await asyncNearbySearch(request);
    };

    // Make the directions request
    window.directionsService.route(request, async function(result, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        window.directionsRenderer.setDirections(result);

        // Box around the overview path of the first route
        var path = result.routes[0].overview_path;
        var boxes = routeBoxer.current.box(path, distance);

        drawBoxes(boxes);

        const origin = {
          lat: result.routes[0].legs[0].start_location.lat(),
          lng: result.routes[0].legs[0].start_location.lng()
        };

        const busStops = boxes.map(async (box, i) => {
          const coordinates = {
            southWest: box.getSouthWest(),
            northEast: box.getNorthEast()
          };

          return await getBusStopInBox(coordinates, i);
        });

        // Obtain all Bus Stops
        const res = await Promise.all(busStops);
        // Flatten Array
        const bloatedStops = res.flat();
        // Refine bus stops using model
        const stops = bloatedStops.map(stop =>
          BusStopModel.fromJSON(stop, origin)
        );
        addBusStops(dispatchRoute, stops);

        setLoading(dispatchRoute, false);
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

  useEffect(() => makeRoute(route), [route.origin.name]);

  return <div ref={mapEl} id="main-map" className="map"></div>;
};

export default RouteMap;
