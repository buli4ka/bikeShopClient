import React, { useEffect, useState} from 'react';
import {useHttp} from "../../hooks/useHttp";
import {BikesList} from "../../components/BikesList/BikesList";
import {Preloader} from "../../components/UI/Preloader/Preloader";

export const AllBikesPage = () => {
    const {loading, request, error} = useHttp()
    const [bikes, setBikes] = useState([])


    useEffect(() => {
        const fetchBikes = async () => {
            const fetched = await request(require('../../config').server.serverDomain +
                require('../../config').server.bike.getBikes, 'GET', null)

            setBikes(fetched)

        }
        fetchBikes()

    }, [request, error])
    if (loading) {
        return <Preloader/>
    }
    return (<div>
        <BikesList bikes={bikes} title="Bikes"/>
    </div>)
}
