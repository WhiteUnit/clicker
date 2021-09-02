import React from "react";
import "./Achievement.css";

const Achievement = (props) => {
  return (
    <li className="place">
      <div className="metal linear">
        <h2 className="title-width">{props.title}</h2>
        <div className="points-width">
          <p>Points required: {props.clicks}</p>
        </div>
        <div className="led-width">
          <div className={props.ledStyle}></div>
        </div>
      </div>
    </li>
  );
};

export default Achievement;
