import React from "react";

const Achievement = (props) => {
  return (
    <li>
      <h2>{props.title}</h2>
      <p>Points required: {props.clicks}</p>
    </li>
  );
};

export default Achievement;
