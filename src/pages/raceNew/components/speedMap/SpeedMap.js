import React from "react";
import { Col, Row, Badge, Spinner, Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlagCheckered,
  faHorseHead,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./speedMap.scss";

import { loadSingleRace } from "../../../../config/config";
import raceAction from "../../../../redux/actions/race";

import { silkSize } from "../../../../config/racesUtils";

import {
  calcLead,
  calcLeadHandy,
  calcHandy,
  calcHandyMid,
  calcMid,
  calcRear,
  roundPace,
  // assignPace,
  paceRanking,
} from "./PaceFormulaCalc";

import Bar from "./Bar";
import BarAnti from "./BarAnti";

class SpeedMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      raceInfo: [],
      labelPosition: null,
      innerWidth: window.innerWidth,
      isClockwise: 0,
    
    };
    // this.child = React.createRef();
  }

  async componentWillMount() {
    // this.props.dispatch(raceAction.setLoadingSpeedMap())
    // console.log(this.props)
    window.addEventListener("resize", this.handleResize);
    this.loadRace();
    // this.props.dispatch(raceAction.resetSpeedMap(false))
    if (this.props.trackInfo[0]?.isClockwise === 0) {
      this.setState({ isClockwise: 0 });
      this.setState({ labelPosition: "flex-start" });
    } else {
      this.setState({ isClockwise: 1 });
      this.setState({ labelPosition: "flex-end" });
    }
    //console.log(this.state.raceInfo)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({ innerWidth: window.innerWidth });
  };

  /********************************** Optimize with charbel ****************************************/
  loadRace = () => {
    const { dispatch } = this.props;
    this.props.dispatch(raceAction.setLoadingSpeedMap());
    // console.log(this.props);
    let data = {
      meetdate: this.props.trackInfo[0]?.meetdate,
      trackcode: this.props.trackInfo[0]?.trackcode,
      racenum: this.props.trackInfo[0]?.race_num,
    };
    loadSingleRace(data).then((res) => {
      dispatch(raceAction.getFormings(res?.data[0]));
      dispatch(raceAction.loadRaceForm(res?.data[0]));
      dispatch(raceAction.setFormingRace(res?.data[0]));
    });
  };

  renderRaceBar() {
    const distance = this.props.trackInfo[0].track_distance;
    const distanceValue = distance?.split(" ")[0];

    if (window.innerWidth < 769) {
      if (this.props.trackInfo[0]?.isClockwise === 0) {
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Col
              xs={1}
              md={1}
              lg={1}
              style={{
                height: 32,
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "row",
                padding: 0,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Badge
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  zIndex: 0,
                  padding: 4,
                }}>
                <span style={{ fontSize: 14, marginLeft: 4, color: "grey" }}>
                  Start
                </span>
                <FontAwesomeIcon
                  icon={faHorseHead}
                  color="grey"
                  size="1x"
                  style={{
                    fontSize: 13,
                    opacity: "32%",
                    transform: "scaleX(1)",
                  }}
                />
              </Badge>
            </Col>

            <Col
              xs={10}
              md={2}
              lg={10}
              style={{
                height: 32,
                backgroundColor: "transparent",
                paddingLeft: 16,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginTop: 5,
              }}>
              <div
                style={{
                  backgroundColor: "black",
                  height: 1,
                  opacity: "32%",
                  marginLeft: 6,
                  marginRight: 4,
                }}></div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Badge
                  color="primary"
                  style={{
                    backgroundColor: "white",
                    color: "grey",
                    width: 80,
                    marginTop: -10,
                    zIndex: 1,
                    padding: 4,
                    fontWeight: "-moz-initial.+",
                  }}>
                  {distanceValue}
                </Badge>
              </div>
            </Col>

            <Col
              xs={1}
              md={1}
              lg={1}
              style={{
                height: 32,
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "row",
                padding: 0,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Badge
                style={{
                  backgroundColor: "transparent",
                  zIndex: 0,
                  padding: 4,
                }}>
                <span
                  style={{
                    fontSize: 14,
                    marginRight: 4,
                    color: "grey",
                    opacity: "80%",
                  }}>
                  End
                </span>
                <FontAwesomeIcon
                  icon={faFlagCheckered}
                  color="grey"
                  size="1x"
                  style={{ fontSize: 13, opacity: "32%" }}
                />
              </Badge>
            </Col>
          </div>
        );
      } else {
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Col
              xs={1}
              md={1}
              lg={1}
              style={{
                height: 32,
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "row",
                padding: 0,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Badge
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  zIndex: 0,
                  padding: 4,
                }}>
                <FontAwesomeIcon
                  icon={faFlagCheckered}
                  color="grey"
                  size="1x"
                  style={{ fontSize: 13, opacity: "32%" }}
                />
                <span style={{ fontSize: 14, marginLeft: 4, color: "grey" }}>
                  End
                </span>
              </Badge>
            </Col>

            <Col
              xs={10}
              md={2}
              lg={10}
              style={{
                height: 32,
                backgroundColor: "transparent",
                paddingLeft: 16,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginTop: 5,
              }}>
              <div
                style={{
                  backgroundColor: "black",
                  height: 1,
                  opacity: "32%",
                  marginLeft: 6,
                  marginRight: 4,
                }}></div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Badge
                  color="primary"
                  style={{
                    backgroundColor: "white",
                    color: "grey",
                    width: 80,
                    marginTop: -10,
                    zIndex: 1,
                    padding: 4,
                    fontWeight: "-moz-initial.+",
                  }}>
                  {distanceValue}
                </Badge>
              </div>
            </Col>

            <Col
              xs={1}
              md={1}
              lg={1}
              style={{
                height: 32,
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "row",
                padding: 0,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Badge
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  zIndex: 0,
                  padding: 4,
                }}>
                <span style={{ fontSize: 14, marginLeft: 4, color: "grey" }}>
                  Start
                </span>
                <FontAwesomeIcon
                  icon={faHorseHead}
                  color="grey"
                  size="1x"
                  style={{ fontSize: 13, opacity: "32%" }}
                />
              </Badge>
            </Col>
          </div>
        );
      }
    }

    if (this.props.trackInfo[0]?.isClockwise === 0) {
      return (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Col
            xs={1}
            md={1}
            lg={1}
            style={{
              height: 32,
              backgroundColor: "transparent",
              display: "flex",
              flexDirection: "row",
              padding: 0,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Badge
              style={{
                backgroundColor: "transparent",
                color: "white",
                zIndex: 0,
                padding: 4,
              }}>
              <FontAwesomeIcon
                icon={faHorseHead}
                color="grey"
                size="1x"
                style={{ fontSize: 13, opacity: "32%" }}
              />
              <span style={{ fontSize: 14, marginLeft: 4, color: "grey" }}>
                Start
              </span>
            </Badge>
          </Col>

          <Col
            xs={10}
            md={2}
            lg={10}
            style={{
              height: 32,
              backgroundColor: "transparent",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: 0,
              marginTop: 5,
            }}>
            <div
              style={{
                backgroundColor: "black",
                height: 1,
                opacity: "32%",
                marginLeft: 6,
                marginRight: 4,
              }}></div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Badge
                color="primary"
                style={{
                  backgroundColor: "white",
                  color: "grey",
                  width: 80,
                  marginTop: -10,
                  zIndex: 1,
                  padding: 4,
                  fontWeight: "-moz-initial.+",
                }}>
                {distanceValue}
              </Badge>
            </div>
          </Col>

          <Col
            xs={1}
            md={1}
            lg={1}
            style={{
              height: 32,
              backgroundColor: "transparent",
              display: "flex",
              flexDirection: "row",
              padding: 0,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Badge
              style={{ backgroundColor: "transparent", zIndex: 0, padding: 4 }}>
              <span
                style={{
                  fontSize: 14,
                  marginRight: 4,
                  color: "grey",
                  opacity: "80%",
                }}>
                End
              </span>
              <FontAwesomeIcon
                icon={faFlagCheckered}
                color="grey"
                size="1x"
                style={{ fontSize: 13, opacity: "32%" }}
              />
            </Badge>
          </Col>
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Col
            xs={1}
            md={1}
            lg={1}
            style={{
              height: 32,
              backgroundColor: "transparent",
              display: "flex",
              flexDirection: "row",
              padding: 0,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Badge
              style={{ backgroundColor: "transparent", zIndex: 0, padding: 4 }}>
              <FontAwesomeIcon
                icon={faFlagCheckered}
                color="grey"
                size="1x"
                style={{ fontSize: 13, opacity: "32%" }}
              />
              <span
                style={{
                  fontSize: 14,
                  marginLeft: 4,
                  color: "grey",
                  opacity: "80%",
                }}>
                End
              </span>
            </Badge>
          </Col>

          <Col
            xs={10}
            md={2}
            lg={10}
            style={{
              height: 32,
              backgroundColor: "transparent",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: 0,
              marginTop: 5,
            }}>
            <div
              style={{
                backgroundColor: "black",
                height: 1,
                opacity: "32%",
                marginLeft: 6,
                marginRight: 4,
              }}></div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Badge
                color="primary"
                style={{
                  backgroundColor: "white",
                  color: "grey",
                  width: 80,
                  marginTop: -10,
                  zIndex: 1,
                  padding: 4,
                  fontWeight: "-moz-initial.+",
                }}>
                {distanceValue}
              </Badge>
            </div>
          </Col>

          <Col
            xs={1}
            md={1}
            lg={1}
            style={{
              height: 32,
              backgroundColor: "transparent",
              display: "flex",
              flexDirection: "row",
              padding: 0,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Badge
              style={{
                backgroundColor: "transparent",
                color: "white",
                zIndex: 1,
                padding: 4,
                display: "flex",
              }}>
              <span style={{ fontSize: 14, marginRight: 4, color: "grey" }}>
                Start
              </span>
              <FontAwesomeIcon
                icon={faHorseHead}
                color="grey"
                size="1x"
                style={{ fontSize: 13, opacity: "32%" }}
              />
            </Badge>
          </Col>
        </div>
      );
    }
  }

  renderReset() {
    if (this.props.trackInfo[0]?.isClockwise === 0) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            marginRight: -14,
          }}>
          <Button
            onClick={() => this.resetData()}
            color="primary"
            size="sm"
            style={{
              marginTop: 18,
              backgroundColor: "#e9ecef",
              borderColor: "transparent",
              color: "black",
            }}>
            <span style={{ color: "black", opacity: "82%" }}>Reset</span>
          </Button>
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            marginLeft: -14,
          }}>
          <Button
            onClick={() => this.resetData()}
            color="primary"
            size="sm"
            style={{
              marginTop: 18,
              backgroundColor: "#e9ecef",
              borderColor: "transparent",
              color: "black",
            }}>
            <span style={{ color: "black", opacity: "82%" }}>Reset</span>
          </Button>
        </div>
      );
    }
  }

  renderLegend() {
    if (this.props.trackInfo[0]?.isClockwise === 0 && window.innerWidth < 769) {
      return (
        <>
          <Row
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 8,
              padding: 0,
              alignItems: "center",
              justifyContent: "center",
            }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginLeft: -24,
              }}>
              <div
                style={{
                  marginLeft: 16,
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "row",
                }}>
                <div
                  style={{
                    width: 11,
                    height: 11,
                    backgroundColor: this.coloring("starter"),
                    borderRadius: 32,
                    opacity: "50%",
                    marginTop: 4,
                  }}></div>
                <div style={{ marginLeft: 4 }}>Starter</div>
              </div>

              <div
                style={{
                  marginLeft: 16,
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "row",
                }}>
                <div
                  style={{
                    width: 11,
                    height: 11,
                    backgroundColor: this.coloring("Rear"),
                    borderRadius: 32,
                    opacity: "50%",
                    marginTop: 4,
                  }}></div>
                <div style={{ marginLeft: 4 }}>Backmarker</div>
              </div>

              <div
                style={{
                  marginLeft: 16,
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "row",
                }}>
                <div
                  style={{
                    width: 11,
                    height: 11,
                    backgroundColor: this.coloring("Mid"),
                    borderRadius: 32,
                    opacity: "50%",
                    marginTop: 4,
                  }}></div>
                <div style={{ marginLeft: 4 }}>Mid</div>
              </div>

              <div
                style={{
                  marginLeft: 16,
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "row",
                }}>
                <div
                  style={{
                    width: 11,
                    height: 11,
                    backgroundColor: this.coloring("Handy"),
                    borderRadius: 32,
                    opacity: "50%",
                    marginTop: 4,
                  }}></div>
                <div style={{ marginLeft: 4 }}>OnPace</div>
              </div>

              <div
                style={{
                  marginLeft: 16,
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "row",
                }}>
                <div
                  style={{
                    width: 11,
                    height: 11,
                    backgroundColor: this.coloring("Lead"),
                    borderRadius: 32,
                    opacity: "50%",
                    marginTop: 4,
                  }}></div>
                <div style={{ marginLeft: 4 }}>Lead</div>
              </div>
            </div>
          </Row>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            {this.renderReset()}
          </div>
        </>
      );
    }

    if (this.props.trackInfo[0]?.isClockwise === 1 && window.innerWidth < 769) {
      return (
        <>
          <Row
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 8,
              padding: 0,
              alignItems: "center",
              justifyContent: "center",
            }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginLeft: -24,
              }}>
              <div
                style={{
                  marginLeft: 16,
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "row",
                }}>
                <div
                  style={{
                    width: 11,
                    height: 11,
                    backgroundColor: this.coloring("Lead"),
                    borderRadius: 32,
                    opacity: "50%",
                    marginTop: 4,
                  }}></div>
                <div style={{ marginLeft: 4 }}>Lead</div>
              </div>

              <div
                style={{
                  marginLeft: 16,
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "row",
                }}>
                <div
                  style={{
                    width: 11,
                    height: 11,
                    backgroundColor: this.coloring("Handy"),
                    borderRadius: 32,
                    opacity: "50%",
                    marginTop: 4,
                  }}></div>
                <div style={{ marginLeft: 4 }}>OnPace</div>
              </div>

              <div
                style={{
                  marginLeft: 16,
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "row",
                }}>
                <div
                  style={{
                    width: 11,
                    height: 11,
                    backgroundColor: this.coloring("Mid"),
                    borderRadius: 32,
                    opacity: "50%",
                    marginTop: 4,
                  }}></div>
                <div style={{ marginLeft: 4 }}>Mid</div>
              </div>

              <div
                style={{
                  marginLeft: 16,
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "row",
                }}>
                <div
                  style={{
                    width: 11,
                    height: 11,
                    backgroundColor: this.coloring("Rear"),
                    borderRadius: 32,
                    opacity: "50%",
                    marginTop: 4,
                  }}></div>
                <div style={{ marginLeft: 4 }}>Backmarker</div>
              </div>

              <div
                style={{
                  marginLeft: 16,
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "row",
                }}>
                <div
                  style={{
                    width: 11,
                    height: 11,
                    backgroundColor: this.coloring("starter"),
                    borderRadius: 32,
                    opacity: "50%",
                    marginTop: 4,
                  }}></div>
                <div style={{ marginLeft: 4 }}>Starter</div>
              </div>
            </div>
          </Row>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            {this.renderReset()}
          </div>
        </>
      );
    }

    if (this.props.trackInfo[0]?.isClockwise === 0 && window.innerWidth > 769) {
      return (
        <Col
          xs={12}
          lg={12}
          style={{ display: "flex", flexDirection: "row", marginTop: 8 }}>
          <Col xs={12} lg={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginLeft: -24,
              }}>
              <div
                style={{
                  marginLeft: 16,
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "row",
                }}>
                <div
                  style={{
                    width: 11,
                    height: 11,
                    backgroundColor: this.coloring("starter"),
                    borderRadius: 32,
                    opacity: "50%",
                    marginTop: 4,
                  }}></div>
                <div style={{ marginLeft: 4 }}>No Speed Available</div>
              </div>

              <div
                style={{
                  marginLeft: 16,
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "row",
                }}>
                <div
                  style={{
                    width: 11,
                    height: 11,
                    backgroundColor: this.coloring("Rear"),
                    borderRadius: 32,
                    opacity: "50%",
                    marginTop: 4,
                  }}></div>
                <div style={{ marginLeft: 4 }}>Backmarker</div>
              </div>

              <div
                style={{
                  marginLeft: 16,
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "row",
                }}>
                <div
                  style={{
                    width: 11,
                    height: 11,
                    backgroundColor: this.coloring("Mid"),
                    borderRadius: 32,
                    opacity: "50%",
                    marginTop: 4,
                  }}></div>
                <div style={{ marginLeft: 4 }}>Mid</div>
              </div>

              <div
                style={{
                  marginLeft: 16,
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "row",
                }}>
                <div
                  style={{
                    width: 11,
                    height: 11,
                    backgroundColor: this.coloring("Handy"),
                    borderRadius: 32,
                    opacity: "50%",
                    marginTop: 4,
                  }}></div>
                <div style={{ marginLeft: 4 }}>OnPace</div>
              </div>

              <div
                style={{
                  marginLeft: 16,
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "row",
                }}>
                <div
                  style={{
                    width: 11,
                    height: 11,
                    backgroundColor: this.coloring("Lead"),
                    borderRadius: 32,
                    opacity: "50%",
                    marginTop: 4,
                  }}></div>
                <div style={{ marginLeft: 4 }}>Lead</div>
              </div>
            </div>
            <div>{window.innerWidth < 769 ? this.renderReset() : null}</div>
          </Col>

          <Col xs={12} lg={6}>
            {window.innerWidth > 769 ? this.renderReset() : null}
          </Col>
        </Col>
      );
    } else {
      return (
        <Col
          xs={12}
          lg={12}
          style={{ display: "flex", flexDirection: "row", marginTop: 8 }}>
          <Col xs={12} lg={6}>
            {window.innerWidth > 769 ? this.renderReset() : null}
          </Col>

          <Col xs={12} lg={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                marginRight: 0,
              }}>
              <div
                style={{
                  marginLeft: 16,
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "row",
                }}>
                <div
                  style={{
                    width: 11,
                    height: 11,
                    backgroundColor: this.coloring("Lead"),
                    borderRadius: 32,
                    opacity: "50%",
                    marginTop: 4,
                  }}></div>
                <div style={{ marginLeft: 4 }}>Lead</div>
              </div>

              <div
                style={{
                  marginLeft: 16,
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "row",
                }}>
                <div
                  style={{
                    width: 11,
                    height: 11,
                    backgroundColor: this.coloring("Handy"),
                    borderRadius: 32,
                    opacity: "50%",
                    marginTop: 4,
                  }}></div>
                <div style={{ marginLeft: 4 }}>OnPace</div>
              </div>

              <div
                style={{
                  marginLeft: 16,
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "row",
                }}>
                <div
                  style={{
                    width: 11,
                    height: 11,
                    backgroundColor: this.coloring("Mid"),
                    borderRadius: 32,
                    opacity: "50%",
                    marginTop: 4,
                  }}></div>
                <div style={{ marginLeft: 4 }}>Mid</div>
              </div>

              <div
                style={{
                  marginLeft: 16,
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "row",
                }}>
                <div
                  style={{
                    width: 11,
                    height: 11,
                    backgroundColor: this.coloring("Rear"),
                    borderRadius: 32,
                    opacity: "50%",
                    marginTop: 4,
                  }}></div>
                <div style={{ marginLeft: 4 }}>Backmarker</div>
              </div>

              <div
                style={{
                  marginLeft: 16,
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "row",
                }}>
                <div
                  style={{
                    width: 11,
                    height: 11,
                    backgroundColor: this.coloring("starter"),
                    borderRadius: 32,
                    opacity: "50%",
                    marginTop: 4,
                  }}></div>
                <div style={{ marginLeft: 4 }}>No Speed Available</div>
              </div>
            </div>
            <div>{window.innerWidth < 769 ? this.renderReset() : null}</div>
          </Col>
        </Col>
      );
    }
  }

  closeSpeedMap() {
    const { dispatch } = this.props;
    dispatch(raceAction.changeTab(0));
  }

  resetData = () => {
    if (this.props.resetSpeedMap === true) {
      this.props.dispatch(raceAction.resetSpeedMap(false));
    } else {
      this.props.dispatch(raceAction.resetSpeedMap(true));
    }
  };

  coloring = (val) => {
    if (val === "Mid") {
      //mid
      return "#0000AB";
    } else if (val === "Handy") {
      //on pace
      return "#1873D3";
    } else if (val === "Lead/Handy") {
      //on pace
      return "#1873D3";
    } else if (val === "Lead") {
      //Lead
      return "#2ecc71";
    } else if (val === "Handy/Mid") {
      //Mid
      return "#0000AB";
    } else if (val === "Rear") {
      return "red";
    } else {
      return "grey";
    }
  };

  getI = (horse) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}>
        <div
          style={{
            width: 32,
            height: 32,
            backgroundImage: "url(" + horse?.horse_silksUrl + ")",
            backgroundPositionX: Number(silkSize(horse?.horse_number - 1)),
            marginTop: 4,
          }}></div>
      </div>
    );
  };

  renderChecker = () => {
    if (this.props.speedMapLoading) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Spinner
            style={{
              width: "3rem",
              height: "3rem",
              color: "#e9ecef",
              marginTop: 16,
            }}
            type="grow"
          />
        </div>
      );
    } else {
      let formingInfoARR = [];
      let barRows = [];

      const hrsForm = this.props.hrsForm;
      const formingData = this.props.formingData;
      const { horses } = this.props;
      // console.log(hrsForm,formingData,horses)
      if (hrsForm && formingData) {
        hrsForm.forEach((item) => {
          let horse = item;
          let key = 0;

          let formingInfo = {
            no: horse.TABNO,
            name: horse.HORSENAME,
            pace: horse.PACE,
            rpace: "",
            barrier: horse.BARRIER,
            rear: 0,
            mid: 0,
            handyMid: 0,
            handy: 0,
            leadHandy: 0,
            lead: 0,
            increment: 0,
            position: 0,
          };
          if (item.SCRATCHED !== "1") {
            formingData.forEach((item) => {
              let forming = item;
              if (
                forming.HORSENAME === horse.HORSENAME &&
                forming?.RACENUM === this.props.raceInfo?.RACENUM &&
                item.CLASSCODE !== "Btria" &&
                key < 3
              ) {
                switch (horse.PACE) {
                  case "Lead":
                    formingInfo.lead += Number(calcLead(forming));
                    formingInfo.position = key;
                    formingInfo.rpace = "lead";
                    break;
                  case "Lead/Handy":
                    formingInfo.leadHandy += Number(calcLeadHandy(forming));
                    formingInfo.position = key;
                    formingInfo.rpace = "leadHandy";
                    break;
                  case "Handy":
                    formingInfo.handy += Number(calcHandy(forming));
                    formingInfo.position = key;
                    formingInfo.rpace = "handy";
                    break;
                  case "Handy/Mid":
                    formingInfo.handyMid += Number(calcHandyMid(forming));
                    formingInfo.position = key;
                    formingInfo.rpace = "handyMid";
                    break;
                  case "Mid":
                    formingInfo.mid += Number(calcMid(forming));
                    formingInfo.position = key;
                    formingInfo.rpace = "mid";
                    break;
                  case "Rear":
                    formingInfo.rear += Number(calcRear(forming));
                    formingInfo.position = key;
                    formingInfo.rpace = "rear";
                    break;
                  default:
                  //Do Nothing
                }

                formingInfo.increment++;
                key++;
              }
            });

            formingInfoARR.push(formingInfo);
          }
        });

        for (let i = 0; i < formingInfoARR.length; i++) {
          formingInfoARR[i] = roundPace(formingInfoARR[i]);
        }

        formingInfoARR = formingInfoARR.sort((a, b) => {
          return a.barrier - b.barrier;
        });

        for (let i = 0; i < formingInfoARR.length; i++) {
          formingInfoARR[i].barrier = i + 1;
        }

        formingInfoARR = formingInfoARR.sort((a, b) => {
          return b.barrier - a.barrier;
        });
      }

      var maxFirm = 0;
      var maxHeavy = 0;
      var maxSoft = 0;
      var maxGood = 0;
      var maxSynth = 0;
      var odds = [];
      this.props.horses.forEach((element) => {
        if (element.points_per_firm > maxFirm) {
          maxFirm = element.points_per_firm;
        }
        if (element.points_per_heavy > maxHeavy) {
          maxHeavy = element.points_per_heavy;
        }
        if (element.points_per_soft > maxSoft) {
          maxSoft = element.points_per_soft;
        }
        if (element.points_per_good > maxGood) {
          maxGood = element.points_per_good;
        }
        if (element.points_per_synth > maxSynth) {
          maxSynth = element.points_per_synth;
        }
        if (element.ub_win !== 0) {
          odds.push(Number(element.ub_win));
        }
      });
      var ubMinOdd = Math.min.apply(Math, odds);

      formingInfoARR.map((item, i) => {
        const horse = horses.find(
          (val) => val?.horse_number === Number(item.no)
        );
        // console.log('item', item)
        if (this.props.trackInfo[0]?.isClockwise === 0) {
          return barRows.push(
            <div style={{ paddingRight: 24 }} key={`b-${i}`}>
              <Bar
                key={i}
                maxI={hrsForm.length}
                color={this.coloring(item.pace)}
                barrier={item.barrier}
                no={item.no}
                horseName={item.name}
                pace={item.pace}
                value={paceRanking(item, formingInfoARR)}
                horse={horse}
                silkData={this.getI(horse)}
                maxFirm={maxFirm}
                maxHeavy={maxHeavy}
                maxSoft={maxSoft}
                maxGood={maxGood}
                maxSynth={maxSynth}
                ubMinOdd={ubMinOdd}
                trackCondition={this.props.trackInfo[0]?.track_condition}
                isNa={this.props.trackInfo[0]?.is_na}
              />
            </div>
          );
        } else {
          return barRows.push(
            <div style={{ paddingLeft: 32 }} key={`ba-${i}`}>
              <BarAnti
                key={i}
                maxI={hrsForm.length}
                color={this.coloring(item.pace)}
                barrier={item.barrier}
                no={item.no}
                horseName={item.name}
                pace={item.pace}
                value={paceRanking(item, formingInfoARR)}
                horse={horse}
                silkData={this.getI(horse)}
                maxFirm={maxFirm}
                maxHeavy={maxHeavy}
                maxSoft={maxSoft}
                maxGood={maxGood}
                maxSynth={maxSynth}
                ubMinOdd={ubMinOdd}
                trackCondition={this.props.trackInfo[0]?.track_condition}
                isNa={this.props.trackInfo[0]?.is_na}
              />
            </div>
          );
        }
      });

      if (barRows.length > 0) {
        return barRows;
      }
    }
  };

  render() {
    // console.log(this.props.horses)
    return (
      <div style={{ marginTop: 1, zIndex: 0, marginBottom: 1 }}>
        <Col lg={12} style={{ padding: 0, paddingLeft: 0 }}>
          <Row>
            <Col
              lg={12}
              style={{
                backgroundColor: "white",
                height: "auto",
                borderRadius: 8,
                paddingBottom: 32,
              }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}>
                <FontAwesomeIcon
                  icon={faTimes}
                  color="black"
                  size="1x"
                  style={{
                    fontSize: 14,
                    opacity: "32%",
                    marginTop: 10,
                    cursor: "pointer",
                  }}
                  onClick={() => this.closeSpeedMap()}
                />
              </div>
              <Col xs={12} md={12} lg={12} style={{ marginTop: 16 }}>
                {this.renderRaceBar()}
              </Col>

              <Col lg={12} style={{ marginTop: 0, padding: 0 }}>
                <div
                  style={{
                    padding: 0,
                    marginTop: 16,
                    marginLeft: this.state.innerWidth < 500 ? -13 : 16,
                  }}>
                  {this.renderChecker()}
                </div>
                {this.renderLegend()}
              </Col>
            </Col>
          </Row>
        </Col>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  raceByDate: state.raceReducer.trackcodes,
  raceData: state.raceReducer.races,
  formingData: state.raceReducer.formings,
  hrsForm: state.raceReducer.raceForm,
  trackInfo: state.raceReducer.trackInfoOpt,
  singleRace: state.raceReducer.singleRace,
  speedMapLoading: state.raceReducer.speedMapLoading,
  horses: state.raceReducer.horsesOpt,
  resetSpeedMap: state.raceReducer.resetSpeedMap,
  raceInfo: state.raceReducer.raceInfo,
});

export default withRouter(connect(mapStateToProps)(SpeedMap));
