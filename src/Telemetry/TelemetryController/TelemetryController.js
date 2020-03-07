import React, { Component } from 'react';
import styles from './TelemetryController.module.scss';

class TelemetryController extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className={styles.container}>
                <button onClick={this.props.toggleRenderState}>Toggle Render</button>
            </div>
        );
    }
}

export default TelemetryController;