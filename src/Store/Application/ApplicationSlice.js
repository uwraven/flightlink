import { createSlice } from '@reduxjs/toolkit';
import { APP } from '../../constants';
const { ipcRenderer } = window.require('electron');

const ApplicationSlice = createSlice({
    name: 'application',
    initialState: {
        loadingWorkspaces: false,
        workspacesLoaded: false,
        selectedWorkspace: null,
        workspaces: [],
    },
    reducers: {
        setLoadingWorkspacesStart(state, action) {
            state.loadingWorkspaces = action.payload;
        },
        setLoadingWorkspacesSuccess(state, action) {
            state.workspacesLoaded = true;
            state.loadingWorkspaces = false;
        },
        setLoadingWorkspacesFailed(state, action) {
            state.workspacesLoaded = false;
            state.loadingWorkspaces = false;
        },
        setWorkspaces(state, action) {
            state.workspaces = action.payload;
        },
        setSelectedWorkspace(state, action) {
            state.selectedWorkspace = action.payload;
        },
    }
})

export const {
    setLoadingWorkspaces,
    setLoadingWorkspacesStart,
    setLoadingWorkspacesSuccess,
    setLoadingWorkspacesFailed,
    setSelectedWorkspace,
    setWorkspaces
} = ApplicationSlice.actions;

export default ApplicationSlice.reducer;

export const loadWorkspaces = () => async (dispatch) => {
    ipcRenderer.send(APP.GET_WORKSPACES)
    dispatch(setLoadingWorkspacesStart)
}

export const openSelectedWorkspace = (id) => async (dispatch) => {
    ipcRenderer.send(APP.OPEN_SELECTED_WORKSPACE);
}