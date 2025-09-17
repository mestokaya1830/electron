const {app, BrowserWindow, ipcMain} = require('electron')
const fs = require("fs").promises;
const path = require("path");

function createWindow() {
  let win = new BrowserWindow({
      webPreferences: {
        nodeIntegration: false,             // Disable Node.js integration in the renderer for security
        contextIsolation: true,             // Isolate context between preload and renderer to prevent prototype pollution
        sandbox: true,                      // Enable Chromium's sandbox for renderer process isolation
        enableRemoteModule: false,          // Disable remote module to avoid potential security risks
        webSecurity: true,                  // Enable web security features like same-origin policy and CSP enforcement
        allowRunningInsecureContent: false, // Prevent loading of insecure (HTTP) content on secure (HTTPS) pages
        preload: path.join(__dirname, 'preload.js') // Load preload script with controlled API exposure
      }
  })
  win.setMenu(null)
  win.loadFile('index.html')
  win.webContents.openDevTools()
  
  win.on('closed', () => {
    win = null
  })
}
app.enableSandbox()
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


//ipcMain handlers
ipcMain.handle("load-image", async (event, data) => {
  try {
    if (!data) throw new Error("filePath is undefined");
    const data = await fs.readFile(data);
    return data.toString("base64");
  } catch (err) {
    console.error("Error reading image:", err);
    return null;
  }
});