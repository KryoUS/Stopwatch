import React, { Component } from "react";
import moment from "moment";

class Stopwatch extends Component {
  constructor() {
    super();
    this.state = {
      start: "",
      end: "",
      duration: moment.duration(moment().diff(moment())),
      secondsElapsed: 0,
      active: false,
      totalDuration: moment.duration(moment().diff(moment()))
    };
  }

  componentWillUnmount = () => {
    clearInterval(this.intervalID);
  };

  pad = n => {
    return ("0" + n).slice(-2);
  };

  tick = () => {
    let currSeconds = this.state.secondsElapsed + 1;
    this.setState({
      end: moment(this.state.start)
        .add(currSeconds, "s")
        .toISOString(),
      duration: moment.duration(
        moment(this.state.start)
          .add(currSeconds, "s")
          .diff(this.state.start)
      ),
      secondsElapsed: currSeconds,
      active: true,
      totalDuration: moment.duration(moment().diff(moment(this.state.start)))
    });
    //TODO: Send Start and End State to Props Function
  };

  start = () => {
    this.setState({
      start: moment().toISOString(),
      active: true
    });
    this.intervalID = setInterval(() => this.tick(), 1000);
  };

  stop = () => {
    clearInterval(this.intervalID);
    this.setState({ active: false });
  };

  continue = () => {
    this.setState({ active: true });
    this.intervalID = setInterval(() => this.tick(), 1000);
  };

  reset = () => {
    if (this.state.active) {
      clearInterval(this.intervalID);
    }

    this.setState({
      start: "",
      end: "",
      duration: moment.duration(moment().diff(moment())),
      secondsElapsed: 0,
      active: false,
      totalDuration: moment.duration(moment().diff(moment()))
    });
  };

  buttonLogic = () => {
    if (!this.state.start) {
      return this.start();
    } else if (this.state.active) {
      return this.stop();
    } else {
      return this.continue();
    }
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          // justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        <div style={{ width: "75px", color: "white" }}>
          {this.pad(this.state.duration._data.hours)}:
          {this.pad(this.state.duration._data.minutes)}:
          {this.pad(this.state.duration._data.seconds)}
        </div>
        <div className="button" onClick={this.buttonLogic}>
          {!this.state.start
            ? "Start"
            : this.state.active
            ? "Stop"
            : "Continue"}
        </div>
        <div className="button" id="buttonWarn" onClick={this.reset}>
          Reset
        </div>
      </div>
    );
  }
}

export default Stopwatch;
