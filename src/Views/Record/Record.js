import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Record.module.scss';
import Telemetry from './Telemetry/Telemetry';
import MainController from './MainController/MainController';
import SerialManager from './SerialManager/SerialManager';

const Record = ({ ...props }) => {
    return (
        <div className={styles.container}>
            {/* <SerialManager /> */}
            <Telemetry />
        </div>
    );
};

export default Record;
