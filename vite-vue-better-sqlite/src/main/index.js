import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import db from '../db/sqliteConn.js'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      webSecurity: true,
      devTools: is.dev
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.setTitle('Mes Invoices App')
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle('register', async (event, data) => {
  const { email, password } = data
  try {
    const user = db
      .prepare('INSERT INTO users (email, password) VALUES (?, ?)')
      .run(email, password)
    console.log('User:', user)
    return { success: true, id: user.lastID }
  } catch (err) {
    console.error('DB error:', err.message)
    return { success: false, message: err.message }
  }
  // return new Promise((resolve) => {
  //   db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], function (err) {
  //     if (err) {
  //       console.error('DB error:', err.message)
  //       resolve({ success: false, message: err.message })
  //     } else {
  //       console.log('User inserted, ID:', this.lastID)
  //       resolve({ success: true, id: this.lastID })
  //     }
  //   })
  // })
})

ipcMain.handle('login', async (event, data) => {
  const { email, password } = data
  console.log(email, password)
  try {
    const user = db
      .prepare('SELECT * FROM users WHERE email = ? AND password = ?')
      .get(email, password)
    if (!user) {
      return { success: false, message: 'Invalid credentials' }
    }
    console.log('User:', user)
    return { success: true, user }
  } catch (err) {
    console.error('DB error:', err.message)
    return { success: false, message: err.message }
  }
  // return new Promise((resolve) => {
  //   db.get(
  //     'SELECT * FROM users WHERE email = ? AND password = ?',
  //     [email, password],
  //     (err, row) => {
  //       if (err) {
  //         console.error('DB error:', err.message)
  //         resolve({ success: false, message: err.message })
  //       } else if (row) {
  //         resolve({ success: true, user: row })
  //       } else {
  //         resolve({ success: false, message: 'Invalid email or password' })
  //       }
  //     }
  //   )
  // })
})

ipcMain.handle('getUsers', async () => {
  try {
    const users = db.prepare('SELECT * FROM users').all()
    console.log('Users:', users)
    if (!users) {
      return { success: false, users: [], message: 'No users found' }
    }
    return { success: true, users }
  } catch (err) {
    console.error('DB error:', err.message)
    return { success: false, users: [], message: err.message }
  }
  // return new Promise((resolve) => {
  //   db.all('SELECT * FROM users', [], (err, rows) => {
  //     if (err) {
  //       console.error('DB error:', err.message)
  //       resolve({ success: false, users: [], message: err.message })
  //     } else {
  //       resolve({ success: true, users: rows })
  //     }
  //   })
  // })
})
