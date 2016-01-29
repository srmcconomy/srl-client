import React from 'react';
import ChannelsPane from './channels-pane';
import ChatPane from './chat-pane';

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <ChannelsPane />
        <ChatPane />
      </div>
    );
  }
}
