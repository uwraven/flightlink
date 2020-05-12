import React, { useState } from 'react';
import styles from './NumInput.module.scss';

const enterKeyCode = 13;

const NumInput = ({onSubmit, valid, disabled = false, int, width, ...props}) => {

    const [value, setValue] = useState(0);
    
    return (
        <input 
            type={"number"}
            value={value}
            disabled={disabled}
            onChange={(e) => {
                setValue(e.target.value);
            }}
            onKeyDown={(e) => {
                if (e.keyCode === enterKeyCode) {
                    e.target.blur();
                    onSubmit(Math.round(e.target.value));
                }
            }}
            onBlur={(e) => {
                if (int) setValue(Math.round(e.target.value));
            }}
            className={[
                styles.input,
                !valid && styles.invalid,
                disabled && styles.disabled
            ].join(" ")}
            style={{width: `${width || 64}px`}}
            {...props}
        />
    )
}

export default NumInput;