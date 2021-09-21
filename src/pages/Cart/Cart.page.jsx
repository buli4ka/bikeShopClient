import React from 'react'
import {useSelector} from "react-redux";
import {itemsSelector} from "../../store/reducers/cart/cartReducer";

export const CartPage=()=>{
    const items = useSelector(itemsSelector)
    console.log(items)
    return(
        <div>
            <h1>Cart page</h1>

        </div>
    )
}
