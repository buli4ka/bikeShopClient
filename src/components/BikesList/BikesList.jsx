import React from 'react';
import styles from './BikesList.module.css'
import {BikeCard} from "../BikeCard/BikeCard";


export const BikesList = ({cars, title}) => {
    if (!cars.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Cars not found!
            </h1>)
    }


    return (
        <div >
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            <div className={styles.content}>
                {cars.map(car => {
                    return (<BikeCard key={car.id} car={car}/>)

                })}

            </div>
        </div>

    );
}
