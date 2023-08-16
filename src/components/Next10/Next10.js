import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment-timezone";
import "./next10.scss";
import Timer from "../Timer";
/* REDUX */
import actions from "../../redux/actions/selections";
import raceAction from "../../redux/actions/race";
// import getRaceSelected from '../../redux/actions/raceSelected'
import { CircularProgress } from "@material-ui/core";

import Lock from "../Lock/Lock";
import Next10Wide from "./Components/Next10Wide";
// import Next10Regular from './Components/Next10Regular';
// import Next10small from './Components/Next10small'
// import { checkRouteDate } from '../../config/utils'
import { fullTrackCond } from "../../config/racesUtils";

import SkeletonText from "../Skeletons/SkeletonText";
import { Responsive } from "semantic-ui-react";
import { ConvertUTCTimeToLocalTime, ConvertUTCTimeToLocalTime1 } from "../../config/utils";

class Next10 extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(actions.getNextTen(this.props.showNextNR));
    this.interval = setInterval(() => {
      // if (!document.hidden) {
      dispatch(actions.getNextTenNoReload(this.props.showNextNR));
      // }
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
        passDate: ConvertUTCTimeToLocalTime1(moment(meetdate).format("YYYY-MM-DD")),
      })
    );
    // this.props.history.push(`/horse-racing-tips/race/${p_id}`)
    window.scrollTo(0, 0);
  }

  equalselec(first, second, third, fourth, nb1, nb2, nb3, nb4) {
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
  }

  equalrender(first, second, track_cond) {
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
  }

  equalodds(first, second, odd) {
    if (Math.round(first - second) === 0) {
      return "-.-";
    } else return odd;
  }


  // nrBadgeRender(data, condition) {
  //   if (condition === 1) {
  //     let final =
  //       <div style={{ display: "flex" }}>
  //         <div style={{ backgroundColor: '#F64E60', borderRadius: "4px", color: "white", fontSize: "11px", width: "20px", display: "flex", justifyContent: "center", marginTop: "2px", alignItems: "baseline", padding: "0px", marginRight: "2px" }}>NR</div>
  //         <div style={{ marginLeft: "5px" }}>{data}</div>
  //       </div>
  //     return (final)
  //   } else {
  //     return (data)
  //   }
  // }
  
  NextRender() {
    var next = this.props.next10Tips.map((zone, i) => {
      // console.log(zone.sb_venue_id)
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
      var finalTrackCondition = fullTrackCond(zone.full_track_condition);

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

      // var BBid = zone.sb_venue_id
      // var UbId = zone.unibet_venue_id
      // let url = "https://www.boombet.com.au/racing/" + B
      // let Uburl = "https://www.unibet.com.au/racing#/event/" + UbId

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
            SBW = "-,-";
            SBP = "-,-";
          }
          if (index.ub_win) {
            UBW = Number(index.ub_win).toFixed(2);
            UBP = Number(index.ub_place).toFixed(2);
          } else {
            UBW = "-,-";
            UBP = "-,-";
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
      let BbId = zone.sb_venue_id
      let BbUrl = "https://www.boombet.com.au/racing/" + BbId + "/?Referrer=PTPTips"
      var formatted = ConvertUTCTimeToLocalTime(moment(zone.race_time, "HH:mm").format("HH:mm"));
      if (this.props.showNextNR === true) {
        this.func(i === 0 ? zone : this.props.next10Tips[i - 1], zone);
        return (
          <div
            className="next10card"
            key={i}
            style={{ marginRight: window.innerWidth < 1200 ? 8 : 0 }}
          >
            <Next10Wide
              BbUrl = {BbUrl}
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
                      No.
                      {this.equalselec(
                        selectionfirst,
                        selectionsecond,
                        selectionthird,
                        selectionfourth,
                        horsenb1,
                        horsenb2,
                        horsenb3,
                        horsenb4
                      )}
                    </small>
                  }
                />
              }
              Percent={<Lock data={Math.round(selectionfirst) + "%"} />}
              isNR={zone.is_na}
              Addpercent={
                <Lock
                  data={this.equalrender(
                    selectionfirst,
                    selectionsecond,
                    zone.track_condition
                  )}
                />
              }
              UBW={
                <Lock
                  data={
                    <Responsive>
                      <small className="text-muted">
                        <span
                          className={this.props.dark ? "" : "Unibet"}
                          style={{ minWidth: "4px" }}
                        >
                          $
                          {this.equalodds(selectionfirst, selectionsecond, UBW)}
                        </span>
                      </small>
                    </Responsive>
                  }
                />
              }
              UBP={
                <Lock
                  data={
                    <Responsive>
                      <small className="text-muted">
                        <span
                          className={this.props.dark ? "" : "Unibet"}
                          style={{ minWidth: "4px" }}
                        >
                          $
                          {this.equalodds(selectionfirst, selectionsecond, UBP)}
                        </span>
                      </small>
                    </Responsive>
                  }
                />
              }
              SBW={
                <Lock
                  data={
                    <Responsive>
                      <small className="text-muted">
                        <span
                          className="SportsBetting"
                          style={{ minWidth: "4px" }}
                        >
                          $
                          {this.equalodds(selectionfirst, selectionsecond, SBW)}
                          {/* <b>N/A</b> */}
                        </span>
                      </small>
                    </Responsive>
                  }
                />
              }
              SBP={
                <Lock
                  data={
                    <Responsive>
                      <small className="text-muted">
                        <span
                          className="SportsBetting"
                          style={{ minWidth: "4px" }}
                        >
                          $
                          {this.equalodds(selectionfirst, selectionsecond, SBP)}
                        </span>
                      </small>
                    </Responsive>
                  }
                />
              }
              PID={zone.point_id}
              Rname={Rname}
              Rdate={zone.meetdate}
              Rnum={Rnum}
              pros={this.props}
              dark={this.props.dark}
              finalTrackCondition={finalTrackCondition}
              trackCondition={zone.track_condition}
              showCTCN={this.props.showCTCN}
            //  eq={this.equalselec(zone.selections_first_horse, zone.selections_second_horse)}
            />
          </div>
        );
      } else if (this.props.showNextNR === false && zone.is_na === 0) {
        return (
          <div
            className="next10card"
            key={i}
            style={{ marginRight: window.innerWidth < 1200 ? 8 : 0 }}
          >
            <Next10Wide
              BbUrl = {BbUrl}
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
                      No.
                      {this.equalselec(
                        selectionfirst,
                        selectionsecond,
                        selectionthird,
                        selectionfourth,
                        horsenb1,
                        horsenb2,
                        horsenb3,
                        horsenb4
                      )}
                    </small>
                  }
                />
              }
              Percent={<Lock data={Math.round(selectionfirst) + "%"} />}
              isNR={zone.is_na}
              Addpercent={
                <Lock
                  data={this.equalrender(
                    selectionfirst,
                    selectionsecond,
                    zone.track_condition
                  )}
                />
              }
              UBW={
                <Lock
                  data={
                    <small className="text-muted">
                      <span className={this.props.dark ? "" : "Unibet"}>
                        ${this.equalodds(selectionfirst, selectionsecond, UBW)}
                      </span>
                    </small>
                  }
                />
              }
              UBP={
                <Lock
                  data={
                    <small className="text-muted">
                      <span className={this.props.dark ? "" : "Unibet"}>
                        ${this.equalodds(selectionfirst, selectionsecond, UBP)}
                      </span>
                    </small>
                  }
                />
              }
              SBW={
                <Lock
                  data={
                    <small className="text-muted">
                      <span className="SportsBetting">
                        ${this.equalodds(selectionfirst, selectionsecond, SBW)}
                        {/* <b>N/A</b> */}
                      </span>
                    </small>
                  }
                />
              }
              SBP={
                <Lock
                  data={
                    <small className="text-muted">
                      <span className="SportsBetting">
                        ${this.equalodds(selectionfirst, selectionsecond, SBP)}
                        {/* <b>N/A</b> */}
                      </span>
                    </small>
                  }
                />
              }
              PID={zone.point_id}
              Rname={Rname}
              Rdate={zone.meetdate}
              Rnum={Rnum}
              pros={this.props}
              dark={this.props.dark}
              finalTrackCondition={finalTrackCondition}
              trackCondition={zone.track_condition}
              showCTCN={this.props.showCTCN}
            //  eq={this.equalselec(zone.selections_first_horse, zone.selections_second_horse)}
            />
          </div>
        );
      }
    });
    return next;
  }

  render() {
    // console.log(this.props.showNextNR);
    return (
      <>
        {!this.props.loadingNext10 ? (
          this.NextRender()
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
          <SkeletonText dark={this.props.dark} />
        )}
      </>
    );
  }
  // Tmrw tips function
  func = (last, current) => {
    const tday = moment(last?.meetdate);
    const tmrw = moment(current?.meetdate);
    const aftertmrw = moment()
      .tz("Australia/Sydney")
      .add(2, "day")
      .format("YYYY-MM-DD");

    const diff = tmrw.diff(tday, "days");
    const diffAfter = moment(tmrw).diff(aftertmrw, "days");
    if (diff === 1) {
      if (window.innerWidth > 1200) {
        return (
          <div style={{ margin: "5px", paddingTop: 3, paddingBottom: 3 }}>
            <hr style={{ marginTop: 3, marginBottom: 3 }}></hr>
            <p style={{ margin: "0px", fontSize: 16 }}>
              <b style={{ color: "black", height: "20px" }}>
                {diffAfter !== 1
                  ? `${moment(aftertmrw)
                    .tz("Australia/Sydney")
                    .format("dddd")}'s Tips`
                  : `${moment(tmrw)
                    .tz("Australia/Sydney")
                    .format("dddd")}'s Tips`}{" "}
              </b>
            </p>
            <hr style={{ marginTop: 3, marginBottom: 3 }}></hr>
          </div>
        );
      } else {
        return (
          // <div style={{margin: 'center', paddingTop: 3, paddingBottom: 3}}>
          // {/* <hr style={{ margin:'center'}}></hr>  */}
          // {/* <div>{moment().tz("Australia/Sydney").format('dddd')}</div> */}
          //   {/* <p style={{margin: 'center'}}><b style={{color:'black', height:'20px', fontSize: '8px',writingMode: 'vertical-lr', textOrientation: 'upright'}}>
          //     {diffAfter ===1 ? `${moment(aftertmrw).tz("Australia/Sydney").format('dddd')}'s Tips` : `${moment(tmrw).tz("Australia/Sydney").format('dddd')}'s Tips`} </b></p> */}
          // {/* <hr style={{ margin:'center'}}></hr> */}
          // </div>
          <div
            style={{
              borderLeft: "4px solid #C0C0C0",
              height: "100%",
              marginRight: 8,
              marginTop: 8,
            }}
          ></div>
        );
      }
    }
  };
}

const mapStateToProps = (state) => ({
  next10Tips: state.selectionReducer.dataNext,
  loadingNext10: state.selectionReducer.loadingNext,
  showNextNR: state.selectionReducer.showNextNR,
  showCTCN: state.selectionReducer.showCTCN,
});

export default withRouter(connect(mapStateToProps)(Next10));
