
// returns object with 'prefix/key' formatted values
const prepend = (prefix, obj) => {
    let newObj = {};
    Object.keys(obj).map(key => {
        newObj[key] = `${prefix}/${obj[key]}`;
    })
    return newObj;
}

const APP = prepend('app', {
    GET_WORKSPACE_REFERENCES: "getWorkspaceReferences",
    CREATE_WORKSPACE: "createWorkspace",
    OPEN_WORKSPACE: "openWorkspace",
    WORKSPACE_EVENT: "workspaceEvent",
    QUIT: 'quit'
});

const WORKSPACE = prepend('workspace', {
    GET: 'get',
    SAVE: 'save',
    CLOSE: 'close',
    CONTEXT: 'context',
    CONFIGURATIONS: prepend('configurations', {
        CREATE: 'create',
        UPDATE: 'update',
        DELETE: 'delete',
        DUPLICATE: 'duplicate'
    }),
    SIGNALS: prepend('signals', {
        CREATE: 'create',
        UPDATE: 'update',
        DELETE: 'delete',
    })
});

const TRANSPORT = prepend('transport', {
    SERIAL: prepend('serial', {
        KEY: "serial",
        LIST: "list",
        OPEN: "open",
        CLOSE: "close",
        WRITE: "write",
        PARSER: prepend('parser', {
            BYTE: "byte",
            
        })
    }),
    MQTT: prepend('mqtt', {
        KEY: "mqtt",
        CONNECT: "connect",
        PUBLISH: "publish",
        SUBSCRIBE: "subscribe",
        UNSUBSCRIBE: "unsubscribe",
    }),
    CREATE: "create",
    DELETE: "delete",
    ACTION: "action"
})

module.exports = {
    APP,
    WORKSPACE,
    TRANSPORT
}

