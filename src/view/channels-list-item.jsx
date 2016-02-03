import React from 'react'

export default class ChannelsListItem extends React.Component {
  render() {
    let channel = this.props.channel;
    return (
      <div className="channels-list-item">
        <div className="channel-name">{channel.name}</div>
        <div className="channel-time">{channel.time}</div>
      </div>
    );
  }
}
