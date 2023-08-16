import React from "react";
import { Col } from "reactstrap";
import "./melbourne.scss";
// import melbourne from "./melbourne2.png"
import melbourneM from "./mobile.png"
import { connect } from "react-redux";
import raceAction from "../../redux/actions/race";
import { useHistory } from "react-router-dom";
import Countdown from "react-countdown";
import moment from "moment";
import Blink from 'react-blink-text';
const Melbourne = (props) => {
  const history = useHistory()
  function navigate(p_id, venue, meetdate, racenum) {
    props.getRaceInfoOpt(
      { raceId: p_id, condition: "null", raceNum: "null" },
      true,
      0
    )
    history.push(`/horse-racing-tips/01-11-2022/Flemington/R7/50886`)
    window.scrollTo(0, 0);
  }

  let MelbourneDate = moment(props.trackInfo[0]?.meetdate + ' ' + props.trackInfo[0]?.race_time).format("DD/MM/YYYY HH:mm:ss")
  let now = moment().tz('Australia/Sydney').format("DD/MM/YYYY HH:mm:ss")
  var ms = moment(MelbourneDate, "DD/MM/YYYY HH:mm:ss").diff(moment(now, "DD/MM/YYYY HH:mm:ss"));
  var d = moment.duration(ms)
  const Completionist = () => <div style={{ marginLeft: 20 }}> <Blink text='Click here to view the race' fontSize='16' color='#44BD32'></Blink></div>;

  //here we can manipulate the form of the countdown
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return <div>
        <span style={{ fontSize: 16, color: 'white', marginLeft: 20, fontWeight: 600 }}>
          {days < 10 ? '0' + days : days} {days === 1 ? 'Day' : 'Days'} {hours < 10 ? '0' + hours : hours} {hours === 1 ? 'Hour' : 'Hours'} {minutes < 10 ? '0' + minutes : minutes} {minutes === 1 ? 'Minute' : 'Minutes'} {seconds < 10 ? '0' + seconds : seconds} {seconds === 1 ? 'Second' : 'Seconds'}
        </span>
        <br />
      </div>
    };
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 15,
          cursor: "pointer",
        }}
        onClick={() =>
          navigate("50886", "Flemington", "01-11-2022", "R7")
        }
      >
        <Col
          className="box"
          md={12}
          style={{

            justifyContent: "center",
            alignIterms: "center",
            borderRadius: 10,
            flexDirection: "column",
            textAlign: "left",
            paddingTop: 0,
            backgroundImage: `url(${window.innerWidth > 1200 ? melbourneM : melbourneM})`,
          }}
        >
          <div style={{ maxWidth: "100%", textAlign: 'left', marginTop: 20 }}>
            <span
              style={{
                fontSize: window.innerWidth > 1200 ? 50 : 20,
                color: "#DAA520",
                opacity: 2,
                alignItems: 'left',
                textAlign: "left",
                maxWidth: "100%",
                marginLeft: 20,
              }}
            >
              MELBOURNE CUP
            </span>

            <br />
            <span
              style={{
                fontSize: window.innerWidth > 1200 ? 30 : 20,
                color: "white",
                fontWeight: "bolder",
                marginLeft: 20
              }}
            >
              {window.innerWidth > 1200 ? <>
                2022 &nbsp;&nbsp; TIPS & RATINGS</> : <>2022 &nbsp;&nbsp; TIPS</>}
              <br />
              <br />
              <br />
            </span>
            <span
              style={{
                fontSize: window.innerWidth > 1200 ? 20 : 15,
                color: "white",
                marginLeft: 20
              }}
            >
              {" "}
              F L E M I N G T O N &nbsp;&nbsp; R 7
            </span>
            <br />

            <span style={{ fontSize: 14, color: 'white', marginLeft: 20 }}>
              Tuesday, 1 November
            </span>
            <br />
            <span style={{ fontSize: 16, color: 'white', marginLeft: 20 }}>
              <Countdown
                renderer={renderer}
                intervalDelay={0}
                precision={3}
                date={Date.now() + Number(d)} />
            </span>

            <br />
            <br />
            {window.innerWidth > 1200 &&
              <>
                <br />
                <br />
                <br />
                <br />
              </>
            }
          </div>
        </Col>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  trackInfo: state.raceReducer.trackInfoOpt

});

const mapDispatchToProps = dispatch => ({
  getRaceInfoOpt: ({ raceId, condition, raceNum },
    boolean,
    int) => dispatch(raceAction.getRaceInfoOpt({ raceId, condition, raceNum },
      boolean,
      int))
})

export default connect(mapStateToProps, mapDispatchToProps)(Melbourne);
