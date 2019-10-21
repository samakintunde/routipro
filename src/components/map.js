import React, { useRef, useState, useEffect } from "react";
import { STATIC_MAP } from "../services/api";
import BusStopModel from "../models/bus-stop";

const Map = props => {
  const { index, editing, stop, handleEdit } = props;
  const { coordinates } = stop;

  const [imageUrl, setImageUrl] = useState("");
  const { google } = window;

  let map = useRef(null);

  useEffect(() => {
    setImageUrl(
      encodeURI(
        `${STATIC_MAP}&center=${coordinates.lat},${coordinates.lng}&markers=color:purple|${coordinates.lat},${coordinates.lng}`
      )
    );
  }, []);

  const mapOptions = {
    center: new google.maps.LatLng(coordinates.lat, coordinates.lng),

    disableDefaultUI: true,
    gestureHandling: "cooperative",
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 15
  };

  function getPlaceDetails(position) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ latLng: position }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const data = {
          ...stop,
          id: results[0].place_id,
          name: results[0].address_components[0].short_name,
          coordinates: {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          }
        };
        const busStop = new BusStopModel(data);
        handleEdit({ index, stop: busStop });
      }
    });
  }

  /**
   * Initializes the Google Maps Client and renders a map
   */
  function initMap(mapOptions) {
    const mapEl = document.getElementById(`map-${index}`);
    if (!mapEl) return;
    map.current = new google.maps.Map(mapEl, mapOptions);
    const marker = new google.maps.Marker({
      position: coordinates,
      map: map.current,
      animation: google.maps.Animation.DROP,
      draggable: true
    });

    google.maps.event.addListener(marker, "dragend", () => {
      getPlaceDetails(marker.getPosition());
    });
  }

  if (editing) {
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
          src={imageUrl}
          alt=""
        />
      </div>
    );
  }
};

export default Map;
