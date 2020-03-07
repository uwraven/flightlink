import React, { Component } from 'react';
import styles from './Telemetry.module.scss';
import ThreeRenderer from './ThreeRenderer/ThreeRenderer';
import SignalConfiguration from './Config.js';
import WebGLPlot from './GLPlot/WebGLPlot';
import BufferLine from './GLPlot/BufferLine';
import BufferColorRGBA from './GLPlot/BufferColorRGBA';
import TelemetryController from './TelemetryController/TelemetryController';

class Telemetry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            renderScene: true,
            shouldUpdateRender: false,
            renderedState: {
                r: {x: 0, y: 0, z: 0},
                v: {x: 0, y: 0, z: 0},
                q: {w: 1, x: 0, y: 0, z: 0},
                w: {x: 0, y: 0, z: 0}
            },
            streams: [],
            plotLength: 100,
        }
        this.onData = this.onData.bind(this);
        this.t = 0;
        this.streamContexts = [];
    }

    componentDidMount() {
        window.arcc.api.attachListener("data", "telemetryListener", this.onData)

        this.signals = {
            attitudeConfiguration: SignalConfiguration.signals.find(signal => signal.signalMode === SignalConfiguration.SignalModes.ATTITUDE.QUATERNION),
            positionConfiguration: SignalConfiguration.signals.find(signal => signal.signalMode === SignalConfiguration.SignalModes.POSITION),
        }

        let streamSignals = SignalConfiguration.signals.filter(signal => signal.renderMode.includes(SignalConfiguration.RenderModes.STREAM));

        console.log(streamSignals);

        this.setState({
            streams: streamSignals
        }, () => {
            this.streamContexts.map((context, i) => {
                let stream = this.state.streams[i];
                if (context && stream) {
                    let glPlot = new WebGLPlot(context, {
                        antialias: true,
                        transparent: false,
                    });
                    let numPoints = this.state.plotLength;
                    for (let i = 0; i < stream.dataLength; i++) {
                        let line = new BufferLine(
                            new BufferColorRGBA(0.1, 0.2, 0.9, 1.0),
                            numPoints,
                        );
                        line.fill(0, 2 / numPoints, 0);
                        glPlot.addLine(line);
                    }
                    const animateFrame = () => {
                        glPlot.update();
                        window.requestAnimationFrame(animateFrame);
                    }
                    window.requestAnimationFrame(animateFrame);
                } else {
                    console.warn("Invalid stream context, check React lifecycle");
                }
            })
        })
        
        
        this.setState({
            shouldUpdateRender: SignalConfiguration.signals.filter(signal => signal.renderMode.includes(SignalConfiguration.RenderModes.VISUAL))
        })
    }

    onData(newData) {
        // X is the full length data vector
        // TODO worker data format
        // The worker aggregates multiple samples before sending, this means the payload contains 
        // an array of state vectors, so let's take the last one
        const X = newData.payload[newData.payload.length - 1];

        let renderedState = this.state.renderedState;

        // the data vector structure is defined by the user
        // each signal is parsed based on settings in the signal configuration file

        // If an attitude configuration is specified, then pass the data on through state
        if (this.signals.attitudeConfiguration) {
            let i = this.signals.attitudeConfiguration.dataIndexStart;
            const q = {w: X[i], x: X[i+1], y: X[i+2], z: X[i+3]};
            if (this.signals.attitudeConfiguration.renderMode.includes(SignalConfiguration.RenderModes.VISUAL)) renderedState.q = q;
            if (this.signals.attitudeConfiguration.renderMode.includes(SignalConfiguration.RenderModes.STREAM)) {
                // Data should be plotted in a stream chart
                // TODO Data streams
            }
        }

        // Position signal
        if (this.signals.positionConfiguration) {
            let i = this.signals.positionConfiguration.dataIndexStart;
            const r = {x: X[i], y: X[i+1], z: X[i+2]};
            if (this.signals.positionConfiguration.renderMode.includes(SignalConfiguration.RenderModes.VISUAL)) renderedState.r = r;
        }
        
        if (this.state.shouldUpdateRender) {
            this.setState({
                renderedState: renderedState
            })
        }

        

    }

    render() {
        console.log("render called");
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
                        { this.state.streams.map((stream, i) => <canvas 
                            className={styles.glPlot} 
                            width={800} 
                            height={800} 
                            ref={ref => this.streamContexts[i] = ref} 
                        />)}
                    </div>
                </div>
                <TelemetryController
                    toggleRenderState={(state) => this.setState({renderScene: !this.state.renderScene})}
                />
            </div>
        );
    }
}

export default Telemetry;