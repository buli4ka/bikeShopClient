import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import axios from "axios";
import {server} from "../config";

const initialState = {
    cars: [],
    status: 'idle',
    error: null,
    count: 0
}

export const fetchCars = createAsyncThunk('cars/fetchCars', async () => {
    try {
        const response = await axios.get(process.env.REACT_APP_SERVER_DOMAIN + `Car/getAll/`)
        console.log(response)
        return response.data
    } catch (e) {
        console.log(e)
    }

})

export const addCar = createAsyncThunk('cars/createCar', async ([car, images]) => {
        try {
            const response = await axios.post(
                process.env.REACT_APP_SERVER_DOMAIN + `Car/add/`
                , car)
            let fd = new FormData()
            for (let i in images) {
                fd = new FormData()
                fd.append("File", images[i])
                await axios.post(
                    process.env.REACT_APP_SERVER_DOMAIN + 'Image/add/' + response.data.id
                    , fd
                )
            }
            return response.data
        } catch (e) {
            console.log(e)
        }
    }
)

const carsSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {
        addCar(state, action) {

        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCars.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCars.fulfilled, (state, action) => {
                state.status = 'success'
                state.cars = state.cars.concat(action.payload)
            })
            .addCase(fetchCars.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addCar.fulfilled, (state, action) => {
                state.status = 'success'
                state.cars.push(action.payload)
            })
    }
})

export default carsSlice.reducer

export const selectAllCars = state => state.cars.cars
export const selectLast = state => state.cars.cars[state.cars.cars.length - 1]

export const selectStatus = state => state.cars.status
export const selectError = state => state.cars.error
