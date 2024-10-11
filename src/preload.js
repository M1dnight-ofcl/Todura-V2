const{contextBridge,ipcRenderer,remote}=require('electron');
contextBridge.exposeInMainWorld('toduraApi',{
  desktop:true,
  close:()=>ipcRenderer.send("close"),
  min:()=>ipcRenderer.send("min"),
  max:()=>ipcRenderer.send("max"),
});
