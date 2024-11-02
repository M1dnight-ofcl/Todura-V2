import {app,BrowserWindow,screen,ipcMain } from 'electron';
import path from 'node:path';
import spawn from "node:child_process";
import started from 'electron-squirrel-startup';
// if(require('electron-squirrel-startup'))app.quit();
if(started)app.quit();
const createWindow=()=>{
  const primaryDisplay=screen.getPrimaryDisplay();
  const{width,height}=primaryDisplay.workAreaSize;
  const mainWindow=new BrowserWindow({
    width:800,
    height:600,
    minHeight:175,
    minWidth:250,
    maxWidth:(width * 1.25),
    maxHeight:(height * 1.25),
    autoHideMenuBar:true,
    titleBarStyle:"hidden",
    title:"Todura V2",
    icon:path.join(__dirname,'assets/logo.png'),//doesnt work for some reason
    webPreferences: {
      nodeIntegration:true,
      contextIsolation:true,
      enableRemoteModule:true,
      preload:path.join(__dirname, 'preload.js'),
    },
  });
  if(MAIN_WINDOW_VITE_DEV_SERVER_URL)mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  else mainWindow.loadFile(path.join(__dirname,`../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  // mainWindow.webContents.openDevTools();
};
const installExtensions=async()=>{
  const installer=require('electron-devtools-installer');
  const forceDownload=!!process.env.UPGRADE_EXTENSIONS;
  const extensions=[
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS',
    'DEVTRON',
  ];
  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
}
ipcMain.on('close',()=>{app.quit();});
ipcMain.on('min',()=>{BrowserWindow.getFocusedWindow().minimize();});
ipcMain.on('max',()=>{
  if(!BrowserWindow.getFocusedWindow().isMaximized()){ BrowserWindow.getFocusedWindow().maximize();}
  else if(BrowserWindow.getFocusedWindow().isMaximized()){ BrowserWindow.getFocusedWindow().unmaximize();}
});
ipcMain.handle('saveToFile',(_,obj)=>{
  // console.log(`got data:${obj}`);
  let pysu=spawn("./scripts/venv/Scripts/python.exe", ["./scripts/saveutil.py","csf",obj,]);
  pysu.stdout.on("data",(data)=>{console.log(`PYSU: ${data}`);});
  pysu.stderr.on("data",(data)=>{console.error(`------------\nPYSU_ERR:\n${data}------------`);});
  pysu.on("exit",(code)=>{console.log(`\n------------\nPYSU Exited with Code ${code}\n------------`);});
});
app.on('ready',async()=>{
  installExtensions();
  createWindow();
});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit();});
app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)createWindow();});
