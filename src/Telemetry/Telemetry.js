import React, { Component } from 'react';
import styles from './Telemetry.module.scss';
import ThreeRenderer from './ThreeRenderer/ThreeRenderer';
import SignalConfiguration from './Config.js';
import Plot from 'react-plotly.js';

let xd = [];
let yd = [];

for (let i = 0; i < 10000; i++) {
    xd.push(i);
    yd.push(Math.sin(i / 100));
}

class Telemetry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            renderScene: true,
            renderedState: {
                r: {x: 0, y: 0, z: 1},
                v: {x: 0, y: 0, z: 0},
                q: {w: 1, x: 0, y: 0, z: 0},
                w: {x: 0, y: 0, z: 0}
            },
            x: xd,
            y: yd,
        }
        this.onData = this.onData.bind(this);
    }

    componentDidMount() {
        window.arcc.api.attachListener("data", "telemetryListener", this.onData)

        this.signals = {
            attitudeConfiguration: SignalConfiguration.signals.find(signal => signal.signalMode === SignalConfiguration.SignalModes.ATTITUDE.QUATERNION),
            positionConfiguration: SignalConfiguration.signals.find(signal => signal.signalMode === SignalConfiguration.SignalModes.POSITION),
        }
    }

    onData(newData) {
        // X is the full length data vector
        // TODO worker data format
        // The worker aggregates multiple samples before sending, this means the payload contains 
        // an array of state vectors, so let's take the first one
        const X = newData.payload[0];

        // the data vector structure is defined by the user
        // each signal is parsed based on settings in the signal configuration file

        // If a attitude configuration is specified, then pass the data on through state
        if (this.signals.attitudeConfiguration) {
            let i = this.signals.attitudeConfiguration.dataIndexStart;
            const q = {w: X[i], x: X[i+1], y: X[i+2], z: X[i+3]};
            if (this.signals.attitudeConfiguration.renderMode.includes(SignalConfiguration.RenderModes.VISUAL)) {
                // Render attitude in 3D
                this.setState({renderedState: {...this.state.renderedState, q: q}});
            }
            if (this.signals.attitudeConfiguration.renderMode.includes(SignalConfiguration.RenderModes.STREAM)) {
                // Data should be plotted in a stream chart
                // TODO Data streams
            }
        }

        // Position signal
        if (this.signals.positionConfiguration) {
            let i = this.signals.positionConfiguration.dataIndexStart;
            const r = {x: X[i], y: X[i+1], z: X[i+2]};
            if (this.signals.positionConfiguration.renderMode.includes(SignalConfiguration.RenderModes.VISUAL)) {
                this.setState({renderedState: {...this.state.renderedState, r: r}})
            }
        }
        

    }

    render() {
        return (
            <div className={styles.module}>
                <div className={styles.container}>
                    { this.state.renderScene &&
                    <div className={styles.threeContainerFullWidth}>
                        <ThreeRenderer 
                            className={styles.threeRenderer}
                            renderedState={this.state.renderedState}
                        />
                    </div> }
                    <div className={styles.chartContainer}>
                        <Plot
                            data={[
                                {
                                    x: this.state.x,
                                    y: this.state.y,
                                    type: 'scattergl',
                                    mode: 'lines',
                                    line: {
                                        width: 1,
                                        color: 'rgb(255, 0, 0)'
                                    }
                                }
                            ]}
                            config={{
                                displayModeBar: false,
                                staticPlot: true,
                            }}
                        />
                    </div>
                </div>
                <div className={styles.controlPanel}>
                    
                </div>
            </div>
        );
    }
}

export default Telemetry;