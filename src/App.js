import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import AchievementsList from "./components/Achievements/AchievementsList";
import MainButton from "./components/MainButton/MainButton";
import Navbar from "./components/Navbar/Navbar";
import ShopItemList from "./components/Shop/ShopItemList";

export default function App() {
  const [clicksStats, setClicksStats] = useState();
  const clicksStatsHandler = (clickCounter) => {
    setClicksStats(clickCounter);
  };
  return (
    <div className="App">
      <Router>
        <Navbar id="nav" />
        <Switch>
          <Route exact path="/">
            <MainButton score={clicksStatsHandler} />
          </Route>
          <Route path="/achievements">
            <AchievementsList />
          </Route>
          <Route path="/shop">
            <ShopItemList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
