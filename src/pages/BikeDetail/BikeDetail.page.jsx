import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useHttp} from "../../hooks/useHttp";
import {server} from "../../config";
import styles from './BikeDetail.module.css'
import {Preloader} from "../../components/UI/Preloader/Preloader";
import {Gallery} from "../../components/Gallery/Gallery";

export const BikeDetailPage = (props) => {
    const bikeId = useParams().id
    const [bike, setBike] = useState()
    const [images, setImages] = useState([])
    const {loading, request} = useHttp()
    const [manufacturer, setManufacturer] = useState({})

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

    if (loading) {
        return <Preloader/>
    }
    return (<div className={styles.container}>

        {bike &&<h1 className={styles.name}>{manufacturer.name +' '+ bike.name}</h1>}
        <div className={styles.image} >
        {!loading && <Gallery serverDomain={server.serverDomain} serverApi={server.image.getImage} images={images}/>}
        </div>
        <div className={styles.content}>
            <p>
                {

                }
            </p>

        </div>

    </div>)
}
