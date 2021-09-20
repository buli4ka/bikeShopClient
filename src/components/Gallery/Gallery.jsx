import React from "react";
import styles from './Gallery.module.css'

export const Gallery = (props) => {

    return (
        <div className={styles.slider}>
            {
                props.images.map((i, index) => {
                return (
                    <a key={index} href={`#slide-${index + 1}`} />
                )
            })}
            <div className={styles.slides}>

                {props.images.map((i, index) => {
                    return (
                        <div key={i} id={`slide-${index + 1}`}>
                            <img className={styles.img} src={props.serverDomain + props.serverApi + i} alt="Bike"/>
                        </div>
                    )
                })}
            </div>
        </div>)

}




