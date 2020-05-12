import React from 'react';
import styles from './Input.module.scss';

const Input = ({title, hint, children, short = false, ...props}) => {
    return(
        <div className={styles.container}>
            <span className={styles.title}>{title}</span>
            <div 
                className={short ? styles.col : styles.row}>
                <span className={styles.hint}>{hint}</span>
                {children}
            </div>
        </div>
    )
};

export default Input;