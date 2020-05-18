const {app, BrowserWindow, dialog, ipcMain, Menu, MenuItem } = require('electron');
const fs = require('fs');
const path = require('path');
const isDev = require('electron-is-dev');
const Store = require('./ApplicationData/store');
const { APP, WORKSPACE } = require('./API/constants');
const ApplicationManager = require('./Managers/ApplicationManager');

let applicationStore;
let splashWindow;

const webPreferences = {
    allowRunningInsecureContent: false,
    // contextIsolation: true,
    enableRemoteModule: false,
    nativeWindowOpen: false,
    nodeIntegration: false,
    nodeIntegrationWorker: false,
    nodeIntegrationInSubFrames: false,
    safeDialogs: true,
    // sandbox: true,
    webSecurity: true,
    webviewTag: false,
    preload: path.join(__dirname, 'preload.js')
}

let applicationManager = new ApplicationManager()
applicationManager.webPreferences = webPreferences;

app.on('ready', applicationManager.onReady);
app.on('will-finish-launching', applicationManager.onWillFinishLaunching);
app.on('window-all-closed', applicationManager.onWindowAllClosed);
app.on('activate', applicationManager.onActivate);
app.on('before-quit', applicationManager.onBeforeQuit);
 
ipcMain.handle(APP.GET_WORKSPACE_REFERENCES, applicationManager.onGetWorkspaceReferences)
ipcMain.handle(WORKSPACE.CREATE, applicationManager.onCreateWorkspace)
ipcMain.handle(WORKSPACE.OPEN, applicationManager.onOpenWorkspaceById)
ipcMain.handle(WORKSPACE.GET, applicationManager.onGetWorkspaceById)
ipcMain.handle(APP.QUIT, applicationManager.onUserQuit)

async function onOpenWorkspaceById(event, arg) {

    let id = arg;
    let workspace = applicationStore.contents.workspaces.entities[id];

    if (workspace) {
        let workspaceWindow, workspaceWorker;

        if (true) {

            // Close splash screen if still open
            splashWindow.close()

            // Instantiate workspace window
            workspaceWindow = new BrowserWindow({
                width: 1200,
                height: 800,
                webPreferences: {
                    additionalArguments: [`--workspace-id=${id}`],
                    ...webPreferences},
                backgroundColor: `#ffffff`,
            })

            // Instantiate workspace worker
            workspaceWorker = new BrowserWindow({
                show: false,
                webPreferences: {
                    nodeIntegration: true,
                    additionalArguments: [id],
                    ...webPreferences }
            })

            workspaceWindow.loadURL(`http://localhost:3000/index.html/#app`).then(result => {
                // workspaceWindow.webContents.openDevTools();
            })

            workspaceWorker.loadURL('http://localhost:3000/backgroundWorker.html').then(result => {
                
            })            

            return true;
            
        } else {
            // workspace path can't be loaded, open to splash screen
            return false;
        }
    }
}

async function onGetWorkspaceById(event, arg) {
    console.log("onGetWorkspaceById arg:", arg);
    let id = arg;
    const workspace = applicationStore.contents.workspaces.entities[id];
    console.log(workspace)
    try {
        let workspaceStore = new Store(workspace.path);
        await workspaceStore.load();
        event.reply(APP.GET_WORKSPACE_BY_ID, workspaceStore.contents);
    } catch(err) {
        throw err;
    }
}

async function loadApplicationStore() {
    let userDataPath = app.getPath('userData');
    let applicationStorePath = `${userDataPath}/application.json`;
    applicationStore = new Store(applicationStorePath);

    try {
        await applicationStore.load()
        // application defaults loaded into memory properly
        // map stored workspaces and check that they exist before making available to UI
        applicationStore.contents.workspaces.all.filter((id) => {
            const workspace = applicationStore.contents.workspaces.entities[id];
            return fs.existsSync(workspace.path);
        })
        await applicationStore.save();
        return;
    } catch(err) {
        applicationStore.contents = {...ApplicationDefaults};
        fs.writeFile(applicationStorePath, JSON.stringify(ApplicationDefaults), (err) => {
            if (err) throw err;
        });
        return;
    }
    
}
