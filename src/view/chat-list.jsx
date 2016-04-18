import ChatListItem from './chat-list-item'
import ChatInput from './chat-input'
import React from 'react'
import ReactDOM from 'react-dom'
var MessagesStore = require('electron').remote.app.messagesStore;

export default class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: MessagesStore.getMessagesForChannel(this.props.channel),
      visible: MessagesStore.getCurrentChannel().name === this.props.channel
    }
  }

  render() {
    let chatListItems = this.state.messages.map((message, index) => <ChatListItem message={message} key={index}/>);
    return (
      <div className={`chat-container flex-vertical flex-spacer${!this.state.visible ? " hidden" : ""}`}>
        <div className="chat-list scroller flex-spacer" >
          {chatListItems}
        </div>
        <ChatInput channel={this.props.channel}/>
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
    MessagesStore.on('change', this.onChange.bind(this));
  }

  componentWillUnmount() {
    MessagesStore.removeListener('change', this.onChange.bind(this));
  }

  onChange() {
    this.setState({
      messages: MessagesStore.getMessagesForChannel(this.props.channel),
      visible: MessagesStore.getCurrentChannel().name === this.props.channel
    });
  }
}
