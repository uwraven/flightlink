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
        // <div
        //     className={style([
        //         { className: styles.dropdownWrapper },
        //         { className: this.props.style ? this.props.style : '' }
        //     ])}
        //     ref={(ref) => (this.targetNode = ref)}>
        //     <div
        //         className={style([
        //             { className: styles.selectedWrapper },
        //             { className: styles.disabled, disabled: !this.props.disabled }
        //         ])}
        //         onClick={this.toggle}>
        //         {this.props.options.length > 0 && this.props.selected >= 0 ? (
        //             this.props.options[this.props.selected]
        //         ) : (
        //             <span className={styles.selectedPlaceholderText}>{this.props.placeholder}</span>
        //         )}
        //     </div>
        //     <div
        //         className={style([
        //             { className: styles.dropdownContainer },
        //             { className: styles.dropdownHidden, disabled: this.state.open }
        //         ])}>
        //         <div className={styles.dropdownLabel}>{this.props.innerLabel}</div>
        //         {this.props.options.map((content, i) => (
        //             <div
        //                 className={styles.dropdownItem}
        //                 key={i}
        //                 onClick={() => {
        //                     this.setState({ open: false });
        //                     this.props.callback(i);
        //                 }}>
        //                 {content}
        //             </div>
        //         ))}
        //     </div>
        // </div>
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
