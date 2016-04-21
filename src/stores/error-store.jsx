import Store from './store'

var error = null;

export default class ErrorStore extends Store {
  constructor(dispatcher) {
    super(dispatcher);
    this.error = null;
  }

  onDispatch(action) {
    switch(action.type) {
     case 'error':
      this.error = action.message;
      this.send('change')
      break;
     case 'dismiss-error':
      this.error = null;
      this.send('change')
      break;
    }
  }

  getError() {
    return this.error;
  }
}
