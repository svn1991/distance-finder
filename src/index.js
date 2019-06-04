import React from "react";
import ReactDOM from "react-dom";

import Search from "./Search/Search";
import Result from "./Result/Result";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startPoint: "",
      endPoint: "",
      passengers: "",
      date: "",
      distance: "500km",
      showResult: false
    }
  }

  getUserValues(start,end, psgr, date) {
    this.setState({
      startPoint: start,
      endPoint: end,
      passengers: psgr,
      date: date,
      showResult: true
    });
  }

  render() {
    return (
      <div className="App">
        <Search
          startPoint={this.state.startPoint}
          endPoint={this.state.endPoint}
          passengers={this.state.passengers}
          date={this.state.date}
          sendUserSelections={(start,end, psgr, date) => this.getUserValues(start,end, psgr, date)}
        />
        <Result 
          startPoint={this.state.startPoint}
          endPoint={this.state.endPoint}
          distance={this.state.distance}
          show={this.state.showResult}
        />
      </div>
    );
  }
}

export default App;
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
