import React from 'react'

export default class ChatListItem extends React.Component {
  render() {
    var message = this.props.message;
    return (
      <div className="chat-list-item">
        <div className="message-sender">message.sender</div>
        <div className="message-time">message.time</div>
        <div className="message-content">message.content</div>
      </div>
    );
  }
}
