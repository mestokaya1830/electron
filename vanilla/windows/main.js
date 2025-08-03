const {app, BrowserWindow, ipcMain, Menu, globalShortcut} = require('electron')
const path = require('path') 

let mainWindow = null
let usersWin = null

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  })
  Menu.setApplicationMenu(null)

  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  createWindow()
  globalShortcut.register('CmdOrCtrl+Shift+U', () => {
    if (usersWin && !usersWin.isDestroyed()) {
      if (usersWin.isMinimized()) usersWin.restore()
      usersWin.show()
      usersWin.focus()
    } else {
      createUsersWindow()
    }
  })
   app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

function createUsersWindow() {
  usersWin = new BrowserWindow({
    width: 600,
    height: 400,
    parent: mainWindow,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  })
  
  usersWin.loadFile('users.html')
  usersWin.webContents.openDevTools()
  
  usersWin.on('closed', () => {
    usersWin = null
  })
}

// from renderer process
ipcMain.on('get-users', (event) => {
  createUsersWindow()
});