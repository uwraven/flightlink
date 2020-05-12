import { createSlice } from '@reduxjs/toolkit';

const ConfigureSlice = createSlice({
    name: 'configure',
    initialState: {
        selectedConfigurationId: null,
        selectedSignalId: null,
        loadingConfigurations: false,
        configurationsLoaded: false,
        configurations: [],
        signals: [],
    },
    reducers: {
        setSelectedConfigurationId(state, action) {
            state.selectedConfigurationId = (action.payload === state.selectedConfigurationId) ? null : action.payload
        },
        setSelectedSignalId(state, action) {
            console.log("Dispatch setSelectedSignalID", action.payload, `[${typeof action.payload}]`)
            state.selectedSignalId = (action.payload === state.selectedSignalId ? "" : action.payload);
        },
        setConfigurationsLoading(state, action) {
            state.loadingConfigurations = true;
            state.configurationsLoaded = false;
        },
        setConfigurationsLoadingSuccess(state, action) {
            state.loadingConfigurations = false;
            state.configurationsLoaded = true;
        },
        setSignalOrder(state, action) {
            const { from, to } = action.payload;
            let signals = state.signals;
            signals.splice(to, 0, signals.splice(from, 1)[0]);
            signals.map((signal, i) => {
                
            })
        }
    }
});

export const { 
    setSelectedConfigurationId,
    setSelectedSignalId,
    setSignalOrder
 } = ConfigureSlice.actions;

export default ConfigureSlice.reducer;

export const getConfigurations = () => async (dispatch) => {
    // Load configurations from memory
    // They are stored in a flat JSON file under the system's application data directory
    try {
        
    } catch(err) {
        console.log(err);
    }
}