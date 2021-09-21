export const ACTION_TYPES={
    ADD_ITEM:"ADD_ITEM",
    DELETE_ITEM:"DELETE_ITEM",
}

export const addItemToCart = item =>({
    type:ACTION_TYPES.ADD_ITEM,
    payload:item
})
export const deleteItemFromCart = item =>({
    type:ACTION_TYPES.DELETE_ITEM,
    payload:item
})
