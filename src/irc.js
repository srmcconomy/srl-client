import irc from 'irc'
import dispatcher from './dispatcher'
debugger;
const client = new irc.Client('irc.speedrunslive.com', 'prettybigjoe', { channels: ['#speedrunslive'] });

client.on('message', (nick, to, text, message) => {
  console.log(message);
  dispatcher.dispatch({
    type: 'recieve-message',
    message: { sender: nick, channel: to, content: text, time: Date.now() }
  })
});

client.on('notice', (nick, to, text, message) => {
  console.log(message);
  dispatcher.dispatch({
    type: 'recieve-message',
    message: { sender: nick, channel: to, content: text, time: Date.now() }
  })
});

client.on('raw', message => console.log(message));

client.on('error', err => console.log(err));

export default client;
