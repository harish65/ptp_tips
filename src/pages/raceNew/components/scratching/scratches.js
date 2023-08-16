import React from "react";
import { Table, Badge, Col } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { silkSize } from "../../../../config/racesUtils";
import moment from "moment-timezone";

const Scratchings = (props) => {
  const handleLateScratching = (scrTime) => {
    if (
      scrTime &&
      props.trackInfo.length > 0 &&
      props.trackInfo[0].meetdate &&
      props.trackInfo[0].race_time
    ) {
      let raceTime = moment(
        `${props.trackInfo[0].meetdate} ${props.trackInfo[0].race_time}`
      );
      let scratchingTime = moment(scrTime);
      let diffrence = raceTime.diff(scratchingTime, "seconds");

      if (diffrence / 60 <= 10) {
        return (
          <div style={{ paddingRight: 12, paddingTop: 12 }}>
            Late Scratching
          </div>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
  return (
    <div style={{ marginTop: 16 }}>
      <Table striped bordered style={{ backgroundColor: "white" }}>
        <thead>
          <tr>
            <th style={{ width: "4%", textAlign: "center" }}>#</th>
            <th style={{ width: "82%" }}>Horse</th>
            <th style={{ backgroundColor: "transparent", textAlign: "center" }}>
              {/* <div style={{ padding: 18 }}> <Badge style={{ backgroundColor: "#f16921", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }} ><strong style={{ color: 'white' }}><img className="bookie-logo" style={{ width: 24 }} src={'https://dnu5embx6omws.cloudfront.net/Logos/sportsbetting/30x30@2x.png'} alt="" /></strong></Badge></div> */}
              <Badge
                style={{
                  backgroundColor: "#e12b80",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 4.7,
                }}
              >
                <p style={{ color: "white" }}>BB</p>
              </Badge>
            </th>
            <th style={{ backgroundColor: "transparent" }}>
              <Badge
                style={{
                  backgroundColor: "#111111",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}
              >
                <img
                  className="bookie-logo"
                  style={{ width: 24 }}
                  src={
                    "https://dnu5embx6omws.cloudfront.net/Logos/unibet/30x30@2x.png"
                  }
                  alt="unibet"
                />
              </Badge>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            // eslint-disable-next-line array-callback-return
            props.horses.map((element, i) => {
              if (
                element.horse_status === "Scratched" ||
                element.horse_status === "LateScratching"
              ) {
                return (
                  <tr key={i} style={{ backgroundColor: "white" }}>
                    <td style={{ padding: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <p>
                          <strong>{element?.horse_number}</strong>
                        </p>
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            backgroundImage:
                              "url(" + element?.horse_silksUrl + ")",
                            backgroundPositionX: silkSize(
                              element.horse_number - 1
                            ),
                            marginTop: -14,
                          }}
                        ></div>
                      </div>
                    </td>

                    <td style={{ padding: 0 }}>
                      <div style={{ marginLeft: 4 }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div style={{ textAlign: "Left" }}>
                            <p>
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontWeight: "700",
                                  fontSize: 14,
                                }}
                              >
                                {element?.horse_name}
                              </span>
                            </p>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                marginTop: -16,
                              }}
                            >
                              {element?.scr_time && (
                                <p style={{ fontSize: 12 }}>
                                  {moment(element?.scr_time).format("lll")}
                                </p>
                              )}
                            </div>
                          </div>
                          {handleLateScratching(element?.scr_time)}
                        </div>
                      </div>
                    </td>

                    <td
                      style={{ padding: 0, textAlign: "center", paddingTop: 8 }}
                    >
                      <a href={props.bookie} target="blank">
                        <Col style={{ marginBottom: -8, fontSize: 11 }}>
                          <strong>{Number(element.ub_win).toFixed(2)}</strong>
                        </Col>
                        <Col>------</Col>
                        <Col style={{ marginTop: -4, fontSize: 11 }}>
                          <span>{Number(element.ub_place).toFixed(2)}</span>
                        </Col>
                      </a>
                    </td>

                    <td
                      style={{ padding: 0, textAlign: "center", paddingTop: 8 }}
                    >
                      <a href={props.bookie} target="blank">
                        <Col style={{ marginBottom: -8, fontSize: 11 }}>
                          <strong>{Number(element.sb_win).toFixed(2)}</strong>
                        </Col>
                        <Col>------</Col>
                        <Col style={{ marginTop: -4, fontSize: 11 }}>
                          <span>{Number(element.sb_place).toFixed(2)}</span>
                        </Col>
                      </a>
                    </td>
                  </tr>
                );
              }
            })
          }
        </tbody>
      </Table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  horses: state.raceReducer.horsesOpt,
  trackInfo: state.raceReducer.trackInfoOpt,
});

export default withRouter(connect(mapStateToProps)(Scratchings));
