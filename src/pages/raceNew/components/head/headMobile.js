import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment-timezone";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortDown,
  faClock,
  faPlusCircle,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  Row,
  Col,
  Badge,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import Timer from "../../../../components/Timer";

import Tabs from "./common/tabs";
import Collapse from "@material-ui/core/Collapse";
import NumberFormat from "react-number-format";

import Paper from "@material-ui/core/Paper";
import StarRatings from "react-star-ratings";

//REDUX
import raceActions from "../../../../redux/actions/race";

// UTILS
import {
  ConvertUTCTimeToLocalTime,
  transferRouteRacesDispatch,
} from "../../../../config/utils";
import { trackColor, conditions } from "../../../../config/racesUtils";

export const HeaderMobile = (props) => {
  const params = useParams();
  const [dropdown, setdropdown] = useState(false);
  const [details, setdetails] = useState(false);
  const [details2, setdetails2] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 750) {
      scrollToPoint();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToPoint = () => {
    if (props.trackInfo[0]?.race_num >= 5) {
      document.getElementById("scrollViewTabs").scrollLeft +=
        50 * (props.trackInfo[0]?.race_num - 1);
    }
  };

  const renderTimer = (trackInfo) => {
    var date = moment().tz("Australia/Sydney").format("YYYYMMDD");
    var raceDate = moment(trackInfo[0]?.meetdate).format("YYYYMMDD");
    if (trackInfo[0]?.race_status === "Closed") {
      return (
        <span>
          <strong>Closed</strong> at{" "}
          {ConvertUTCTimeToLocalTime(trackInfo[0]?.race_closed_time)}
        </span>
      );
    } else {
      if (date !== raceDate || trackInfo[0]?.track_condition === "ABND") {
        return null;
      } else {
        var RaceHour =
          Number(trackInfo[0]?.race_time?.split(":")[0]) * 60 * 60 * 1000;
        var RaceMin =
          Number(trackInfo[0]?.race_time?.split(":")[1]) * 60 * 1000;
        var RTime = RaceHour + RaceMin;
        return (
          <Timer
            raceTimer={RTime}
            raceTime={trackInfo[0]?.race_time}
            status={trackInfo[0]?.meetdate}
          />
        );
      }
    }
  };

  const getStarters = () => {
    let starters = 0;
    // let map = props?.horses?.map((zone) => {
    //   if (
    //     zone.horse_status !== "Scratched" &&
    //     zone.horse_status !== "LateScratching"
    //   ) {
    //     starters++;
    //   }
    // });
    if (starters > 0) {
      return starters + "/" + props?.horses?.length;
    } else {
      return null;
    }
  };

  const getData = (e) => {
    if (e === true) {
      props.getRaceStats(props.trackInfo[0]?.meetdate);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: 8,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
      }}
    >
      <Row>
        <Col xs={6} style={{ marginBottom: 10 }}>
          <div style={{ padding: 0, paddingLeft: 16, paddingTop: 10 }}>
            <div style={{ textAlign: "left" }}>
              <Dropdown isOpen={dropdown} toggle={() => setdropdown(!dropdown)}>
                <DropdownToggle>
                  <h5
                    style={{
                      fontSize: 32,
                      marginTop: 4,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 18,
                        textTransform: "uppercase",
                        marginTop: 8,
                      }}
                    >
                      <strong>
                        {props.trackInfo[0]?.track_name} R
                        {props.trackInfo[0]?.race_num}
                      </strong>
                      <FontAwesomeIcon
                        icon={faSortDown}
                        size="1x"
                        style={{
                          marginLeft: 4,
                          color: "grey",
                          width: 16,
                          height: 16,
                        }}
                      />
                    </div>
                  </h5>
                </DropdownToggle>
                <DropdownMenu style={{ width: 250, zIndex: 1, margin: 40 }}>
                  <div
                    style={{
                      backgroundColor: "white",
                      minHeight: "20%",
                      padding: 8,
                    }}
                  >
                    <Row>
                      {props.dateVenues.map((element, i) => {
                        return (
                          <Col
                            key={"ta-" + i}
                            onClick={() =>
                              props.venueNavigation(
                                element.trackcode,
                                transferRouteRacesDispatch(params.date)
                              )
                            }
                            xs={12}
                            style={{ marginTop: 16 }}
                          >
                            <Paper elevation={0}>
                              <div
                                style={{
                                  backgroundColor: "#eef0f4",
                                  padding: 8,
                                  borderRadius: 4,
                                  cursor: "pointer",
                                }}
                              >
                                <strong>{element?.venue}</strong> (
                                {element?.state})
                              </div>
                            </Paper>
                          </Col>
                        );
                      })}
                    </Row>
                  </div>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </Col>

        <Col xs={6} style={{ marginBottom: 10 }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              flexDirection: "row",
              textAlign: "right",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              {!props.trackInfo[0]?.result ? (
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {renderTimer(props.trackInfo)}
                    {!props.trackInfo[0]?.result && (
                      <FontAwesomeIcon
                        icon={faClock}
                        size="1x"
                        style={{ marginLeft: 4 }}
                      />
                    )}
                  </div>
                  {!props.trackInfo[0]?.result && (
                    <div>
                      <p>
                        {ConvertUTCTimeToLocalTime(
                          moment(props.trackInfo[0]?.race_time, "HH:mm").format(
                            "HH:mm"
                          )
                        )}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {renderTimer(props.trackInfo)}
                  </div>
                </div>
              )}

              <div>
                {moment(props.trackInfo[0]?.meetdate).format("DD-MM-YYYY")}
              </div>
            </div>
            {/* {props.isLoggedIn && !props.trackInfo[0]?.result && (
              <div style={{ padding: 0 }}>
                <div style={{ marginTop: -40, marginLeft: 8 }}>
                  <Bells />
                </div>
              </div>
            )} */}
          </div>
        </Col>

        <Col
          xs={12}
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            marginTop: -16,
            marginBottom: 8,
          }}
        >
          <div
            id="scrollViewTabs"
            style={{
              height: "auto",
              maxWidth: "100%",
              display: "flex",
              flexDirection: "row",
              overflowX: "auto",
              overflowY: "hidden",
              marginTop: 10,
            }}
          >
            <Tabs />
          </div>
        </Col>

        {/* <Row style={{ paddingLeft: 8, marginTop:12,marginLeft: 2 }}>
                  <Col xs={11} style={{ marginTop: -8 }}>
                    <p style={{ margin: 0 }}>
                      <strong>{props.trackInfo[0]?.track_description} Was a {" "}
                      {props.trackInfo[0]?.track_distance?.split(" ")[0]}{" "} Race of {" "}
                      {props.trackInfo[0]?.track_distance?.split(" ")[1]}{" "}
                      {props.trackInfo[0]?.track_distance?.split(" ")[2]}{" "}, With a Rail Position of {" "}
                      {props.trackInfo[0]?.rail_position}.{" "}The Prize of the Race is for {" "}
                      <NumberFormat
                        value={props.trackInfo[0]?.ind_raceprize}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                     </strong>
                     </p>
                     </Col>
                     </Row> */}

        <Col
          xs={12}
          onClick={() => setdetails(!details)}
          style={{ cursor: "pointer" }}
        >
          <Col
            style={{
              backgroundColor: "#eef0f4",
              borderTopLeftRadius: 4,
            }}
          >
            <Row>
              <Col
                xs={9}
                style={{
                  display: "flex",
                  aligmItems: "center",
                  justifyContent: "flex-start",
                  paddingTop: 6,
                }}
              >
                <div>
                  <Badge
                    style={{
                      textAlign: "left",
                      backgroundColor: trackColor(
                        props.trackInfo[0]?.track_condition
                      ),
                    }}
                  >
                    <strong style={{ color: "white" }}>
                      {conditions(
                        props.trackInfo[0]?.track_condition,
                        props.trackInfo[0]?.full_track_condition
                      )}
                    </strong>
                  </Badge>
                </div>

                <div style={{ display: "flex" }}>
                  <strong style={{ marginLeft: 8 }}>
                    {props.trackInfo[0]?.track_distance?.split(" ")[0]}
                  </strong>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      textTransform: "uppercase",
                      marginLeft: 8,
                    }}
                  >
                    {" "}
                    <strong>
                      {props.trackInfo[0]?.track_distance?.split(" ")[1]}{" "}
                      {props.trackInfo[0]?.track_distance?.split(" ")[2]}
                    </strong>
                  </span>
                </div>
              </Col>

              <Col
                style={{
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    backgroundColor: "grey",
                    width: 20,
                    height: 20,
                    borderRadius: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ color: "white", fontSize: 16 }}>
                    {details ? (
                      <FontAwesomeIcon
                        style={{ cursor: "pointer" }}
                        icon={faMinusCircle}
                        size="1x"
                      />
                    ) : (
                      <FontAwesomeIcon
                        style={{ cursor: "pointer" }}
                        icon={faPlusCircle}
                        size="1x"
                      />
                    )}
                  </span>
                </div>
              </Col>
            </Row>

            <Collapse in={details}>
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#eef0f4",
                  padding: 8,
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                }}
              >
                <div style={{ marginTop: -4, opacity: "70%" }}>
                  <hr />
                </div>

                <Row>
                  <Col
                    style={{
                      marginTop: -8,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <p style={{ margin: 0 }}>
                      <strong>{props.trackInfo[0]?.track_description}</strong>
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Distance:</strong>{" "}
                      {props.trackInfo[0]?.track_distance?.split(" ")[0]}
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Class:</strong>{" "}
                      {props.trackInfo[0]?.track_distance?.split(" ")[1]}{" "}
                      {props.trackInfo[0]?.track_distance?.split(" ")[2]}
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Rail Position:</strong>{" "}
                      {props.trackInfo[0]?.rail_position}
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Day - Date:</strong>{" "}
                      {moment(props.trackInfo[0]?.meetdate)
                        .tz("Australia/Sydney")
                        .format("dddd") +
                        " - " +
                        moment(props.trackInfo[0]?.meetdate)
                          .tz("Australia/Sydney")
                          .format("DD/MM/YYYY")}
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Scheduled Start Time:</strong>{" "}
                      {ConvertUTCTimeToLocalTime(
                        moment(props.trackInfo[0]?.race_time, "HH:mm").format(
                          "HH:mm:ss"
                        )
                      )}
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Closed at:</strong>{" "}
                      {props.trackInfo[0]?.race_closed_time
                        ? ConvertUTCTimeToLocalTime(
                            moment(
                              props.trackInfo[0]?.race_closed_time,
                              "HH:mm"
                            ).format("HH:mm:ss")
                          )
                        : "TBA"}
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Prize:</strong>{" "}
                      <NumberFormat
                        value={props.trackInfo[0]?.ind_raceprize}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </p>
                    {props.trackInfo[0]?.ub_market_open_time && (
                      <p style={{ margin: 0 }}>
                        <strong>UB Market Open At: </strong>
                        {moment(props.trackInfo[0]?.ub_market_open_time).format(
                          "DD-MM-YYYY HH:mm:ss"
                        )}
                      </p>
                    )}
                    {props.trackInfo[0]?.sb_market_open_time && (
                      <p style={{ margin: 0 }}>
                        <strong>BB Market Open At: </strong>
                        {moment(props.trackInfo[0]?.sb_market_open_time).format(
                          "DD-MM-YYYY HH:mm:ss"
                        )}
                      </p>
                    )}
                    {getStarters() !== null ? (
                      <p style={{ margin: 0 }}>
                        <strong>Starters:</strong> {getStarters()}
                      </p>
                    ) : null}
                  </Col>
                </Row>

                <div style={{ marginTop: -4, opacity: "50%" }}>
                  <hr />
                </div>
                {/* <Link to={'/profile/venue/' + props.trackInfo[0]?.trackcode}>
                                        <Button color="primary" size='sm' style={{ marginTop: 16, width: '70%', marginBottom: 8 }}><strong>Venue Profile</strong></Button>
                                    </Link> */}
              </div>
            </Collapse>
          </Col>
        </Col>

        <Col
          xs={12}
          onClick={() => {
            setdetails2(!details2);
            getData(!details2);
          }}
          style={{ cursor: "pointer", marginTop: 4 }}
        >
          <Col style={{ backgroundColor: "#eef0f4", borderRadius: 4 }}>
            <Row>
              <Col
                xs={10}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <span style={{ fontSize: 12, textTransform: "uppercase" }}>
                  <strong>PTP Performance</strong>
                  <br />
                  Today:{" "}
                  <strong>
                    {props.allRacesDayResults?.current_date_results?.runs}{" "}
                  </strong>
                  RUNS,
                  <strong>
                    {" "}
                    {props.allRacesDayResults?.current_date_results?.won}{" "}
                  </strong>
                  WIN (
                  {props.allRacesDayResults?.current_date_results?.won
                    ? (
                        (props.allRacesDayResults?.current_date_results?.won /
                          props.allRacesDayResults?.current_date_results
                            ?.runs) *
                        100
                      ).toFixed(2)
                    : 0}
                  %)
                  <strong>
                    ${props.allRacesDayResults?.current_date_results?.winOdd}{" "}
                  </strong>
                  ,
                  <strong>
                    {" "}
                    {props.allRacesDayResults?.current_date_results?.place}{" "}
                  </strong>
                  PLC (
                  {props.allRacesDayResults?.current_date_results?.place
                    ? (
                        (props.allRacesDayResults?.current_date_results?.place /
                          props.allRacesDayResults?.current_date_results
                            ?.runs) *
                        100
                      ).toFixed(2)
                    : 0}
                  %)
                  <strong>
                    ${props.allRacesDayResults?.current_date_results?.plcOdd}{" "}
                  </strong>
                </span>
              </Col>

              <Col
                style={{
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                {/* <div
                  style={{
                    backgroundColor: "grey",
                    width: 20,
                    height: 20,
                    borderRadius: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ color: "white", fontSize: 16 }}>
                    {details2 ? (
                      <FontAwesomeIcon
                        style={{ cursor: "pointer" }}
                        icon={faMinusCircle}
                        size="1x"
                      />
                    ) : (
                      <FontAwesomeIcon
                        style={{ cursor: "pointer" }}
                        icon={faPlusCircle}
                        size="1x"
                      />
                    )}
                  </span>
                </div> */}
              </Col>
            </Row>

            <Collapse in={details2} style={{ padding: 0 }}>
              {/* not used  */}
              {/* <Col>
                                        <Link to={'/profile/venue/' + props.trackInfo[0]?.trackcode}>
                                            <h3 style={{ fontWeight: 'bold', marginTop: 8 }}>
                                                {props.trackInfo[0]?.track_name}
                                            </h3>
                                        </Link>
                                    </Col> */}
              {/* used */}
              {/* {props.racestatLoading === true ? (
                <div>
                  <Skeleton height={30} />
                  <Skeleton animation="pulse" height={13} />
                  <Skeleton animation="wave" height={20} />
                </div>
              ) : (
                <div style={{ width: "100%", marginTop: 8, padding: 0 }}> */}
              {/* not used  */}
              {/* <ResultBanner name={props.trackInfo[0]?.track_name} raceStats={props.raceStats} /> */}
              {/* used */}
              {/* <Table size="sm" responsive>
                    <thead
                      style={{
                        backgroundColor: "rgb(20, 40, 65)",
                        color: "white",
                      }}
                    >
                      <tr>
                        <th style={{ paddingLeft: 5 }}>Venue</th>
                        <th style={{ textAlign: "center" }}>RUNS</th>
                        <th style={{ textAlign: "center" }}>WINna</th>
                        <th style={{ textAlign: "center" }}>WIN%</th>
                        <th style={{ textAlign: "center" }}>WIN$</th>
                        <th style={{ textAlign: "center" }}>PLC</th>
                        <th style={{ textAlign: "center" }}>PLC%</th>
                        <th style={{ textAlign: "center" }}>PLC$</th>
                        <th style={{ textAlign: "center" }}>HIST</th>
                        <th style={{ textAlign: "center" }}>H%</th>
                      </tr>
                    </thead>
                    <tbody style={{ backgroundColor: "white" }}>
                      {props.raceStats?.venues?.map((element, i) => {
                        return (
                          <tr
                            key={"th-" + i}
                            style={{
                              backgroundColor:
                                element?.tname ===
                                  props.trackInfo[0]?.track_name
                                  ? "rgba(247, 240, 175, 0.6)"
                                  : null,
                            }}
                          >
                            <td>{element?.tname}</td>
                            <td style={{ textAlign: "center" }}>
                              {Number(element?.venuesPerformance?.runs)}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {Number(element?.venuesPerformance?.win)}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {Math.round(
                                (
                                  Number(element?.venuesPerformance?.win) /
                                  Number(element?.venuesPerformance?.runs)
                                ).toFixed(2) * 100
                              )
                                ? Math.round(
                                  (
                                    Number(element?.venuesPerformance?.win) /
                                    Number(element?.venuesPerformance?.runs)
                                  ).toFixed(2) * 100
                                ) + "%"
                                : "-"}
                            </td>
                            <td style={{ textAlign: "center" }}>


                              {Number(element?.venuesPerformance?.avg_win_odds)
                                ? "$" + Number(
                                  element?.venuesPerformance?.avg_win_odds
                                ).toFixed(2)
                                : "-"}



                            </td>
                            <td style={{ textAlign: "center" }}>
                              {Number(element?.venuesPerformance?.place)}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {Math.round(
                                (
                                  Number(element?.venuesPerformance?.place) /
                                  Number(element?.venuesPerformance?.runs)
                                ).toFixed(2) * 100
                              )
                                ? Math.round(
                                  (
                                    Number(
                                      element?.venuesPerformance?.place
                                    ) /
                                    Number(element?.venuesPerformance?.runs)
                                  ).toFixed(2) * 100
                                ) + "%"
                                : "-"}
                            </td>
                            <td style={{ textAlign: "center" }}>

                              {
                                (Number(
                                  element?.venuesPerformance?.avg_place_odds
                                ))
                                  ? "$" +
                                  (Number(
                                    element?.venuesPerformance?.avg_place_odds
                                  )).toFixed(2)
                                  :
                                  "-"
                              }
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {Number(element?.venue_history?.won)}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {element?.venue_history?.won
                                ? (
                                  Number(element?.venue_history?.won) /
                                  Number(element?.venue_history?.runs)
                                ).toFixed(2) * 100
                                : 0}
                              %
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table> */}
              {/* not used */}
              {/* <Link to={'/profile/venue/' + props.trackInfo[0]?.trackcode}>
                                                <Button color="primary" size='sm' style={{ marginTop: 8, marginBottom: 8, marginLeft: 0 }}><strong>Venue Profile</strong></Button>
                                            </Link> */}
              {/* used */}
              {/* </div>
              )} */}
            </Collapse>
          </Col>
        </Col>
        <Col style={{ textAlign: "center", marginTop: 5 }}>
          <StarRatings
            rating={
              props.trackInfo[0]?.rating !== null
                ? props.trackInfo[0]?.rating
                : 0
            }
            starRatedColor={"#44BD32"}
            starDimension="30px"
            starSpacing="5px"
            numberOfStars={5}
            //starEmptyColor={'#E8E8E8'}
            //changeRating={(rate) => changeShippingRating(rate)}
            //starHoverColor={'#44BD32'}
          />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.raceReducer.loading,
  trackInfo: state.raceReducer.trackInfoOpt,
  dateVenues: state.raceReducer.dateVenues,
  horses: state.raceReducer.horsesOpt,
  isLoggedIn: state.auth.isLoggedIn,
  allRacesDayResults: state.raceReducer.allRacesDayResults,
  raceStats: state.resultsReducer.raceStats,
  racestatLoading: state.resultsReducer.racestatLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getRaceNextOrLastOpt: (data, history, date, trackCode) =>
    dispatch(raceActions.getRaceNextOrLastOpt(data, history, date, trackCode)),
  getRaceStats: (date) => dispatch(raceActions.getRacesResults(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMobile);
