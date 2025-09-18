import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

contextBridge.exposeInMainWorld('api', electronAPI)

contextBridge.exposeInMainWorld('ipcRenderer', {
  
})
