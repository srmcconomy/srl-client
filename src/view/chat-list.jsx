import MessagesStore from '../stores/messages-store'
import React from 'react'

export default class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: MessagesStore.getCurrentChannelMessages()
    }
  }

  render() {
    let chatListItems = this.state.messages.map(message => <MessageListItem message={message}/>);
    return (
      <div className="chat-list">
        {chatListItems}
      </div>
    )
  }

  componentDidMount() {
    MessagesStore.on('change', this.onChange);
  }

  componentWillUnmount() {
    MessagesStore.removeListener('change', this.onChange);
  }

  onChange() {
    this.setState({ messages: MessagesStore.getCurrentChannelMessages() });
  }
}
