import React, {useContext} from "react";
import styles from "./BikeCard.module.css"
import {useHistory} from "react-router-dom";
import {server} from "../../config";
import {AuthContext} from "../../context/authContext";
import {Button} from "../UI/Button/Button";
import {useHttp} from "../../hooks/useHttp";
import {useDispatch} from "react-redux";
import {deleteItemFromCart} from "../../store/reducers/cart/action";

export const BikeCard = (props) => {
    const auth = useContext(AuthContext)
    const history = useHistory();
    const {request} = useHttp()
    const dispatch = useDispatch();


    const deleteBike = async (id) => {
        window.location.reload(false)
        await request(server.serverDomain +
            server.bike.deleteBike + id, 'DELETE', null)
    }
    const removeBike = (id) => {
        dispatch(deleteItemFromCart(id))
    }

    return (
        <div className={styles.card}>
            <img
                onClick={() => history.replace(`/detail/${props.bike.id}`)}
                src={server.serverDomain + server.image.getFirstBikeImage + props.bike.id}
                alt="Bike"
                style={{width: "100%"}}/>

            <div className={styles.container}>
                <h4>
                    <b>
                        {props.bike.name}
                    </b>
                </h4>
                <p>
                    {props.bike.description}
                </p>
                {auth.userRole === 'admin'
                &&
                <Button
                    onClick={() => deleteBike(props.bike.id)}
                    style={{backgroundColor: "red"}}
                >
                    Delete
                </Button>}
                {props.fromCart === true
                &&
                <Button onClick={() =>removeBike(props.bike.id)}
                        style={{backgroundColor: "red"}}
                >
                    Delete
                </Button>}
            </div>
        </div>
    )
}
