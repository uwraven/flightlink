import React from 'react';
import styles from './InputRow.module.scss';

const InputRow = ({ children, className = '', ...props }) => {
    return <div className={[ styles.container, className ].join(' ')}>{children}</div>;
};

export default InputRow;
