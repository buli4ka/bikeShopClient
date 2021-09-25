import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useHttp} from "../../hooks/useHttp";
import {server} from "../../config";
import styles from './BikeDetail.module.css'
import {Preloader} from "../../components/UI/Preloader/Preloader";
import {Gallery} from "../../components/Gallery/Gallery";
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart} from "../../store/reducers/cart/action";
import {itemsSelector} from "../../store/reducers/cart/cartReducer";
import {AuthContext} from "../../context/authContext";

export const BikeDetailPage = (props) => {
    const bikeId = useParams().id
    const [bike, setBike] = useState()
    const [images, setImages] = useState([])
    const [isCartButton, setIsCartButton] = useState(false)
    const [cartButtonText, setCartButtonText] = useState("Add to cart")
    const {loading, request} = useHttp()
    const [manufacturer, setManufacturer] = useState({})
    const dispatch = useDispatch();
    const items = useSelector(itemsSelector)
    const auth = useContext(AuthContext)


    useEffect(() => {
        const fetchBike = async () => {
            const fetched = await request(server.serverDomain + server.bike.getBike + bikeId
                , 'GET'
                , null)
            setBike(fetched)
            return fetched;
        }
        fetchBike().then(async b => {
            setManufacturer(await request(server.serverDomain + server.manufacturer.getManufacturerById + b.manufacturerId
                , 'GET'
                , null))
            setImages(await request(server.serverDomain + server.image.getImageIds + b.id
                , 'GET'
                , null))
        })

    }, [request, bikeId]);

    useEffect(() => {
        let check = items.find(i => i === bikeId)
        if(!!check) {
            setIsCartButton(!!check)
            setCartButtonText("Added to cart")
        }
    }, [items, bikeId])

    const addToCart = async () => {
        const data = await request(
            server.serverDomain + server.cart.addToCart
            ,'POST'
            ,{userId:auth.userId,bikeId}
        )
        console.log(data)
        dispatch(addItemToCart(bikeId));
        setCartButtonText("Added to cart")
        setIsCartButton(true)
    }

    if (loading) {
        return <Preloader/>
    }
    return (<div className={styles.container}>

        <h1 className={styles.name}>{manufacturer?.name + ' ' + bike?.name}</h1>
        <div className={styles.image}>
            {!loading &&
            <Gallery serverDomain={server.serverDomain} serverApi={server.image.getImage} images={images}/>}
        </div>
        <div className={styles.content}>
            <p>
                Description:
                <br/>
                {bike?.description}
            </p>
            <p>
                Price: {bike?.price}$
            </p>
            {auth.isAuthenticated && <button className={styles.cartButton} disabled={isCartButton}
                                             onClick={(e) => addToCart()}>{cartButtonText}</button>}
        </div>

    </div>)
}
