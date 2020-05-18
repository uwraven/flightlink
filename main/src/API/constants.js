const APP = {
    GET_WORKSPACE_REFERENCES: "app.getWorkspaceReferences",
    QUIT: 'app.quit'
}

const WORKSPACE = {
    GET: 'workspace.getWorkspace',
    SAVE: 'workspace.save',
    CREATE: 'workspace.create',
    CLOSE: 'workspace.close',
    OPEN: 'workspace.open'
};

const FLIGHTLINK = {
    DATA: "socket.data",
    COMMAND: "socket.command",
    RESPONSE: "socket.response"
}

const SERIAL = {
    LIST: "serial.list",
    OPEN: "serial.open",
    CLOSE: "serial.close",
}

module.exports = {
    APP,
    WORKSPACE,
    FLIGHTLINK,
    SERIAL
}

