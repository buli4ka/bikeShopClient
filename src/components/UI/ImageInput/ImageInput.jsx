import React, {useState} from "react";
import styles from './ImageInput.module.css'

export const ImageInput = (props) => {

    const change=(e)=>{
        console.log(e.target.files[0])
    }

    return (
        <input type="file" onChange={change} />
    )

}
