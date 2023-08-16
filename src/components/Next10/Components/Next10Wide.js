import React from "react";
import { Col, Row } from "reactstrap";
import "../next10.scss";

import { withRouter, Link } from "react-router-dom";
import moment from "moment-timezone";
import { connect } from "react-redux";
import { trackColor } from "../../../config/racesUtils";

/* REDUX */
// import raceAction from '../../../redux/actions/race'
import { checkRouteDate } from "../../../config/utils";
function Next10Wide({
  TName,
  TNum,
  RTime,
  HNumber,
  Percent,
  Addpercent,
  UBW,
  UBP,
  SBW,
  SBP,
  PID,
  isMob,
  eq,
  Rname,
  Rdate,
  Rnum,
  pros,
  dark,
  finalTrackCondition,
  isNR,
  trackCondition,
  showCTCN,
  BbUrl
}) {

  const nrBadgeRender = (isNR) => {
    if (isNR === 1) {
      return (
        <div
          style={{
            backgroundColor: "#F64E60",
            borderRadius: 5,
            color: "white",
            fontSize: 12,
            textAlign: "center",
            minWidth: 20,
          }}
        >
          NR
        </div>
      );
    }
    return "";
  };

  return (
    <div
      key={PID}
      className="pointer box-shadow"
      style={{
        marginTop: 8,
        padding: "2px 0px",
        backgroundColor: dark ? "#1D1D1C" : "white",
        borderRadius: "4px",
        minWidth: window.innerWidth < 1200 ? "230px" : "180px",
      }}
    >
      <Col xs="12" md="12" lg="12" style={{ padding: "4px" }}>
        <Link
          to={`/horse-racing-tips/${checkRouteDate(
            moment(Rdate).tz("Australia/Sydney").format("DD-MM-YYYY")
          )}/${Rname}/R${Rnum}/${PID}`}
        >
          <Row style={{ margin: 0, padding: 0, paddingRight: 5 }}>
            <Col xs={8} style={{ margin: 0, padding: 0 }}>
              <small className="track">{TName}</small>
            </Col>
            <Col xs={4} style={{ margin: 0, padding: 0 }}>
              <Row style={{ margin: 0, padding: 0 }}>
                <Col
                  xs={5}
                  style={{
                    textAlign: "left",
                    fontSize: 13,
                    color: "#0f72b5",
                    fontWeight: "500",
                  }}
                >
                  R{TNum}
                </Col>
                <Col
                  xs={7}
                  style={{ textAlign: "right", margin: 0, padding: 0 }}
                >
                  {RTime}
                </Col>
              </Row>
            </Col>
          </Row>

          <Row style={{ margin: 0, padding: 0, paddingRight: 5 }}>
            <Col xs={6} style={{ margin: 0, padding: 0 }}>
              <Row style={{ margin: 0, padding: 0 }}>
                <Col
                  xs={8}
                  style={{ margin: 0, padding: 0, textAlign: "left" }}
                >
                  {HNumber}
                </Col>
                <Col xs={4}>
                  {showCTCN && (
                    <div
                      style={{
                        textAlign: "center",
                        background: trackColor(trackCondition),
                        fontWeight: 600,
                        fontSize: 12,
                        color: "white",
                        borderRadius: 5,
                        minWidth: 25,
                      }}
                    >
                      {finalTrackCondition}
                    </div>
                  )}
                </Col>
              </Row>
            </Col>
            <Col xs={6} style={{ margin: 0, padding: 0 }}>
              <Row style={{ margin: 0, padding: 0 }}>
                <Col xs={4} style={{ textAlign: "left" }}>
                  {nrBadgeRender(isNR)}
                </Col>
                <Col
                  xs={4}
                  style={{ textAlign: "left", color: "#0f72b5", fontSize: 12 }}
                >
                  {Percent}
                </Col>
                <Col xs={4} style={{ textAlign: "left" }}>
                  {Addpercent}
                </Col>
              </Row>
            </Col>
          </Row>
          <hr
            style={{ backgroundColor: "gray", opacity: 0.4, marginTop: "2px" }}
          />
        </Link>

        <Row style={{ margin: 0, padding: 0, paddingRight: 5 }}>
          <Col xs={6} style={{ margin: 0, padding: 0 }}>
            <a
              target="_blank"
              href={BbUrl}
            >
              <Row style={{ margin: 0, padding: 0 }}>
                <Col xs={4} style={{ margin: 0, padding: 0 }}>
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
                      marginRight: "8px",
                      height: "20px",
                    }}
                  >
                    BB
                  </div>
                </Col>
                <Col
                  xs={4}
                  style={{ margin: 0, padding: 0, textAlign: "center" }}
                >
                  {SBW}
                </Col>
                <Col
                  xs={4}
                  style={{ margin: 0, padding: 0, textAlign: "center" }}
                >
                  {SBP}
                </Col>
              </Row>
            </a>
          </Col>
          <Col xs={6} style={{ margin: 0, padding: 0 }}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://b1.trickyrock.com/redirect.aspx?pid=31144281&bid=21418"
            >
              <Row style={{ margin: 0, padding: 0 }}>
                <Col xs={4}>
                  <div>
                    <img
                      style={{
                        objectFit: "contain",
                        height: "20px",
                        borderRadius: "5px",
                      }}
                      src={
                        "https://dnu5embx6omws.cloudfront.net/Logos/unibet/30x30@2x.png"
                      }
                      alt=""
                    />
                  </div>
                </Col>
                <Col
                  xs={4}
                  style={{ margin: 0, padding: 0, textAlign: "center" }}
                >
                  {UBW}
                </Col>
                <Col
                  xs={4}
                  style={{ margin: 0, padding: 0, textAlign: "center" }}
                >
                  {UBP}
                </Col>
              </Row>
            </a>
          </Col>
        </Row>
      </Col>
    </div>
  );
}

const mapStateToProps = (state) => ({

});

export default withRouter(connect(mapStateToProps)(Next10Wide));
