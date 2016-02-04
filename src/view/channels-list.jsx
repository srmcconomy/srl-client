import React from 'react'
import MessagesStore from '../stores/messages-store'
import ChannelsListItem from './channels-list-item'

export default class ChannelsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: MessagesStore.getChannels()
    }
  }

  render() {
    let channelsList = this.state.channels.map(channel => <ChannelsListItem channel={channel}/>)
    return (
      <div className="channels-list">
        {channelsList}
      </div>
    )
  }

  componentDidMount() {
    MessagesStore.on('change', this.onChange.bind(this));
  }

  componentWillUnmount() {
    MessagesStore.removeListener('change', this.onChange.bind(this));
  }

  onChange() {
    this.setState({ channels: MessagesStore.getChannels() });
  }
}
