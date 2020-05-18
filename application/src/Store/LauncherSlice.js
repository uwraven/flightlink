import { createSlice } from '@reduxjs/toolkit';
import { getWorkspaceReferences } from 'Store/ApplicationSlice';

const LauncherSlice = createSlice({
    name: 'launcher',
    initialState: {
        selectedWorkspaceId: "",
        creatingWorkspace: false,
    },
    reducers: {
        setSelectedWorkspaceId(state, action) {
            state.selectedWorkspaceId = action.payload
        },
        setCreatingWorkspace(state, action) {
            state.creatingWorkspace = action.payload
        }
    }
})

export const {
    setSelectedWorkspaceId,
    setCreatingWorkspace
} = LauncherSlice.actions;

export default LauncherSlice.reducer;

export const createWorkspace = () => async (dispatch) => {
    dispatch(setCreatingWorkspace(true));
    const response = await window.arcc.app.workspace.create();
    dispatch(getWorkspaceReferences())
    dispatch(setCreatingWorkspace(false));
}