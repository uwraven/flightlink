import { createSlice } from '@reduxjs/toolkit';

const DeviceSlice = createSlice({
    name: 'device',
    initialState: {
        connectionOptions: [],
        selectedConnection: -1,
        protocolOptions: [],
        selectedProtocol: -1,
        portOptions: [],
        selectedPort: -1
    },
    reducers: {
        selectConnection(state, action) {
            state.selectedConnection = action.payload;
        },
        selectProtocol(state, action) {
            state.selectedProtocol = action.payload;
        },
        selectPort(state, action) {
            state.selectPort = action.payload;
        },
        setPortOptions(state, action) {
            state.portOptions = action.payload;
        }
    }
});

export const { selectConnection, selectProtocol, selectPort, setPortOptions } = DeviceSlice.actions;

export default DeviceSlice.reducer;
