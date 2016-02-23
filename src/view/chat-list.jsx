import ChatListItem from './chat-list-item'
import React from 'react'
import ReactDOM from 'react-dom'
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

  componentWillUpdate() {
    var node = ReactDOM.findDOMNode(this);
    this.shouldScrollToBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  }

  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
      var node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
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
