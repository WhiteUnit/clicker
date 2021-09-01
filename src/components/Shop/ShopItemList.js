import React, { useState } from "react";
const ShopItemList = (props) => {

    const [autoCounter, setAutoCounter] = useState(0);
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