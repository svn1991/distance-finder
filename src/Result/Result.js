import React from "react";
import "./result.css";

class Result extends React.Component {
  render() {
    let wrapperClass = 'results-wrapper';
    wrapperClass += this.props.show ? "show" : "";
    return (
      <div className={wrapperClass}>
        The distance from {this.props.startPoint} to {this.props.endPoint} is {this.props.distance}.
      </div>
    );
  }
}

export default Result;
