import { applyMiddleware, createStore } from "redux"
import cartReducer, {initState} from "./reducers/cart/cartReducer"
import { save, load } from "redux-localstorage-simple"



// const createStoreWithMiddleware
//     = applyMiddleware(
//     save({states: 'initState'}) // Saving done here
// )(createStore)
// export const store = createStoreWithMiddleware(
//     cartReducer,
//     load() // Loading done here
// )
export const store = createStore(cartReducer);
