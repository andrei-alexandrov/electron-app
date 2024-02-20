const { app, shell, BrowserWindow, Menu, ipcMain } = require("electron");
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
            movable: false,
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
          //Shows the content only when fully loaded
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
            width: 800,
            height: 600,
            show: false,
            webPreferences: {
              preload: path.join(__dirname, "cameraPreload.js"),
            },
          });

          ipcMain.on("close-window-2", () => {
            cameraWindow.close();
          });

          // cameraWindow.webContents.openDevTools();
          cameraWindow.loadFile("camera.html");
          cameraWindow.once("ready-to-show", () => {
            cameraWindow.show();
          });
        },
      },
    ],
  },
];

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
  if (process.platform !== "darwin") app.quit();
});
