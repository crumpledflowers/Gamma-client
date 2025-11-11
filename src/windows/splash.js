const { app, BrowserWindow, ipcMain } = require("electron");
const { initGame } = require("./game");
const path = require("path");

let splashWindow;

const createWindow = () => {
  splashWindow = new BrowserWindow({
    icon: path.join(__dirname, "../assets/img/icon.png"),
    width: 600,
    height: 300,
    show: false,
    frame: false,
    transparent: true,
    fullscreenable: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "../preload/splash.js"),
    },
  });

  splashWindow.loadFile(path.join(__dirname, "../assets/html/splash.html"));
  splashWindow.once("ready-to-show", () => {
    splashWindow.show();
    // Directly call handleClose since auto-updater is removed
    handleClose(); 
  });

  splashWindow.on("closed", () => {
    // ipcMain.removeAllListeners("quit-and-install"); // Removed as no longer needed
    splashWindow = null;
  });
};

// Removed: ipcMain.on("quit-and-install", ...) as auto-updater is gone
// Removed: checkForUpdates function as auto-updater is gone

const handleClose = () =>
  setTimeout(() => {
    if (splashWindow) {
      initGame();
      splashWindow.close();
    }
  }, 2000);

const initSplash = createWindow;

module.exports = { initSplash };