import ReactDom from 'react-dom';
import React from 'react'
import App from './dist/view/app'
import irc from './dist/irc'

ReactDom.render(
  <App />,
  document.getElementsByClassName('mount')[0]
)
