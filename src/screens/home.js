import React, { useContext } from "react";

import { RouteMap } from "../containers/";
import { RouteForm, Results } from "../containers/index";
import { RouteContext } from "../context/route-context";

const Home = () => {
  const { route } = useContext(RouteContext);

  return (
    <main className="main grid-x main--home">
      <div className="cell small-12 map-container">
        <RouteMap />
      </div>
      {!route.stops.length && (
        <div className="cell align-self-bottom medium-6 large-4 grid-container padding-bottom-1 form-container">
          <div className="grid-x align-center card">
            <div className="cell large-12">
              <RouteForm />
            </div>
          </div>
        </div>
      )}
      {route.stops.length > 1 && <Results route={route} />}
    </main>
  );
};

export default Home;
