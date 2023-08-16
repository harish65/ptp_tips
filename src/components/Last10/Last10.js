import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import moment from 'moment';

import "./last10.scss";
/* REDUX */
import actions from "../../redux/actions/selections";
// import raceAction from '../../redux/actions/race'
// import selectionsAction from '../../redux/actions/selections'
import { fullTrackCond } from "../../config/racesUtils";
import { CircularProgress } from "@material-ui/core";
import Last10Wide from "./Components/Last10Wide";
// import Last10small from './Components/Last10small'
//import Last10Regular from './Components/Last10Regular';
import SkeletonText from "../Skeletons/SkeletonText";

// import { checkRouteDate } from '../../config/utils'

class last10Tips extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(actions.getLastTen(this.props.showLastNR));
    this.interval = setInterval(() => {
      // if (!document.hidden) {
      dispatch(actions.getLastTenNoReload(this.props.showLastNR));
      // }
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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

  equalrender(first, second) {
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

  TBACheck(value1, value2, result) {
    if (result === "TBA" || result === null) {
      return value1;
    } else {
      return value2;
    }
  }

  nrBadgeRender(data, condition) {
    if (condition === 1) {
      let final = (
        <div style={{ display: "flex" }}>
          <div
            style={{
              backgroundColor: "#F64E60",
              borderRadius: "4px",
              color: "white",
              fontSize: "11px",
              width: "20px",
              display: "flex",
              justifyContent: "center",
              marginTop: "2px",
              alignItems: "baseline",
              padding: "0px",
              marginRight: "2px",
            }}
          >
            NR
          </div>
          <div style={{ marginLeft: "5px" }}>{data}</div>
        </div>
      );
      return final;
    } else {
      let final = (
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "20px",
              marginTop: "2px",
              alignItems: "baseline",
              padding: "0px",
              marginRight: "2px",
            }}
          ></div>
          <div className="last10card" style={{ marginLeft: "5px" }}>
            {data}
          </div>
        </div>
      );
      return final;
    }
  }

  last() {
    var last = this.props.last10Tips.map((zone, i) => {
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

      // var horses = zone?.horses?.map((index, i) => {
      //   if (i === 0) {
      //     selectionfirst = index?.percentage;
      //     horsenb1 = index?.tab_no;
      //     if (index.sb_win) {
      //       SBW = Number(index.sb_win).toFixed(2);
      //       SBP = Number(index.sb_place).toFixed(2);
      //     } else {
      //       SBW = Number(0.0).toFixed(2);
      //       SBP = Number(0.0).toFixed(2);
      //     }
      //     if (index.ub_win) {
      //       UBW = Number(index.ub_win).toFixed(2);
      //       UBP = Number(index.ub_place).toFixed(2);
      //     } else {
      //       UBW = Number(0.0).toFixed(2);
      //       UBP = Number(0.0).toFixed(2);
      //     }
      //   } else if (i === 1) {
      //     selectionsecond = index?.percentage;
      //     horsenb2 = index?.tab_no;
      //   } else if (i === 2) {
      //     selectionthird = index?.percentage;
      //     horsenb3 = index?.tab_no;
      //   } else if (i === 3) {
      //     selectionfourth = index?.percentage;
      //     horsenb4 = index?.tab_no;
      //   }
      // });

      var Rname = zone.track_name;
      var Rnum = zone.race_num;
      // var Rdate = checkRouteDate(moment(zone.meetdate).format("DD-MM-YYYY"))

      return (
        <div key={i} style={{ marginRight: window.innerWidth < 1200 ? 8 : 0 }}>
          <Last10Wide
            TName={zone.track_name}
            TNum={zone.race_num}
            Result={zone.result}
            HNumber={this.TBACheck(
              this.equalselec(
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
            Percent={Math.round(selectionfirst) + "%"}
            isNR={zone.is_na}
            Addpercent={
              <small className="text_blue">
                <span style={{ textAlign: "left" }}>
                  {this.TBACheck(
                    this.equalrender(selectionfirst, selectionsecond),
                    "+" + Math.round(selectionfirst - selectionsecond) + "%",
                    zone.result
                  )}
                </span>
              </small>
            }
            UBW={this.TBACheck(
              this.equalodds(selectionfirst, selectionsecond, UBW),
              UBW,
              zone.result
            )}
            UBP={this.TBACheck(
              this.equalodds(selectionfirst, selectionsecond, UBP),
              UBP,
              zone.result
            )}
            SBW={this.TBACheck(
              this.equalodds(selectionfirst, selectionsecond, SBW),
              SBW,
              zone.result
            )}
            SBP={this.TBACheck(
              this.equalodds(selectionfirst, selectionsecond, SBP),
              SBP,
              zone.result
            )}
            PID={zone.point_id}
            Rname={Rname}
            Rdate={zone.meetdate}
            Rnum={Rnum}
            pros={this.props}
            dark={this.props.dark}
            finalTrackCondition={finalTrackCondition}
            trackCondition={zone.track_condition}
            showCTCL={this.props.showCTCL}
          />
        </div>
      );
    });
    return last;
  }
  render() {
    return (
      <>
        {!this.props.loadingLast10 ? (
          this.last()
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
}

const mapStateToProps = (state) => ({
  last10Tips: state.selectionReducer.dataLast,
  loadingLast10: state.selectionReducer.loadingLast,
  showLastNR: state.selectionReducer.showLastNR,
  showCTCL: state.selectionReducer.showCTCL,
});

export default withRouter(connect(mapStateToProps)(last10Tips));
