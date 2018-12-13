// One Line

//handle setupevents as quickly as possible
const setupEvents = require('./installers/setupEvents')
require('update-electron-app')();

if (setupEvents.handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}
var { app, BrowserWindow, remote } = require('electron');
var path = require('path');
const {ipcMain} = require('electron');

var mainWindow = null;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.

  mainWindow = new BrowserWindow({
    width: 800,
    height: 550,
    'min-width': 50,
    'min-height': 200,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden'
  });

require('update-electron-app')()

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/assets/view/index.html`)

  // Open the DevTools.
  //mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
