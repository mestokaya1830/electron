const { contextBridge, ipcRenderer } = require("electron");

for (const type of ['chrome', 'node', 'electron']) {
  console.log(`${type}:`, process.versions[type]);
}

contextBridge.exposeInMainWorld('api', {
  addUser: (data) => ipcRenderer.send('add-user', data),
  insertResult: (callback) => ipcRenderer.on('result', (event, data) => callback(data)),

  getUsers: () => ipcRenderer.send('get-users'),
  usersResult: (callback) => ipcRenderer.on('users-list', (event, data) => callback(data)),
});
