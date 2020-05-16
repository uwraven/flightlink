const { ipcRenderer } = require('electron');

async function createWorkspace() {
    return new Promise((resolve, reject) => {
        try {
            ipcRenderer.send(APP.CREATE_WORKSPACE);
            ipcRenderer.once(APP.CREATE_WORKSPACE, (event, response) => resolve(response));
        } catch(err) {
            reject(err);
        }
    })
}

async function getWorkspaces() {
    return new Promise((resolve, reject) => {
        try {
            ipcRenderer.send(APP.GET_WORKSPACES);
            ipcRenderer.once(APP.GET_WORKSPACES, (event, response) => resolve(response));
        } catch(err) {
            reject(err);
        }
    })
}

async function openWorkspaceById(id) {
    return new Promise((resolve, reject) => {
        try {
            ipcRenderer.send(APP.OPEN_WORKSPACE_BY_ID, id);
            ipcRenderer.once(APP.OPEN_WORKSPACE_BY_ID, (event, response) => resolve(response))
        } catch(err) {
            reject(err);
        }
    })
}


async function getWorkspaceById(id) {
    return new Promise((resolve, reject) => {
        try {
            ipcRenderer.send(APP.GET_WORKSPACE_BY_ID, id);
            ipcRenderer.once(APP.GET_WORKSPACE_BY_ID, (event, response) => resolve(response));
        } catch(err) {
            reject(err);
        }
    })
}

async function updateWorkspace(workspace) {
    return new Promise((resolve, reject) => {
        try {
            ipcRenderer.send(APP.UPDATE_WORKSPACE, workspace);
            ipcRenderer.once(APP.UPDATE_WORKSPACE, (event, response) => resolve(response));
        } catch(err) {
            reject(err);
        }
    })
}

async function saveWorkspaceById(id) {
    return new Promise((resolve, reject) => {
        try {
            ipcRenderer.send(APP.SAVE_WORKSPACE_BY_ID, id);
            ipcRenderer.once(APP.SAVE_WORKSPACE_BY_ID, (event, response) => resolve(response))
        } catch(err) {
            reject(err);
        }
    })
}

async function closeWorkspaceById(id) {
    return new Promise((resolve, reject) => {
        try {
            ipcRenderer.send(APP.CLOSE_WORKSPACE_BY_ID, id);
            ipcRenderer.once(APP.CLOSE_WORKSPACE_BY_ID, (event, response) => resolve(response))
        } catch(err) {
            reject(err);
        }
    })
}



module.exports = {
    getWorkspaces,
    getWorkspaceById,
    createWorkspace,
    updateWorkspace,
    openWorkspaceById,
    saveWorkspaceById,
    closeWorkspaceById,
}