import React from 'react'
import ChannelsListItem from './channels-list-item'
var MessagesStore = require('electron').remote.app.messagesStore;

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
    window.addEventListener('beforeunload', this.componentWillUnmount);
    MessagesStore.on('change', this.onChange.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.componentWillUnmount);
    MessagesStore.removeListener('change', this.onChange.bind(this));
  }

  onChange() {
    this.setState({ channels: MessagesStore.getChannels() });
  }
}
