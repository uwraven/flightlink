import { createSlice } from '@reduxjs/toolkit';

const ApplicationSlice = createSlice({
    name: 'application',
    initialState: {
        workspaceReferenceEntities: [],
        workspaceReferenceIds: {},
    },
    reducers: {
        setWorkspaceReferences(state, action) {
            const {entities, all} = action.payload
            state.workspaceReferenceEntities = entities;
            state.workspaceReferenceIds = all;
        },
    }
})

export const {
    setWorkspaceReferences,
} = ApplicationSlice.actions;

export default ApplicationSlice.reducer;

export const getWorkspaceReferences = () => async (dispatch) => {
    const workspaceReferences = await window.arcc.app.getWorkspaceReferences();
    dispatch(setWorkspaceReferences(workspaceReferences))
}

export const openWorkspace = (id) => async (dispatch) => {
    console.log(id);
    const response = await window.arcc.app.workspace.open(id);
}

export const quitApplication = () => async (dispatch) => {
    await window.arcc.app.quit();
}