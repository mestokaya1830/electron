import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  login: async (data) => ipcRenderer.invoke('login', data),
  logout: async (data) => ipcRenderer.invoke('logout', data),
  register: async (data) => ipcRenderer.invoke('register', data),
  getUsers: async (data) => ipcRenderer.invoke('getUsers', data)
})
