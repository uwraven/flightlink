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
        setSelectedConfigurationId(state, action) {
            state.selectedConfigurationId = action.payload;
        },
        setConfigurations(state, action) {
            const { configurationEntities, configurationIds } = action.payload;
            state.configurationEntities = configurationEntities;
            state.configurationIds = configurationIds;
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