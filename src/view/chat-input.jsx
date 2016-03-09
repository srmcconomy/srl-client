import React from 'react'
var dispatcher = require('electron').remote.app.dispatcher;
var MessagesStore = require('electron').remote.app.messagesStore;

export default class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value:""}
  }

  render() {
    return (
      <form className="chat-input">
        <div className="chat-textarea">
          <textarea placeholder="chat" value={this.state.value} onKeyDown={this.handleKeyDown.bind(this)} onChange={this.handleChange.bind(this)}/>
        </div>
      </form>
    );
  }

  handleKeyDown(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      dispatcher.dispatch({ type: 'send-message', message: this.state.value, channel: this.props.channel })
      this.setState({ value: '' })
    }
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }
}
