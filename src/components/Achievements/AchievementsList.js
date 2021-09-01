import React from "react";
import Achievement from "./Achievement";

const AchievementsList = (props) => {
  let saveAchievements = JSON.parse(localStorage.getItem("quantityOfClicks"));
  console.log(props.clickStats);
  console.log(saveAchievements.unlockedAchievements);
  return (
    <ul>
      {saveAchievements.unlockedAchievements.map((achievement) => (
        <Achievement
          clicks={achievement.numberOfClicks}
          title={achievement.title}
        />
      ))}
    </ul>
  );
};
export default AchievementsList;
