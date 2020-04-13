import React, { useState, useEffect } from 'react';
import styles from './Collapsible.module.scss';
import { ReactComponent as ArrowIcon } from 'Assets/Icons/arrow-down.svg';

const Collapsible = ({ target, disabled, children, initialState, className = '', ...props }) => {
    const [ open, setOpen ] = useState(initialState);
    return (
        <div className={className}>
            {target(open, setOpen)}
            {open && children}
        </div>
    );
};

const CollapsibleSection = ({ title, onClick, disabled, initialState, children, ...props }) => {
    return (
        <Collapsible
            className={styles.sectionContainer}
            initialState={initialState}
            target={(open, setOpen) => (
                <div className={styles.sectionTarget} onClick={() => setOpen((prev) => !prev)}>
                    <span>{title}</span>
                    <ArrowIcon
                        className={styles.arrow}
                        style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                    />
                </div>
            )}>
            {children}
        </Collapsible>
    );
};

const CollapsibleSubsection = ({ title, onClick, disabled, children, ...props }) => {
    return (
        <Collapsible
            className={styles.subsectionContainer}
            target={(open, setOpen) => (
                <div className={styles.subsectionTarget} onClick={() => setOpen((prev) => !prev)}>
                    <ArrowIcon
                        className={styles.arrow}
                        style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                    />
                    <span>{title}</span>
                </div>
            )}>
            {children}
        </Collapsible>
    );
};

export { Collapsible as default, CollapsibleSection, CollapsibleSubsection };
