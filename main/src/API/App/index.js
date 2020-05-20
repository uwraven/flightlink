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
            update: injectWorkspaceEvent(WORKSPACE.CONFIGURATIONS.UPDATE),
            delete: injectWorkspaceEvent(WORKSPACE.CONFIGURATIONS.DELETE)
        },
        signals: {
            create: injectWorkspaceEvent(WORKSPACE.SIGNALS.CREATE),
            update: injectWorkspaceEvent(WORKSPACE.SIGNALS.UPDATE),
            delete: injectWorkspaceEvent(WORKSPACE.SIGNALS.DELETE)
        }
    },
    quit: inject(APP.QUIT),
}
