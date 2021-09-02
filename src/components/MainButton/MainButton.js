import React, { useEffect, useState } from "react";
import "./MainButton.css";
import ShowStats from "./ShowStats";
import { achievements } from "../Achievements/AchievementsData";

const MainButton = (props) => {
  const [Stats, setStats] = useState({
    clicksCounter: 0,
    levelsCounter: 0,
    autoClickCounter: 0,
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
      setStats({
        ...Stats,
        clicksCounter: 0,
        levelsCounter: 0,
        autoClickCounter: 0,
        unlockedAchievements: achievements.slice(1).map((achieveUnlocked) => {
          return achievements[0];
        }),
      });
    }
  };

  // TODO after click lvlUP but counterClick is not moving

  const clickEvent = () => {
    setStats({
      ...Stats,
      clicksCounter: Stats.clicksCounter + 1,
    });
    levelUp(Stats.clicksCounter, Stats.levelsCounter);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        ...Stats,
        clicksCounter: Stats.clicksCounter + Stats.autoClickCounter,
      });

      levelUp(Stats.clicksCounter, Stats.levelsCounter);
    }, 1000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    setStats({
      ...Stats,
      unlockedAchievements: achievements.slice(1).map((achieveUnlocked) => {
        if (Stats.clicksCounter >= achieveUnlocked.numberOfClicks) {
          if (Stats.clicksCounter === achieveUnlocked.numberOfClicks) {
            alert("You have unlocked achievement: " + achieveUnlocked.title);
          }
          return achieveUnlocked;
        } else {
          return achievements[0];
        }
      }),
    });
    props.Stats(Stats);
  }, [Stats.clicksCounter]);

  useEffect(() => {
    const saveGame = JSON.parse(
      window.localStorage.getItem("quantityOfClicks")
    );
    setStats({
      ...Stats,
      clicksCounter: saveGame.clicks,
      levelsCounter: saveGame.levels,
      autoClickCounter: saveGame.autoClick,
    });
  }, [Stats.clicks]);
  useEffect(() => {
    const clicksStatsToSave = {
      clicks: Stats.clicksCounter,
      levels: Stats.levelsCounter,
      unlockedAchievements: Stats.unlockedAchievements,
      autoClick: Stats.autoClickCounter,
    };
    window.localStorage.setItem(
      "quantityOfClicks",
      JSON.stringify(clicksStatsToSave)
    );
  });

  const levelUp = (clicks, level) => {
    if (clicks === levelCapTab[level]) {
      setStats({
        ...Stats,
        levelsCounter: Stats.levelsCounter + 1,
      });
    }
  };

  return (
    <div>
      <h2 className="head">
        OK, it's time to go home, let's quickly shut it down!
      </h2>
      <h3>I just need to click one button...</h3>
      <div className="center metal radial" onClick={clickEvent}>
        <i class="fas fa-power-off fa-3x"></i>
      </div>
      <ShowStats
        currentClicks={Stats.clicksCounter}
        currentLevel={Stats.levelsCounter}
      />
      <div className="center metal radial small" onClick={clearSave}>
        <div className="save-words">Clear Save</div>
      </div>
    </div>
  );
};

export default MainButton;
