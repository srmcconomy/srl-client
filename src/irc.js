import irc from 'irc'
import dispatcher from './dispatcher'

const client = new irc.Client('irc.speedrunslive.com', 'prettybigjoe', { channels: ['#speedrunslive'] });

client.on('message', (nick, to, text, message) => {
  console.log(message);
  dispatcher.dispatch({
    type: 'recieve-pm',
    message: { sender: nick, channel: to, content: text, time: Date.now() }
  })
});

client.on('notice', (nick, to, text, message) => {
  console.log(message);
  dispatcher.dispatch({
    type: 'recieve-notice',
    message: { sender: nick, content: text, time: Date.now() }
  })
});

client.on('raw', message => console.log(message));

client.on('error', err => console.log(err));

client.dispatchToken = dispatcher.register(function(action) {
  switch(action.type) {
   case 'change-channel':
    if (!client.chans.hasOwnProperty(action.channel)) {
      client.join(action.channel);
    }
  }
})

export default client;
