import React, {useContext, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {itemsSelector} from "../../store/reducers/cart/cartReducer";
import {useHttp} from "../../hooks/useHttp";
import {Preloader} from "../../components/UI/Preloader/Preloader";
import {BikesList} from "../../components/BikesList/BikesList";
import {server} from "../../config";
import {AuthContext} from "../../context/authContext";

export const CartPage = () => {
    const items = useSelector(itemsSelector)
    const auth = useContext(AuthContext)
    const {loading, request, error} = useHttp()
    const [bikes, setBikes] = useState([])

    console.log(items)
    useEffect(() => {
        const fetchBikes = async () => {
            const fetched = await request(server.serverDomain +
                server.cart.getItems + auth.userId, 'GET', null)

            setBikes(fetched)

        }
        fetchBikes()

    }, [request, error, items])
    if (loading) {
        return <Preloader/>
    }
    return (<div>
        <BikesList fromCart={true} bikes={bikes} title="Bikes in cart"/>
    </div>)
}
