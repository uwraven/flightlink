const APP = {
    GET_WORKSPACES: "app.getWorkspaceIds",
    OPEN_WORKSPACE_BY_ID: "app.openWorkspaceById",
    GET_WORKSPACE_BY_ID: 'app.getWorkspaceById',
    CREATE_WORKSPACE: "app.createWorkspace",
    SAVE_WORKSPACE_BY_ID: "app.saveWorkspaceById",
    UPDATE_WORKSPACE: "app.updateWorkspace",
    CLOSE_WORKSPACE_BY_ID: "app.closeWorkspaceById",
    QUIT: 'app.quit'
}

const SOCKET = {
    DATA: "socket.data",
    COMMAND: "socket.command",
    RESPONSE: "socket.response"
}

const SERIAL = {
    LIST_SERIAL_PORTS: "serial.listSerialPorts",
    OPEN_SERIAL_PORT: "serial.openPort",
    CLOSE_SERIAL: "serial.closePort",
    REQUESTS: {
        ACTION: "serial.requests.action",
        COMMAND: "serial.requests.command",
        DATA: "serial.requests.data"
    },
    ACTIONS: {
        LISTSERIAL: "serial.actions.listserial",
        OPENSERIAL: "serial.actions.openserial",
        CLOSESERIAL: "serial.actions.closeserial"
    }
}

module.exports = {
    APP,
    SOCKET,
    SERIAL
}

