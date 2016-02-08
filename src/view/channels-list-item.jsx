import React from 'react'
import dateformat from '../dateformat'

export default class ChannelsListItem extends React.Component {
  render() {
    let channel = this.props.channel;
    return (
      <div className="channels-list-item">
        <div className="channel-name body2">{channel.name}</div>
        <div className="channel-time caption">{(new Date(channel.time)).format('h:mm TT')}</div>
      </div>
    );
  }
}
