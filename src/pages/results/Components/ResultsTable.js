import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
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
import { ConvertUTCTimeToLocalTime, linkToRacePageWhileReturningDataToTable } from "../../../config/utils";

//COMPONENTS
import Timer from "../../../components/Timer";
import Lock from "../../../components/Lock/Lock";
/* CSS */
import "../results.scss";
import "antd/dist/antd.css";
import "react-datepicker/dist/react-datepicker.css";

/* REDUX */
import resultAction from "../../../redux/actions/results";
import RaceResultHeader from "./RaceResultHeader";

class Test extends React.Component {
  state = {

    startDate: moment(this.props.match.params.date, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
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
    await dispatch(resultAction.getResults({ passDate: this.props.date }));
    this.interval = setInterval(() => {
      dispatch(
        resultAction.getResultsForDateNoLoading({
          passDate: moment(this.props.match.params.date, "DD-MM-YYYY").format(
            "YYYY-MM-DD"
          ),
        })
      );
    }, 30000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  trigerDiv(i) {
    let a = this.state.arr.slice(); //creates the clone of the state
    a[i] = !a[i]; //changes the state of the specific index
    this.setState({ arr: a }); //sets the new state
  }

  racenavigation(zone) {
    var num = 0;
    if (zone.info[zone.info.length - 1].race_status === "Closed") {
      num = 0;
    } else {
      for (let i = 0; i < zone.info.length; i++) {
        if (
          i === 0 &&
          zone.info[i + 1].race_status === "Open" &&
          zone.info[0].race_status === "Open"
        ) {
          num = 0;
        } else if (
          i === 0 &&
          zone.info[i + 1].race_status === "Open" &&
          zone.info[0].race_status === "Closed"
        ) {
          num = i + 1;
        } else if (
          zone.info[i].race_status === "Open" &&
          zone.info[i - 1].race_status === "Closed"
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

  SelecFirst(r1, bookie) {
    return (
      <a
        style={{ color: "inherit" }}
        target="_blank"
        rel="noreferrer"
        href={this.openTabBookie(bookie)}
      >
        <Row
          className="first"
          style={{
            backgroundColor: "rgb(252, 179, 24)",
            margin: "2px",
            borderRadius: 4,
          }}
        >
          <Col className="numbering" style={{ color: "white" }}>
            {r1?.split("@")[0]}
          </Col>
          <Col className="fodds" style={{ color: "white" }}>
            ${Number(r1?.split(" @ ")[1]?.split(",")[0]).toFixed(2)}
          </Col>{" "}
        </Row>
      </a>
    );
  }
  SelecSecond(r2, bookie) {
    return (
      <a
        style={{ color: "inherit" }}
        target="_blank"
        rel="noreferrer"
        href={this.openTabBookie(bookie)}
      >
        <Row
          className="first"
          style={{
            backgroundColor: "rgb(0, 103, 171)",
            margin: "2px",
            borderRadius: 4,
          }}
        >
          <Col className="fnum" style={{ color: "white" }}>
            {r2?.split(" @ ")[0]}
          </Col>
          <Col className="fodds" style={{ color: "white" }}>
            ${Number(r2?.split(" @ ")[1]?.split(",")[0]).toFixed(2)}
          </Col>{" "}
        </Row>
      </a>
    );
  }

  SelecThird(r3, bookie) {
    return (
      <a
        style={{ color: "inherit" }}
        target="_blank"
        rel="noreferrer"
        href={this.openTabBookie(bookie)}
      >
        <Row
          className="first"
          style={{
            backgroundColor: "rgb(139, 52, 191)",
            margin: "2px",
            borderRadius: 4,
          }}
        >
          <Col className="fnum" style={{ color: "white" }}>
            {r3?.split(" @ ")[0]}
          </Col>
          <Col className="fodds" style={{ color: "white" }}>
            ${Number(r3?.split(" @ ")[1]?.split(",")[0]).toFixed(2)}
          </Col>{" "}
        </Row>
      </a>
    );
  }
  FirstLost(r1, bookie) {
    return (
      <a
        style={{ color: "inherit" }}
        target="_blank"
        rel="noreferrer"
        href={this.openTabBookie(bookie)}
      >
        <Row className="spacing">
          <Col className="fnum">{r1?.split(" @ ")[0]}</Col>
          <Col className="fodds">
            ${Number(r1?.split(" @ ")[1]?.split(",")[0]).toFixed(2)}
          </Col>
        </Row>
      </a>
    );
  }
  SecondLost(r2, bookie) {
    return (
      <a
        style={{ color: "inherit" }}
        target="_blank"
        rel="noreferrer"
        href={this.openTabBookie(bookie)}
      >
        <Row className="spacing">
          <Col className="fnum">{r2?.split(" @ ")[0]}</Col>
          <Col className="fodds">${Number(r2?.split(" @ ")[1]).toFixed(2)}</Col>
        </Row>
      </a>
    );
  }
  ThirdLost(r3, bookie) {
    return (
      <a
        style={{ color: "inherit" }}
        target="_blank"
        rel="noreferrer"
        href={this.openTabBookie(bookie)}
      >
        <Row className="spacing">
          <Col className="fnum">{r3?.split(" @ ")[0]}</Col>
          <Col className="fodds">${Number(r3?.split(" @ ")[1]).toFixed(2)}</Col>
        </Row>
      </a>
    );
  }
  Selections(result, selec) {
    if (result === "WON") {
      return (
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col className="spacing2">
            <div style={{ color: "rgb(252, 179, 24)" }}>
              {selec?.split(",")[0]}
            </div>
          </Col>
          <Col className="spacing2" style={{ color: "black" }}>
            {selec?.split(",")[1]}
          </Col>
          <Col className="spacing2" style={{ color: "black" }}>
            {selec?.split(",")[2]}
          </Col>
          <Col className="table_cell_selections" style={{ color: "black" }}>
            {selec?.split(",")[3]}
          </Col>
        </Row>
      );
    } else if (result === "2ND") {
      return (
        <Row>
          <Col className="spacing2">
            <div style={{ color: "rgb(0, 103, 171)" }}>
              {selec?.split(",")[0]}
            </div>
          </Col>
          <Col className="spacing2">{selec?.split(",")[1]}</Col>
          <Col className="spacing2">{selec?.split(",")[2]}</Col>
          <Col className="table_cell_selections" style={{ color: "black" }}>
            {selec?.split(",")[3]}
          </Col>
        </Row>
      );
    } else if (result === "3RD") {
      return (
        <Row>
          <Col className="spacing2">
            <div style={{ color: "rgb(139, 52, 191)" }}>
              {selec?.split(",")[0]}
            </div>
          </Col>
          <Col className="spacing2">{selec?.split(",")[1]}</Col>
          <Col className="spacing2">{selec?.split(",")[2]}</Col>
          <Col className="table_cell_selections" style={{ color: "black" }}>
            {selec?.split(",")[3]}
          </Col>
        </Row>
      );
    } else {
      return (
        <Row>
          <Col className="spacing2">
            <div style={{ color: "red" }}>{selec?.split(",")[0]}</div>
          </Col>
          <Col className="spacing2">{selec?.split(",")[1]}</Col>
          <Col className="spacing2">{selec?.split(",")[2]}</Col>
          <Col className="table_cell_selections" style={{ color: "black" }}>
            {selec?.split(",")[3]}
          </Col>
        </Row>
      );
    }
  }

  openTabBookie(bookie) {
    if (bookie === "Unibet") {
      return "https://b1.trickyrock.com/redirect.aspx?pid=31144281&bid=21418";
    } else {
      return "https://www.boombet.com.au/join/?Referrer=PTPTips";
    }
  }

  DeadHeat(data, f, s, t, bookie, won) {
    var win = 0;
    var scnd = 0;
    var third = 0;
    let arr1 = [];
    let arr2 = [];
    let arr3 = [];

    for (let i = 0; i < data.length; i++) {
      if (Number(data[i]?.split("/")[1]) === 1) {
        win++;
        arr1.push(data[i]?.split("/")[0]);
      } else if (Number(data[i]?.split("/")[1]) === 2) {
        scnd++;
        arr2.push(data[i]?.split("/")[0]);
      } else if (Number(data[i]?.split("/")[1]) === 3) {
        third++;
        arr3.push(data[i]?.split("/")[0]);
      }
    }
    if (f === 1) {
      if (win === 4) {
        if (won === 1) {
          return (
            <a
              style={{ color: "inherit" }}
              target="_blank"
              rel="noreferrer"
              href={this.openTabBookie(bookie)}
            >
              <Row className="spacing1">
                <Col className="fnumdh">{arr1[0]?.split("@")[0]}</Col>
                <Col className="foddsdh">
                  $
                  {Number(
                    Number(arr1[0]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
              <Row className="spacing1">
                <Col className="fnumdh">{arr1[1]?.split("@")[0]}</Col>
                <Col className="foddsdh">
                  $
                  {Number(
                    Number(arr1[1]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
              <Row className="spacing1">
                <Col className="fnumdh">{arr1[2]?.split("@")[0]}</Col>
                <Col className="foddsdh">
                  $
                  {Number(
                    Number(arr1[2]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
              <Row className="spacing1">
                <Col className="fnumdh">{arr1[3]?.split("@")[0]}</Col>
                <Col className="foddsdh">
                  $
                  {Number(
                    Number(arr1[3]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
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
              <Row className="spacing1">
                <Col className="fnum">{arr1[0]?.split("@")[0]}</Col>
                <Col className="fodds">
                  $
                  {Number(
                    Number(arr1[0]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
              <Row className="spacing1">
                <Col className="fnum">{arr1[1]?.split("@")[0]}</Col>
                <Col className="fodds">
                  $
                  {Number(
                    Number(arr1[1]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
              <Row className="spacing1">
                <Col className="fnum">{arr1[2]?.split("@")[0]}</Col>
                <Col className="fodds">
                  $
                  {Number(
                    Number(arr1[2]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
              <Row className="spacing1">
                <Col className="fnum">{arr1[3]?.split("@")[0]}</Col>
                <Col className="fodds">
                  $
                  {Number(
                    Number(arr1[3]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
            </a>
          );
        }
      } else if (win === 3) {
        if (won === 1) {
          return (
            <a
              style={{ color: "inherit" }}
              target="_blank"
              rel="noreferrer"
              href={this.openTabBookie(bookie)}
            >
              <Row className="spacing1">
                <Col className="fnumdh">{arr1[0]?.split("@")[0]}</Col>
                <Col className="foddsdh">
                  $
                  {Number(
                    Number(arr1[0]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
              <Row className="spacing1">
                <Col className="fnumdh">{arr1[1]?.split("@")[0]}</Col>
                <Col className="foddsdh">
                  $
                  {Number(
                    Number(arr1[1]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
              <Row className="spacing1">
                <Col className="fnumdh">{arr1[2]?.split("@")[0]}</Col>
                <Col className="foddsdh">
                  $
                  {Number(
                    Number(arr1[2]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
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
              <Row className="spacing1">
                <Col className="fnum">{arr1[0]?.split("@")[0]}</Col>
                <Col className="fodds">
                  $
                  {Number(
                    Number(arr1[0]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
              <Row className="spacing1">
                <Col className="fnum">{arr1[1]?.split("@")[0]}</Col>
                <Col className="fodds">
                  $
                  {Number(
                    Number(arr1[1]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
              <Row className="spacing1">
                <Col className="fnum">{arr1[2]?.split("@")[0]}</Col>
                <Col className="fodds">
                  $
                  {Number(
                    Number(arr1[2]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
            </a>
          );
        }
      } else if (win === 2) {
        if (won === 1) {
          return (
            <a
              style={{ color: "inherit" }}
              target="_blank"
              rel="noreferrer"
              href={this.openTabBookie(bookie)}
            >
              <Row className="spacing1">
                <Col className="fnumdh">{arr1[0]?.split("@")[0]}</Col>
                <Col className="foddsdh">
                  $
                  {Number(
                    Number(arr1[0]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
              <Row className="spacing1">
                <Col className="fnumdh">{arr1[1]?.split("@")[0]}</Col>
                <Col className="foddsdh">
                  $
                  {Number(
                    Number(arr1[1]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
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
              <Row className="spacing1">
                <Col className="fnum">{arr1[0]?.split("@")[0]}</Col>
                <Col className="fodds">
                  $
                  {Number(
                    Number(arr1[0]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
              <Row className="spacing1">
                <Col className="fnum">{arr1[1]?.split("@")[0]}</Col>
                <Col className="fodds">
                  $
                  {Number(
                    Number(arr1[1]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
            </a>
          );
        }
      } else if (win === 1) {
        if (won === 1) {
          return (
            <a
              style={{ color: "inherit" }}
              target="_blank"
              rel="noreferrer"
              href={this.openTabBookie(bookie)}
            >
              <Row className="spacing">
                <Col className="fnumdh">{arr1[0]?.split("@")[0]}</Col>
                <Col className="foddsdh">
                  $
                  {Number(
                    Number(arr1[0]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
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
              <Row className="spacing">
                <Col className="fnum">{arr1[0]?.split("@")[0]}</Col>
                <Col className="fodds">
                  $
                  {Number(
                    Number(arr1[0]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
            </a>
          );
        }
      }
    }

    if (s === 1) {
      if (scnd === 3) {
        if (won === 1) {
          return (
            <a
              style={{ color: "inherit" }}
              target="_blank"
              rel="noreferrer"
              href={this.openTabBookie(bookie)}
            >
              <Row className="spacing1">
                <Col className="fnumdh">{arr2[0]?.split("@")[0]}</Col>
                <Col className="foddsdh">
                  $
                  {Number(
                    Number(arr2[0]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
              <Row className="spacing1">
                <Col className="fnumdh">{arr2[1]?.split("@")[0]}</Col>
                <Col className="foddsdh">
                  $
                  {Number(
                    Number(arr2[1]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
              <Row className="spacing1">
                <Col className="fnumdh">{arr2[2]?.split("@")[0]}</Col>
                <Col className="foddsdh">
                  $
                  {Number(
                    Number(arr2[2]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
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
              <Row className="spacing1">
                <Col className="fnum">{arr2[0]?.split("@")[0]}</Col>
                <Col className="fodds">
                  $
                  {Number(
                    Number(arr2[0]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
              <Row className="spacing1">
                <Col className="fnum">{arr2[1]?.split("@")[0]}</Col>
                <Col className="fodds">
                  $
                  {Number(
                    Number(arr2[1]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
              <Row className="spacing1">
                <Col className="fnum">{arr2[2]?.split("@")[0]}</Col>
                <Col className="fodds">
                  $
                  {Number(
                    Number(arr2[2]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
            </a>
          );
        }
      } else if (scnd === 2) {
        if (won === 1) {
          return (
            <a
              style={{ color: "inherit" }}
              target="_blank"
              rel="noreferrer"
              href={this.openTabBookie(bookie)}
            >
              <Row className="spacing1">
                <Col className="fnumdh">{arr2[0]?.split("@")[0]}</Col>
                <Col className="foddsdh">
                  $
                  {Number(
                    Number(arr2[0]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
              <Row className="spacing1">
                <Col className="fnumdh">{arr2[1]?.split("@")[0]}</Col>
                <Col className="foddsdh">
                  $
                  {Number(
                    Number(arr2[1]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
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
              <Row className="spacing1">
                <Col className="fnum">{arr2[0]?.split("@")[0]}</Col>
                <Col className="fodds">
                  $
                  {Number(
                    Number(arr2[0]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
              <Row className="spacing1">
                <Col className="fnum">{arr2[1]?.split("@")[0]}</Col>
                <Col className="fodds">
                  $
                  {Number(
                    Number(arr2[1]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
            </a>
          );
        }
      } else if (scnd === 1) {
        if (won === 1) {
          return (
            <a
              style={{ color: "inherit" }}
              target="_blank"
              rel="noreferrer"
              href={this.openTabBookie(bookie)}
            >
              <Row className="spacing">
                <Col className="fnumdh">{arr2[0]?.split("@")[0]}</Col>
                <Col className="foddsdh">
                  $
                  {Number(
                    Number(arr2[0]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
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
              <Row className="spacing">
                <Col className="fnum">{arr2[0]?.split("@")[0]}</Col>
                <Col className="fodds">
                  $
                  {Number(
                    Number(arr2[0]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
            </a>
          );
        }
      } else if (scnd === 0) {
        return (
          <a
            style={{ color: "inherit" }}
            target="_blank"
            rel="noreferrer"
            href={this.openTabBookie(bookie)}
          >
            <div style={{ textAlign: "center" }}>--</div>
          </a>
        );
      }
    }

    if (t === 1) {
      if (third === 2) {
        if (won === 1) {
          return (
            <a
              style={{ color: "inherit" }}
              target="_blank"
              rel="noreferrer"
              href={this.openTabBookie(bookie)}
            >
              <Row className="spacing1">
                <Col className="fnumdh">{arr3[0]?.split("@")[0]}</Col>
                <Col className="foddsdh">
                  $
                  {Number(
                    Number(arr3[0]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
              <Row className="spacing1">
                <Col className="fnumdh">{arr3[1]?.split("@")[0]}</Col>
                <Col className="foddsdh">
                  $
                  {Number(
                    Number(arr3[1]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
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
              <Row className="spacing1">
                <Col className="fnum">{arr3[0]?.split("@")[0]}</Col>
                <Col className="fodds">
                  $
                  {Number(
                    Number(arr3[0]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
              <Row className="spacing1">
                <Col className="fnum">{arr3[1]?.split("@")[0]}</Col>
                <Col className="fodds">
                  $
                  {Number(
                    Number(arr3[1]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
            </a>
          );
        }
      } else if (third === 1) {
        if (won === 1) {
          return (
            <a
              style={{ color: "inherit" }}
              target="_blank"
              rel="noreferrer"
              href={this.openTabBookie(bookie)}
            >
              <Row className="spacing1">
                <Col className="fnumdh">{arr3[0]?.split("@")[0]}</Col>
                <Col className="foddsdh">
                  $
                  {Number(
                    Number(arr3[0]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
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
              <Row className="spacing1">
                <Col className="fnum">{arr3[0]?.split("@")[0]}</Col>
                <Col className="fodds">
                  $
                  {Number(
                    Number(arr3[0]?.split("@")[1]?.split(",")[0])
                  ).toFixed(2)}
                </Col>
              </Row>
            </a>
          );
        }
      } else if (third === 0) {
        return (
          <a
            style={{ color: "inherit" }}
            target="_blank"
            rel="noreferrer"
            href={this.openTabBookie(bookie)}
          >
            <div style={{ textAlign: "center" }}>--</div>
          </a>
        );
      }
    }
  }

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
    var s = moment(this.props.match.params.date, "DD-MM-YYYY").format(
      "YYYYMMDD"
    );
    let arr = [];
    const Cards = this.props.results.map((zone, i, j) => {
      arr.push();
      let cardname = zone.track;
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
        },
        {
          title: linkToRacePageWhileReturningDataToTable(
            r1,
            zone.info[index].meetdate,
            zone.track,
            zone.info[index].race_num,
            zone.info[index].point_id
          ),
          dataIndex: "selections",
          width: 339,
        },
        {
          title: <div className="table_race">RACE</div>,
          dataIndex: "race",
          width: "10px",
          render(text, record) {
            return {
              props: {
                style: {
                  background: "#4285f4",
                  textAlign: "center",
                  color: "#fff",
                  fontSize: "13px",
                },
              },
              children: <div>{text}</div>,
            };
          },
        },

        {
          title: <div className="table_bookie">Bookie</div>,
          dataIndex: "bookie",
          width: 10,
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

      const data = [];
      var selec = 0;
      var win = 0;
      var lose = 0;
      var secnd = 0;
      var third = 0;
      zone.info.forEach((zoneI, j) => {
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
              style={{ color: "black" }}
              target="_blank"
              rel="noreferrer"
              href={this.openTabBookie(zoneI.bookie_name)}
            >
              <div
                style={{
                  textAlign: "center",
                  backgroundColor: "#e12b80",
                  margin: "2px",
                  borderRadius: "5px",
                }}
              >
                {/* <img
                  className="bookie-logo"
                  src={
                    "https://dnu5embx6omws.cloudfront.net/Logos/sportsbetting/30x30@2x.png"
                  }
                  alt=""
                /> */}
              </div>
            </a>
          );
        }
        // console.log(zoneI)
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
        const conditions = (val) => {
          const condition = zoneI.track_condition;
          // if (zoneI.isNA === "N/A") {
          //   condition = "N/A"
          // }
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
              return "N/A";
            case "ABND":
              return "ABND";
            default:
              return "GOOD";
          }
        };
        const colors = (val) => {
          const color = zoneI.track_condition;
          switch (color) {
            case "F":
              return "#343a40";
            case "G":
              return "#218838";
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
            data.push({
              key: j,
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
                      backgroundColor: colors(),
                      color: "white",
                    }}
                  >
                    <strong />
                    {conditions()}
                  </Badge>
                </div>
              ),
              bookie: <div className="abnd">ABND</div>,
            });
          } else {
            //checking if race hasent been played yet or is about to start
            if (raceTime >= actualTime) {
              //checking if time diffrence is less than 1 hour in order to trigger the timer
              if (timedif < 60 && timedif > 0) {
                if (zoneI.is_na === 1) {
                  let r1 = (
                    <div style={{ textAlign: "center" }} className="pointer">
                      <Timer
                        raceTimer={Rt}
                        raceTime={racetimee}
                        status={rStatus}
                      />
                    </div>
                  );
                  data.push({
                    key: j,
                    result: linkToRacePageWhileReturningDataToTable(
                      r1,
                      zoneI.meetdate,
                      zone.track,
                      zoneI.race_num,
                      zoneI.point_id
                    ),
                    selections: <div className="na">N/A</div>,
                    race: this.racenum(
                      zoneI.meetdate,
                      zone.track,
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
                            backgroundColor: colors(),
                            color: "white",
                          }}
                        >
                          <strong />
                          {conditions()}
                        </Badge>
                      </div>
                    ),
                    bookie: bookie,
                  });
                } else {
                  let r1 = (
                    <div
                      style={{ textAlign: "center", color: "inherit" }}
                      className="pointer"
                    >
                      <Timer
                        raceTimer={Rt}
                        raceTime={racetimee}
                        status={rStatus}
                      />
                    </div>
                  );
                  data.push({
                    key: j,
                    result: linkToRacePageWhileReturningDataToTable(
                      r1,
                      zoneI.meetdate,
                      zone.track,
                      zoneI.race_num,
                      zoneI.point_id
                    ),
                    selections: (
                      <div style={{ textAlign: "center" }}>
                        <Lock
                          data={
                            <Row>
                              <Col className="spacing2">
                                {zoneI.selections?.split(",")[0]}
                              </Col>
                              <Col className="spacing2">
                                {zoneI.selections?.split(",")[1]}
                              </Col>
                              <Col className="spacing2">
                                {zoneI.selections?.split(",")[2]}
                              </Col>
                              <Col className="table_cell_selections">
                                {zoneI.selections?.split(",")[3]}
                              </Col>
                            </Row>
                          }
                        />
                      </div>
                    ),
                    bookie: bookie,
                    race: this.racenum(
                      zoneI.meetdate,
                      zone.track,
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
                            backgroundColor: colors(),
                            color: "white",
                          }}
                        >
                          <strong />
                          {conditions()}
                        </Badge>
                      </div>
                    ),
                  });
                }
              } else {
                //in this case the race hasent been played yet so we display the race time
                if (zoneI.is_na === 1) {
                  let r1 = (
                    <div className="pointer" style={{ textAlign: "center" }}>
                      {ConvertUTCTimeToLocalTime(moment(zoneI.race_time, "HH:mm:ss").format("HH:mm"))}
                    </div>
                  );
                  data.push({
                    key: j,
                    result: linkToRacePageWhileReturningDataToTable(
                      r1,
                      zoneI.meetdate,
                      zone.track,
                      zoneI.race_num,
                      zoneI.point_id
                    ),
                    selections: <div className="na">N/A</div>,
                    race: this.racenum(
                      zoneI.meetdate,
                      zone.track,
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
                            backgroundColor: colors(),
                            color: "white",
                          }}
                        >
                          <strong />
                          {conditions()}
                        </Badge>
                      </div>
                    ),
                    bookie: bookie,
                  });
                } else {
                  let r1 = (
                    <div className="pointer" style={{ textAlign: "center" }}>
                      {ConvertUTCTimeToLocalTime(moment(zoneI.race_time, "HH:mm:ss").format("HH:mm"))}
                    </div>
                  );
                  data.push({
                    key: j,
                    result: linkToRacePageWhileReturningDataToTable(
                      r1,
                      zoneI.meetdate,
                      zone.track,
                      zoneI.race_num,
                      zoneI.point_id
                    ),
                    selections: (
                      <div style={{ textAlign: "center" }}>
                        <Lock
                          data={
                            <Row>
                              <Col className="spacing2">
                                {zoneI.selections?.split(",")[0]}
                              </Col>
                              <Col className="spacing2">
                                {zoneI.selections?.split(",")[1]}
                              </Col>
                              <Col className="spacing2">
                                {zoneI?.selections?.split(",")[2]}
                              </Col>
                              <Col className="table_cell_selections">
                                {zoneI?.selections?.split(",")[3]}
                              </Col>
                            </Row>
                          }
                        />
                      </div>
                    ),
                    race: this.racenum(
                      zoneI.meetdate,
                      zone.track,
                      zoneI.race_num,
                      zoneI.point_id
                    ),
                    bookie: bookie,
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
                            backgroundColor: colors(),
                            color: "white",
                          }}
                        >
                          <strong />
                          {conditions()}
                        </Badge>
                      </div>
                    ),
                  });
                }
              }
            } else {
              //checking if race has been played
              if (raceTime < actualTime) {
                //checking if the results have been updated in order to display them
                if (zoneI.result) {
                  let arr = [];
                  arr.push(zoneI.r1, zoneI.r2, zoneI.r3, zoneI.r4);
                  let dhfirst = this.DeadHeat(
                    arr,
                    1,
                    0,
                    0,
                    zoneI.bookie_name,
                    0
                  );
                  let dhsecond = this.DeadHeat(
                    arr,
                    0,
                    1,
                    0,
                    zoneI.bookie_name,
                    0
                  );
                  let dhthird = this.DeadHeat(
                    arr,
                    0,
                    0,
                    1,
                    zoneI.bookie_name,
                    0
                  );
                  let dhfirstWon = (
                    <div
                      style={{
                        backgroundColor: "rgb(252, 179, 24)",
                        color: "white",
                        borderRadius: 4,
                        margin: "2px",
                      }}
                    >
                      {this.DeadHeat(arr, 1, 0, 0, zoneI.bookie_name, 1)}
                    </div>
                  );
                  let dhsecondWon = (
                    <div
                      style={{
                        backgroundColor: "rgb(0, 103, 171)",
                        color: "white",
                        borderRadius: 4,
                        margin: "2px",
                      }}
                    >
                      {this.DeadHeat(arr, 0, 1, 0, zoneI.bookie_name, 1)}
                    </div>
                  );
                  let dhthirdWon = (
                    <div
                      style={{
                        backgroundColor: "rgb(139, 52, 191)",
                        color: "white",
                        borderRadius: 4,
                        margin: "2px",
                      }}
                    >
                      {this.DeadHeat(arr, 0, 0, 1, zoneI.bookie_name, 1)}
                    </div>
                  );
                  let firstLost = this.FirstLost(zoneI.r1, zoneI.bookie_name);
                  let secondLost = this.SecondLost(zoneI.r2, zoneI.bookie_name);
                  let thirdLost = this.ThirdLost(zoneI.r3, zoneI.bookie_name);
                  let firstWon = this.SelecFirst(zoneI.r1, zoneI.bookie_name);
                  let secondWon = this.SelecSecond(zoneI.r2, zoneI.bookie_name);
                  let thirdWon = this.SelecThird(zoneI.r3, zoneI.bookie_name);
                  let firstCheck = this.assignDataBasedOnCondition(
                    dhfirst,
                    firstLost,
                    zoneI.result_status
                  );
                  let secondCheck = this.assignDataBasedOnCondition(
                    dhsecond,
                    secondLost,
                    zoneI.result_status
                  );
                  let thirdCheck = this.assignDataBasedOnCondition(
                    dhthird,
                    thirdLost,
                    zoneI.result_status
                  );
                  let firstCheckWon = this.assignDataBasedOnCondition(
                    dhfirstWon,
                    firstWon,
                    zoneI.result_status
                  );
                  let secondCheckWon = this.assignDataBasedOnCondition(
                    dhsecondWon,
                    secondWon,
                    zoneI.result_status
                  );
                  let thirdCheckWON = this.assignDataBasedOnCondition(
                    dhthirdWon,
                    thirdWon,
                    zoneI.result_status
                  );

                  if (zoneI.is_na === 1) {
                    let r1 = <div className="na">N/A</div>;
                    data.push({
                      key: j,
                      result: linkToRacePageWhileReturningDataToTable(
                        r1,
                        zoneI.meetdate,
                        zone.track,
                        zoneI.race_num,
                        zoneI.point_id
                      ),
                      selections: <div className="na">N/A</div>,
                      race: this.racenum(
                        zoneI.meetdate,
                        zone.track,
                        zoneI.race_num,
                        zoneI.point_id
                      ),
                      first: firstCheck,
                      second: secondCheck,
                      third: thirdCheck,
                      cond: (
                        <div className="condition">
                          <Badge
                            style={{
                              textAlign: "center",
                              backgroundColor: colors(),
                              color: "white",
                            }}
                          >
                            <strong />
                            {conditions()}
                          </Badge>
                        </div>
                      ),
                      bookie: bookie,
                    });
                  } else if (zoneI.result === "WON") {
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
                    data.push({
                      key: j,
                      result: linkToRacePageWhileReturningDataToTable(
                        r1,
                        zoneI.meetdate,
                        zone.track,
                        zoneI.race_num,
                        zoneI.point_id
                      ),
                      selections: this.Selections(
                        zoneI.result,
                        zoneI.selections
                      ),
                      race: this.racenum(
                        zoneI.meetdate,
                        zone.track,
                        zoneI.race_num,
                        zoneI.point_id
                      ),
                      bookie: bookie,
                      first: firstCheckWon,
                      second: secondCheck,
                      third: thirdCheck,
                      cond: (
                        <div className="condition">
                          <Badge
                            style={{
                              textAlign: "center",
                              backgroundColor: colors(),
                              color: "white",
                            }}
                          >
                            <strong />
                            {conditions()}
                          </Badge>
                        </div>
                      ),
                    });
                  } else if (zoneI.result === "2ND") {
                    let r1 = (
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
                    data.push({
                      key: j,
                      result: linkToRacePageWhileReturningDataToTable(
                        r1,
                        zoneI.meetdate,
                        zone.track,
                        zoneI.race_num,
                        zoneI.point_id
                      ),
                      selections: this.Selections(
                        zoneI.result,
                        zoneI.selections
                      ),
                      race: this.racenum(
                        zoneI.meetdate,
                        zone.track,
                        zoneI.race_num,
                        zoneI.point_id
                      ),
                      bookie: bookie,
                      first: firstCheck,
                      second: secondCheckWon,
                      third: thirdCheck,
                      cond: (
                        <div className="condition">
                          <Badge
                            style={{
                              textAlign: "center",
                              backgroundColor: colors(),
                              color: "white",
                            }}
                          >
                            <strong />
                            {conditions()}
                          </Badge>
                        </div>
                      ),
                    });
                  } else if (zoneI.result === "3RD") {
                    let r1 = (
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
                    data.push({
                      key: j,
                      result: linkToRacePageWhileReturningDataToTable(
                        r1,
                        zoneI.meetdate,
                        zone.track,
                        zoneI.race_num,
                        zoneI.point_id
                      ),
                      selections: this.Selections(
                        zoneI.result,
                        zoneI.selections
                      ),
                      race: this.racenum(
                        zoneI.meetdate,
                        zone.track,
                        zoneI.race_num,
                        zoneI.point_id
                      ),
                      bookie: bookie,
                      first: firstCheck,
                      second: secondCheck,
                      third: thirdCheckWON,
                      cond: (
                        <div className="condition">
                          <Badge
                            style={{
                              textAlign: "center",
                              backgroundColor: colors(),
                              color: "white",
                            }}
                          >
                            <strong />
                            {conditions()}
                          </Badge>
                        </div>
                      ),
                    });
                  } else {
                    let r1 = (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          color: "red",
                        }}
                      >
                        {zoneI.result}
                      </div>
                    );
                    data.push({
                      key: j,
                      result: linkToRacePageWhileReturningDataToTable(
                        r1,
                        zoneI.meetdate,
                        zone.track,
                        zoneI.race_num,
                        zoneI.point_id
                      ),
                      selections: this.Selections(
                        zoneI.result,
                        zoneI.selections
                      ),
                      race: this.racenum(
                        zoneI.meetdate,
                        zone.track,
                        zoneI.race_num,
                        zoneI.point_id
                      ),
                      bookie: bookie,
                      first: firstCheck,
                      second: secondCheck,
                      third: thirdCheck,
                      cond: (
                        <div className="condition">
                          <Badge
                            style={{
                              textAlign: "center",
                              backgroundColor: colors(),
                              color: "white",
                            }}
                          >
                            <strong />
                            {conditions()}
                          </Badge>
                        </div>
                      ),
                    });
                  }
                } else {
                  if (zoneI.is_na === 1) {
                    let r1 = <div className="na">N/A</div>;
                    data.push({
                      key: j,
                      result: linkToRacePageWhileReturningDataToTable(
                        r1,
                        zoneI.meetdate,
                        zone.track,
                        zoneI.race_num,
                        zoneI.point_id
                      ),
                      selections: <div className="na">N/A</div>,
                      race: this.racenum(
                        zoneI.meetdate,
                        zone.track,
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
                              backgroundColor: colors(),
                              color: "white",
                            }}
                          >
                            <strong />
                            {conditions()}
                          </Badge>
                        </div>
                      ),
                      bookie: bookie,
                    });
                  } else {
                    let r1 = <div className="table_tba">TBA</div>;
                    data.push({
                      key: j,
                      result: linkToRacePageWhileReturningDataToTable(
                        r1,
                        zoneI.meetdate,
                        zone.track,
                        zoneI.race_num,
                        zoneI.point_id
                      ),
                      selections: this.Selections(
                        zoneI.result,
                        zoneI.selections
                      ),
                      race: this.racenum(
                        zoneI.meetdate,
                        zone.track,
                        zoneI.race_num,
                        zoneI.point_id
                      ),
                      bookie: bookie,
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
                              backgroundColor: colors(),
                              color: "white",
                            }}
                          >
                            <strong />
                            {conditions()}
                          </Badge>
                        </div>
                      ),
                    });
                  }
                }
              }
            }
          }
        } else {
          //checking if race date is OLDER THAN TODAY

          if (s < t) {
            if (zoneI.track_condition === "ABND") {
              data.push({
                key: j,
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
                        backgroundColor: colors(),
                        color: "white",
                      }}
                    >
                      <strong />
                      {conditions()}
                    </Badge>
                  </div>
                ),
                bookie: <div className="abnd">ABND</div>,
              });
            } else {
              if (zoneI.result) {
                let arr = [];
                arr.push(zoneI.r1, zoneI.r2, zoneI.r3, zoneI.r4);
                let dhfirst = this.DeadHeat(arr, 1, 0, 0, zoneI.bookie_name, 0);
                let dhsecond = this.DeadHeat(
                  arr,
                  0,
                  1,
                  0,
                  zoneI.bookie_name,
                  0
                );
                let dhthird = this.DeadHeat(arr, 0, 0, 1, zoneI.bookie_name, 0);
                let dhfirstWon = (
                  <div
                    style={{
                      backgroundColor: "rgb(252, 179, 24)",
                      color: "white",
                      borderRadius: 4,
                      margin: "2px",
                    }}
                  >
                    {this.DeadHeat(arr, 1, 0, 0, zoneI.bookie_name, 1)}
                  </div>
                );
                let dhsecondWon = (
                  <div
                    style={{
                      backgroundColor: "rgb(0, 103, 171)",
                      color: "white",
                      borderRadius: 4,
                      margin: "2px",
                    }}
                  >
                    {this.DeadHeat(arr, 0, 1, 0, zoneI.bookie_name, 1)}
                  </div>
                );
                let dhthirdWon = (
                  <div
                    style={{
                      backgroundColor: "rgb(139, 52, 191)",
                      color: "white",
                      borderRadius: 4,
                      margin: "2px",
                    }}
                  >
                    {this.DeadHeat(arr, 0, 0, 1, zoneI.bookie_name, 1)}
                  </div>
                );
                let firstLost = this.FirstLost(zoneI.r1, zoneI.bookie_name);
                let secondLost = this.SecondLost(zoneI.r2, zoneI.bookie_name);
                let thirdLost = this.ThirdLost(zoneI.r3, zoneI.bookie_name);
                let firstWon = this.SelecFirst(zoneI.r1, zoneI.bookie_name);
                let secondWon = this.SelecSecond(zoneI.r2, zoneI.bookie_name);
                let thirdWon = this.SelecThird(zoneI.r3, zoneI.bookie_name);
                let firstCheck = this.assignDataBasedOnCondition(
                  dhfirst,
                  firstLost,
                  zoneI.result_status
                );
                let secondCheck = this.assignDataBasedOnCondition(
                  dhsecond,
                  secondLost,
                  zoneI.result_status
                );
                let thirdCheck = this.assignDataBasedOnCondition(
                  dhthird,
                  thirdLost,
                  zoneI.result_status
                );
                let firstCheckWon = this.assignDataBasedOnCondition(
                  dhfirstWon,
                  firstWon,
                  zoneI.result_status
                );
                let secondCheckWon = this.assignDataBasedOnCondition(
                  dhsecondWon,
                  secondWon,
                  zoneI.result_status
                );
                let thirdCheckWON = this.assignDataBasedOnCondition(
                  dhthirdWon,
                  thirdWon,
                  zoneI.result_status
                );

                if (zoneI.is_na === 1) {
                  let r1 = <div className="na">N/A</div>;
                  data.push({
                    key: j,
                    result: linkToRacePageWhileReturningDataToTable(
                      r1,
                      zoneI.meetdate,
                      zone.track,
                      zoneI.race_num,
                      zoneI.point_id
                    ),
                    selections: <div className="na">N/A</div>,
                    race: this.racenum(
                      zoneI.meetdate,
                      zone.track,
                      zoneI.race_num,
                      zoneI.point_id
                    ),
                    first: firstCheck,
                    second: secondCheck,
                    third: thirdCheck,
                    cond: (
                      <div className="condition">
                        <Badge
                          style={{
                            textAlign: "center",
                            backgroundColor: colors(),
                            color: "white",
                          }}
                        >
                          <strong />
                          {conditions()}
                        </Badge>
                      </div>
                    ),
                    bookie: bookie,
                  });
                } else if (zoneI.result === "WON") {
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
                  data.push({
                    key: j,
                    result: linkToRacePageWhileReturningDataToTable(
                      r1,
                      zoneI.meetdate,
                      zone.track,
                      zoneI.race_num,
                      zoneI.point_id
                    ),
                    selections: this.Selections(zoneI.result, zoneI.selections),
                    race: this.racenum(
                      zoneI.meetdate,
                      zone.track,
                      zoneI.race_num,
                      zoneI.point_id
                    ),
                    bookie: bookie,
                    first: firstCheckWon,
                    second: secondCheck,
                    third: thirdCheck,
                    cond: (
                      <div className="condition">
                        <Badge
                          style={{
                            textAlign: "center",
                            backgroundColor: colors(),
                            color: "white",
                          }}
                        >
                          <strong />
                          {conditions()}
                        </Badge>
                      </div>
                    ),
                  });
                } else if (zoneI.result === "2ND") {
                  let r1 = (
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
                  data.push({
                    key: j,
                    result: linkToRacePageWhileReturningDataToTable(
                      r1,
                      zoneI.meetdate,
                      zone.track,
                      zoneI.race_num,
                      zoneI.point_id
                    ),
                    selections: this.Selections(zoneI.result, zoneI.selections),
                    race: this.racenum(
                      zoneI.meetdate,
                      zone.track,
                      zoneI.race_num,
                      zoneI.point_id
                    ),
                    bookie: bookie,
                    first: firstCheck,
                    second: secondCheckWon,
                    third: thirdCheck,
                    cond: (
                      <div className="condition">
                        <Badge
                          style={{
                            textAlign: "center",
                            backgroundColor: colors(),
                            color: "white",
                          }}
                        >
                          <strong />
                          {conditions()}
                        </Badge>
                      </div>
                    ),
                  });
                } else if (zoneI.result === "3RD") {
                  let r1 = (
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
                  data.push({
                    key: j,
                    result: linkToRacePageWhileReturningDataToTable(
                      r1,
                      zoneI.meetdate,
                      zone.track,
                      zoneI.race_num,
                      zoneI.point_id
                    ),
                    selections: this.Selections(zoneI.result, zoneI.selections),
                    race: this.racenum(
                      zoneI.meetdate,
                      zone.track,
                      zoneI.race_num,
                      zoneI.point_id
                    ),
                    bookie: bookie,
                    first: firstCheck,
                    second: secondCheck,
                    third: thirdCheckWON,
                    cond: (
                      <div className="condition">
                        <Badge
                          style={{
                            textAlign: "center",
                            backgroundColor: colors(),
                            color: "white",
                          }}
                        >
                          <strong />
                          {conditions()}
                        </Badge>
                      </div>
                    ),
                  });
                } else {
                  let r1 = (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        color: "red",
                      }}
                    >
                      {zoneI.result}
                    </div>
                  );
                  data.push({
                    key: j,
                    result: linkToRacePageWhileReturningDataToTable(
                      r1,
                      zoneI.meetdate,
                      zone.track,
                      zoneI.race_num,
                      zoneI.point_id
                    ),
                    selections: this.Selections(zoneI.result, zoneI.selections),
                    race: this.racenum(
                      zoneI.meetdate,
                      zone.track,
                      zoneI.race_num,
                      zoneI.point_id
                    ),
                    bookie: bookie,
                    first: this.FirstLost(zoneI.r1, zoneI.bookie_name),
                    second: this.SecondLost(zoneI.r2, zoneI.bookie_name),
                    third: this.ThirdLost(zoneI.r3, zoneI.bookie_name),
                    cond: (
                      <div className="condition">
                        <Badge
                          style={{
                            textAlign: "center",
                            backgroundColor: colors(),
                            color: "white",
                          }}
                        >
                          <strong />
                          {conditions()}
                        </Badge>
                      </div>
                    ),
                  });
                }
              } else {
                if (zoneI.is_na === 1) {
                  let r1 = <div className="na">N/A</div>;
                  data.push({
                    key: j,
                    result: linkToRacePageWhileReturningDataToTable(
                      r1,
                      zoneI.meetdate,
                      zone.track,
                      zoneI.race_num,
                      zoneI.point_id
                    ),
                    selections: <div className="na">N/A</div>,
                    race: this.racenum(
                      zoneI.meetdate,
                      zone.track,
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
                        N/A
                      </div>
                    ),
                    second: (
                      <div
                        onClick={() => {
                          this.openTabBookie(zoneI.bookie_name);
                        }}
                        className="na"
                      >
                        N/A
                      </div>
                    ),
                    third: (
                      <div
                        onClick={() => {
                          this.openTabBookie(zoneI.bookie_name);
                        }}
                        className="na"
                      >
                        N/A
                      </div>
                    ),
                    cond: (
                      <div className="condition">
                        <Badge
                          style={{
                            textAlign: "center",
                            backgroundColor: colors(),
                            color: "white",
                          }}
                        >
                          <strong />
                          {conditions()}
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
                        WON: {win} (
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
                  size="small"
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
          </div>
        );
      }
    });
    return Cards;
  }
  render() {
    return <div>{this.all()}</div>;
  }
}

const mapStateToProps = (state) => ({
  loading: state.resultsReducer.loading,
  results: state.resultsReducer.results,
  dailyPerformance: state.resultsReducer.dailyPerformance,
});

export default withRouter(connect(mapStateToProps)(Test));
