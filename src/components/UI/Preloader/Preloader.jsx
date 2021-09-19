import React from "react";
import styles from './Preloader.module.css'

export const Preloader = () => {
    return (
        <div className={styles.preloader}>
            <div className={styles.preloader__row}>
                <div className={styles.preloader__item}/>
                <div className={styles.preloader__item}/>
            </div>
        </div>
    )
}
