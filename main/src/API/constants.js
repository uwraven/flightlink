const APP = {
    GET_WORKSPACES: "app.getWorkspaces",
    OPEN_WORKSPACE_BY_ID: "app.openWorkspaceById",
    CREATE_WORKSPACE: "app.createWorkspace",
    SAVE_WORKSPACE: "app.saveWorkspace"
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

