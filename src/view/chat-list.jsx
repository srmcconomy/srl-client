import MessagesStore from '../stores/messages-store'
import ChatListItem from './chat-list-item'
import React from 'react'

export default class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: MessagesStore.getCurrentChannelMessages()
    }
  }

  render() {
    let chatListItems = this.state.messages.map(message => <ChatListItem message={message}/>);
    return (
      <div className="chat-list scroller flex-spacer">
        {chatListItems}
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
    this.setState({ messages: MessagesStore.getCurrentChannelMessages() });
  }
}
