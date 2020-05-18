const api = require('./API/index.js');
const args = process.argv;
const id = args.find(arg => {
    return arg.split('=').includes("--workspace-id")
})
console.log("PRELOAD")
window.arcc = {
    ...api,
    workspaceId: id ? id.split('=')[1] : ''
};

