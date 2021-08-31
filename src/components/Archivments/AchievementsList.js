import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import Achievement from "./Achievement";

const AchievementsList = (props) => {
  const achievements = [
    {
      key: 0,
      title: "Zablokowane",
      numberOfClicks: "???",
      clicksPerSecond: 0,
    },
    {
      key: 1,
      title: "Za 100 dostaniesz",
      numberOfClicks: 20,
      clicksPerSecond: 0,
    },
    {
      key: 2,
      title: "Za 200 dostaniesz",
      numberOfClicks: 30,
      clicksPerSecond: 0,
    },
  ];
  const achievementsUnlocked = achievements.slice(1).map((achieveUnlocked) => {
    if (props.clickStats >= achieveUnlocked.numberOfClicks) {
        return achieveUnlocked;
    } else {
        return achievements[0];
    }
});

  return (
    <ul>
      {achievementsUnlocked.map((achievement) => (
        <Achievement
          clicks={achievement.numberOfClicks}
          title={achievement.title}
        />
      ))}
    </ul>
  );
};
export default AchievementsList;
