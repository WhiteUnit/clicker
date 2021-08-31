import React, { useState } from "react";

import Achievement from "./Achievement";
import {achievements} from "./AchievementsData"

const AchievementsList = (props) => {

  const [quantityClicks, setQuantityClicks] = useState(JSON.parse(localStorage.getItem('quantityOfClicks')));
  const achievementsUnlocked = achievements.slice(1).map((achieveUnlocked) => {
      if (quantityClicks.clicks >= achieveUnlocked.numberOfClicks) {
          return achieveUnlocked;
        } else {
            return achievements[0];
        }
    });
    console.log(localStorage.getItem("quantityOfClicks"));
    console.log(props.clickStats);
    
  return (
    <ul>
      {props.clickStats.unlockedAchievements.map((achievement) => (
        <Achievement
          clicks={achievement.numberOfClicks}
          title={achievement.title}
        />
      ))}
    </ul>
  );
};
export default AchievementsList;
