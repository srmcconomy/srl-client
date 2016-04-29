import irc from 'irc'
import dispatcher from './dispatcher'
import app from 'app'

var client = null;

class IRC {
  get client() {
    return client;
  }

  initialize() {
    client = new irc.Client('irc.speedrunslive.com',
      app.userStore.getUsername(), { channels: ['#speedrunslive'] });

    client.on('message', (nick, to, text, message) => {

      dispatcher.dispatch({
        type: 'recieve-pm',
        message: { sender: nick, channel: to, content: text, time: Date.now() }
      })
    });

    client.on('notice', (nick, to, text, message) => {
      if (nick === 'NickServ' && text.match(/IDENTIFY/)) {
        console.log(text)
        client.say(nick, `identify ${app.userStore.getPassword()}`)
      }
      dispatcher.dispatch({
        type: 'recieve-notice',
        message: { sender: nick, content: text, time: Date.now() }
      })
    });

    client.on('selfMessage', (to, text) => {
      dispatcher.dispatch({
        type: 'recieve-pm',
        message: { sender: client.nick, channel: to, content: text, time: Date.now() }
      })
    })

    client.on('raw', message => {
      // console.log(message);
      if (message.command === '477') {
        console.log('!!!ERROR')
        dispatcher.dispatch({
          type: 'error',
          message: message.args[2]
        })
      }
    });

    client.on('names', (channel, nicks) => {
      dispatcher.dispatch({
        type: 'users-join',
        channel: channel,
        users: nicks
      })
    });

    client.on('join', (channel, nick, message) => {
      dispatcher.dispatch({
        type: 'users-join',
        channel: channel,
        users: {[nick]: ''}
      })
    });

    client.on('part', (channel, nick, reason, message) => {
      dispatcher.dispatch({
        type: 'users-leave',
        channel: channel,
        users: {[nick]: ''}
      })
    });

    client.on('kick', (channel, nick, by, reason, message) => {
      dispatcher.dispatch({
        type: 'users-leave',
        channel: channel,
        users: {[nick]: ''}
      })
    });

    client.on('+mode', (channel, by, mode, argument, message) => {
      console.log(client.chans);
      if (!client.chans[channel].users.hasOwnProperty(argument)) return;
      dispatcher.dispatch({
        type: 'users-set-mode',
        channel: channel,
        user: {[argument]: client.chans[channel].users[argument]}
      })
    })

    client.on('-mode', (channel, by, mode, argument, message) => {
      if (!client.chans[channel].users.hasOwnProperty(argument)) return;
      dispatcher.dispatch({
        type: 'users-set-mode',
        channel: channel,
        user: {[argument]: client.chans[channel].users[argument]}
      })
    })

    client.on('quit', (nick, reason, channels, message) => {
      for (var channel of channels) {
        dispatcher.dispatch({
          type: 'users-leave',
          channel: channel,
          users: {[nick]: ''}
        })
      }
    });

    client.on('error', err => console.log(err));

    client.dispatchToken = dispatcher.register(function(action) {
      switch(action.type) {
       case 'send-message':
        client.say(action.channel, action.message)
        break;
       case 'change-channel':
        console.log(client.chans)
        if (!client.chans.hasOwnProperty(action.channel)) {
          client.join(action.channel, function() {
            dispatcher.dispatch({
              type: 'channel-joined',
              channel: action.channel
            })
          });
        }
        break;
      }
    })
  }
}

export default new IRC();
