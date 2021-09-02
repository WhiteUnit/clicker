import React from "react";
import "./ShowStats.css";

const ShowStats = (props) => {
  return (
    <div>
      <p className="data-show">{"Already clicked: " + props.currentClicks}</p>
      <p className="data-show">{"Level o frustration: " + props.currentLevel}</p>
    </div>
  );
};

export default ShowStats;
