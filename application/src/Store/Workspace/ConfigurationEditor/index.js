import { createSlice } from '@reduxjs/toolkit';
import SignalEditorSlice from './SignalEditorSlice'

const ConfigurationEditorSlice = createSlice({
    name: 'configurationEditor',
    initialState: {
        selectedConfigurationId: ""
    },
    reducers: {
        setSelectedConfigurationId(state, action) {
            state.selectedConfigurationId = action.payload;
        },
    }
})

export const { setSelectedConfigurationId } = ConfigurationEditorSlice.actions

export default combineReducers({
    ...ConfigurationEditorSlice.reducer,
    SignalEditorSlice
})