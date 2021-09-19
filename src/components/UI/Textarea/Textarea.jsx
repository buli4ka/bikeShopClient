import React from 'react';
import styles from './Textarea.module.css';


export const Textarea =(props) => {
    return (
        <textarea className={styles.myTextarea} {...props}/>
    );
};

