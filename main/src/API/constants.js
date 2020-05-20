const APP = {
    GET_WORKSPACE_REFERENCES: "app.getWorkspaceReferences",
    CREATE_WORKSPACE: "app.createWorkspace",
    OPEN_WORKSPACE: "app.openWorkspace",
    WORKSPACE_EVENT: "app.workspaceEvent",
    QUIT: 'app.quit'
}

const WORKSPACE = {
    GET: 'workspace.get',
    SAVE: 'workspace.save',
    CLOSE: 'workspace.close',
    CONFIGURATIONS: {
        CREATE: 'workspace.configurations.create',
        UPDATE: 'workspace.configurations.update',
        DELETE: 'workspace.configurations.delete',
    },
    SIGNALS: {
        CREATE: 'workspace.signals.create',
        UPDATE: 'workspace.signals.update',
        DELETE: 'workspace.signals.delete',
    }
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

