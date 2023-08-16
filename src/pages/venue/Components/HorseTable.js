import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faArrowUp,
  faArrowDown,
  faCaretDown,
  faCaretUp,
  faHorseHead,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment-timezone";

import { Table, Badge, Col } from "reactstrap";
import Tooltip from "@material-ui/core/Tooltip";

import { silkSize, renderNames } from "../../../config/racesUtils";
import { bookie } from "../../../config/utils";
// import { notifyMe, publicVapidKey } from '../../../config/config'

//import actions from '../../../redux/actions/race'

import SortIconDown from "react-ionicons/lib/MdArrowDropdown";
import SortIconUp from "react-ionicons/lib/MdArrowDropup";
import Expand from "react-ionicons/lib/IosExpand";
import Bell from "react-ionicons/lib/IosNotifications";

import Arrow from "../../../assets/Icons/arrowDes.png";

import Button from "@material-ui/core/Button";

// import './horseTable.scss'
import { RemoveCircleOutline } from "@material-ui/icons";

const styles = {
  table: {
    backgroundColor: "white",
    marginBottom: -8,
    marginTop: -8,
  },
  NumberMobileHead: {
    textAlign: "center",
  },
  HoresMobileHead: {
    width: "60%",
  },
  TrackConditionMobile: {
    width: "15%",
    textAlign: "center",
  },
  oddsMobile: {
    width: "20%",
    textAlign: "center",
  },
  numberCellMobile: {
    padding: 0,
  },
  numberCellMobileFull: {
    backgroundColor: "red",
  },
  NumberWebHead: {
    textAlign: "center",
  },
  NumberWebCell: {
    textAlign: "center",
    padding: 0,
    paddingBottom: 0,
  },
  oddsHeadWeb: {
    textAlign: "center",
  },
  condHeadWeb: {
    textAlign: "center",
    cursor: "pointer",
  },
  odds_cell: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  odds_div: {
    color: "black",
    fontSize: 11,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  ub_cell: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cond_cell: {
    textAlign: "center",
    padding: 0,
    backgroundColor: "red !important",
  },
  lmmSelector: {
    width: "auto",
    padding: 3,
    borderWidth: 0,
    backgroundColor: "#e9ecef",
    borderRadius: 4,
    fontSize: 12,
  },
  reminderSelector: {
    width: "auto",
    padding: 3,
    borderWidth: 0,
    backgroundColor: "#e9ecef",
    borderRadius: 4,
    fontSize: 12,
    marginRight: 4,
  },
};

class HorseTable extends Component {
  constructor(props) {
    super(props);
    this.sortTale = this.sortTale.bind(this);
    this.sortTableDefault = this.sortTableDefault.bind(this);
    this.sortByCond = this.sortByCond.bind(this);
    this.state = {
      innerWidth: window.innerWidth,
      isOpen: false,
      data: this.props.horses,
      expanded: false,
      sortedby: this.props.trackInfo[0]?.track_condition,
      isNaChecked: false,
      lmm: null,
      lateTime: 2,
      reminder: 2,
      notifyDrop: false,
    };
  }

  handleResize = () => {
    this.setState({ innerWidth: window.innerWidth });
  };

  componentDidMount() {
    console.log(this.props.horses);
    // this.sortTableDefault()
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  UNSAFE_componentWillReceiveProps(prevState) {
    // this.sortTableDefault()

    this.lateMM(this.props.horses, this.props.trackInfo[0]?.race_time, 2).then(
      (response) => {
        this.setState({ lmm: response, lateTime: 2 });
      }
    );
  }

  lateMM = async (data, time, option) => {
    let tcheck;
    tcheck = moment(time, "HH:mm:ss")
      .subtract(option, "minute")
      .format("HH:mm:ss");
    let topPercent = 0;
    let mmNumber = null;
    for (let i = 0; i < data.length; i++) {
      if (data[i].horse_status === "Starter") {
        var openPrice;
        var currentPrrice;
        var currentPercent;
        var horse_number;
        for (let j = 0; j < data[i].ub_flucs.t.length; j++) {
          if (
            moment(data[i].ub_flucs.t[j], "YYYY-MM-DD HH:mm:ss").format(
              "HH:mm:ss"
            ) <= tcheck
          ) {
            openPrice = parseFloat(data[i].ub_flucs.odd[j]);
            currentPrrice = parseFloat(data[i].ub_win);
            currentPercent =
              100 - ((currentPrrice - 1) / (openPrice - 1)) * 100;
            horse_number = data[i].horse_number;
            j = data[i].ub_flucs.t.length + 1;
          }
        }
        if (currentPercent > topPercent) {
          topPercent = currentPercent;
          mmNumber = horse_number;
        }
      }
    }
    return mmNumber;
  };

  oddsUpdate = (i, price_win, price_place, flucs, openPrice, Bookie) => {
    // if (this.props.oldHorses.length !== 0) {
    //     var WinOld
    //     var PlaceOld
    //     var WinNew
    //     var PlaceNew
    //     var flucs
    //     var openPrice

    //     if (Bookie === 'Unibet') {
    //         WinOld = this.props.oldHorses[i]?.ub_win?.toFixed(2)
    //         PlaceOld = this.props.oldHorses[i]?.ub_place?.toFixed(2)
    //         WinNew = this.props.horses[i]?.ub_win?.toFixed(2)
    //         PlaceNew = this.props.horses[i]?.ub_place?.toFixed(2)
    //         flucs = this.props.horses[i]?.ub_flucs
    //         openPrice = this.props.horses[i]?.ub_open_price?.toFixed(2)
    //     } else if (Bookie === 'sportsBetting') {
    //         WinOld = this.props.oldHorses[i]?.sb_win ? this.props.oldHorses[i].sb_win?.toFixed(2) : 0
    //         PlaceOld = this.props.oldHorses[i]?.sb_place ? this.props.oldHorses[i].sb_place?.toFixed(2) : 0
    //         WinNew = this.props.horses[i]?.sb_win ? this.props.horses[i].sb_win?.toFixed(2) : 0
    //         PlaceNew = this.props.horses[i]?.sb_place ? this.props.horses[i].sb_place?.toFixed(2) : 0
    //         flucs = this.props.horses[i]?.sb_flucs
    //         openPrice = this.props.horses[i]?.sb_open_price?.toFixed(2)
    //     }

    //     var winColor
    //     var placeColor
    //     var winArrow
    //     var placeArrow

    //     if (WinNew > WinOld) {
    //         winColor = 'red'
    //         winArrow = 'up'
    //     } else if (WinNew < WinOld) {
    //         winColor = 'green'
    //         winArrow = 'down'
    //     } else if (WinNew === WinOld) {
    //         winColor = 'black'
    //         winArrow = ''
    //     }

    //     if (PlaceNew > PlaceOld) {
    //         placeColor = 'red'
    //         placeArrow = 'up'
    //     } else if (PlaceNew < PlaceOld) {
    //         placeColor = 'green'
    //         placeArrow = 'down'
    //     } else if (PlaceNew === PlaceOld) {
    //         placeColor = 'black'
    //         placeArrow = ''
    //     }

    //     return { win: WinNew, place: PlaceNew, winColor: winColor, placeColor: placeColor, winArrow: winArrow, placeArrow: placeArrow, max: this.maxminOdd(flucs, 1), min: this.maxminOdd(flucs, 2), openPrice }

    // } else {
    if (price_win > 1) {
      return {
        win: price_win?.toFixed(2),
        place: price_place?.toFixed(2),
        winColor: "black",
        placeColor: "black",
        max: this.maxminOdd(flucs, 1),
        min: this.maxminOdd(flucs, 2),
        openPrice,
      };
    } else {
      return { win: "--", place: "--", winColor: "black", placeColor: "black" };
    }
    // }
  };

  maxminOdd(data, type) {
    if (data != null) {
      let max = parseFloat(data.odd[data.odd.length - 1]);
      let min = parseFloat(data.odd[data.odd.length - 1]);
      for (let i = 0; i < data.odd.length; i++) {
        if (parseFloat(data.odd[i]) > parseFloat(max)) {
          max = parseFloat(data.odd[i]);
        }
        if (parseFloat(parseFloat(data.odd[i])) < min) {
          min = parseFloat(data.odd[i]);
        }
      }

      if (type === 1) {
        return max;
      } else if (type === 2) {
        return min;
      }
    } else {
      return "-.--";
    }
  }

  renderArrow = (val) => {
    if (val === "up") {
      return (
        <FontAwesomeIcon
          color="red"
          icon={faArrowUp}
          size="1x"
          style={{ marginRight: 4, width: 8, height: 10 }}
        />
      );
    } else if (val === "down") {
      return (
        <FontAwesomeIcon
          color="green"
          icon={faArrowDown}
          size="1x"
          style={{ marginRight: 4, width: 8, height: 10 }}
        />
      );
    } else {
      return null;
    }
  };

  renderOpen = (val) => {
    if (val) {
      return (
        <strong style={{ fontSize: 12 }}>
          <span style={{ fontWeight: "500" }}>Open</span>{" "}
          <FontAwesomeIcon
            color="transparent"
            icon={faCaretUp}
            size="1x"
            style={{ marginRight: 4 }}
          />
          ${Number(val)?.toFixed(2)}
        </strong>
      );
    }
  };

  renderOddsAll = (
    win,
    place,
    winColor,
    placeColor,
    winArrow,
    placeArrow,
    bookmaker,
    max,
    min,
    openPrice
  ) => {
    if (win === "--") {
      return (
        <a style={styles.odds_div} href={bookie(bookmaker)} target="blank">
          <strong style={{ color: "black" }}>
            {this.renderArrow(winArrow)}
            {win}
          </strong>
          <span style={{ marginTop: -4, marginBottom: -4 }}>--</span>
          <span style={{ color: "black" }}>
            {this.renderArrow(placeArrow)}
            {place}
          </span>
        </a>
      );
    } else {
      if (Number(max)) {
        return (
          <Tooltip
            style={{ padding: 0, textAlign: "center" }}
            title={
              <div
                style={{
                  backgroundColor: "transparent",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  padding: 4,
                }}
              >
                {this.renderOpen(openPrice)}
                <strong style={{ fontSize: 12, marginTop: 6 }}>
                  <span style={{ fontWeight: "500" }}>High:</span>{" "}
                  <FontAwesomeIcon
                    color="#dc3545"
                    icon={faCaretUp}
                    size="1x"
                    style={{ marginRight: 4 }}
                  />
                  ${Number(max)?.toFixed(2)}
                </strong>
                <strong style={{ fontSize: 12, marginTop: 6 }}>
                  <span style={{ fontWeight: "500" }}>Low:</span>{" "}
                  <FontAwesomeIcon
                    color="#20c997"
                    icon={faCaretDown}
                    size="1x"
                    style={{ marginRight: 4, marginLeft: 3 }}
                  />
                  ${Number(min)?.toFixed(2)}
                </strong>
              </div>
            }
            placement="top"
          >
            <a style={styles.odds_div} href={bookie(bookmaker)} target="blank">
              <div style={{ display: "flex", marginLeft: 4 }}>
                <div style={{ width: 12 }}>{this.renderArrow(winArrow)}</div>
                <strong style={{ color: "black" }}>${win}</strong>
              </div>

              {/* <span style={{ marginTop: -4, marginBottom: -4, marginLeft: 8 }}>--</span> */}

              <div
                style={{
                  height: 0,
                  backgroundColor: "black",
                  width: 16,
                  marginLeft: 4,
                  marginTop: 4,
                  marginBottom: 4,
                }}
              ></div>

              <div style={{ display: "flex", marginLeft: 4 }}>
                <div style={{ width: 12 }}>{this.renderArrow(placeArrow)}</div>
                <span style={{ color: "black" }}>${place}</span>
              </div>
            </a>
          </Tooltip>
        );
      } else {
        return (
          <a style={styles.odds_div} href={bookie(bookmaker)} target="blank">
            <strong style={{ color: "black" }}>
              {this.renderArrow(winArrow)} ${win}
            </strong>
            <span style={{ marginTop: -4, marginBottom: -4 }}>--</span>
            <span style={{ color: "black" }}>
              {this.renderArrow(placeArrow)} ${place}
            </span>
          </a>
        );
      }
    }
  };

  renderExpander() {
    if (this.state.innerWidth < 769) {
      return (
        // <div style={{
        //     backgroundColor: 'white',
        //     height: 38,
        //     borderTopLeftRadius: 8,
        //     borderTopRightRadius: 8,
        //     display: 'flex',
        //     alignItems: 'center',
        //     justifyContent: 'center'
        // }}
        //     onClick={() => this.setState({ expanded: !this.state.expanded })}
        // >
        //     {this.state.expanded === false ? <span>Expand Horse Table</span> : <span>Decrease Horse Table</span>}
        // </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            backgroundColor: "white",
            opacity: "70%",
          }}
        >
          <Button
            onClick={() => this.setState({ expanded: !this.state.expanded })}
            variant="contained"
            color="default"
            startIcon={
              this.state.expanded ? <RemoveCircleOutline /> : <Expand />
            }
          >
            {this.state.expanded ? "Minimize" : "Expand"}
          </Button>
        </div>
      );
    }
  }

  renderExpandHead() {
    if (this.state.expanded) {
      return (
        <>
          <th
            onClick={() => this.sortByCond("F")}
            style={styles.TrackConditionMobile}
          >
            <Badge
              style={{
                backgroundColor: this.trackColor("F"),
                color: "white",
                fontWeight: "bold",
              }}
            >
              F %
            </Badge>
          </th>
          <th
            onClick={() => this.sortByCond("G")}
            style={styles.TrackConditionMobile}
          >
            <Badge
              style={{
                backgroundColor: this.trackColor("G"),
                color: "white",
                fontWeight: "bold",
              }}
            >
              G %
            </Badge>
          </th>
          <th
            onClick={() => this.sortByCond("SO")}
            style={styles.TrackConditionMobile}
          >
            <Badge
              style={{
                backgroundColor: this.trackColor("SO"),
                color: "white",
                fontWeight: "bold",
              }}
            >
              SO %
            </Badge>
          </th>
          <th
            onClick={() => this.sortByCond("H")}
            style={styles.TrackConditionMobile}
          >
            <Badge
              style={{
                backgroundColor: this.trackColor("H"),
                color: "white",
                fontWeight: "bold",
              }}
            >
              H %
            </Badge>
          </th>
          <th
            onClick={() => this.sortByCond("SY")}
            style={styles.TrackConditionMobile}
          >
            <Badge
              style={{
                backgroundColor: this.trackColor("SY"),
                color: "white",
                fontWeight: "bold",
              }}
            >
              SY %
            </Badge>
          </th>
        </>
      );
    } else {
      return (
        <th
          onClick={() =>
            this.sortByCond(this.props.trackInfo[0]?.track_condition)
          }
          style={styles.TrackConditionMobile}
        >
          <Badge
            style={{
              backgroundColor: this.trackColor(
                this.props.trackInfo[0]?.track_condition
              ),
              fontWeight: "bold",
              color: "white",
            }}
          >
            {this.props.trackInfo[0]?.track_condition} %
          </Badge>
        </th>
      );
    }
  }

  colColor = (val) => {
    if (val === this.props.trackInfo[0]?.track_condition) {
      return "rgba(247,240,175,0.6)";
    } else {
      return "Transparent";
    }
  };

  renderTr() {
    if (this.state.innerWidth < 769) {
      return (
        <tr>
          {/* <th onClick={this.sortTale} style={styles.NumberMobileHead}>#</th> */}
          <th style={styles.HoresMobileHead}>
            <strong>Horse</strong>
          </th>

          <th style={{ padding: 0 }}></th>

          {this.renderExpandHead()}

          <th style={styles.oddsMobile}>
            <Badge
              onClick={() => this.sbOddsSort()}
              style={{ backgroundColor: "#e12b80", padding: 5 }}
            >
              <strong style={{ marginLeft: 4, marginRight: 4, color: "white" }}>
                BOOM
              </strong>
            </Badge>
          </th>

          <th onClick={() => this.ubOddsSort()} styles={styles.oddsMobile}>
            <Badge style={{ backgroundColor: "black", padding: 5 }}>
              <strong style={{ marginLeft: 4, marginRight: 4, color: "white" }}>
                UB
              </strong>
            </Badge>
          </th>
        </tr>
      );
    } else {
      return (
        <tr>
          <th style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <span>{this.props.trackInfo[0]?.track_description}</span>
              <span style={{ marginLeft: 16 }}>
                {this.props.trackInfo[0]?.track_distance}
              </span>
            </div>
            <div style={{ cursor: "pointer" }} onClick={() => this.sortTale()}>
              <span>#</span>
              <strong style={{ marginLeft: 16 }}>Horse</strong>
            </div>
          </th>

          <th style={styles.condHeadWeb} onClick={() => this.sortByCond("F")}>
            <Badge
              style={{
                width: 56,
                backgroundColor: this.trackColor("F"),
                color: "white",
                fontWeight: "bold",
                padding: 6,
              }}
            >
              <span>Firm %</span>
            </Badge>
            <div
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                marginBottom: -8,
              }}
            >
              {this.renderSortingArrows("F")}
            </div>
          </th>

          <th style={styles.condHeadWeb} onClick={() => this.sortByCond("G")}>
            <Badge
              style={{
                width: 56,
                cursor: "pointer",
                backgroundColor: this.trackColor("G"),
                color: "white",
                fontWeight: "bold",
                padding: 5,
              }}
            >
              <span>Good %</span>
            </Badge>
            <div
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                marginBottom: -8,
              }}
            >
              {this.renderSortingArrows("G")}
            </div>
          </th>

          <th style={styles.condHeadWeb} onClick={() => this.sortByCond("SO")}>
            <Badge
              style={{
                width: 56,
                cursor: "pointer",
                backgroundColor: this.trackColor("SO"),
                color: "white",
                fontWeight: "bold",
                padding: 5,
              }}
            >
              <span>Soft %</span>
            </Badge>
            <div
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                marginBottom: -8,
              }}
            >
              {this.renderSortingArrows("SO")}
            </div>
          </th>

          <th style={styles.condHeadWeb} onClick={() => this.sortByCond("H")}>
            <Badge
              style={{
                width: 56,
                cursor: "pointer",
                backgroundColor: this.trackColor("H"),
                color: "white",
                fontWeight: "bold",
                padding: 5,
              }}
            >
              <span>Heavy %</span>
            </Badge>
            <div
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                marginBottom: -8,
              }}
            >
              {this.renderSortingArrows("H")}
            </div>
          </th>

          <th style={styles.condHeadWeb} onClick={() => this.sortByCond("SY")}>
            <Badge
              onClick={() => this.sortByCond("SY")}
              style={{
                width: 56,
                cursor: "pointer",
                backgroundColor: this.trackColor("SY"),
                color: "white",
                fontWeight: "bold",
                padding: 5,
              }}
            >
              <span>Synth %</span>
            </Badge>
            <div
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                marginBottom: -8,
              }}
            >
              {this.renderSortingArrows("SY")}
            </div>
          </th>

          <th style={styles.oddsHeadWeb} onClick={() => this.sbOddsSort()}>
            <Badge
              style={{
                backgroundColor: "#7408c6",
                padding: 5,
                width: 40,
                color: "white",
                cursor: "pointer",
              }}
            >
              <span>BOOM</span>
            </Badge>
            <div
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                marginBottom: -8,
              }}
            >
              {this.renderSortingArrows("SB")}
            </div>
          </th>

          <th style={styles.oddsHeadWeb} onClick={() => this.ubOddsSort()}>
            <Badge
              style={{
                backgroundColor: "black",
                padding: 5,
                width: 40,
                color: "white",
                cursor: "pointer",
              }}
            >
              <span>UB</span>
            </Badge>
            <div
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                marginBottom: -8,
              }}
            >
              {this.renderSortingArrows("UB")}
            </div>
          </th>
        </tr>
      );
    }
  }

  renderMobileInfo() {
    const trigger = () => {
      if (this.props.trackInfo[0]?.is_na === 1) {
        return (
          <div className="profileCheckBox" style={{ marginTop: 0 }}>
            {this.state.isNaChecked ? (
              <span style={{ fontSize: 11 }}>Hide selections : </span>
            ) : (
              <span style={{ fontSize: 11 }}>Show selections : </span>
            )}
            <input
              style={{ marginTop: 8 }}
              color="red"
              id="isNa"
              type="checkbox"
              className="switch"
              checked={this.state.isNaChecked}
              onChange={this.changeIsNA}
            />
          </div>
        );
      }
    };

    if (this.state.innerWidth < 769) {
      return (
        <div style={{ padding: 0 }}>
          <div style={{ display: "flex" }}>
            {/* <Col style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column' }}>
                            <label style={{ marginRight: 8, fontSize: 11, marginTop: 4 }}>Late MM from:</label>
                            <select onChange={this.onChnageSelector} className="selector" style={styles.lmmSelector} value={this.state.lateTime}>
                                <option value={2}>2 mins</option>
                                <option value={5}>5 mins</option>
                                <option value={10}>10 mins</option>
                                <option value={30}>20 mins</option>
                                <option value={60}>60 mins</option>
                            </select>
                        </Col> */}

            <Col>{trigger()}</Col>
          </div>
        </div>
      );
    }
  }

  renderNA() {
    if (this.props.trackInfo[0]?.is_na === 1 && this.state.innerWidth > 769) {
      return (
        <div>
          <div
            className="profileCheckBox"
            style={{
              marginRight: 8,
              display: "flex",
              flexDirection: "row",
              marginTop: -16,
            }}
          >
            {this.state.isNaChecked ? (
              <span style={{ fontSize: 11, marginRight: 4 }}>
                Hide selections :{" "}
              </span>
            ) : (
              <span style={{ fontSize: 11 }}>Show selections : </span>
            )}
            <input
              id="isNa"
              type="checkbox"
              className="switch"
              checked={this.state.isNaChecked}
              onChange={this.changeIsNA}
            />
          </div>
        </div>
      );
    }
  }

  changeIsNA = (e) => {
    this.setState({ isNaChecked: e.target.checked });
  };

  renderNum = (num, silkURL) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <p>
          <strong>{num}</strong>
        </p>
        <div
          style={{
            width: 32,
            height: 32,
            backgroundImage: "url(" + silkURL + ")",
            backgroundPositionX: silkSize(num - 1),
            marginTop: -10,
          }}
        ></div>
      </div>
    );
  };

  renderPercentages = (val) => {
    if (this.props.trackInfo[0]?.is_na === 1 && !this.state.isNaChecked) {
      return "--";
    } else if (this.props.isLoggedIn) {
      if (!this.props.trackInfo[0]?.result && this.props.isExpired) {
        return (
          <FontAwesomeIcon icon={faLock} size="1x" style={{ marginRight: 4 }} />
        );
      } else {
        if (Math.round(val) <= 10 && Math.round(val) !== null) {
          return 10;
        } else {
          return Math.round(val);
        }
      }
    } else {
      if (this.props.trackInfo[0]?.result) {
        if (Math.round(val) <= 10 && Math.round(val) !== null) {
          return 10;
        } else {
          return Math.round(val);
        }
      } else {
        return (
          <FontAwesomeIcon icon={faLock} size="1x" style={{ marginRight: 4 }} />
        );
      }
    }
  };

  renderSelections = (firm, good, soft, heavy, synth) => {
    const cond = this.props.trackInfo[0]?.track_condition;

    if (cond === "G") {
      return this.renderPercentages(good);
    } else if (cond === "F") {
      return this.renderPercentages(firm);
    } else if (cond === "SO") {
      return this.renderPercentages(soft);
    } else if (cond === "H") {
      return this.renderPercentages(heavy);
    } else if (cond === "SY") {
      return this.renderPercentages(synth);
    } else if (cond === "N/A") {
      return this.renderPercentages(good);
    }
  };

  sortTableDefault() {
    const trackCondition = this.props.trackInfo[0]?.track_condition;
    if (trackCondition) {
      if (this.props.trackInfo[0]?.is_na === 1) {
        return this.props.horses;
      }

      if (this.props.currentUser || this.props.trackInfo[0]?.result) {
        if (trackCondition === "F") {
          const fData = this.props.horses.sort((a, b) =>
            a.points_per_firm > b.points_per_firm ? -1 : 1
          );
          return fData;
        } else if (trackCondition === "G") {
          const gData = this.props.horses.sort((a, b) =>
            a.points_per_good > b.points_per_good ? -1 : 1
          );
          return gData;
        } else if (trackCondition === "SO") {
          const soData = this.props.horses.sort((a, b) =>
            a.points_per_soft > b.points_per_soft ? -1 : 1
          );
          return soData;
        } else if (trackCondition === "H") {
          const hData = this.props.horses.sort((a, b) =>
            a.points_per_heavy > b.points_per_heavy ? -1 : 1
          );
          return hData;
        } else if (trackCondition === "SY") {
          const syData = this.props.horses.sort((a, b) =>
            a.points_per_synth > b.points_per_synth ? -1 : 1
          );
          return syData;
        }
      } else {
        return this.props.horses;
      }
    }
  }

  sortTale = () => {
    if (this.state.sortedby === "#+") {
      const sortedById = this.props.horses.sort((a, b) =>
        a.horse_number > b.horse_number ? -1 : 1
      );
      this.setState({ data: sortedById, sortedby: "#-" });
    } else {
      const sortedById = this.props.horses.sort((a, b) =>
        a.horse_number > b.horse_number ? 1 : -1
      );
      this.setState({ data: sortedById, sortedby: "#+" });
    }
  };

  sortByCond(trackCondition) {
    if (trackCondition === "F") {
      if (this.state.sortedby === "F-") {
        const data = this.props.horses.sort((a, b) =>
          a.points_per_firm > b.points_per_firm ? -1 : 1
        );
        this.setState({ data: data, sortedby: "F+" });
      } else {
        const data = this.props.horses.sort((a, b) =>
          a.points_per_firm > b.points_per_firm ? 1 : -1
        );
        this.setState({ data: data, sortedby: "F-" });
      }
    } else if (trackCondition === "G") {
      if (this.state.sortedby === "G-") {
        const data = this.props.horses.sort((a, b) =>
          a.points_per_good > b.points_per_good ? -1 : 1
        );
        this.setState({ data: data, sortedby: "G+" });
      } else {
        const data = this.props.horses.sort((a, b) =>
          a.points_per_good > b.points_per_good ? 1 : -1
        );
        this.setState({ data: data, sortedby: "G-" });
      }
    } else if (trackCondition === "SO") {
      if (this.state.sortedby === "SO-") {
        const data = this.props.horses.sort((a, b) =>
          a.points_per_soft > b.points_per_soft ? -1 : 1
        );
        this.setState({ data: data, sortedby: "SO+" });
      } else {
        const data = this.props.horses.sort((a, b) =>
          a.points_per_soft > b.points_per_soft ? 1 : -1
        );
        this.setState({ data: data, sortedby: "SO-" });
      }
    } else if (trackCondition === "H") {
      if (this.state.sortedby === "H-") {
        const data = this.props.horses.sort((a, b) =>
          a.points_per_heavy > b.points_per_heavy ? -1 : 1
        );
        this.setState({ data: data, sortedby: "H+" });
      } else {
        const data = this.props.horses.sort((a, b) =>
          a.points_per_heavy > b.points_per_heavy ? 1 : -1
        );
        this.setState({ data: data, sortedby: "H-" });
      }
    } else if (trackCondition === "SY") {
      if (this.state.sortedby === "SY-") {
        const data = this.props.horses.sort((a, b) =>
          a.points_per_synth > b.points_per_synth ? -1 : 1
        );
        this.setState({ data: data, sortedby: "SY+" });
      } else {
        const data = this.props.horses.sort((a, b) =>
          a.points_per_synth > b.points_per_synth ? 1 : -1
        );
        this.setState({ data: data, sortedby: "SY-" });
      }
    }
  }

  ubOddsSort = () => {
    if (this.state.sortedby === "ub+") {
      const data = this.props.horses.sort((a, b) =>
        a.ub_win > b.ub_win ? -1 : 1
      );
      this.setState({ data: data, sortedby: "ub-" });
    } else {
      const data = this.props.horses.sort((a, b) =>
        a.ub_win > b.ub_win ? 1 : -1
      );
      this.setState({ data: data, sortedby: "ub+" });
    }
  };

  sbOddsSort = () => {
    if (this.state.sortedby === "sb+") {
      const data = this.props.horses.sort((a, b) =>
        a.sb_win > b.sb_win ? -1 : 1
      );
      this.setState({ data: data, sortedby: "sb-" });
    } else {
      const data = this.props.horses.sort((a, b) =>
        a.sb_win > b.sb_win ? 1 : -1
      );
      this.setState({ data: data, sortedby: "sb+" });
    }
  };

  renderSortingArrows = (trackCondition) => {
    if (trackCondition === "F") {
      if (this.state.sortedby === "F+") {
        return (
          <div>
            <SortIconUp fontSize="20" color={"#44BD32"} />
            <SortIconDown
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
          </div>
        );
      } else if (this.state.sortedby === "F-") {
        return (
          <div>
            <SortIconUp
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
            <SortIconDown fontSize="20" color={"#44BD32"} />
          </div>
        );
      } else {
        return (
          <div>
            <SortIconUp
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
            <SortIconDown
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
          </div>
        );
      }
    } else if (trackCondition === "G") {
      if (this.state.sortedby === "G+") {
        return (
          <div>
            <SortIconUp fontSize="20" color={"#44BD32"} />
            <SortIconDown
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
          </div>
        );
      } else if (this.state.sortedby === "G-") {
        return (
          <div>
            <SortIconUp
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
            <SortIconDown fontSize="20" color={"#44BD32"} />
          </div>
        );
      } else {
        return (
          <div>
            <SortIconUp
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
            <SortIconDown
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
          </div>
        );
      }
    } else if (trackCondition === "SO") {
      if (this.state.sortedby === "SO+") {
        return (
          <div>
            <SortIconUp fontSize="20" color={"#44BD32"} />
            <SortIconDown
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
          </div>
        );
      } else if (this.state.sortedby === "SO-") {
        return (
          <div>
            <SortIconUp
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
            <SortIconDown fontSize="20" color={"#44BD32"} />
          </div>
        );
      } else {
        return (
          <div>
            <SortIconUp
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
            <SortIconDown
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
          </div>
        );
      }
    } else if (trackCondition === "H") {
      if (this.state.sortedby === "H+") {
        return (
          <div>
            <SortIconUp fontSize="20" color={"#44BD32"} />
            <SortIconDown
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
          </div>
        );
      } else if (this.state.sortedby === "H-") {
        return (
          <div>
            <SortIconUp
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
            <SortIconDown fontSize="20" color={"#44BD32"} />
          </div>
        );
      } else {
        return (
          <div>
            <SortIconUp
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
            <SortIconDown
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
          </div>
        );
      }
    } else if (trackCondition === "SY") {
      if (this.state.sortedby === "SY+") {
        return (
          <div>
            <SortIconUp fontSize="20" color={"#44BD32"} />
            <SortIconDown
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
          </div>
        );
      } else if (this.state.sortedby === "SY-") {
        return (
          <div>
            <SortIconUp
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
            <SortIconDown fontSize="20" color={"#44BD32"} />
          </div>
        );
      } else {
        return (
          <div>
            <SortIconUp
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
            <SortIconDown
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
          </div>
        );
      }
    } else if (trackCondition === "SB") {
      if (this.state.sortedby === "sb+") {
        return (
          <div>
            <SortIconUp fontSize="20" color={"#44BD32"} />
            <SortIconDown
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
          </div>
        );
      } else if (this.state.sortedby === "sb-") {
        return (
          <div>
            <SortIconUp
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
            <SortIconDown fontSize="20" color={"#44BD32"} />
          </div>
        );
      } else {
        return (
          <div>
            <SortIconUp
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
            <SortIconDown
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
          </div>
        );
      }
    } else if (trackCondition === "UB") {
      if (this.state.sortedby === "ub+") {
        return (
          <div>
            <SortIconUp fontSize="20" color={"#44BD32"} />
            <SortIconDown
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
          </div>
        );
      } else if (this.state.sortedby === "ub-") {
        return (
          <div>
            <SortIconUp
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
            <SortIconDown fontSize="20" color={"#44BD32"} />
          </div>
        );
      } else {
        return (
          <div>
            <SortIconUp
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
            <SortIconDown
              fontSize="20"
              color={"grey"}
              style={{ opacity: "16%" }}
            />
          </div>
        );
      }
    }
  };

  trackColor = (condition) => {
    switch (condition) {
      case "F":
        return "#000000";
      case "G":
        return "#44BD32";
      case "SO":
        return "#FFA800";
      case "SY":
        return "#44BD32";
      case "H":
        return "#F64F60";
      case "N/A":
        return "grey";
      case "ABND":
        return "grey";
      default:
        return "grey";
    }
  };

  renderSelectiondate = () => {
    const gen = () => {
      if (this.props.trackInfo[0]?.is_na !== 1) {
        if (this.props.genTime.length <= 0) {
          return null;
        }
        if (this.props.genTime.length === 1) {
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
                {moment(this.props.genTime[0]?.generation_time).format("dddd ")}{" "}
                at{" "}
                {moment(this.props.genTime[0]?.generation_time).format(
                  "HH:mm:ss"
                )}{" "}
                AEDT{" "}
                <Badge style={{ backgroundColor: "grey", paddingTop: 3 }}>
                  Latest
                </Badge>
              </p>
            </div>
          );
        } else if (this.props.genTime.length === 2) {
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
                {moment(this.props.genTime[0]?.generation_time).format("dddd")}{" "}
                at{" "}
                {moment(this.props.genTime[0]?.generation_time).format(
                  "HH:mm:ss"
                )}{" "}
                AEDT{" "}
                <Badge style={{ backgroundColor: "grey", paddingTop: 3 }}>
                  Latest
                </Badge>
              </p>
              <p style={{ marginLeft: 16 }}>
                {moment(this.props.genTime[1]?.generation_time).format("dddd")}{" "}
                at{" "}
                {moment(this.props.genTime[1]?.generation_time).format(
                  "HH:mm:ss"
                )}{" "}
                AEDT{" "}
              </p>
            </div>
          );
        } else if (this.props.genTime.length === 3) {
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
                {moment(this.props.genTime[0]?.generation_time).format("dddd")}{" "}
                at{" "}
                {moment(this.props.genTime[0]?.generation_time).format(
                  "HH:mm:ss"
                )}{" "}
                AEDT{" "}
              </p>
              <p style={{ marginLeft: 16 }}>
                {moment(this.props.genTime[1]?.generation_time).format("dddd")}{" "}
                at{" "}
                {moment(this.props.genTime[1]?.generation_time).format(
                  "HH:mm:ss"
                )}{" "}
                AEDT{" "}
              </p>
              <p style={{ marginLeft: 16 }}>
                {moment(this.props.genTime[2]?.generation_time).format("dddd")}{" "}
                at{" "}
                {moment(this.props.genTime[2]?.generation_time).format(
                  "HH:mm:ss"
                )}{" "}
                AEDT{" "}
              </p>
            </div>
          );
        } else if (this.props.genTime.length > 3) {
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
                {" "}
                {moment(this.props.genTime[0]?.generation_time).format(
                  "dddd"
                )}{" "}
                at{" "}
                {moment(this.props.genTime[0]?.generation_time).format(
                  "HH:mm:ss"
                )}{" "}
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
              <p style={{ marginLeft: 16 }}>
                {" "}
                {moment(this.props.genTime[1]?.generation_time).format(
                  "dddd"
                )}{" "}
                at{" "}
                {moment(this.props.genTime[1]?.generation_time).format(
                  "HH:mm:ss"
                )}{" "}
                AEDT{" "}
              </p>
              <p style={{ marginLeft: 16 }}>
                {" "}
                {moment(this.props.genTime[2]?.generation_time).format(
                  "dddd"
                )}{" "}
                at{" "}
                {moment(this.props.genTime[2]?.generation_time).format(
                  "HH:mm:ss"
                )}{" "}
                AEDT{" "}
              </p>
              <p style={{ marginLeft: 16 }}>
                {" "}
                {moment(this.props.genTime[3]?.generation_time).format(
                  "dddd"
                )}{" "}
                at{" "}
                {moment(this.props.genTime[3]?.generation_time).format(
                  "HH:mm:ss"
                )}{" "}
                AEDT{" "}
              </p>
            </div>
          );
        }
      }
    };

    if (this.props.genTime) {
      if (this.state.innerWidth > 769) {
        return (
          <div
            style={{ backgroundColor: "white", padding: 8, paddingBottom: -8 }}
          >
            <strong>This Race's Selections were generated on:</strong>
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
              backgroundColor: "white",
              padding: 8,
            }}
          >
            <strong>This Race's Selections were generated on</strong>
            <span>
              {moment(this.props.trackInfo[0]?.generation_time).format("dddd")}{" "}
              at{" "}
              {moment(this.props.trackInfo[0]?.generation_time).format(
                "HH:mm:ss"
              )}{" "}
              AEDT
            </span>
          </div>
        );
      }
    }
  };

  renderLegend = () => {
    if (this.state.innerWidth > 769) {
      return (
        <div
          style={{
            backgroundColor: "white",
            height: 32,
            display: "flex",
            padding: 8,
            marginTop: 4,
          }}
        >
          <div style={{ display: "flex" }}>
            <p style={{ fontSize: 11, pacity: "100%", padding: 0 }}>
              <Badge color="primary">
                <FontAwesomeIcon
                  icon={faHorseHead}
                  size="1x"
                  style={{ width: 14 }}
                />
              </Badge>
            </p>
            <strong style={{ marginLeft: 8 }}>PTP TIP</strong>
          </div>

          <div style={{ marginLeft: 16, marginRight: 16 }}>-</div>

          <div style={{ display: "flex" }}>
            <p style={{ fontSize: 11, pacity: "100%", padding: 0 }}>
              <Badge color="warning">
                <FontAwesomeIcon
                  icon={faStar}
                  size="1x"
                  style={{ width: 14 }}
                />
              </Badge>
            </p>
            <strong style={{ marginLeft: 8 }}>FAVOURITE</strong>
          </div>

          <div style={{ marginLeft: 16, marginRight: 16 }}>-</div>

          <div style={{ display: "flex" }}>
            <p style={{ fontSize: 11, pacity: "100%", padding: 0 }}>
              <Badge
                color=""
                style={{
                  backgroundColor: "rgb(9, 106, 179)",
                  padding: 2,
                  paddingLeft: 8,
                  paddingRight: 8,
                }}
              >
                <img
                  alt="Arrow"
                  src={Arrow}
                  width={14}
                  style={{ marginTop: 3 }}
                  size="1x"
                />
              </Badge>
            </p>
            <strong style={{ marginLeft: 8 }}>MARKET MOVER</strong>
          </div>

          <div style={{ marginLeft: 16, marginRight: 16 }}>-</div>

          <div style={{ display: "flex" }}>
            <p style={{ fontSize: 11, pacity: "100%", padding: 0 }}>
              <Badge
                color="danger"
                style={{ padding: 2, paddingLeft: 8, paddingRight: 8 }}
              >
                <img
                  alt="Arrow"
                  src={Arrow}
                  width={14}
                  style={{ marginTop: 3 }}
                  size="1x"
                />
              </Badge>
            </p>
            <strong style={{ marginLeft: 8 }}>LATE MARKET MOVER</strong>
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            backgroundColor: "white",
            padding: 8,
            display: "flex",
            flexDirection: "row",
            marginTop: -4,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Badge color="primary" style={{ fontSize: 8 }}>
              <FontAwesomeIcon icon={faHorseHead} size="1x" />
            </Badge>
            <strong style={{ marginLeft: 4 }}>PTP TIPS</strong>
          </div>
          <div
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
            <strong style={{ marginLeft: 4 }}>FAVOURITE</strong>
          </div>
          <div
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
            <strong style={{ marginLeft: 4, marginTop: -4 }}>MM</strong>
          </div>
          <br />
          <div
            style={{
              marginLeft: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Badge color="danger" style={{ fontSize: 4.5, marginTop: -4 }}>
              <img alt="Arrow" src={Arrow} width="14px" />
            </Badge>
            <strong style={{ marginLeft: 4, marginTop: -4 }}>LATE MM</strong>
          </div>
        </div>
      );
    }
  };

  trackColor = (condition) => {
    switch (condition) {
      case "F":
        return "#000000";
      case "G":
        return "#44BD32";
      case "SO":
        return "#FFA800";
      case "SY":
        return "#44BD32";
      case "H":
        return "#F64F60";
      case "N/A":
        return "grey";
      case "ABND":
        return "grey";
      default:
        return "grey";
    }
  };

  PTP = (horse_number) => {
    if (this.state.innerWidth > 769) {
      return (
        <p key={horse_number + "PTP"} style={{ fontSize: 10, marginRight: 2 }}>
          <Badge color="primary">
            <FontAwesomeIcon icon={faHorseHead} size="1x" />
          </Badge>
        </p>
      );
    } else {
      return (
        <p key={horse_number + "PTP"} style={{ fontSize: 10, marginBottom: 2 }}>
          <Badge color="primary">
            <FontAwesomeIcon icon={faHorseHead} size="1x" />
          </Badge>
        </p>
      );
    }
  };

  FAV = (horse_number) => {
    if (this.state.innerWidth > 769) {
      return (
        <p key={horse_number + "FAV"} style={{ fontSize: 10, marginRight: 2 }}>
          <Badge color="warning">
            <FontAwesomeIcon icon={faStar} size="1x" />
          </Badge>
        </p>
      );
    } else {
      return (
        <p key={horse_number + "FAV"} style={{ fontSize: 10, marginBottom: 2 }}>
          <Badge color="warning">
            <FontAwesomeIcon icon={faStar} size="1x" />
          </Badge>
        </p>
      );
    }
  };

  MM = (horse_number) => {
    if (this.state.innerWidth > 769) {
      return (
        <p key={horse_number + "MM"} style={{ fontSize: 10, marginRight: 2 }}>
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
    } else {
      return (
        <p key={horse_number + "MM"} style={{ fontSize: 10, marginBottom: 2 }}>
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
    }
  };

  LBMM = (horse_number) => {
    if (this.state.innerWidth > 769) {
      return (
        <p key={horse_number + "LBMM"} style={{ fontSize: 10, marginRight: 2 }}>
          <Badge color="danger">LAD</Badge>
        </p>
      );
    } else {
      return (
        <p
          key={horse_number + "LBMM"}
          style={{ fontSize: 10, marginBottom: 2 }}
        >
          <Badge color="danger">LAD</Badge>
        </p>
      );
    }
  };

  LMM = (horse_number) => {
    if (this.state.innerWidth > 769) {
      return (
        <p key={horse_number + "LMM"} style={{ fontSize: 10, marginRight: 2 }}>
          <Badge color="danger" style={{ color: "white", padding: 2.6 }}>
            <img alt="Arrow" src={Arrow} width="14px" />
          </Badge>
        </p>
      );
    } else {
      return (
        <p key={horse_number + "LMM"} style={{ fontSize: 10, marginBottom: 2 }}>
          <Badge color="danger" style={{ color: "white", padding: 2.6 }}>
            <img alt="Arrow" src={Arrow} width="14px" />
          </Badge>
        </p>
      );
    }
  };

  renderBadge = (
    element,
    maxFirm,
    maxHeavy,
    maxSoft,
    maxGood,
    maxSynth,
    ubMinOdd
  ) => {
    let trackCondition = this.props.trackInfo[0]?.track_condition;
    let horseOdds = element?.ub_win;
    let horseSelection;

    let finalBadge = [];
    if (trackCondition === "F") {
      horseSelection = element?.points_per_firm;
      if (horseSelection === maxFirm) {
        finalBadge.push(this.PTP(element.horse_number));
      }
    } else if (trackCondition === "G") {
      horseSelection = element?.points_per_good;
      if (horseSelection === maxGood) {
        finalBadge.push(this.PTP(element.horse_number));
      }
    } else if (trackCondition === "H") {
      horseSelection = element?.points_per_heavy;
      if (horseSelection === maxHeavy) {
        finalBadge.push(this.PTP(element.horse_number));
      }
    } else if (trackCondition === "SO") {
      horseSelection = element?.points_per_soft;
      if (horseSelection === maxSoft) {
        finalBadge.push(this.PTP(element.horse_number));
      }
    } else if (trackCondition === "SY") {
      horseSelection = element?.points_per_synth;
      if (horseSelection === maxSynth) {
        finalBadge.push(this.PTP(element.horse_number));
      }
    }

    if (horseOdds === ubMinOdd) {
      //render FAV
      finalBadge.push(this.FAV(element.horse_number));
    }
    if (element.is_market_mover === 1) {
      //render MarketMover
      finalBadge.push(this.MM(element.horse_number));
    }
    if (element.lb_mm === 1) {
      //render  LADBROKES MarketMover
      finalBadge.push(this.LBMM(element.horse_number));
    }

    if (!this.props.currentUser && !this.props.trackInfo[0]?.result) {
      return null;
    }

    if (this.props.trackInfo[0]?.is_na && !this.state.isNaChecked) {
      return null;
    }

    if (element?.horse_number === this.state.lmm) {
      finalBadge.push(this.LMM(element.horse_number));
    }

    return finalBadge;
  };

  onChnageSelector = (event) => {
    const val = event.target.value;

    this.lateMM(
      this.props.horses,
      this.props.trackInfo[0]?.race_time,
      val
    ).then((response) => {
      this.setState({ lmm: response, lateTime: val });
    });
  };

  // onChangeReminder = (event) => {
  //     const val = event.target.value
  //     this.setState({ reminder: val })

  //     if ("serviceWorker" in navigator && this.props.isLoggedIn) {
  //     this.triggerNotification(val).catch(err => console.error(err));
  //     }
  // }

  // triggerNotification = async (val) => {
  //     const register = await navigator.serviceWorker.register("/worker.js");
  //     const subscription = await register.pushManager.getSubscription()
  //     ///horse-racing-tips/:date/:venue/:raceNumber/:id
  //     await notifyMe({subscription: subscription,
  //         timer: val,
  //         email: this.props.currentUser.email,
  //         name: this.props.currentUser.firstName,
  //         venue: this.props.match.params.venue,
  //         raceNumber: this.props.match.params.raceNumber,
  //         link: `https://www.ptptips.com.au/${this.props.match.params.date}/${this.props.match.params.venue}/${this.props.match.params.raceNumber}/${this.props.match.params.id}`
  //     })
  // }

  renderBell = () => {
    if (!this.props.trackInfo[0]?.result && this.props.isLoggedIn) {
      return (
        <div
          onClick={() => this.setState({ notifyDrop: !this.state.notifyDrop })}
          style={{
            backgroundColor: this.state.notifyDrop ? "#44BD32" : "#e9ecef",
            height: 30,
            width: 30,
            borderRadius: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Bell
            fontSize="20"
            color={this.state.notifyDrop ? "white" : "grey"}
          />
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    var maxFirm = 0;
    var maxHeavy = 0;
    var maxSoft = 0;
    var maxGood = 0;
    var maxSynth = 0;
    var odds = [];
    this.props.horses.forEach((element) => {
      if (element.points_per_firm > maxFirm) {
        maxFirm = element.points_per_firm;
      }
      if (element.points_per_heavy > maxHeavy) {
        maxHeavy = element.points_per_heavy;
      }
      if (element.points_per_soft > maxSoft) {
        maxSoft = element.points_per_soft;
      }
      if (element.points_per_good > maxGood) {
        maxGood = element.points_per_good;
      }
      if (element.points_per_synth > maxSynth) {
        maxSynth = element.points_per_synth;
      }
      if (element.ub_win !== 0) {
        odds.push(Number(element.ub_win));
      }
    });
    var ubMinOdd = Math.min.apply(Math, odds);

    const horsesList = this.sortTableDefault();
    const data = horsesList.forEach((element, i) => {
      const ubOdds = this.oddsUpdate(
        i,
        element?.ub_win,
        element?.ub_place,
        element?.ub_flucs,
        element?.ub_open_price,
        "Unibet"
      );
      const sbOdds = this.oddsUpdate(
        i,
        element?.sb_win,
        element?.sb_place,
        element?.sb_flucs,
        element?.sb_open_price,
        "sportsBetting"
      );
      if (
        element.horse_status !== "Scratched" &&
        element.horse_status !== "LateScratching"
      ) {
        if (this.state.innerWidth < 769) {
          if (this.state.expanded) {
            return (
              <tr key={i}>
                <th
                  scope="row"
                  style={{
                    padding: 0,
                    minWidth: 160,
                    display: "flex",
                    transition: 0.2,
                  }}
                >
                  {this.renderNum(
                    element?.horse_number,
                    element?.horse_silksUrl
                  )}

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <strong
                      style={{ textTransform: "uppercase", fontSize: 11 }}
                    >
                      {element?.horse_name}({element?.horse_barrier})
                    </strong>
                    <span
                      style={{ fontSize: 11, fontWeight: "300", marginTop: -4 }}
                    >
                      <strong style={{ fontWeight: "bold" }}>J:</strong>{" "}
                      {renderNames(element?.horse_jockey)}
                    </span>
                    <span
                      style={{ fontSize: 11, fontWeight: "300", marginTop: -4 }}
                    >
                      <strong style={{ fontWeight: "bold" }}>T:</strong>{" "}
                      {renderNames(element?.horse_trainer)}
                    </span>
                    <span
                      style={{ fontSize: 11, fontWeight: "300", marginTop: -4 }}
                    >
                      <strong style={{ fontWeight: "bold" }}>W:</strong>{" "}
                      {element?.horse_weight}Kg SF:{element?.horse_sf}
                    </span>
                  </div>
                </th>

                <th style={{ padding: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 4,
                      flexDirection: "column",
                    }}
                  >
                    {this.renderBadge(
                      element,
                      maxFirm,
                      maxHeavy,
                      maxSoft,
                      maxGood,
                      maxSynth,
                      ubMinOdd
                    )}
                  </div>
                </th>

                <th
                  style={{
                    backgroundColor: this.colColor("F"),
                    padding: 0,
                    textAlign: "center",
                  }}
                  scope="row"
                >
                  <div style={{ marginTop: 20 }}>
                    {this.renderPercentages(
                      Math.round(element?.points_per_firm)
                    )}
                  </div>
                </th>
                <th
                  style={{
                    backgroundColor: this.colColor("G"),
                    padding: 0,
                    textAlign: "center",
                  }}
                  scope="row"
                >
                  <div style={{ marginTop: 20 }}>
                    {this.renderPercentages(
                      Math.round(element?.points_per_good)
                    )}
                  </div>
                </th>
                <th
                  style={{
                    backgroundColor: this.colColor("SO"),
                    padding: 0,
                    textAlign: "center",
                  }}
                  scope="row"
                >
                  <div style={{ marginTop: 20 }}>
                    {this.renderPercentages(
                      Math.round(element?.points_per_soft)
                    )}
                  </div>
                </th>
                <th
                  style={{
                    backgroundColor: this.colColor("H"),
                    padding: 0,
                    textAlign: "center",
                  }}
                  scope="row"
                >
                  <div style={{ marginTop: 20 }}>
                    {this.renderPercentages(
                      Math.round(element?.points_per_heavy)
                    )}
                  </div>
                </th>
                <th
                  style={{
                    backgroundColor: this.colColor("SY"),
                    padding: 0,
                    textAlign: "center",
                  }}
                  scope="row"
                >
                  <div style={{ marginTop: 20 }}>
                    {this.renderPercentages(
                      Math.round(element?.points_per_synth)
                    )}
                  </div>
                </th>

                <th style={{ padding: 0, maxWidth: 32 }} scope="row">
                  <div style={{ marginTop: 8 }}>
                    {this.renderOddsAll(
                      sbOdds?.win,
                      sbOdds?.place,
                      sbOdds?.winColor,
                      sbOdds?.placeColor,
                      sbOdds?.winArrow,
                      sbOdds?.placeArrow,
                      "sportsBetting",
                      sbOdds?.max,
                      sbOdds?.min,
                      sbOdds?.openPrice
                    )}
                  </div>
                </th>

                <th style={{ padding: 0 }}>
                  <div style={{ marginTop: 8 }}>
                    {this.renderOddsAll(
                      ubOdds?.win,
                      ubOdds?.place,
                      ubOdds?.winColor,
                      ubOdds?.placeColor,
                      ubOdds?.winArrow,
                      ubOdds?.placeArrow,
                      "Unibet",
                      ubOdds?.max,
                      ubOdds?.min,
                      ubOdds?.openPrice
                    )}
                  </div>
                </th>
              </tr>
            );
          } else {
            return (
              <tr key={i} style={{ height: "32px" }}>
                <th
                  scope="row"
                  style={{ padding: 0, minWidth: 160, display: "flex" }}
                >
                  {this.renderNum(
                    element?.horse_number,
                    element?.horse_silksUrl
                  )}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <strong
                      style={{ textTransform: "uppercase", fontSize: 11 }}
                    >
                      {element?.horse_name}({element?.horse_barrier})
                    </strong>
                    <span
                      style={{ fontSize: 11, fontWeight: "300", marginTop: -4 }}
                    >
                      <strong style={{ fontWeight: "bold" }}>J:</strong>{" "}
                      {renderNames(element?.horse_jockey)}
                    </span>
                    <span
                      style={{ fontSize: 11, fontWeight: "300", marginTop: -4 }}
                    >
                      <strong style={{ fontWeight: "bold" }}>T:</strong>{" "}
                      {renderNames(element?.horse_trainer)}
                    </span>
                    <span
                      style={{ fontSize: 11, fontWeight: "300", marginTop: -4 }}
                    >
                      <strong style={{ fontWeight: "bold" }}>W:</strong>{" "}
                      {element?.horse_weight}Kg SF:{element?.horse_sf}
                    </span>
                  </div>
                </th>

                <th style={{ padding: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 4,
                      flexDirection: "column",
                    }}
                  >
                    {this.renderBadge(
                      element,
                      maxFirm,
                      maxHeavy,
                      maxSoft,
                      maxGood,
                      maxSynth,
                      ubMinOdd
                    )}
                  </div>
                </th>

                <th
                  style={{
                    backgroundColor: this.colColor(
                      this.props.trackInfo[0]?.track_condition
                    ),
                    padding: 0,
                    textAlign: "center",
                  }}
                  scope="row"
                >
                  <div style={{ marginTop: 20 }}>
                    {this.renderSelections(
                      element?.points_per_firm,
                      element?.points_per_good,
                      element?.points_per_soft,
                      element?.points_per_heavy,
                      element?.points_per_synth
                    )}
                  </div>
                </th>

                <th style={{ padding: 0 }} scope="row">
                  <div style={{ marginTop: 8 }}>
                    {this.renderOddsAll(
                      sbOdds?.win,
                      sbOdds?.place,
                      sbOdds?.winColor,
                      sbOdds?.placeColor,
                      sbOdds?.winArrow,
                      sbOdds?.placeArrow,
                      "sportsBetting",
                      sbOdds?.max,
                      sbOdds?.min,
                      sbOdds?.openPrice
                    )}
                  </div>
                </th>

                <th style={{ padding: 0 }}>
                  <div style={{ marginTop: 8 }}>
                    {this.renderOddsAll(
                      ubOdds?.win,
                      ubOdds?.place,
                      ubOdds?.winColor,
                      ubOdds?.placeColor,
                      ubOdds?.winArrow,
                      ubOdds?.placeArrow,
                      "Unibet",
                      ubOdds?.max,
                      ubOdds?.min,
                      ubOdds?.openPrice
                    )}
                  </div>
                </th>
              </tr>
            );
          }
        } //render desktop
        else {
          return (
            <tr key={i}>
              <td style={styles.NumberWebCell}>
                <div style={{ marginLeft: 4, marginBottom: -10 }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: 0,
                    }}
                  >
                    <div style={{ padding: 0, marginLeft: -8 }}>
                      {this.renderNum(
                        element?.horse_number,
                        element?.horse_silksUrl
                      )}
                    </div>

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
                        <div style={{ minWidth: 100 }}>
                          <div style={{ fontSize: 11 }}>
                            <strong>J:</strong>
                            {renderNames(element?.horse_jockey)}
                          </div>
                          <div style={{ fontSize: 11 }}>
                            <strong>T:</strong>
                            {renderNames(element?.horse_trainer)}
                          </div>
                        </div>

                        <div style={{ marginLeft: 8, width: 100 }}>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div style={{ fontSize: 11, width: 50 }}>
                              <strong>W:</strong>
                              {element?.horse_barrier}
                            </div>
                          </div>

                          <div style={{ fontSize: 11 }}>
                            <strong>SF:</strong>
                            {element?.horse_sf}
                          </div>
                        </div>

                        <div
                          style={{
                            marginLeft: 8,
                            width: 100,
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          {this.renderBadge(
                            element,
                            maxFirm,
                            maxHeavy,
                            maxSoft,
                            maxGood,
                            maxSynth,
                            ubMinOdd
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>

              <td
                style={{
                  backgroundColor: this.colColor("F"),
                  padding: 0,
                  textAlign: "center",
                }}
              >
                <p style={{ marginTop: 22 }}>
                  {this.renderPercentages(Math.round(element?.points_per_firm))}
                </p>
              </td>

              <td
                style={{
                  backgroundColor: this.colColor("G"),
                  padding: 0,
                  textAlign: "center",
                }}
              >
                <p style={{ marginTop: 22 }}>
                  {this.renderPercentages(Math.round(element?.points_per_good))}
                </p>
              </td>

              <td
                style={{
                  backgroundColor: this.colColor("SO"),
                  padding: 0,
                  textAlign: "center",
                }}
              >
                <p style={{ marginTop: 22 }}>
                  {this.renderPercentages(Math.round(element?.points_per_soft))}
                </p>
              </td>

              <td
                style={{
                  backgroundColor: this.colColor("H"),
                  padding: 0,
                  textAlign: "center",
                }}
              >
                <p style={{ marginTop: 22 }}>
                  {this.renderPercentages(
                    Math.round(element?.points_per_heavy)
                  )}
                </p>
              </td>

              <td
                style={{
                  backgroundColor: this.colColor("SY"),
                  padding: 0,
                  textAlign: "center",
                }}
              >
                <p style={{ marginTop: 22 }}>
                  {this.renderPercentages(
                    Math.round(element?.points_per_synth)
                  )}
                </p>
              </td>

              <td style={styles.odds_cell}>
                {this.renderOddsAll(
                  sbOdds?.win,
                  sbOdds?.place,
                  sbOdds?.winColor,
                  sbOdds?.placeColor,
                  sbOdds?.winArrow,
                  sbOdds?.placeArrow,
                  "sportsBetting",
                  sbOdds?.max,
                  sbOdds?.min,
                  sbOdds?.openPrice
                )}
              </td>

              <td styles={styles.odds_cell}>
                {this.renderOddsAll(
                  ubOdds?.win,
                  ubOdds?.place,
                  ubOdds?.winColor,
                  ubOdds?.placeColor,
                  ubOdds?.winArrow,
                  ubOdds?.placeArrow,
                  "Unibet",
                  ubOdds?.max,
                  ubOdds?.min,
                  ubOdds?.openPrice
                )}
              </td>
            </tr>
          );
        }
      }
    });

    return (
      <div style={{ padding: 1 }}>
        <div
          style={{
            backgroundColor: "white",
            width: "100%",
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            paddingTop: 8,
            display: "flex",
            flexDirection: "row",
            paddingBottom: 8,
          }}
        >
          <Col
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              marginTop: 8,
            }}
          >
            {/* {this.state.innerWidth > 768 ? <div>
                            <label style={{ marginRight: 8, fontSize: 11 }}>Late MM from:</label>
                            <select onChange={this.onChnageSelector} className="selector" style={styles.lmmSelector} value={this.state.lateTime}>
                                <option value={2}>2 mins</option>
                                <option value={5}>5 mins</option>
                                <option value={10}>10 mins</option>
                                <option value={20}>20 mins</option>
                                <option value={60}>60 mins</option>
                            </select>
                        </div> : null} */}
            {this.renderExpander()}
          </Col>

          <Col
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            {this.state.innerWidth > 769 ? this.renderNA() : null}

            {/* <div style={{ backgroundColor: 'grey', padding: 4, display: 'flex', borderRadius: 4, backgroundColor: this.state.notifyDrop ? '#e9ecef' : 'white' }}>
                            {this.state.notifyDrop ? <select onChange={this.onChangeReminder} className="selector" style={styles.reminderSelector} value={this.state.reminder}>
                                <option value={2}>2 mins</option>
                                <option value={5}>5 mins</option>
                                <option value={10}>10 mins</option>
                                <option value={20}>20 mins</option>
                                <option value={60}>60 mins</option>
                            </select> : null}

                            {this.renderBell()}
                        </div> */}
          </Col>
        </div>

        <div style={{ backgroundColor: "white", padding: 8 }}>
          {this.renderMobileInfo()}
        </div>

        <Table style={styles.table} bordered responsive striped>
          <thead>{this.renderTr()}</thead>
          <tbody>{data}</tbody>
        </Table>

        {this.renderSelectiondate()}
        {this.renderLegend()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // loading: state.raceReducer.loading,
  loading: state.venuesReducer.venuesLoading,
  isExpired: state.auth.isExpired,
  currentUser: state.auth.currentUser,
  isLoggedIn: state.auth.isLoggedIn,
});

export default withRouter(connect(mapStateToProps)(HorseTable));
