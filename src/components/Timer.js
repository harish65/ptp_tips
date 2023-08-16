import React from "react";
import moment from "moment";
import "moment-timezone";
import Countdown from "react-countdown";
// import schedule from 'node-schedule';
import UpTimer from "./uptimer";

export default class pTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      min: 0,
      up: false,
      currentHour:
        Number(moment().tz("Australia/Canberra").format("HH")) * 60 * 60 * 1000,
      currentMin:
        Number(moment().tz("Australia/Canberra").format("mm")) * 60 * 1000,
      currentSec: Number(moment().tz("Australia/Canberra").format("ss")) * 1000,
    };
  }
  
   
  componentWillMount() {
    this.interval = setInterval(() => {
      const raceTime = this.props.raceTimer;
      this.setState({
        currentHour:
          Number(moment().tz("Australia/Canberra").format("HH")) *
          60 *
          60 *
          1000,
        currentMin:
          Number(moment().tz("Australia/Canberra").format("mm")) * 60 * 1000,
        currentSec:
          Number(moment().tz("Australia/Canberra").format("ss")) * 1000,
      });
      const currentTime =
        this.state.currentHour + this.state.currentMin + this.state.currentSec;

      const Time = raceTime - currentTime;
      // const Timer = Time

      if (Time <= 0) {
        this.setState({ up: true });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const raceTime = this.props.raceTimer;
    const currentTime =
      this.state.currentHour + this.state.currentMin + this.state.currentSec;

    const Time = raceTime - currentTime;
    const Timer = Time;
    ////TIMER/////
    const rendererMin = ({ hours, minutes, seconds }) => {
      if (seconds < 10) {
        return <span style={{ width: "auto" }}>{minutes}m</span>;
      } else {
        return <span style={{ width: "auto" }}>{minutes}m</span>;
      }
    };

    const renderFive = ({ minutes, seconds }) => {
      if (seconds < 10) {
        return (
          <span style={{ color: "red" }}>
            {minutes}m 0{seconds}s
          </span>
        );
      } else {
        return (
          <span style={{ color: "red" }}>
            {minutes}m {seconds}s
          </span>
        );
      }
    };

    const renderHour = ({ hours }) => {
      return <span>{hours}h</span>;
    };

    const renderseconds = ({ seconds }) => {
      return <span style={{ color: "red" }}>{seconds}s</span>;
    };

    const renderCounter = () => {
      if (Time <= 5 * 60 * 1000 && Time >= 1 * 60 * 1000) {
        return (
          <Countdown
            date={Date.now() + Timer}
            onComplete={() => this.setState({ up: true })}
            renderer={renderFive}
          />
        );
      } else if (Time < 60 * 60 * 1000 && Time > 5 * 60 * 1000) {
        return (
          <Countdown
            style={{ color: "red" }}
            date={Date.now() + Timer}
            renderer={rendererMin}
          />
        );
      } else if (Time <= 1 * 60 * 1000) {
        return (
          <Countdown
            date={Date.now() + Timer}
            onComplete={() => this.setState({ up: true })}
            renderer={renderseconds}
          />
        );
      } else if (Time >= 60 * 60 * 1000) {
        return <Countdown date={Date.now() + Timer} renderer={renderHour} />;
      }
    };

    const renderAll = () => {
      if (this.props.raceStatus === "Closed") {
        clearInterval(this.interval);
        return <div>TBA</div>;
      } else {
        if (this.state.up) {
          return <UpTimer time={Time / 1000} />;
        } else {
          return renderCounter();
        }
      }
    };
    return <div style={this.props.style}>{renderAll()}</div>;
  }
}
