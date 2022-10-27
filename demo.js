const { BrowserWindow, app } = require("electron");

const createWindow = async () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    });
    win.webContents.openDevTools()

    win.loadURL('https://google.com');
}

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