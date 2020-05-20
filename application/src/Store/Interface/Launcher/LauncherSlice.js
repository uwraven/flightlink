import { createSlice } from '@reduxjs/toolkit';
import { getWorkspaceReferences } from 'Store/Data/Application/Application';

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
    const response = await window.arcc.app.createWorkspace();
    dispatch(getWorkspaceReferences())
    dispatch(setCreatingWorkspace(false));
}