import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit'
import { configurationsUpdated } from './Configurations';
import { loadSignals } from './Signals';

const WorkspaceSlice = createSlice({
    name: 'workspace',
    initialState: {
        id: "",
        name: "",
    },
    reducers: {
        loadWorkspaceName(state, action) {
            state.name = action.payload;
        },
    }
})

export const {
    loadWorkspaceName
} = WorkspaceSlice.actions;

export default WorkspaceSlice.reducer;

export const getWorkspace = () => async (dispatch) => {
    const {
        configurations,
        signals,
        name
    } = await window.arcc.app.workspace.get();
    dispatch(loadWorkspaceName(name));
    dispatch(configurationsUpdated(configurations));
    dispatch(loadSignals(signals));
    // dispatch(setCommands(commands));
}