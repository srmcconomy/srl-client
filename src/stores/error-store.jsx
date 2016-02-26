import EventEmitter from 'events'
import Dispatcher from '../dispatcher'

var error = null;

const ErrorStore = Object.assign({}, EventEmitter.prototype, {
  getError: function() {
    return error;
  }
});

ErrorStore.dispatchToken = Dispatcher.register(function(action) {
  console.log(action)
  switch(action.type) {
   case 'error':
    error = action.message;
    ErrorStore.emit('change');
    break;
   case 'dismiss-error':
    error = null;
    ErrorStore.emit('change');
    break;
  }
});

export default ErrorStore;
