import ReactDOM from "react-dom";
import React from "react";
import "./search.css";

import address from "../assets/address.json";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: this.props.startPoint ? this.props.startPoint : "",
      end: this.props.endPoint ? this.props.endPoint : "",
      passengers: this.props.passengers ? this.props.passengers : 1,
      date: this.props.date ? this.props.date : this.getCurrentDate(),
      address: address,
      filterAddress: address,
      showStartOptions: false,
      showEndOptions: false
    };
  }

  componentDidUpdate() {
    this.showStartDropDown(this.state.showStartOptions);
    this.showEndDropDown(this.state.showEndOptions);
  }

  showStartDropDown(show) {
    const dropDown = ReactDOM.findDOMNode(this.refs.startDropDown);
    if (dropDown) {
      if (show){
        dropDown.classList.add('show');
      } else {
        dropDown.classList.remove('show');
      }
    }
  }

  showEndDropDown(show) {
    const dropDown = ReactDOM.findDOMNode(this.refs.endDropDown);
    if (dropDown) {
      if (show){
        dropDown.classList.add('show');
      } else {
        dropDown.classList.remove('show');
      }
    }
  }

  /* DATE FORMAT */

  getCurrentDate() {
    const dateTime = new Date();
    const year = dateTime.getFullYear();
    const month =
      dateTime.getMonth() + 1 < 10
        ? "0" + (dateTime.getMonth() + 1)
        : dateTime.getMonth() + 1;
    const date =
      dateTime.getDate() < 10 ? "0" + dateTime.getDate() : dateTime.getDate();
    return year + "-" + month + "-" + date;
  }
  getTwoYears() {
    const dateTime = new Date();
    const year = dateTime.getFullYear() + 2;
    const month = "12";
    const date = "31";
    return year + "-" + month + "-" + date;
  }

  /* START INPUT FUNCTIONS */

  filterStart(event) {
    const search = event.target.value.toLowerCase();
    const end = this.state.end.toLowerCase();
    let filterAddress = [];
    if (search) {
      filterAddress = this.state.address.filter(add => add.toLowerCase().includes(search));
    } else {
      filterAddress = this.state.address
    }

    if (end) {
      filterAddress = filterAddress.filter(add => add.toLowerCase() !== end);
    }

    this.setState({
      start: search,
      filterAddress,
      showStartOptions: true
    });
  }

  startOptionClicked(event, address) {
    this.setState({
      start: address,
      showStartOptions: false
    });    
  }

  handleStart(event) {
    this.setState({start: event.target.value});
  }

  hideStartDropdown() {
    this.setState({
      showStartOptions: false
    });
  }

  /* END INPUT FUNCTIONS */
  filterEnd(event) {
    const search = event.target.value.toLowerCase();
    const start = this.state.start.toLowerCase();
    let filterAddress = [];
    if (search) {
      filterAddress = this.state.address.filter(add => add.toLowerCase().includes(search));
    } else {
      filterAddress = this.state.address
    }

    if (start) {
      filterAddress = filterAddress.filter(add => add.toLowerCase() !== start);
    }

    this.setState({
      end: search,
      filterAddress,
      showEndOptions: true
    });
  }

  endOptionClicked(event, address) {
    this.setState({
      end: address,
      showEndOptions: false
    });    
  }

  handleEnd(event) {
    this.setState({end: event.target.value});
  }

  hideEndDropdown() {
    this.setState({
      showEndOptions: false
    });
  }

  /* OTHER INPUT FUNCTIONS */
  handlePassengers(event) {
    this.setState({passengers: event.target.value});
  }
  handleDate(event) {
    this.setState({date: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const state = this.state;
    const errorMsg = ReactDOM.findDOMNode(this.refs.selectPlace);

    if (state.address.includes(state.start) && state.address.includes(state.end)) {
      this.props.sendUserSelections(
        state.start,
        state.end,
        state.passengers,
        state.date
      );
      errorMsg.classList.remove("show");
    } else {
      errorMsg.classList.add("show");
    }
    return false;
  }

  render() {
    const state = this.state;
    return (
      <div>
        <form className="search-form" onSubmit={(e) => this.handleSubmit(e)}>
          <div ref="selectPlace" className="select-place">Please select starting and ending points from drop down.</div>
          <div>
            <label htmlFor="start-point">Start Point: </label>
            <span className = "start-point-wrapper search-input-wrapper">              
              <input
                type="text"
                id="start-point"
                name="start-point"
                value={state.start}
                placeholder="Search.."
                required
                onChange={this.filterStart.bind(this)}
                onBlur={this.hideStartDropdown.bind(this)}
              />
              <div id="startDropDown" ref="startDropDown" className="dropdown-content start-dropdown">
                {
                  state.filterAddress.map((add, index) => {
                    return <div className="dropdown-options" key={index} onMouseDown={e => this.startOptionClicked(e, add)}>{add}</div>
                  })
                }
              </div>
            </span>
            
            <label htmlFor="end-point">End Point: </label>
            <span className = "end-point-wrapper search-input-wrapper">              
              <input
                type="text"
                id="end-point"
                name="end-point"
                value={state.end}
                placeholder="Search.."
                required
                onChange={this.filterEnd.bind(this)}
                onBlur={this.hideEndDropdown.bind(this)}
              />
              <div id="endDropDown" ref="endDropDown" className="dropdown-content end-dropdown">
                {
                  state.filterAddress.map((add, index) => {
                    return <div className="dropdown-options" key={index} onMouseDown={e => this.endOptionClicked(e, add)}>{add}</div>
                  })
                }
              </div>
            </span>
          </div>
          <div>
            <label htmlFor="noOfPsgr">No of Passengers: </label>
            <input
              type="number"
              id="noOfPsgr"
              name="noOfPsgr"
              value={state.passengers}
              required
              onChange={this.handlePassengers.bind(this)}
            />

            <label htmlFor="date">Date: </label>
            <input
              type="date"
              id="date"
              name="date"
              min={this.getCurrentDate()}
              max={this.getTwoYears()}
              value={state.date}
              required
              onChange={this.handleDate.bind(this)}
            />
          </div>
          <div>
            <input type="submit" value="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
