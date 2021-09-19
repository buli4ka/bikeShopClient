import React from "react";
import styles from './Select.module.css'

export const Select = (props) => {

    if (props.arr) {
        return (
            <select className={styles.mySelect} {...props} >
                {props.arr.map(m => {
                    return (
                        <option name={props.name} key={m.id} value={m.id} className={styles.myOption}>{m.name}</option>)
                })}
            </select>

        )
    }
}
