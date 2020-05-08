import React, { useState, useRef } from 'react';
import styles from './Table.module.scss';

const Table = ({rows, row, initialSelection = -1, ...props}) => {
    
    return(
        <div className={styles.tableContainer}>
            {
                rows.map((key, i) => row(key, i))
            }
        </div>
    )
}

const TableRow = ({selected, className, setSelected, children, onClick, ...props}) => {
    return(
        <div 
            className={[
                styles.tableRow,
                selected && styles.tableRowSelected,
                className
            ].join(" ")}
            onClick={onClick}
        >
            {children}
        </div>
    )
}


export {
    Table as default,
    TableRow,
}