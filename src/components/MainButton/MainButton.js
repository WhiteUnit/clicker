import React, { useEffect, useState } from "react";
import "./MainButton.css";
import ShowStats from "./ShowStats";
import { achievements } from "../Achievements/AchievementsData";

const MainButton = (props) => {
  const [clicksCounterStats, setClicksCounterStats] = useState({
    clicksCounter: 0,
    levelsCounter: 0,
    autoClickCounter: 0,
    lastAchievement: "",
    unlockedAchievements: [],
  });
  const maxLevel = 50;
  let levelCapTab = [10];
  let inicialLevel = 1;
  for (let level = 1; level < maxLevel; level++) {
    inicialLevel *= 2;
    levelCapTab[level] = inicialLevel * 10;
  }

  console.log(props.afterShop);

  const clearSave = () => {
    if (window.confirm("Are you sure you want clear your progress?")) {
      setClicksCounterStats({
        ...clicksCounterStats,
        clicksCounter: 0,
        levelsCounter: 0,
        lastAchievement: "",
        unlockedAchievements: achievements.slice(1).map((achieveUnlocked) => { return achievements[0]})
      });
    }
  };

  // TODO after click lvlUP but counterClick is not moving
  // TODO function for IF statement
  const clickEvent = () => {
    setClicksCounterStats({
      ...clicksCounterStats,
      clicksCounter: clicksCounterStats.clicksCounter + 1,
    });
    if (
      clicksCounterStats.clicksCounter ===
      levelCapTab[clicksCounterStats.levelsCounter]
    ) {
      setClicksCounterStats({
        ...clicksCounterStats,
        levelsCounter: clicksCounterStats.levelsCounter + 1,
      });
    }
  };
console.log("Tutaj" + props.afterShop)
  useEffect(() => {
    const interval = setInterval(() => {
      setClicksCounterStats({
        ...clicksCounterStats,
        clicksCounter:
          clicksCounterStats.clicksCounter +
          props.afterShop,
      });
      if (
        clicksCounterStats.clicksCounter >=
        levelCapTab[clicksCounterStats.levelsCounter]
      ) {
        setClicksCounterStats({
          ...clicksCounterStats,
          levelsCounter: clicksCounterStats.levelsCounter + 1,
        });
      }
    }, 5000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    setClicksCounterStats({
      ...clicksCounterStats,
      unlockedAchievements: achievements.slice(1).map((achieveUnlocked) => {
        if (
          clicksCounterStats.clicksCounter === achieveUnlocked.numberOfClicks
        ) {
            alert("You have unlocked achievement: "+ achieveUnlocked.title);
          return achieveUnlocked;
        } else {
          return achievements[0];
        }
      }),
    });
    props.clicksCounterStats(clicksCounterStats);
  }, [clicksCounterStats.clicksCounter]);

  useEffect(() => {
    const saveGame = JSON.parse(
      window.localStorage.getItem("quantityOfClicks")
    );
    setClicksCounterStats({
      ...clicksCounterStats,
      clicksCounter: saveGame.clicks,
      levelsCounter: saveGame.levels,
    });
  }, [clicksCounterStats.clicks]);
console.log(clicksCounterStats.autoClickCounter);
  useEffect(() => {
    const clicksStatsToSave = {
      clicks: clicksCounterStats.clicksCounter,
      levels: clicksCounterStats.levelsCounter,
      unlockedAchievements: clicksCounterStats.unlockedAchievements
    };
    window.localStorage.setItem(
      "quantityOfClicks",
      JSON.stringify(clicksStatsToSave)
    );
  });

  return (
    <div>
      <button onClick={clickEvent}>Click Me</button>
      <ShowStats
        currentClicks={clicksCounterStats.clicksCounter}
        currentLevel={clicksCounterStats.levelsCounter}
        achievement={props.achievementData}
      />
      <button onClick={clearSave}>Clear Save</button>
      <p>{clicksCounterStats.lastAchievement}</p>
    </div>
  );
};

export default MainButton;
