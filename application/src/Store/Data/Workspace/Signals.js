import { createSlice } from '@reduxjs/toolkit';
import { configurationsUpdated } from './Configurations';

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
        updateSignalField(state, action) {
            console.log(action);
            const { signalId, field, value } = action.payload;
            console.log(signalId, field, value);
            state.signalEntities[signalId][field] = value;
        }
    }
})

export const {
    loadSignals,
    updateSignalField,
} = SignalsSlice.actions;

export const loadSignal = (signalId) => async (dispatch) => {
    
}

export const createSignal = (configurationId) =>  async (dispatch) => {
    const { signals, configurations } = await window.arcc.app.workspace.signals.create(configurationId);
    dispatch(loadSignals(signals));
    dispatch(configurationsUpdated(configurations))
}

export const saveSignal = (signalId) => async (dispatch) => {
    // state.signalEntities[signalId][field] = value;
    // console.log(state.signalEntities[signalId][field]);
    console.log("should save signal");
    // const signals = await window.arcc.app.workspace.signals.updateSignal(signal)
}

export default SignalsSlice.reducer;