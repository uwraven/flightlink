import React from 'react';
import styles from './TabBar.module.scss';

const TabBar = ({ options, selected, onClick, children, className, ...props }) => {
    return (
        <div className={[ styles.container, className ].join(' ')}>
            {options.map((option, i) => {
                return (
                    <div
                        className={[ styles.tab, i === selected ? styles.tabSelected : '' ].join(' ')}
                        onClick={() => onClick(i)}>
                        {option}
                    </div>
                );
            })}
            {children}
        </div>
    );
};

export default TabBar;
