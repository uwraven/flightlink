const { dialog, app, BrowserWindow } = require("electron");
const uuid = require('uuid');
const WorkspaceDefault = require('../ApplicationData/Defaults/WorkspaceDefaults.json');
const fs = require("fs");
const Store = require('../ApplicationData/store');
const { WORKSPACE } = require('../API/constants');

function WorkspaceManager(reference) {
    
    this.store = new Store(reference.path);
    this.loaded = false;
    this.window = null;
    this.worker = null;

    this.load = async () => {
        try {
            await this.store.load();
            this.loaded = true;
        } catch(err) {
            this.loaded = false;
        }
    }

    this.open = async (webPreferences) => {
        try {
            this.window = new BrowserWindow({
                width: 1200,
                height: 800,
                webPreferences: {
                    ...webPreferences,
                    additionalArguments: [`--workspace-id=${reference.id}`]
                }
            })
            this.worker = new BrowserWindow({
                show: false,
                webPreferences: {
                    ...webPreferences,
                    nodeIntegration: true,
                    additionalArguments: [`--workspace-id=${reference.id}`]
                }
            })
            await Promise.all([
                this.window.loadURL(`http://localhost:3000/index.html/#app`),
                this.worker.loadURL(`http://localhost:3000/backgroundWorker.html`)
            ]);
        } catch(err) {
            console.log("Error opening workspace:", err);
        }
    }

    this.get = () => {
        return this.store.contents;
    }

    this.createConfiguration = async () => {
        console.log("createConfiguration")
        try {
            let id = uuid.v1();
            const newConfiguration = {
                id: id,
                name: "New Configuration",
                signals: []
            }
            this.store.contents.configurations.entities[id] = newConfiguration;
            this.store.contents.configurations.all.push(id);
            await this.store.save();
            return this.store.contents;
        } catch(err) {
            console.log("Error creating configuration", err);
        }
    }

    this.save = async () => {
        try {
            await this.store.save();
        } catch(err) {
            console.log("Error saving workspace:", err);
        }
    }

    this.close = async () => {
        try {
            await this.saveWorkspace();
            this.window.close();
            this.worker.close();
        } catch(err) {
            console.log("Error closing workspace", err);
        }
    }

    const get = () => {
        return this.store.contents;
    }

    const createConfiguration = async () => {
        try {
            let id = uuid.v1();
            const newConfiguration = {
                id: id,
                name: "New Configuration",
                signals: []
            }
            this.store.contents.configurations.entities[id] = newConfiguration;
            this.store.contents.configurations.all.push(id);
            await this.store.save();
            return this.store.contents.configurations;
        } catch(err) {
            console.log("Error creating configuration", err);
        }
    }

    const createSignal = async (configurationId) => {
        try {
            const configuration = this.store.contents.configurations.entities[configurationId];
            let bufferIndex = 0;
            if (configuration.signals.length > 0) {
                let precedingSignal = this.store.contents.signals.entities[configuration.signals.slice(-1)];
                bufferIndex = precedingSignal.bufferIndex + precedingSignal.length
            };
            let id = uuid.v1();
            const newSignal = {
                id: id,
                name: "New Signal",
                units: "",
                bufferIndex: bufferIndex,
                length: 3,
                stream: false,
                render: false,
                signalMode: null,
                renderMode: null,
                rendererdModelId: null,
                parentId: null
            }
            this.store.contents.signals.entities[id] = newSignal;
            this.store.contents.signals.all.push(id);
            this.store.contents.configurations.entities[configurationId].signals.push(id);
            await this.store.save();
            return this.store.contents;
        } catch(err) {
            console.log("Error creating signal", err);
        }
    }

    this.actions = {
        [WORKSPACE.GET]: get,
        [WORKSPACE.CONFIGURATIONS.CREATE]: createConfiguration,
        [WORKSPACE.SIGNALS.CREATE]: createSignal
    }

    this.handle = async (channel, payload) => await this.actions[channel](payload);
}

WorkspaceManager.createWorkspace = async (path) => {
    try {
        let newWorkspace = {...WorkspaceDefault};
        let name = path.split('/').slice(-1)[0] || "New Workspace";
        let fullPath = `${path}/workspace.json`;
        let id = uuid.v1();

        newWorkspace.id = id;
        newWorkspace.name = name;

        let store = new Store(fullPath);
        store.contents = newWorkspace;
        if (!store.exists()) await store.save();

        return {
            id: id,
            path: fullPath,
            name: name,
            lastOpened: null,
            open: false
        }
    } catch(err) {
        console.log("Error creating workspace: ", err);
    }
}

module.exports = WorkspaceManager;