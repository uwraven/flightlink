import React, { useState } from 'react';
import styles from './TelemetryController/modules.scss';

const TelemetryController = ({ ...props }) => {
    return (
        <div className={styles}>
            <child />
        </div>
    );
};
