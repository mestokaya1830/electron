const { contextBridge, ipcRenderer } = require("electron");


for (const type of ['chrome', 'node', 'electron']) {
  console.log(`${type}:`, process.versions[type]);
}


contextBridge.exposeInMainWorld("api", {
  loadImage: (data) => ipcRenderer.invoke("load-image", data),
});