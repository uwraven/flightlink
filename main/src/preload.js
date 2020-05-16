const api = require('./API/index.js');
const args = process.argv;
const id = args.find(arg => {
    return arg.split('=').includes("--workspace-id")
})
window.arcc = api;
window.arcc['workspaceId'] = id.split('=')[1];

