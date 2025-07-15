import { app, BrowserWindow } from 'electron/main'
import path from 'path'
import {fileURLToPath} from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'dom.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  
  //child window
  let childWin = new BrowserWindow({
    parent: win,
    width:500,
    height:400
  })

  childWin.loadFile('child.html')
  childWin.show()

  win.loadFile('index.html')

  //close all window when main window closed
  win.on('close', () => {
    app.quit()
  })

  //open devtools
  win.webContents.openDevTools() //open new child window

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

