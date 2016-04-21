import React from 'react'
import ChatContainer from './chat-container'
import ChatInput from './chat-input'
import ChatHeader from './chat-header'
var MessagesStore = require('electron').remote.app.messagesStore;
var ipcRenderer = require('electron').ipcRenderer;

export default class ChatPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = { channels: MessagesStore.getChannels() }
  }

  render() {
    let chatContainers = this.state.channels.map(channel => <ChatContainer channel={channel.name} key={channel.name}/>)
    return (
      <div className="chat flex-spacer flex-vertical">
        <ChatHeader />
        <div className="chat-mount flex-spacer flex-vertical">
          {chatContainers}
        </div>
      </div>
    );
  }

  componentDidMount() {
    ipcRenderer.on('MessagesStore#change', this.onChange.bind(this));
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('MessagesStore#change', this.onChange.bind(this));
  }

  onChange() {
    this.setState({
      channels: MessagesStore.getChannels()
    });
  }
}
