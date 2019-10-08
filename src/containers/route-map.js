import React, { useEffect, useContext } from "react";
import axios from "axios";

import { RouteContext } from "../context/route-context";
import { addBusStop } from "../actions/set-route-stops";
import { PLACES_API } from "../services/api";
import BusStop from "../models/bus-stop";

const RouteMap = props => {
  const { route, dispatchRoute } = useContext(RouteContext);
  const { mapOptions } = props;

  const { google, RouteBoxer } = window;

  const routeBoxer = new RouteBoxer();

  let distance = 1;
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
    window.placeService = new google.maps.places.PlacesService(map);
    window.google.LatLngBounds = google.maps.LatLngBounds;
    window.google.LatLng = google.maps.LatLng;

    // let service = new google.maps.places.PlacesService(map);

    // console.log(
    //   "Coords",
    //   new google.maps.LatLngBounds(
    //     { lat: -33.8665433, lng: 151.1956316 },
    //     { lat: 6.4349966, lng: 3.4550429 }
    //   )
    // );

    // const busStopRequest = {
    //   // location: [
    //   //   // { lat: 6.4349966, lng: 3.4550429 },
    //   //   // { lat: 6.4679558, lng: 3.5615414 }
    //   //   new google.maps.LatLng(6.4679558, 3.5615414),
    //   //   new google.maps.LatLng(6.4679558, 3.5615414)
    //   // ],
    //   bounds: new google.maps.LatLngBounds(
    //     { lat: 6.4679558, lng: 3.5615414 },
    //     { lat: 6.4349966, lng: 3.4550429 }
    //   ),
    //   // bounds: [{ lat: -34, lng: 151 }, { lat: -32, lng: 160 }],
    //   // location: new google.maps.LatLngBounds(
    //   //   { lat: -33.8665433, lng: 151.1956316 },
    //   //   { lat: 6.4349966, lng: 3.4550429 }
    //   // ),
    //   // location: new google.maps.LatLng(6.4679558, 3.5615414),
    //   // radius: "50000",
    //   type: "bus_station",
    //   // strictBounds: true,
    //   keyword: "bus stop"
    // };

    // console.log("Nearby Search", window.placeService.nearbySearch);

    // window.placeService.nearbySearch(busStopRequest, function(results, status) {
    //   console.log("sdk results", results, status);
    //   if (status === google.maps.places.PlacesServiceStatus.OK) {
    //   }
    // });
  };

  const makeRoute = route => {
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
      // const API = `${PLACES_API}&input=bus&inputtype=textquery&fields=name,icon,type,geometry/location,place_id&locationbias=rectangle:${coordinates.southWest}|${coordinates.northEast}`;
      // const placeService = new google.maps.places.PlacesService(map);

      console.log(
        "coordinates",
        // new google.maps.LatLng(
        coordinates.southWest.lat,
        coordinates.southWest.lng,
        coordinates.northEast.lat,
        coordinates.northEast.lng
        // )
      );

      const busStopRequest = {
        bounds: new window.google.LatLngBounds(
          { lat: coordinates.southWest.lat, lng: coordinates.southWest.lng },
          { lat: coordinates.northEast.lat, lng: coordinates.northEast.lng }
        ),
        //   location: new google.maps.LatLng(-33.8665433, 151.1956316),
        // location: new google.maps.LatLng(-33.8665433, 151.1956316),
        // radius: "500",
        type: ["bus_station"]
      };

      console.log("Nearby Search", window.placeService.nearbySearch);

      window.placeService.nearbySearch(busStopRequest, function(
        results,
        status
      ) {
        console.log("sdk results", results);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        }
      });

      // try {
      //   const res = await axios.get(API);
      //   addBusStop(dispatchRoute, new BusStop(res.data.candidates[0], origin));
      // } catch (error) {
      //   throw new Error(error);
      // }
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
          const coordinates = {
            southWest: {
              lng: box.oa.g,
              lat: box.ka.g
            },
            northEast: {
              lng: box.oa.h,
              lat: box.ka.h
            }
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

  return <div id="main-map" className="map"></div>;
};

export default RouteMap;
