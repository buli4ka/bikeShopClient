import React from "react";
import styles from "./BikeCard.module.css"
import {useHistory} from "react-router-dom";

export const BikeCard = (props) => {

    const history = useHistory();
    console.log(require('../../config').server.serverDomain
        + require('../../config').server.image.getFirstBikeImage
        +
        +'/'+props.bike.id)

    return (
        <div onClick={()=>history.replace(
            `/detail/${props.bike.id}`)} className={styles.card}>
            <img src={require('../../config').server.serverDomain
            + require('../../config').server.image.getFirstBikeImage
            + props.bike.id} alt="Bike" style={{width: "100%"}}/>
            <div className={styles.container}>
                <h4><b>{props.bike.name}</b></h4>
                <p>{props.bike.description}</p>
            </div>
        </div>
    )
}
