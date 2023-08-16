import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Grow from "@material-ui/core/Grow";
import { Col, Badge } from "reactstrap";
import "./bar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHorseHead, faStar } from "@fortawesome/free-solid-svg-icons";
import Arrow from "../../../../assets/Icons/arrowDes.png";
import { connect } from "react-redux";

import raceAction from "../../../../redux/actions/race";
import unibet from "../../../../assets/Icons/unibetsm.png";

const styles = {
  root: {
    color: "#3a8589",
    height: 3,
    padding: "13px 0",
    width: "100%",
  },
  thumb: {
    width: 10,
    // backgroundColor: 'white',
    marginTop: 4,
    // marginLeft: -13,
    borderWidth: 100,
    "& .bar": {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
    },
    transition: "100ms ease-out",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  active: {},
  track: {
    backgroundColor: (props) => props.color, //coloring(this.props.pace),
    height: 24,
    borderRadius: 4,
    opacity: "40%",
    transition: "100ms ease-out",
  },
  rail: {
    color: "transparent",
    opacity: 1,
    height: 24,
    borderRadius: 4,
  },
  ubBadge: {
    backgroundColor: "rgba(128, 128, 128, 0)",
    color: "black",
    marginLeft: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    marginTop: 4,
  },
  sbBadge: {
    backgroundColor: "rgba(128, 128, 128, 0)",
    color: "black",
    marginLeft: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    padding: 2,
    marginTop: 4,
  },
};

const Bar = ({
  key,
  maxI,
  color,
  barrier,
  no,
  horseName,
  pace,
  value,
  horse,
  silkData,
  classes,
  maxFirm,
  maxHeavy,
  maxSoft,
  maxGood,
  maxSynth,
  ubMinOdd,
  trackCondition,
  isNa,
  reset,
  isLoggedIn,
  resetSpeedMap,
}) => {
  const [newValue, setNewValue] = useState(
    value ? (value < 90 ? value + 10 : value) : 10
  );

  const originalValue = value ? (value < 90 ? value + 10 : value) : 10;
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    // console.log('value', value, 'newValue', newValue, 'original', originalValue, 'horse', horse.horse_number)
    setNewValue(originalValue);
    resetSpeedMap();
    // console.log('horse no', no, value)

    if (window.innerWidth < 769) {
      setMobile(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  const PTP = (horse_number) => {
    return (
      <p
        key={horse_number + "PTP"}
        style={{ fontSize: 10, marginLeft: 4, zIndex: 100 }}
      >
        <Badge color="primary">
          <FontAwesomeIcon icon={faHorseHead} size="1x" />
        </Badge>
      </p>
    );
  };

  const FAV = (horse_number) => {
    return (
      <p
        key={horse_number + "FAV"}
        style={{ fontSize: 10, zIndex: 100, marginLeft: 4 }}
      >
        <Badge color="warning">
          <FontAwesomeIcon icon={faStar} size="1x" />
        </Badge>
      </p>
    );
  };

  const MM = (horse_number) => {
    return (
      <p key={horse_number + "MM"} style={{ fontSize: 10, marginBottom: -1 }}>
        <Badge
          style={{
            backgroundColor: "rgb(9, 106, 179)",
            color: "white",
            padding: 2.8,
          }}
        >
          <img alt="Arrow" src={Arrow} width="14px" />
        </Badge>
      </p>
    );
  };

  // const LMM = (horse_number) => {
  //     if (window.innerWidth > 769) {
  //         return <p key={horse_number + 'LMM'} style={{ fontSize: 10, marginRight: 2 }}><Badge color="danger" style={{ color: 'white', padding: 2.6 }}><img src={Arrow} width="14px" /></Badge></p>
  //     } else {
  //         return <p key={horse_number + 'LMM'} style={{ fontSize: 10, marginBottom: 2 }}><Badge color="danger" style={{ color: 'white', padding: 2.6 }}><img src={Arrow} width="14px" /></Badge></p>
  //     }
  // }

  const renderBadge = (
    element,
    maxFirm,
    maxHeavy,
    maxSoft,
    maxGood,
    maxSynth,
    ubMinOdd,
    trackCondition
  ) => {
    try {
      let horseOdds = element?.ub_win;
      let horseSelection;

      let finalBadge = [];
      if (trackCondition === "F") {
        horseSelection = element?.points_per_firm;
        if (horseSelection === maxFirm) {
          finalBadge.push(PTP(element.horse_number));
        }
      } else if (trackCondition === "G") {
        horseSelection = element?.points_per_good;
        if (horseSelection === maxGood) {
          finalBadge.push(PTP(element.horse_number));
        }
      } else if (trackCondition === "H") {
        horseSelection = element?.points_per_heavy;
        if (horseSelection === maxHeavy) {
          finalBadge.push(PTP(element.horse_number));
        }
      } else if (trackCondition === "SO") {
        horseSelection = element?.points_per_soft;
        if (horseSelection === maxSoft) {
          finalBadge.push(PTP(element.horse_number));
        }
      } else if (trackCondition === "SY") {
        horseSelection = element?.points_per_synth;
        if (horseSelection === maxSynth) {
          finalBadge.push(PTP(element.horse_number));
        }
      }

      if (horseOdds === ubMinOdd) {
        //render FAV
        finalBadge.push(FAV(element.horse_number));
      }
      if (element?.is_market_mover === 1) {
        //render MarketMover
        finalBadge.push(MM(element.horse_number));
      }
      // if (element?.horse_number === this.state.lmm) {
      //   finalBadge.push(LMM(element.horse_number))
      // }

      if (!isLoggedIn || isNa) {
        return null;
      }

      return <div style={{ display: "flex" }}>{finalBadge}</div>;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const Thumb = (props) => {
    if (mobile && newValue < 60) {
      if (newValue < 30) {
        return (
          <div
            style={{
              zIndex: 1,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
            {...props}
          >
            <span style={{ position: "absolute", left: -12, top: -12 }}>
              {silkData}
            </span>
            <span
              style={{
                display: "flex",
                position: "absolute",
                left: 18,
                top: -2,
              }}
            >
              <span
                style={{
                  color: "black",
                  fontWeight: 500,
                  marginRight: 3,
                  paddingTop: 0,
                }}
              >
                {no}.
              </span>
              <span
                style={{
                  textTransform: "uppercase",
                  color: "black",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  paddingTop: 0,
                }}
              >
                {horseName}
              </span>
              <span>
                {Number(horse?.ub_win) > Number(horse?.sb_win) ? (
                  <Badge style={styles.ubBadge}>
                    <img alt="Unibet" src={unibet} width={13} />
                    <span style={{ marginLeft: 4 }}>
                      ${Number(horse?.ub_win).toFixed(2)}
                    </span>
                  </Badge>
                ) : (
                  <div style={{ marginTop: -5 }}>
                    <Badge style={styles.sbBadge}>
                      <Badge
                        style={{
                          backgroundColor: "#e12b80",
                          width: 15,
                          height: "90%",
                          color: "white",
                          textAlign: "center",
                          margin: 0,
                          marginRight: 5,
                        }}
                      >
                        <span style={{ fontSize: 8, marginLeft: -4 }}>BB</span>
                      </Badge>
                      ${Number(horse?.sb_win).toFixed(2)}
                    </Badge>
                  </div>
                )}
              </span>
              {renderBadge(
                horse,
                maxFirm,
                maxHeavy,
                maxSoft,
                maxGood,
                maxSynth,
                ubMinOdd,
                trackCondition
              )}
            </span>
          </div>
        );
      } else {
        return (
          <div style={{ display: "flex" }} {...props}>
            <div
              style={{
                zIndex: 1,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 500 }}>
                {Number(horse?.ub_win) > Number(horse?.sb_win) ? (
                  <Badge style={styles.ubBadge}>
                    <img alt="Unibet" src={unibet} width={13} />
                    <span style={{ marginLeft: 4 }}>
                      ${Number(horse?.ub_win).toFixed(2)}
                    </span>
                  </Badge>
                ) : (
                  <Badge style={styles.sbBadge}>
                    <Badge
                      style={{
                        backgroundColor: "#e12b80",
                        width: 15,
                        height: "90%",
                        color: "white",
                        textAlign: "center",
                        margin: 0,
                        marginRight: 5,
                      }}
                    >
                      <span style={{ fontSize: 8, marginLeft: -4 }}>SB</span>
                    </Badge>
                    ${Number(horse?.sb_win).toFixed(2)}
                  </Badge>
                )}
              </span>
            </div>
            <div style={{ display: "flex", marginRight: -10 }}>
              <span style={{ marginTop: 0 }}>{silkData}</span>
              <span
                style={{
                  display: "flex",
                  position: "absolute",
                  left: 20,
                  top: 0,
                }}
              >
                <span
                  style={{
                    color: "black",
                    fontWeight: 500,
                    marginRight: 3,
                    paddingTop: -2,
                  }}
                >
                  {no}.
                </span>
                <span
                  style={{
                    textTransform: "uppercase",
                    color: "black",
                    fontWeight: 500,
                    marginRight: 5,
                    whiteSpace: "nowrap",
                    paddingTop: -2,
                  }}
                >
                  {horseName}
                </span>
                {renderBadge(
                  horse,
                  maxFirm,
                  maxHeavy,
                  maxSoft,
                  maxGood,
                  maxSynth,
                  ubMinOdd,
                  trackCondition
                )}
              </span>
            </div>
          </div>
        );
      }
    } else {
      if (value > 30) {
        return (
          <div style={{ display: "flex" }} {...props}>
            <div style={{ zIndex: 1, display: "flex" }}>
              <span
                style={{
                  color: "black",
                  fontWeight: 500,
                  marginRight: 3,
                  marginTop: 5,
                }}
              >
                {no}.
              </span>
              <span
                style={{
                  textTransform: "uppercase",
                  color: "black",
                  fontWeight: 500,
                  marginRight: 3,
                  whiteSpace: "nowrap",
                  marginTop: 5,
                }}
              >
                {horseName}
              </span>

              <span style={{ fontSize: 12, fontWeight: 500 }}>
                {Number(horse?.ub_win) > Number(horse?.sb_win) ? (
                  <Badge style={styles.ubBadge}>
                    <img alt="Unibet" src={unibet} width={13} />
                    <span style={{ marginLeft: 4 }}>
                      ${Number(horse?.ub_win).toFixed(2)}
                    </span>
                  </Badge>
                ) : (
                  <Badge style={styles.sbBadge}>
                    <Badge
                      style={{
                        backgroundColor: "#e12b80",
                        width: 15,
                        height: "90%",
                        color: "white",
                        textAlign: "center",
                        margin: 0,
                        marginRight: 5,
                      }}
                    >
                      <span style={{ fontSize: 8, marginLeft: -4 }}>BB</span>
                    </Badge>
                    ${Number(horse?.sb_win).toFixed(2)}
                  </Badge>
                )}
              </span>
            </div>
            <div style={{ display: "flex", marginRight: -10 }}>
              <span style={{ marginTop: 0 }}>{silkData}</span>
              <span style={{ position: "absolute", left: 15, top: 0 }}>
                {renderBadge(
                  horse,
                  maxFirm,
                  maxHeavy,
                  maxSoft,
                  maxGood,
                  maxSynth,
                  ubMinOdd,
                  trackCondition
                )}
              </span>
            </div>
          </div>
        );
      } else {
        return (
          <div style={{ display: "flex" }} {...props}>
            <div
              style={{
                zIndex: 1,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 500 }}>
                {Number(horse?.ub_win) > Number(horse?.sb_win) ? (
                  <Badge style={styles.ubBadge}>
                    <img alt="Unibet" src={unibet} width={13} />
                    <span style={{ marginLeft: 4 }}>
                      ${Number(horse?.ub_win).toFixed(2)}
                    </span>
                  </Badge>
                ) : (
                  <Badge style={styles.sbBadge}>
                    <Badge
                      style={{
                        backgroundColor: "#e12b80",
                        width: 15,
                        height: "90%",
                        color: "white",
                        textAlign: "center",
                        margin: 0,
                        marginRight: 5,
                      }}
                    >
                      <span style={{ fontSize: 8, marginLeft: -4 }}>BB</span>
                    </Badge>
                    ${Number(horse?.sb_win).toFixed(2)}
                  </Badge>
                )}
              </span>
            </div>
            <div style={{ display: "flex", marginRight: -10 }}>
              <span style={{ marginTop: 0 }}>{silkData}</span>
              <span
                style={{
                  display: "flex",
                  position: "absolute",
                  left: 18,
                  top: -2,
                }}
              >
                {renderBadge(
                  horse,
                  maxFirm,
                  maxHeavy,
                  maxSoft,
                  maxGood,
                  maxSynth,
                  ubMinOdd,
                  trackCondition
                )}
                <span
                  style={{
                    color: "black",
                    fontWeight: 500,
                    marginRight: 3,
                    marginLeft: 5,
                    marginTop: -1,
                  }}
                >
                  {no}.
                </span>
                <span
                  style={{
                    textTransform: "uppercase",
                    color: "black",
                    fontWeight: 500,
                    marginRight: 5,
                    whiteSpace: "nowrap",
                    marginTop: -1,
                  }}
                >
                  {horseName}
                </span>
              </span>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <Col
      lg={12}
      style={{
        marginTop: -28,
        display: "flex",
        flexDirection: "row",
        marginLeft: 4,
        paddingRight: 28,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            backgroundColor: "#e9ecef",
            borderRadius: 400,
            marginTop: 12,
            marginRight: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 0,
            opacity: "100%",
          }}
        >
          <strong>{barrier}</strong>
        </div>

        {barrier !== 1 ? (
          <div
            style={{
              backgroundColor: "#e9ecef",
              height: 24,
              width: 2,
              marginLeft: -4,
            }}
          ></div>
        ) : null}
      </div>
      <Grow
        in={true}
        style={{ transformOrigin: "0 0 0" }}
        {...(true ? { timeout: 500 } : {})}
      >
        <Slider
          key={`slider-${key}`}
          value={newValue}
          onChange={(e, value) => setNewValue(value)}
          ThumbComponent={Thumb}
          getAriaLabel={(index) => index === 0}
          defaultValue={value + 10}
          step={1}
          min={0}
          max={100}
          classes={{
            root: classes.root,
            thumb: classes.thumb,
            active: classes.active,
            rail: classes.rail,
            track: classes.track,
          }}
        />
      </Grow>
    </Col>
  );
};

const mapStateToProps = (state) => ({
  reset: state.raceReducer.resetSpeedMap,
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  resetSpeedMap: () => dispatch(raceAction.resetSpeedMap(false)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Bar));
