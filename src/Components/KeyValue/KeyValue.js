import React from 'react';
import PropTypes from 'prop-types';
import styles from './KeyValue.module.scss';

const KeyValue = (props) => {
    return(
        <div className={styles.container}> {
            Object.keys(props.values).map((key) => {
                return(
                    <div className={styles.row}>
                        <p className={styles.label}>{key}</p>
                        <p className={styles.value}>{props.values[key]}</p>
                    </div>
                )
            })
        } </div>
    )
}

export default KeyValue;