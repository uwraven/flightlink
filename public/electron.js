const {app, BrowserWindow, dialog, ipcMain, Menu, MenuItem } = require('electron');
const fs = require('fs');
const path = require('path');
const isDev = require('electron-is-dev');
const { Store } = require('./ApplicationData/store');
const ApplicationDefaults = require('./ApplicationData/Defaults/applicationDefaults.json');
const WorkspaceDefaults = require('./ApplicationData/Defaults/WorkspaceDefaults.json');
const uuid = require('uuid');

let applicationStore;

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

ipcMain.on('app.getWorkspaces', (event, arg) => {
    event.reply('app.getWorkspaces', applicationStore.contents.workspace.workspaces);
})

ipcMain.on('app.openSelectedWorkspace', (event, arg) => {
    console.log("opening workspace");
    console.log(applicationStore.contents.workspace.workspaces[id])
})

ipcMain.on('app.createWorkspace', (event, arg) => {
    console.log("workspaces:", applicationStore.contents.workspace.workspaces)
    createWorkspace();
    // event.reply('')
})

function startup() {
    // Get data from the application store json
    loadApplicationStore();
    if (applicationStore.contents.workspace.open.length > 0) {
        // Application store contains previously open workspaces
        // Open previously open workspaces rather than send user to the splash screen
        applicationStore.contents.workspace.open.map((id) => openWorkspace(id));
    } else {
        // No previously open workspaces
        // Open to splash
        openSplash();
    }
}


function openWorkspace(id) {

    let workspaceWindow, workspaceWorker;

    let workspaceStore = new Store(workspace.path)
    if (workspaceStore.load()) {

        // Instantiate workspace window
        workspaceWindow = new BrowserWindow({
            width: workspaceStore.interface.window.width || ApplicationDefaults.interface.window.width,
            height: workspaceStore.interface.window.height || ApplicationDefaults.interface.window.height,
            fullscreen: workspaceStore.interface.fullscreen || ApplicationDefaults.interface.fullscreen,
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

        // Set this workspace as open and add to recent applications
        if (!applicationStore.workspace.open.includes(id)) applicationStore.workspace.open.push(id);
        applicationStore.recent.splice(applicationStore.recent.indexOf(id), 0);
        applicationStore.recent.push(id);
        
    } else {
        // workspace path can't be loaded, open to splash screen
    }
}

function openSplash() {
    let splashWindow;

    splashWindow = new BrowserWindow({
        width: 600,
        height: 450,
        webPreferences: {
            nodeIntegration: true
        },
        resizable: false,
        frame: false
    });

    splashWindow.loadURL(isDev ? 
        'http://localhost:3000/index.html/#splash' : 
        `file://${path.join(__dirname, '/build/index.html/#splash')}`).then(result => {
        splashWindow.on('closed', () => splashWindow = null);
    }).catch(error => {});
}

function createWorkspace(event) {
    let workspaceId = uuid.v1();

    // Open file dialog
    dialog.showOpenDialog({
        title: "",
        defaultPath: app.getPath('desktop'),
        properties: ["openDirectory", "createDirectory"]
    }).then((result) => {
        if (result.canceled) {
            // Dialog cancelled, do nothing
            event.reply('app.createWorkspace', {
                success: false,
                error: null
            })
            return;
        } else {
            const directoryPath = result.filePaths[0];
            if (directoryPath) {
                console.log("directoryPath:", directoryPath);
                const workspaceContents = {...WorkspaceDefaults};
                workspaceContents.id = workspaceId;
                workspaceContents.path = `${directoryPath}/workspace.json`;
                if (!fs.existsSync(workspaceContents.path)) {
                    fs.writeFile(workspaceContents.path, JSON.stringify(workspaceContents), 'utf8', (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("created workspace");
                            openWorkspace(workspaceId);
                        }
                    })
                } else {
                    event.reply('app.createWorkspace', {
                        success: false,
                        error: "Workspace already exists at this location"
                    })
                }
            }
        }
    }).catch((err) => {
        // Error during resolution
        return;
    })   
}


function loadApplicationStore() {
    let userDataPath = app.getPath('userData');
    console.log(userDataPath);
    let applicationStorePath = `${userDataPath}/application.json`;
    applicationStore = new Store(applicationStorePath);

    if (applicationStore.load()) {
        // application defaults loaded into memory properly
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