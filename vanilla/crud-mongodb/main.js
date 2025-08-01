const {app, BrowserWindow, ipcMain} = require('electron');
const db = require('./model/db'); // Import the database connection
const Users = require('./model/users')
const path = require('path');


let win = null;
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('index.html');
    win.on('closed', () => {
        win = null;
    });
    win.webContents.openDevTools(); // Open DevTools for debugging
}

app.whenReady().then(createWindow);
app.on('before-quit', () => {
    if (win) {
        win.close();
    }
});
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.on("get-users", async (event) => {
    const users = await Users.find();
    event.sender.send("users-list", users);
});

ipcMain.on("add-user", async(event, data) => {
    console.log("Received user data:", data);
    const newUser = new Users(data)
    await newUser.save()
   event.sender.send("result", "User added successfully");
})