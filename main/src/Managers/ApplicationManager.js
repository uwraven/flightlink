const WorkspaceManager = require('./workspaceManager');
const { BrowserWindow, dialog, app } = require('electron');
const { APP } = require('../API/constants');
const fs = require('fs');
const path = require('path');
const Store = require('../ApplicationData/store');
const ApplicationDefaults = require('../ApplicationData/Defaults/ApplicationDefaults.json');

function ApplicationManager() {

    let launcherWindow;

    this.store = new Store(`${app.getPath('userData')}/application.json`);
    this.workspaces = {};
    this.webPreferences = {};

    const launch = () => {
        launcherWindow = new BrowserWindow({
            width: 600,
            height: 450,
            webPreferences: {
                ...this.webPreferences, 
            },
            resizable: false,
            frame: false
        });
        launcherWindow.loadURL('http://localhost:3000/index.html/#splash')
    }

    const getDirectoryPath = async (window) => {
        try {
           const result = await dialog.showOpenDialog(window, {
                title: "",
                defaultPath: app.getPath('desktop'),
                properties: ["openDirectory", "createDirectory"]
            });
            return result;
        } catch(err) {
            throw Error(err);
        }
    }
    
    this.onReady = async () => {
        try {
            if (!this.store.exists()) {
                this.store.contents = {...ApplicationDefaults}
                await this.store.save();
            } 
            await this.store.load();
            if (this.store.contents.workspaces.open.length > 0) {
                console.log(this.store.contents.workspaces.open);
                this.store.contents.workspaces.open.map((id) => {
                    this.onOpenWorkspaceById(null, id);
                })
            } else {
                launch();
            }
            console.log(this.store.contents);
        } catch(err) {
            console.log("Error on ready", err);
        }
    }

    this.onWillFinishLaunching = async () => {}

    this.onWindowAllClosed = async () => {}

    this.onActivate = async () => {}

    this.onBeforeQuit = async () => {
        try {
            await this.store.save();
        } catch(err) {
            console.log(err);
        }
    }

    this.onUserQuit = async () => {
        app.quit();
    }

    this.onGetWorkspaceReferences = async (event, payload) => {
        const { entities, all } = this.store.contents.workspaces;
        const existingWorkspaces = all.filter((id) => {
            const path = entities[id].path;
            return fs.existsSync(path);
        })

        let existingEntities = {};
        Object.values(entities).filter(entity => {
            if (existingWorkspaces.includes(entity.id)) existingEntities[entity.id] = entity;
        })
        
        return {
            entities: existingEntities,
            all: existingWorkspaces
        }
    }

    this.onCreateWorkspace = async (event, payload) => {
        try {
            let { canceled, filePaths } = await getDirectoryPath(launcherWindow);
            if (canceled) return false;
            let workspaceDirectory = filePaths[0];
            let workspaceReference = await WorkspaceManager.createWorkspace(workspaceDirectory);
            this.store.contents.workspaces.entities[workspaceReference.id] = workspaceReference;
            this.store.contents.workspaces.all.push(workspaceReference.id);
            await this.store.save();
            await this.onOpenWorkspaceById(null, workspaceReference.id);
            return workspaceReference;
        } catch(err) {
            console.log("Error onCreateWorkspace", err);
        }
    }

    this.onOpenWorkspaceById = async (event, payload) => {
        try {
            let id = payload;
            let workspaceReference = this.store.contents.workspaces.entities[id];
            let workspaceManager = new WorkspaceManager(workspaceReference);
            this.workspaces[id] = workspaceManager;
            await workspaceManager.load();
            await workspaceManager.open(this.webPreferences);

            if (!this.store.contents.workspaces.open.includes(id)) {
                this.store.contents.workspaces.open.push(id);
                await this.store.save();
            }

            if (launcherWindow) launcherWindow.close();
        } catch(err) {
            console.log("Error opening workspace by id:", err);
        }
    }

    this.onWorkspaceEvent = async (event, { channel, workspaceId, payload }) => {
        try {
            let workspace = this.workspaces[workspaceId];
            return await workspace.handle(event, channel, payload);
        } catch(err) {
            console.log("Error onWorkspaceEvent", err);
        }
    }
}

module.exports = ApplicationManager;