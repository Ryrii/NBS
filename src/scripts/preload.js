const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ipcRenderer', {
  invoke: ipcRenderer.invoke.bind(ipcRenderer),
  on: ipcRenderer.on.bind(ipcRenderer)
});