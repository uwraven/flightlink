const { ipcRenderer } = require('electron');
const { APP } = require('./constants');

inject = (channel) => {
    return async function(args) {
        const response = await ipcRenderer.invoke(channel, args)
        return response;
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
