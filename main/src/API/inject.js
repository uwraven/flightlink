const { ipcRenderer } = require('electron');

inject = (channel) => {
    return async function(args) {
        const response = await ipcRenderer.invoke(channel, args)
        return response;
    }
}

module.exports = {
    inject
}
