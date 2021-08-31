import React, { useEffect, useState } from "react";
import "./MainButton.css";
import ShowStats from "./ShowStats";

const MainButton = (props) => {
  const [clicksCounterStats, setClicksCounterStats] = useState({
    clicksCounter: 0,
    levelsCounter: 0,
  });
  const maxLevel = 50;
  let levelCapTab = [10];
  let inicialLevel = 1;
  for (let level = 1; level < maxLevel; level++) {
    inicialLevel *= 2;
    levelCapTab[level] = inicialLevel * 10;
  }
  const clearSave = () => {
    if (window.confirm('Are you sure you want clear your progress?')) {
        setClicksCounterStats({
            ...clicksCounterStats,
            clicksCounter: 0,
            levelsCounter: 0
        });
      }
  }

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

  useEffect(() => {
    const interval = setInterval(() => {
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
    }, 1000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    props.clickCounter(clicksCounterStats.clicksCounter);
  }, [clicksCounterStats.clicksCounter]);

  useEffect(() => {
    const saveGame = JSON.parse(window.localStorage.getItem("quantityOfClicks"));
    setClicksCounterStats({
      ...clicksCounterStats,
      clicksCounter: saveGame.clicks,
      levelsCounter: saveGame.levels
  });
}, [clicksCounterStats.clicks]);

  useEffect(() => {
    const clicksStatsToSave = {
      clicks: clicksCounterStats.clicksCounter,
      levels: clicksCounterStats.levelsCounter,
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
    </div>
  );
};

export default MainButton;
