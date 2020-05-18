const { APP, WORKSPACE } = require('../constants');
const { inject } = require('../inject'); 

module.exports = {
    workspace: {
        create: inject(WORKSPACE.CREATE),
        open: inject(WORKSPACE.OPEN),
        get: inject(WORKSPACE.GET),
    },
    getWorkspaceReferences: inject(APP.GET_WORKSPACE_REFERENCES),
    quit: inject(APP.QUIT),
}
