import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit'
import ConfigurationsSlice, { setConfigurations } from './ConfigurationsSlice';
// import SignalsSlice, { setSignals } from './SignalsSlice';
// import CommandsSlice, { setCommands } from './CommandsSlice';
// import WorkspaceSlice from './WorkspaceSlice';

const WorkspaceSlice = createSlice({
    name: 'workspace',
    initialState: {
        name: ''
    },
    reducers: {
        onChangeWorkspaceName(state, action) {
            state.name = action.payload;
        }
    }
})

const ConfigurationSlice = createSlice({
    name: 'configuration',
    initialState: {
        configurationEntities: {},
        configurationIds: []
    },
    reducers: {
        onLoadConfigurations(state, action) {
            const { entities, all } = action.payload;
            state.configurationEntities = entities;
            state.configurationIds = all;
        }
    }
})

const SignalSlice = createSlice({
    name: 'configuration',
    initialState: {
        signalEntities: {},
        signalIds: []
    },
    reducers: {
        onLoadSignals(state, action) {
            const { entities, all } = action.payload;
            state.signalEntities = entities;
            state.signalIds = all;
        }
    }
})
