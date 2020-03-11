import React, { Component } from 'react';
import styles from './Telemetry.module.scss';
import ThreeRenderer from './ThreeRenderer/ThreeRenderer';
import SignalConfiguration from './Config.js';
import WebGLPlot from './GLPlot/WebGLPlot';
import BufferLine from './GLPlot/BufferLine';
import BufferColorRGBA from './GLPlot/BufferColorRGBA';
import TelemetryController from './TelemetryController/TelemetryController';

const COLORS = [
    new BufferColorRGBA(0, 0.466, 0.733, 1.0),
    new BufferColorRGBA(0.2, 0.73, 0.933, 1.0),
    new BufferColorRGBA(0, 0.6, 0.533, 1.0),
    new BufferColorRGBA(0.933, 0.466, 0.2, 1.0),
];

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
        this.buffer = [];
        this.onResize = this.onResize.bind(this);
    }

    componentDidMount() {
        window.arcc.api.attachListener("data", "telemetryListener", this.onData)
        
        window.addEventListener('resize', this.onResize);

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
                    if (stream.streamConfiguration) {
                        glPlot.scaleX /= stream.streamConfiguration.scale.x;
                        glPlot.scaleY /= stream.streamConfiguration.scale.y;
                    }

                    let numPoints = this.state.plotLength;
                    for (let j = 0; j < stream.dataLength; j++) {
                        let line = new BufferLine(
                            COLORS[j],
                            numPoints,
                        );
                        line.fill(0, 2 / numPoints, 0);
                        glPlot.addLine(line);
                    }
                    const animateFrame = () => {
                        glPlot.lines.map((line, j) => {
                            if (this.buffer.length > stream.dataIndexStart + j) {
                                line.shiftAdd(new Float32Array([this.buffer[stream.dataIndexStart + j]]));
                            }
                        })
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
        const X = newData.payload;
        this.updateRenderedState(X);
        this.updateStreamPlots(X);
    }

    updateRenderedState(X) {
        let renderedState = this.state.renderedState;
        if (this.signals.attitudeConfiguration && this.signals.attitudeConfiguration.renderMode.includes(SignalConfiguration.RenderModes.VISUAL)) {
            let i = this.signals.attitudeConfiguration.dataIndexStart;
            renderedState.q = {w: X[i], x: X[i+1], y: X[i+2], z: X[i+3]};
        }
        if (this.signals.positionConfiguration && this.signals.positionConfiguration.renderMode.includes(SignalConfiguration.RenderModes.VISUAL)) {
            let i = this.signals.positionConfiguration.dataIndexStart;
            renderedState.r = {x: X[i], y: X[i+1], z: X[i+2]}
        }
        if (this.state.shouldUpdateRender) {
            this.setState({
                renderedState: renderedState
            })
        }
    }

    updateStreamPlots(X) {
        this.buffer = X;
        // Stream plots read this data on their animation loop
    }

    onResize() {
        let w = this.chartContainer.clientWidth;
        this.streamContexts.map(canvas => {
            console.log(canvas);
            canvas.width = w / 3 * (window.devicePixelRatio || 1);
            canvas.height = canvas.width;
        })
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    { (this.state.renderScene) &&
                        <div className={styles.threeContainerFullWidth}>
                            <ThreeRenderer 
                                className={styles.threeRenderer}
                                renderedState={this.state.renderedState}
                            />
                        </div>
                    }
                    <div className={styles.chartContainer} ref={ref => this.chartContainer = ref}>
                        { this.state.streams.map((stream, i) => <div className={styles.chartWrapper}>
                            <div className={styles.chartTitleBar}>
                                <span>{stream.name}</span>
                                <span>{stream.units || ""}</span>
                            </div>
                            <canvas
                                className={styles.glPlot} 
                                width={600} 
                                height={600} 
                                ref={ref => this.streamContexts[i] = ref} 
                            />
                        </div>)}
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