import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createWindow() {
  let win = new BrowserWindow({
    width8: 800,
    height: 600,
    webPreferences: {
      preload: path.resolve(__dirname, "dom.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  
  win.loadFile(path.resolve(__dirname, 'index.html'))
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
