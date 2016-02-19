import app from 'app'
import BrowserWindow from 'browser-window'
import irc from './irc'
import MessagesStore from './stores/messages-store'
import Dispatcher from './dispatcher'

var mainWindow = null;

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  app.messagesStore = MessagesStore;
  app.dispatcher = Dispatcher;
  mainWindow = new BrowserWindow({width: 800, height: 600, frame: false});
  mainWindow.loadUrl('file://' + __dirname + '/../index.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  })
  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    require('shell').openExternal(url);
  })
});
