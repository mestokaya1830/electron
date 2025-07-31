const { contextBridge, ipcRenderer } = require("electron");

for (const type of ['chrome', 'node', 'electron']) {
  console.log(`${type}:`, process.versions[type]);
}

contextBridge.exposeInMainWorld('api', {
  addUser: (data) => ipcRenderer.send('add-user', data),
  // messageReplyListen: (callback) => ipcRenderer.on('message-reply', (event, data) => callback(data))
});
