import ChatListItem from './chat-list-item'
import React from 'react'
var MessagesStore = require('electron').remote.app.messagesStore;

export default class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: MessagesStore.getCurrentChannelMessages()
    }
  }

  render() {
    let chatListItems = this.state.messages.map((message, index) => <ChatListItem message={message} key={index}/>);
    return (
      <div className="chat-list scroller flex-spacer">
        {chatListItems}
      </div>
    )
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.componentWillUnmount);
    MessagesStore.on('change', this.onChange.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.componentWillUnmount);
    MessagesStore.removeListener('change', this.onChange.bind(this));
  }

  onChange() {
    this.setState({ messages: MessagesStore.getCurrentChannelMessages() });
  }
}
