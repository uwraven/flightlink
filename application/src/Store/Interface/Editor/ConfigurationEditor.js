import { createSlice } from '@reduxjs/toolkit';
import { deleteConfiguration, duplicateConfiguration } from '../../Data/Workspace/Configurations';

const configurationContextOptions = {
    "delete": {
        id: 'delete',
        label: 'Delete',
        position: 1,
        callback: deleteConfiguration
    },
    // "rename": {
    //     id: 'rename',
    //     label: 'Rename',
    //     position: 0,
    //     callback: null
    // },
    "duplicate": {
        id: 'duplicate',
        label: 'Duplicate',
        position: 0,
        callback: duplicateConfiguration
    }
}

const ConfigurationEditorSlice = createSlice({
    name: 'configurationEditor',
    initialState: {
        selectedConfigurationId: "",
        contextualConfigurationId: "",
    },
    reducers: {
        setSelectedConfigurationId(state, action) {
            let id = action.payload;
            state.selectedConfigurationId = (id === state.selectedConfigurationId) ? "" : id;
        },
    }
})

export const { setSelectedConfigurationId } = ConfigurationEditorSlice.actions

export const configurationRowContext = (configurationId) => async (dispatch) => {
    const options = Object.values(configurationContextOptions).map(object => ({id: object.id, label: object.label, position: object.position}));
    const { id } = await window.arcc.app.workspace.context(options);
    dispatch(configurationContextOptions[id].callback(configurationId))
}

export default ConfigurationEditorSlice.reducer