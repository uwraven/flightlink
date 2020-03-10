const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow, hiddenWindow;

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

    hiddenWindow.loadURL(isDev ? 'http://localhost:3000/backgroundWorker.html' : `file://${path.join(__dirname, '/build/backgroundWorker.html')}`).then(result => {
        if (isDev) hiddenWindow.webContents.openDevTools();
    }).catch(error => {});

    // if in dev env, use a live build
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '/build/index.html')}`).then(result => {
        if (isDev) hiddenWindow.webContents.openDevTools();
        mainWindow.on('closed', () => mainWindow = null);
    }).catch(error => {});
}

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
