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

app.on('activate', () => {

})

ipcMain.on(APP.GET_WORKSPACES, onGetWorkspaces)

ipcMain.on(APP.OPEN_WORKSPACE_BY_ID, onOpenWorkspaceById)

ipcMain.on(APP.CREATE_WORKSPACE, onCreateWorkspace)

function startup() {
    // Async get data from the application store json
    loadApplicationStore().then(() => {
        openSplash();
    }).catch(() => {

    });
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


async function onOpenWorkspaceById(event, response) {

    let id = response;
    let workspace = applicationStore.contents.workspaces.find(workspace => workspace.id === id);
    applicationStore.contents.workspaces.map(workspace => console.log(workspace))

    console.log("id:", id);
    console.log("workspace:", workspace);

    if (workspace) {

        let workspaceWindow, workspaceWorker;

        // let workspaceStore = new Store(workspace.path)
        if (true) {

            // Close splash screen if still open
            splashWindow.close()

            // Instantiate workspace window
            workspaceWindow = new BrowserWindow({
                width: 1200,
                height: 800,
                fullscreen: false,
                webPreferences: webPreferences,
                backgroundColor: `#ffffff`
            })

            // Instantiate workspace worker
            workspaceWorker = new BrowserWindow({
                show: false,
                webPreferences: {...webPreferences, nodeIntegration: true }
            })

            workspaceWindow.loadURL('http://localhost:3000/index.html/#app').then(result => {
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
        console.log(event);
    })
    // splashWindow.loadURL(isDev ? 
    //     'http://localhost:3000/index.html/#splash' : 
    //     `file://${path.join(__dirname, '/build/index.html/#splash')}`).then(result => {
    //     splashWindow.on('closed', () => splashWindow = null);
    // }).catch(error => {});
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
                console.log(newWorkspace);
                applicationStore.contents.workspaces.push(newWorkspace);
                console.log(applicationStore.contents.workspaces)
                let saved = await applicationStore.save()
                if (saved) {
                    event.reply(APP.CREATE_WORKSPACE, {
                        success: true,
                        error: null
                    })
                }
                console.log("saved: ", saved);
            }
        } catch(err) {

        }
    } catch(err) {

    }
}


async function loadApplicationStore() {
    let userDataPath = app.getPath('userData');
    let applicationStorePath = `${userDataPath}/application.json`;
    applicationStore = new Store(applicationStorePath);

    if (await applicationStore.load()) {
        // application defaults loaded into memory properly
        // map stored workspaces and check that they exist before making available to UI
        applicationStore.contents.workspaces = applicationStore.contents.workspaces.filter(workspace => fs.existsSync(workspace.path))
        await applicationStore.save();
        return;
    } else {
        // defaults file does not exist, write defaults to application.json
        // TODO: fix Store.js
        applicationStore.contents = {...ApplicationDefaults};
        fs.writeFile(applicationStorePath, JSON.stringify(ApplicationDefaults), (err) => {
            if (err) console.log(err);
        }) ;
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