export default class Store {
  constructor(dispatcher) {
    this.name = this.constructor.name
    this.webContents = null;
    this.dispatchToken = dispatcher.register(payload => {
      this.onDispatch(payload);
    })

  }

  setWebContents(webContents) {
    this.webContents = webContents;
  }

  onDispatch(payload) { }

  send(channel, data) {
    if (this.webContents) this.webContents.send(`${this.name}#${channel}`, data);
  }
}
