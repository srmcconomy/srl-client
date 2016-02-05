import React from 'react'
import dateformat from '../dateformat'

export default class ChatListItem extends React.Component {
  render() {
    var message = this.props.message;
    return (
      <div className="chat-list-item">
          <span className="message-time caption">{(new Date(message.time)).format("h:MM TT")}</span>
          <span className="message-sender body2">{message.sender}</span>
          <span className="message-content body1">{message.content}</span>
      </div>
    );
  }
}
