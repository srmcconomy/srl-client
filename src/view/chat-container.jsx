import ChatList from './chat-list'
import ChatInput from './chat-input'
import UserList from './user-list'
import React from 'react'
import ReactDOM from 'react-dom'
var ipcRenderer = require('electron').ipcRenderer;
var MessagesStore = require('electron').remote.app.messagesStore;

export default class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: MessagesStore.getCurrentChannel().name === this.props.channel }
  }

  render() {
    return (
      <div className='flex-horizontal flex-spacer'>
        <div className={`chat-container flex-vertical flex-spacer${!this.state.visible ? " hidden" : ""}`}>
          <ChatList channel={this.props.channel}/>
          <ChatInput channel={this.props.channel}/>
        </div>
        <UserList channel={this.props.channel}/>
      </div>
    )
  }

  componentDidMount() {
    ipcRenderer.on('MessagesStore#change', this.onChange.bind(this));
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('MessagesStore#change', this.onChange.bind(this));
  }

  onChange() {
    this.setState({
      visible: MessagesStore.getCurrentChannel().name === this.props.channel
    });
  }
}
