const { ipcRenderer } = require('electron');
const { APP } = require('./constants');

inject = (channel) => {
    return async function(args) {
        return await ipcRenderer.invoke(channel, args)
    }
}

injectWorkspaceEvent = (channel) => {
    return async function(payload) {
        const args = {
            workspaceId: window.arcc.workspaceId,
            channel: channel,
            payload: payload
        };
        return await ipcRenderer.invoke(APP.WORKSPACE_EVENT, args);
    }
}

module.exports = {
    inject,
    injectWorkspaceEvent
}
