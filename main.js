const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("node:path");
const menuItems = require('./menuItems.js');

const isMac = process.platform === "darwin";

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

const createWindow = () => {
  const window = new BrowserWindow({
    title: "",
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.on("set-image", (event, data) => {
    window.webContents.send("get-image", data);
  });

  // window.webContents.openDevTools();
  window.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (!isMac) app.quit();
});
