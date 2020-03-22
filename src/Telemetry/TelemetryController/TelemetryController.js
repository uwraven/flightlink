import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './TelemetryController.module.scss';
import Toggle from '../../Components/Toggle/Toggle';

class TelemetryController extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.configurationContainer}>
                    Configuration Selector
                </div>
                <div className={styles.dataContainer}>
                    <div className={styles.dataControls}>
                        <div className={styles.row}>
                            <span>3D Render</span>
                            <Toggle onClick={this.props.toggleRender} on={this.props.interface.renderer}/>
                        </div>
                    </div>
                    <div className={styles.dataStreams}>
                        { this.props.streams.map((stream, i) => {
                            // Coerce float32 to generic array to render
                            const data = Array.from(this.props.buffer.slice(stream.dataIndexStart, stream.dataIndexStart + stream.dataLength))
                            return(<StreamElement
                                stream={stream}
                                data={data}
                                key={i}
                            />)
                        }) }
                    </div>
                </div>
            </div>
        );
    }
}

const StreamElement = props => {
    // TODO:: temp label fix
    const components = ["w", "x", "y", "z"].reverse();
    return(
        <div className={styles.streamElementContainer}>
            <div className={styles.row}>
                <span className={styles.streamName}>{props.stream.name}</span>
                <span className={styles.streamUnitLabel}>{props.stream.units}</span>
            </div>
            <div className={styles.streamDataTable}>
                {props.data.map((num, i) => <div className={styles.row}>
                    <span>{components[props.stream.dataLength - i - 1]}</span>
                    <span>{num.toFixed(4)}</span>
                </div>)}
            </div>
        </div>
    )
}

TelemetryController.propTypes = {
    streams: PropTypes.array.isRequired,

}

export default TelemetryController;