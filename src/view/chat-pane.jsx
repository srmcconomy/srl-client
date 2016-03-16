import React from 'react'
import ChatList from './chat-list'
import ChatInput from './chat-input'
import ChatHeader from './chat-header'
var MessagesStore = require('electron').remote.app.messagesStore;

export default class ChatPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = { channels: MessagesStore.getChannels() }
  }

  render() {
    let chatLists = this.state.channels.map(channel => <ChatList channel={channel.name}/>)
    return (
      <div className="chat flex-spacer flex-vertical">
        <ChatHeader />
        <div className="chat-mount flex-spacer flex-vertical">
          {chatLists}
        </div>
      </div>
    );
  }

  componentDidMount() {
    MessagesStore.on('change', this.onChange.bind(this));
  }

  componentWillUnmount() {
    MessagesStore.removeListener('change', this.onChange.bind(this));
  }

  onChange() {
    this.setState({
      channels: MessagesStore.getChannels()
    });
  }
}
