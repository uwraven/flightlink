import React from 'react';
import PropTypes from 'prop-types';
import { style } from '../../utility';
import styles from './IconButton.module.scss';

const IconButton = props => {
    return (
        <div className={style([
            {className: styles.wrapper},
            {
                className: styles.active,
                disabled: !props.active
            },
            {
                className: styles.disabled,
                disabled: !props.disabled
            }
        ])} onClick={props.onClick}>
            { props.children }
        </div>
    );
};

IconButton.propTypes = {
    
};

export default IconButton;