import React from "react";

export default class uptimer extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.time < 0) {
      var time = Number(this.props.time) * -1;
    } else {
      time = this.props.time;
    }
    this.state = {
      count: Number(time) - Number((time / 60).toFixed(0)) * 60,
      min: Number(time / 60).toFixed(0),
    };
  }

  componentWillMount() {
    this.interval = setInterval(() => {
      const count = this.state.count;
      this.setState((prevState) => ({
        count: prevState.count + 1,
      }));

      if (count >= 59) {
        this.setState((prevState) => ({
          min: Number(prevState.min) + 1,
          count: 0,
        }));
      }
      if (count < 0) {
        this.setState({
          count: 0,
        });
      }
      if (this.props.raceStatus === "Closed") {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderAll() {
    if (this.props.time) {
      return (
        <div style={{ color: "red" }}>
          -{this.state.min}:
          {this.state.count < 10 ? `0${this.state.count}` : this.state.count}
        </div>
      );
    } else {
      return <p>...</p>;
    }
  }

  render() {
    // console.log((this.props.time / 60).toFixed(0))
    // console.log(this.props.time / 60 +"3ade")
    return this.renderAll();
  }
}
