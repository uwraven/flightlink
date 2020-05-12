import React from 'react';
import PropTypes from 'prop-types';
import styles from './Toggle.module.scss';
import {style} from './../../utility';

const Toggle = props => {
    const container = style([{className: styles.container}, {
        className: styles.containerOn,
        disabled: !props.on
    }])
    const button = style([{className: styles.button}, {
        className: styles.buttonOn,
        disabled: !props.on
    }]);
    return (
        <div className={container} onClick={props.onClick}>
            <div className={button}>
                {/* <div className={styles.relish}></div> */}
            </div>
        </div>
    );
};

Toggle.propTypes = {
    onClick: PropTypes.func.isRequired,
    on: PropTypes.bool.isRequired
}

export default Toggle;