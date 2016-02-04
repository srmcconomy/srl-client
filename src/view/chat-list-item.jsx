import React from 'react'
import dateformat from '../dateformat'

export default class ChatListItem extends React.Component {
  render() {
    var message = this.props.message;
    return (
      <div className="chat-list-item">
        <div className="message-sender">{message.sender}</div>
        <div className="message-time">{dateformat(new Date(message.time), "h:MM TT")}</div>
        <div className="message-content">{message.content}</div>
      </div>
    );
  }
}
