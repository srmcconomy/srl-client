import Store from './store'

export default class UserStore extends Store {
  constructor(dispatcher) {
    super(dispatcher);
    this.username = null;
    this.password = null;
  }

  getUsername() {
    return this.username;
  }

  getPassword() {
    return this.password;
  }

  onDispatch(action) {
    switch(action.type) {
     case 'set-username':
      this.username = action.username;
      this.send('change');
      break;
     case 'set-password':
      this.password = action.password;
      this.send('change');
      break;
    }
  }
}
