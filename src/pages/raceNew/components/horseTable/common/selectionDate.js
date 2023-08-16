import React from "react";
import { connect } from "react-redux";
import moment from "moment-timezone";

import { Badge } from "reactstrap";

export const SelectionDate = (props) => {
  const renderSelectiondate = () => {
    const gen = () => {
      if (props.trackInfo[0]?.is_na !== 1) {
        if (props.genTime.length <= 0) {
          return null;
        }
        if (props.genTime.length === 1) {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                bsckgroundColor: "white",
              }}
            >
              <p>
                {moment(props.genTime[0]?.generation_time).format("dddd ")} at{" "}
                {moment(props.genTime[0]?.generation_time).format("HH:mm:ss")}{" "}
                AEDT{" "}
                <Badge style={{ backgroundColor: "grey", paddingTop: 3 }}>
                  Latest
                </Badge>
              </p>
            </div>
          );
        } else if (props.genTime.length === 2) {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "white",
              }}
            >
              <p style={{ color: props.dark ? "white" : "black" }}>
                {moment(props.genTime[0]?.generation_time).format("dddd")} at{" "}
                {moment(props.genTime[0]?.generation_time).format("HH:mm:ss")}{" "}
                AEDT{" "}
                <Badge style={{ backgroundColor: "grey", paddingTop: 3 }}>
                  Latest
                </Badge>
              </p>
              <p
                style={{
                  marginLeft: 16,
                  color: props.dark ? "white" : "black",
                }}
              >
                {moment(props.genTime[1]?.generation_time).format("dddd")} at{" "}
                {moment(props.genTime[1]?.generation_time).format("HH:mm:ss")}{" "}
                AEDT{" "}
              </p>
            </div>
          );
        } else if (props.genTime.length === 3) {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "white",
              }}
            >
              <p style={{ color: props.dark ? "white" : "black" }}>
                {moment(props.genTime[0]?.generation_time).format("dddd")} at{" "}
                {moment(props.genTime[0]?.generation_time).format("HH:mm:ss")}{" "}
                AEDT{" "}
              </p>
              <p
                style={{
                  marginLeft: 16,
                  color: props.dark ? "white" : "black",
                }}
              >
                {moment(props.genTime[1]?.generation_time).format("dddd")} at{" "}
                {moment(props.genTime[1]?.generation_time).format("HH:mm:ss")}{" "}
                AEDT{" "}
              </p>
              <p
                style={{
                  marginLeft: 16,
                  color: props.dark ? "white" : "black",
                }}
              >
                {moment(props.genTime[2]?.generation_time).format("dddd")} at{" "}
                {moment(props.genTime[2]?.generation_time).format("HH:mm:ss")}{" "}
                AEDT{" "}
              </p>
            </div>
          );
        } else if (props.genTime.length > 3) {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "white",
              }}
            >
              <p style={{ color: props.dark ? "white" : "black" }}>
                {" "}
                {moment(props.genTime[0]?.generation_time).format(
                  "dddd"
                )} at{" "}
                {moment(props.genTime[0]?.generation_time).format("HH:mm:ss")}{" "}
                AEDT{" "}
                <Badge
                  style={{
                    backgroundColor: "grey",
                    paddingTop: 4,
                    marginTop: -32,
                  }}
                >
                  Latest
                </Badge>
              </p>
              <p
                style={{
                  marginLeft: 16,
                  color: props.dark ? "white" : "black",
                }}
              >
                {" "}
                {moment(props.genTime[1]?.generation_time).format(
                  "dddd"
                )} at{" "}
                {moment(props.genTime[1]?.generation_time).format("HH:mm:ss")}{" "}
                AEDT{" "}
              </p>
              <p
                style={{
                  marginLeft: 16,
                  color: props.dark ? "white" : "black",
                }}
              >
                {" "}
                {moment(props.genTime[2]?.generation_time).format(
                  "dddd"
                )} at{" "}
                {moment(props.genTime[2]?.generation_time).format("HH:mm:ss")}{" "}
                AEDT{" "}
              </p>
              <p
                style={{
                  marginLeft: 16,
                  color: props.dark ? "white" : "black",
                }}
              >
                {" "}
                {moment(props.genTime[3]?.generation_time).format(
                  "dddd"
                )} at{" "}
                {moment(props.genTime[3]?.generation_time).format("HH:mm:ss")}{" "}
                AEDT{" "}
              </p>
            </div>
          );
        }
      }
    };

    if (props.genTime) {
      if (window.innerWidth > 769) {
        return (
          <div
            style={{
              backgroundColor: props.dark ? "#1D1D1C" : "white",
              padding: 8,
              paddingBottom: -8,
              marginTop: props.dark ? -16 : 8,
            }}
          >
            <strong style={{ color: props.dark ? "white" : "black" }}>
              This Race's Selections were generated on:
            </strong>
            <div style={{ marginTop: 4 }}>{gen()}</div>
            <hr style={{ marginTop: -4 }} />
          </div>
        );
      } else {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: props.dark ? "#1D1D1C" : "white",
              padding: 8,
            }}
          >
            <strong>This Race's Selections were generated on</strong>
            <span>
              {moment(props.genTime[0]?.generation_time).format("dddd")} at{" "}
              {moment(props.genTime[0]?.generation_time).format("HH:mm:ss")}{" "}
              AEDT
            </span>
          </div>
        );
      }
    }
  };

  return renderSelectiondate();
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SelectionDate);
