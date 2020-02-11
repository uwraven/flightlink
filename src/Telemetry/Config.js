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
    VISUAL: "visual", // Render in the 3D visual
    STREAM: "stream", // Render in streaming line plot for each channel
}

const TelemetryConfiguration = {
    signals: [
        {
            name: "Attitude",
            dataIndexStart: 6,
            renderMode: [
                RenderModes.VISUAL, 
                RenderModes.STREAM
            ],
            signalMode: SignalModes.ATTITUDE.QUATERNION,
        },
        {
            name: "Position",
            dataIndexStart: 0,
            renderMode: [
                RenderModes.VISUAL, 
                RenderModes.STREAM
            ],
            signalMode: SignalModes.POSITION,
        },
        {
            name: "Angular Rates",
            dataIndices: {
                start: 3,
                end: 5,
            },
            renderMode: [
                RenderModes.STREAM
            ],
            signalMode: SignalModes.VECTOR
        }
    ],
    SignalModes: SignalModes,
    RenderModes: RenderModes
}

export default TelemetryConfiguration;