const { ipcRenderer } = require("electron")
const { APP, WORKSPACE } = require('../constants');


const contextEvent = async function (payload) {
    return new Promise((resolve, reject) => {
        ipcRenderer.invoke(APP.WORKSPACE_EVENT, {
            workspaceId: window.arcc.workspaceId,
            channel: WORKSPACE.CONTEXT,
            payload: payload,
        }).then((channelId) => {
            ipcRenderer.on(channelId, (event, response) => {
                resolve(response);
            })
        });
    })
}

module.exports = { 
    contextEvent
}