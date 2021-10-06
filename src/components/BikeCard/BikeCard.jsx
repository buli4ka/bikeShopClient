import React, {useContext} from "react";
import styles from "./BikeCard.module.css"
import {useHistory} from "react-router-dom";
import {server} from "../../config";
import {AuthContext} from "../../context/authContext";
import {Button} from "../UI/Button/Button";
import {useHttp} from "../../hooks/useHttp";

export const BikeCard = (props) => {
    const auth = useContext(AuthContext)
    const history = useHistory();
    const {request} = useHttp()

    const deleteBike = async (id) => {
        window.location.reload(false)
        await request(server.serverDomain +
            server.car.deleteCar + id, 'DELETE', null)
    }

    return (
        <div className={styles.card}>
            <img onClick={() => history.replace(
                `/detail/${props.car.id}`)} src={server.serverDomain
            + server.image.getPreview
            + props.car.id} alt="Car" style={{width: "100%"}}/>
            <div className={styles.container}>
                <h4><b>{props.car.name}</b></h4>
                <p>{props.car.description}</p>
                {auth.userRole === 'admin' &&
                <Button onClick={() =>
                    deleteBike(props.car.id)} style={{backgroundColor: "red"}}>Delete</Button>
                }
            </div>
        </div>
    )
}
