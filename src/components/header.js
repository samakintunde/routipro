import React from "react";

const Header = props => {
  const { title } = props;
  return (
    <header className="header grid-container fluid">
      <div className="grid-x align-middle">
        <div className="cell">
          <a href="/" className="">
            <h1 className="h3 text-uppercase font-bold">{title}</h1>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
