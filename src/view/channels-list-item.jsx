import React from 'react'
import dateformat from '../dateformat'
var dispatcher = require('electron').remote.app.dispatcher;

export default class ChannelsListItem extends React.Component {
  render() {
    let channel = this.props.channel;
    return (
      <div className={"channels-list-item" + (this.props.selected ? " selected" : "")} onClick={this.handleClick.bind(this)}>
        <div className="channel-name body2">{channel.name}</div>
        <div className="channel-time caption">{(new Date(channel.time)).format('h:MM TT')}</div>
      </div>
    );
  }

  handleClick() {
    dispatcher.dispatch({
      type: 'change-channel',
      channel: this.props.channel.name
    })
  }
}
