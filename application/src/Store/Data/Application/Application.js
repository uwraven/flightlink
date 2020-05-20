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

export const getWorkspaceReferences = () => async (dispatch) => {
    const workspaceReferences = await window.arcc.app.getWorkspaceReferences();
    dispatch(setWorkspaceReferences(workspaceReferences))
}

export const openWorkspace = (id) => async (dispatch) => {
    await window.arcc.app.openWorkspace(id);
}

export const quitApplication = () => async (dispatch) => {
    await window.arcc.app.quit();
}

export default ApplicationSlice.reducer;
