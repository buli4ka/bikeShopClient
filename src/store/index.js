import {configureStore} from "@reduxjs/toolkit";
import carsReducers from './carSlice'
import entitiesReduces from "./independentEntitySlice";

export const store = configureStore({
    reducer: {
        cars: carsReducers,
        entities: entitiesReduces,
    }
});
