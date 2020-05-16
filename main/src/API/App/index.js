const { ipcRenderer } = require('electron');
const { APP } = require('../constants');

async function quitApplication() {
    console.log("quit");
    return new Promise((resolve, reject) => {
        try {
            ipcRenderer.send(APP.QUIT)
            resolve();
        } catch(err) {
            reject(err);
        }
    })
}

module.exports = {
    getWorkspaces,
    createWorkspace,
    openWorkspace,
    getWorkspaceById,
    quitApplication
}
