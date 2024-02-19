const { app, shell, BrowserWindow, Menu } = require("electron");
const path = require("node:path");
const isMac = process.platform === "darwin";

//This is the menu template
const menuItems = [
  {
    label: "File",
    submenu: [
      {
        label: "Learn more",
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
      },
    ],
  },
  {
    label: "Window",
    submenu: [
      {
        role: "close",
      },
      {
        role: "minimize",
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
