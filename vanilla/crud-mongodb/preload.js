const { contextBridge, ipcRenderer } = require("electron");

for (const type of ['chrome', 'node', 'electron']) {
  console.log(`${type}:`, process.versions[type]);
}

contextBridge.exposeInMainWorld('api', {
  addNewUser: (data) => ipcRenderer.invoke('add-new-user', data),
  newUserStatus: (callback) => ipcRenderer.once('new-user-status', (event, data) => callback(data)),

  getUsers: () => ipcRenderer.invoke('get-users'),
  getUsersStatus: (callback) => ipcRenderer.once('get-users-status', (event, data) => callback(data)),
});
