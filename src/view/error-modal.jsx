import React from 'react'
var dispatcher = require('electron').remote.app.dispatcher;
var ipcRenderer = require('electron').ipcRenderer;
var ErrorStore = require('electron').remote.app.errorStore;

export default class ErrorModal extends React.Component {
  constructor(props) {
    super(props);
    let value = ErrorStore.getError()
    this.state = { visible: !!value, message: value };
  }

  render() {
    return (
      <div className={"modal-background" + (!this.state.visible ? " hidden" : "")} onClick={this.dismiss.bind(this)}>
        <div className="modal body2">
          {this.state.message}
        </div>
      </div>
    );
  }

  componentDidMount() {
    ipcRenderer.on('ErrorStore#change', this.onChange.bind(this));
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('MessagesStore#change', this.onChange.bind(this));
  }

  onChange() {
    let value = ErrorStore.getError();
    if (value) {
      this.setState({ visible: true, message: value });
    } else {
      this.setState({ visible: false });
    }
  }

  dismiss() {
    dispatcher.dispatch({ type: 'dismiss-error' })
  }
}
