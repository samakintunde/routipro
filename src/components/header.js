import React from "react";

const Header = props => {
  const { title } = props;
  return (
    <header className="header grid-container">
      <a href="/">
        <h1 className="h3 text-uppercase font-bold">{title}</h1>
      </a>
    </header>
  );
};

export default Header;
