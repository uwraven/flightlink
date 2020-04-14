import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';
import { style } from '../../utility';

const Button = ({ className, children, onClick, disabled, loading, width, ...props }) => {
    return (
        <div
            onClick={() => {
                if (!disabled && onClick) onClick();
            }}
            className={[ styles.container, className ].join(' ')}
            style={{ width: width ? `${width}px` : 'inherit' }}>
            {children}
        </div>
    );
};

const PrimaryButton = ({ width, ...props }) => {
    return <Button width={width} className={styles.primary} {...props} />;
};

export { Button as default, PrimaryButton };
