import React, { useState } from 'react';
import styles from './DropdownSelect.module.scss';
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
        <Dropdown className={styles.container}>
            {(open, setOpen) => {
                return (
                    <div
                        className={styles.wrapper}
                        onClick={() =>
                            setOpen((prevOpen) => {
                                if (!disabled) return !prevOpen;
                            })}>
                        <div className={[ styles.selected, open && styles.selectedOpen ].join(' ')}>
                            {selected > -1 ? (
                                <span className={styles.selection}>{options[selected]}</span>
                            ) : (
                                <span className={styles.placeholder}>{placeholder}</span>
                            )}
                            <ArrowIcon />
                        </div>
                        {open &&
                        options.length > 0 && (
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

export default DropdownSelect;
