import React, { Component } from 'react';
import styles from './Telemetry.module.scss';
import ThreeRenderer from './ThreeRenderer/ThreeRenderer';
import SignalConfiguration, {RenderModes, SignalModes} from './Config.js';
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

const initialVisualState = {
    r: {
        x: 0, y: 0, z: 0,
    },
    v: {
        x: 0, y: 0, z: 0,
    },
    q: {
        w: 1, x: 0, y: 0, z: 0,
    },
    w: {
        x: 0, y: 0, z: 0, 
    }
};

class Telemetry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderScene: false,
            visualState: initialVisualState,
            configurationIndex: 0,
            configuration: null,
            renderSignals: 0,
            streamSignals: [],
            buffer: [],
            plotLength: 50,
            interface: {
                renderer: false,
                streams: true,
            }
        }
        this.t = 0;
        this.newData = true;
        this.onData = this.onData.bind(this);
        this.onResize = this.onResize.bind(this);
        this.streamContexts = [];
    }

    componentDidMount() {
        window.arcc.api.attachListener("data", "telemetryListener", this.onData)
        window.addEventListener('resize', this.onResize);

        // TODO:: Get last used configuration
        const lastConfig = "0";

        // TODO:: Get signal configurations from memory asynchronously
        const configs = SignalConfiguration;

        // Then, set state from selected signal configuration
        this.setState({configuration: configs.configurations[lastConfig]}, (e) => {
            if (this.state.configuration) {
            let renderSignals = this.state.configuration.signals.filter(signal => signal.renderMode.includes(RenderModes.VISUAL));
            this.setState({
                streamSignals: this.state.configuration.signals.filter(signal => signal.renderMode.includes(RenderModes.STREAM)),
                renderSignals: {
                    r: renderSignals.find(signal => signal.signalMode === SignalModes.POSITION) || 0,
                    q: renderSignals.find(signal => signal.signalMode === SignalModes.ATTITUDE.QUATERNION) || 0,
                    e: renderSignals.find(signal => signal.signalMode === SignalModes.ATTITUDE.EULER) || 0
                }
            }, () => {

                const numSignals = this.state.streamSignals.reduce((num, stream) => num += stream.dataLength, 0);
                const initialBuffer = new Float32Array(numSignals);
                initialBuffer.fill(0.5);
                this.setState({buffer: initialBuffer});

                this.t = 0;
                let plots = this.streamContexts.map((context, i) => {
                    let stream = this.state.streamSignals[i];
                    if (context && stream) {

                        let glPlot = new WebGLPlot(context, {
                            antialias: true,
                            transparent: false,
                        });
    
                        if (stream.plot) {
                            glPlot.scaleX = 1 / stream.plot.scale.x;
                            glPlot.scaleY = 1 / stream.plot.scale.y;
                        }
    
                        let numPoints = this.state.plotLength;
                        for (let j = 0; j < stream.dataLength; j++) {
                            let line = new BufferLine(
                                COLORS[j],
                                numPoints,
                            );
                            line.fill(0, 1 / numPoints, 0);
                            glPlot.addLine(line);
                        }

                        return {
                            glPlot: glPlot,
                            stream: stream
                        };

                    } else {
                        console.warn("Invalid stream context, check React lifecycle");
                    }
                })

                const animateFrame = (t) => {
                    if (this.newData) {
                        const dt = t - this.t;
                        plots.map(plot => {
                            plot.glPlot.lines.map((line, j) => {
                                line.shiftAdd(new Float32Array([this.state.buffer[plot.stream.dataIndexStart + j]]));
                            })
                            plot.glPlot.update();
                        })
                    }
                    this.newData = false;
                    window.requestAnimationFrame(animateFrame);
                }

                animateFrame(0);

                this.onResize();
            });
        }});
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    onData(newData) {
        // X is the full length data vector
        const X = newData.payload;
        this.newData = true;
        this.setState({buffer: X});
        this.updateRenderedState(X);
    }

    updateRenderedState(X) {
        let visualState = this.state.visualState;

        if (this.state.renderSignals.r) {
            let i = this.state.renderSignals.r.dataIndexStart;
            visualState.r = {x: X[i], y: X[i+1], z: X[i+2]};
        }

        if (this.state.renderSignals.q) {
            let i = this.state.renderSignals.q.dataIndexStart;
            visualState.q = {w: X[i], x: X[i+1], y: X[i+2], z: X[i+3]};
        }
        
        this.setState({
            renderedState: visualState
        })
    }

    onResize() {
        let w = this.chartContainer.clientWidth;
        this.streamContexts.map(canvas => {
            // console.log(canvas);
            // canvas.width = w / 3 * (window.devicePixelRatio || 1);
            // canvas.width = canvas.clientWidth
            // canvas.height = canvas.clientWidth;
        })
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    { (this.state.interface.renderer) &&
                        <div className={styles.threeContainerFullWidth}>
                            <ThreeRenderer 
                                className={styles.threeRenderer}
                                renderedState={this.state.renderedState}
                            />
                        </div>
                    }
                    <div className={styles.chartContainer} ref={ref => this.chartContainer = ref}>
                        { this.state.streamSignals.map((stream, i) => <div className={styles.chartWrapper} key={i}>
                            <div className={styles.chartTitleBar}>
                                <span>{stream.name}</span>
                                <span>{stream.units || ""}</span>
                            </div>
                            <canvas
                                className={styles.glPlot} 
                                width={300} 
                                height={300} 
                                ref={ref => this.streamContexts[i] = ref} 
                            />
                        </div>)}
                    </div>
                </div>
                <TelemetryController
                    streams={this.state.streamSignals}
                    buffer={this.state.buffer}
                    interface={this.state.interface}
                    toggleRender={() => this.setState({interface: {
                        ...this.state.interface,
                        renderer: !this.state.interface.renderer
                    }})}
                />
            </div>
        );
    }
}

export default Telemetry;