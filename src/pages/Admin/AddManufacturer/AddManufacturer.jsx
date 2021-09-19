import React, {useState} from 'react'
import {Input} from "../../../components/UI/Input/Input";
import {Button} from "../../../components/UI/Button/Button";
import {useHttp} from "../../../hooks/useHttp";
import {useHistory} from "react-router-dom";




export const AddManufacturer=()=>{
    const [manufacturer, setManufacturer] = useState('');
    const {loading, request} = useHttp();
    const history = useHistory();

    const changeHandler = event => {
        setManufacturer(  event.target.value)
    }
    const addManufacturer = async ()=>{
        await request(require('../../../config').server.serverDomain
            +
            require('../../../config').server.manufacturer.addManufacturer
            , 'POST'
            , {name:manufacturer})
        history.replace(require('../../../config').client.adminUrl);
    }

    return(
        <div>
            <h1>Add Manufacturer page</h1>
            <form>
                <Input name="name" value={manufacturer} onChange={changeHandler} type="text" placeholder="Manufacturer"/>
                <Button disabled={loading} onClick={addManufacturer}>Add bike</Button>
            </form>

        </div>
    )
}
