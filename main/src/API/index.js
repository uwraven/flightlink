const {
    openNewSocket,
    sendMessage,
    closeSocket,
    attachListener,
    removeListener
} = require('./Socket/index');

const {
    getWorkspaces,
    createWorkspace,
    openWorkspace
} = require('./App/index');

module.exports = {
    socket: {
        openNewSocket,
        sendMessage,
        closeSocket,
        attachListener,
        removeListener
    },
    app: {
        getWorkspaces,
        createWorkspace,
        openWorkspace
    }
}