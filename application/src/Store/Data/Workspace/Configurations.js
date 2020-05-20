import { createSlice } from '@reduxjs/toolkit';

const ConfigurationsSlice = createSlice({
    name: 'configurations',
    initialState: {
        configurationEntities: {},
        configurationIds: [],
    },
    reducers: {
        loadConfigurations(state, action) {
            const { entities, all } = action.payload;
            state.configurationEntities = entities;
            state.configurationIds = all;
        },
    }
})

export const {
    loadConfigurations,
    deleteConfigurationById
} = ConfigurationsSlice.actions;

export const createConfiguration = () => async (dispatch) => {
    const newConfigurations = await window.arcc.app.workspace.configurations.create()
    dispatch(loadConfigurations(newConfigurations))
}

export default ConfigurationsSlice.reducer;