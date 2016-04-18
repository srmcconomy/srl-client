import EventEmitter from 'events'
import Dispatcher from '../dispatcher'

var username = null
var password = null

const UserStore = Object.assign({}, EventEmitter.prototype, {
  getUsername: function() {
    return username;
  }
  getPassword: function() {
    return password;
  }
});

UserStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
   case 'set-username':
    username = action.username;
    UserStore.emit('change');
    break;
   case 'set-password':
    password = action.password;
    UserStore.emit('change');
    break;
  }
});

export default UserStore;
