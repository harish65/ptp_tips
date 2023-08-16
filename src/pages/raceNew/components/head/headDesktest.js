import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";

import {
  Row,
  Col,
  Badge,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Table,
} from "reactstrap";
import Collapse from "@material-ui/core/Collapse";
import Tabs from "./common/tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Paper from "@material-ui/core/Paper";
import {
  faSortDown,
  faClock,
  faPlusCircle,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import Left from "react-ionicons/lib/MdArrowDropleft";
import Right from "react-ionicons/lib/MdArrowDropright";
import moment from "moment-timezone";
import NumberFormat from "react-number-format";
// import DatePicker from "react-datepicker";
import Tooltip from "@material-ui/core/Tooltip";
import StarRatings from "react-star-ratings";
import Timer from "../../../../components/Timer";
import Bells from "./common/bells";
import Infos from "./common/info";
import Skeleton from "@material-ui/lab/Skeleton";

// UTILS
import {
  transferRouteRacesDispatch,
  transferRouteRacesDD,
  ConvertUTCTimeToLocalTime,
} from "../../../../config/utils";
import { trackColor, conditions } from "../../../../config/racesUtils";

//REDUX
import raceActions from "../../../../redux/actions/race";

// import 'react-datepicker/dist/react-datepicker.css';
// import 'antd/dist/antd.css';

export const HeaderDesktop = (props) => {
  const params = useParams();
  const [dropdown, setdropdown] = useState(false);
  const [details, setdetails] = useState(false);
  const [details2, setdetails2] = useState(false);

  const getStarters = () => {
    let starters = 0;
    let map = props?.horses?.map((zone) => {
      if (
        zone.horse_status !== "Scratched" &&
        zone.horse_status !== "LateScratching"
      ) {
        starters++;
      }
    });
    if (starters > 0) {
      return starters + "/" + props?.horses?.length;
    } else {
      return null;
    }
  };

  // const updateDate = (date) => {
  //     props.history.push('/horse-racing-tips/' + moment(date).format("DD-MM-YYYY"))
  // }

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

  const handleChangeArrow = async (condition) => {
    // changeTab(0)
    // console.log(condition, params.raceNumber)
    if (params.raceNumber === "R1" && condition === "prev") {
      return;
    } else {
      props.getRaceNextOrLastOpt(
        { raceId: parseInt(params.id), condition: condition, raceNum: "null" },
        props.history,
        props.trackInfo[0]?.meetdate,
        props.trackInfo[0]?.trackcode
      );
    }
  };

  const getData = (e) => {
    if (e === true) {
      props.getRaceStats(props.trackInfo[0]?.meetdate);
      // console.log(props.trackInfo)
      // console.log(props.getRaceStats(props.trackInfo[0]?.meetdate))
    }
  };
  return (
   
    !props.loading && (
      <div
        style={{
          backgroundColor: "white",
          padding: 13,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          marginTop: 16,
          paddingBottom: 0,
        }}
      >
        <Row>
          {/* DROP DOWN VENUES*/}
          <div style={{ padding: 0, paddingLeft: 16 }}>
            <div style={{ textAlign: "left" }}>
              <Dropdown isOpen={dropdown} toggle={() => setdropdown(!dropdown)}>
                <DropdownToggle>
                  <div>
                    <h5
                      style={{
                        textAlign: "left",
                        fontSize: 32,
                        marginTop: 4,
                        cursor: "pointer",
                      }}
                    >
                      <strong>{props.trackInfo[0]?.track_name}</strong>
                      <span style={{ fontSize: 16, color: "grey" }}>
                        <FontAwesomeIcon
                          icon={faSortDown}
                          size="1x"
                          style={{ marginLeft: 4 }}
                        />{" "}
                      </span>
                    </h5>
                    <div
                      style={{
                        backgroundColor: "grey",
                        height: 2,
                        marginTop: -10,
                        opacity: "50%",
                      }}
                    ></div>
                  </div>
                </DropdownToggle>
                <DropdownMenu>
                  <div
                    style={{
                      backgroundColor: "white",
                      width: 800,
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
                            lg={3}
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

              {/* <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Badge style={{ textAlign: 'left', backgroundColor: trackColor() }}><strong style={{ color: 'white' }}>{conditions()}</strong></Badge>
                                    <div style={{ marginLeft: 8 }}>{props.trackInfo[0]?.track_weather}</div>
                                    <div style={{ marginLeft: 8 }}>{props.trackInfo[0]?.rail_position}</div>
                                </div> */}
            </div>
          </div>

          {/* TABS FIRST ROW*/}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              marginLeft: 16,
              padding: 0,
              paddingLeft: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                marginTop: 0,
                alignItems: "flex-start",
                justifyContent: "flex-start",
                padding: 0,
                marginRight: -16,
              }}
            >
              <Left
                style={{ marginTop: 16, marginRight: 10, cursor: "pointer" }}
                fontSize="24"
                color={"grey"}
                onClick={() => handleChangeArrow("prev")}
              />
              <Tabs />
              <Right
                style={{ marginTop: 16, marginLeft: 10, cursor: "pointer" }}
                fontSize="24"
                color={"grey"}
                onClick={() => handleChangeArrow("next")}
              />
            </div>
          </div>
        </Row>
        {/* <Row style={{ paddingLeft: 8, marginTop:12 }}>
                  <Col xs={8} style={{ marginTop: -8 }}>
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

        <Row style={{ padding: 10 }}>
          <Col
            xs={8}
            onClick={() => setdetails(!details)}
            style={{
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#eef0f4",
              padding: 4,
              borderRadius: 4,
            }}
          >
            <Row style={{ width: "100%", padding: 0, margin: 0 }}>
              <Col xs={11} style={{ display: "flex", paddingLeft: 2 }}>
                <strong>
                  <Badge
                    style={{
                      textAlign: "left",
                      backgroundColor: trackColor(
                        props.trackInfo[0]?.track_condition
                      ),
                      marginRight: 4,
                    }}
                  >
                    <strong style={{ color: "white" }}>
                      {conditions(
                        props.trackInfo[0]?.track_condition,
                        props.trackInfo[0]?.full_track_condition
                      )}
                    </strong>
                  </Badge>
                  {props.trackInfo[0]?.track_weather} - R
                  {props.trackInfo[0]?.race_num} -{" "}
                  {props.trackInfo[0]?.track_distance?.split(" ")[1]}
                  {props.trackInfo[0]?.track_distance?.split(" ")[2]} -{" "}
                  {props.trackInfo[0]?.track_description}-{" "}
                  {props.trackInfo[0]?.track_distance?.split(" ")[0]}
                </strong>
              </Col>
              <Col style={{ display: "flex", justifyContent: "flex-end" }}>
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
            <Collapse in={details} timeout="auto">
              <div style={{ padding: 0, backgroundColor: "#eef0f4" }}>
                <div style={{ marginTop: -4, opacity: "70%" }}>
                  <hr />
                </div>

                <Row style={{ paddingLeft: 8 }}>
                  <Col xs={6} style={{ marginTop: -8 }}>
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
                  </Col>

                  <Col xs={6} style={{ marginTop: -8 }}>
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
                    {getStarters() !== null ? (
                      <p style={{ margin: 0 }}>
                        <strong>Starters:</strong> {getStarters()}
                      </p>
                    ) : null}
                  </Col>
                </Row>
              </div>
            </Collapse>


            {/* </Row> */}
          </Col>

          <Col xs={4}>
            <Row style={{ alignItems: "center", justifyContent: "flex-end" }}>
              <Col xs={4} style={{ padding: 4, textAlign: "center" }}>
                <strong> {transferRouteRacesDD(params.date)} </strong>
              </Col>
              <Col style={{ padding: 4 }}>
                <div style={{ display: "flex" }}>
                  <strong style={{ marginRight: 8 }}>
                    {renderTimer(props.trackInfo)}
                  </strong>
                  <span>
                    <FontAwesomeIcon
                      icon={faClock}
                      size="1x"
                      style={{ marginRight: 4 }}
                    />
                    {ConvertUTCTimeToLocalTime(
                      moment(props.trackInfo[0]?.race_time, "HH:mm").format(
                        "HH:mm"
                      )
                    )}
                  </span>
                </div>
              </Col>
              {!props.trackInfo[0]?.result && (
                <Col xs={2}>
                  <Bells />
                </Col>
              )}
            </Row>
          </Col>
        </Row>

        <Row style={{ padding: 10 }}>
          <Col
            xs={8}
            onClick={() => {
              setdetails2(!details2);
              getData(!details2);
            }}
            style={{
              backgroundColor: "#eef0f4",
              padding: 4,
              marginTop: -4,
              borderRadius: 4,
              cursor: "pointer",
              marginBottom: 10,
            }}
          >
            <Row style={{ width: "100%", padding: 0, margin: 0 }}>
              <Col xs={11} style={{ paddingLeft: 2 }}>
                <span style={{ fontSize: 12, textTransform: "uppercase" }}>
                  <strong>PTP Performance</strong>- Today:{" "}
                  <strong>
                    {props.allRacesDayResults?.current_date_results?.runs}{" "}
                  </strong>
                  RUNS,{" "}
                  <strong>
                    {props.allRacesDayResults?.current_date_results?.won}{" "}
                  </strong>
                  WIN (
                  {props.allRacesDayResults?.current_date_results?.won
                    ? (
                        (props.allRacesDayResults?.current_date_results?.won /
                          props.allRacesDayResults?.current_date_results
                            ?.runs) *
                        100
                      )?.toFixed(2)
                    : 0}
                  %)
                  <strong>
                    {" "}
                    ${props.allRacesDayResults?.current_date_results?.winOdd}
                  </strong>{" "}
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
                      )?.toFixed(2)
                    : 0}
                  %)
                  <strong>
                    {" "}
                    ${props.allRacesDayResults?.current_date_results?.plcOdd}
                  </strong>
                </span>
              </Col>
              <Col
                xs={1}
                style={{
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
                </div>
              </Col>
            </Row>
            <Collapse in={details2} style={{ padding: 0 }}>
              {/* <Col>
                                    <Link to={'/profile/venue/' + props.trackInfo[0]?.trackcode}>
                                        <h3 style={{ fontWeight: 'bold', marginTop: 8 }}>
                                            {props.trackInfo[0]?.track_name}
                                        </h3>
                                    </Link>
                                </Col> */}
              {props.racestatLoading === true ? (
                <div>
                  <Skeleton height={30} />
                  <Skeleton animation="pulse" height={13} />
                  <Skeleton animation="wave" height={20} />
                </div>
              ) : (
                <div style={{ width: "100%", marginTop: 8 }}>
                  {/* <ResultBanner name={props.trackInfo[0]?.track_name} raceStats={props.raceStats} /> */}

                  <Col>
                    <Table style={{ marginTop: 16 }} size="sm" responsive>
                      <thead
                        style={{
                          backgroundColor: "rgb(20, 40, 65)",
                          color: "white",
                        }}
                      >
                        <tr>
                          <th style={{ padding: 0, width: 48 }}>Venue</th>
                          <th
                            style={{
                              textAlign: "center",
                              padding: 0,
                              width: 48,
                            }}
                          >
                            RUNS
                          </th>
                          <th
                            style={{
                              textAlign: "center",
                              padding: 0,
                              width: 48,
                            }}
                          >
                            WIN
                          </th>
                          <th
                            style={{
                              textAlign: "center",
                              padding: 0,
                              width: 48,
                            }}
                          >
                            WIN %
                          </th>
                          <th
                            style={{
                              textAlign: "center",
                              padding: 0,
                              width: 48,
                            }}
                          >
                            WIN $
                          </th>
                          <th
                            style={{
                              textAlign: "center",
                              padding: 0,
                              width: 48,
                            }}
                          >
                            PLC
                          </th>
                          <th
                            style={{
                              textAlign: "center",
                              padding: 0,
                              width: 48,
                            }}
                          >
                            PLC %
                          </th>
                          <th
                            style={{
                              textAlign: "center",
                              padding: 0,
                              width: 48,
                            }}
                          >
                            PLC $
                          </th>
                          <th
                            style={{
                              textAlign: "center",
                              padding: 0,
                              width: 48,
                            }}
                          >
                            HIST
                          </th>
                          <th
                            style={{
                              textAlign: "center",
                              padding: 0,
                              width: 48,
                            }}
                          >
                            HIST %
                          </th>
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
                                        Number(
                                          element?.venuesPerformance?.win
                                        ) /
                                        Number(element?.venuesPerformance?.runs)
                                      ).toFixed(2) * 100
                                    ) + "%"
                                  : "0%"}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {Number(
                                  element?.venuesPerformance?.avg_win_odds
                                )
                                  ? "$" +
                                    Number(
                                      element?.venuesPerformance?.avg_win_odds
                                    )?.toFixed(2)
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
                                {Number(
                                  element?.venuesPerformance?.avg_place_odds
                                )
                                  ? "$" +
                                    Number(
                                      element?.venuesPerformance?.avg_place_odds
                                    )?.toFixed(2)
                                  : "-"}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {Number(element?.venue_history?.won)}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {element?.venue_history?.won
                                  ? (
                                      Number(element?.venue_history?.won) /
                                      Number(element?.venue_history?.runs)
                                    )?.toFixed(2) * 100
                                  : 0}
                                %
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                    {/* <Link to={'/profile/venue/' + props.trackInfo[0]?.trackcode}>
                                            <Button color="primary" size='sm' style={{ marginTop: 8, marginBottom: 8, marginLeft: 0 }}><strong>Venue Profile</strong></Button>
                                        </Link> */}
                  </Col>
                </div>
              )}
            </Collapse>
          </Col>

          <Col xs={4}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Tooltip
                style={{ padding: 0, textAlign: "center" }}
                title={
                  <div
                    style={{
                      backgroundColor: "transparent",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      padding: 4,
                      fontSize: "14px",
                    }}
                  >
                    {props.trackInfo[0]?.rating === 0.5
                      ? "More than 30% of the horses in the race have less than 1 previous start and No horses have won before."
                      : props.trackInfo[0]?.rating === 1
                      ? "Less than 30% of the horses in the race have less than 1 previous start and No horses have won before."
                      : props.trackInfo[0]?.rating === 1.5
                      ? "More than 20% of the horses in the race have less than 1 previous start and No horses have won before."
                      : props.trackInfo[0]?.rating === 2
                      ? "Less than 20% of the horses in the race have less than 1 previous start and No horses have won before."
                      : props.trackInfo[0]?.rating === 2.5
                      ? "All horses have a minimum 3 previous starts and no horse have won before."
                      : props.trackInfo[0]?.rating === 3
                      ? "All horses have a minimum 3 previous starts and  at least 1 horse have won before."
                      : props.trackInfo[0]?.rating === 3.5
                      ? "All horses have minimum 5 previous starts and all horses have won at least 1 race previously."
                      : props.trackInfo[0]?.rating === 4
                      ? "All horses have minimum 5 previous starts and all horses have won at least 3 race previously Or race prize money is between $250 000 and $500 000."
                      : props.trackInfo[0]?.rating === 4.5
                      ? "All horses have minimum 10 previous starts and all horses have won at least 3 race previously OR race prize money is between $500 000 and $1 000 000."
                      : props.trackInfo[0]?.rating === 5
                      ? "All horses have minimum 10 previous starts and all horses have won at least 5 race previously Or race prize money is over $1 000 000."
                      : "No Rating"}
                  </div>
                }
                placement="bottom"
              >
                <div style={{ marginTop: -8, textAlign: "center" }}>
                  <StarRatings
                    rating={
                      props.trackInfo[0]?.rating !== null
                        ? props.trackInfo[0]?.rating
                        : 0
                    }
                    starRatedColor={"#44BD32"}
                    starDimension={window.innerWidth < 1450 ? "25px" : "30px"}
                    starSpacing="5px"
                    numberOfStars={5}
                    //starEmptyColor={'#E8E8E8'}
                    //changeRating={(rate) => changeShippingRating(rate)}
                    //starHoverColor={'#44BD32'}
                  />
                </div>
              </Tooltip>

              <Infos />
            </div>
          </Col>
        </Row>
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  loading: state.raceReducer.loading,
  trackInfo: state.raceReducer.trackInfoOpt,
  dateVenues: state.raceReducer.dateVenues,
  horses: state.raceReducer.horsesOpt,
  isLoggedIn: state.auth.isLoggedIn,
  raceStats: state.resultsReducer.raceStats,
  racestatLoading: state.resultsReducer.racestatLoading,
  allRacesDayResults: state.raceReducer.allRacesDayResults,
});

const mapDispatchToProps = (dispatch) => ({
  getRaceNextOrLastOpt: (data, history, date, trackCode) =>
    dispatch(raceActions.getRaceNextOrLastOpt(data, history, date, trackCode)),
  getRaceStats: (date) => dispatch(raceActions.getRacesResults(date)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HeaderDesktop));
