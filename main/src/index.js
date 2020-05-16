const {app, BrowserWindow, dialog, ipcMain, Menu, MenuItem } = require('electron');
const fs = require('fs');
const path = require('path');
const isDev = require('electron-is-dev');
const { Store } = require('./ApplicationData/store');
const ApplicationDefaults = require('./ApplicationData/Defaults/applicationDefaults.json');
const WorkspaceDefaults = require('./ApplicationData/Defaults/WorkspaceDefaults.json');
const uuid = require('uuid');
const { APP, SERIAL } = require('./API/constants');
const { createWorkspaceFile } = require('./files');

let applicationStore;
let workspaceStores = {};
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

app.on('ready', startup);
// app.on('ready', openEmptyApplicationWindow)

app.on('will-finish-launching', () => {

})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {})

ipcMain.on(APP.GET_WORKSPACES, onGetWorkspaces)
ipcMain.on(APP.CREATE_WORKSPACE, onCreateWorkspace)
ipcMain.on(APP.OPEN_WORKSPACE_BY_ID, onOpenWorkspaceById)
ipcMain.on(APP.GET_WORKSPACE_BY_ID, onGetWorkspaceById)
ipcMain.on(APP.QUIT, onQuitApplication)

async function startup() {
    // Async get data from the application store json
    await loadApplicationStore()
    openSplash();

    // if (applicationStore.contents.workspace.open.length > 0) {
    //     // Application store contains previously open workspaces
    //     // Open previously open workspaces rather than send user to the splash screen
    //     applicationStore.contents.workspace.open.map((id) => openWorkspace(id));
    // } else {
    //     // No previously open workspaces
    //     // Open to splash
    //     openSplash();
    // }
}

function openSplash() {
    splashWindow = new BrowserWindow({
        width: 600,
        height: 450,
        webPreferences: webPreferences,
        resizable: false,
        frame: false
    });
    splashWindow.loadURL('http://localhost:3000/index.html/#splash').then(result => {
        splashWindow.on('closed', () => splashWindow = null);
    })
    splashWindow.on('close', (event) => {
    })
    // splashWindow.loadURL(isDev ? 
    //     'http://localhost:3000/index.html/#splash' : 
    //     `file://${path.join(__dirname, '/build/index.html/#splash')}`).then(result => {
    //     splashWindow.on('closed', () => splashWindow = null);
    // }).catch(error => {});
}

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


function onGetWorkspaces(event, arg) {
    event.reply(APP.GET_WORKSPACES, applicationStore.contents.workspaces);
}

async function onCreateWorkspace(event, arg) {
    // Open file dialog
    try {
        const result = await dialog.showOpenDialog(splashWindow, {
            title: "",
            defaultPath: app.getPath('desktop'),
            properties: ["openDirectory", "createDirectory"],
        });
        if (result.canceled) {
            // Dialog cancelled, do nothing
            event.reply(APP.CREATE_WORKSPACE, {
                success: false,
                error: null
            })
            return;
        } else try {
            const directoryPath = result.filePaths[0];
            if (directoryPath) {
                let newWorkspace = await createWorkspaceFile(directoryPath);
                applicationStore.contents.workspaces.entities[newWorkspace.id] = newWorkspace;
                applicationStore.contents.workspaces.all.push(newWorkspace.id);
                await applicationStore.save()
                event.reply(APP.CREATE_WORKSPACE, {
                    success: true,
                    error: null
                })
            }
        } catch(err) {

        }
    } catch(err) {

    }
}

async function onQuitApplication() {
    // perform saving, etc...
    await applicationStore.save();
    app.quit();
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

function openEmptyApplicationWindow() {

    let workspaceWindow, workspaceWorker;

    workspaceWindow = new BrowserWindow({
        width: ApplicationDefaults.interface.window.width,
        height: ApplicationDefaults.interface.window.height,
        webPreferences: {
            nodeIntegration: true,
        }
    })

    // Instantiate workspace worker
    workspaceWorker = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    })

    workspaceWindow.loadURL(isDev ? 
        'http://localhost:3000/index.html/#app' : 
        `file://${path.join(__dirname, '/build/index.html/#app')}`).then(result => {
        splashWindow.on('closed', () => splashWindow = null);
    }).catch(error => {});

    workspaceWorker.loadURL(isDev ? 
        'http://localhost:3000/backgroundWorker.html' : 
        `file://${path.join(__dirname, '/build/backgroundWorker.html')}`).then(result => {
        splashWindow.on('closed', () => splashWindow = null);
    }).catch(error => {});
}

// function createWindow() {

//     mainWindow = new BrowserWindow({
//         width: 1200, 
//         height: 800,
//         webPreferences: {
//             nodeIntegration: true
//         },
//         // frame: false,
//         // titleBarStyle: 'hidden'
//     });

//     hiddenWindow = new BrowserWindow({
//         show: isDev,
//         webPreferences: {
//             nodeIntegration: true
//         }
//     });

//     hiddenWindow.loadURL(isDev ? 
//         'http://localhost:3000/Worker/backgroundWorker.html' : 
//         `file://${path.join(__dirname, '/build/backgroundWorker.html')}`).then(result => {
//         if (isDev) hiddenWindow.webContents.openDevTools();
//     }).catch(error => {});

//     // if in dev env, use a live build
//     mainWindow.loadURL(isDev ? 
//         'http://localhost:3000/index.html' : 
//         `file://${path.join(__dirname, '/build/index.html')}`).then(result => {
//         mainWindow.on('closed', () => mainWindow = null);
//     }).catch(error => {});
// }