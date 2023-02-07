import React from "react";
import "../App.css";

const ColorCard = ({color, onCLick, flash}) => {
  return (
    <div
      onClick={onCLick}
      className={`colorCard ${color} ${flash ? "flash" : " "}`}
    ></div>
  );
};

export default ColorCard;
