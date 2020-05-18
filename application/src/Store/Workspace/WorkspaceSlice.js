import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit'

const WorkspaceSlice = createSlice({
    name: 'workspace',
    initialState: {
        id: "",
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

export default WorkspaceSlice.reducer;

export const getWorkspace = () => async (dispatch) => {
    const {
        configurations,
        commands,
        recording,
        signals,
    } = await window.arcc.app.workspace.get(window.arcc.workspaceId);
    console.log("configurations", configurations)
    // dispatch(setConfigurations(configurations));
    // dispatch(setSignals(signals));
    // dispatch(setCommands(commands));
}