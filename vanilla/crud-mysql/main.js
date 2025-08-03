const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const db = require("./model/db");
const { error } = require("console");

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

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

//add new user
ipcMain.handle("add-new-user", async (event, data) => {
  try{
    await db.query('Insert Into users set name = ?, password = ?',[data.name, data.password])
    return {success: true}
  }catch(error){
    console.log(error)
  }
});

//delete user
ipcMain.handle("delete-user", async (event, id) => {
   try {
    await db.query('Delete From users Where id = ?', [id])
    return {success: true}
  } catch (error) {
    console.log(error)
  }
});

//get users
ipcMain.handle("get-users", async (event) => {
  try {
    const [row] = await db.query('Select * From users')
    return row
  } catch (error) {
    console.log(error)
  }
});
