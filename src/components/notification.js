import React from "react";

export default class Notification extends React.Component {
  render() {
    const { state } = this.props;
    const showNotification =
      state === "primary" ||
      state === "success" ||
      state === "warning" ||
      state === "danger"
        ? true
        : false;

    if (showNotification) {
      return (
        <div className="row flex-spaces">
          <div className={`alert alert-${this.props.state} dismissible`}>
            {this.props.text}
            <label className="btn-close" onClick={() => this.props.close()}>
              X
            </label>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
