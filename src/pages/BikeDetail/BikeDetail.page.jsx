import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useHttp} from "../../hooks/useHttp";
import {server} from "../../config";
import styles from './BikeDetail.module.css'
import {Preloader} from "../../components/UI/Preloader/Preloader";
import {Gallery} from "../../components/Gallery/Gallery";
import {Button} from "../../components/UI/Button/Button";
import {useDispatch, useSelector} from "react-redux";


export const BikeDetailPage = (props) => {
    const bikeId = useParams().id
    const [bike, setBike] = useState()
    const [images, setImages] = useState([])
    // const [isCartButton, setIsCartButton] = useState(false)
    // const [cartButtonText,setCartButtonText ]=useState("Add to cart")
    const {loading, request} = useHttp()
    // const dispatch = useDispatch();
    console.log(bike)
    useEffect(() => {
        const fetchBike = async () => {
            const fetched = await request(server.serverDomain + server.car.getCar + bikeId
                , 'GET'
                , null)
            setBike(fetched)
            return fetched;
        }
        fetchBike().then(async b => {
                const fetchedImages = await request(server.serverDomain + server.image.getImageIds + b.id
                , 'GET'
                , null)
            setImages(fetchedImages)
        })

    }, [request, bikeId]);

    // useEffect(()=>{
    //     let check = items.find(i=> i === bikeId)
    //     setIsCartButton(!!check)
    // }, [items, bikeId])
    // const addToCart = (e, id) => {
    //     e.target.style.backgroundColor='green'
    //     dispatch(addItemToCart(id));
    //     setCartButtonText("Added to cart")
    //     setIsCartButton(true)
    // }
    if (loading) {
        return <Preloader/>
    }
    console.log(bike)
    return (<div className={styles.container}>

        <h1 className={styles.name}>{bike?.manufacturer + ' ' + bike?.name}</h1>
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
            {/*<Button className={styles.cartButton} disabled={isCartButton} onClick={(e) => addToCart(e, bike?.id)}>{cartButtonText}</Button>*/}
        </div>

    </div>)
}
