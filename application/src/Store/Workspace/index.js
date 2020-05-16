import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit'
import ConfigurationsSlice, { setConfigurations } from './ConfigurationsSlice';
import SignalsSlice, { setSignals } from './SignalsSlice';
import CommandsSlice, { setCommands } from './CommandsSlice';

const WorkspaceSlice = createSlice({
    name: 'workspace',
    initialState: {
        id: window.arcc.workspaceId || "",
        name: "",
    },
    reducers: {
        setWorkspaceName(state, action) {
            state.name = action.payload;
        },
    }
})

export const {
    setWorkspaceName
} = WorkspaceSlice.actions;

export const getWorkspace = () => async (dispatch) => {
    const {
        configurations,
        commands,
        recording,
        signals,
    } = await window.arcc.app.getWorkspaceById(window.arcc.workspaceId);
    dispatch(setConfigurations(configurations));
    dispatch(setSignals(signals));
    dispatch(setCommands(commands));
}

export default combineReducers({
    ...WorkspaceSlice.reducer,
    configurations: ConfigurationsSlice,
    signals: SignalsSlice,
    commands: CommandsSlice
})