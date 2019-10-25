import React, { useContext } from "react";
import { message } from "antd";

import { Header } from "./components";
import { RouteMap } from "./containers/";
import { RouteForm, ResultsSidebar, Results } from "./containers/index";
import { RouteContext } from "./context/route-context";

import "./assets/scss/app.scss";

const App = () => {
  const { route } = useContext(RouteContext);

  const success = () => {
    message.success(`Bus Stops successfully sent to SERVER_ENDPOINT`);
  };

  const error = () => {
    message.error("Something bad has happened!");
  };

  const sendBusStops = async endpoint => {
    const { origin, stops, destination } = route;

    const data = {
      origin,
      destination,
      stops: [origin, ...stops, destination]
    };

    const res = await fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data)
    });
    console.log("res", res);

    success();

    return res;
  };

  return (
    <div className="grid-container full app">
      <Header
        title="Routipro"
        showButton={route.stops.length ? true : false}
        sendBusStops={sendBusStops}
      />
      <main className="main grid-x main--home">
        <div className="cell small-12 map-container">
          <RouteMap />
        </div>
        {route.stops.length === 0 && (
          <div className="cell align-self-bottom medium-6 large-4 grid-container padding-bottom-1 form-container">
            <div className="grid-x align-center card">
              <div className="cell large-12">
                <RouteForm />
              </div>
            </div>
          </div>
        )}
        {route.stops.length !== 0 && <ResultsSidebar />}
      </main>
    </div>
  );
};

export default App;
