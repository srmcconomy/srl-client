import UserListItem from './user-list-item'
import React from 'react'
var MessagesStore = require('electron').remote.app.messagesStore;

export default class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: MessagesStore.getUsersForChannel(this.props.channel),
    }
  }

  render() {
    let userListItems [];

    for (var user in this.state.users) {

    }
    = this.state.users.map((user, index) => <UserListItem user={user} key={index}/>);
    return (
      <div className="user-list scroller flex-spacer" >
        {userListItems}
      </div>
    )
  }

  componentDidMount() {
    ipcRenderer.on('MessagesStore#change', this.onChange.bind(this));
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('MessagesStore#change', this.onChange.bind(this));
  }

  onChange() {
    this.setState({
      users: MessagesStore.getUsersForChannel(this.props.channel)
    });
  }
}
