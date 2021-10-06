import React from 'react'
import{NavLink}from 'react-router-dom'
import styles from './Admin.module.css'



export const AdminPage=()=>{

    return(
        <div>
            <h1>Admin page</h1>

            <NavLink className={styles.navLink} to={require('../../config').client.addBikeUrl}>Добавить Машину</NavLink>
            <NavLink className={styles.navLink} to={require('../../config').client.addManufacturerUrl}>Добавить Производителя</NavLink>

        </div>
    )
}
