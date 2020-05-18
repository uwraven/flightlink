import { createSlice } from '@reduxjs/toolkit';

const ConfigurationEditorSlice = createSlice({
    name: 'configurationEditor',
    initialState: {
        selectedConfigurationId: ""
    },
    reducers: {
        setSelectedConfigurationId(state, action) {
            let id = action.payload;
            state.selectedConfigurationId = (id === state.selectedConfigurationId) ? "" : id;
        },
    }
})

export const { setSelectedConfigurationId } = ConfigurationEditorSlice.actions

export default ConfigurationEditorSlice.reducer