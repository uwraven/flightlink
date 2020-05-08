import { createSlice } from '@reduxjs/toolkit';

const ConfigureSlice = createSlice({
    name: 'configure',
    initialState: {
        selectedConfigurationId: "1",
        selectedSignalId: "1",
        loadingConfigurations: false,
        configurationsLoaded: false,
        configurations: []
    },
    reducers: {
        setSelectedConfigurationId(state, action) {
            state.selectedConfigurationId = (action.payload === state.selectedConfigurationId) ? null : action.payload
        },
        setSelectedSignalId(state, action) {
            state.selectedSignalId = (action.payload === state.selectedSignalId ? null : action.payload);
        },
        setConfigurationsLoading(state, action) {
            state.loadingConfigurations = true;
            state.configurationsLoaded = false;
        },
        setConfigurationsLoadingSuccess(state, action) {
            state.loadingConfigurations = false;
            state.configurationsLoaded = true;
        }
    }
});

export const { 
    setSelectedConfigurationId,
    setSelectedSignalId,
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