import { app, BrowserWindow } from 'electron/main'
import path from 'path'
import {fileURLToPath} from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.resolve(__dirname, 'dom.js'),
      nodeIntegration: true,
      contextIsolation: false
    },
    title:'Electron',
    backgroundColor:'#ddd'
  })
  
  win.loadFile(path.resolve(__dirname, 'index.html'))

  //open devtools
  win.webContents.openDevTools()
  console.log(process.platform)
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// app.on('before-quit', () => {
//   console.log('The App is quited')
// })

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
