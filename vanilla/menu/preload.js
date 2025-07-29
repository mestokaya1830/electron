// Sadece bu fonksiyonlar web sayfasından erişilebilir
const {contextBridge, ipcRenderer} = require('electron');
  for (const type of ['chrome', 'node', 'electron']) {
    console.log(`${type}-version`, process.versions[type])
  }


contextBridge.exposeInMainWorld('api', {
 
});

