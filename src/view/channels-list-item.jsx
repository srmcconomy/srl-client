import React from 'react'
import dateformat from '../dateformat'
var dispatcher = require('electron').remote.app.dispatcher;
var ipcRenderer = require('electron').ipcRenderer;
var MessagesStore = require('electron').remote.app.messagesStore;

export default class ChannelsListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: MessagesStore.getCurrentChannel().name === props.channel.name }
  }

  render() {
    let channel = this.props.channel;
    return (
      <div className={"channels-list-item" + (this.state.selected ? " selected" : "")} onClick={this.handleClick.bind(this)}>
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

  componentDidMount() {
    ipcRenderer.on('MessagesStore#change', this.onChange.bind(this));
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('MessagesStore#change', this.onChange.bind(this));
  }

  onChange() {
    this.setState({
      selected: MessagesStore.getCurrentChannel().name === this.props.channel.name
    });
  }
}
