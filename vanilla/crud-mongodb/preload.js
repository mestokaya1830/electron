const { contextBridge, ipcRenderer } = require("electron");

for (const type of ['chrome', 'node', 'electron']) {
  console.log(`${type}:`, process.versions[type]);
}

contextBridge.exposeInMainWorld('api', {
  addNewUser: (data) => ipcRenderer.send('add-new-user', data),
  newUserStatus: (callback) => ipcRenderer.on('new-user-status', (event, data) => callback(data)),

  getUsers: () => ipcRenderer.send('get-users'),
  getUsersStatus: (callback) => ipcRenderer.on('get-users-status', (event, data) => callback(data)),
});
