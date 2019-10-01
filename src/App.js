import React, { useState } from "react";
import Input from "./components/input";
// import RouteBoxer from "./vendor/route-boxer";

const App = () => {
  const [form, setForm] = useState({
    start: "",
    end: ""
  });

  const suggestions = [
    "First suggestion",
    "second suggestion",
    "third suggestion"
  ];

  // const rboxer = new RouteBoxer();
  // const distance = 5;

  const getRoute = e => {
    e.preventDefault();
    console.log(form);
    console.log(process.env.REACT_APP_MAPS_API_KEY);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="app">
      <form className="form" action="#" onSubmit={getRoute}>
        <div className="form-group">
          <label htmlFor="start-point">Start</label>
          <Input
            id="start-point"
            type="text"
            name="start"
            handleChange={handleInputChange}
            suggestions={[]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="end-point">End</label>
          <Input
            id="end-point"
            type="text"
            name="end"
            handleChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <button className="button" type="submit">
            Get Route Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
