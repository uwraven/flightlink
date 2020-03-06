import React, { Component } from 'react';
import styles from './Telemetry.module.scss';
import ThreeRenderer from './ThreeRenderer/ThreeRenderer';
import SignalConfiguration from './Config.js';
import WebGLPlot from './GLPlot/WebGLPlot';
import BufferLine from './GLPlot/BufferLine';
import BufferColorRGBA from './GLPlot/BufferColorRGBA';

class Telemetry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            renderScene: false,
            renderedState: {
                r: {x: 0, y: 0, z: 1},
                v: {x: 0, y: 0, z: 0},
                q: {w: 1, x: 0, y: 0, z: 0},
                w: {x: 0, y: 0, z: 0}
            }
        }
        this.onData = this.onData.bind(this);
        this.t = 0;
    }

    componentDidMount() {
        window.arcc.api.attachListener("data", "telemetryListener", this.onData)

        this.signals = {
            attitudeConfiguration: SignalConfiguration.signals.find(signal => signal.signalMode === SignalConfiguration.SignalModes.ATTITUDE.QUATERNION),
            positionConfiguration: SignalConfiguration.signals.find(signal => signal.signalMode === SignalConfiguration.SignalModes.POSITION),
        }

        // Test webgl renderer
        if (this.canvas) {
            console.log("canvas found");
            let glPlot = new WebGLPlot(this.canvas, {
                antialias: true,
                transparent: false
            })

            let numPoints = 50;

            for (let j = 0; j < 10; j++) {
                let line = new BufferLine(
                    new BufferColorRGBA(Math.random(), Math.random(), Math.random(), 1),
                    numPoints);
                line.fill(0, 2 / numPoints, 0);
                glPlot.addLine(line);
            }

            let t = 0;

            const nextFrame = () => {
                t += 1 / 60;
                glPlot.lines.map((line, i) => line.shiftAdd(new Float32Array([1 / i * Math.sin(t + i)])));
                glPlot.update();
                window.requestAnimationFrame(nextFrame);
            }
            window.requestAnimationFrame(nextFrame);
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
                        <canvas width={500} height={500} ref={ref => this.canvas = ref}/>
                    </div>
                </div>
                <div className={styles.controlPanel}>
                    
                </div>
            </div>
        );
    }
}

export default Telemetry;