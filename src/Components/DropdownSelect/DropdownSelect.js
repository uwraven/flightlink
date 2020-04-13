import React, { useState } from 'react';
import styles from './DropdownSelect.module.scss';
import PropTypes from 'prop-types';
import Dropdown from 'Components/Core/Dropdown/Dropdown';
import { ReactComponent as ArrowIcon } from 'Assets/Icons/arrow-down.svg';

const DropdownSelect = ({
    options = [],
    selected = -1,
    disabled = false,
    placeholder = 'Select',
    onSelect = () => {},
    label,
    ...props
}) => {
    return (
        <Dropdown className={styles.dropDownWrapper}>
            {(open, setOpen) => {
                return (
                    <div
                        className={[ styles.container, open ? styles.open : '' ].join(' ')}
                        onClick={() =>
                            setOpen((prevOpen) => {
                                if (!disabled) return !prevOpen;
                            })}>
                        <div className={styles.selected}>
                            {selected > -1 ? (
                                <span className={styles.selection}>{options[selected]}</span>
                            ) : (
                                <span className={styles.placeholder}>{placeholder}</span>
                            )}
                            <ArrowIcon />
                        </div>
                        {open && (
                            <div className={styles.dropdown}>
                                {label && <span>{label}</span>}
                                {options.map((option, i) => {
                                    return (
                                        <div
                                            className={styles.dropdownItem}
                                            key={i}
                                            onClick={() => {
                                                onSelect(i);
                                            }}>
                                            {option}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            }}
        </Dropdown>
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
