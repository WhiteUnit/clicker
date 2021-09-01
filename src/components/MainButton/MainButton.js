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
  let initialLevel = 1;
  for (let level = 1; level < maxLevel; level++) {
    initialLevel *= 2;
    levelCapTab[level] = initialLevel * 10;
  }

  const clearSave = () => {
    if (window.confirm("Are you sure you want clear your progress?")) {
      setClicksCounterStats({
        ...clicksCounterStats,
        clicksCounter: 0,
        levelsCounter: 0,
        lastAchievement: "",
        autoClickCounter: 0,
        unlockedAchievements: achievements.slice(1).map((achieveUnlocked) => {
          return achievements[0];
        }),
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
    console.log(clicksCounterStats.clicksCounter + ' ' + levelCapTab[clicksCounterStats.levelsCounter]);

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

  useEffect(() => {
    const interval = setInterval(() => {

      setClicksCounterStats({
        ...clicksCounterStats,
        clicksCounter:
          clicksCounterStats.clicksCounter + 
          clicksCounterStats.autoClickCounter,
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
    }, 1000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    setClicksCounterStats({
      ...clicksCounterStats,
      unlockedAchievements: achievements.slice(1).map((achieveUnlocked) => {
        if (
          clicksCounterStats.clicksCounter >= achieveUnlocked.numberOfClicks
        ) {
          if (
            clicksCounterStats.clicksCounter === achieveUnlocked.numberOfClicks
          ) {
            alert("You have unlocked achievement: " + achieveUnlocked.title);
          }
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
      autoClickCounter: saveGame.autoClick
    });
  }, [clicksCounterStats.clicks]);
  useEffect(() => {
    const clicksStatsToSave = {
      clicks: clicksCounterStats.clicksCounter,
      levels: clicksCounterStats.levelsCounter,
      unlockedAchievements: clicksCounterStats.unlockedAchievements,
      autoClick: clicksCounterStats.autoClickCounter
    };
    window.localStorage.setItem(
      "quantityOfClicks",
      JSON.stringify(clicksStatsToSave)
    );
  });

  return (
    <div>
        <h2>OK, it's time to go let's quickly shut it down!</h2>
      <div className="metal radial" onClick={clickEvent}><i class="fas fa-power-off fa-3x"></i></div>
      <ShowStats
        currentClicks={clicksCounterStats.clicksCounter}
        currentLevel={clicksCounterStats.levelsCounter}
        achievement={clicksCounterStats.lastAchievement}
      />
      <button onClick={clearSave}>Clear Save</button>
    </div>
  );
};

export default MainButton;
