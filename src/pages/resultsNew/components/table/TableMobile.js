import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import { Table, Row, Col } from "reactstrap";
import { styles } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import Lock from "../../../../components/Lock/Lock";
import { silkSize } from "../../../../config/racesUtils";
import {
  faMedal,
  faTrophy,
  faAward,
  faThumbsDown,
  faHorseHead,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import {
  badgeFirts,
  badgeSecond,
  badgeThird,
  badgePTP,
  badgeLost,
  badgeABND,
  badgeNA,
  badgeTBA,
  fullTrackCondition,
} from "../../../../config/racesUtils";

import resultAction from "../../../../redux/actions/results";

export const TableMobile = (props) => {
  const [isNaChecked, setIsNaChecked] = useState(false);

  const transferLinkDate = (date) => {
    var today = moment().tz("Australia/Sydney").format("YYYY-MM-DD");
    var tomorrow = moment()
      .tz("Australia/Sydney")
      .add(1, "day")
      .format("YYYY-MM-DD");
    var yesterday = moment()
      .tz("Australia/Sydney")
      .subtract(1, "day")
      .format("YYYY-MM-DD");

    if (date === today) {
      return "today";
    } else if (date === tomorrow) {
      return "tomorrow";
    } else if (date === yesterday) {
      return "yesterday";
    } else {
      return moment(date, "YYYY-MM-DD")
        .tz("Australia/Sydney")
        .format("DD-MM-YYYY");
    }
  };

  const resultBadge = (result, trackCondition, isNa) => {
    if (trackCondition === "ABND") {
      return badgeABND();
    } else if (isNa === 1 && !isNaChecked) {
      return badgeNA();
    } else if (result === "WON") {
      return badgeFirts();
    } else if (result === "2ND") {
      return badgeSecond();
    } else if (result === "3RD") {
      return badgeThird();
    } else if (result) {
      return badgeLost();
    } else {
      return badgeTBA();
    }
  };

  const filterPosition = (position, arr, zone) => {
    let filtered = arr.filter((area) => area.position === position);
    if (filtered.length > 1) {
      //DEAD HEAD CASE
      let sb_win = filtered[0]?.sb_win?.toFixed(1);
      let sb_plc = filtered[0]?.sb_place?.toFixed(1);
      let ub_win = filtered[0]?.ub_win?.toFixed(1);
      let ub_plc = filtered[0]?.ub_place?.toFixed(1);

      let sb_win2 = filtered[1]?.sb_win?.toFixed(1);
      let sb_plc2 = filtered[1]?.sb_place?.toFixed(1);
      let ub_win2 = filtered[1]?.ub_win?.toFixed(1);
      let ub_plc2 = filtered[1]?.ub_place?.toFixed(1);

      return (
        <Row style={{ margin: 0, padding: 0 }}>
          <Col xs={4} style={{ textAlign: "left", margin: 0, padding: 0 }}>
            {renderNum(filtered[0]?.tab_no, filtered[0]?.horse_silksUrl)}
          </Col>
          <Col xs={2} style={{ padding: 0, margin: 0 }}>
            {position === 1 ? (
              sb_win > ub_win ? (
                <div>
                  <div
                    style={{
                      backgroundColor: "#e12b80",
                      color: "white",
                      fontWeight: 500,
                      borderRadius: "5px",
                      padding: "2px 4px",
                      fontSize: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "2px",
                      height: "20px",
                    }}
                  >
                    BB
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 500 }}>
                    ${sb_win}
                  </span>
                </div>
              ) : (
                <div>
                  <div>
                    <img
                      style={{
                        objectFit: "contain",
                        height: "20px",
                        borderRadius: "5px",
                        marginRight: "2px",
                      }}
                      src={
                        "https://dnu5embx6omws.cloudfront.net/Logos/unibet/30x30@2x.png"
                      }
                      alt=""
                    />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 500 }}>
                    ${ub_win}
                  </span>
                </div>
              )
            ) : sb_plc > ub_plc ? (
              <div>
                <div
                  style={{
                    backgroundColor: "#e12b80",
                    color: "white",
                    fontWeight: 500,
                    borderRadius: "5px",
                    padding: "2px 4px",
                    fontSize: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "2px",
                    height: "20px",
                  }}
                >
                  BB
                </div>
                <span style={{ fontSize: 10, fontWeight: 500 }}>${sb_plc}</span>
              </div>
            ) : (
              <div>
                <div>
                  <img
                    style={{
                      objectFit: "contain",
                      height: "20px",
                      borderRadius: "5px",
                      marginRight: "2px",
                    }}
                    src={
                      "https://dnu5embx6omws.cloudfront.net/Logos/unibet/30x30@2x.png"
                    }
                    alt=""
                  />
                </div>
                <span style={{ fontSize: 10, fontWeight: 500 }}>${ub_plc}</span>
              </div>
            )}
          </Col>
          <Col xs={4} style={{ textAlign: "left", margin: 0, padding: 0 }}>
            {renderNum(filtered[1]?.tab_no, filtered[1]?.horse_silksUrl)}
          </Col>
          <Col xs={2} style={{ padding: 0, margin: 0 }}>
            {position === 1 ? (
              sb_win2 > ub_win2 ? (
                <div>
                  <div
                    style={{
                      backgroundColor: "#e12b80",
                      color: "white",
                      fontWeight: 500,
                      borderRadius: "5px",
                      padding: "2px 4px",
                      fontSize: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "2px",
                      height: "20px",
                    }}
                  >
                    BB
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 500 }}>
                    ${sb_win2}
                  </span>
                </div>
              ) : (
                <div>
                  <div>
                    <img
                      style={{
                        objectFit: "contain",
                        height: "20px",
                        borderRadius: "5px",
                        marginRight: "2px",
                      }}
                      src={
                        "https://dnu5embx6omws.cloudfront.net/Logos/unibet/30x30@2x.png"
                      }
                      alt=""
                    />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 500 }}>
                    ${ub_win2}
                  </span>
                </div>
              )
            ) : sb_plc2 > ub_plc2 ? (
              <div>
                <div
                  style={{
                    backgroundColor: "#e12b80",
                    color: "white",
                    fontWeight: 500,
                    borderRadius: "5px",
                    padding: "2px 4px",
                    fontSize: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "2px",
                    height: "20px",
                  }}
                >
                  BB
                </div>
                <span style={{ fontSize: 10, fontWeight: 500 }}>
                  ${sb_plc2}
                </span>
              </div>
            ) : (
              <div>
                <div>
                  <img
                    style={{
                      objectFit: "contain",
                      height: "20px",
                      borderRadius: "5px",
                      marginRight: "2px",
                    }}
                    src={
                      "https://dnu5embx6omws.cloudfront.net/Logos/unibet/30x30@2x.png"
                    }
                    alt=""
                  />
                </div>
                <span style={{ fontSize: 10, fontWeight: 500 }}>
                  ${ub_plc2}
                </span>
              </div>
            )}
          </Col>
        </Row>
      );
    } else {
      let sb_win = filtered[0]?.sb_win?.toFixed(2);
      let sb_plc = filtered[0]?.sb_place?.toFixed(2);
      let ub_win = filtered[0]?.ub_win?.toFixed(2);
      let ub_plc = filtered[0]?.ub_place?.toFixed(2);
      return (
        <Row>
          <Col xs={4} style={{ textAlign: "left" }}>
            {renderNum(filtered[0]?.tab_no, filtered[0]?.horse_silksUrl)}
          </Col>
          <Col
            style={{ marginLeft: 10, display: "flex", alignItems: "center" }}
          >
            {position === 1 ? (
              sb_win > ub_win ? (
                <Row style={{ marginBottom: 2 }}>
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
                      marginRight: "2px",
                      height: "20px",
                    }}
                  >
                    BB
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>
                    ${sb_win}
                  </span>
                </Row>
              ) : (
                <Row>
                  <div>
                    <img
                      style={{
                        objectFit: "contain",
                        height: "20px",
                        borderRadius: "5px",
                        marginRight: "2px",
                      }}
                      src={
                        "https://dnu5embx6omws.cloudfront.net/Logos/unibet/30x30@2x.png"
                      }
                      alt=""
                    />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>
                    ${ub_win}
                  </span>
                </Row>
              )
            ) : sb_plc > ub_plc ? (
              <Row style={{ marginBottom: 2 }}>
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
                    marginRight: "2px",
                    height: "20px",
                  }}
                >
                  BB
                </div>
                <span style={{ fontSize: 12, fontWeight: 700 }}>${sb_plc}</span>
              </Row>
            ) : (
              <Row>
                <div>
                  <img
                    style={{
                      objectFit: "contain",
                      height: "20px",
                      borderRadius: "5px",
                      marginRight: "2px",
                    }}
                    src={
                      "https://dnu5embx6omws.cloudfront.net/Logos/unibet/30x30@2x.png"
                    }
                    alt=""
                  />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700 }}>${ub_plc}</span>
              </Row>
            )}
          </Col>

          {zone?.result === "WON" && position === 1 && (
            <Col style={{ margin: 0, padding: 0 }}>{badgePTP()}</Col>
          )}
        </Row>
      );
    }
  };

  const renderNum = (num, silkURL) => {
    return (
      <div
        style={{ position: "relative", display: "flex", alignItems: "center" }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            backgroundImage: "url(" + silkURL + ")",
            backgroundPositionX: silkSize(num - 1),
          }}
        ></div>
        <p>
          <strong style={{ position: "absolute", left: 30, fontSize: 12 }}>
            {num}
          </strong>
        </p>
      </div>
    );
  };

  const checkResultColor = (result) => {
    if (result === "WON") {
      return "rgb(252, 179, 24";
    } else if (result === "2ND") {
      return "rgb(9, 106, 179)";
    } else if (result === "3RD") {
      return "rgb(139, 52, 191)";
    } else {
      return "black";
    }
  };

  const renderSelection = (selections, result, is_na) => {
    return (
      <div style={{ textAlign: "center" }}>
        <Lock
          data={
            <Row>
              <Col
                style={{
                  color: checkResultColor(result),
                  fontWeight: result && result !== "LOST" ? 600 : null,
                }}
              >
                {selections?.split(",")[0]}
              </Col>
              <Col>{selections?.split(",")[1]}</Col>
              <Col>{selections?.split(",")[2]}</Col>
              {/* <Col>
                        {selections?.split(',')[3]}
                    </Col> */}
            </Row>
          }
        />
      </div>
    );
  };

  const pagination = () => {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        {props.selectedVenue !== 0 && (
          <div
            style={{
              backgroundColor: "#E0E0E0",
              color: "grey",
              fontWeight: 600,
              borderRadius: 5,
              padding: 4,
              paddingLeft: 10,
              paddingRight: 10,
              textAlign: "center",
              marginRight: 10,
              cursor: "pointer",
              minWidth: 80,
            }}
            onClick={previousVenue}
          >
            Prev.
          </div>
        )}
        {props.selectedVenue < props.results.length - 1 && (
          <div
            style={{
              backgroundColor: "#E0E0E0",
              color: "grey",
              fontWeight: 600,
              borderRadius: 5,
              padding: 4,
              paddingLeft: 10,
              paddingRight: 10,
              textAlign: "center",
              cursor: "pointer",
              minWidth: 80,
            }}
            onClick={nextVenue}
          >
            Next
          </div>
        )}
      </div>
    );
  };

  const previousVenue = () => {
    if (props.selectedVenue > 0) {
      props.setSelectedVenue(props.selectedVenue - 1);
    }
  };

  const nextVenue = () => {
    if (props.selectedVenue < props.results.length) {
      props.setSelectedVenue(props.selectedVenue + 1);
    }
  };

  return (
    <div>
      {!props.allABND ? (
        <>
          <Table
            bordered
            hover
            // size="sm"
            responsive
            style={!props.dark ? styles.table : styles.tableDark}
          >
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: "center",
                    width: 10,
                    paddingLeft: 0,
                    paddingRight: 0,
                  }}
                >
                  <span>#</span>
                </th>
                <th
                  style={{
                    textAlign: "center",
                    width: 40,
                    paddingLeft: 0,
                    paddingRight: 0,
                  }}
                >
                  <span>Result</span>
                </th>
                <th style={{ width: 100 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "left",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ marginRight: 5 }}>Selections</div>
                    <div style={{ width: 50 }}>{badgeNA()}</div>
                    <div className="profileCheckBox">
                      <input
                        id="isNaCheckedDes"
                        type="checkbox"
                        className="switch"
                        checked={isNaChecked}
                        onChange={() => setIsNaChecked(!isNaChecked)}
                      />
                    </div>
                  </div>
                </th>
                <th style={{ textAlign: "center" }}>{badgeFirts()}</th>
                <th style={{ textAlign: "center" }}>{badgeSecond()}</th>
                <th style={{ textAlign: "center" }}>{badgeThird()}</th>
                <th style={{ textAlign: "center" }}>
                  <span>Track</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {props.results[props.selectedVenue]?.venue_details?.map(
                (zone, i) => {
                  return zone.track_condition === "ABND" ? (
                    <tr key={`vr-${i}`} style={{ height: 30 }}>
                      <td style={{ textAlign: "center" }}>
                        <Link
                          style={{ color: "black", cursor: "pointer" }}
                          to={`/horse-racing-tips/${transferLinkDate(zone.meetdate)}/${
                            props.results[props.selectedVenue]?.track_name
                          }/R${zone?.race_num}/${zone?.point_id}`}
                        >
                          {zone?.race_num}
                        </Link>
                      </td>
                      <td colSpan="6">{badgeABND()}</td>
                    </tr>
                  ) : (
                    <tr key={`vr-${i}`}>
                      <td style={{ cursor: "pointer" }}>
                        <div
                          style={{
                            height: 30,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Link
                            style={{ color: "black" }}
                            to={`/horse-racing-tips/${transferLinkDate(zone.meetdate)}/${
                              props.results[props.selectedVenue]?.track_name
                            }/R${zone?.race_num}/${zone?.point_id}`}
                          >
                            {zone?.race_num}
                          </Link>
                        </div>
                      </td>
                      <td
                        style={{
                          paddingTop: 15,
                          paddingLeft: 0,
                          paddingRight: 0,
                        }}
                      >
                        {resultBadge(
                          zone?.result,
                          zone.track_condition,
                          zone.is_na
                        )}
                      </td>
                      <td style={{ paddingTop: 15 }}>
                        {zone.is_na === 1 && !isNaChecked
                          ? badgeNA()
                          : renderSelection(
                              zone?.selections,
                              zone?.result,
                              zone?.is_na
                            )}
                      </td>
                      {zone.positions ? (
                        <>
                          <td
                            style={{
                              width: 120,
                              borderLeftWidth:
                                zone.result === "WON" &&
                                (zone.is_na === 0 || isNaChecked)
                                  ? 5
                                  : null,
                              borderLeftColor:
                                zone.result === "WON"
                                  ? "rgb(252, 179, 24)"
                                  : null,
                            }}
                          >
                            {filterPosition(1, zone.positions, zone)}
                          </td>
                          <td
                            style={{
                              width: 120,
                              borderLeftWidth:
                                zone.result === "2ND" &&
                                (zone.is_na === 0 || isNaChecked)
                                  ? 5
                                  : null,
                              borderLeftColor:
                                zone.result === "2ND"
                                  ? "rgb(9, 106, 179)"
                                  : null,
                            }}
                          >
                            {filterPosition(2, zone.positions, zone)}
                          </td>
                          <td
                            style={{
                              width: 120,
                              borderLeftWidth:
                                zone.result === "3RD" &&
                                (zone.is_na === 0 || isNaChecked)
                                  ? 5
                                  : null,
                              borderLeftColor:
                                zone.result === "3RD"
                                  ? "rgb(139, 52, 191)"
                                  : null,
                            }}
                          >
                            {filterPosition(3, zone.positions, zone)}
                          </td>
                        </>
                      ) : (
                        <td colSpan="3" style={{ paddingTop: 10, width: 120 }}>
                          {badgeTBA()}
                        </td>
                      )}
                      <td style={{ paddingTop: 10, width: 50 }}>
                        {fullTrackCondition(
                          zone?.track_condition,
                          zone?.full_track_condition
                        )}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </Table>

          <Row
            style={{
              width: "100%",
              margin: "auto",
              marginTop: 5,
              paddingTop: 0,
            }}
          >
            {pagination()}
          </Row>

          <Row
            style={{
              // cursor: 'pointer',
              backgroundColor: "white",
              width: "100%",
              margin: "auto",
              minHeight: 70,
              marginBottom: 10,
              marginTop: 10,
              paddingTop: 10,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <Col xs={12}>
              <h4>
                Daily Performance{" "}
                <strong>
                  {props.results[props.selectedVenue]?.track_name}
                </strong>
              </h4>
            </Col>
            <Col xs={12}>
              <Row>
                <Col lg={3} md={3} xs={6}>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>
                    Runs: {props.selections}
                  </p>
                </Col>
                <Col lg={3} md={3} xs={6}>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>
                    Win: {props.win} (
                    {props.selections
                      ? ((props.win / props.selections) * 100).toFixed(1) + "%"
                      : "0.00%"}
                    )
                  </p>
                </Col>
                <Col lg={3} md={3} xs={6}>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>
                    2ND: {props.second} (
                    {props.selections
                      ? ((props.second / props.selections) * 100).toFixed(1) +
                        "%"
                      : "0.00%"}
                    )
                  </p>
                </Col>
                <Col lg={3} md={3} xs={6}>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>
                    3RD: {props.third} (
                    {props.selections
                      ? ((props.third / props.selections) * 100).toFixed(1) +
                        "%"
                      : "0.00%"}
                    )
                  </p>
                </Col>
              </Row>
            </Col>
            <Col xs={12} style={{ marginTop: 10 }}>
              <h4>All Time</h4>
            </Col>
            <Col xs={12} style={{ marginTop: 10 }}>
              <Row>
                <Col lg={3} md={3} xs={6}>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>
                    Runs:{" "}
                    {props?.results[props.selectedVenue]?.venue_history?.runs}
                  </p>
                </Col>
                <Col lg={3} md={3} xs={6}>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>
                    Win:{" "}
                    {props?.results[props.selectedVenue]?.venue_history?.won} (
                    {(
                      Number(
                        props?.results[props.selectedVenue]?.venue_history
                          ?.won /
                          props?.results[props.selectedVenue]?.venue_history
                            ?.runs
                      ) * 100
                    )?.toFixed(2)}
                    %)
                  </p>
                </Col>
                <Col lg={3} md={3} xs={6}>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>
                    AVG: $
                    {props?.results[
                      props.selectedVenue
                    ]?.venue_history?.avg_win_odd?.toFixed(2)}
                  </p>
                </Col>
                <Col lg={3} md={3} xs={6}>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>
                    PLC:{" "}
                    {props?.results[props.selectedVenue]?.venue_history?.place}{" "}
                    (
                    {(
                      Number(
                        props?.results[props.selectedVenue]?.venue_history
                          ?.place /
                          props?.results[props.selectedVenue]?.venue_history
                            ?.runs
                      ) * 100
                    )?.toFixed(2)}
                    %)
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <div style={{ marginTop: 32 }}>
            <FontAwesomeIcon icon={faExclamationCircle} size="4x" />
            <h4 style={{ marginTop: 16 }}>
              <strong>All Races Are Abandoned</strong>
            </h4>
            <div style={{ marginTop: -8 }}>
              Change Venue
              {pagination()}
              {/* <FontAwesomeIcon icon={faArrowRight} size="1x" color="red" style={{ cursor: 'pointer' }} onClick={nextVenue} /> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  results: state.resultsReducer.results,
  selectedVenue: state.resultsReducer.selectedVenue,
  dailyPerformance: state.resultsReducer.dailyPerformance,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedVenue: (data) => dispatch(resultAction.setSelectedVenue(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableMobile);
