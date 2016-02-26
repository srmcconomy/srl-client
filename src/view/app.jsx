import React from 'react';
import ChannelsPane from './channels-pane';
import ChatPane from './chat-pane';
import ErrorModal from './error-modal';

export default class App extends React.Component {
  render() {
    return (
      <div className="app flex-vertical">
        <div className="flex-vertical flex-spacer">
          <section className="flex-horizontal flex-spacer">
            <ChannelsPane />
            <ChatPane />
          </section>
        </div>
        <ErrorModal/>
      </div>
    );
  }
}
