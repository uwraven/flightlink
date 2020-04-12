import React from 'react';
import styles from './Collapsible.module.scss';

const Collapsible = ({ head, open, onClick, disabled, ...props }) => {
    return (
        <div className={styles.container}>
            <div className={styles.target} onClick={onClick}>
                {head}
            </div>
        </div>
    );
};
