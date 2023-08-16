import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { Table } from "antd";
import {
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  Badge,
  Row,
  Col,
  Collapse,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMedal,
  faTrophy,
  faAward,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import "moment-timezone";
import {
  ConvertUTCTimeToLocalTime,
  ConvertUTCTimeToLocalTime1,
  linkToRacePageWhileReturningDataToTable,
} from "../../../config/utils";

//COMPONENTS
import Timer from "../../../components/Timer";
import Lock from "../../../components/Lock/Lock";
import LoadingNew from "../../../components/loading/LoadingNew";
/* CSS */
import "../results.scss";
import "antd/dist/antd.css";
import "react-datepicker/dist/react-datepicker.css";

/* REDUX */
import resultAction from "../../../redux/actions/results";
import RaceResultHeader from "./RaceResultHeader";
// import { BorderBottom } from "@material-ui/icons";

class ResultsTable extends React.Component {
  state = {
    startDate: ConvertUTCTimeToLocalTime1(
      moment(this.props.match.params.date, "DD-MM-YYYY").format("YYYY-MM-DD")
    ),
    isOpen: true,
    today: true,
    yesterday: false,
    lastWed: false,
    lastSat: false,
    selected: false,
    obj: null,
    arr: [],
  };

  async componentWillMount() {
    const { dispatch } = this.props;
    await dispatch(
      resultAction.getResults({
        passDate: moment(this.transferRoute(), "DD-MM-YYYY").format(
          "YYYY-MM-DD"
        ),
      })
    );
    this.interval = setInterval(() => {
      dispatch(
        resultAction.getResultsForDateNoLoading({
          passDate: moment(this.transferRoute(), "DD-MM-YYYY").format(
            "YYYY-MM-DD"
          ),
        })
      );
    }, 30000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  transferRoute() {
    if (this.props.match.path === "/horse-racing-tips/results/today") {
      return moment().tz("Australia/Sydney").format("DD-MM-YYYY");
    } else if (
      this.props.match.path === "/horse-racing-tips/results/yesterday"
    ) {
      return moment()
        .tz("Australia/Sydney")
        .subtract(1, "day")
        .format("DD-MM-YYYY");
    } else if (
      this.props.match.path === "/horse-racing-tips/results/tomorrow"
    ) {
      return moment().tz("Australia/Sydney").add(1, "day").format("DD-MM-YYYY");
    }
    return this.props.match.params.date;
  }
  trigerDiv(i) {
    let a = this.state.arr.slice(); //creates the clone of the state
    a[i] = !a[i]; //changes the state of the specific index
    this.setState({ arr: a }); //sets the new state
  }

  racenavigation(zone) {
    var num = 0;
    if (
      zone.venue_details[zone.venue_details.length - 1].race_status === "Closed"
    ) {
      num = 0;
    } else {
      for (let i = 0; i < zone.venue_details.length; i++) {
        if (
          i === 0 &&
          zone.venue_details[i + 1].race_status === "Open" &&
          zone.venue_details[0].race_status === "Open"
        ) {
          num = 0;
        } else if (
          i === 0 &&
          zone.venue_details[i + 1].race_status === "Open" &&
          zone.venue_details[0].race_status === "Closed"
        ) {
          num = i + 1;
        } else if (
          zone.venue_details[i].race_status === "Open" &&
          zone.venue_details[i - 1].race_status === "Closed"
        ) {
          num = i;
        }
      }
    }
    return num;
  }

  racenum(meetdate, venue, number, p_id) {
    let r1 = <div className="pointer">{number}</div>;

    return linkToRacePageWhileReturningDataToTable(
      r1,
      meetdate,
      venue,
      number,
      p_id
    );
  }

  Selections(result, selec) {
    if (result === "WON") {
      return (
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col className="spacing2">
            <div style={{ color: "rgb(252, 179, 24)" }}>
              #{selec?.split(",")[0]}
            </div>
          </Col>
          <Col className="spacing2" style={{ color: "black" }}>
            #{selec?.split(",")[1]}
          </Col>
          <Col className="spacing2" style={{ color: "black" }}>
            #{selec?.split(",")[2]}
          </Col>
          <Col className="table_cell_selections" style={{ color: "black" }}>
            #{selec?.split(",")[3]}
          </Col>
        </Row>
      );
    } else if (result === "2ND") {
      return (
        <Row>
          <Col className="spacing2">
            <div style={{ color: "rgb(0, 103, 171)" }}>
              #{selec?.split(",")[0]}
            </div>
          </Col>
          <Col className="spacing2">#{selec?.split(",")[1]}</Col>
          <Col className="spacing2">#{selec?.split(",")[2]}</Col>
          <Col className="table_cell_selections" style={{ color: "black" }}>
            #{selec?.split(",")[3]}
          </Col>
        </Row>
      );
    } else if (result === "3RD") {
      return (
        <Row>
          <Col className="spacing2">
            <div style={{ color: "rgb(139, 52, 191)" }}>
              #{selec?.split(",")[0]}
            </div>
          </Col>
          <Col className="spacing2">#{selec?.split(",")[1]}</Col>
          <Col className="spacing2">#{selec?.split(",")[2]}</Col>
          <Col className="table_cell_selections" style={{ color: "black" }}>
            #{selec?.split(",")[3]}
          </Col>
        </Row>
      );
    } else {
      return (
        <Row>
          <Col className="spacing2">
            <div style={{ color: "red" }}>#{selec?.split(",")[0]}</div>
          </Col>
          <Col className="spacing2">#{selec?.split(",")[1]}</Col>
          <Col className="spacing2">#{selec?.split(",")[2]}</Col>
          <Col className="table_cell_selections" style={{ color: "black" }}>
            #{selec?.split(",")[3]}
          </Col>
        </Row>
      );
    }
  }

  conditionCheker(zone, zoneI, j, bookie) {
    let data = [];
    let r1 = (
      <div
        style={{
          backgroundColor: "rgb(252, 179, 24)",
          display: "flex",
          justifyContent: "center",
          borderRadius: 4,
          margin: "4px",
        }}
      >
        {" "}
        <Badge color="252, 179, 24">
          <strong style={{ color: "white" }}>
            <FontAwesomeIcon icon={faTrophy} size="2x" />
            1st
          </strong>
        </Badge>
      </div>
    );
    let r2 = (
      <div
        style={{
          backgroundColor: "rgb(9, 106, 179)",
          display: "flex",
          justifyContent: "center",
          borderRadius: 4,
          margin: "4px",
        }}
      >
        {" "}
        <Badge style={{ backgroundColor: "rgb(9, 106, 179)" }}>
          <strong style={{ color: "white" }}>
            <FontAwesomeIcon icon={faMedal} size="2x" />
            2nd
          </strong>
        </Badge>
      </div>
    );
    let r3 = (
      <div
        style={{
          backgroundColor: "rgb(139, 52, 191)",
          display: "flex",
          justifyContent: "center",
          borderRadius: 4,
          margin: "4px",
        }}
      >
        {" "}
        <Badge style={{ backgroundColor: "rgb(139, 52, 191)" }}>
          <strong style={{ color: "white" }}>
            <FontAwesomeIcon icon={faAward} size="2x" /> 3rd
          </strong>
        </Badge>
      </div>
    );

    if (zoneI.is_na === 1) {
      let r1 = <div className="na">N/R</div>;
      data.push({
        key: j,
        result: linkToRacePageWhileReturningDataToTable(
          r1,
          zoneI.meetdate,
          zone.track_name,
          zoneI.race_num,
          zoneI.point_id
        ),
        selections: <div className="na">N/R</div>,
        race: this.racenum(
          zoneI.meetdate,
          zone.track_name,
          zoneI.race_num,
          zoneI.point_id
        ),
        first: this.oddsAndPositionRender(
          zoneI.positions,
          1,
          zoneI.bookie_name
        ),
        second: this.oddsAndPositionRender(
          zoneI.positions,
          2,
          zoneI.bookie_name
        ),
        third: this.oddsAndPositionRender(
          zoneI.positions,
          3,
          zoneI.bookie_name
        ),
        cond: (
          <div className="condition">
            <Badge
              style={{
                textAlign: "center",
                backgroundColor: this.colors(zoneI),
                color: "white",
              }}
            >
              <strong />
              {this.conditions(zoneI)}
            </Badge>
          </div>
        ),
        bookie: bookie,
      });
    } else if (zoneI.result === "WON") {
      data.push({
        key: j,
        result: linkToRacePageWhileReturningDataToTable(
          r1,
          zoneI.meetdate,
          zone.track_name,
          zoneI.race_num,
          zoneI.point_id
        ),
        selections: this.Selections(zoneI.result, zoneI.selections),
        race: this.racenum(
          zoneI.meetdate,
          zone.track_name,
          zoneI.race_num,
          zoneI.point_id
        ),
        bookie: bookie,
        first: (
          <div
            style={{
              backgroundColor: "rgb(252, 179, 24)",
              color: "white",
              borderRadius: 4,
              margin: "2px",
            }}
          >
            {this.oddsAndPositionRender(zoneI.positions, 1, zoneI.bookie_name)}
          </div>
        ),
        second: this.oddsAndPositionRender(
          zoneI.positions,
          2,
          zoneI.bookie_name
        ),
        third: this.oddsAndPositionRender(
          zoneI.positions,
          3,
          zoneI.bookie_name
        ),
        cond: (
          <div className="condition">
            <Badge
              style={{
                textAlign: "center",
                backgroundColor: this.colors(zoneI),
                color: "white",
              }}
            >
              <strong />
              {this.conditions(zoneI)}
            </Badge>
          </div>
        ),
      });
    } else if (zoneI.result === "2ND") {
      data.push({
        key: j,
        result: linkToRacePageWhileReturningDataToTable(
          r2,
          zoneI.meetdate,
          zone.track_name,
          zoneI.race_num,
          zoneI.point_id
        ),
        selections: this.Selections(zoneI.result, zoneI.selections),
        race: this.racenum(
          zoneI.meetdate,
          zone.track_name,
          zoneI.race_num,
          zoneI.point_id
        ),
        bookie: bookie,
        first: this.oddsAndPositionRender(
          zoneI.positions,
          1,
          zoneI.bookie_name
        ),
        second: (
          <div
            style={{
              backgroundColor: "rgb(0, 103, 171)",
              color: "white",
              borderRadius: 4,
              margin: "2px",
            }}
          >
            {this.oddsAndPositionRender(zoneI.positions, 2, zoneI.bookie_name)}
          </div>
        ),
        third: this.oddsAndPositionRender(
          zoneI.positions,
          3,
          zoneI.bookie_name
        ),
        cond: (
          <div className="condition">
            <Badge
              style={{
                textAlign: "center",
                backgroundColor: this.colors(zoneI),
                color: "white",
              }}
            >
              <strong />
              {this.conditions(zoneI)}
            </Badge>
          </div>
        ),
      });
    } else if (zoneI.result === "3RD") {
      data.push({
        key: j,
        result: linkToRacePageWhileReturningDataToTable(
          r3,
          zoneI.meetdate,
          zone.track_name,
          zoneI.race_num,
          zoneI.point_id
        ),
        selections: this.Selections(zoneI.result, zoneI.selections),
        race: this.racenum(
          zoneI.meetdate,
          zone.track_name,
          zoneI.race_num,
          zoneI.point_id
        ),
        bookie: bookie,
        first: this.oddsAndPositionRender(
          zoneI.positions,
          1,
          zoneI.bookie_name
        ),
        second: this.oddsAndPositionRender(
          zoneI.positions,
          2,
          zoneI.bookie_name
        ),
        third: (
          <div
            style={{
              backgroundColor: "rgb(139, 52, 191)",
              color: "white",
              borderRadius: 4,
              margin: "2px",
            }}
          >
            {this.oddsAndPositionRender(zoneI.positions, 3, zoneI.bookie_name)}
          </div>
        ),
        cond: (
          <div className="condition">
            <Badge
              style={{
                textAlign: "center",
                backgroundColor: this.colors(zoneI),
                color: "white",
              }}
            >
              <strong />
              {this.conditions(zoneI)}
            </Badge>
          </div>
        ),
      });
    } else {
      let r1 = (
        <div
          style={{ display: "flex", justifyContent: "center", color: "red" }}
        >
          {zoneI.result}
        </div>
      );
      data.push({
        key: j,
        result: linkToRacePageWhileReturningDataToTable(
          r1,
          zoneI.meetdate,
          zone.track_name,
          zoneI.race_num,
          zoneI.point_id
        ),
        selections: this.Selections(zoneI.result, zoneI.selections),
        race: this.racenum(
          zoneI.meetdate,
          zone.track_name,
          zoneI.race_num,
          zoneI.point_id
        ),
        bookie: bookie,
        first: this.oddsAndPositionRender(
          zoneI.positions,
          1,
          zoneI.bookie_name
        ),
        second: this.oddsAndPositionRender(
          zoneI.positions,
          2,
          zoneI.bookie_name
        ),
        third: this.oddsAndPositionRender(
          zoneI.positions,
          3,
          zoneI.bookie_name
        ),
        cond: (
          <div className="condition">
            <Badge
              style={{
                textAlign: "center",
                backgroundColor: this.colors(zoneI),
                color: "white",
              }}
            >
              <strong />
              {this.conditions(zoneI)}
            </Badge>
          </div>
        ),
      });
    }
    return data;
  }

  abandonedCondition(zoneI, key) {
    let data = [];
    data.push({
      key: key,
      result: <div className="abnd">ABND</div>,
      selections: <div className="abnd">ABND</div>,
      race: zoneI.race_num,
      first: <div className="abnd">ABND</div>,
      second: <div className="abnd">ABND</div>,
      third: <div className="abnd">ABND</div>,
      cond: (
        <div className="condition">
          <Badge
            style={{
              textAlign: "center",
              backgroundColor: this.colors(zoneI),
              color: "white",
            }}
          >
            <strong />
            {this.conditions(zoneI)}
          </Badge>
        </div>
      ),
      bookie: <div className="abnd">ABND</div>,
    });
    return data;
  }

  openTabBookie(bookie, BbId) {
    let BbUrl =
      "https://www.boombet.com.au/racing/" + BbId + "/?Referrer=PTPTips";
    if (bookie === "Unibet") {
      return "https://b1.trickyrock.com/redirect.aspx?pid=31144281&bid=21418";
    } else {
      return BbUrl;
    }
  }

  oddsAndPositionRender(positions, pos, bookie) {
    if (pos === 1) {
      if (bookie === "Unibet") {
        return (
          <a
            style={{ color: "inherit" }}
            target="_blank"
            rel="noreferrer"
            href={this.openTabBookie(bookie)}
          >
            <div className="first">
              {positions[0]?.position === pos ? (
                <Row className="spacing1">
                  <Col className="fnum">{positions[0]?.tab_no}</Col>
                  <Col className="fodds">
                    ${Number(positions[0]?.ub_win).toFixed(2)}
                  </Col>
                </Row>
              ) : (
                ""
              )}
              {positions[1]?.position === pos ? (
                <Row className="spacing1">
                  <Col className="fnum">{positions[1]?.tab_no}</Col>
                  <Col className="fodds">
                    ${Number(positions[1]?.ub_win).toFixed(2)}
                  </Col>
                </Row>
              ) : (
                ""
              )}
              {positions[2]?.position === pos ? (
                <Row className="spacing1">
                  <Col className="fnum">{positions[2]?.tab_no}</Col>
                  <Col className="fodds">
                    ${Number(positions[2]?.ub_win).toFixed(2)}
                  </Col>
                </Row>
              ) : (
                ""
              )}
              {positions[3]?.position === pos ? (
                <Row className="spacing1">
                  <Col className="fnum">{positions[2]?.tab_no}</Col>
                  <Col className="fodds">
                    ${Number(positions[3]?.ub_win).toFixed(2)}
                  </Col>
                </Row>
              ) : (
                ""
              )}
            </div>
          </a>
        );
      } else {
        return (
          <a
            style={{ color: "inherit" }}
            target="_blank"
            rel="noreferrer"
            href={this.openTabBookie(bookie)}
          >
            <div className="first">
              {positions[0]?.position === pos ? (
                <Row className="spacing1">
                  <Col className="fnum">{positions[0]?.tab_no}</Col>
                  <Col className="fodds">
                    ${Number(positions[0]?.sb_win).toFixed(2)}
                  </Col>
                </Row>
              ) : (
                ""
              )}
              {positions[1]?.position === pos ? (
                <Row className="spacing1">
                  <Col className="fnum">{positions[1]?.tab_no}</Col>
                  <Col className="fodds">
                    ${Number(positions[1]?.sb_win).toFixed(2)}
                  </Col>
                </Row>
              ) : (
                ""
              )}
              {positions[2]?.position === pos ? (
                <Row className="spacing1">
                  <Col className="fnum">{positions[2]?.tab_no}</Col>
                  <Col className="fodds">
                    ${Number(positions[2]?.sb_win).toFixed(2)}
                  </Col>
                </Row>
              ) : (
                ""
              )}
              {positions[3]?.position === pos ? (
                <Row className="spacing1">
                  <Col className="fnum">{positions[3]?.tab_no}</Col>
                  <Col className="fodds">
                    ${Number(positions[3]?.sb_win).toFixed(2)}
                  </Col>
                </Row>
              ) : (
                ""
              )}
            </div>
          </a>
        );
      }
    } else {
      if (bookie === "Unibet") {
        return (
          <a
            style={{ color: "inherit" }}
            target="_blank"
            rel="noreferrer"
            href={this.openTabBookie(bookie)}
          >
            <div className="first">
              {positions[0]?.position === pos ? (
                <Row className="spacing1">
                  <Col className="fnum">{positions[0]?.tab_no}</Col>
                  <Col className="fodds">
                    ${Number(positions[0]?.ub_place).toFixed(2)}
                  </Col>
                </Row>
              ) : (
                ""
              )}
              {positions[1]?.position === pos ? (
                <Row className="spacing1">
                  <Col className="fnum">{positions[1]?.tab_no}</Col>
                  <Col className="fodds">
                    ${Number(positions[1]?.ub_place).toFixed(2)}
                  </Col>
                </Row>
              ) : (
                ""
              )}
              {positions[2]?.position === pos ? (
                <Row className="spacing1">
                  <Col className="fnum">{positions[2]?.tab_no}</Col>
                  <Col className="fodds">
                    ${Number(positions[2]?.ub_place).toFixed(2)}
                  </Col>
                </Row>
              ) : (
                ""
              )}
              {positions[3]?.position === pos ? (
                <Row className="spacing1">
                  <Col className="fnum">{positions[2]?.tab_no}</Col>
                  <Col className="fodds">
                    ${Number(positions[3]?.ub_place).toFixed(2)}
                  </Col>
                </Row>
              ) : (
                ""
              )}
            </div>
          </a>
        );
      } else {
        return (
          <a
            style={{ color: "inherit" }}
            target="_blank"
            rel="noreferrer"
            href={this.openTabBookie(bookie)}
          >
            <div className="first">
              {positions[0]?.position === pos ? (
                <Row className="spacing1">
                  <Col className="fnum">{positions[0]?.tab_no}</Col>
                  <Col className="fodds">
                    ${Number(positions[0]?.sb_place).toFixed(2)}
                  </Col>
                </Row>
              ) : (
                ""
              )}
              {positions[1]?.position === pos ? (
                <Row className="spacing1">
                  <Col className="fnum">{positions[1]?.tab_no}</Col>
                  <Col className="fodds">
                    ${Number(positions[1]?.sb_place).toFixed(2)}
                  </Col>
                </Row>
              ) : (
                ""
              )}
              {positions[2]?.position === pos ? (
                <Row className="spacing1">
                  <Col className="fnum">{positions[2]?.tab_no}</Col>
                  <Col className="fodds">
                    ${Number(positions[2]?.sb_place).toFixed(2)}
                  </Col>
                </Row>
              ) : (
                ""
              )}
              {positions[3]?.position === pos ? (
                <Row className="spacing1">
                  <Col className="fnum">{positions[3]?.tab_no}</Col>
                  <Col className="fodds">
                    ${Number(positions[3]?.sb_place).toFixed(2)}
                  </Col>
                </Row>
              ) : (
                ""
              )}
            </div>
          </a>
        );
      }
    }
  }

  conditions = (val) => {
    const condition = val.track_condition;
    switch (condition) {
      case "F":
        return "FIRM";
      case "G":
        return "GOOD";
      case "SO":
        return "SOFT";
      case "SY":
        return "SYNTH";
      case "H":
        return "HEAVY";
      case "N/A":
        return "N/R";
      case "ABND":
        return "ABND";
      default:
        return "GOOD";
    }
  };
  colors = (val) => {
    const color = val.track_condition;
    switch (color) {
      case "F":
        return "#343a40";
      case "G":
        return "#44bd32";
      case "SO":
        return "#fcb317";
      case "SY":
        return "#28a745";
      case "H":
        return "#dc3545";
      case "N/A":
        return "#fa7800";
      case "ABND":
        return "#b92722";
      default:
        return "#218838";
    }
  };
  assignDataBasedOnCondition(value1, value2, dh) {
    if (dh === "DeadHeat") {
      return value1;
    } else {
      return value2;
    }
  }
  all() {
    moment.defaultFormat = "DD.MM.YYYY HH:mm";
    var d = moment().tz("Australia/Sydney");
    var t = moment(d).format("YYYYMMDD");
    var s = moment(this.transferRoute(), "DD-MM-YYYY").format("YYYYMMDD");
    let arr = [];
    const Cards = this.props.results.map((zone, i) => {
      arr.push();
      let cardname = zone.track_name;
      let venue_history = zone?.venue_history;
      let index = this.racenavigation(zone);
      let r1 = (
        <div className="table_selections">
          <div style={{ fontSize: "20", fontWeight: "700", padding: "0px" }}>
            {cardname}
          </div>{" "}
          <div style={{ marginLeft: "10px" }}> Selections</div>
        </div>
      );
      const columns = [
        {
          title: <div className="table_result">Result</div>,
          dataIndex: "result",
          width: 10,
          fontWeight: 600,
        },
        {
          title: <div className="table_race">RACE</div>,
          dataIndex: "race",
          width: "10px",
          render(text, record) {
            return {
              props: {
                style: {
                  background: "transparent",
                  textAlign: "center",
                  color: "black",
                  fontSize: "13px",
                  fontWeight: 600,
                },
              },
              children: <div>{text}</div>,
            };
          },
        },
        {
          title: linkToRacePageWhileReturningDataToTable(
            r1,
            zone.venue_details[index].meetdate,
            zone.track_name,
            zone.venue_details[index].race_num,
            zone.venue_details[index].point_id
          ),
          dataIndex: "selections",
          width: 300,
        },

        {
          title: <div className="table_bookie">Bookie</div>,
          dataIndex: "bookie",
          width: 20,
        },
        {
          title: <div className="table_first">First</div>,
          dataIndex: "first",
          width: 20,
        },
        {
          title: <div className="table_second">Second</div>,
          dataIndex: "second",
          width: 20,
        },
        {
          title: <div className="table_third">Third</div>,

          dataIndex: "third",
          width: 20,
        },
        {
          title: <div className="table_cond">Track</div>,
          dataIndex: "cond",
          width: 30,
        },
      ];

      var data = [];
      var selec = 0;
      var win = 0;
      var lose = 0;
      var secnd = 0;
      var third = 0;
      // eslint-disable-next-line array-callback-return
    zone.venue_details.map((zoneI, j) => {
      
        var bookie = "";
        if (zoneI.bookie_name === "Unibet") {
          bookie = (
            <a
              style={{ color: "black" }}
              target="_blank"
              rel="noreferrer"
              href={this.openTabBookie(zoneI.bookie_name)}
            >
              <div
                style={{
                  textAlign: "center",
                  backgroundColor: "#111111",
                  margin: "2px",
                  borderRadius: "5px",
                }}
              >
                {" "}
                <img
                  className="bookie-logo"
                  src={
                    "https://dnu5embx6omws.cloudfront.net/Logos/unibet/30x30@2x.png"
                  }
                  alt=""
                />
              </div>
            </a>
          );
        } else {
          bookie = (
            <a
              style={{ color: "black", width: "20" }}
              target="_blank"
              rel="noreferrer"
              href={this.openTabBookie(zoneI.bookie_name, zoneI.sb_venue_id)}
            >
              <div
                style={{
                  textAlign: "center",
                  backgroundColor: "transparent",
                  margin: "2px",
                  borderRadius: "5px",
                  color: "#e12b80",
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                BB
              </div>
            </a>
          );
        }
        if (zoneI.is_na !== 1 && zoneI.track_condition !== "ABND") {
          if (zoneI.result === "WON") {
            win = win + 1;
            selec = selec + 1;
          } else if (zoneI.result === "LOST") {
            lose = lose + 1;
            selec = selec + 1;
          } else if (zoneI.result === "2ND") {
            secnd = secnd + 1;
            selec = selec + 1;
          } else if (zoneI.result === "3RD") {
            third = third + 1;
            selec = selec + 1;
          }
        }

        //formating current time and race time in order to caompare  them
        var raceTime = Number(
          Number(moment(zoneI.race_time, "HH:mm:ss").format("HH")) * 60 +
            Number(moment(zoneI.race_time, "HH:mm:ss").format("mm"))
        );
        var actualTime = Number(
          Number(moment().tz("Australia/Sydney").format("HH")) * 60 +
            Number(moment().tz("Australia/Sydney").format("mm"))
        );
        var timedif = raceTime - actualTime;
        var Rt =
          Number(moment(zoneI.race_time, "HH:mm:ss").format("HH")) *
            60 *
            60 *
            1000 +
          Number(moment(zoneI.race_time, "HH:mm:ss").format("mm")) * 60 * 1000;
        var racetimee = zoneI.race_time;
        var rStatus = zoneI.race_status;
        if (s === t) {
          //checking race status based on track condition
          if (zoneI.track_condition === "ABND") {
            let response = this.abandonedCondition(zoneI, j);
            data.push({
              result: response[0].result,
              key: response[0].key,
              selections: response[0].selections,
              race: response[0].race,
              first: response[0].first,
              second: response[0].second,
              third: response[0].third,
              cond: response[0].cond,
              bookie: response[0].bookie,
            });
          } else {
            //checking if race hasent been played yet or is about to start
            if (raceTime >= actualTime) {
              //checking if time diffrence is less than 1 hour in order to trigger the timer
              if (timedif < 60 && timedif > 0) {
                let r1 = (
                  <div style={{ textAlign: "center" }} className="pointer">
                    <Timer
                      raceTimer={Rt}
                      raceTime={racetimee}
                      status={rStatus}
                    />
                  </div>
                );
                let sel;
                if (zoneI.is_na === 1) {
                  sel = <div className="na">N/R</div>;
                } else {
                  sel = (
                    <div style={{ textAlign: "center" }}>
                      <Lock
                        data={
                          <Row>
                            <Col className="spacing2">
                              #{zoneI.selections?.split(",")[0]}
                            </Col>
                            <Col className="spacing2">
                              #{zoneI.selections?.split(",")[1]}
                            </Col>
                            <Col className="spacing2">
                              #{zoneI.selections?.split(",")[2]}
                            </Col>
                            <Col className="table_cell_selections">
                              #{zoneI.selections?.split(",")[3]}
                            </Col>
                          </Row>
                        }
                      />
                    </div>
                  );
                }
                data.push({
                  key: j,
                  result: linkToRacePageWhileReturningDataToTable(
                    r1,
                    zoneI.meetdate,
                    zone.track_name,
                    zoneI.race_num,
                    zoneI.point_id
                  ),
                  selections: sel,
                  race: this.racenum(
                    zoneI.meetdate,
                    zone.track_name,
                    zoneI.race_num,
                    zoneI.point_id
                  ),
                  first: (
                    <div
                      onClick={() => {
                        this.openTabBookie(zoneI.bookie_name);
                      }}
                      className="table_tba"
                    >
                      TBA
                    </div>
                  ),
                  second: (
                    <div
                      onClick={() => {
                        this.openTabBookie(zoneI.bookie_name);
                      }}
                      className="table_tba"
                    >
                      TBA
                    </div>
                  ),
                  third: (
                    <div
                      onClick={() => {
                        this.openTabBookie(zoneI.bookie_name);
                      }}
                      className="table_tba"
                    >
                      TBA
                    </div>
                  ),
                  cond: (
                    <div className="condition">
                      <Badge
                        style={{
                          textAlign: "center",
                          backgroundColor: this.colors(zoneI),
                          color: "white",
                        }}
                      >
                        <strong />
                        {this.conditions(zoneI)}
                      </Badge>
                    </div>
                  ),
                  bookie: bookie,
                });
              } else {
                //in this case the race hasent been played yet so we display the race time
                let r1 = (
                  <div className="pointer" style={{ textAlign: "center" }}>
                    {ConvertUTCTimeToLocalTime(
                      moment(zoneI.race_time, "HH:mm:ss").format("HH:mm")
                    )}
                  </div>
                );
                let sel;
                if (zoneI.is_na === 1) {
                  sel = <div className="na">N/R</div>;
                } else {
                  sel = (
                    <div style={{ textAlign: "center" }}>
                      <Lock
                        data={
                          <Row>
                            <Col className="spacing2">
                              #{zoneI.selections?.split(",")[0]}
                            </Col>
                            <Col className="spacing2">
                              #{zoneI.selections?.split(",")[1]}
                            </Col>
                            <Col className="spacing2">
                              #{zoneI?.selections?.split(",")[2]}
                            </Col>
                            <Col className="table_cell_selections">
                              #{zoneI?.selections?.split(",")[3]}
                            </Col>
                          </Row>
                        }
                      />
                    </div>
                  );
                }
                data.push({
                  key: j,
                  result: linkToRacePageWhileReturningDataToTable(
                    r1,
                    zoneI.meetdate,
                    zone.track_name,
                    zoneI.race_num,
                    zoneI.point_id
                  ),
                  selections: sel,
                  race: this.racenum(
                    zoneI.meetdate,
                    zone.track_name,
                    zoneI.race_num,
                    zoneI.point_id
                  ),
                  first: (
                    <a
                      style={{ color: "inherit" }}
                      target="_blank"
                      rel="noreferrer"
                      href={this.openTabBookie(zoneI.bookie_name)}
                    >
                      <div className="table_tba">TBA</div>
                    </a>
                  ),
                  second: (
                    <a
                      style={{ color: "inherit" }}
                      target="_blank"
                      rel="noreferrer"
                      href={this.openTabBookie(zoneI.bookie_name)}
                    >
                      <div className="table_tba">TBA</div>
                    </a>
                  ),
                  third: (
                    <a
                      style={{ color: "inherit" }}
                      target="_blank"
                      rel="noreferrer"
                      href={this.openTabBookie(zoneI.bookie_name)}
                    >
                      <div className="table_tba">TBA</div>
                    </a>
                  ),
                  cond: (
                    <div className="condition">
                      <Badge
                        style={{
                          textAlign: "center",
                          backgroundColor: this.colors(zoneI),
                          color: "white",
                        }}
                      >
                        <strong />
                        {this.conditions(zoneI)}
                      </Badge>
                    </div>
                  ),
                  bookie: bookie,
                });
              }
            } else {
              //checking if race has been played
              if (raceTime < actualTime) {
                //checking if the results have been updated in order to display them
                if (zoneI.result) {
                  let response = this.conditionCheker(zone, zoneI, j, bookie);
                  data.push({
                    result: response[0].result,
                    key: response[0].key,
                    selections: response[0].selections,
                    race: response[0].race,
                    first: response[0].first,
                    second: response[0].second,
                    third: response[0].third,
                    cond: response[0].cond,
                    bookie: response[0].bookie,
                  });
                } else {
                  let r1;
                  let sel;
                  if (zoneI.is_na === 1) {
                    r1 = <div className="na">N/R</div>;
                    sel = <div className="na">N/R</div>;
                  } else {
                    r1 = <div className="table_tba">TBA</div>;
                    sel = (
                      <div style={{ textAlign: "center" }}>
                        <Lock
                          data={
                            <Row>
                              <Col className="spacing2">
                                #{zoneI.selections?.split(",")[0]}
                              </Col>
                              <Col className="spacing2">
                                #{zoneI.selections?.split(",")[1]}
                              </Col>
                              <Col className="spacing2">
                                #{zoneI?.selections?.split(",")[2]}
                              </Col>
                              <Col className="table_cell_selections">
                                #{zoneI?.selections?.split(",")[3]}
                              </Col>
                            </Row>
                          }
                        />
                      </div>
                    );
                  }
                  data.push({
                    key: j,
                    result: linkToRacePageWhileReturningDataToTable(
                      r1,
                      zoneI.meetdate,
                      zone.track_name,
                      zoneI.race_num,
                      zoneI.point_id
                    ),
                    selections: sel,
                    race: this.racenum(
                      zoneI.meetdate,
                      zone.track_name,
                      zoneI.race_num,
                      zoneI.point_id
                    ),
                    first: (
                      <a
                        style={{ color: "inherit" }}
                        target="_blank"
                        rel="noreferrer"
                        href={this.openTabBookie(zoneI.bookie_name)}
                      >
                        <div className="table_tba">TBA</div>
                      </a>
                    ),
                    second: (
                      <a
                        style={{ color: "inherit" }}
                        target="_blank"
                        rel="noreferrer"
                        href={this.openTabBookie(zoneI.bookie_name)}
                      >
                        <div className="table_tba">TBA</div>
                      </a>
                    ),
                    third: (
                      <a
                        style={{ color: "inherit" }}
                        target="_blank"
                        rel="noreferrer"
                        href={this.openTabBookie(zoneI.bookie_name)}
                      >
                        <div className="table_tba">TBA</div>
                      </a>
                    ),
                    cond: (
                      <div className="condition">
                        <Badge
                          style={{
                            textAlign: "center",
                            backgroundColor: this.colors(zoneI),
                            color: "white",
                          }}
                        >
                          <strong />
                          {this.conditions(zoneI)}
                        </Badge>
                      </div>
                    ),
                    bookie: bookie,
                  });
                }
              }
            }
          }
        } else {
          //checking if race date is OLDER THAN TODAY

          if (s < t) {
            if (zoneI.track_condition === "ABND") {
              let response = this.abandonedCondition(zoneI, j);
              data.push({
                result: response[0].result,
                key: response[0].key,
                selections: response[0].selections,
                race: response[0].race,
                first: response[0].first,
                second: response[0].second,
                third: response[0].third,
                cond: response[0].cond,
                bookie: response[0].bookie,
              });
            } else {
              if (zoneI.result) {
                let response = this.conditionCheker(zone, zoneI, j, bookie);
                data.push({
                  result: response[0].result,
                  key: response[0].key,
                  selections: response[0].selections,
                  race: response[0].race,
                  first: response[0].first,
                  second: response[0].second,
                  third: response[0].third,
                  cond: response[0].cond,
                  bookie: response[0].bookie,
                });
              } else {
                if (zoneI.is_na === 1) {
                  let r1 = <div className="na">N/R</div>;
                  data.push({
                    key: j,
                    result: linkToRacePageWhileReturningDataToTable(
                      r1,
                      zoneI.meetdate,
                      zone.track_name,
                      zoneI.race_num,
                      zoneI.point_id
                    ),
                    selections: <div className="na">N/R</div>,
                    race: this.racenum(
                      zoneI.meetdate,
                      zone.track_name,
                      zoneI.race_num,
                      zoneI.point_id
                    ),
                    first: (
                      <div
                        onClick={() => {
                          this.openTabBookie(zoneI.bookie_name);
                        }}
                        className="na"
                      >
                        N/R
                      </div>
                    ),
                    second: (
                      <div
                        onClick={() => {
                          this.openTabBookie(zoneI.bookie_name);
                        }}
                        className="na"
                      >
                        N/R
                      </div>
                    ),
                    third: (
                      <div
                        onClick={() => {
                          this.openTabBookie(zoneI.bookie_name);
                        }}
                        className="na"
                      >
                        N/R
                      </div>
                    ),
                    cond: (
                      <div className="condition">
                        <Badge
                          style={{
                            textAlign: "center",
                            backgroundColor: this.colors(zoneI),
                            color: "white",
                          }}
                        >
                          <strong />
                          {this.conditions(zoneI)}
                        </Badge>
                      </div>
                    ),
                    bookie: bookie,
                  });
                }
              }
            }
          }
        }
      });

      if (window.innerWidth < 440) {
        return (
          <Card
            style={{ padding: 1, marginTop: "10px", marginBottom: "10px" }}
            key={i}
          >
            <CardHeader id={i} onClick={() => this.trigerDiv(i)}>
              <CardTitle style={{ marginBottom: "-8px" }}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "8px",
                      marginLeft: "4px",
                      marginRight: "4px",
                      alignItems: "baseline",
                    }}
                  >
                    <div style={{ textAlign: "left" }}>
                      <div
                        style={{
                          color: "#379239",
                          padding: "0px",
                          fontSize: "18px",
                        }}
                      >
                        {cardname}
                      </div>
                      <div
                        style={{
                          color: "#096ab3",
                          padding: "0px",
                          fontSize: "12px",
                        }}
                      >
                        2nd: {secnd} (
                        {selec
                          ? ((secnd / selec) * 100).toFixed(1) + "%"
                          : "0.0%"}
                        )
                      </div>
                    </div>

                    <div style={{ textAlign: "left" }}>
                      <div
                        style={{
                          color: "#379239",
                          padding: "0px",
                          fontSize: "12px",
                        }}
                      >
                        {selec + " "}Selections
                      </div>
                      <div
                        style={{
                          color: "#8b34bf",
                          padding: "0px",
                          fontSize: "12px",
                          marginTop: "2px",
                        }}
                      >
                        {" "}
                        3rd: {third} (
                        {selec
                          ? ((third / selec) * 100).toFixed(1) + "%"
                          : "0.0%"}
                        )
                      </div>
                    </div>

                    <div style={{ textAlign: "left" }}>
                      <div
                        style={{
                          color: "rgb(252, 179, 24)",
                          padding: "0px",
                          fontSize: "12px",
                        }}
                      >
                        Win: {win} (
                        {selec
                          ? ((win / selec) * 100).toFixed(1) + "%"
                          : "0.0%"}
                        )
                      </div>
                      <div
                        style={{
                          color: "red",
                          padding: "0px",
                          fontSize: "12px",
                          marginTop: "2px",
                        }}
                      >
                        Lost: {lose} (
                        {selec
                          ? ((lose / selec) * 100).toFixed(1) + "%"
                          : "0.0%"}
                        )
                      </div>
                    </div>
                  </div>

                  {this.state.arr[i] === true ? (
                    <div>
                      <FontAwesomeIcon
                        style={{ color: "#379239" }}
                        icon={faAngleUp}
                        size="1x"
                      />
                    </div>
                  ) : (
                    <div>
                      <FontAwesomeIcon
                        style={{ color: "#379239" }}
                        icon={faAngleDown}
                        size="1x"
                      />
                    </div>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <Collapse isOpen={this.state.arr[i]}>
              <CardBody style={{ padding: 1 }}>
                <Table
                  columns={columns}
                  dataSource={data}
                  bordered
                  size="middle"
                  pagination={false}
                  scroll={{ x: "calc(405px + 50%)" }}
                />
              </CardBody>
            </Collapse>
          </Card>
        );
      } else {
        return (
          <div key={i} onClick={() => this.trigerDiv(i)}>
            <RaceResultHeader
              cardname={cardname}
              selec={selec}
              win={win}
              second={secnd}
              third={third}
              lost={lose}
              open={this.state.arr[i]}
              ID={i}
              venue_history={venue_history}
              Table={
                <Table
                  columns={columns}
                  dataSource={data}
                  bordered
                  size="middle"
                  pagination={false}
                  scroll={{ x: "calc(405px + 50%)" }}
                />
              }
            />

            <Col style={{ textAlign: "center" }}>
              {this.state.arr[i] === true ? (
                <div className="pointer">
                  <FontAwesomeIcon
                    style={{ color: "black" }}
                    icon={faAngleUp}
                    size="2x"
                  />
                </div>
              ) : (
                <div className="pointer">
                  <FontAwesomeIcon
                    style={{ color: "black", marginTop: 5 }}
                    icon={faAngleDown}
                    size="2x"
                  />
                </div>
              )}
            </Col>
          </div>
        );
      }
    });
    return Cards;
  }
  render() {
    return (
      <div>{this.props.loading === true ? <LoadingNew /> : this.all()}</div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.resultsReducer.loading,
  results: state.resultsReducer.results,
  dailyPerformance: state.resultsReducer.dailyPerformance,
  trackInfo: state.raceReducer.trackInfoOpt,
});

export default withRouter(connect(mapStateToProps)(ResultsTable));
