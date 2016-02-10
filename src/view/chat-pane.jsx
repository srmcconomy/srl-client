import React from 'react'
import ChatList from './chat-list'
import ChatInput from './chat-input'

export default class ChatPane extends React.Component {
  render() {
    return (
      <div className="chat flex-spacer flex-vertical">
        <ChatList/>
        <ChatInput/>
      </div>
    );
  }
}
