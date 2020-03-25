import React from 'react';
import PropTypes from 'prop-types';
import styles from './Switch.module.scss';
import { style } from '../../utility';

const Switch = props => {
    return (
        <div className={styles.container}>
            { props.options.map((option, i) => {
            return (
                <div 
                    className={[(i === props.selected) ? styles.selected : '', styles.option].join(' ')}
                    onClick={() => props.onClick(i)} key={i}>
                    { option }
                </div>)
            })}
        </div>
    );
};

Switch.propTypes = {
    selected: PropTypes.number.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClick: PropTypes.func.isRequired
}

export default Switch;