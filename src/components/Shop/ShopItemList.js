import React, { useState } from "react";
const ShopItemList = (props) => {

    const [autoCounter, setAutoCounter] = useState();
    const buyUpgrade = () => {
        setAutoCounter(1);
        props.updateCounter(autoCounter);
        console.log(autoCounter);
    }
    return (
        <div>
            <button onClick={buyUpgrade}>Add 1 to auto click</button>
        </div>
    )
}

export default ShopItemList;