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
  Dispatcher.dispatch({type: 'set-username', username: 'prettybigjoe'})
  Dispatcher.dispatch({type: 'set-password', password: 'kerlogin'})
  app.messagesStore = MessagesStore;
  app.errorStore = ErrorStore;
  app.userStore = UserStore;
  app.dispatcher = Dispatcher;
  irc.initialize();
  mainWindow = new BrowserWindow({width: 800, height: 600, frame: false});
  mainWindow.loadURL('file://' + __dirname + '/../index.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  })
  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    require('shell').openExternal(url);
  })
});
