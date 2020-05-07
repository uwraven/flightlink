
const { app, BrowserWindow} = require('electron');
const fs = require('fs');
const path = require('path');
const isDev = require('electron-is-dev');
const Store = require('./ApplicationData/store');
const ApplicationDefaults = require('./ApplicationData/Defaults/applicationDefaults.json');

let mainWindow, hiddenWindow;
let applicationStore;

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
})



function loadApplicationStore() {
    let userDataPath = app.getPath('userData');
    let applicationStorePath = `${userDataPath}/application.json`;
    applicationStore = new Store(applicationStorePath);

    if (applicationStore.load()) {
        // application defaults loaded into memory properly
        return;
    } else {
        // defaults file does not exist, write defaults to application.json
        applicationStore.contents = JSON.parse(ApplicationDefaults);
        fs.writeFile(applicationStorePath, ApplicationDefaults, (err) => {
            if (err) console.log(err);
        }) ;
        return;
    }
}

function openWorkspace(id) {

    let workspaceStore = new Store(workspace.path)

    

    // Each workspace implements a unique application window, 
    // worker, and workspace store

    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false,
        }
    })

    backgroundWorker = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    })
}



function createWindow() {

    mainWindow = new BrowserWindow({
        width: 1200, 
        height: 800,
        webPreferences: {
            nodeIntegration: true
        },
        // frame: false,
        // titleBarStyle: 'hidden'
    });

    hiddenWindow = new BrowserWindow({
        show: isDev,
        webPreferences: {
            nodeIntegration: true
        }
    });

    hiddenWindow.loadURL(isDev ? 
        'http://localhost:3000/Workspace/Worker/backgroundWorker.html' : 
        `file://${path.join(__dirname, '/build/backgroundWorker.html')}`).then(result => {
        if (isDev) hiddenWindow.webContents.openDevTools();
    }).catch(error => {});

    // if in dev env, use a live build
    mainWindow.loadURL(isDev ? 
        'http://localhost:3000/Workspace/Window/workspace.html' : 
        `file://${path.join(__dirname, '/build/index.html')}`).then(result => {
        mainWindow.on('closed', () => mainWindow = null);
    }).catch(error => {});
}