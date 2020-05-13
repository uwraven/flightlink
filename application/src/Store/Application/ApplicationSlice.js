import { createSlice } from '@reduxjs/toolkit';

const ApplicationSlice = createSlice({
    name: 'application',
    initialState: {
        loadingWorkspaces: false,
        workspacesLoaded: false,
        selectedWorkspace: null,
        creatingWorkspace: false,
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
        setCreatingWorkspace(state, action) {
            state.creatingWorkspace = action.payload;
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
    setCreatingWorkspace,
    setSelectedWorkspace,
    setWorkspaces
} = ApplicationSlice.actions;

export default ApplicationSlice.reducer;

export const loadWorkspaces = () => async (dispatch) => {
    dispatch(setLoadingWorkspacesStart())
    const response = await window.arcc.app.getWorkspaces();
    dispatch(setWorkspaces(response))
}

export const createWorkspace = () => async (dispatch) => {
    dispatch(setCreatingWorkspace(true));
    const response = await window.arcc.app.createWorkspace();
    console.log("RESPONSE", response);
    dispatch(setCreatingWorkspace(false));
    dispatch(loadWorkspaces())
}

export const openSelectedWorkspace = (id) => async (dispatch) => {
    // ipcRenderer.send(APP.OPEN_SELECTED_WORKSPACE);
}