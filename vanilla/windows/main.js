const {app, BrowserWindow, ipcMain, Menu} = require('electron')
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
  Menu.setApplicationMenu(null)//all windows will not have a menu bar
  // mainWindow.setMenu(null) //for this window only

  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  mainWindow.on('close-main-window', (event) => {
    event.preventDefault()
    usersWin.close() // Hide the window instead of closing it
  })
}
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// from renderer process
ipcMain.on('get-users', (event) => {
  usersWin = new BrowserWindow({
    width: 600,
    height: 400,
    parent:mainWindow,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  })
  // usersWin.setMenu(null)//for this window only
  usersWin.loadFile('users.html')
  usersWin.webContents.openDevTools()
  usersWin.on('closed', () => {
    usersWin = null
  })
});