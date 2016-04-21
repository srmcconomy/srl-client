import React from 'react'

export default class UserListItem extends React.Component {
  render() {
    var user = this.props.user;
    return (
      <div className="user-list-item">
          <span className="user-name">{user.name}</span>
      </div>
    );
  }

  shouldComponentUpdate() {
    return false;
  }
}
