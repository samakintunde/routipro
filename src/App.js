import React from "react";
import { RouteForm } from "./containers/index";

import { Header, Map } from "./components/index";

import "./assets/scss/app.scss";

const App = () => {
  // const { activePoints, dispatchActivePoints } = useContext(
  //   ActivePointsContext
  // );

  return (
    <div className="grid-container full app">
      <Header title="Routipro" />
      <main className="main">
        <div className="grid-container">
          <Map />
        </div>
        <div className="grid-container">
          <div className="grid-x">
            <div className="cell medium-6">
              <RouteForm></RouteForm>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
