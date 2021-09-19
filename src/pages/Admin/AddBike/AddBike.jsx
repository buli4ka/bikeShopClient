import React, {useEffect, useState} from 'react'
import {useHttp} from "../../../hooks/useHttp";
import {Input} from "../../../components/UI/Input/Input";
import {Textarea} from "../../../components/UI/Textarea/Textarea";
import {Select} from "../../../components/UI/Select/Select";
import {Preloader} from "../../../components/UI/Preloader/Preloader";
import {ServerError} from "../../ServerError/ServerError";
import {Button} from "../../../components/UI/Button/Button";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {server} from "../../../config";

export const AddBike = () => {
    const [manufacturers, setManufacturers] = useState([{name: '', id: ''}])
    const [images, setImages] = useState([])
    const {loading, request} = useHttp()
    const history = useHistory()
    const [bike, setBike] = useState({
        name: '',
        manufacturerId: '',
        price: 0,
        description: ''
    })

    useEffect(() => {
        const fetchManufacturers = async () => {
            const fetched = await request(server.serverDomain +
                server.manufacturer.getManufacturers
                , 'GET'
                , null)
            setManufacturers(fetched)
            return fetched
        }

        fetchManufacturers().then((i) => setBike({...bike, manufacturerId: i[0].id})).catch(() => {//todo
            return (<ServerError/>)
        })

    }, [request])
    if (loading) {
        return <Preloader/>
    }

    const addBike = async (e) => {

        e.preventDefault()
        try {
            const data = await request(server.serverDomain
                +
                server.bike.addBike
                , 'POST'
                , {...bike})
            let fd = new FormData()
            for (let i in images) {
                fd = new FormData()
                fd.append("File", images[i])
                await axios.post(server.serverDomain
                                    +server.image.addImages  +data.id
                    ,fd
                ).then(r=>console.log(r))

            }


            history.replace(require('../../../config').client.adminUrl)
        } catch
            (e) {
            console.log(e)
        }
    }

    const changeHandler = event => {
        setBike({...bike, [event.target.name]: event.target.value})
    }

    const filesChangeHandler = event => {
        setImages([...images, ...event.target.files])
    }


    return (
        <div>
            <h1>Add Bike page</h1>

            <form>
                <Input name="imageData" type="file" onChange={filesChangeHandler}
                       accept="image/jpeg,image/png,image/jpg" multiple/>

                <Input name="name" value={bike.name} onChange={changeHandler} type="text" placeholder="Name"/>
                <Input name="price" value={bike.price} onChange={changeHandler} type="number" placeholder="Price"/>
                <Select name="manufacturerId" arr={manufacturers} onChange={changeHandler} defaultValue=''/>
                <Textarea name="description" value={bike.description} onChange={changeHandler} type="text"
                          placeholder="Description"/>
                <Button disabled={loading} onClick={addBike}>Add bike</Button>
            </form>
        </div>
    )
}
