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
    signals: [
        {
            name: "Position",
            dataIndexStart: 0,
            dataLength: 3,
            renderMode: [
                RenderModes.VISUAL, 
                RenderModes.STREAM
            ],
            signalMode: SignalModes.POSITION,
        },
        {
            name: "Angular Rates",
            dataIndexStart: 3,
            dataLength: 3,
            renderMode: [
                RenderModes.STREAM
            ],
            signalMode: SignalModes.VECTOR
        },
        {
            name: "Attitude",
            dataIndexStart: 6,
            dataLength: 4,
            renderMode: [
                RenderModes.VISUAL, 
                RenderModes.STREAM
            ],
            signalMode: SignalModes.ATTITUDE.QUATERNION,
        },
    ],
    SignalModes: SignalModes,
    RenderModes: RenderModes
}

export default TelemetryConfiguration;