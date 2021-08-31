import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Shop from "./Sites/Shop"
import "./App.css";
import AchievementsList from "./components/Archivments/AchievementsList";
import MainButton from "./components/MainButton/MainButton";
import Navbar from "./components/Navbar/Navbar";


export default function App() {
  const [clicksStats, setClicksStats] = useState();
  const clickCounterHandler = (clickCounter) => {
    setClicksStats(clickCounter);
  };

  return (
    <div className="App">
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/">
          <MainButton clickCounter={clickCounterHandler} />
        </Route>
        <Route path="/achievements">
          <AchievementsList clickStats={clicksStats} />
        </Route>
        <Route path="/shop">
          <Shop/>
        </Route>
      </Switch>
    </Router>
    </div>
  );
}
