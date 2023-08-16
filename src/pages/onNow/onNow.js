import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import NowHead from "./components/head";
import HorsesTable from "../raceNew/components/horseTable/horseTable";
import moment from "moment-timezone";
import { Row, Col, Nav, NavItem, NavLink } from "reactstrap";
import ReactFullscreen from "react-easyfullscreen";

import Next10 from "../../components/Next10/Next10";
import Last10 from "../../components/Last10/Last10";
import Next10Cell from "../../components/Next10/Next10Cell";
import Last10Cell from "../../components/Last10/Last10Cell";

// import Collapse from '@material-ui/core/Collapse';
// import Backdrop from '@material-ui/core/Backdrop';
// import Bell from 'react-ionicons/lib/IosCloseCircle'

/* SOCKETIO */
import { socket } from "../../config/config";
import onNowAction from "../../redux/actions/onNow";
import actions from "../../redux/actions/selections";
//import Navbar from './components/navbar'

import { Badge } from "reactstrap";
import { changeTheme } from "../../redux/actions/auth";

import "./onNow.scoped.scss";

export class OnNow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      dark: this.props.dark,
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    let token = localStorage.getItem("PTPToken");
    let data;
    if (token) {
      let tok = JSON.parse(token);
      data = { user: tok.id };
      // socket.emit('connected', data)
    } else {
      data = { user: "user" };
    }
    //console.log(socket)
    socket.emit("OnNow", data, (error) => {
      if (error) {
        console.log("error with sockets " + error);
      }
      // console.log("on now emited sucess");
    });
    socket.on("onNowRace", function (data) {
      // console.log(data.results);
      if (data.race === "new") {
        dispatch(onNowAction.onNowRaceInfo(data.results));
      } else {
        dispatch(onNowAction.onNowRaceSame(data.results));
      }
    });

    document.addEventListener("fullscreenchange", function (e) {
      if (window.innerHeight === window.screen.height) {
        // console.log("FULL");
      } else {
        dispatch(actions.fullScreen());
      }
    });
  }

  componentWillUnmount() {
    socket.emit("OnNowClosed", {}, (error) => {
      if (error) {
        console.log(error);
      }
    });
    const { dispatch } = this.props;
    dispatch(changeTheme(false));
  }

  fullScreen = () => {
    const { dispatch } = this.props;
    dispatch(actions.fullScreen(true));
  };

  renderGenTime = () => {
    const gen = () => {
      if (this.props.trackInfo[0]?.is_na !== 1) {
        if (this.props.genTime.length <= 0) {
          return null;
        }
        if (this.props.genTime.length === 1) {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                bsckgroundColor: "white",
              }}
            >
              <p>
                {moment(this.props.genTime[0]?.generation_time).format("dddd ")}{" "}
                at{" "}
                {moment(this.props.genTime[0]?.generation_time).format(
                  "HH:mm:ss"
                )}{" "}
                AEDT{" "}
                <Badge
                  style={{ backgroundColor: "grey", paddingTop: 3 }}
                >
                  Latest
                </Badge>
              </p>
            </div>
          );
        } else if (this.props.genTime.length === 2) {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                bsckgroundColor: "white",
              }}
            >
              <p>
                {moment(this.props.genTime[0]?.generation_time).format("dddd")}{" "}
                at{" "}
                {moment(this.props.genTime[0]?.generation_time).format(
                  "HH:mm:ss"
                )}{" "}
                AEDT{" "}
                <Badge
                  style={{ backgroundColor: "grey", paddingTop: 3 }}
                >
                  Latest
                </Badge>
              </p>
              <p style={{ marginLeft: 16 }}>
                {moment(this.props.genTime[1]?.generation_time).format("dddd")}{" "}
                at{" "}
                {moment(this.props.genTime[1]?.generation_time).format(
                  "HH:mm:ss"
                )}{" "}
                AEDT{" "}
              </p>
            </div>
          );
        } else if (this.props.genTime.length === 3) {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                bsckgroundColor: "white",
              }}
            >
              <p>
                {moment(this.props.genTime[0]?.generation_time).format("dddd")}{" "}
                at{" "}
                {moment(this.props.genTime[0]?.generation_time).format(
                  "HH:mm:ss"
                )}{" "}
                AEDT{" "}
              </p>
              <p style={{ marginLeft: 16 }}>
                {moment(this.props.genTime[1]?.generation_time).format("dddd")}{" "}
                at{" "}
                {moment(this.props.genTime[1]?.generation_time).format(
                  "HH:mm:ss"
                )}{" "}
                AEDT{" "}
              </p>
              <p style={{ marginLeft: 16 }}>
                {moment(this.props.genTime[2]?.generation_time).format("dddd")}{" "}
                at{" "}
                {moment(this.props.genTime[2]?.generation_time).format(
                  "HH:mm:ss"
                )}{" "}
                AEDT{" "}
              </p>
            </div>
          );
        } else if (this.props.genTime.length > 3) {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                bsckgroundColor: "white",
              }}
            >
              <p>
                {" "}
                {moment(this.props.genTime[0]?.generation_time).format(
                  "dddd"
                )}{" "}
                at{" "}
                {moment(this.props.genTime[0]?.generation_time).format(
                  "HH:mm:ss"
                )}{" "}
                AEDT{" "}
                <Badge
                  style={{ backgroundColor: "grey", paddingTop: 4, marginTop: -32 }}
                >
                  Latest
                </Badge>
              </p>
              <p style={{ marginLeft: 16 }}>
                {" "}
                {moment(this.props.genTime[1]?.generation_time).format(
                  "dddd"
                )}{" "}
                at{" "}
                {moment(this.props.genTime[1]?.generation_time).format(
                  "HH:mm:ss"
                )}{" "}
                AEDT{" "}
              </p>
              <p style={{ marginLeft: 16 }}>
                {" "}
                {moment(this.props.genTime[2]?.generation_time).format(
                  "dddd"
                )}{" "}
                at{" "}
                {moment(this.props.genTime[2]?.generation_time).format(
                  "HH:mm:ss"
                )}{" "}
                AEDT{" "}
              </p>
              <p style={{ marginLeft: 16 }}>
                {" "}
                {moment(this.props.genTime[3]?.generation_time).format(
                  "dddd"
                )}{" "}
                at{" "}
                {moment(this.props.genTime[3]?.generation_time).format(
                  "HH:mm:ss"
                )}{" "}
                AEDT{" "}
              </p>
            </div>
          );
        }
      }
    };

    if (this.props.genTime) {
      return (
        <div style={{ backgroundColor: "white", padding: 8, paddingBottom: 0 }}>
          <strong>This Race's Selections were generated on:</strong>
          <div style={{ marginTop: 4 }}>{gen()}</div>
          <hr style={{ marginTop: -4 }} />
        </div>
      );
    }
  };

  exitFullScreen = () => {
    const { dispatch } = this.props;
    document.exitFullscreen();
    dispatch(actions.fullScreen(false));
  };

  triggerPop = () => {
    this.setState({ collapse: true });
  };

  triggerClose = () => {
    this.setState({ collapse: false });
  };

  button() {
    if (this.state.isOpen === false) {
      return "Show More";
    } else return "Show Less";
  }

  renderNext10() {
    if (window.innerWidth < 1200) {
      return (
        <div>
          <h5
            style={{
              backgroundColor: "#44bd32",
              height: 32,
              borderRadius: 4,
              textAlign: "center",
              color: "white",
              fontWeight: "600",
              margin: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "350px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            NEXT PTP TIPS
          </h5>
          <div
            style={{
              display: "flex",
              overflowX: "scroll",
              overflowY: "hidden",
              marginBottom: "8px",
            }}
          >
            <Next10Cell />
          </div>
        </div>
      );
    } else if (window.innerWidth > 1200) {
      return (
        <div>
          <div
            style={{
              backgroundColor: "#44bd32",
              height: 32,
              paddingTop: "3%",
              borderRadius: 4,
            }}
          >
            <h5
              style={{ textAlign: "center", color: "white", fontWeight: "600" }}
            >
              NEXT PTP TIPS
            </h5>
          </div>
          <Next10 Open={false} dark={this.props.dark} />
        </div>
      );
    }
  }

  renderLast10() {
    if (window.innerWidth < 1200) {
      return (
        <div>
          <h5
            style={{
              backgroundColor: "#44bd32",
              height: 32,
              borderRadius: 4,
              textAlign: "center",
              color: "white",
              fontWeight: "600",
              margin: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "350px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            PREVIOUS PTP TIPS
          </h5>
          <div
            style={{
              display: "flex",
              overflowX: "scroll",
              overflowY: "hidden",
            }}
          >
            <Last10Cell />
          </div>
        </div>
      );
    } else if (window.innerWidth > 1200) {
      return (
        <div>
          <div
            style={{
              backgroundColor: "#44bd32",
              height: 32,
              paddingTop: "3%",
              borderRadius: 4,
            }}
          >
            <h5
              style={{ textAlign: "center", color: "white", fontWeight: "600" }}
            >
              PREVIOUS PTP TIPS
            </h5>
          </div>
          <Last10 Open={false} dark={this.props.dark} />
        </div>
      );
    }
  }

  render() {
    return (
      <div style={{ backgroundColor: this.props.dark ? "black" : "#eef0f4" }}>
        <Helmet>
          <title>Live Tips, On Now</title>
          <meta charSet="utf-8" name="author" content="PTP Tips" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            charSet="utf-8"
            name="keywords"
            content="PTP Tips , rates , odds , winning , horse , races , table results , horse details , live odds, speed map , venue maps , live results , owners , australia "
          />
          <meta
            charSet="utf-8"
            name="description"
            content={
              "Our process rates every horse's chance of winning for Australian\
                            thoroughbred races, and our tips are updated Live and automatically with next races to go!"
            }
          />
          <link rel="canonical" href={"https://www.ptptips.com.au/horse-racing-tips/now"} />
        </Helmet>

        {/* {this.props.fullScreen ?
                    <Collapse in={this.state.collapse} className="popup" onMouseLeave={this.triggerClose} >
                        <div style={{ height: 128, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <span style={{ color: 'white', fontSize: 16, marginTop: 24 }}>EXIT ON NOW</span>
                            <div style={{ cursor: 'pointer', marginTop: 24, marginLeft: 8 }}>
                                <Bell fontSize='50' color={'white'} style={{ opacity: '50%' }} onClick={() => this.exitFullScreen()} />
                            </div>
                        </div>
                        <Backdrop open={this.state.collapse}>
                        </Backdrop>
                    </Collapse> : null} */}

        <NowHead />

        <Row
          className="withHeader"
          style={{
            backgroundColor: this.props.dark ? "black" : "#eef0f4",
            marginTop: -40,
          }}
        >
          <Col xl={2} md={12} xs={12} style={{ marginTop: 24 }}>
            <div
              style={{
                maxHeight: "90%",
                overflowX: "scroll",
                overflowY: "hiden",
              }}
            >
              {this.renderNext10()}
            </div>
          </Col>

          <Col
            xl={8}
            md={12}
            xs={12}
            style={{ height: "100%", scrollX: "scroll" }}
          >
            <div style={{ height: 16 }} onMouseOver={this.triggerPop}></div>
            {this.props.isLoggedIn && !this.props.fullScreen ? (
              <ReactFullscreen>
                {({ ref, onRequest, onExit }) => (
                  <>
                    <Nav pills>
                      <NavItem>
                        <NavLink
                          onClick={() => {
                            onRequest();
                            this.fullScreen();
                          }}
                          active={!this.props.fullScreen}
                          style={{ marginRight: 10, cursor: "pointer" }}
                        >
                          Go Full Screen
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </>
                )}
              </ReactFullscreen>
            ) : null}

            <div
              style={{
                backgroundColor: this.props.dark ? "black" : "white",
                padding: 0,
                marginBottom: 20,
              }}
            >
              <HorsesTable
                dark={this.props.dark}
                trackInfo={this.props.trackInfo}
                horses={this.props.horses}
                genTime={this.props.genTime}
                oldHorses={this.props.oldHorses}
                disableButtons={true}
              />
            </div>
          </Col>
          <Col xl={2} md={12} xs={12} style={{ marginTop: 24 }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justidyContent: "flex-end",
              }}
            ></div>
            <div
              style={{
                maxHeight: "90%",
                overflowX: "scroll",
                overflowY: "hiden",
              }}
            >
              {this.renderLast10()}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  genTime: state.onNowReducer.generationTime,
  trackInfo: state.onNowReducer.trackInfo,
  horses: state.onNowReducer.horses,
  oldHorses: state.onNowReducer.oldHorses,
  fullScreen: state.auth.fullScreen,
  dark: state.auth.dark,
  isLoggedIn: state.auth.isLoggedIn,
});

export default withRouter(connect(mapStateToProps)(OnNow));
