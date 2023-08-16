import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Table } from "antd";
import moment from "moment";
import Timer from "../../../components/Timer";
import "moment-timezone";

import {
  // checkRouteDate,
  ConvertUTCTimeToLocalTime,
  linkToRacePageWhileReturningDataToTable,
} from "../../../config/utils";
import { fullTrackCond } from "../../../config/racesUtils";

import LoadingNew from "../../../components/loading/LoadingNew";
import Tooltip from "@material-ui/core/Tooltip";
// import Switch from "@material-ui/core/Switch";
// import { withStyles } from "@material-ui/core/styles";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMedal,
  faTrophy,
  faAward,
  // faEye,
  // faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
/* REDUX */

import actions from "../../../redux/actions/selections";

//functions
import { silkSize } from "../../../config/racesUtils";
/* CSS */
import "antd/dist/antd.css";
import "../selections.scss";
class selectionsTable extends React.Component {
  constructor() {
    super();
    this.state = {
      // hover: (window.innerWidth < 1000 ? false : true)
      hover: false,
    };
  }
  //passing current date
  componentDidMount()  {
    const { dispatch } = this.props;
    //dispatch(actions.getSelectionsForDate({ passDate: this.props.date }));
    this.interval = setInterval(() => {
      if (!document.hidden) {
        dispatch(
          actions.getSelectionsForDateNoLoading({ passDate: this.props.date })
        );
      }
    }, 30000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  racenavigation(zone) {
    var num = 0;
    if (zone.info[zone.info.length - 1]?.race_status === "Closed") {
      num = 0;
    } else {
      for (let i = 0; i < zone.info.length; i++) {
        if (
          i === 0 &&
          zone.info[i + 1]?.race_status === "Open" &&
          zone.info[0]?.race_status === "Open"
        ) {
          num = 0;
        } else if (
          i === 0 &&
          zone.info[i + 1]?.race_status === "Open" &&
          zone.info[0]?.race_status === "Closed"
        ) {
          num = i + 1;
        } else if (
          zone.info[i]?.race_status === "Open" &&
          zone.info[i - 1]?.race_status === "Closed"
        ) {
          num = i;
        }
      }
    }
    return num;
  }

  positionRender(data) {
    let r1 = "";
    if (data[0]?.pos === 1) {
      r1 += data[0]?.tab_no;
    }
    if (data[1]?.pos === 1) {
      r1 += "/" + data[1]?.tab_no;
    } else if (data[1]?.pos === 2) {
      r1 += "," + data[1]?.tab_no;
    }
    if (data[2]?.pos === 1) {
      r1 += "/" + data[2]?.tab_no;
    } else if (data[2]?.pos === 2) {
      r1 += "/" + data[2]?.tab_no;
    } else if (data[2]?.pos === 3) {
      r1 += "," + data[2]?.tab_no;
    }
    if (data[3]?.pos === 2) {
      r1 += "/" + data[3]?.tab_no;
    } else if (data[3]?.pos === 3) {
      r1 += "/" + data[3]?.tab_no;
    }
    return r1;
  }

  positionStyleRender = (position) => {
    if (position === 1) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            padding: 0,
            width: "15px",
          }}>
          <FontAwesomeIcon icon={faTrophy} size="1x" color="#ffa800" />
          <strong style={{ color: "#ffa800" }}>1st</strong>
        </div>
      );
    } else if (position === 2) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            padding: 0,
            width: "15px",
          }}>
          <FontAwesomeIcon icon={faMedal} size="1x" color="#096ab3" />
          <strong style={{ color: "#096ab3" }}>2nd</strong>
        </div>
      );
    } else if (position === 3) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            padding: 0,
            width: "15px",
          }}>
          <FontAwesomeIcon icon={faAward} size="1x" color="#8b34bf" />
          <strong style={{ color: "#8b34bf" }}>3rd</strong>
        </div>
      );
    } else if (position === 4) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            padding: 0,
            width: "15px",
          }}>
          <FontAwesomeIcon icon={faAward} size="1x" color="black" />
          <strong style={{ color: "black" }}>4th</strong>
        </div>
      );
    }
  };
  oddsRender(position, win, place) {
    if (position === null) {
      return win?.toFixed(2);
    } else {
      if (position === 1) {
        return win?.toFixed(2);
      } else {
        return place?.toFixed(2);
      }
    }
  }
  renderTooltip(mainData, horses) {
    // let data=this.positionRender(mainData)
    return (
      <Tooltip
        style={{ padding: 0, textAlign: "center" }}
        disableHoverListener={!this.state.hover}
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
            }}>
            {horses?.map((zone, i) => {
              return (
                <div key={i} style={{ display: "flex", alignItems: "center" }}>
                  {zone.positions !== null
                    ? this.positionStyleRender(zone?.position)
                    : null}
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      backgroundImage: "url(" + zone.silkUrl + ")",
                      backgroundPositionX: silkSize(zone.tab_no - 1),
                      marginLeft: "2px",
                    }}></div>
                  <div style={{ width: "20px", textAlign: "right" }}>
                    {zone.tab_no + ". "}
                  </div>
                  <div style={{ width: "80px", marginLeft: "1px" }}>
                    {zone.horse_name}
                  </div>
                  <div>%{zone?.percent?.toFixed(0)}</div>
                  <div
                    style={{
                      marginLeft: "6px",
                      display: "flex",
                      width: "60px",
                    }}>
                    <div
                      style={{
                        borderRadius: "50%",
                        backgroundColor: "#39a634",
                        width: "8px",
                        height: "8px",
                        marginRight: "4px",
                      }}>
                      {" "}
                    </div>
                    $
                    {this.oddsRender(zone.position, zone.ub_win, zone.ub_place)}
                  </div>
                  <div
                    style={{
                      marginLeft: "10px",
                      display: "flex",
                      width: "60px",
                    }}>
                    <div
                      style={{
                        borderRadius: "50%",
                        backgroundColor: "#e12b80",
                        width: "8px",
                        height: "8px",
                        marginRight: "4px",
                      }}>
                      {" "}
                    </div>
                    $
                    {this.oddsRender(zone.position, zone.sb_win, zone.sb_place)}
                  </div>
                </div>
              );
            })}
          </div>
        }
        placement="top">
        <div>{mainData}</div>
      </Tooltip>
    );
  }
  renderSelectedHorses(data, tooltip) {
    if (this.props.currentUser) {
      if (this.props.isExpired === true) {
        return data;
      } else {
        return tooltip;
      }
    } else if (!this.props.currentUser) {
      return data;
    }
  }

  trackcondRender(value, fullCondition) {
    let final = fullTrackCond(fullCondition);
    if (value === "ABND" || value === null || value === "undefined") {
      return null;
    } else if (value === "G") {
      return <div style={{ color: "#44BD32", fontWeight: 700 }}>{final}</div>;
    } else if (value === "F") {
      return <div style={{ color: "#000000", fontWeight: 700 }}>{final}</div>;
    } else if (value === "SO") {
      return <div style={{ color: "#FFA800", fontWeight: 700 }}>{final}</div>;
    } else if (value === "H") {
      return <div style={{ color: "#F64F60", fontWeight: 700 }}>{final}</div>;
    } else if (value === "SY") {
      return <div style={{ color: "#44BD32", fontWeight: 700 }}>{final}</div>;
    }
  }

  tableData() {
    const data = [];
    const selections = this.props.selections;
    selections?.forEach((zone, i) => {
      let vName = zone.venue;
      let vState = zone.state;
      let vCond = zone.trackcond;
      let test = [];
      zone?.info?.forEach((zoneI) => {
        // let arr = [];
        //splitting race date in order to compare it to todays date
        var raceDate = moment(zoneI?.meetdate).format("YYYYMMDD");
        //spliting today date to be able to compare it to race date
        var actualDateFormated = moment()
          .tz("Australia/Sydney")
          .format("YYYYMMDD");
        //spliting race time to digits in order to compare it
        var raceTime =
          Number(moment(zoneI?.race_time, "HH:mm:ss").format("HH")) * 60 +
          Number(moment(zoneI?.race_time, "HH:mm:ss").format("mm"));
        var currentTime =
          Number(moment().tz("Australia/Sydney").format("HH")) * 60 +
          Number(moment().tz("Australia/Sydney").format("mm"));
        var timeDiffrence = raceTime - currentTime;

        var raceT = moment(zoneI?.race_time, "HH:mm:ss").format("HHmm");
        var currentT = moment().tz("Australia/Sydney").format("HHmm");

        //changing time format to timestamp ms in order to use the countdown timer
        var Rt =
          moment(zoneI?.race_time, "HH:mm:ss").format("HH") * 60 * 60 * 1000 +
          moment(zoneI?.race_time, "HH:mm:ss").format("mm") * 60 * 1000;

        //checking if race date is today or older
        if (actualDateFormated === raceDate) {
          //checking track condition
          if (zoneI.track_condition === "ABND") {
            let r1 = <div style={styles.na}>ABND</div>;
            test.push(<div>{r1}</div>);
          } else if (zoneI.is_na === 1) {
            let r1 = (
              <div
                style={
                  styles.na && raceT < currentT
                    ? {
                        backgroundColor: "#e9ecef",
                        padding: "10px 0px",
                        color: "rgb(250, 120, 0)",
                      }
                    : { color: "rgb(250, 120, 0)" }
                }>
                {" "}
                {zoneI?.positions?.length > 0
                  ? this.renderTooltip("N/R", zoneI.horses)
                  : "N/R"}
              </div>
            );
            test.push(
              linkToRacePageWhileReturningDataToTable(
                r1,
                zoneI.meetdate,
                zone.venue,
                zoneI.race_num,
                zoneI.point_id
              )
            );
          } else {
            //checking if race hasent been played yet
            if (raceT >= currentT) {
              let r1;
              if (timeDiffrence < 60) {
                r1 = (
                  <div className="pointer">
                    {this.renderSelectedHorses(
                      <Timer
                        raceTimer={Rt}
                        raceTime={zoneI.raceTime}
                        raceStatus={zoneI.race_status}
                      />,
                      this.renderTooltip(
                        <Timer
                          raceTimer={Rt}
                          raceTime={zoneI.raceTime}
                          raceStatus={zoneI.race_status}
                        />,
                        zoneI.horses
                      )
                    )}
                  </div>
                );
                test.push(
                  linkToRacePageWhileReturningDataToTable(
                    r1,
                    zoneI.meetdate,
                    zone.venue,
                    zoneI.race_num,
                    zoneI.point_id
                  )
                );
              } else if (timeDiffrence < 0) {
                r1 = (
                  <div className="pointer" style={styles.tba}>
                    {this.renderSelectedHorses(
                      "TBA",
                      this.renderTooltip("TBA", zoneI.horses)
                    )}
                  </div>
                );
                test.push(
                  linkToRacePageWhileReturningDataToTable(
                    r1,
                    zoneI.meetdate,
                    zone.venue,
                    zoneI.race_num,
                    zoneI.point_id
                  )
                );
              } else if (timeDiffrence > 60) {
                //else put race time
                let r1 = (
                  <div className="pointer" style={styles.cell}>
                    {this.renderSelectedHorses(
                      ConvertUTCTimeToLocalTime(
                        moment(zoneI.race_time, "HH:mm:ss").format("HH:mm")
                      ),
                      this.renderTooltip(
                        ConvertUTCTimeToLocalTime(
                          moment(zoneI.race_time, "HH:mm:ss").format("HH:mm")
                        ),
                        zoneI.horses
                      )
                    )}
                  </div>
                );
                test.push(
                  linkToRacePageWhileReturningDataToTable(
                    r1,
                    zoneI.meetdate,
                    zone.venue,
                    zoneI.race_num,
                    zoneI.point_id
                  )
                );
              }
            }
            //checking if race is played or being played
            else if (raceT < currentT) {
              // let r1 = zoneI.r1 + zoneI.r2 + zoneI.r3
              if (zoneI.result) {
                if (zoneI?.positions?.length > 0) {
                  let r1 = (
                    <div
                      className="pointer"
                      style={
                        (styles.cell,
                        { backgroundColor: "#e9ecef", padding: "10px 0px" })
                      }>
                      {this.renderTooltip(
                        this.positionRender(zoneI.positions),
                        zoneI.horses
                      )}
                    </div>
                  );
                  test.push(
                    linkToRacePageWhileReturningDataToTable(
                      r1,
                      zoneI.meetdate,
                      zone.venue,
                      zoneI.race_num,
                      zoneI.point_id
                    )
                  );
                } else {
                  let r1 = (
                    <div className="pointer" style={styles.cell}>
                      {this.renderTooltip("--", zoneI.horses)}
                    </div>
                  );
                  test.push(
                    linkToRacePageWhileReturningDataToTable(
                      r1,
                      zoneI.meetdate,
                      zone.venue,
                      zoneI.race_num,
                      zoneI.point_id
                    )
                  );
                }
              } else {
                if (this.props.currentUser) {
                  let r1 = (
                    <div className="pointer" style={styles.tba}>
                      {this.renderTooltip("TBA", zoneI.horses)}
                    </div>
                  );
                  test.push(
                    linkToRacePageWhileReturningDataToTable(
                      r1,
                      zoneI.meetdate,
                      zone.venue,
                      zoneI.race_num,
                      zoneI.point_id
                    )
                  );
                } else {
                  let r1 = (
                    <div
                      className="pointer"
                      style={(styles.tba, { pointerEvents: "none" })}>
                      {this.renderTooltip("TBA", zoneI.horses)}
                    </div>
                  );
                  test.push(
                    linkToRacePageWhileReturningDataToTable(
                      r1,
                      zoneI.meetdate,
                      zone.venue,
                      zoneI.race_num,
                      zoneI.point_id
                    )
                  );
                }
              }
            }
          }
        }
        //checking if race date is in the future
        else if (actualDateFormated < raceDate) {
          if (zoneI.track_condition === "ABND") {
            let r1 = <div style={styles.na}>ABND</div>;
            test.push(r1);
          } else if (zoneI?.is_na === 1) {
            let r1 = (
              <div className="pointer" style={styles.na}>
                N/R
              </div>
            );
            test.push(
              linkToRacePageWhileReturningDataToTable(
                r1,
                zoneI.meetdate,
                zone.venue,
                zoneI.race_num,
                zoneI.point_id
              )
            );
          } else if (this.props.currentUser) {
            let r1;
            r1 = (
              <div className="pointer" style={styles.cell}>
                {this.renderTooltip(
                  ConvertUTCTimeToLocalTime(
                    moment(zoneI?.race_time, "HH:mm:ss").format("HH:mm")
                  ),
                  zoneI.horses
                )}
              </div>
            );
            test.push(
              linkToRacePageWhileReturningDataToTable(
                r1,
                zoneI.meetdate,
                zone.venue,
                zoneI.race_num,
                zoneI.point_id
              )
            );
          } else {
            let r1;
            r1 = (
              <div
                className="pointer"
                style={(styles.cell, { pointerEvents: "none" })}>
                {this.renderTooltip(
                  ConvertUTCTimeToLocalTime(
                    moment(zoneI?.race_time, "HH:mm:ss").format("HH:mm")
                  ),
                  zoneI.horses
                )}
              </div>
            );
            test.push(
              linkToRacePageWhileReturningDataToTable(
                r1,
                zoneI.meetdate,
                zone.venue,
                zoneI.race_num,
                zoneI.point_id
              )
            );
          }
        }

        //IF RACE IS IN THE PAST
        else if (actualDateFormated > raceDate) {
          if (zoneI.track_condition === "ABND") {
            let r1 = <div style={styles.na}>ABND</div>;
            test.push(r1);
          } else if (zoneI?.is_na === 1) {
            let r1 = (
              <div
                className="pointer"
                style={
                  (styles.na,
                  {
                    backgroundColor: "#e9ecef",
                    color: "rgb(250, 120, 0)",
                    padding: "10px 0px",
                  })
                }>
                {zoneI?.positions?.length > 0
                  ? this.renderTooltip("N/R", zoneI.horses)
                  : "N/R"}
              </div>
            );
            test.push(
              linkToRacePageWhileReturningDataToTable(
                r1,
                zoneI.meetdate,
                zone.venue,
                zoneI.race_num,
                zoneI.point_id
              )
            );
          } else {
            if (zoneI?.positions?.length > 0) {
              let r1 = (
                <div
                  className="pointer"
                  style={
                    (styles.cell,
                    { backgroundColor: "#e9ecef", padding: "10px 0px" })
                  }>
                  {this.renderTooltip(
                    this.positionRender(zoneI.positions),
                    zoneI.horses
                  )}
                </div>
              );
              test.push(
                linkToRacePageWhileReturningDataToTable(
                  r1,
                  zoneI.meetdate,
                  zone.venue,
                  zoneI.race_num,
                  zoneI.point_id
                )
              );
            } else {
              let r1 = (
                <div
                  className="pointer"
                  style={(styles.cell, { padding: "10px 0px" })}>
                  --
                </div>
              );
              test.push(
                linkToRacePageWhileReturningDataToTable(
                  r1,
                  zoneI?.meetdate,
                  zone?.venue,
                  zoneI?.race_num,
                  zoneI?.point_id
                )
              );
            }
          }
        }
      });
      // let index = this.racenavigation(zone);
      data.push({
        key: i,
        // 'vName': <Link style={{ textAlign: "left", marginLeft: "8px", color: 'black', fontWeight: 500 }} to={`/horse-racing-tips/${checkRouteDate(moment(zone.info[index].meetdate).format('DD-MM-YYYY'))}/${zone.venue}/R${zone.info[index].race_num}/${zone.info[index].point_id}`}>
        //   <strong> {vName}</strong>
        // </Link>,
        vName: (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Link
              style={{
                textAlign: "left",
                marginLeft: "8px",
                color: "#545454",
                fontWeight: 500,
              }}
              to={
                zone.trackcode
                  ? `/profile/venue/${zone.trackcode.toLowerCase()}`
                  : `/profile/venue/${zone.trackcode}`
              }
              // to={`/horse-racing-tips/venue/${zone.venue}/${moment(this.props.date, "YYYY-MM-DD").format("DD-MM-YYYY")}`}
            >
              <strong>{vName}</strong>{" "}
              <span style={{ fontSize: "10px" }}>({vState})</span>
            </Link>
            <div style={{ marginRight: "6px" }}>
              {this.trackcondRender(vCond, zone.full_track_condition)}
            </div>
          </div>
        ),
        c1: test[0] ? test[0] : "",
        c2: test[1] ? test[1] : "",
        c3: test[2] ? test[2] : "",
        c4: test[3] ? test[3] : "",
        c5: test[4] ? test[4] : "",
        c6: test[5] ? test[5] : "",
        c7: test[6] ? test[6] : "",
        c8: test[7] ? test[7] : "",
        c9: test[8] ? test[8] : "",
        c10: test[9] ? test[9] : "",
        c11: test[10] ? test[10] : "",
        c12: test[11] ? test[11] : "",
      });
    });
    return data;
  }

  tableRender() {
    const backColor = (val) => {
      if (val === "") {
        return "#F5F7FF";
      } else {
        return "white";
      }
    };

    const columns2 = [
      {
        title: (
          <div
            style={{
              backgroundColor: "rgb(20, 40, 65)",
              color: "white",
              borderTopLeftRadius: 5,
            }}>
            Venue
          </div>
        ),
        dataIndex: "vName",
        width: 130,
        fixed: "left",
        render(text, record) {
          return {
            props: {
              style: { height: 40, borderBottomColor: "white" },
            },
            children: (
              <div
                style={{
                  backgroundColor: "rgba(20, 40, 65, 0.2)",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}>
                {text}
              </div>
            ),
          };
        },
      },
      {
        title: (
          <div style={{ backgroundColor: "rgb(20, 40, 65)", color: "white" }}>
            1
          </div>
        ),
        dataIndex: "c1",
        width: 50,
        render(text) {
          return {
            props: {
              style: {
                textAlign: "center",
                fontSize: 11,
                height: 40,
                backgroundColor: backColor(text),
              },
            },
            children: <div>{text}</div>,
          };
        },
      },
      {
        title: (
          <div style={{ backgroundColor: "rgb(20, 40, 65)", color: "white" }}>
            2
          </div>
        ),
        dataIndex: "c2",
        width: 50,
        render(text) {
          return {
            props: {
              style: {
                textAlign: "center",
                fontSize: 11,
                height: 40,
                backgroundColor: backColor(text),
              },
            },
            children: <div>{text}</div>,
          };
        },
      },
      {
        title: (
          <div style={{ backgroundColor: "rgb(20, 40, 65)", color: "white" }}>
            3
          </div>
        ),
        dataIndex: "c3",
        width: 50,
        render(text, record) {
          return {
            props: {
              style: {
                textAlign: "center",
                fontSize: 11,
                height: 40,
                backgroundColor: backColor(text),
              },
            },
            children: <div>{text}</div>,
          };
        },
      },
      {
        title: (
          <div style={{ backgroundColor: "rgb(20, 40, 65)", color: "white" }}>
            4
          </div>
        ),
        dataIndex: "c4",
        width: 50,
        render(text, record) {
          return {
            props: {
              style: {
                textAlign: "center",
                fontSize: 11,
                height: 40,
                backgroundColor: backColor(text),
              },
            },
            children: <div>{text}</div>,
          };
        },
      },
      {
        title: (
          <div style={{ backgroundColor: "rgb(20, 40, 65)", color: "white" }}>
            5
          </div>
        ),
        dataIndex: "c5",
        width: 50,
        render(text, record) {
          return {
            props: {
              style: {
                textAlign: "center",
                fontSize: 11,
                height: 40,
                backgroundColor: backColor(text),
              },
            },
            children: <div>{text}</div>,
          };
        },
      },
      {
        title: (
          <div style={{ backgroundColor: "rgb(20, 40, 65)", color: "white" }}>
            6
          </div>
        ),
        dataIndex: "c6",
        width: 50,
        render(text, record) {
          return {
            props: {
              style: {
                textAlign: "center",
                fontSize: 11,
                height: 40,
                backgroundColor: backColor(text),
              },
            },
            children: <div>{text}</div>,
          };
        },
      },
      {
        title: (
          <div style={{ backgroundColor: "rgb(20, 40, 65)", color: "white" }}>
            7
          </div>
        ),
        dataIndex: "c7",
        width: 50,
        render(text, record) {
          return {
            props: {
              style: {
                textAlign: "center",
                fontSize: 11,
                height: 40,
                backgroundColor: backColor(text),
              },
            },
            children: <div>{text}</div>,
          };
        },
      },
      {
        title: (
          <div style={{ backgroundColor: "rgb(20, 40, 65)", color: "white" }}>
            8
          </div>
        ),
        dataIndex: "c8",
        width: 50,
        render(text, record) {
          return {
            props: {
              style: {
                textAlign: "center",
                fontSize: 11,
                height: 40,
                backgroundColor: backColor(text),
              },
            },
            children: <div>{text}</div>,
          };
        },
      },
      {
        title: (
          <div style={{ backgroundColor: "rgb(20, 40, 65)", color: "white" }}>
            9
          </div>
        ),
        dataIndex: "c9",
        width: 50,
        render(text, record) {
          return {
            props: {
              style: {
                textAlign: "center",
                fontSize: 11,
                height: 40,
                backgroundColor: backColor(text),
              },
            },
            children: <div>{text}</div>,
          };
        },
      },
      {
        title: (
          <div style={{ backgroundColor: "rgb(20, 40, 65)", color: "white" }}>
            10
          </div>
        ),
        dataIndex: "c10",
        width: 50,
        render(text, record) {
          return {
            props: {
              style: {
                textAlign: "center",
                fontSize: 11,
                height: 40,
                backgroundColor: backColor(text),
              },
            },
            children: <div>{text}</div>,
          };
        },
      },
      {
        title: (
          <div style={{ backgroundColor: "rgb(20, 40, 65)", color: "white" }}>
            11
          </div>
        ),
        dataIndex: "c11",
        width: 50,
        render(text, record) {
          return {
            props: {
              style: {
                textAlign: "center",
                fontSize: 11,
                height: 40,
                backgroundColor: backColor(text),
              },
            },
            children: <div>{text}</div>,
          };
        },
      },
      {
        title: (
          <div
            style={{
              backgroundColor: "rgb(20, 40, 65)",
              color: "white",
              borderTopRightRadius: 5,
            }}>
            12
          </div>
        ),
        dataIndex: "c12",
        width: 50,
        render(text, record) {
          return {
            props: {
              style: {
                textAlign: "center",
                fontSize: 11,
                height: 40,
                backgroundColor: backColor(text),
              },
            },
            children: <div>{text}</div>,
          };
        },
      },
    ];

    //FUNCTION for pushing correct data in table

    const renderChecker = () => {
      if (this.props.loadingSelection) {
        return <LoadingNew />;
      } else {
        if (window.innerWidth < 900) {
          return (
            <Table
              columns={columns2}
              bordered
              dataSource={this.tableData()}
              size="middle"
              pagination={false}
              scroll={{ x: "calc(220px + 50%)", y: "320px" }}
              style={{ marginTop: "7px" }}
            />
          );
        } else {
          return (
            <Table
              className="selection_table"
              columns={columns2}
              bordered
              dataSource={this.tableData()}
              size="middle"
              pagination={false}
              // scroll={{ x: 'calc(220px + 50%)', y: '400px' }}
              style={{ marginTop: "7px" }}
            />
          );
        }
      }
    };
    return renderChecker();
  }
  render() {
    return <div>{this.tableRender()}</div>;
  }
}

const styles = {
  cell: {
    // padding: "8px 4px",
  },
  na: {
    // padding: "8px 4px",
    color: "rgb(250, 120, 0)",
    backgroundColor: "rgb(233, 236, 239)",
    minHeight: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
  },
  tba: {
    // padding: "8px 4px",
    color: "#0f72b5",
  },
};
const mapStateToProps = (state) => ({
  selections: state.selectionReducer.selections,
  loadingSelection: state.selectionReducer.loadingSelection,
  currentUser: state.auth.currentUser,
  isExpired: state.auth.isExpired,
});

export default withRouter(connect(mapStateToProps)(selectionsTable));
