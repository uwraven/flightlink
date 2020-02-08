import React, { Component } from 'react';
import styles from './TabBar.module.scss';
import PropTypes from 'prop-types';
import { style } from '../../utility';

class TabBar extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                { this.props.options.map((Icon, index) => { 
                    return(
                        <div 
                            className={style([{className: styles.item}, {className: styles.selected, disabled: (this.props.selected !== index)}])}
                            onClick={() => this.props.onClick(index)}
                            key={index}>
                                <Icon/>
                        </div>
                    )
                })}
            </div>
        );
    }
}

TabBar.propTypes = {
    selected: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
};

export default TabBar;