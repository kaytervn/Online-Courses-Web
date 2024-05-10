import React from "react";

class Alert extends React.Component {
  render() {
    const { msg, type } = this.props;

    let alertClass = "mt-4 text-light rounded-3";
    if (type === "success") {
      alertClass += " bg-success";
    } else if (type === "error") {
      alertClass += " bg-danger";
    }

    return <div className={alertClass}>{msg}</div>;
  }
}

export default Alert;
