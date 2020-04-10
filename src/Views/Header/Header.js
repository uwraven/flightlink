import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';
import IconButton from '../IconButton/IconButton';
import { ReactComponent as AntennaIcon } from '../../Assets/Icons/antenna.svg';
import { style } from '../../utility';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className={styles.header}>
                <IconButton 
                    onClick={this.props.toggleSerial} 
                    active={this.props.showSerial}>
						<AntennaIcon/>
						<p className={style([
                            { className: styles.serialStatus },
                            { 
                                disabled: !this.props.serialConnected,
                                className: styles.serialStatusConnected
                            }
                            ])}>
                                {(this.props.serialConnected) ? "Serial Connected" : "No Serial Connection"}
                        </p>
                </IconButton>
            </div>
        );
    }
}

Header.propTypes = {

};

export default Header;