import React, { Component } from "react";
import { Col } from "reactstrap";
import raceAction from "../../redux/actions/race";
import selectionsAction from "../../redux/actions/selections";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment-timezone";
import { isIOS, isMacOs } from "react-device-detect";
import CountdownUnit from "../CountdownTimer/CountdownUnit";
import "./melbourne.scss";
import Timer from "./Timer";
import "./Timer.css";
// import { GiLaurelsTrophy } from "react-icons/gi";
// import { FaCalendarCheck } from "react-icons/fa";
import melbourne from "../image/melbourne2.jpg";
import { Brightness1 } from "@material-ui/icons";

class Melbourne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: [
        {
          unit: "days",
          value: "",
        },
        {
          unit: "hours",
          value: "",
        },
        {
          unit: "mins",
          value: "",
        },
        {
          unit: "secs",
          value: "",
        },
      ],
    };
  }

  //componentDidMount() {
  //  //let endDate = moment("02-11-2021 15:00:00", "MM-DD-YYYY hh:mm:ss");
  //  let countdown = this.state.countdown;
  //  let distance;

  //this.timer = setInterval(() => {
  //  let now = moment().format("MM-DD-YYYY hh:mm:ss");
  //  //distance = endDate - moment(now);
  //  if (distance > 0) {
  //    // Days
  //    countdown[0]["value"] = parseInt(distance / (60 * 60 * 24), 10);
  //    // Hours
  //    countdown[1].value = parseInt(
  //      (distance % (60 * 60 * 24)) / (60 * 60),
  //      10
  //    );
  //    // Minutes
  //    countdown[2].value = parseInt((distance % (60 * 60)) / 60, 10);
  //    // Seconds
  //    countdown[3].value = parseInt(distance % 60, 10);
  //    this.setState({ countdown });
  //  } else {
  //    this.setState({ countdown: "" });
  //  }
  //});
  //}

  //componentWillUnmount() {
  //  clearInterval(this.timer);
  //}

  navigate(p_id, venue, meetdate, racenum) {
    const { dispatch } = this.props;
    // dispatch(raceAction.getRaceInfo({ raceId: p_id }));
    dispatch(
      raceAction.getRaceInfoOpt(
        { raceId: p_id, condition: "null", raceNum: "null" },
        true,
        0
      )
    );
    // dispatch(raceAction.getRaceInfo({ raceId: p_id }));
    // dispatch(selectionsAction.getSelectionsForDate({ passDate: moment(meetdate).format('YYYY-MM-DD') }))
    this.props.history.push(`/horse-racing-tips/${meetdate}/${venue}/${racenum}/${p_id}`);
    // this.props.history.push(`/horse-racing-tips/today/Cranbourne/R2/30792`);
    window.scrollTo(0, 0);
  }

  // renderCount(){
  //   if(isIOS){
  //     return null
  //   }else if(isMacOs){
  //     return null
  //   }else{
  //     return (
  //       <div className="countdown" style={this.state.countdownStyle}>
  //       {this.state.countdown.map((countdownUnit, index) => <CountdownUnit key={index} countdownUnit={countdownUnit} />)}
  //     </div>
  //     )
  //   }
  // }

  //renderCount() {
  //  if (isIOS) {
  //    return null;
  //  } else if (isMacOs) {
  //    return null;
  //  } else {
  //    return (
  //      <div className="countdown" style={this.state.countdownStyle}>
  //        {this.state.countdown.map((countdownUnit, index) => (
  //          <CountdownUnit key={index} countdownUnit={countdownUnit} />
  //        ))}
  //      </div>
  //    );
  //  }
  //}
  //startDate = new Date().tz("Australia/Sydney").getTime();

  render() {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 12,
            marginBottom: 15,
            cursor: "pointer",
          }}
          onClick={() =>
            this.navigate("31121", "Flemington", "02-11-2021", "R7")
          }
        >
          <Col
            className="box"
            md={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignIterms: "center",

              borderRadius: 10,
              flexDirection: "column",
              textAlign: "center",
              paddingTop: 0,
              paddingBottom: 25,
              backgroundImage: `url(${melbourne})`,
              maxWidth: "100%",
            }}
          >
            <br />
            <div style={{ maxWidth: "100%", height: "auto" }}>
              <h1
                style={{
                  fontSize: 50,
                  fontWeight: "bold",
                  color: "white",
                  opacity: 2,

                  textAlign: "center",
                  fontFamily: "Impact, fantasy	",
                  maxWidth: "100%",
                  height: "50%",
                }}
              >
                {/* <GiLaurelsTrophy style={{ fontSize: 50, color: "white" }} />{" "} */}
                <u> MELBOURNE CUP 2021 </u>
                {/* <GiLaurelsTrophy style={{ fontSize: 50, color: "white" }} /> */}
              </h1>
              <span
                style={{
                  fontSize: 30,
                  color: "white",
                  marginTop: 8,
                  fontWeight: "bolder",
                  marginRight: 5,
                }}
              >
                Flemington Race 7
                <br />
              </span>
              <span
                style={{
                  fontSize: 30,
                  color: "white",

                  fontWeight: "bolder",
                  marginRight: 5,
                }}
              >
                {" "}
                {/* <FaCalendarCheck
                  style={{ fontSize: 20, marginBottom: "5px", color: "white" }}
                /> */}
                Tuesday, 2nd of November{" "}
              </span>
            </div>
            <div style={{ marginTop: "5px" }}>
              <Timer />
            </div>
            {/* COUNTDOWN TIMER
            {this.renderCount()} */}
          </Col>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

export default withRouter(connect(mapStateToProps)(Melbourne));
