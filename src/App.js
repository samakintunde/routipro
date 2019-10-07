import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Header } from "./components";
import { Home } from "./screens";

import "./assets/scss/app.scss";

const App = () => {
  return (
    <Router>
      <div className="grid-container full app">
        <Header title="Routipro" />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
