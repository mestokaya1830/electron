const {app, BrowserWindow, ipcMain, Menu, dialog} = require('electron')
const path = require('path') 

let mainWindow = null

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
ipcMain.on('open-dialog', (event, data) => {
  dialog.showMessageBox(mainWindow, {
    type: 'error',
    title: data.title,
    message: data.message,
    buttons: ['OK']
  });
});