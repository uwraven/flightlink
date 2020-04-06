import React, { Component } from 'react';
import styles from './Telemetry.module.scss';
import ThreeRenderer from './ThreeRenderer/ThreeRenderer';
import SignalConfiguration, { RenderModes, SignalModes } from './Config.js';
import TelemetryController from './TelemetryController/TelemetryController';
import GLPlot from './GLPlot/GLPlot';

const initialVisualState = {
    r: {
        x: 0,
        y: 0,
        z: 0
    },
    v: {
        x: 0,
        y: 0,
        z: 0
    },
    q: {
        w: 1,
        x: 0,
        y: 0,
        z: 0
    },
    w: {
        x: 0,
        y: 0,
        z: 0
    }
};

class Telemetry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderScene: false,
            visualState: initialVisualState,
            configurationId: '0',
            configurations: null,
            renderSignals: 0,
            streamSignals: [],
            buffer: [],
            plotLength: 50,
            interface: {
                renderer: true,
                streams: true,
                live: false
            }
        };
        this.t = 0;
        this.newData = true;
        this.onData = this.onData.bind(this);
        this.onResize = this.onResize.bind(this);
        this.setConfiguration = this.setConfiguration.bind(this);
        this.streamContexts = [];
    }

    componentDidMount() {
        window.arcc.api.attachListener('data', 'telemetryListener', this.onData);
        window.addEventListener('resize', this.onResize);

        // TODO:: Get last used configuration
        const previousConfigurationId = this.state.configurationId;

        // TODO:: Get signal configurations from memory asynchronously
        const configs = SignalConfiguration;

        // Then, set state from selected signal configuration
        this.setState(
            {
                configurations: configs.configurations,
                configurationId: previousConfigurationId
            },
            () => {
                this.updateConfiguration();
            }
        );
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
        window.arcc.api.removeListener('data', 'telemetryListener');
    }

    setConfiguration(id) {
        this.setState(
            {
                configurationId: id
            },
            () => {
                this.updateConfiguration();
            }
        );
    }

    updateConfiguration() {
        const configuration = this.state.configurations[this.state.configurationId];

        if (configuration) {
            let renderSignals = configuration.signals.filter((signal) =>
                signal.renderMode.includes(RenderModes.VISUAL)
            );

            this.setState(
                {
                    streamSignals: configuration.signals.filter((signal) =>
                        signal.renderMode.includes(RenderModes.STREAM)
                    ),
                    renderSignals: {
                        r: renderSignals.find((signal) => signal.signalMode === SignalModes.POSITION) || 0,
                        q: renderSignals.find((signal) => signal.signalMode === SignalModes.ATTITUDE.QUATERNION) || 0,
                        e: renderSignals.find((signal) => signal.signalMode === SignalModes.ATTITUDE.EULER) || 0
                    },
                    plotLength: 500,
                    interface: { ...this.state.interface, live: true }
                },
                () => {
                    const numSignals = this.state.streamSignals.reduce((num, stream) => (num += stream.dataLength), 0);
                    const initialBuffer = new Float32Array(numSignals);
                    initialBuffer.fill(0.0);
                    this.setState({
                        buffer: initialBuffer
                    });

                    this.t = 0;

                    this.onResize();
                }
            );
        }
    }

    onData(newData) {
        // X is the full length data vector
        let X = newData.payload;
        X = [ X[0], X[7], X[8], ...X ];
        this.newData = true;
        this.setState({
            buffer: X
        });
        this.updateRenderedState(X);
    }

    updateRenderedState(X) {
        let visualState = this.state.visualState;

        if (this.state.renderSignals.r) {
            let i = this.state.renderSignals.r.dataIndexStart;
            visualState.r = { x: X[i], y: X[i + 1], z: X[i + 2] };
        }

        if (this.state.renderSignals.q) {
            let i = this.state.renderSignals.q.dataIndexStart;
            visualState.q = { w: X[i], x: X[i + 1], y: X[i + 2], z: X[i + 3] };
        }

        this.setState({
            renderedState: visualState
        });
    }

    onResize() {
        let w = this.chartContainer.clientWidth;
        this.streamContexts.map((canvas) => {
            // console.log(canvas);
            // canvas.width = w / 3 * (window.devicePixelRatio || 1);
            // canvas.width = canvas.clientWidth
            // canvas.height = canvas.clientWidth;
        });
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    {this.state.interface.renderer && (
                        <div className={styles.threeContainerFullWidth}>
                            <ThreeRenderer className={styles.threeRenderer} renderedState={this.state.renderedState} />
                        </div>
                    )}
                    <div className={styles.plotsContainer} ref={(ref) => (this.chartContainer = ref)}>
                        {this.state.streamSignals.map((stream, i) => {
                            return (
                                <div className={styles.plotContainer}>
                                    <h4>{stream.name}</h4>
                                    <GLPlot
                                        buffer={this.state.buffer.slice(
                                            stream.dataIndexStart,
                                            stream.dataIndexStart + stream.dataLength
                                        )}
                                        config={{
                                            duration: 5000,
                                            points: 200,
                                            streams: stream.dataLength,
                                            axes: true,
                                            grid: true
                                        }}
                                        className={styles.plot}
                                        width={300}
                                        height={150}
                                        live={true}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                {this.state.configurations && (
                    <TelemetryController
                        configurations={this.state.configurations}
                        selectedConfiguration={this.state.configurationId}
                        setConfiguration={this.setConfiguration}
                        streams={this.state.streamSignals}
                        buffer={this.state.buffer}
                        interface={this.state.interface}
                        toggleRender={() =>
                            this.setState({
                                interface: {
                                    ...this.state.interface,
                                    renderer: !this.state.interface.renderer
                                }
                            })}
                    />
                )}
            </div>
        );
    }
}

export default Telemetry;
