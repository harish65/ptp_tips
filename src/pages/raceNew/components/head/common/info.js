import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Row,
  Col,
} from "reactstrap";
import { Badge } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHorseHead, faStar } from "@fortawesome/free-solid-svg-icons";

/* ICONS */
import Arrow from "../../../../../assets/Icons/arrowDes.png";

const Infos = (props) => {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <div
      onClick={() => setInfoOpen(!infoOpen)}
      // style={{ backgroundColor: infoOpen ? '#44BD32' : '#E0E0E0', height: 30, width: 30, borderRadius: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
      style={{
        backgroundColor: infoOpen ? "#44bd32" : "#44bd32",
        color: "white",
        fontWeight: 600,
        borderRadius: 5,
        padding: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      {/* <Info fontSize='25' color={infoOpen ? 'white' : 'black'} /> */}
      {window.innerWidth < 1450 ? "Legend" : "View Legend"}

      <Modal isOpen={infoOpen} centered size={"xl"}>
        <ModalHeader>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <img
              alt="Logo"
              src="../../favicon.png"
              width="40px"
              className="logo-default max-h-40px mr-4"
            />
            <div style={{ fontSize: 24 }}>Abbreviations</div>
          </div>
        </ModalHeader>
        {window.innerWidth < 1000 ? (
          <ModalBody
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Row
              style={{ width: "100%", marginBottom: 10, padding: 0, margin: 0 }}
            >
              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>N/R</strong>: Not Recommended
              </Col>
              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>ABND</strong>: Abandoned Race
              </Col>
              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>EQ</strong>: Equal Selections
              </Col>
              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>Bk</strong>: BlackBook
              </Col>
              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>L</strong>: Length
              </Col>

              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>F</strong>: Firm Track
              </Col>
              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>G</strong>: Good Track
              </Col>
              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>SO</strong>: Soft Track
              </Col>
              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>H</strong>: Heavy Track
              </Col>
              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>SY</strong>: Synthetic Track
              </Col>

              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>J</strong>: Jockey
              </Col>
              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>W</strong>: Weight
              </Col>
              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>SF</strong>: Short Form
              </Col>
              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>T</strong>: Trainer
              </Col>
              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>B</strong>: Barrier
              </Col>

              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>CTC</strong>: Current Track Condition
              </Col>
              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>Dst</strong>: Distance
              </Col>
              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>Trk</strong>: Track
              </Col>
              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>BB</strong>: Boom Betting
              </Col>
              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>UB</strong>: Unibet
              </Col>

              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>r</strong>: rig
              </Col>
              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>h</strong>: horse
              </Col>
              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>m</strong>: mare
              </Col>
              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>g</strong>: gelding
              </Col>
              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>c</strong>: colt
              </Col>
              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>f</strong>: filly
              </Col>

              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>LR</strong>: Last Run
              </Col>
              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>LW</strong>: Last Win
              </Col>
              <Col xs={6} style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>LRW</strong>: Last Run Winner
              </Col>

              <Row
                style={{
                  backgroundColor: "grey",
                  height: "1px",
                  opacity: "50%",
                  width: "100%",
                  marginBottom: 10,
                }}
              ></Row>

              <Col
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  margin: 0,
                  marginBottom: 5,
                }}
              >
                <Badge color="primary" style={{ fontSize: 8 }}>
                  <FontAwesomeIcon icon={faHorseHead} size="1x" />
                </Badge>
                <strong style={{ marginLeft: 4 }}>PTP Rated Horse</strong>
              </Col>
              <Col
                xs={6}
                style={{
                  marginLeft: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  margin: 0,
                  marginBottom: 5,
                }}
              >
                <Badge color="warning" style={{ fontSize: 8 }}>
                  <FontAwesomeIcon icon={faStar} size="1x" />
                </Badge>
                <strong style={{ marginLeft: 4 }}>Favourite Horse</strong>
              </Col>
              <Col
                xs={6}
                style={{
                  marginLeft: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  margin: 0,
                  marginBottom: 5,
                }}
              >
                <Badge
                  color="primary"
                  style={{
                    fontSize: 4.5,
                    backgroundColor: "rgb(9, 106, 179)",
                    marginTop: -4,
                  }}
                >
                  <img alt="Arrow" src={Arrow} width="14px" />
                </Badge>
                <strong style={{ marginLeft: 4, marginTop: -4 }}>
                  Market Mover
                </strong>
              </Col>
              <Col
                xs={6}
                style={{
                  marginLeft: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  margin: 0,
                  marginBottom: 5,
                }}
              >
                <Badge color="danger" style={{ fontSize: 4.5, marginTop: -4 }}>
                  <img alt="Arrow" src={Arrow} width="14px" />
                </Badge>
                <strong style={{ marginLeft: 4, marginTop: -4 }}>
                  Late Market Mover
                </strong>
              </Col>
            </Row>
          </ModalBody>
        ) : (
          <ModalBody
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Row style={{ width: "100%", marginBottom: 10 }}>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>N/R</strong>: Not Recommended
              </Col>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>ABND</strong>: Abandoned Race
              </Col>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>EQ</strong>: Equal Selections
              </Col>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>Bk</strong>: BlackBook
              </Col>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>L</strong>: Length
              </Col>
            </Row>
            <Row style={{ width: "100%", marginBottom: 10 }}>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>F</strong>: Firm Track
              </Col>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>G</strong>: Good Track
              </Col>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>SO</strong>: Soft Track
              </Col>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>H</strong>: Heavy Track
              </Col>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>SY</strong>: Synthetic Track
              </Col>
            </Row>
            <Row style={{ width: "100%", marginBottom: 10 }}>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>J</strong>: Jockey
              </Col>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>W</strong>: Weight
              </Col>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>SF</strong>: Short Form
              </Col>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>T</strong>: Trainer
              </Col>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>B</strong>: Barrier
              </Col>
            </Row>
            <Row style={{ width: "100%", marginBottom: 10 }}>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>CTC</strong>: Current Track Condition
              </Col>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>Dst</strong>: Distance
              </Col>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>Trk</strong>: Track
              </Col>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>BB</strong>: Boom Betting
              </Col>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>UB</strong>: Unibet
              </Col>
            </Row>
            <Row style={{ width: "100%", marginBottom: 10 }}>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>r</strong>: rig
              </Col>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>h</strong>: horse
              </Col>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>m</strong>: mare
              </Col>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>g</strong>: gelding
              </Col>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>c</strong>: colt
              </Col>
            </Row>
            <Row style={{ width: "100%", marginBottom: 10 }}>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>f</strong>: filly
              </Col>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>LR</strong>: Last Run
              </Col>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>LW</strong>: Last Win
              </Col>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong>LRW</strong>: Last Run Winner
              </Col>
              <Col style={{ textAlign: "left", marginBottom: 5 }}>
                <strong> </strong>
              </Col>
            </Row>
            <Row
              style={{
                backgroundColor: "grey",
                height: "1px",
                opacity: "50%",
                width: "100%",
                marginBottom: 10,
              }}
            ></Row>
            <Row style={{ width: "100%", marginBottom: 10 }}>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Badge color="primary" style={{ fontSize: 8 }}>
                  <FontAwesomeIcon icon={faHorseHead} size="1x" />
                </Badge>
                <strong style={{ marginLeft: 4 }}>
                  PTP Highest Rated Horse
                </strong>
              </Col>
              <Col
                style={{
                  marginLeft: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Badge color="warning" style={{ fontSize: 8 }}>
                  <FontAwesomeIcon icon={faStar} size="1x" />
                </Badge>
                <strong style={{ marginLeft: 4 }}>
                  Favourite Horse (Lowest Odds)
                </strong>
              </Col>
              <Col
                style={{
                  marginLeft: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Badge
                  color="primary"
                  style={{
                    fontSize: 4.5,
                    backgroundColor: "rgb(9, 106, 179)",
                    marginTop: -4,
                  }}
                >
                  <img alt="Arrow" src={Arrow} width="14px" />
                </Badge>
                <strong style={{ marginLeft: 4, marginTop: -4 }}>
                  Market Mover
                </strong>
              </Col>
              <Col
                style={{
                  marginLeft: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Badge color="danger" style={{ fontSize: 4.5, marginTop: -4 }}>
                  <img alt='Arrow' src={Arrow} width="14px" />
                </Badge>
                <strong style={{ marginLeft: 4, marginTop: -4 }}>
                  Late Market Mover
                </strong>
              </Col>
            </Row>
          </ModalBody>
        )}

        <ModalFooter
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button onClick={() => setInfoOpen(false)} color="primary">
            <strong>Close</strong>
          </Button>
          {""}
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  trackInfo: state.raceReducer.trackInfoOpt,
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Infos);
