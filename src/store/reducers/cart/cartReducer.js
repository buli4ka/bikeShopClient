import {client} from '../../../config'
import {ACTION_TYPES} from './action'

export const initState = {
    itemIds: []
}


const loadState = () => {
    try {
        const serializedState = localStorage.getItem(client.cartStorageName);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(client.cartStorageName, serializedState);
    } catch (e) {
        // Ignore write errors;
    }
};

export default function cartReducer(state = initState, action) {
    switch (action.type) {
        case ACTION_TYPES.ADD_ITEM:
            const itemId = action.payload
            const itemIds = [...state.itemIds, itemId]
            localStorage.setItem(client.cartStorageName, JSON.stringify(itemIds))
            return {...state, itemIds}
        case ACTION_TYPES.DELETE_ITEM:
            const cart = state.itemIds.filter((itemId) => itemId !== action.payload)
            localStorage.setItem(client.cartStorageName, JSON.stringify(cart))
            console.log(cart)
            return {
                ...state,
                itemIds: cart
            }

        default:
            return state
    }


}

export const itemsSelector = state => loadState() ? state.itemIds = loadState() : state.itemIds
