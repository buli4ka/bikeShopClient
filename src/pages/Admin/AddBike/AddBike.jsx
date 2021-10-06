import React, {useEffect, useState} from 'react'
import {useHttp} from "../../../hooks/useHttp";
import {Input} from "../../../components/UI/Input/Input";
import {Textarea} from "../../../components/UI/Textarea/Textarea";
import {Select} from "../../../components/UI/Select/Select";
import {Preloader} from "../../../components/UI/Preloader/Preloader";
import {Button} from "../../../components/UI/Button/Button";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {server} from "../../../config";
import {useDispatch, useSelector} from "react-redux";
import {fetchEntities, selectAll, selectState} from "../../../store/independentEntitySlice";
import {addCar, fetchCars, selectAllCars, selectLast, selectStatus} from "../../../store/carSlice";

export const AddBike = (props) => {
    const [images, setImages] = useState([])
    const history = useHistory()
    const [addRequestStatus, setAddRequestStatus] = useState('idle')
    const manufacturers = useSelector(selectState)
    const dispatch = useDispatch()
    const [car, setCar] = useState({
        name: '',
        manufacturerId: '',
        price: 0,
        description: ''
    })

    useEffect(() => {
        try {
            if (manufacturers.status === 'idle')
                dispatch(fetchEntities(['Manufacturer']))
            if (manufacturers.status === 'success')
                setCar({...car, manufacturerId: manufacturers.entities[0]?.id})

        } catch (e) {
            console.log(e)
        }

    }, [dispatch, manufacturers])


    const add = async (e) => {
        e.preventDefault()
        try {
            dispatch(addCar([{
                "price": 22220,
                "description": "Cool car",
                "name": "Supra",
                "manufacturer": {
                    "id": "3D51D996-C5FF-4F59-A1D5-08D988FAF893"
                },
                "engine": {
                    "id": "8098C91C-156D-404F-1D07-08D988FAF89A"

                },
                "transmission": {
                    "id": "ADB30981-1E25-4BB9-F5E0-08D988FAF89C"
                },
                "wheelDrive": {
                    "id": "CF8FD3FD-B748-4CEA-0724-08D988FAF89E"

                },
                "comfort": [
                    {
                        "id": "ED0708F2-4031-4B17-E082-08D988FAF8A0"

                    },
                    {
                        "id": "431128B9-6FB5-4156-E084-08D988FAF8A0"

                    }
                ],
                "securities": [
                    {
                        "id": "9EBC93D6-3AD0-4785-14C1-08D988FAF89F"

                    },
                    {
                        "id": "D210D82F-B1CE-4873-14C3-08D988FAF89F"

                    }
                ]


            }, images]))
            history.replace(require('../../../config').client.adminUrl)

        } catch
            (e) {
            console.log(e)
        }
    }


    const changeHandler = event => {
        setCar({...car, [event.target.name]: event.target.value})
    }

    const filesChangeHandler = event => {
        setImages([...images, ...event.target.files])
    }

    let content;
    if (manufacturers.status === 'loading')
        return <Preloader/>
    else if (manufacturers.status === 'success') {
        content = <Select name="manufacturerId" arr={manufacturers?.entities} onChange={changeHandler}
                          defaultValue=''/>
    } else if (manufacturers.status === 'failed') {
        content = <div>{manufacturers.error}</div>
    }
    return (
        <div>
            <h1>Add Car page</h1>

            <form>
                <Input name="imageData" type="file" onChange={filesChangeHandler}
                       accept="image/jpeg,image/png,image/jpg" multiple/>

                <Input name="name" value={car.name} onChange={changeHandler} type="text" placeholder="Name"/>
                <Input name="price" value={car.price} onChange={changeHandler} type="number" placeholder="Price"/>
                {content}
                <Textarea name="description" value={car.description} onChange={changeHandler} type="text"
                          placeholder="Description"/>
                <Button onClick={add}>Add bike</Button>
            </form>
        </div>
    )
}
