const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path') 

function createWindow() {
  let win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  })
  win.loadFile('index.html')
  win.webContents.openDevTools()
  
  win.on('closed', () => {
    win = null
  })
}
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// from renderer process
ipcMain.on('send-message', (event, data) => {
  // send antwort
  event.reply('message-reply', `${data} \n From Main Process: Hello Renderer!`);
});