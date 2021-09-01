import React from "react";
const ShopItemList = (props) => {

    const saveGame = JSON.parse(
        window.localStorage.getItem("quantityOfClicks")
      );
      const buyUpgrade = () => {
        const clicksStatsToSave = {...saveGame, autoClick: 1}
          localStorage.setItem(
            "quantityOfClicks",
            JSON.stringify(clicksStatsToSave)
          );
    }
    return (
        <div>
            <button onClick={buyUpgrade}>Add 1 to auto click</button>
        </div>
    )
}

export default ShopItemList;