import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ApplicationFooter.module.scss';
import Button from '../../../Components/Button/Button';

class ApplicationFooter extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <p className={styles.socketStatus}>
                        {this.props.websocketConnected ? 'Socket OK' : 'Socket Disconnected'}
                    </p>
                    <p className={styles.socketStatus}>
                        {this.props.deviceConnected ? 'Device OK' : 'No Device Connected'}
                    </p>
                </div>
                <p>Flightlink pre-alpha V0.1</p>
            </div>
        );
    }
}

export default ApplicationFooter;
