import React, { useState } from 'react';
import styles from './DropdownSelect.module.scss';
import PropTypes from 'prop-types';
import { style, allStyles } from '../../utility';
import Dropdown from '../Dropdown/Dropdown';

const DropdownSelect = ({ options, selected = -1, disabled, placeholder, callback }) => {
    return (
        <Dropdown
            className={styles.dropDownWrapper}
            currentRender={(open, setOpen) => {
                return (
                    <div
                        className={[ styles.selectedWrapper, disabled ? styles.disabled : '' ].join(' ')}
                        onClick={() =>
                            setOpen((prevOpen) => {
                                if (!disabled) return !prevOpen;
                            })}>
                        {selected > -1 ? (
                            <span className={styles.selection}>{options[selected]}</span>
                        ) : (
                            <span className={styles.placeholder}>{placeholder}</span>
                        )}
                    </div>
                );
            }}
            dropdownRender={(open, setOpen) => {
                return (
                    <div className={[ styles.dropdownContainer, !open ? styles.dropdownHidden : '' ].join(' ')}>
                        {options.map((option, i) => {
                            return (
                                <div
                                    className={styles.dropdownItem}
                                    key={i}
                                    onClick={() => {
                                        setOpen(false);
                                        callback(i);
                                    }}>
                                    {option}
                                </div>
                            );
                        })}
                    </div>
                );
            }}
        />
    );
};

DropdownSelect.propTypes = {
    selected: PropTypes.number.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
    callback: PropTypes.func.isRequired,
    innerLabel: PropTypes.string,
    style: PropTypes.string,
    placeholder: PropTypes.string.isRequired
};

export default DropdownSelect;
