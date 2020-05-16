import { createSlice } from '@reduxjs/toolkit';

const ApplicationSlice = createSlice({
    name: 'application',
    initialState: {
        loadingWorkspaces: false,
        workspacesLoaded: false,
        selectedWorkspace: null,
        creatingWorkspace: false,
        workspaceEntities: [],
        workspaceIds: {}
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
        setCreatingWorkspace(state, action) {
            state.creatingWorkspace = action.payload;
        },
        setWorkspaces(state, action) {
            const {entities, all} = action.payload
            state.workspaceEntities = entities;
            state.workspaceIds = all;
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
    setCreatingWorkspace,
    setSelectedWorkspace,
    setWorkspaces,
} = ApplicationSlice.actions;

export default ApplicationSlice.reducer;

export const loadWorkspaces = () => async (dispatch) => {
    dispatch(setLoadingWorkspacesStart())
    const workspaces = await window.arcc.app.getWorkspaces();
    dispatch(setLoadingWorkspacesSuccess());
    dispatch(setWorkspaces(workspaces))
}

export const createWorkspace = () => async (dispatch) => {
    dispatch(setCreatingWorkspace(true));
    const response = await window.arcc.app.createWorkspace();
    dispatch(setCreatingWorkspace(false));
    dispatch(loadWorkspaces())
}

export const openSelectedWorkspace = (id) => async (dispatch) => {
    console.log("open selected", id);
    const response = await window.arcc.app.openWorkspace(id)
    console.log(response);
}

export const quitApplication = () => async (dispatch) => {
    await window.arcc.app.quitApplication();
}