import React from 'react';
import styles from './Checkbox.module.scss';
import { ReactComponent as CheckIcon } from 'Assets/Icons/check.svg';

const Checkbox = ({ on, onClick, disabled, ...props }) => {
    return (
        <div
            onClick={() => {
                if (!disabled && onClick) onClick();
            }}
            className={[ styles.container, on && styles.on ].join(' ')}>
            <CheckIcon className={styles.check} />
        </div>
    );
};

export default Checkbox;
