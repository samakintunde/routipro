import React, { useRef, useState, useEffect } from "react";
import LazyLoad from "react-lazy-load";

import { STATIC_MAP } from "../services/api";
import BusStopModel from "../models/bus-stop";
import { ImageCache } from "../utils/fetch-image";

const Map = props => {
  // PROPS
  const { index, editing, stop, handleEdit } = props;
  const { coordinates } = stop;

  // STATE
  const [image, setImage] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  // REFS
  let map = useRef(null);

  const { google } = window;

  const imageUrl = `${STATIC_MAP}&center=${coordinates.lat},${coordinates.lng}&markers=color:purple|${coordinates.lat},${coordinates.lng}`;

  const renderImage = async (name, url) => {
    const cache = new ImageCache();

    // If Item exists in cache
    if (cache.getImage(name)) {
      const base64Image = cache.getImage(name);
      setImage(base64Image);
    } else {
      // If image not found
      const base64Image = await cache.addImage(name, url);
      setImage(base64Image);
    }
    setImageLoaded(true);
  };

  useEffect(() => {
    // renderImage(stop.name, imageUrl);
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

  const handleImageLoaded = () => renderImage(stop.name, imageUrl);

  // RENDER
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
      <div className={`cell bus-stop__map-container`}>
        <LazyLoad
          debounce={false}
          offsetVertical={300}
          onContentVisible={handleImageLoaded}
        >
          <img
            className={`bus-stop__map bus-stop__map--visible ${
              imageLoaded ? "bus-stop__map--loaded" : "bus-stop__map-loading"
            }`}
            src={image}
            alt={stop.name}
          />
        </LazyLoad>
      </div>
    );
  }
};

export default Map;
