const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const db = require("./model/db");

let win = null;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
  win.on("closed", () => {
    win = null;
  });
  // win.webContents.openDevTools(); // Open DevTools for debugging
}

app.whenReady().then(createWindow);
app.on("before-quit", () => {
  if (win) {
    win.close();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

//add new user
ipcMain.handle("add-new-user", async (event, data) => {
   return new Promise((resolve, reject) => {
    db.run("INSERT INTO users (name, password) VALUES (?, ?)", [data.name, data.password], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({success: true,  id: this.lastID });
      }
    });
  });
});

//delete user
ipcMain.handle("delete-user", async (event, id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({success: true, changes: this.changes });
      }
    });
  });
});

//get users
ipcMain.handle("get-users", async (event) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
});
