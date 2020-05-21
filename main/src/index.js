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
ipcMain.handle(APP.CREATE_WORKSPACE, applicationManager.onCreateWorkspace)
ipcMain.handle(APP.OPEN_WORKSPACE, applicationManager.onOpenWorkspaceById)
ipcMain.handle(APP.QUIT, applicationManager.onUserQuit)
ipcMain.handle(APP.WORKSPACE_EVENT, applicationManager.onWorkspaceEvent)
