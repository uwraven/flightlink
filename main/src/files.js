const WorkspaceDefault = require('./ApplicationData/Defaults/WorkspaceDefaults.json');
const uuid = require('uuid');
const fs = require('fs');

async function createWorkspaceFile(directoryPath) {
    return new Promise((resolve, reject) => {
        
        // Get workspace default object
        const workspace = {...WorkspaceDefault};

        // Create a new uuid for the workspace
        let id = uuid.v1();
        workspace.id = id;

        // Generate the workspace name from the enclosing directory
        const [ name ] = directoryPath.split('/').slice(-1);

        // Get the file path
        path = `${directoryPath}/workspace.json`;

        // Check that no workspace exists at this location already
        if (!fs.existsSync(path)) {
            fs.writeFile(path, JSON.stringify(workspace), (err) => {
                if (err) { 
                    reject(err);
                } else {
                    resolve({
                        id: id,
                        name: name || "New Workspace",
                        path: path,
                        lastOpened: null,
                        open: false,
                    });
                }
            })
        } else {
            reject();
        }
    })
}

module.exports = {
    createWorkspaceFile
}