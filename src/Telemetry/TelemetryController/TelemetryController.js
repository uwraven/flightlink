import React, { Component } from 'react';
import styles from './TelemetryController.module.scss';
import Toggle from '../../Components/Toggle/Toggle';

class TelemetryController extends Component {

    constructor(props) {
        super(props);
        this.state = {
            on: false
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({on: !this.state.on})
    }

    render() {
        return (
            <div className={styles.container}>
                <button onClick={this.props.toggleRenderState}>Toggle Render</button>
                <Toggle onClick={this.toggle} on={this.state.on}/>
            </div>
        );
    }
}

export default TelemetryController;