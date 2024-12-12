const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  repositoryOperation: (repositoryName, methodName, ...args) =>
    ipcRenderer.invoke('repository-operation', repositoryName, methodName, ...args),
  cookieOperation: (operation, key, val) =>
    ipcRenderer.invoke('cookie-operation', operation, key, val)
})
