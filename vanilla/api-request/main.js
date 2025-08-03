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

// from renderer process
ipcMain.handle('get-users', async (event) => {
   const getUsers = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      return response.json();
    };
  const users = await getUsers();
  event.sender.send('data-return', users);
});
