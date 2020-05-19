import { createSlice } from '@reduxjs/toolkit';

const DeviceSlice = createSlice({
    name: 'device',
    initialState: {
        connectionOptions: [ 'Serial' ],
        selectedConnection: 0,
        protocolOptions: [ 'Flightlink' ],
        selectedProtocol: 0,
        portOptions: [],
        selectedPort: -1,
        portOpen: false,
        openingPort: false,
        portError: null
    },
    reducers: {
        selectConnection(state, action) {
            state.selectedConnection = action.payload;
        },
        selectProtocol(state, action) {
            state.selectedProtocol = action.payload;
        },
        selectPort(state, action) {
            state.selectedPort = action.payload;
            state.error = false;
        },
        setPortOptions(state, action) {
            state.portOptions = action.payload;
        },
        setPortStartOpen(state, action) {
            state.portOpen = false;
            state.openingPort = true;
            state.portError = null;
        },
        setPortOpenSuccess(state, action) {
            state.portOpen = true;
            state.openingPort = false;
            state.portError = false;
        },
        setPortOpenFailed(state, action) {
            state.portOpen = false;
            state.openingPort = false;
            state.portError = action.payload;
        },
        setPortClosedSuccess(state, action) {
            state.portOpen = false;
            state.openingPort = false;
            state.portError = null;
        }
    }
});

export const {
    selectConnection,
    selectProtocol,
    selectPort,
    setPortOptions,
    setPortStartOpen,
    setPortOpenSuccess,
    setPortOpenFailed,
    setPortClosedSuccess
} = DeviceSlice.actions;
export default DeviceSlice.reducer;

export const getPortOptions = () => async (dispatch) => {
    // try {
    //     window.arcc.api.sendRequest(
    //         {
    //             type: API.requests.ACTION,
    //             action: API.actions.LISTSERIAL
    //         },
    //         (response) => {
    //             if (response.status === 200) {
    //                 dispatch(setPortOptions(response.payload.map((port) => port.path)));
    //             } else {
    //                 throw new Error('failed to register ports');
    //             }
    //         }
    //     );
    // } catch (err) {}
};

export const openPort = (path) => async (dispatch) => {
    // try {
    //     dispatch(setPortStartOpen());
    //     window.arcc.api.sendRequest(
    //         {
    //             type: API.requests.ACTION,
    //             action: API.actions.OPENSERIAL,
    //             payload: {
    //                 path: path
    //             }
    //         },
    //         (response) => {
    //             if (response.status === 200) {
    //                 dispatch(setPortOpenSuccess());
    //             } else {
    //                 dispatch(setPortOpenFailed(response.errorMessage));
    //                 throw new Error('Failed to open port.');
    //             }
    //         }
    //     );
    // } catch (err) {
    //     console.log(err);
    //     dispatch(setPortOpenFailed(err.message));
    // }
};

export const closePort = () => async (dispatch) => {
    // try {
    //     window.arcc.api.sendRequest(
    //         {
    //             type: API.requests.ACTION,
    //             action: API.actions.CLOSESERIAL
    //         },
    //         (response) => {
    //             if (response.status === 200) {
    //                 dispatch(setPortClosedSuccess());
    //             } else {
    //                 console.log('what to do here');
    //             }
    //         }
    //     );
    // } catch (err) {}
};
