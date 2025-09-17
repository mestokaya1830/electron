const { contextBridge, ipcRenderer } = require("electron");


for (const type of ['chrome', 'node', 'electron']) {
  console.log(`${type}:`, process.versions[type]);
}


contextBridge.exposeInMainWorld("api", {
  saveImage: (base64Data, fileName) => ipcRenderer.invoke("save-image", base64Data, fileName),
});