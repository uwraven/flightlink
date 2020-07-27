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
    CONTEXT: 'workspace.context',
    CONFIGURATIONS: {
        CREATE: 'workspace.configurations.create',
        UPDATE: 'workspace.configurations.update',
        DELETE: 'workspace.configurations.delete',
        DUPLICATE: 'workspace.configurations.duplicate'
    },
    SIGNALS: {
        CREATE: 'workspace.signals.create',
        UPDATE: 'workspace.signals.update',
        DELETE: 'workspace.signals.delete',
    }
};

const TRANSPORT = {
    SERIAL: {
        LIST: "transport.serial.list",
        OPEN: "transport.serial.open",
        CLOSE: "transport.serial.close",
        WRITE: "transport.serial.write",
        FLUSH: "transport.serial.flush"
    },
    MQTT: {
        CONNECT: "transport.mqtt.connect",
        PUBLISH: "transport.mqtt.publish",
        SUBSCRIBE: "transport.mqtt.subscribe",
        UNSUBSCRIBE: "transport.mqtt.unsubscribe",
    },
    CREATE: "transport.create",
    DELETE: "transport.delete",
    ACTION: "transport.action"
}

module.exports = {
    APP,
    WORKSPACE,
    TRANSPORT
}

