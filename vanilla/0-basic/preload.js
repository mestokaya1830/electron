const { contextBridge, ipcRenderer } = require("electron");

for (const type of ['chrome', 'node', 'electron']) {
  console.log(`${type}:`, process.versions[type]);
}

contextBridge.exposeInMainWorld('api', {
//   addNewUser: async (data) => await ipcRenderer.invoke('add-new-user', data),
//   getUsers: async () => await ipcRenderer.invoke('get-users'),
//   deleteUser: async (data) => await ipcRenderer.invoke('delete-user', data),
});