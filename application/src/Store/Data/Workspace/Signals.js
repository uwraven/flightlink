import { createSlice } from '@reduxjs/toolkit';
import uuid from 'uuid';

const SignalsSlice = createSlice({
    name: 'signals',
    initialState: {        
        signalEntities: {},
        signalIds: [],
    },
    reducers: {
        setSignals(state, action) {
            const { signalEntities, signalIds } = action.payload;
        },
        createSignal(state, action) {
            let id = uuid.v1()
            const newSignal = {
                id: id,
                name: "",
                units: "",
                bufferIndex: null,
                length: null,
                stream: false,
                render: false,
                signalMode: null,
                renderMode: null,
                renderedModelId: null,
                parentId: null
            }
            state.signalEntities = {...state.signalEntities, [id]: newSignal };
            state.signalIds = [...state.signalIds, id];
        },
        setSignalProperty(state, action) {
            let { id, field, updatedValue } = action.payload
            try {
                let signal = state.signalEntities[id];
                signal[field] = updatedValue;
                state.signalEntities = {
                    ...state.signalEntities, 
                    [id]: signal
                };
            } catch(err) {
                throw err;
            }
        }
    }
})

export const {
    setSignals,
    setSignalProperty,
    createSignal
} = SignalsSlice.actions;

export default SignalsSlice.reducer;