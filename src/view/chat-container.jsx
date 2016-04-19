import ChatList from './chat-list'
import ChatInput from './chat-input'
import React from 'react'
import ReactDOM from 'react-dom'
var MessagesStore = require('electron').remote.app.messagesStore;

export default class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: MessagesStore.getCurrentChannel().name === this.props.channel }
  }

  render() {
    return (
      <div className={`chat-container flex-vertical flex-spacer${!this.state.visible ? " hidden" : ""}`}>
        <ChatList channel={this.props.channel}/>
        <ChatInput channel={this.props.channel}/>
      </div>
    )
  }

  componentDidMount() {
    MessagesStore.on('change', this.onChange.bind(this));
  }

  componentWillUnmount() {
    MessagesStore.removeListener('change', this.onChange.bind(this));
  }

  onChange() {
    this.setState({
      visible: MessagesStore.getCurrentChannel().name === this.props.channel
    });
  }
}
