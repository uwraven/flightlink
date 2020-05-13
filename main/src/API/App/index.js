const { ipcRenderer } = require('electron');
const { APP } = require('../constants');

async function getWorkspaces() {
    return new Promise((resolve, reject) => {
        try {
            const onGetWorkspaces = (event, response) => {
                ipcRenderer.removeListener(APP.GET_WORKSPACES, onGetWorkspaces);
                resolve(response);
            }
            ipcRenderer.send(APP.GET_WORKSPACES);
            ipcRenderer.on(APP.GET_WORKSPACES, onGetWorkspaces);
        } catch(err) {
            reject(err);
        }
    })
}

async function createWorkspace() {
    return new Promise((resolve, reject) => {
        try {
            const onCreateWorkspace = (event, response) => {
                ipcRenderer.removeListener(APP.CREATE_WORKSPACE, onCreateWorkspace)
                resolve(response);
            }
            ipcRenderer.send(APP.CREATE_WORKSPACE);
            ipcRenderer.on(APP.CREATE_WORKSPACE, onCreateWorkspace);
        } catch(err) {
            reject(err);
        }
    })
}

async function openWorkspace(id) {
    return new Promise((resolve, reject) => {
        try {
            const onOpenWorkspace = (event, response) => {
                ipcRenderer.removeListener(APP.OPEN_WORKSPACE_BY_ID, onOpenWorkspace);
                resolve(response);
            }
            ipcRenderer.send(APP.OPEN_WORKSPACE_BY_ID, id);
            ipcRenderer.on(APP.OPEN_WORKSPACE_BY_ID, onOpenWorkspace)
        } catch(err) {
            reject(err);
        }
    })
}

module.exports = {
    getWorkspaces,
    createWorkspace,
    openWorkspace
}
