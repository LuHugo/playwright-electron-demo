const { BrowserWindow, app,ipcMain } = require("electron");
const path = require('path');
const playwright = require('playwright');


const createWindow = async () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,

        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });
    
    // ipcMain
    ipcMain.handle('run', async () => {
        try {
            console.info('starting');

            const electronApp = await playwright._electron.launch({ args: ['demo.js'] });
            const window = await electronApp.firstWindow();
            await window.screenshot({ path: 'google.png' });

            await electronApp.close();
        } catch (error) {
            console.log(error.message)
        }
    });
    
    win.webContents.openDevTools();
    win.loadFile('index.html');
};


app.whenReady().then(async () => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});