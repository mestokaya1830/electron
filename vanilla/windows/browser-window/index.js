import { app, BrowserWindow, Menu, ipcMain } from 'electron/main'
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
  
  win.loadFile('index.html')

  //close all window when main window closed
  win.on('close', () => {
    app.quit()
  })

  //open devtools
  win.webContents.openDevTools()
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


//-----------------------------------------------
 //check platform
  console.log(process.platform)

  //set menu
  Menu.setApplicationMenu(null)

  
  //get data from window
  ipcMain.on('form', (err, data) => {
    console.log(data)
  })

  //open new window with on main window button
  ipcMain.on('open-window', () => {
    const winDetails = new BrowserWindow({
      width: 600,
      height: 400,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        title:'Details'
      }
    })
    winDetails.loadFile('details.html')
    winDetails.on('close', () => winDetails = null)
  })