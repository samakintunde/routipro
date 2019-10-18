import React from "react";
import { Button } from "antd";

const Header = props => {
  // PROPS
  const { title, showButton, sendData } = props;

  return (
    <header className="header grid-container fluid">
      <div className="grid-x align-middle align-justify width-100">
        <div className="">
          <a href="/" className="">
            <h1 className="h3 text-uppercase font-bold">{title}</h1>
          </a>
        </div>
        {showButton && (
          <div className="">
            <Button size="small" onClick={sendData}>
              Send To Endpoint
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
