import React from "react";
import { Icon } from "antd";

const RoundButton = props => {
  const { icon, handleClick } = props;

  return (
    <button
      className="button button--primary button--round"
      onClick={handleClick}
    >
      <Icon type={icon} />
    </button>
  );
};

export default RoundButton;
