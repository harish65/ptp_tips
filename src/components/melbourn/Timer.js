import React, { Component } from "react";
import moment from "moment";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.countDownId = null;
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: false,
    };
  }

  componentDidMount() {
    this.countDownId = setInterval(this.timerInit, 1000);
  }

  componentWillUnmount() {
    if (this.countDownId) {
      clearInterval(this.countDownId);
    }
  }

  timerInit = () => {
    let endTime = moment("2021-11-02 15:00:00");

    //if (!startDate) {
    //  this.setState({ expired: true });
    //  return;
    //}
    const distance = moment(endTime).diff(new Date());
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //For countdown is finished
    if (distance < 0) {
      clearInterval(this.countDownId);
      this.setState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: true,
      });
      return;
    }
    this.setState({ days, hours, minutes, seconds, expired: false });
  };

  render() {
    const { days, hours, minutes, seconds, expired } = this.state;
    if (expired) {
      return (
        <div className="expired">
          {/*<p>For Tuesday, 1st November 2022</p>*/}
          {/*<div>For Next Time</div>*/}
        </div>
      );
    }
    return (
      <div
        className="timer"
        style={{ marginRight: "20px", textAlign: "center" }}
      >
        <div>
          <p>{days} d</p>
        </div>

        <div>
          <p> {hours} h</p>
        </div>

        <div>
          <p>{minutes} m</p>
        </div>

        <div>
          <p> {seconds} s</p>
        </div>
      </div>
    );
  }
}

export default Timer;
