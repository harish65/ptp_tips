import React from "react";
import { connect } from "react-redux";
import "../last10.scss";
import { Col, Row } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import moment from "moment-timezone";

/* REDUX */
import { trackColor } from "../../../config/racesUtils";
import { checkRouteDate } from "../../../config/utils";

function Last10Wide({
  TName,
  TNum,
  Result,
  HNumber,
  Percent,
  Addpercent,
  UBW,
  UBP,
  SBW,
  SBP,
  PID,
  Rname,
  Rdate,
  Rnum,
  dark,
  showCTCL,
  isNR,
  finalTrackCondition,
  trackCondition,
}) {
  const resultCheck = (value) => {
    if (value) {
      if (value === "WON") {
        return "textwon";
      } else if (value === "2ND") {
        return "textSecond";
      } else if (value === "3RD") {
        return "textThird";
      } else if (value === "LOST") {
        return "textLost";
      }
    } else return "textLost";
  };

  const resultTextCheck = (value) => {
    if (value === "WON") {
      return "1st";
    } else if (value) {
      return value;
    } else return "TBA";
  };

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
      <Col xs="12" md="12" lg="12" style={{ padding: "4px" }} rel="nofollow">
        <Link
          to={`/horse-racing-tips/${checkRouteDate(
            moment(Rdate).tz("Australia/Sydney").format("DD-MM-YYYY")
          )}/${Rname}/R${Rnum}/${PID}`}
          replace
          rel="nofollow"
        >
          <Row style={{ margin: 0, padding: 0, paddingRight: 5 }}>
            <Col xs={8} style={{ margin: 0, padding: 0 }}>
              <small className="track">{TName}</small>
            </Col>
            <Col xs={4} style={{ margin: 0, padding: 0 }}>
              <Row style={{ margin: 0, padding: 0 }}>
                <Col
                  xs={6}
                  style={{
                    textAlign: "left",
                    fontSize: 13,
                    color: "#0f72b5",
                    fontWeight: "500",
                  }}
                >
                  R{TNum}
                </Col>
                <Col xs={6} style={{ textAlign: "left" }}>
                  <small className={resultCheck(Result)}>
                    {resultTextCheck(Result)}
                  </small>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row style={{ margin: 0, padding: 0, paddingRight: 5 }}>
            <Col xs={6} style={{ margin: 0, padding: 0 }}>
              <Row style={{ margin: 0, padding: 0 }}>
                <Col
                  xs={7}
                  style={{
                    margin: 0,
                    padding: 0,
                    textAlign: "left",
                    color: "green",
                    fontWeight: 600,
                  }}
                >
                  No.{HNumber}
                </Col>
                <Col xs={5}>
                  {showCTCL && (
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
              rel="noreferrer"
              href="https://www.boombet.com.au/join/?Referrer=PTPTips"
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
                  <small>
                    <span className="SportsBetting">${SBW}</span>
                  </small>
                </Col>
                <Col
                  xs={4}
                  style={{ margin: 0, padding: 0, textAlign: "center" }}
                >
                  <small>
                    <span className="SportsBetting">${SBP}</span>
                  </small>
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
                  className="Unibet"
                  style={{ margin: 0, padding: 0, textAlign: "center" }}
                >
                  <small>
                    <span className="Unibet">${UBW}</span>
                  </small>
                </Col>
                <Col
                  xs={4}
                  className="Unibet"
                  style={{ margin: 0, padding: 0, textAlign: "center" }}
                >
                  <small>
                    <span className="Unibet">${UBP}</span>
                  </small>
                </Col>
              </Row>
            </a>
          </Col>
        </Row>
      </Col>
    </div>
  );
}

const mapStateToProps = (state) => ({});

export default withRouter(connect(mapStateToProps)(Last10Wide));
