import app from 'app'
import BrowserWindow from 'browser-window'
import irc from './irc'
import MessagesStore from './stores/messages-store'
import ErrorStore from './stores/error-store'
import UserStore from './stores/user-store'
import Dispatcher from './dispatcher'

var mainWindow = null;

app.on('window-all-closed', () => {
  irc.client.disconnect();
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  app.errorStore = new ErrorStore(Dispatcher);
  app.messagesStore = new MessagesStore(Dispatcher);
  app.userStore = new UserStore(Dispatcher);
  app.dispatcher = Dispatcher;
  Dispatcher.dispatch({type: 'set-username', username: 'prettybigjoe'})
  Dispatcher.dispatch({type: 'set-password', password: 'kerlogin'})
  irc.initialize();
  mainWindow = new BrowserWindow({width: 800, height: 600, frame: false});
  mainWindow.openDevTools()
  mainWindow.loadURL('file://' + __dirname + '/../index.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  })
  mainWindow.webContents.on('did-finish-load', function() {
    app.errorStore.setWebContents(mainWindow.webContents);
    app.userStore.setWebContents(mainWindow.webContents);
    app.messagesStore.setWebContents(mainWindow.webContents);
    mainWindow.webContents.toggleDevTools();
  })
  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    require('shell').openExternal(url);
  })
});
