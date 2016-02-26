import React from 'react'
var dispatcher = require('electron').remote.app.dispatcher;
var ErrorStore = require('electron').remote.app.errorStore;

export default class ErrorModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: !!ErrorStore.getError(), message: ErrorStore.getError() };
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
    ErrorStore.on('change', this.onChange.bind(this));
  }

  componentWillUnmount() {
    ErrorStore.removeListener('change', this.onChange.bind(this));
  }

  onChange() {
    this.setState({ visible: !!ErrorStore.getError(), message: ErrorStore.getError() });
  }

  dismiss() {
    dispatcher.dispatch({ type: 'dismiss-error' })
  }
}
