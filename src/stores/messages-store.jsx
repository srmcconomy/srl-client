import EventEmitter from 'events'
import Dispatcher from '../dispatcher'

const channels = {};

function addMessage(message) {
  if (!channels.hasOwnProperty(message.channel))
    channels[message.channel] = { name: message.channel, time: message.date, messages: [] }
  channels[message.channel].messages.push(message);
}

function addNotice(message) {
  channels[currentChannel].messages.push(message);
}

var currentChannel = '#speedrunslive';
channels[currentChannel] = {
  name: currentChannel,
  time: Date.now(),
  messages: []
}

const MessagesStore = Object.assign({}, EventEmitter.prototype, {
  getMessagesForChannel: function(channel) {
    return channels[channel].messages;
  },
  getChannel: function(channel) {
    return channels[channel];
  },
  getLatestTime: function(channel) {
    if (channels[channel].messages.length == 0) return 0;
    return channels[channel].messages[channels[channel].messages.length - 1].time;
  },
  getCurrentChannelMessages: function() {
    return channels[currentChannel].messages;
  },
  getCurrentChannel: function() {
    return channels[currentChannel];
  },
  getChannels: function() {
    let chans = [];
    for (let name in channels) {
      chans.push({ name: name, time: this.getLatestTime(name) })
    }
    return chans;
  }
});

MessagesStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
   case 'channel-joined':
    currentChannel = action.channel;
    if (!channels.hasOwnProperty(currentChannel))
      channels[currentChannel] = { name: currentChannel, time: 0, messages: [] }
    MessagesStore.emit('change');
   case 'change-channel':
    if (channels.hasOwnProperty(action.channel)) {
      currentChannel = action.channel;
      MessagesStore.emit('change');
    }
    break;
   case 'recieve-pm':
    addMessage(action.message);
    MessagesStore.emit('change');
    break;
   case 'recieve-notice':
    addNotice(action.message);
    MessagesStore.emit('change');
    break;
  }
});

export default MessagesStore;
