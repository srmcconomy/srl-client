import UserList from './user-list'
import React from 'react'

export default class ChatList extends React.Component {
  render() {
    let userListItems = this.state.users.map((user, index) => <UserListItem user={user} key={index}/>);
    return (
      <div className="user-pane flex-vertical" >
        Users
        <UserList channel={this.props.channel} />
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
