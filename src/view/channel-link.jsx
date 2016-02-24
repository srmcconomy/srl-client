import React from 'react'
var dispatcher = require('electron').remote.app.dispatcher;

export default class ChannelLink extends React.Component {
  render() {
    return (
      <a href="#" onClick={this.handleClick.bind(this)}>{this.props.channel}</a>
    )
  }

  handleClick() {
    dispatcher.dispatch({
      type: 'change-channel',
      channel: this.props.channel
    })
  }
}
