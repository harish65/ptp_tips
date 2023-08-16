import moment from "moment";
import React from "react";
import { Badge, Col, Row } from "reactstrap";

// import CustCountDown from '../../../components/CustCountDown';
import Timer from "../../../components/Timer";
import Lock from "../../../components/Lock/Lock";

function NextToJump({
  meetdate,
  track_name,
  track_condition,
  race_num,
  race_time,
  track_description,
  track_distance,
  track_weather,
  race_status,
  PID,
  unibet_odds,
  sb_odds,
  horse_nb,
  selections_first,
  selections_second,
}) {
  var racetime = race_time;
  var RaceHour = Number(race_time?.split(":")[0]) * 60 * 60 * 1000;
  var RaceMin = Number(race_time?.split(":")[1]) * 60 * 1000;
  var RTime = RaceHour + RaceMin;
  var formatted = moment(race_time, "HH:mm").format("HH:mm");
  var rStatus = race_status;

  var curentDate = moment().tz("Australia/Sydney").format("YYYYMMDD");
  var rDate =
    meetdate?.split("-")[0] + meetdate?.split("-")[1] + meetdate?.split("-")[2];

  const conditions = (val) => {
    const condition = val;
    switch (condition) {
      case "F":
        return "FIRM";
      case "G":
        return "GOOD";
      case "SO":
        return "SOFT";
      case "SY":
        return "SYNTHETIC";
      case "H":
        return "HEAVY";
      case "N/A":
        return "N/A";
      case "ABND":
        return "ABND";
      default:
        return "GOOD";
    }
  };

  const TimerCheck = (RaceTime, formatted, racetime, rStatus) => {
    // console.log(RaceTime)
    var currentTime =
      (Number(moment().tz("Australia/Sydney").format("HH")) * 60 +
        Number(moment().tz("Australia/Sydney").format("mm"))) *
      60 *
      1000;
    var timeComp = RaceTime - currentTime;
    if (timeComp > 1 * 60 * 60 * 1000) {
      return formatted;
    } else if (timeComp < 1 * 60 * 60 * 1000) {
      return (
        <div style={{ marginTop: "2px" }}>
          <Timer raceTimer={RaceTime} raceTime={racetime} status={rStatus} />
        </div>
      );
    }
  };

  const DateCheck = (CD, RD, RaceTime, formatted, racetime, rStatus) => {
    if (CD < RD) {
      return formatted;
    } else {
      return TimerCheck(RaceTime, formatted, racetime, rStatus);
    }
  };

  const conditionColor = (val) => {
    switch (val) {
      case "F":
        return "black";
      case "G":
        return "#44bd32";
      case "SO":
        return "#FFA800";
      case "SY":
        return "#20c997";
      case "H":
        return "#F64E60";
      case "N/A":
        return "grey";
      case "ABND":
        return "grey";
      default:
        return "GOOD";
    }
  };

  const sbWin = Number(sb_odds?.split(",")[0]).toFixed(2);
  const sbPlace = Number(sb_odds?.split(",")[1]).toFixed(2);
  const uniWin = Number(unibet_odds?.split(",")[0]).toFixed(2);
  const uniPlace = Number(unibet_odds?.split(",")[1]).toFixed(2);

  const renderNumber = (val) => {
    if (val < 10) {
      return "0" + val;
    } else {
      return val;
    }
  };

  const renderNA = () => {
    if (track_condition === "N/A") {
      return <Col></Col>;
    } else {
      return (
        <Col
          xs={6}
          md={6}
          lg={6}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            flexDirection: "column",
          }}
        >
          <Lock
            data={
              <Col
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  flexDirection: "column",
                }}
              >
                <div>
                  <Row
                    style={{
                      paddingRight: 10,
                      width: "200px",
                      marginTop: "4px",
                    }}
                  >
                    <div style={{ marginLeft: "12px" }}>
                      <strong>No.{renderNumber(horse_nb)}</strong>
                    </div>
                    <div style={{ marginLeft: "28px" }}>
                      <strong>{Math.round(selections_first)}%</strong>
                    </div>
                    <div style={{ marginLeft: "28px" }}>
                      <strong>
                        +{Math.round(selections_first - selections_second)}%
                      </strong>
                    </div>
                  </Row>
                </div>

                <div style={{ marginTop: 8 }}>
                  <Row>
                    <Col style={{ width: 100, display: "flex" }}>
                      {/* <img width="20" src="https://dnu5embx6omws.cloudfront.net/Logos/sportsbetting/30x30@2x.png" /> */}
                      <strong style={{ marginLeft: 8 }}>${sbWin}</strong>
                    </Col>

                    <Col style={{ width: 100, display: "flex" }}>
                      <img
                        width="20"
                        src="https://dnu5embx6omws.cloudfront.net/Logos/unibet/30x30@2x.png"
                      />
                      <strong style={{ marginLeft: 8 }}>${uniWin}</strong>
                    </Col>
                  </Row>
                </div>
              </Col>
            }
          />
        </Col>
      );
    }
  };
  return (
    // <div style={{ backgroundColor: "white", borderRadius: "4px", padding: "10px", marginTop: "10px" }} key={PID}>
    //   <div style={{ display: "flex", justifyContent: "space-between" }}>
    //     <div>{track_name} Race {race_num}</div>
    //     {DateCheck(curentDate, rDate, RTime, formatted, racetime, rStatus)}
    //   </div>
    //   <div style={{ display: "flex", justifyContent: "space-between" }}>
    //     <div> {track_description}</div>
    //     <div style={{ display: "flex" }}> <div style={{ marginLeft: "10px" }}>{track_distance}</div>{track_weather}</div>
    //   </div>
    // </div>
    <Col
      xs={12}
      md={12}
      lg={12}
      style={{
        backgroundColor: "white",
        padding: 16,
        marginTop: 8,
        borderRadius: 8,
        alignItems: "center",
      }}
    >
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col
          xs={6}
          md={6}
          lg={6}
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <h4 style={{ marginTop: 7 }}>
            <strong>
              {track_name} Race {race_num}
            </strong>
          </h4>
          <Badge
            style={{
              backgroundColor: conditionColor(track_condition),
              color: "white",
            }}
          >
            <strong>{conditions(track_condition)}</strong>
          </Badge>
          <div></div>
        </Col>

        {renderNA()}
      </Row>
    </Col>
  );
}

export default NextToJump;
