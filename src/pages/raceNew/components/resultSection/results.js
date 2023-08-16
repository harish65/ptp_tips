import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Table, Badge } from "reactstrap";
import { ConvertUTCTimeToLocalTime } from "../../../../config/utils";
import { silkSize, renderNames } from "../../../../config/racesUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal, faTrophy, faAward } from "@fortawesome/free-solid-svg-icons";
import moment from "moment-timezone";


const styles = {
  table: {
    // backgroundColor: 'white',
    borderRadius: 8,
    fontFamily: "Poppins",
  },
  horseNumber: {
    width: "6%",
    textAlign: "center",
    padding: 0,
    paddingBottom: 7,
  },
  pos: {
    width: "10%",
    textAlign: "center",
    padding: 7,
  },
  horse: {
    textAlign: "left",
    width: "auto",
    padding: 7,
  },
  odds: {
    width: "20%",
    textAlign: "center",
    padding: 7,
  },
  results: {
    width: "8%",
    textAlign: "center",
    padding: 7,
    paddingLeft: 1,
    paddingRight: 1,
  },
  cell: {
    // textAlign: 'center',
    padding: 0,
  },
  horseName: {
    fontSize: 11,
    textTransform: "uppercase",
  },
  position: {
    // padding: 0,
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop: "20%",
  },
  horseName_cell: {
    padding: 0,
  },
  horsName_div: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
    margin: 0,
    paddingLeft: 5,
    paddingTop: 5,
  },
  odds_cell: {
    textAlign: "center",
    padding: 0,
    flexDirection: "column",
  },
  odds_div: {
    color: "black",
    fontSize: 11,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  odds_div_mobile: {
    color: "black",
    fontSize: 11,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  odds_div_mobile_Row: {
    color: "black",
    fontSize: 11,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30%",
  },
  results_cell: {
    padding: 0,
    textAlign: "center",
    width: 90,
  },
  results_div: {
    marginTop: 8,
  },
  horseNumber_cell: {
    padding: 0,
  },
};

export const Result = ({ horses, trackInfo }) => {
  const checkHorseNumber = (row, horsesResult) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: 0,
        }}
      >
        <p>
          <strong>{horsesResult[row - 1]?.horse_number}</strong>
        </p>
        <div
          style={{
            width: 32,
            height: 32,
            backgroundImage:
              "url(" + horsesResult[row - 1]?.horse_silksUrl + ")",
            backgroundPositionX: silkSize(
              horsesResult[row - 1]?.horse_number - 1
            ),
            marginTop: -14,
          }}
        ></div>
      </div>
    );
  };
  
  const checkPosition = (row, horsesResult) => {
    if (row === 1) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <FontAwesomeIcon icon={faTrophy} size="1x" color="#ffa800" />
          <strong style={{ color: "#ffa800", marginLeft: 4 }}>1st</strong>
        </div>
      );
    } else if (row === 2 && horsesResult[1]?.position === 1) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            padding: 0,
            width: "auto",
          }}
        >
          <FontAwesomeIcon icon={faTrophy} size="1x" color="#ffa800" />
          <strong style={{ color: "#ffa800", marginLeft: 4 }}>1st</strong>
        </div>
      );
    } else if (row === 2 && horsesResult[1]?.position === 2) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            padding: 0,
            width: "auto",
          }}
        >
          <FontAwesomeIcon icon={faMedal} size="1x" color="#096ab3" />
          <strong style={{ color: "#096ab3", marginLeft: 4 }}>2nd</strong>
        </div>
      );
    } else if (row === 3 && horsesResult[2]?.position === 1) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            padding: 0,
            width: "auto",
          }}
        >
          <FontAwesomeIcon icon={faTrophy} size="1x" color="#ffa800" />
          <strong style={{ color: "#ffa800", marginLeft: 4 }}>1st</strong>
        </div>
      );
    } else if (row === 3 && horsesResult[2]?.position === 2) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            padding: 0,
            width: "auto",
          }}
        >
          <FontAwesomeIcon icon={faMedal} size="1x" color="#096ab3" />
          <strong style={{ color: "#096ab3", marginLeft: 4 }}>2nd</strong>
        </div>
      );
    } else if (row === 3 && horsesResult[2]?.position === 3) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            padding: 0,
            width: "auto",
          }}
        >
          <FontAwesomeIcon icon={faAward} size="1x" color="#8b34bf" />
          <strong style={{ color: "#8b34bf", marginLeft: 4 }}>3rd</strong>
        </div>
      );
    } else if (row === 4 && horsesResult[3]?.position === 1) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            padding: 0,
            width: "auto",
          }}
        >
          <FontAwesomeIcon icon={faTrophy} size="1x" color="#ffa800" />
          <strong style={{ color: "#ffa800", marginLeft: 4 }}>1st</strong>
        </div>
      );
    } else if (row === 4 && horsesResult[3]?.position === 2) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            padding: 0,
            width: "auto",
          }}
        >
          <FontAwesomeIcon icon={faMedal} size="1x" color="#096ab3" />
          <strong style={{ color: "#096ab3", marginLeft: 4 }}>2nd</strong>
        </div>
      );
    } else if (row === 4 && horsesResult[3]?.position === 3) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            padding: 0,
            width: "auto",
          }}
        >
          <FontAwesomeIcon icon={faAward} size="1x" color="#8b34bf" />
          <strong style={{ color: "#8b34bf", marginLeft: 4 }}>3rd</strong>
        </div>
      );
    } else if (row === 4 && horsesResult[3]?.position === 4) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            padding: 0,
            width: "auto",
          }}
        >
          <FontAwesomeIcon icon={faAward} size="1x" color="black" />
          <strong style={{ color: "black", marginLeft: 4 }}>4th</strong>
        </div>
      );
    }
  };

  const checkResult = (row, horsesResult) => {
    try {
      if (trackInfo[0]?.track_condition === "N/A") {
        return <div style={{ textAlign: "center" }}>N/A</div>;
      } else {
        if (trackInfo[0]?.result_status !== "DeadHeat") {
          if (row === 1 && trackInfo[0]?.result === "WON") {
            return badgeFirts();
          } else if (row === 1 && trackInfo[0]?.result === "LOST") {
            return badgeLost();
          } else if (row === 2 && trackInfo[0]?.result === "2ND") {
            return badgeSecond();
          } else if (row === 3 && trackInfo[0]?.result === "3RD") {
            return badgeThird();
          } else if (row === 4 && trackInfo[0]?.result === "4TH") {
            return badgeFourth();
          }
        } else {
          if (trackInfo[0]?.result === "WON") {
            if (
              row === 1 &&
              parseInt(trackInfo[0]?.deadheat_selection_pos.split(",")[0]) ===
                horsesResult[row - 1]?.horse_number
            ) {
              return badgeFirts();
            } else if (
              row === 2 &&
              parseInt(trackInfo[0]?.deadheat_selection_pos.split(",")[0]) ===
                horsesResult[row - 1]?.horse_number
            ) {
              return badgeFirts();
            } else if (
              row === 3 &&
              parseInt(trackInfo[0]?.deadheat_selection_pos.split(",")[0]) ===
                horsesResult[row - 1]?.horse_number
            ) {
              return badgeFirts();
            } else if (
              row === 4 &&
              parseInt(trackInfo[0]?.deadheat_selection_pos.split(",")[0]) ===
                horsesResult[row - 1]?.horse_number
            ) {
              return badgeFirts();
            }
          } else if (trackInfo[0]?.result === "2ND") {
            if (
              row === 2 &&
              parseInt(trackInfo[0]?.deadheat_selection_pos.split(",")[0]) ===
                horsesResult[row - 1]?.horse_number
            ) {
              return badgeSecond();
            } else if (
              row === 3 &&
              parseInt(trackInfo[0]?.deadheat_selection_pos.split(",")[0]) ===
                horsesResult[row - 1]?.horse_number
            ) {
              return badgeSecond();
            } else if (
              row === 4 &&
              parseInt(trackInfo[0]?.deadheat_selection_pos.split(",")[0]) ===
                horsesResult[row - 1]?.horse_number
            ) {
              return badgeSecond();
            }
          } else if (trackInfo[0]?.result === "3RD") {
            if (
              row === 3 &&
              parseInt(trackInfo[0]?.deadheat_selection_pos.split(",")[0]) ===
                horsesResult[row - 1]?.horse_number
            ) {
              return badgeThird();
            } else if (
              row === 4 &&
              parseInt(trackInfo[0]?.deadheat_selection_pos.split(",")[0]) ===
                horsesResult[row - 1]?.horse_number
            ) {
              return badgeThird();
            }
          } else if (trackInfo[0]?.result === "LOST") {
            if (row === 1) {
              return badgeLost();
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const badgeLost = () => {
    return (
      <div style={{ textAlign: "center" }}>
        <Badge
          color="danger"
          style={{
            minWidth: "calc(100% - 8px)",
            marginRight: 1,
            marginLeft: 1,
            padding: 3,
          }}
        >
          <strong style={{ color: "white" }}>LOST</strong>
        </Badge>
      </div>
    );
  };
  const badgeFirts = () => {
    return (
      <div style={{ textAlign: "center" }}>
        <Badge
          style={{
            minWidth: "calc(100% - 8px)",
            backgroundColor: "rgb(252, 179, 24",
            marginRight: 1,
            marginLeft: 1,
            padding: 3,
          }}
        >
          <strong style={{ color: "white" }}>1st</strong>
        </Badge>
      </div>
    );
  };
  const badgeSecond = () => {
    return (
      <div style={{ textAlign: "center" }}>
        <Badge
          style={{
            backgroundColor: "rgb(9, 106, 179)",
            minWidth: "calc(100% - 8px)",
            marginRight: 1,
            marginLeft: 1,
            padding: 3,
          }}
        >
          <strong style={{ color: "white" }}>2ND</strong>
        </Badge>
      </div>
    );
  };
  const badgeThird = () => {
    return (
      <div style={{ textAlign: "center" }}>
        <Badge
          style={{
            backgroundColor: "rgb(139, 52, 191)",
            minWidth: "calc(100% - 8px)",
            marginRight: 1,
            marginLeft: 1,
            padding: 3,
          }}
        >
          <strong style={{ color: "white" }}>3RD</strong>
        </Badge>
      </div>
    );
  };
  const badgeFourth = () => {
    return (
      <div style={{ textAlign: "center" }}>
        <Badge
          style={{
            backgroundColor: "black",
            minWidth: 80,
            marginRight: 1,
            marginLeft: 1,
            padding: 3,
          }}
        >
          <strong style={{ color: "white" }}>4TH</strong>
        </Badge>
      </div>
    );
  };

  const checkHorseName = (row, horsesResult) => {
    return (
      <div style={styles.horsName_div}>
        <strong style={styles.horseName}>
          {horsesResult[row - 1]?.horse_name}
        </strong>
        <span style={{ fontSize: 11 }}>
          {renderNames(horsesResult[row - 1]?.horse_jockey)}
        </span>
      </div>
    );
  };
  const bookie= (bookie, disableB) => {
    let BbId = trackInfo[0].sb_venue_id
    let BbUrl = "https://www.boombet.com.au/racing/" + BbId + "/?Referrer=PTPTips"
    if (!disableB) {
      if (bookie === "Unibet") {
        return 'https://b1.trickyrock.com/redirect.aspx?pid=31144281&bid=21418'
      }
      else if (bookie === 'sportsBetting') {
        return BbUrl;
      }
    }
  }

  const checkSBOdds = (row, horsesResult) => {
    if (horsesResult[row - 1]?.position === 1) {
      if (window.innerWidth > 700) {
        return (
          <a
            style={styles.odds_div}
            href={bookie("sportsBetting")}
            target="blank"
          >
            <strong style={{ color: "black" }}>
              ${parseFloat(horsesResult[row - 1]?.sb_win).toFixed(2)}
            </strong>
            <span
              style={{
                marginTop: -4,
                marginBottom: -4,
                marginLeft: 0,
                marginRight: 0,
              }}
            >
              <br />
            </span>
            <span style={{ color: "black" }}>
              ${parseFloat(horsesResult[row - 1]?.sb_place).toFixed(2)}
            </span>
          </a>
        );
      } else {
        return (
          <a
            style={styles.odds_div_mobile}
            href={bookie("sportsBetting")}
            target="blank"
          >
            <strong style={{ color: "black" }}>
              ${parseFloat(horsesResult[row - 1]?.sb_win).toFixed(2)}
            </strong>
            <span
              style={{
                marginTop: -4,
                marginBottom: -4,
                marginLeft: 0,
                marginRight: 0,
              }}
            >
              -
            </span>
            <span style={{ color: "black" }}>
              ${parseFloat(horsesResult[row - 1]?.sb_place).toFixed(2)}
            </span>
          </a>
        );
      }
    } else {
      if (window.innerWidth > 700) {
        return (
          <a
            style={styles.odds_div}
            href={bookie("sportsBetting")}
            target="blank"
          >
            {/* <strong style={{ color: 'black' }}>$ ---</strong>
                    <span style={{ marginTop: -4, marginBottom: -4, marginLeft: 4, marginRight: 4 }}>-</span> */}
            <span style={{ color: "black" }}>
              ${parseFloat(horsesResult[row - 1]?.sb_place).toFixed(2)}
            </span>
          </a>
        );
      } else {
        return (
          <a
            style={styles.odds_div_mobile_Row}
            href={bookie("sportsBetting")}
            target="blank"
          >
            {/* <strong style={{ color: 'black' }}>$ ---</strong>
                    <span style={{ marginTop: -4, marginBottom: -4 }}>-</span> */}
            <span style={{ color: "black" }}>
              ${parseFloat(horsesResult[row - 1]?.sb_place).toFixed(2)}
            </span>
          </a>
        );
      }
    }
  };

  const checkUBOdds = (row, horsesResult) => {
    if (horsesResult[row - 1]?.position === 1) {
      if (window.innerWidth > 700) {
        return (
          <a style={styles.odds_div} href={bookie("Unibet")} target="blank">
            <strong>
              ${parseFloat(horsesResult[row - 1]?.ub_win).toFixed(2)}
            </strong>
            <span
              style={{
                marginTop: -4,
                marginBottom: -4,
                marginLeft: 0,
                marginRight: 0,
              }}
            >
              <br />
            </span>
            <span>
              ${parseFloat(horsesResult[row - 1]?.ub_place).toFixed(2)}
            </span>
          </a>
        );
      } else {
        return (
          <a
            style={styles.odds_div_mobile}
            href={bookie("Unibet")}
            target="blank"
          >
            <strong>
              ${parseFloat(horsesResult[row - 1]?.ub_win).toFixed(2)}
            </strong>
            <span
              style={{
                marginTop: -4,
                marginBottom: -4,
                marginLeft: 0,
                marginRight: 0,
              }}
            >
              -
            </span>
            <span>
              ${parseFloat(horsesResult[row - 1]?.ub_place).toFixed(2)}
            </span>
          </a>
        );
      }
    } else {
      if (window.innerWidth > 700) {
        return (
          <a style={styles.odds_div} href={bookie("Unibet")} target="blank">
            {/* <strong>$ --- </strong>
                    <span style={{ marginTop: -4, marginBottom: -4, marginLeft: 4, marginRight: 4 }}>-</span> */}
            <span>
              ${parseFloat(horsesResult[row - 1]?.ub_place).toFixed(2)}
            </span>
          </a>
        );
      } else {
        return (
          <a
            style={styles.odds_div_mobile_Row}
            href={bookie("Unibet")}
            target="blank"
          >
            {/* <strong>$ --- </strong>
                <span style={{ marginTop: -4, marginBottom: -4, marginLeft: 4, marginRight: 4 }}>-</span> */}
            <span>
              ${parseFloat(horsesResult[row - 1]?.ub_place).toFixed(2)}
            </span>
          </a>
        );
      }
    }
  };

  let horsesA = horses?.sort(function (a, b) {
    return a.position - b.position;
  });
  var horsesResult = [];
                      // eslint-disable-next-line array-callback-return
  horsesA.map((horse, i) => {
    if (
      horse.position === 1 ||
      horse.position === 2 ||
      horse.position === 3 ||
      horse.position === 4
    ) {
      horsesResult.push(horse);
    }
  });

  const data = horsesResult.map((horse, i) => {
    return (
      <tr key={i} style={{ padding: 0 }}>
        <td style={styles.cell}>
          <div style={styles.position}>
            {checkPosition(i + 1, horsesResult)}
          </div>
        </td>
        <td style={styles.horseNumber_cell}>
          {checkHorseNumber(i + 1, horsesResult)}
        </td>
        <td style={styles.horseName_cell}>
          {checkHorseName(i + 1, horsesResult)}
        </td>
        <td style={styles.odds_cell}>
          {/* <b>N/A</b> */}
          {checkSBOdds(i + 1, horsesResult)}
        </td>
        <td style={styles.odds_cell}>{checkUBOdds(i + 1, horsesResult)}</td>
        <td style={styles.results}>
          <div style={styles.results_div}>
            {checkResult(i + 1, horsesResult)}
          </div>
        </td>
      </tr>
    );
  });
  // console.log(trackInfo[0]?.race_result_time);
  const now = moment().tz("Australia/sydney").format("YYYY-MM-DD HH:mm:ss");
  const end = moment(trackInfo[0]?.race_result_time, "YYYY-MM-DD HH:mm:ss");
  const diff = moment(end, "YYYY-MM-DD HH:mm:ss").from(now);
  return (
    <div>
      <Table style={styles.table} striped bordered>
        <thead>
          <tr>
            <th style={styles.pos}>POS</th>
            <th style={styles.horseNumber}>#</th>
            <th style={styles.horse}>HORSE</th>
            <th style={styles.odds}>
              <Badge
                style={{
                  backgroundColor: "#e12b80",
                  width: "50%",
                  padding: 3,
                }}
              >
                <strong
                  style={{
                    marginLeft: 2,
                    marginRight: 2,
                    color: "white",
                    backgroundColor: "#e12b80",
                  }}
                >
                  BB
                </strong>
              </Badge>
            </th>
            <th style={styles.odds}>
              <Badge
                style={{ backgroundColor: "black", width: "50%", padding: 3 }}
              >
                <strong
                  style={{ marginLeft: 1, marginRight: 1, color: "white" }}
                >
                  UB
                </strong>
              </Badge>
            </th>
            <th style={styles.results}>
              <Badge color="primary" style={{ width: "100%", padding: 3 }}>
                <strong
                  style={{
                    marginLeft: 1,
                    marginRight: 1,
                    color: "white",
                    width: "100%",
                  }}
                >
                  RESULT
                </strong>
              </Badge>
            </th>
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </Table>
      <div style={{ padding: 1 }}>
        <div
          style={{
            backgroundColor: "white",
            padding: 5,
            marginTop: -17,
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
          }}
        >
          <span style={{ fontSize: 12, marginLeft: 8, fontWeight: 500 }}>
            <strong>Resulted on</strong>{" "}
            {moment(trackInfo[0]?.race_result_time).format("DD-MM-YYYY")} at{" "}
            {ConvertUTCTimeToLocalTime(moment(trackInfo[0]?.race_result_time).format("HH:mm"))} - {diff}
          </span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // loading: state.raceReducer.loading,
  horses: state.raceReducer.horsesOpt,
  trackInfo: state.raceReducer.trackInfoOpt,
});

const mapDispatchToProps = (dispatch) => ({
  // changeTab: (num) => dispatch(raceAction.changeTab(num)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Result));
