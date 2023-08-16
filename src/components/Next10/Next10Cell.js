import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment-timezone";
import "./next10.scss";
import Timer from "../Timer";
import { CircularProgress } from "@material-ui/core";
/* REDUX */
import actions from "../../redux/actions/selections";
import raceAction from "../../redux/actions/race";
//import selectionsAction from '../../redux/actions/selections'

import Lock from "../Lock/Lock";
import Next10Wide from "./Components/Next10Wide";

class Next10 extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(actions.getNextTen(this.props.showNextNR));
    this.interval = setInterval(() => {
      dispatch(actions.getNextTenNoReload(this.props.showNextNR));
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }
  TimerCheck(RaceTime, formatted, racetime, rStatus) {
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
  }

  DateCheck(CD, RD, RaceTime, formatted, racetime, rStatus) {
    if (CD < RD) {
      return formatted;
    } else {
      return this.TimerCheck(RaceTime, formatted, racetime, rStatus);
    }
  }

  navigator(p_id, meetdate) {
    const { dispatch } = this.props;
    dispatch(raceAction.getRaceInfo({ raceId: p_id }));
    dispatch(
      actions.getSelectionsForDate({
        passDate: moment(meetdate).tz("Australia/Sydney").format("YYYY-MM-DD"),
      })
    );
    // this.props.history.push(`/horse-racing-tips/race/${p_id}`)
    window.scrollTo(0, 0);
  }
  equalselec(first, second) {
    if (Math.round(first - second) === 0) {
      return (
        <div
          style={{
            backgroundColor: "green",
            marginLeft: "4px",
            borderRadius: "4px",
            color: "white",
            fontSize: "11px",
            width: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          EQ
        </div>
      );
    } else return "";
  }
  NextRender() {
    var next = this.props.next10Tips.map((zone, i) => {
      // var curentDate = moment().tz('Australia/Sydney').format("YYYYMMDD")
      // var rDate = zone.meetdate?.split("-")[0] + zone.meetdate?.split("-")[1] + zone.meetdate?.split("-")[2]
      // var RaceHour = Number(zone?.race_time?.split(":")[0]) * 60 * 60 * 1000
      // var RaceMin = Number(zone?.race_time?.split(":")[1]) * 60 * 1000
      // var RTime = (RaceHour + RaceMin)
      // var racetime = zone.race_time
      // var rStatus = zone.race_status

      // var Rname = zone.track_name
      // var Rnum = zone.race_num
      // var Rdate = checkRouteDate(moment(zone.meetdate).tz('Australia/Sydney').format("DD-MM-YYYY"))

      // if (zone.sb_win) {
      //     var SBW = Number(zone.sb_win).toFixed(2)
      //     var SBP = Number(zone.sb_place).toFixed(2)
      // }
      // else {
      //     SBW = Number(0.00).toFixed(2)
      //     SBP = Number(0.00).toFixed(2)
      // }
      // if (zone.ub_win) {
      //     var UBW = Number(zone.ub_win).toFixed(2)
      //     var UBP = Number(zone.ub_place).toFixed(2)
      // }
      // else {
      //     UBW = Number(0.00).toFixed(2)
      //     UBP = Number(0.00).toFixed(2)
      // }

      // var formatted = moment(zone.race_time, "HH:mm").format("HH:mm");

      var curentDate = moment().tz("Australia/Sydney").format("YYYYMMDD");
      var rDate =
        zone.meetdate?.split("-")[0] +
        zone.meetdate?.split("-")[1] +
        zone.meetdate?.split("-")[2];
      var RaceHour = Number(zone?.race_time?.split(":")[0]) * 60 * 60 * 1000;
      var RaceMin = Number(zone?.race_time?.split(":")[1]) * 60 * 1000;
      var RTime = RaceHour + RaceMin;
      var racetime = zone.race_time;
      var rStatus = zone.race_status;

      var Rname = zone.track_name;
      var Rnum = zone.race_num;

      var selectionfirst;
      var selectionsecond;
      var selectionthird;
      var selectionfourth;

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
      var formatted = moment(zone.race_time, "HH:mm").format("HH:mm");
      return (
        <div className="nextcell" key={i} style={{ marginRight: 8 }}>
          <Next10Wide
            TName={zone.track_name}
            TNum={zone.race_num}
            RTime={
              <small className="text_green">
                {this.DateCheck(
                  curentDate,
                  rDate,
                  RTime,
                  formatted,
                  racetime,
                  rStatus
                )}
              </small>
            }
            HNumber={
              <Lock
                data={
                  <small
                    className="text_green"
                    style={{
                      fontSize: 13,
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "baseline",
                    }}
                  >
                    No. {horsenb1}{" "}
                    {this.equalselec(selectionfirst, selectionsecond)}
                  </small>
                }
              />
            }
            Percent={<Lock data={Math.round(selectionfirst) + "%"} />}
            isNR={zone.is_na}
            Addpercent={
              <Lock
                data={
                  <small className="text_blue">
                    <span style={{ textAlign: "right" }}>
                      {"+" + Math.round(selectionfirst - selectionsecond) + "%"}
                    </span>
                  </small>
                }
              />
            }
            UBW={
              <Lock
                data={
                  <small className="text-muted">
                    <span className="Unibet">${UBW}</span>
                  </small>
                }
              />
            }
            UBP={
              <Lock
                data={
                  <small className="text-muted">
                    <span className="Unibet">${UBP}</span>
                  </small>
                }
              />
            }
            SBW={
              <Lock
                data={
                  <small className="text-muted">
                    <span className="SportsBetting">${SBW}</span>
                  </small>
                }
              />
            }
            SBP={
              <Lock
                data={
                  <small className="text-muted">
                    <span className="SportsBetting">${SBP}</span>
                  </small>
                }
              />
            }
            PID={zone.point_id}
            key={i}
            isMob={1}
            Rname={Rname}
            Rdate={zone.meetdate}
            Rnum={Rnum}
            pros={this.props}
            dark={this.props.dark}
          />
        </div>
      );
    });
    return next;
  }

  render() {
    return (
      <>
        {!this.props.loadingNext10 ? (
          this.NextRender()
        ) : (
          <div style={{ margin: "auto", marginTop: 5 }}>
            <CircularProgress style={{ color: "green" }} size={24} />
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  next10Tips: state.selectionReducer.dataNext,
  loadingNext10: state.selectionReducer.loadingNext,
  showNextNR: state.selectionReducer.showNextNR,
});

export default withRouter(connect(mapStateToProps)(Next10));
