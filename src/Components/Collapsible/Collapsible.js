import React, { useState, useEffect } from 'react';
import styles from './Collapsible.module.scss';
import { ReactComponent as ArrowIcon } from 'Assets/Icons/arrow-down.svg';

const Collapsible = ({ target, disabled, children, header, footer, initialState, className = '', ...props }) => {
    const [ open, setOpen ] = useState(initialState);
    return (
        <div className={className}>
            {target(open, setOpen)}
            {children && header(open, setOpen)}
            {open && children}
            {children && footer(open, setOpen)}
        </div>
    );
};

const CollapsibleSection = ({ title, onClick, disabled, initialState, ...props }) => {
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
            )}
            header={(open, setOpen) => {
                return open && <div className={styles.header} />;
            }}
            footer={(open, setOpen) => {
                return open && <div className={styles.footer} />;
            }}
            {...props}
        />
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
