import { createSlice } from '@reduxjs/toolkit';

const RecordSlice = createSlice({
    name: 'record',
    initialState: {
        websocketConnected: false
    },
    reducers: {
        setWebsocketConnection(state, action) {
            state.websocketConnected = action.payload;
        }
    }
});

export const { setWebsocketConnection } = RecordSlice.actions;

export default RecordSlice.reducer;
