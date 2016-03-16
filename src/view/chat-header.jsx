import React from 'react'

export default class ChatHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="chat-header flex-horizontal">
        <div className="btn close close-app">x</div>
      </div>
    )
  }
}
