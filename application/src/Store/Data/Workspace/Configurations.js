import { createSlice } from '@reduxjs/toolkit';
import uuid from 'uuid';

const ConfigurationsSlice = createSlice({
    name: 'configurations',
    initialState: {
        configurationEntities: {},
        configurationIds: [],
        selectedConfigurationId: "",
    },
    reducers: {
        setConfigurations(state, action) {
            const { entities, all } = action.payload;
            state.configurationEntities = entities;
            state.configurationIds = all;
        },
        createConfiguration(state, action) {
            let id = uuid.v1();
            let newConfiguration = {
                id: id,
                name: "",
                signals: []
            }
            state.configurationEntities = {...state.configurationEntities, [id]: newConfiguration }
            state.configurationIds = [...state.configurationIds, id];
        },
        deleteConfigurationById(state, action) {
            // TODO
        },
    }
})

export const {
    setSelectedConfigurationId,
    setConfigurations,
    createConfiguration,
    deleteConfigurationById
} = ConfigurationsSlice.actions;

export default ConfigurationsSlice.reducer;