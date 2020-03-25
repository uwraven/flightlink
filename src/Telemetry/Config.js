const SignalModes = {
    VECTOR: "vector", // Generic data mode
    ATTITUDE: { 
        QUATERNION: "attitude.quaternion",
        EULER: "attitude.euler"
    }, // Attitude
    POSITION: "position",
    ANGULAR: "angular"
}

const RenderModes = {
    VISUAL: "visual", // Render in 3D
    STREAM: "stream", // Render in streaming line plot for each channel
}

const TelemetryConfiguration = {
    configurations: {
        "0": {
            id: "0",
            name: "Default",
            signals: [
                {
                    name: "Position",
                    units: "m",
                    dataIndexStart: 0,
                    dataLength: 3,
                    renderMode: [
                        RenderModes.VISUAL, 
                        RenderModes.STREAM
                    ],
                    signalMode: SignalModes.POSITION,
                    plot: {
                        scale: {
                            x: 1,
                            y: 10,
                        },
                    }
                },
                {
                    name: "Attitude",
                    units: "",
                    dataIndexStart: 6,
                    dataLength: 4,
                    renderMode: [
                        RenderModes.VISUAL, 
                        RenderModes.STREAM
                    ],
                    signalMode: SignalModes.ATTITUDE.QUATERNION,
                    plot: {
                        scale: {
                            x: 1,
                            y: 1,
                        }
                    }
                },
                {
                    name: "Angular Rates",
                    units: "rad/s",
                    dataIndexStart: 10,
                    dataLength: 3,
                    renderMode: [
                        RenderModes.STREAM
                    ],
                    signalMode: SignalModes.ANGULAR,
                    plot: {
                        scale: {
                            x: 1,
                            y: 1,
                        }
                    }
                },
                {
                    name: "Velocity",
                    units: "m/s",
                    dataIndexStart: 3,
                    dataLength: 3,
                    renderMode: [
                        RenderModes.STREAM
                    ],
                    signalMode: SignalModes.VECTOR,
                    plot: {
                        scale: {
                            x: 1,
                            y: 1,
                        }
                    }
                },
            ],
        },
        "1": {
            id: "1",
            name: "3D Position",
            signals: [
                {
                    name: "Position",
                    units: "m",
                    dataIndexStart: 0,
                    dataLength: 3,
                    renderMode: [
                        RenderModes.STREAM,
                        RenderModes.VISUAL
                    ],
                    signalMode: SignalModes.POSITION,
                    plot: {
                        scale: {
                            x: 1,
                            y: 1,
                        }
                    }

                }
            ]
        }
    },
}

export {
    SignalModes,
    RenderModes 
}

export default TelemetryConfiguration;