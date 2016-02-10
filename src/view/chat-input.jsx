import React from 'react'

export default class ChatInput extends React.Component {
  render() {
    return (
      <form>
        <div className="chat-textarea">
          <textarea placeholder="chat"/>
        </div>
      </form>
    );
  }
}
