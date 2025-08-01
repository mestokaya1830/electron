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


//add new user
ipcMain.handle("add-new-user", async(event, data) => {
    try {
        const newUser = new Users(data);
        await newUser.save();
        event.sender.send("new-user-status", "User added successfully");
        return { success: true, message: "User added successfully" };
    } catch (error) {
        event.sender.send("new-user-status", "Error adding user");
        return { success: false, error: error.message };
    }
});

//get users
ipcMain.handle("get-users", async (event) => {
    try {
        const users = await Users.find();
        event.sender.send("get-users-status", users);
        return users;
    } catch (error) {
        event.sender.send("get-users-status", []);
        return [];
    }
});