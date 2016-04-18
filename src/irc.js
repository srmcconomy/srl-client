import irc from 'irc'
import dispatcher from './dispatcher'
import UserStore from './stores/user-store'

const client = new irc.Client('irc.speedrunslive.com',
  UserStore.getUsername(), { channels: ['#speedrunslive'] });

client.on('message', (nick, to, text, message) => {
  if (nick === 'NickServ' && text.match(/IDENTIFY/)) {
    client.say(nick, `identify ${UserStore.getPassword()}`)
  }
  dispatcher.dispatch({
    type: 'recieve-pm',
    message: { sender: nick, channel: to, content: text, time: Date.now() }
  })
});

client.on('notice', (nick, to, text, message) => {
  dispatcher.dispatch({
    type: 'recieve-notice',
    message: { sender: nick, content: text, time: Date.now() }
  })
});

client.on('raw', message => {
  console.log(message);
  if (message.command === '477') {
    console.log('!!!ERROR')
    dispatcher.dispatch({
      type: 'error',
      message: message.args[2]
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
    console.log(Object.keys(client.chans))
    if (!client.chans.hasOwnProperty(action.channel)) {
      client.join(action.channel, function() {
        dispatcher.dipatch({
          type: 'channel-joined',
          channel: action.channel
        })
      });
    }
    break;
  }
})

export default client;
