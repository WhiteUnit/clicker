import React, { useEffect, useState } from "react";
import "./MainButton.css";
import ShowStats from "./ShowStats";
import { achievements } from "../Achievements/AchievementsData";

const MainButton = (props) => {
  const [score, setScore] = useState({
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
      setScore({
        ...score,
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
    setScore({
      ...score,
      clicksCounter: score.clicksCounter + 1,
    });
    levelUp(score.clicksCounter, score.levelsCounter);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setScore({
        ...score,
        clicksCounter: score.clicksCounter + score.autoClickCounter,
      });

      levelUp(score.clicksCounter, score.levelsCounter);
    }, 1000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    setScore({
      ...score,
      unlockedAchievements: achievements.slice(1).map((achieveUnlocked) => {
        if (score.clicksCounter >= achieveUnlocked.numberOfClicks) {
          if (score.clicksCounter === achieveUnlocked.numberOfClicks) {
            alert("You have unlocked achievement: " + achieveUnlocked.title);
          }
          return achieveUnlocked;
        } else {
          return achievements[0];
        }
      }),
    });
    props.score(score);
  }, [score.clicksCounter]);

  useEffect(() => {
    const saveGame = JSON.parse(
      window.localStorage.getItem("quantityOfClicks")
    );
    setScore({
      ...score,
      clicksCounter: saveGame.clicks,
      levelsCounter: saveGame.levels,
      autoClickCounter: saveGame.autoClick,
    });
  }, [score.clicks]);
  useEffect(() => {
    const clicksStatsToSave = {
      clicks: score.clicksCounter,
      levels: score.levelsCounter,
      unlockedAchievements: score.unlockedAchievements,
      autoClick: score.autoClickCounter,
    };
    window.localStorage.setItem(
      "quantityOfClicks",
      JSON.stringify(clicksStatsToSave)
    );
  });

  const levelUp = (clicks, level) => {
    if (clicks === levelCapTab[level]) {
      setScore({
        ...score,
        levelsCounter: score.levelsCounter + 1,
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
        currentClicks={score.clicksCounter}
        currentLevel={score.levelsCounter}
      />
      <div className="center metal radial small" onClick={clearSave}>
        <div className="save-words">Clear Save</div>
      </div>
    </div>
  );
};

export default MainButton;
