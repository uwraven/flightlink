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

const SERIAL = {
    LIST: "serial.list",
    OPEN: "serial.open",
    CLOSE: "serial.close",
}

const MQTT = {
    CONNECT: "mqtt.connect",
    PUBLISH: "mqtt.publish",
    SUBSCRIBE: "mqtt.subscribe",
    UNSUBSCRIBE: "mqtt.unsubscribe",
}

const TRANSPORTS = {
    SERIAL,
    MQTT
}

module.exports = {
    APP,
    WORKSPACE,
    TRANSPORTS
}

