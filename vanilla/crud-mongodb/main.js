const { app, BrowserWindow, ipcMain } = require("electron");
const db = require("./model/db"); // Import the database connection
const Users = require("./model/users");
const path = require("path");

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
  try {
    const newUser = new Users(data);
    await newUser.save();
    return { success: true, message: "User added successfully" };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

//delete user
ipcMain.handle("delete-user", async (event, data) => {
  try {
    if (!data) {
      console.log("No data");
    }
    await Users.deleteOne({ _id: data });
    return { success: true };
  } catch (error) {
    return error;
  }
});

//get users
ipcMain.handle("get-users", async (event) => {
  try {
    const users = await Users.find();
    return users;
  } catch (error) {
    return error;
  }
});
