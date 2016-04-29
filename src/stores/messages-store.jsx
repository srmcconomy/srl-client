import Store from './store'

class Channel {
  constructor(name) {
    this.name = name;
    this.time = 0;
    this.messages = [];
    this.users = {};
    this.currentText = '';
  }
}

export default class MessagesStore extends Store {
  constructor(dispatcher) {
    super(dispatcher);
    this.channels = {};
    this.currentChannel = '#speedrunslive';
    this.channels[this.currentChannel] = new Channel(this.currentChannel)
  }

  //private
  addMessage(message) {
    if (!this.channels.hasOwnProperty(message.channel))
      this.channels[message.channel] = { name: message.channel, time: message.date, messages: [], currentText: '' }
    this.channels[message.channel].messages.push(message);
  }

  addNotice(message) {
    this.channels[this.currentChannel].messages.push(message);
  }

  addUsers(channel, users) {
    for (var user in users) {
      this.channels[channel].users[user] = users[user];
    }
  }

  setUserMode(channel, users) {
    for (var user in users) {
      if (this.channels[channel].users.hasOwnProperty(user)) {
        this.channels[channel].users[user] = users[user];
      }
    }
  }

  removeUsers(channel, users) {
    for (var user in users) {
      if (this.channels[channel].users.hasOwnProperty(user)) delete this.channels[channel].users[user]
    }
  }

  //protected
  onDispatch(action) {
    switch(action.type) {
     case 'channel-joined':
      this.currentChannel = action.channel;
      if (!this.channels.hasOwnProperty(this.currentChannel))
        this.channels[this.currentChannel] = new Channel(this.currentChannel)
      this.send('change');
     case 'change-channel':
      if (this.channels.hasOwnProperty(action.channel)) {
        this.currentChannel = action.channel;
        this.send('change');
      }
      break;
     case 'recieve-pm':
      this.addMessage(action.message);
      this.send('change');
      break;
     case 'recieve-notice':
      this.addNotice(action.message);
      this.send('change');
      break;
     case 'users-join':
      this.addUsers(action.channel, action.users);
      this.send('change');
     case 'users-leave':
      this.removeUsers(action.channel, action.users);
      this.send('change');
    }
  }

  //public
  getMessagesForChannel(channel) {
    return this.channels[channel].messages;
  }

  getChannel(channel) {
    return this.channels[channel];
  }

  getLatestTime(channel) {
    if (this.channels[channel].messages.length == 0) return 0;
    return this.channels[channel].messages[this.channels[channel].messages.length - 1].time;
  }

  getCurrentChannelMessages() {
    return this.channels[this.currentChannel].messages;
  }

  getCurrentChannel() {
    return this.channels[this.currentChannel];
  }

  getUsersForChannel(channel) {
    return this.channels[channel].users;
  }

  getChannels() {
    let chans = [];
    for (let name in this.channels) {
      chans.push({ name: name, time: this.getLatestTime(name) })
    }
    return chans;
  }
}
