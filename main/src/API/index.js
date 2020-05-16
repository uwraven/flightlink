const {
    openNewSocket,
    sendMessage,
    closeSocket,
    attachListener,
    removeListener
} = require('./Socket/index');

const {
    quitApplication
} = require('./App/index');

const workspace = require('./App/workspace');

module.exports = {
    socket: {
        openNewSocket,
        sendMessage,
        closeSocket,
        attachListener,
        removeListener
    },
    app: {
        workspace: workspace,
        quitApplication
    }
}