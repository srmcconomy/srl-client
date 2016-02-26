import ReactDom from 'react-dom';
import React from 'react'
import App from './dist/view/app'
import remote from 'remote'

remote.app.messagesStore.removeAllListeners();
remote.app.errorStore.removeAllListeners();

ReactDom.render(
  <App />,
  document.getElementsByClassName('mount')[0]
)
