import React from 'react'
import ChannelsList from './channels-list'

export default class ChannelsPane extends React.Component {
  render() {
    return (
      <div className="channels flex-vertical">
        <ChannelsList/>
      </div>
    );
  }
}
