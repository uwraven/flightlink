import { createSlice } from '@reduxjs/toolkit';

const ConfigurationsSlice = createSlice({
    name: 'configurations',
    initialState: {
        configurationEntities: {},
        configurationIds: [],
    },
    reducers: {
        configurationsUpdated(state, action) {
            const { entities, all } = action.payload;
            state.configurationEntities = entities;
            state.configurationIds = all;
        },
    }
})

export const {
    configurationsUpdated,
    deleteConfigurationById
} = ConfigurationsSlice.actions;

export const createConfiguration = () => async (dispatch) => {
    const newConfigurations = await window.arcc.app.workspace.configurations.create()
    dispatch(configurationsUpdated(newConfigurations))
}

export const deleteConfiguration = (configurationId) => async (dispatch) => {
    const newConfigurations = await window.arcc.app.workspace.configurations.delete(configurationId);
    dispatch(configurationsUpdated(newConfigurations));
}

export default ConfigurationsSlice.reducer;