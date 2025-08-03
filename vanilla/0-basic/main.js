const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path') 

function createWindow() {
  let win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  })
  win.loadFile('index.html')
  win.webContents.openDevTools()
  
  win.on('closed', () => {
    win = null
  })
}
app.whenReady().then(() => {
  createWindow()
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

ipcMain.handle('get-message', (event) => {
  try {
    return 'Hello Electron'
  } catch (error) {
    console.log(error)
  }
})