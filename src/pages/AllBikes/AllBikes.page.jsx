import React, {useEffect, useState} from 'react';
import {BikesList} from "../../components/BikesList/BikesList";
import {Preloader} from "../../components/UI/Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {fetchCars, selectAllCars, selectError, selectStatus} from "../../store/carSlice";

export const AllBikesPage = () => {
    const cars = useSelector(selectAllCars)
    const error = useSelector(selectError)
    const status = useSelector(selectStatus)
    const dispatch = useDispatch()

    useEffect(() => {
        if (status === 'idle') {
            try {
                dispatch(fetchCars())
            } catch (e) {
                console.log(e)
            }
        }
    }, [dispatch, status])
    let content;
    if (status === 'loading') {
        return <Preloader/>
    } else if (status === 'success') {

        content = <BikesList cars={cars} title="Cars"/>

    } else if (status === 'failed') {
        content = <div>{error}</div>
    }

    return (
        <div>
            {content}
        </div>
    )
}
