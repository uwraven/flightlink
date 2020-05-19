import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit'
import { setConfigurations } from './Configurations';
import { setSignals } from './Signals';

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
    const response = await window.arcc.app.workspace.get(window.arcc.workspaceId);
    dispatch(loadWorkspaceName(response.name));
    dispatch(setConfigurations(response.configurations));
    dispatch(setSignals(response.signals));
    // dispatch(setCommands(commands));
}