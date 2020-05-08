import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Record.module.scss';
import Telemetry from './Telemetry/Telemetry';
import MainController from './MainController/MainController';
import SerialManager from './SerialManager/SerialManager';
import TelemetryController from 'Views/App/TelemetryController/TelemetryController';

const Record = ({ ...props }) => {
    return (
        <div className={styles.main}>
            <TelemetryController />
            {/* <Telemetry /> */}
        </div>
    );
};

export default Record;
