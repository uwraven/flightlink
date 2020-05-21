import { createSlice } from '@reduxjs/toolkit';
import { createConfiguration, deleteConfiguration, duplicateConfiguration } from '../../Data/Workspace/Configurations';

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

export const deleteConfigurationRow = (configurationId) => async (dispatch) => {
    dispatch(setSelectedConfigurationId(null))
    await dispatch(deleteConfiguration(configurationId));
}

const configurationContextOptions = {
    "delete": {
        id: 'delete',
        label: 'Delete',
        position: 1,
        callback: deleteConfigurationRow
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
    },
    "add": {
        id: 'add',
        label: 'Add Configuration',
        position: 2,
        callback: createConfiguration
    }
}

export default ConfigurationEditorSlice.reducer