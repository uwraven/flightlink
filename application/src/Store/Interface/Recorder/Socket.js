import { createSlice } from '@reduxjs/toolkit';

const RecordSlice = createSlice({
    name: 'record',
    initialState: {
        websocketConnected: false
    },
    reducers: {
        onWebsocketConnectionStatus(state, action) {
            state.websocketConnected = action.payload;
        }
    }
});

export const { setWebsocketConnection } = RecordSlice.actions;

export default RecordSlice.reducer;
