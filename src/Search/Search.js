import React from "react";
import "./search.css";

class Search extends React.Component {
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
  render() {
    return (
      <div>
        <form className="search-form">
          <div>
            <label htmlFor="start-point">Start Point: </label>
            <input
              type="text"
              id="start-point"
              name="start-point"
              value=""
              required
            />

            <label htmlFor="end-point">End Point: </label>
            <input
              type="text"
              id="end-point"
              name="end-point"
              value=""
              required
            />
          </div>
          <div>
            <label htmlFor="noOfPsgr">No of Passengers: </label>
            <input
              type="text"
              id="noOfPsgr"
              name="noOfPsgr"
              value="1"
              required
            />

            <label htmlFor="date">Date: </label>
            <input
              type="date"
              id="date"
              name="date"
              value=""
              min={this.getCurrentDate()}
              max={this.getTwoYears()}
              required
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
