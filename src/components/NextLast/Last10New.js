import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import moment from "moment-timezone";
import Timer from "../Timer";
/* REDUX */
import actions from "../../redux/actions/selections";
import raceAction from "../../redux/actions/race";

// import getRaceSelected from '../../redux/actions/raceSelected'
import { CircularProgress } from "@material-ui/core";
import Lock from "../Lock/Lock";
import { fullTrackCond, trackColor } from "../../config/racesUtils";
import SkeletonText from "../Skeletons/SkeletonText";
import { checkRouteDate } from "../../config/utils";
import { Col, Row } from "reactstrap";

import "./last10.scss";

export const Last10New = (props) => {
  // console.log(props)
  useEffect(() => {
    props.getLastTen(props.showLastNR);
    var interval = setInterval(() => {
      props.getLastTenNoReload(props.showLastNR);
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const TimerCheck = (RaceTime, formatted, racetime, rStatus) => {
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

  const equalselec = (first, second, third, fourth, nb1, nb2, nb3, nb4) => {
    if (
      Math.round(first) === Math.round(second) &&
      Math.round(second) === Math.round(third) &&
      Math.round(third) === Math.round(fourth)
    ) {
      return nb1 + " & " + nb2 + " & " + nb3 + " & " + nb4;
    } else if (
      Math.round(first) === Math.round(second) &&
      Math.round(second) === Math.round(third)
    ) {
      return nb1 + " & " + nb2 + " & " + nb3;
    } else if (Math.round(first) === Math.round(second)) {
      return nb1 + " & " + nb2;
    } else {
      return nb1;
    }
  };

  const equalrender = (first, second, track_cond) => {
    if (Math.round(first - second) === 0) {
      return (
        <div
          style={{
            backgroundColor: "green",
            borderRadius: "4px",
            color: "white",
            fontSize: "11px",
            width: "20px",
            display: "flex",
            justifyContent: "center",
            marginTop: "2px",
            alignItems: "baseline",
            padding: "0px",
          }}
        >
          EQ
        </div>
      );
    } else
      return (
        <small className="text_blue">
          {"+" + Math.round(Number(first) - Number(second)) + "%"}
        </small>
      );
  };

  const equalodds = (first, second, odd) => {
    if (Math.round(first - second) === 0) {
      return "-.-";
    } else return odd;
  };

  const TBACheck = (value1, value2, result) => {
    if (result === "TBA" || result === null) {
      return value1;
    } else {
      return value2;
    }
  };

  const resultCheck = (value) => {
    if (value) {
      if (value === "WON") {
        return "textwon";
      } else if (value === "2ND") {
        return "textSecond";
      } else if (value === "3RD") {
        return "textThird";
      } else if (value === "LOST") {
        return "textLost";
      }
    } else return "textLost";
  };

  const resultTextCheck = (value) => {
    if (value === "WON") {
      return "1st";
    } else if (value) {
      return value;
    } else return "TBA";
  };

  const nrBadgeRender = (isNR) => {
    if (isNR === 1) {
      return (
        <div
          style={{
            backgroundColor: "#F64E60",
            borderRadius: 5,
            color: "white",
            fontSize: 12,
            textAlign: "center",
            minWidth: 20,
          }}
        >
          NR
        </div>
      );
    }
    return "";
  };

  const last = () => {
    var last = props.last10Tips.map((zone, i) => {
      var selectionfirst;
      var selectionsecond;
      var selectionthird;
      var selectionfourth;

      var finalTrackCondition = fullTrackCond(zone.full_track_condition);

      var horsenb1;
      var horsenb2;
      var horsenb3;
      var horsenb4;

      var SBW;
      var SBP;

      var UBW;
      var UBP;

      var horses = zone?.horses?.map((index, i) => {
        if (i === 0) {
          selectionfirst = index?.percentage;
          horsenb1 = index?.tab_no;
          if (index.sb_win) {
            SBW = Number(index.sb_win).toFixed(2);
            SBP = Number(index.sb_place).toFixed(2);
          } else {
            SBW = Number(0.0).toFixed(2);
            SBP = Number(0.0).toFixed(2);
          }
          if (index.ub_win) {
            UBW = Number(index.ub_win).toFixed(2);
            UBP = Number(index.ub_place).toFixed(2);
          } else {
            UBW = Number(0.0).toFixed(2);
            UBP = Number(0.0).toFixed(2);
          }
        } else if (i === 1) {
          selectionsecond = index?.percentage;
          horsenb2 = index?.tab_no;
        } else if (i === 2) {
          selectionthird = index?.percentage;
          horsenb3 = index?.tab_no;
        } else if (i === 3) {
          selectionfourth = index?.percentage;
          horsenb4 = index?.tab_no;
        }
      });
      var Rname = zone.track_name;
      var Rnum = zone.race_num;

      let BbId = zone.sb_venue_id
      let BbUrl = "https://www.boombet.com.au/racing/" + BbId + "/?Referrer=PTPTips"

      // let UbId = zone.unibet_venue_id
      // let UbUrl = "https://www.unibet.com.au/racing#/event/" + UbId


      if (props.showLastNR) {
        return (
          <div
            key={i}
            className="last10card"
            style={{
              marginTop: 8,
              padding: "2px 0px",
              backgroundColor: props.dark ? "#1D1D1C" : "white",
              borderRadius: "4px",
              padding: 2,
              minWidth: window.innerWidth < 1200 ? "230px" : "180px",
              marginRight: window.innerWidth < 1200 ? 8 : 0
            }}
          >
            <Col
              xs="12"
              md="12"
              lg="12"
              style={{ padding: "4px" }}
              rel="nofollow"
            >
              <Link
                to={`/horse-racing-tips/${checkRouteDate(
                  moment(zone.meetdate)
                    .tz("Australia/Sydney")
                    .format("DD-MM-YYYY")
                )}/${Rname}/R${Rnum}/${zone.point_id}`}
                replace
                rel="nofollow"
              >
                <Row style={{ margin: 0, padding: 0, paddingRight: 5 }}>
                  <Col xs={8} style={{ margin: 0, padding: 0 }}>
                    <small className="track">{zone.track_name}</small>
                  </Col>
                  <Col xs={4} style={{ margin: 0, padding: 0 }}>
                    <Row style={{ margin: 0, padding: 0 }}>
                      <Col
                        xs={6}
                        style={{
                          textAlign: "left",
                          fontSize: 13,
                          color: "#0f72b5",
                          fontWeight: "500",
                        }}
                      >
                        R{zone.race_num}
                      </Col>
                      <Col xs={6} style={{ textAlign: "left" }}>
                        <small className={resultCheck(zone.result)}>
                          {resultTextCheck(zone.result)}
                        </small>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row style={{ margin: 0, padding: 0, paddingRight: 5 }}>
                  <Col xs={6} style={{ margin: 0, padding: 0 }}>
                    <Row style={{ margin: 0, padding: 0 }}>
                      <Col
                        xs={7}
                        style={{
                          margin: 0,
                          padding: 0,
                          textAlign: "left",
                          color: "green",
                          fontWeight: 600,
                        }}
                      >
                        No.
                        {TBACheck(
                          equalselec(
                            selectionfirst,
                            selectionsecond,
                            selectionthird,
                            selectionfourth,
                            horsenb1,
                            horsenb2,
                            horsenb3,
                            horsenb4
                          ),
                          horsenb1,
                          zone.result
                        )}
                      </Col>
                      <Col xs={5}>
                        {props.showCTCL && (
                          <div
                            style={{
                              textAlign: "center",
                              background: trackColor(zone.track_condition),
                              fontWeight: 600,
                              fontSize: 12,
                              color: "white",
                              borderRadius: 5,
                              minWidth: 25,
                            }}
                          >
                            {finalTrackCondition}
                          </div>
                        )}
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={6} style={{ margin: 0, padding: 0 }}>
                    <Row style={{ margin: 0, padding: 0 }}>
                      <Col xs={4} style={{ textAlign: "left" }}>
                        {nrBadgeRender(zone.is_na)}
                      </Col>
                      <Col
                        xs={4}
                        style={{
                          textAlign: "left",
                          color: "#0f72b5",
                          fontSize: 12,
                        }}
                      >
                        {Math.round(selectionfirst) + "%"}
                      </Col>
                      <Col xs={4} style={{ textAlign: "left" }}>
                        {
                          <small className="text_blue">
                            <span style={{ textAlign: "left" }}>
                              {TBACheck(
                                equalrender(selectionfirst, selectionsecond),
                                "+" +
                                  Math.round(selectionfirst - selectionsecond) +
                                  "%",
                                zone.result
                              )}
                            </span>
                          </small>
                        }
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <hr
                  style={{
                    backgroundColor: "gray",
                    opacity: 0.4,
                    marginTop: "2px",
                  }}
                />
              </Link>

              <Row style={{ margin: 0, padding: 0, paddingRight: 5 }}>
                <Col xs={6} style={{ margin: 0, padding: 0 }}>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href= {BbUrl}
                  >
                    <Row style={{ margin: 0, padding: 0 }}>
                      <Col xs={4} style={{ margin: 0, padding: 0 }}>
                        <div
                          style={{
                            backgroundColor: "#e12b80",
                            color: "white",
                            fontWeight: 400,
                            borderRadius: "5px",
                            padding: "2px 4px",
                            fontSize: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "8px",
                            height: "20px",
                          }}
                        >
                          BB
                        </div>
                      </Col>
                      <Col
                        xs={4}
                        style={{ margin: 0, padding: 0, textAlign: "center" }}
                      >
                        <small>
                          <span className="SportsBetting">${SBW}</span>
                        </small>
                      </Col>
                      <Col
                        xs={4}
                        style={{ margin: 0, padding: 0, textAlign: "center" }}
                      >
                        <small>
                          <span className="SportsBetting">${SBP}</span>
                        </small>
                      </Col>
                    </Row>
                  </a>
                </Col>
                <Col xs={6} style={{ margin: 0, padding: 0 }}>
                  <a

                    target="_blank"
                    rel="noreferrer"
                    href="https://b1.trickyrock.com/redirect.aspx?pid=31144281&bid=21418"
                  >
                    <Row style={{ margin: 0, padding: 0 }}>
                      <Col xs={4}>
                        <div>
                          <img
                            style={{
                              objectFit: "contain",
                              height: "20px",
                              borderRadius: "5px",
                            }}
                            src={
                              "https://dnu5embx6omws.cloudfront.net/Logos/unibet/30x30@2x.png"
                            }
                            alt=""
                          />
                        </div>
                      </Col>
                      <Col
                        xs={4}
                        className="Unibet"
                        style={{ margin: 0, padding: 0, textAlign: "center" }}
                      >
                        <small>
                          <span className="Unibet">${UBW}</span>
                        </small>
                      </Col>
                      <Col
                        xs={4}
                        className="Unibet"
                        style={{ margin: 0, padding: 0, textAlign: "center" }}
                      >
                        <small>
                          <span className="Unibet">${UBP}</span>
                        </small>
                      </Col>
                    </Row>
                  </a>
                </Col>
              </Row>
            </Col>
          </div>
        );
      } else if (!props.showLastNR && zone.is_na === 0) {
        return (
          <div
            className="last10card"
            key={i}
            // className="pointer box-shadow"
            style={{
              marginTop: 8,
              padding: "2px 0px",
              backgroundColor: props.dark ? "#1D1D1C" : "white",
              borderRadius: "4px",
              padding: 2,
              minWidth: window.innerWidth < 1200 ? "230px" : "180px",
              marginRight: window.innerWidth < 1200 ? 8 : 0
            }}
          >
            <Col
              xs="12"
              md="12"
              lg="12"
              style={{ padding: "4px" }}
              rel="nofollow"
            >
              <Link
                to={`/horse-racing-tips/${checkRouteDate(
                  moment(zone.meetdate)
                    .tz("Australia/Sydney")
                    .format("DD-MM-YYYY")
                )}/${Rname}/R${Rnum}/${zone.point_id}`}
                replace
                rel="nofollow"
              >
                <Row style={{ margin: 0, padding: 0, paddingRight: 5 }}>
                  <Col xs={8} style={{ margin: 0, padding: 0 }}>
                    <small className="track">{zone.track_name}</small>
                  </Col>
                  <Col xs={4} style={{ margin: 0, padding: 0 }}>
                    <Row style={{ margin: 0, padding: 0 }}>
                      <Col
                        xs={6}
                        style={{
                          textAlign: "left",
                          fontSize: 13,
                          color: "#0f72b5",
                          fontWeight: "500",
                        }}
                      >
                        R{zone.race_num}
                      </Col>
                      <Col xs={6} style={{ textAlign: "left" }}>
                        <small className={resultCheck(zone.result)}>
                          {resultTextCheck(zone.result)}
                        </small>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row style={{ margin: 0, padding: 0, paddingRight: 5 }}>
                  <Col xs={6} style={{ margin: 0, padding: 0 }}>
                    <Row style={{ margin: 0, padding: 0 }}>
                      <Col
                        xs={7}
                        style={{
                          margin: 0,
                          padding: 0,
                          textAlign: "left",
                          color: "green",
                          fontWeight: 600,
                        }}
                      >
                        No.
                        {TBACheck(
                          equalselec(
                            selectionfirst,
                            selectionsecond,
                            selectionthird,
                            selectionfourth,
                            horsenb1,
                            horsenb2,
                            horsenb3,
                            horsenb4
                          ),
                          horsenb1,
                          zone.result
                        )}
                      </Col>
                      <Col xs={5}>
                        {props.showCTCL && (
                          <div
                            style={{
                              textAlign: "center",
                              background: trackColor(zone.track_condition),
                              fontWeight: 600,
                              fontSize: 12,
                              color: "white",
                              borderRadius: 5,
                              minWidth: 25,
                            }}
                          >
                            {finalTrackCondition}
                          </div>
                        )}
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={6} style={{ margin: 0, padding: 0 }}>
                    <Row style={{ margin: 0, padding: 0 }}>
                      <Col xs={4} style={{ textAlign: "left" }}>
                        {/* {nrBadgeRender(zone.is_na)} */}
                      </Col>
                      <Col
                        xs={4}
                        style={{
                          textAlign: "left",
                          color: "#0f72b5",
                          fontSize: 12,
                        }}
                      >
                        {Math.round(selectionfirst) + "%"}
                      </Col>
                      <Col xs={4} style={{ textAlign: "left" }}>
                        {
                          <small className="text_blue">
                            <span style={{ textAlign: "left" }}>
                              {TBACheck(
                                equalrender(selectionfirst, selectionsecond),
                                "+" +
                                  Math.round(selectionfirst - selectionsecond) +
                                  "%",
                                zone.result
                              )}
                            </span>
                          </small>
                        }
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <hr
                  style={{
                    backgroundColor: "gray",
                    opacity: 0.4,
                    marginTop: "2px",
                  }}
                />
              </Link>

              <Row style={{ margin: 0, padding: 0, paddingRight: 5 }}>
                <Col xs={6} style={{ margin: 0, padding: 0 }}>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={BbUrl}
                  >
                    <Row style={{ margin: 0, padding: 0 }}>
                      <Col xs={4} style={{ margin: 0, padding: 0 }}>
                        <div
                          style={{
                            backgroundColor: "#e12b80",
                            color: "white",
                            fontWeight: 400,
                            borderRadius: "5px",
                            padding: "2px 4px",
                            fontSize: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "8px",
                            height: "20px",
                          }}
                        >
                          BB
                        </div>
                      </Col>
                      <Col
                        xs={4}
                        style={{ margin: 0, padding: 0, textAlign: "center" }}
                      >
                        <small>
                          <span className="SportsBetting">${SBW}</span>
                        </small>
                      </Col>
                      <Col
                        xs={4}
                        style={{ margin: 0, padding: 0, textAlign: "center" }}
                      >
                        <small>
                          <span className="SportsBetting">${SBP}</span>
                        </small>
                      </Col>
                    </Row>
                  </a>
                </Col>
                <Col xs={6} style={{ margin: 0, padding: 0 }}>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://b1.trickyrock.com/redirect.aspx?pid=31144281&bid=21418"
                  >
                    <Row style={{ margin: 0, padding: 0 }}>
                      <Col xs={4}>
                        <div>
                          <img
                            style={{
                              objectFit: "contain",
                              height: "20px",
                              borderRadius: "5px",
                            }}
                            src={
                              "https://dnu5embx6omws.cloudfront.net/Logos/unibet/30x30@2x.png"
                            }
                            alt=""
                          />
                        </div>
                      </Col>
                      <Col
                        xs={4}
                        className="Unibet"
                        style={{ margin: 0, padding: 0, textAlign: "center" }}
                      >
                        <small>
                          <span className="Unibet">${UBW}</span>
                        </small>
                      </Col>
                      <Col
                        xs={4}
                        className="Unibet"
                        style={{ margin: 0, padding: 0, textAlign: "center" }}
                      >
                        <small>
                          <span className="Unibet">${UBP}</span>
                        </small>
                      </Col>
                    </Row>
                  </a>
                </Col>
              </Row>
            </Col>
          </div>
        );
      }
    });

    return last;
  };

  return (
    <>
      {!props.loadingLast10 ? (
        last()
      ) : window.innerWidth < 1200 ? (
        <div
          style={{
            width: "100%",
            minHeight: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress style={{ color: "green" }} size={34} />
        </div>
      ) : (
        <SkeletonText dark={props.dark} />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  last10Tips: state.selectionReducer.dataLast,
  loadingLast10: state.selectionReducer.loadingLast,
  showLastNR: state.selectionReducer.showLastNR,
  showCTCL: state.selectionReducer.showCTCL,
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getLastTen: (data) => dispatch(actions.getLastTen(data)),
  getLastTenNoReload: (data) => dispatch(actions.getLastTenNoReload(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Last10New);
