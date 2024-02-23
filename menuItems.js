const { shell, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");

const isMac = process.platform === "darwin";

//This is the menu template
const menuItems = [
  {
    label: "File",
    submenu: [
      {
        label: "My Portfolio",
        click: async () => {
          await shell.openExternal(
            "https://andrei-alexandrov-portfolio.netlify.app/"
          );
        },
      },
      {
        type: "separator",
      },
      isMac ? { role: "close" } : { role: "quit" },
      // {
      //   label: "Exit",
      //   click: () => {
      //     app.quit();
      //   },
      // },
    ],
  },
  {
    label: "Menu",
    submenu: [
      {
        label: "About",
        click: () => {
          const aboutWindow = new BrowserWindow({
            width: 600,
            height: 400,
          });
          aboutWindow.loadFile("indexTwo.html");
        },
      },
    ],
  },
  {
    label: "Window",
    submenu: [
      {
        label: "New Window",
        click: () => {
          const newWindow = new BrowserWindow({
            width: 1200,
            height: 1000,
            show: false,
            backgroundColor: "gray",
          });

          newWindow.loadURL(
            "https://imdb-next-js-andrei-alexandrov.vercel.app/"
          );
          //I am showing the content only when fully loaded
          newWindow.once("ready-to-show", () => {
            newWindow.show();
          });
        },
      },
      {
        role: "minimize",
      },
      {
        role: "close",
      },
    ],
  },
  {
    label: "Camera",
    submenu: [
      {
        label: "Open Camera",
        click: () => {
          const cameraWindow = new BrowserWindow({
            width: 1000,
            height: 800,
            show: false,
            webPreferences: {
              preload: path.join(__dirname, "cameraPreload.js"),
            },
          });

          ipcMain.on("close-window-2", () => {
            cameraWindow.close();
          });

          //CameraWindow.webContents.openDevTools();
          cameraWindow.loadFile("camera.html");
          cameraWindow.once("ready-to-show", () => {
            cameraWindow.show();
          });
        },
      },
    ],
  },
];

module.exports = menuItems;
