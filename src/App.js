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
      <main className="main grid-x">
        <div className="cell large-6 grid-container">
          <Map />
        </div>
        <div className="cell large-6 grid-container">
          <div className="grid-x align-center">
            <div className="cell medium-10 large-6">
              <RouteForm></RouteForm>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
