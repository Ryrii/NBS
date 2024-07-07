const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { initializeDatabase, getUserByEmail, addUser, getUsers } = require('./src/scripts/database');
const { execSync } = require('child_process');
const os = require('os');
const { log } = require('console');
let Store;


async function loadModules() {
  const electronStore = await import('electron-store');
  Store = electronStore.default;
  store = new Store();
  // Le reste de votre code initialisant l'application peut aller ici
}

loadModules().catch(console.error);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'src/scripts/preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false
    }
  });
  mainWindow.loadFile(path.join(__dirname, 'src/pages/home.html'));
  // mainWindow.webContents.openDevTools();

  

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();
  initializeDatabase();

  ipcMain.handle('login', async (event, { email, password }) => {
    const user = await getUserByEmail(email);
    if (user && user.password === password) {
      store.set('user', user);
      return user;
    }
    throw new Error('Invalid email or password');
  });
  ipcMain.handle('logout', async () => {
      store.delete('user');
  });

  ipcMain.handle('add-user', async (event, { username, email, password }) => {
    console.log("handl",username,email,password);
    await addUser(username,email, password);
  });
  ipcMain.handle('check-user', async () => {
    return store.get('user');
  })
  ipcMain.handle('get-users', async () => {
    return await getUsers();
  });

  ipcMain.handle('check-software', () => {
    const checkSoftwareVersion = (software, versionCommand) => {
      try {
        const output = execSync(versionCommand).toString().trim();
        if (output) {
          return output;
        }
      } catch (err) {
        return 'Not installed';
      }
    };
  
    const softwareList = {
      python: checkSoftwareVersion('python', 'python --version || python3 --version'),
      vscode: checkSoftwareVersion('code', 'code --version'),
      mysql: checkSoftwareVersion('mysql', 'mysql --version')
    };
  
    return softwareList;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
