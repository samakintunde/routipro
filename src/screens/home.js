import React, { useContext } from "react";
// import { Drawer } from "antd";

import { RouteMap } from "../containers/";
import { RouteForm, Results } from "../containers/index";
import { RouteContext } from "../context/route-context";

const Home = () => {
  const { route } = useContext(RouteContext);

  const { google } = window;

  const mapOptions = {
    center: new google.maps.LatLng(6.5244, 3.3792),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 8
  };

  return (
    <main className="main grid-x main--home">
      <div className="cell small-12 map-container">
        <RouteMap mapOptions={mapOptions} />
      </div>
      {!route.stops.length && (
        <div className="cell align-self-bottom large-6 grid-container padding-bottom-1 form-container">
          <div className="grid-x align-center card">
            <div className="cell large-12">
              <RouteForm />
            </div>
          </div>
        </div>
      )}
      {/* {route.stops.length &&  */}
      <Results route={route} />
      // }
    </main>
  );
};

export default Home;
