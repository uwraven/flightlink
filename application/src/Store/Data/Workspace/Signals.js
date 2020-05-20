import { createSlice } from '@reduxjs/toolkit';
import { loadConfigurations } from './Configurations';

const SignalsSlice = createSlice({
    name: 'signals',
    initialState: {        
        signalEntities: {},
        signalIds: [],
    },
    reducers: {
        loadSignals(state, action) {
            const { entities, all } = action.payload;
            state.signalEntities = entities;
            state.signalIds = all;
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
    loadSignals,
    setSignalProperty,
} = SignalsSlice.actions;

export const loadSignal = (signalId) => async (dispatch) => {
    
}

export const createSignal = (configurationId) =>  async (dispatch) => {
    const { signals, configurations } = await window.arcc.app.workspace.signals.create(configurationId);
    dispatch(loadSignals(signals));
    dispatch(loadConfigurations(configurations))
}

export const submitSignalProperty = (signal) => async (dispatch) => {
    const signals = await window.arcc.app.workspace.signals.updateSignal(signal)
}

export default SignalsSlice.reducer;