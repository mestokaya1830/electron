// Sadece bu fonksiyonlar web sayfasından erişilebilir
const {contextBridge, ipcRenderer} = require('electron');
  for (const type of ['chrome', 'node', 'electron']) {
    console.log(`${type}-version`, process.versions[type])
  }

contextBridge.exposeInMainWorld('api', {
  sendMessage: (message) => ipcRenderer.send('send-message', message),
  messageReplyListen: (callback) => ipcRenderer.on('message-reply', (event, data) => callback(data))
});

