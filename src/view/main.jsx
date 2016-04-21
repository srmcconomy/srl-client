import ReactDom from 'react-dom';
import React from 'react'
import App from './dist/view/app'

ReactDom.render(
  <App />,
  document.getElementsByClassName('mount')[0]
)
