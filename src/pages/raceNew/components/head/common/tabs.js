import React from "react";
import { connect } from "react-redux";
import {  withRouter, Link } from "react-router-dom";
import moment from "moment-timezone";
import raceAction from "../../../../../redux/actions/race";
import {
  checkRouteDate,
  ConvertUTCTimeToLocalTime,
} from "../../../../../config/utils";

export const Tabs = (props) => {
  const renderTabs = () => {
    if (props.trackInfo[0]?.is_future === "true") {
      return null;
    } else {
      const Class = (item) => {
        if (item?.race_num === props.trackInfo[0]?.race_num) {
          return "black";
        } else if (item?.first) {
          return "grey";
        } else {
          return "grey";
        }
      };
      const { allDayResult } = props;
      const circleTabs = allDayResult?.map((element, i) => {
        return (
          <Link
            key={"circle-" + i}
            to={`/horse-racing-tips/${checkRouteDate(
              moment(element.meetdate)
                .tz("Australia/Sydney")
                .format("DD-MM-YYYY")
            )}/${element.venue_name}/R${element.race_num}/${element.point_id}`}
            // onClick={() => handleCircleChange(element.race_num, i)}
            style={{
              // padding: 4,
              cursor: "pointer",
              // backgroundColor: 'transparent',
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: Class(element),
              backgroundColor: element?.first ? "#eef0f4" : null,
              width: 70,
              height: 70,
              marginRight: 1,
              borderRadius: 2,
              paddingLeft: 24,
              paddingRight: 24,
            }}
          >
            {element?.is_na === 0 && element?.result === "WON" ? (
              <strong style={{ color: "#FFA800", marginTop: 0, fontSize: 11 }}>
                1<span style={{ fontSize: 8 }}>st</span>
              </strong>
            ) : null}
            {element?.is_na === 0 && element?.result === "2ND" ? (
              <strong
                style={{
                  color: "rgb(9, 106, 179)",
                  marginTop: 0,
                  fontSize: 11,
                }}
              >
                2<span style={{ fontSize: 8 }}>nd</span>
              </strong>
            ) : null}
            {element?.is_na === 0 && element?.result === "3RD" ? (
              <strong
                style={{
                  color: "rgb(139, 52, 191)",
                  marginTop: 0,
                  fontSize: 11,
                }}
              >
                3<span style={{ fontSize: 8 }}>rd</span>
              </strong>
            ) : null}
            {element?.is_na === 0 && element?.result === "LOST" ? (
              <strong style={{ marginTop: 0, fontSize: 11, color: "red" }}>
                L
              </strong>
            ) : null}
            {element?.is_na === 1 ? (
              <strong style={{ color: "grey", marginTop: 0, fontSize: 11 }}>
                N/R
              </strong>
            ) : null}
            {element?.track_condition === "ABND" ? (
              <strong style={{ color: "#fa7800", marginTop: 0, fontSize: 11 }}>
                ABND
              </strong>
            ) : null}

            <strong style={{ fontSize: 16 }}>{element?.race_num}</strong>

            {element.first ? (
              <span style={{ fontSize: 11, marginTop: -3 }}>
                {element.first},{element.second},{element.third}
              </span>
            ) : (
              <span style={{ fontSize: 11, marginTop: -3 }}>
                {ConvertUTCTimeToLocalTime(
                  moment(element.race_time, "HH:mm:ss").format("HH:mm")
                )}
              </span>
            )}

            {element?.race_num === props.trackInfo[0]?.race_num ? (
              <div
                style={{
                  backgroundColor: "#44bd32",
                  height: 4,
                  width: "100%",
                  marginTop: 4,
                }}
              ></div>
            ) : null}
          </Link>
        );
      });

      return circleTabs;
    }
  };

  return renderTabs();
};

const mapStateToProps = (state) => ({
  loading: state.raceReducer.loading,
  trackInfo: state.raceReducer.trackInfoOpt,
  allDayResult: state.raceReducer.allDayResult,
});

const mapDispatchToProps = (dispatch) => ({
  getRaceNextOrLastOpt: (data, history, meetdate, trackcode) =>
    dispatch(
      raceAction.getRaceNextOrLastOpt(data, history, meetdate, trackcode)
    ),
  changeTab: (num) => dispatch(raceAction.changeTab(num)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Tabs));
