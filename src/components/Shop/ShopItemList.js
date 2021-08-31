import React from "react";
const ShopItemList = (props) => {

    console.log(props.clicksStats);


    return (
        <div>
            <button>Add 1 to auto click {props.clicksStats.clicksCounter}</button>
        </div>
    )
}

export default ShopItemList;