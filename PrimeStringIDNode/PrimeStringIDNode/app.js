const electron = require('electron');
const app = electron.app;
const browserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');

let window;

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (window === null) {
        createWindow();
    }
});

function createWindow() {
    const size = electron.screen.getPrimaryDisplay().workAreaSize;
    window = new browserWindow({ width: size.width, height: size.height });

    window.loadURL(url.format({
        pathname: path.join(__dirname, './views/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    window.on('closed', function () {
        window = null;
    });
    require('./menu');
}