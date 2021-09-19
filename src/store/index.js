import {createStore} from "redux";
import {bikeReducer, preloadedState} from "./bikeReducer"


export const store = createStore(bikeReducer, preloadedState);
