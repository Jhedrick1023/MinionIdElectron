const { Menu } = require('electron')
const electron = require('electron')
const app = electron.app
const path = require('path')
const url = require('url')
const BrowserWindow = electron.BrowserWindow;
let remoteWindow;

const template = [
    {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click(item, focusedWindow) {
                    if (focusedWindow) focusedWindow.reload()
                }
            },
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    if (focusedWindow) focusedWindow.webContents.toggleDevTools()
                }
            },
            { type: 'separator' },
            { role: 'resetzoom' },
            { role: 'zoomin' },
            { role: 'zoomout' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    {
        role: 'window',
        submenu: [
            { role: 'minimize' },
            { role: 'close' }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                accelerator: process.platform === 'darwin' ? 'Alt+Command+R+M' : 'Ctrl+G+I',
                click() {
                    const size = require('electron').screen.getPrimaryDisplay().workAreaSize;

                    // Create the browser window.
                    remoteWindow = new BrowserWindow({ width: size.width, height: size.height, icon: __dirname + './Content/Images/ultisaasprod.ico' });

                    // and load the home page of the app. In this case home.handlebars
                    remoteWindow.loadURL(url.format({
                        pathname: path.join(__dirname, 'README.md'),
                        protocol: 'file:',
                        slashes: true
                    }));

                    // Emitted when the window is closed.
                    remoteWindow.on('closed', function () {
                        // Dereference the window object, usually you would store windows
                        // in an array if your app supports multi windows, this is the time
                        // when you should delete the corresponding element.
                        remoteWindow = null;
                    });
                }
            }
        ]
    }
]

if (process.platform === 'darwin') {
    const name = app.getName()
    template.unshift({
        label: name,
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            {
                role: 'services',
                submenu: [
                ]
            },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    })
    // Edit menu.
    template[1].submenu.push(
        { type: 'separator' },
        {
            label: 'Speech',
            submenu: [
                { role: 'startspeaking' },
                { role: 'stopspeaking' }
            ]
        }
    )
    // Window menu.
    template[3].submenu = [
        {
            label: 'Close',
            accelerator: 'CmdOrCtrl+W',
            role: 'close'
        },
        {
            label: 'Minimize',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
        },
        {
            label: 'Zoom',
            role: 'zoom'
        },
        { type: 'separator' },
        {
            label: 'Bring All to Front',
            role: 'front'
        }
    ]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
