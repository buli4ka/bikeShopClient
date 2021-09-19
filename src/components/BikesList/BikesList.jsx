import React from 'react';
import styles from './BikesList.module.css'
import {BikeCard} from "../BikeCard/BikeCard";


export const BikesList = ({bikes, title}) => {
    if (!bikes.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Bikes not found!
            </h1>)
    }


    return (
        <div >
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            <div className={styles.content}>
                {bikes.map(bike => {
                    return (<BikeCard key={bike.id} bike={bike}/>)

                })}

            </div>
        </div>

    );
}
