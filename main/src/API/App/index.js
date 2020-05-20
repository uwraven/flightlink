const { APP, WORKSPACE } = require('../constants');
const { inject, injectWorkspaceEvent } = require('../inject'); 

module.exports = {
    getWorkspaceReferences: inject(APP.GET_WORKSPACE_REFERENCES),
    createWorkspace: inject(APP.CREATE_WORKSPACE),
    openWorkspace: inject(APP.OPEN_WORKSPACE),
    workspace: {
        get: injectWorkspaceEvent(WORKSPACE.GET),
        configurations: {
            create: injectWorkspaceEvent(WORKSPACE.CONFIGURATIONS.CREATE),
            edit: injectWorkspaceEvent(WORKSPACE.CONFIGURATIONS.EDIT),
            delete: injectWorkspaceEvent(WORKSPACE.CONFIGURATIONS.DELETE)
        },
        signals: {
            create: injectWorkspaceEvent(WORKSPACE.SIGNALS.CREATE),
        }
    },
    quit: inject(APP.QUIT),
}
