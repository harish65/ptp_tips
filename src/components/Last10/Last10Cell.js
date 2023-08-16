import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment-timezone";
import { CircularProgress } from "@material-ui/core";

import "./last10.scss";
/* REDUX */
import actions from "../../redux/actions/selections";
import raceAction from "../../redux/actions/race";
import selectionsAction from "../../redux/actions/selections";

import Last10Wide from "./Components/Last10Wide";
import { checkRouteDate } from "../../config/utils";

class last10Tips extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(actions.getLastTen(this.props.showLastNR));
    this.interval = setInterval(() => {
      dispatch(actions.getLastTenNoReload(this.props.showLastNR));
    }, 60000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  navigator(p_id, meetdate) {
    const { dispatch } = this.props;
    dispatch(raceAction.getRaceInfo({ raceId: p_id }));
    dispatch(
      selectionsAction.getSelectionsForDate({
        passDate: moment(meetdate).tz("Australia/Sydney").format("YYYY-MM-DD"),
      })
    );
    // this.props.history.push(`/horse-racing-tips/race/${p_id}`)
    window.scrollTo(0, 0);
  }

  last() {
    var last = this.props.last10Tips.map((zone, i) => {
      var Rname = zone.track_name;
      var Rnum = zone.race_num;
      var Rdate = checkRouteDate(
        moment(zone.meetdate).tz("Australia/Sydney").format("DD-MM-YYYY")
      );
      // console.log(moment(zone.meetdate).format('YYYY-MM-DD'))

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

      return (
        <div key={i} style={{ marginRight: 8 }}>
          <Last10Wide
            TName={zone.track_name}
            TNum={zone.race_num}
            Result={zone.result}
            HNumber={horsenb1}
            Percent={
              <small className="text_blue">
                <span>{Math.round(selectionfirst) + "%"}</span>
              </small>
            }
            Addpercent={
              <small className="text_blue">
                <span style={{ textAlign: "left" }}>
                  {"+" + Math.round(selectionfirst - selectionsecond) + "%"}
                </span>
              </small>
            }
            UBW={UBW}
            UBP={UBP}
            SBW={SBW}
            SBP={SBP}
            PID={zone.point_id}
            isMob={1}
            Rname={Rname}
            Rdate={zone.meetdate}
            Rnum={Rnum}
            pros={this.props}
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
  last10Tips: state.selectionReducer.dataLast,
  loadingLast10: state.selectionReducer.loadingLast,
  showLastNR: state.selectionReducer.showLastNR,
});

export default withRouter(connect(mapStateToProps)(last10Tips));
