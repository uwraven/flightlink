import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({ className, children, onClick, disabled, loading, width, ...props }) => {
    return (
        <div
            onClick={() => {
                if (!disabled && onClick) onClick();
            }}
            className={[ styles.container, className, disabled && styles.disabled ].join(' ')}>
            {children}
        </div>
    );
};

const PrimaryButton = ({ width, children, loading, loadingMessage, ...props }) => {
    return (
        <Button width={width} className={styles.primary} {...props}>
            <p>{loading ? loadingMessage ? loadingMessage : 'loading...' : children}</p>
        </Button>
    );
};

const SecondaryButton = ({ width, children, loading, loadingMessage, ...props }) => {
    return (
        <Button width={width} className={styles.secondary} {...props}>
            <p>{loading ? loadingMessage ? loadingMessage : 'loading...' : children}</p>
        </Button>
    );
};

const DestructiveButton = ({ width, children, ...props }) => {
    return (
        <Button width={width} className={styles.destructive} {...props}>
            <p>{children}</p>
        </Button>
    );
};

const IconButton = ({ children, on, ...props }) => {
    return (
        <Button className={[ styles.iconButton, on && styles.iconButtonOn ].join(' ')} {...props}>
            {children}
        </Button>
    );
};

export { Button as default, PrimaryButton, SecondaryButton, DestructiveButton, IconButton };
