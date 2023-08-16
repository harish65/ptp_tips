import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import moment from "moment-timezone";
// import { withStyles } from '@material-ui/core/styles';
import Infos from "../head/common/info";

import Circle from "react-circle";
import {
  Table,
  Badge,
  Col,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faArrowUp,
  faArrowDown,
  faCaretDown,
  faCaretUp,
  faHorseHead,
  faStar,
  faPlusCircle,
  faMinusCircle,
  faAngleUp,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@material-ui/core/Tooltip";
import DropDownArrow from "react-ionicons/lib/MdArrowDropdown";
import SortIconDown from "react-ionicons/lib/MdArrowDropdown";
import SortIconUp from "react-ionicons/lib/MdArrowDropup";
import {
  silkSize,
  renderNames,
  colColor,
  trackColor,
} from "../../../../config/racesUtils";

/*COMPONENT */
import Legend from "./common/legend";
import SelectionDate from "./common/selectionDate";

/* REDUX */
import actions from "../../../../redux/actions/race";
import bkActions from "../../../../redux/actions/blackbook";

/* ICONS */
import Arrow from "../horseTable/assets/arrowDes.png";

/* STYLES */
import "./horseTable.scoped.scss";
import { styles } from "./style";

const HorsesTable = (props) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  // const [isOpen, setIsOpen] = useState(false)
  const [, setData] = useState(props.horses);
  const [expanded, setExpanded] = useState(false);
  const [sortedby, setSortedby] = useState("default");
  const [isNaChecked, setIsNaChecked] = useState(false);
  const [lmm, setLmm] = useState(null);
  // const [reminder, setReminder] = useState(2)
  // const [notifyDrop, setNotifyDrop] = useState(false)
  const [lmmDropdown, setLmmDropdown] = useState(false);
  const [openAreas, setOpenAreas] = useState([]);
  const [insideOpenArea, setInsideOpenAreas] = useState([]);
  const [bkNoteOpen, setBkNoteOpen] = useState(false);
  const [bkSelected, setBkSelected] = useState(null);
  const [bkNotes, setBkNotes] = useState("");

  const handleResize = () => {
    setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    resetOpenColl();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToBlackBook = (data) => {
    setBkNoteOpen(true);
    setBkSelected(data.horse_id);
  };

  const closeBlackBook = () => {
    setBkNoteOpen(false);
    setBkSelected(null);
  };

  const addToBlackBookAction = () => {
    props.addBlackBook({
      horse_id: bkSelected,
      client_id: props.currentUser.id,
      notes: bkNotes,
    });
    setBkNoteOpen(false);
    setBkSelected(null);
  };

  const resetOpenColl = () => {
    let closedRow = [];
    let insideOpenArea = [];
    // console.log(props)
    // eslint-disable-next-line array-callback-return
    props.horses.map((zone) => {
      closedRow.push(false);
      insideOpenArea.push([false, false, false]);
    });
    setOpenAreas(closedRow);
    setInsideOpenAreas(insideOpenArea);
  };

  // const lmmDrop = () => {
  //   setLmmDropdown(!lmmDropdown);
  // };

  const bookie = (val) => {
    let BbUrl = `https://www.boombet.com.au/racing/${props?.trackInfo[0]?.sb_venue_id}/?Referrer=PTPTips`;
    if (val === "sportsBetting") {
      window.open(BbUrl, "_blank");
    } else if (val === "Unibet") {
      //window.open('https://b1.trickyrock.com/redirect.aspx?pid=31144281&bid=21418', '_blank');
      window.open(
        `http://adserving.unibet.com/redirect.aspx?pid=31144281&bid=21418&unibetTarget=/racing%2523/event/${props.trackInfo[0].unibet_venue_id}`,
        "_blank"
      );
    }
  };

  const lateMM = async (data, time, option) => {
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
            if (parseFloat(data[i].ub_win) <= 10) {
              openPrice = parseFloat(data[i].ub_flucs.odd[j]);
              currentPrrice = parseFloat(data[i].ub_win);
              currentPercent =
                100 - ((currentPrrice - 1) / (openPrice - 1)) * 100;
              horse_number = data[i].horse_number;
              j = data[i].ub_flucs.t.length + 1;
            }
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

  const oddsUpdate = (i, price_win, price_place, flucs, openPrice, Bookie) => {
    if (props.oldHorses.length !== 0) {
      var WinOld;
      var PlaceOld;
      var WinNew;
      var PlaceNew;
      let flucs;
      let openPrice;

      if (Bookie === "Unibet") {
        WinOld = props.oldHorses[i]?.ub_win?.toFixed(2);
        PlaceOld = props.oldHorses[i]?.ub_place?.toFixed(2);
        WinNew = props.horses[i]?.ub_win?.toFixed(2);
        PlaceNew = props.horses[i]?.ub_place?.toFixed(2);
        flucs = props.horses[i]?.ub_flucs;
        openPrice = props.horses[i]?.ub_open_price?.toFixed(2);
      } else if (Bookie === "sportsBetting") {
        WinOld = props.oldHorses[i]?.sb_win
          ? props.oldHorses[i].sb_win?.toFixed(2)
          : 0;
        PlaceOld = props.oldHorses[i]?.sb_place
          ? props.oldHorses[i].sb_place?.toFixed(2)
          : 0;
        WinNew = props.horses[i]?.sb_win
          ? props.horses[i].sb_win?.toFixed(2)
          : 0;
        PlaceNew = props.horses[i]?.sb_place
          ? props.horses[i].sb_place?.toFixed(2)
          : 0;
        flucs = props.horses[i]?.sb_flucs;
        openPrice = props.horses[i]?.sb_open_price?.toFixed(2);
      }

      var winColor;
      var placeColor;
      var winArrow;
      var placeArrow;

      if (WinNew > WinOld) {
        winColor = "red";
        winArrow = "up";
      } else if (WinNew < WinOld) {
        winColor = "green";
        winArrow = "down";
      } else if (WinNew === WinOld) {
        winColor = "black";
        winArrow = "";
      }

      if (PlaceNew > PlaceOld) {
        placeColor = "red";
        placeArrow = "up";
      } else if (PlaceNew < PlaceOld) {
        placeColor = "green";
        placeArrow = "down";
      } else if (PlaceNew === PlaceOld) {
        placeColor = "black";
        placeArrow = "";
      }

      return {
        win: WinNew,
        place: PlaceNew,
        winColor: winColor,
        placeColor: placeColor,
        winArrow: winArrow,
        placeArrow: placeArrow,
        max: maxminOdd(flucs, 1),
        min: maxminOdd(flucs, 2),
        openPrice,
      };
    } else {
      if (price_win > 1) {
        return {
          win: price_win?.toFixed(2),
          place: price_place?.toFixed(2),
          winColor: "black",
          placeColor: "black",
          max: maxminOdd(flucs, 1),
          min: maxminOdd(flucs, 2),
          openPrice,
        };
      } else {
        return {
          win: "--",
          place: "--",
          winColor: "black",
          placeColor: "black",
        };
      }
    }
  };
  const maxminOdd = (data, type) => {
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
  };

  const renderArrow = (val) => {
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
      return <div></div>;
    }
  };

  const renderOpen = (val) => {
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

  const renderOddsAll = (
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
        <a style={styles.odds_div} target="_blank" href="/">
          <strong style={{ color: "black" }}>
            {renderArrow(winArrow)}
            {win}
          </strong>
          <span style={{ marginTop: -4, marginBottom: -4 }}>--</span>
          <span style={{ color: "black" }}>
            {renderArrow(placeArrow)}
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
                {renderOpen(openPrice)}
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
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <div style={styles.odds_div} target="blank">
                <Button
                  onClick={() => bookie(bookmaker)}
                  className="odds-button"
                  size="sm"
                  color="default"
                  style={{ padding: 2, width: "100%" }}
                >
                  <div
                    style={{
                      display: "flex",
                      textAlign: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div>{renderArrow(winArrow)}</div>
                    <strong
                      style={{
                        color: props.dark ? "white" : "black",
                        fontSize: props.disableButtons ? 14 : 12,
                      }}
                    >
                      ${win}
                    </strong>
                  </div>
                </Button>

                <div
                  style={{
                    height: 0,
                    backgroundColor: "black",
                    width: 16,
                    marginLeft: 4,
                    marginTop: 2,
                    marginBottom: 2,
                  }}
                ></div>

                <Button
                  onClick={() => bookie(bookmaker)}
                  className="odds-button"
                  size="sm"
                  color="default"
                  style={{ padding: 2, width: "100%" }}
                >
                  <div
                    style={{
                      display: "flex",
                      textAlign: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div>{renderArrow(placeArrow)}</div>
                    <span
                      style={{
                        color: props.dark ? "white" : "black",
                        fontSize: props.disableButtons ? 14 : 12,
                      }}
                    >
                      ${place}
                    </span>
                  </div>
                </Button>
              </div>
            </div>
          </Tooltip>
        );
      } else {
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
                {renderOpen(openPrice)}
                <strong style={{ fontSize: 12, marginTop: 6 }}>
                  <span style={{ fontWeight: "500" }}>High:</span>{" "}
                  <FontAwesomeIcon
                    color="#dc3545"
                    icon={faCaretUp}
                    size="1x"
                    style={{ marginRight: 4 }}
                  />
                  ${Number(win)?.toFixed(2)}
                </strong>
                <strong style={{ fontSize: 12, marginTop: 6 }}>
                  <span style={{ fontWeight: "500" }}>Low:</span>{" "}
                  <FontAwesomeIcon
                    color="#20c997"
                    icon={faCaretDown}
                    size="1x"
                    style={{ marginRight: 4, marginLeft: 3 }}
                  />
                  ${Number(win)?.toFixed(2)}
                </strong>
              </div>
            }
            placement="top"
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <div style={styles.odds_div} target="blank">
                <Button
                  onClick={() => bookie(bookmaker)}
                  className="odds-button"
                  size="sm"
                  color="default"
                  style={{ padding: 2, width: "100%" }}
                >
                  <div
                    style={{
                      display: "flex",
                      textAlign: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div>{renderArrow(winArrow)}</div>
                    <strong
                      style={{
                        color: props.dark ? "white" : "black",
                        fontSize: props.disableButtons ? 14 : 12,
                      }}
                    >
                      ${win}
                    </strong>
                  </div>
                </Button>

                <div
                  style={{
                    height: 0,
                    backgroundColor: "black",
                    width: 16,
                    marginLeft: 4,
                    marginTop: 2,
                    marginBottom: 2,
                  }}
                ></div>

                <Button
                  onClick={() => bookie(bookmaker)}
                  className="odds-button"
                  size="sm"
                  color="default"
                  style={{ padding: 2, width: "100%" }}
                >
                  <div
                    style={{
                      display: "flex",
                      textAlign: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div>{renderArrow(placeArrow)}</div>
                    <span
                      style={{
                        color: props.dark ? "white" : "black",
                        fontSize: props.disableButtons ? 14 : 12,
                      }}
                    >
                      ${place}
                    </span>
                  </div>
                </Button>
              </div>
            </div>
          </Tooltip>
        );
      }
    }
  };

  const renderExpandHead = () => {
    if (expanded) {
      return (
        <>
          <th
            onClick={() => sortByCond("F")}
            style={{
              minWidth: 15,
              paddingLeft: 2,
              paddingRight: 2,
              paddingTop: 2,
              textAlign: "center",
            }}
          >
            <Badge
              style={{
                backgroundColor: trackColor("F"),
                color: "white",
                fontWeight: "bold",
                padding: 5,
              }}
            >
              F %
            </Badge>
          </th>
          <th
            onClick={() => sortByCond("G")}
            style={{
              minWidth: 15,
              paddingLeft: 2,
              paddingRight: 2,
              paddingTop: 2,
              textAlign: "center",
            }}
          >
            <Badge
              style={{
                backgroundColor: trackColor("G"),
                color: "white",
                fontWeight: "bold",
                padding: 5,
              }}
            >
              G %
            </Badge>
          </th>
          <th
            onClick={() => sortByCond("SO")}
            style={{
              minWidth: 15,
              paddingLeft: 2,
              paddingRight: 2,
              paddingTop: 2,
              textAlign: "center",
            }}
          >
            <Badge
              style={{
                backgroundColor: trackColor("SO"),
                color: "white",
                fontWeight: "bold",
                padding: 5,
              }}
            >
              SO %
            </Badge>
          </th>
          <th
            onClick={() => sortByCond("H")}
            style={{
              minWidth: 15,
              paddingLeft: 2,
              paddingRight: 2,
              paddingTop: 2,
              textAlign: "center",
            }}
          >
            <Badge
              style={{
                backgroundColor: trackColor("H"),
                color: "white",
                fontWeight: "bold",
                padding: 5,
              }}
            >
              H %
            </Badge>
          </th>
          <th
            onClick={() => sortByCond("SY")}
            style={{
              minWidth: 15,
              paddingLeft: 2,
              paddingRight: 2,
              paddingTop: 2,
              textAlign: "center",
            }}
          >
            <Badge
              style={{
                backgroundColor: trackColor("SY"),
                color: "white",
                fontWeight: "bold",
                padding: 5,
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
          onClick={() => sortByCond(props.trackInfo[0]?.track_condition)}
          style={{
            minWidth: 15,
            paddingLeft: 2,
            paddingRight: 2,
            paddingTop: 2,
            textAlign: "center",
          }}
        >
          <Badge
            style={{
              backgroundColor: trackColor(props.trackInfo[0]?.track_condition),
              fontWeight: "bold",
              color: "white",
              padding: 5,
            }}
          >
            {props.trackInfo[0]?.track_condition} %
          </Badge>
        </th>
      );
    }
  };

  const renderTr = () => {
    if (innerWidth < 769) {
      return (
        <tr>
          <th style={{ borderRight: 0 }} onClick={sortTale}>
            <strong>
              {" "}
              <span style={{ marginRight: 14 }}>#</span>Horse (Barrier)
            </strong>
          </th>

          <th
            style={{
              borderLeft: 0,
              minWidth: 15,
              paddingTop: 0,
              paddingBottom: 7,
              paddingLeft: 5,
              paddingRight: 5,
              textAlign: "center",
            }}
          >
            {/* <Badge color="gray">
              <FontAwesomeIcon icon={faAngleDown} size="2x" />
            </Badge> */}
          </th>

          {renderExpandHead()}

          <th
            onClick={() => sbOddsSort()}
            style={{
              minWidth: 15,
              paddingLeft: 5,
              paddingRight: 5,
              paddingTop: 2,
              textAlign: "center",
            }}
          >
            <Badge style={{ backgroundColor: "#e12b80", padding: 5 }}>
              <strong style={{ marginLeft: 4, marginRight: 4, color: "white" }}>
                BB
              </strong>
            </Badge>
          </th>

          <th
            onClick={() => ubOddsSort()}
            style={{
              minWidth: 15,
              paddingLeft: 5,
              paddingRight: 5,
              paddingTop: 2,
              textAlign: "center",
            }}
          >
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
          <th
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: -16,
              borderBottom: 0,
              backgroundColor: "white",
            }}
          >
            <div style={{ display: "flex" }}>
              <span
                style={{
                  fontSize: props.disableButtons ? 18 : 14,
                  cursor: "pointer",
                  marginTop: 1,
                  marginRight: 20,
                }}
                onClick={sortTale}
              >
                #
              </span>
              <strong
                style={{
                  marginLeft: 8,
                  fontSize: props.disableButtons ? 16 : 12,
                  marginRight: 20,
                  marginTop: 1,
                }}
              >
                HORSE (Barrier)
              </strong>
              <div style={{ marginTop: -12 }}>{renderlmmSector()}</div>
              {props.trackInfo[0]?.is_na === 1 && (
                <div
                  style={{ alignItems: "center", justifyContent: "flex-start" }}
                >
                  <Col>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 4,
                      }}
                    >
                      <span style={{ fontSize: 11, marginRight: 10 }}>
                        <Badge
                          style={{ backgroundColor: "#f64f60", color: "white" }}
                        >
                          N/R
                        </Badge>
                      </span>
                      <div className="profileCheckBox">
                        <input
                          id="isNaCheckedDes"
                          type="checkbox"
                          className="switch"
                          checked={isNaChecked}
                          onChange={changeIsNA}
                        />
                      </div>
                    </div>
                  </Col>
                </div>
              )}
            </div>
          </th>

          <th
            style={
              (styles.condHeadWeb,
              {
                backgroundColor: colColor(
                  "F",
                  props.trackInfo[0]?.track_condition
                ),
                width: "3%",
              })
            }
            onClick={() => {
              if (!props.disableButtons) {
                sortByCond("F");
              }
            }}
          >
            {!props.disableButtons ? (
              <Badge
                style={{
                  width: 56,
                  cursor: "pointer",
                  backgroundColor: trackColor("F"),
                  color: "white",
                  fontWeight: "bold",
                  padding: 5,
                }}
              >
                <span>Firm %</span>
              </Badge>
            ) : (
              <h4>
                <Badge
                  style={{
                    cursor: "pointer",
                    backgroundColor: trackColor("G"),
                    color: "white",
                    fontWeight: "bold",
                    padding: 5,
                  }}
                >
                  <span>Firm %</span>
                </Badge>
              </h4>
            )}
            <div
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                marginBottom: -8,
              }}
            >
              {renderSortingArrows("F")}
            </div>
          </th>

          <th
            style={
              (styles.condHeadWeb,
              {
                backgroundColor: colColor(
                  "G",
                  props.trackInfo[0]?.track_condition
                ),
                width: "3%",
              })
            }
            onClick={() => {
              if (!props.disableButtons) {
                sortByCond("G");
              }
            }}
          >
            {!props.disableButtons ? (
              <Badge
                style={{
                  width: 56,
                  cursor: "pointer",
                  backgroundColor: trackColor("G"),
                  color: "white",
                  fontWeight: "bold",
                  padding: 5,
                }}
              >
                <span>Good %</span>
              </Badge>
            ) : (
              <h4>
                <Badge
                  style={{
                    cursor: "pointer",
                    backgroundColor: trackColor("G"),
                    color: "white",
                    fontWeight: "bold",
                    padding: 5,
                  }}
                >
                  <span>Good %</span>
                </Badge>
              </h4>
            )}
            <div
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                marginBottom: -8,
              }}
            >
              {renderSortingArrows("G")}
            </div>
          </th>

          <th
            style={
              (styles.condHeadWeb,
              {
                backgroundColor: colColor(
                  "SO",
                  props.trackInfo[0]?.track_condition
                ),
                width: "3%",
              })
            }
            onClick={() => {
              if (!props.disableButtons) {
                sortByCond("SO");
              }
            }}
          >
            {!props.disableButtons ? (
              <Badge
                style={{
                  width: 56,
                  cursor: "pointer",
                  backgroundColor: trackColor("SO"),
                  color: "white",
                  fontWeight: "bold",
                  padding: 5,
                }}
              >
                <span>Soft %</span>
              </Badge>
            ) : (
              <h4>
                <Badge
                  style={{
                    cursor: "pointer",
                    backgroundColor: trackColor("SO"),
                    color: "white",
                    fontWeight: "bold",
                    padding: 5,
                  }}
                >
                  <span>Soft %</span>
                </Badge>
              </h4>
            )}
            <div
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                marginBottom: -8,
              }}
            >
              {renderSortingArrows("SO")}
            </div>
          </th>

          <th
            style={
              (styles.condHeadWeb,
              {
                backgroundColor: colColor(
                  "H",
                  props.trackInfo[0]?.track_condition
                ),
                width: "3%",
              })
            }
            onClick={() => {
              if (!props.disableButtons) {
                sortByCond("H");
              }
            }}
          >
            {!props.disableButtons ? (
              <Badge
                style={{
                  width: 56,
                  cursor: "pointer",
                  backgroundColor: trackColor("H"),
                  color: "white",
                  fontWeight: "bold",
                  padding: 5,
                }}
              >
                <span>Heavy %</span>
              </Badge>
            ) : (
              <h4>
                <Badge
                  style={{
                    cursor: "pointer",
                    backgroundColor: trackColor("H"),
                    color: "white",
                    fontWeight: "bold",
                    padding: 5,
                  }}
                >
                  <span>Heavy %</span>
                </Badge>
              </h4>
            )}
            <div
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                marginBottom: -8,
              }}
            >
              {renderSortingArrows("H")}
            </div>
          </th>

          <th
            style={
              (styles.condHeadWeb,
              {
                backgroundColor: colColor(
                  "SY",
                  props.trackInfo[0]?.track_condition
                ),
                width: "1%",
              })
            }
            onClick={() => {
              if (!props.disableButtons) {
                sortByCond("SY");
              }
            }}
          >
            {!props.disableButtons ? (
              <Badge
                style={{
                  width: 56,
                  cursor: "pointer",
                  backgroundColor: trackColor("SY"),
                  color: "white",
                  fontWeight: "bold",
                  padding: 5,
                }}
              >
                <span>Synth %</span>
              </Badge>
            ) : (
              <h4>
                <Badge
                  style={{
                    cursor: "pointer",
                    backgroundColor: trackColor("SY"),
                    color: "white",
                    fontWeight: "bold",
                    padding: 5,
                  }}
                >
                  <span>Synth %</span>
                </Badge>
              </h4>
            )}
            <div
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                marginBottom: -8,
              }}
            >
              {renderSortingArrows("SY")}
            </div>
          </th>

          <th
            style={styles.oddsHeadWeb}
            onClick={() => {
              if (!props.disableButtons) {
                sbOddsSort();
              }
            }}
          >
            {!props.disableButtons ? (
              <Badge
                style={{
                  backgroundColor: "#e12b80",
                  padding: 5,
                  width: 40,
                  color: "white",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                <span>BB</span>
              </Badge>
            ) : (
              <h4>
                <Badge
                  style={{
                    backgroundColor: "#e12b80",
                    padding: 5,
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  <span>BB</span>
                </Badge>
              </h4>
            )}
            <div
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                marginBottom: -8,
              }}
            >
              {renderSortingArrows("SB")}
            </div>
          </th>

          <th
            style={styles.oddsHeadWeb}
            onClick={() => {
              if (!props.disableButtons) {
                ubOddsSort();
              }
            }}
          >
            {!props.disableButtons ? (
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
            ) : (
              <h4>
                <Badge
                  style={{
                    backgroundColor: "black",
                    padding: 5,
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  <span>UB</span>
                </Badge>
              </h4>
            )}
            <div
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                marginBottom: -8,
              }}
            >
              {renderSortingArrows("UB")}
            </div>
          </th>
        </tr>
      );
    }
  };

  const changeIsNA = (e) => {
    setIsNaChecked(e.target.checked);
  };

  const renderNum = (num, silkURL) => {
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
          <strong style={{ fontSize: props.disableButtons ? 18 : 14 }}>
            {num}
          </strong>
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

  const renderPercentages = (val) => {
    if (props.trackInfo[0]?.is_na === 1 && !isNaChecked) {
      return "--";
    } else if (props.isLoggedIn) {
      if (!props.trackInfo[0]?.result && props.isExpired) {
        return (
          <Link
            title="Sign in or Register To View Selections"
            to="/register"
            style={{ color: "#3f4254" }}
          >
            <FontAwesomeIcon
              icon={faLock}
              size="1x"
              style={{ marginRight: 4 }}
            />
          </Link>
        );
      } else {
        if (Math.round(val) <= 10 && Math.round(val) !== null) {
          return 10;
        } else if (Math.round(val) >= 100) {
          return 100;
        } else {
          return Math.round(val);
        }
      }
    } else {
      if (props.trackInfo[0]?.result) {
        if (Math.round(val) <= 10 && Math.round(val) !== null) {
          return 10;
        } else {
          return Math.round(val);
        }
      } else {
        return (
          <Link
            title="Sign in or Register To View Selections"
            to="/register"
            style={{ color: "#3f4254" }}
          >
            <FontAwesomeIcon
              icon={faLock}
              size="1x"
              style={{ marginRight: 4 }}
            />
          </Link>
        );
      }
    }
  };

  const renderSelections = (firm, good, soft, heavy, synth) => {
    const cond = props.trackInfo[0]?.track_condition;

    if (cond === "G") {
      return renderPercentages(good);
    } else if (cond === "F") {
      return renderPercentages(firm);
    } else if (cond === "SO") {
      return renderPercentages(soft);
    } else if (cond === "H") {
      return renderPercentages(heavy);
    } else if (cond === "SY") {
      return renderPercentages(synth);
    } else if (cond === "N/A") {
      return renderPercentages(good);
    }
  };

  const sortTableDefault = (reset) => {
    const trackCondition = props.trackInfo[0]?.track_condition;
    if (props.isLoggedIn) {
      var HorseData;
      if (trackCondition) {
        if (trackCondition === "F") {
          const fData = props.horses.sort((a, b) =>
            a.points_per_firm > b.points_per_firm ? -1 : 1
          );
          HorseData = fData;
        } else if (trackCondition === "G") {
          const gData = props.horses.sort((a, b) =>
            a.points_per_good > b.points_per_good ? -1 : 1
          );
          HorseData = gData;
        } else if (trackCondition === "SO") {
          const soData = props.horses.sort((a, b) =>
            a.points_per_soft > b.points_per_soft ? -1 : 1
          );
          HorseData = soData;
        } else if (trackCondition === "H") {
          const hData = props.horses.sort((a, b) =>
            a.points_per_heavy > b.points_per_heavy ? -1 : 1
          );
          HorseData = hData;
        } else if (trackCondition === "SY") {
          const syData = props.horses.sort((a, b) =>
            a.points_per_synth > b.points_per_synth ? -1 : 1
          );
          HorseData = syData;
        }

        if (sortedby === "F+") {
          const data = props.horses.sort((a, b) =>
            a.points_per_firm > b.points_per_firm ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "F-") {
          const data = props.horses.sort((a, b) =>
            a.points_per_firm < b.points_per_firm ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "G+") {
          const data = props.horses.sort((a, b) =>
            a.points_per_good > b.points_per_good ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "G-") {
          const data = props.horses.sort((a, b) =>
            a.points_per_good < b.points_per_good ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "SO+") {
          const data = props.horses.sort((a, b) =>
            a.points_per_soft > b.points_per_soft ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "SO-") {
          const data = props.horses.sort((a, b) =>
            a.points_per_soft < b.points_per_soft ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "H+") {
          const data = props.horses.sort((a, b) =>
            a.points_per_heavy > b.points_per_heavy ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "H-") {
          const data = props.horses.sort((a, b) =>
            a.points_per_heavy < b.points_per_heavy ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "SY+") {
          const data = props.horses.sort((a, b) =>
            a.points_per_synth > b.points_per_synth ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "SY-") {
          const data = props.horses.sort((a, b) =>
            a.points_per_synth < b.points_per_synth ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "ub+") {
          const data = props.horses.sort((a, b) =>
            a.ub_win > b.ub_win ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "ub-") {
          const data = props.horses.sort((a, b) =>
            a.ub_win < b.ub_win ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "sb+") {
          const data = props.horses.sort((a, b) =>
            a.sb_win > b.sb_win ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "sb-") {
          const data = props.horses.sort((a, b) =>
            a.ub_win < b.ub_win ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "#-") {
          const data = props.horses.sort((a, b) =>
            a.horse_number < b.horse_number ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "#+") {
          const data = props.horses.sort((a, b) =>
            a.horse_number > b.horse_number ? -1 : 1
          );
          HorseData = data;
        }
      }

      return HorseData;
    } else if (trackCondition) {
      const data = props.horses.sort((a, b) =>
        a.horse_number > b.horse_number ? 1 : -1
      );
      HorseData = data;
      if (props.trackInfo[0]?.result) {
        if (trackCondition === "F") {
          const fData = props.horses.sort((a, b) =>
            a.points_per_firm > b.points_per_firm ? -1 : 1
          );
          HorseData = fData;
        } else if (trackCondition === "G") {
          const gData = props.horses.sort((a, b) =>
            a.points_per_good > b.points_per_good ? -1 : 1
          );
          HorseData = gData;
        } else if (trackCondition === "SO") {
          const soData = props.horses.sort((a, b) =>
            a.points_per_soft > b.points_per_soft ? -1 : 1
          );
          HorseData = soData;
        } else if (trackCondition === "H") {
          const hData = props.horses.sort((a, b) =>
            a.points_per_heavy > b.points_per_heavy ? -1 : 1
          );
          HorseData = hData;
        } else if (trackCondition === "SY") {
          const syData = props.horses.sort((a, b) =>
            a.points_per_synth > b.points_per_synth ? -1 : 1
          );
          HorseData = syData;
        }

        if (sortedby === "F+") {
          const data = props.horses.sort((a, b) =>
            a.points_per_firm > b.points_per_firm ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "F-") {
          const data = props.horses.sort((a, b) =>
            a.points_per_firm < b.points_per_firm ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "G+") {
          const data = props.horses.sort((a, b) =>
            a.points_per_good > b.points_per_good ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "G-") {
          const data = props.horses.sort((a, b) =>
            a.points_per_good < b.points_per_good ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "SO+") {
          const data = props.horses.sort((a, b) =>
            a.points_per_soft > b.points_per_soft ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "SO-") {
          const data = props.horses.sort((a, b) =>
            a.points_per_soft < b.points_per_soft ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "H+") {
          const data = props.horses.sort((a, b) =>
            a.points_per_heavy > b.points_per_heavy ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "H-") {
          const data = props.horses.sort((a, b) =>
            a.points_per_heavy < b.points_per_heavy ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "SY+") {
          const data = props.horses.sort((a, b) =>
            a.points_per_synth > b.points_per_synth ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "SY-") {
          const data = props.horses.sort((a, b) =>
            a.points_per_synth < b.points_per_synth ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "ub+") {
          const data = props.horses.sort((a, b) =>
            a.ub_win > b.ub_win ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "ub-") {
          const data = props.horses.sort((a, b) =>
            a.ub_win < b.ub_win ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "sb+") {
          const data = props.horses.sort((a, b) =>
            a.sb_win > b.sb_win ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "sb-") {
          const data = props.horses.sort((a, b) =>
            a.ub_win < b.ub_win ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "#-") {
          const data = props.horses.sort((a, b) =>
            a.horse_number < b.horse_number ? -1 : 1
          );
          HorseData = data;
        } else if (sortedby === "#+") {
          const data = props.horses.sort((a, b) =>
            a.horse_number > b.horse_number ? -1 : 1
          );
          HorseData = data;
        }
      }
      return HorseData;
    } else {
      return props.horses;
    }
  };

  const sortTale = () => {
    if (sortedby === "#+") {
      setSortedby("#-");
    } else {
      setSortedby("#+");
    }
  };

  const sortByCond = (trackCondition) => {
    if (trackCondition === "F") {
      if (sortedby === "F+") {
        const data = props.horses.sort((a, b) =>
          a.points_per_firm > b.points_per_firm ? -1 : 1
        );
        setData(data);
        setSortedby("F-");
      } else {
        const data = props.horses.sort((a, b) =>
          a.points_per_firm > b.points_per_firm ? 1 : -1
        );
        setData(data);
        setSortedby("F+");
      }
    } else if (trackCondition === "G") {
      if (sortedby === "G+") {
        const data = props.horses.sort((a, b) =>
          a.points_per_good > b.points_per_good ? -1 : 1
        );
        setData(data);
        setSortedby("G-");
      } else {
        const data = props.horses.sort((a, b) =>
          a.points_per_good > b.points_per_good ? 1 : -1
        );
        setData(data);
        setSortedby("G+");
      }
    } else if (trackCondition === "SO") {
      if (sortedby === "SO+") {
        const data = props.horses.sort((a, b) =>
          a.points_per_soft > b.points_per_soft ? -1 : 1
        );
        setData(data);
        setSortedby("SO-");
      } else {
        const data = props.horses.sort((a, b) =>
          a.points_per_soft > b.points_per_soft ? 1 : +1
        );
        setData(data);
        setSortedby("SO+");
      }
    } else if (trackCondition === "H") {
      if (sortedby === "H+") {
        const data = props.horses.sort((a, b) =>
          a.points_per_heavy > b.points_per_heavy ? -1 : 1
        );
        setData(data);
        setSortedby("H-");
      } else {
        const data = props.horses.sort((a, b) =>
          a.points_per_heavy > b.points_per_heavy ? 1 : +1
        );
        setData(data);
        setSortedby("H+");
      }
    } else if (trackCondition === "SY") {
      if (sortedby === "SY+") {
        const data = props.horses.sort((a, b) =>
          a.points_per_synth > b.points_per_synth ? 1 : +1
        );
        setData(data);
        setSortedby("SY-");
      } else {
        const data = props.horses.sort((a, b) =>
          a.points_per_synth > b.points_per_synth ? -1 : 1
        );
        setData(data);
        setSortedby("SY+");
      }
    }
  };

  const ubOddsSort = () => {
    if (!props.disableButtons) {
      if (sortedby === "ub+") {
        const data = props.horses.sort((a, b) =>
          a.ub_win > b.ub_win ? -1 : 1
        );
        setData(data);
        setSortedby("ub-");
      } else {
        const data = props.horses.sort((a, b) =>
          a.ub_win > b.ub_win ? 1 : -1
        );
        setData(data);
        setSortedby("ub+");
      }
    }
  };

  const sbOddsSort = () => {
    if (!props.disableButtons) {
      if (sortedby === "sb+") {
        const data = props.horses.sort((a, b) =>
          a.sb_win > b.sb_win ? -1 : 1
        );
        setData(data);
        setSortedby("sb-");
      } else {
        const data = props.horses.sort((a, b) =>
          a.sb_win > b.sb_win ? 1 : -1
        );
        setData(data);
        setSortedby("sb+");
      }
    }
  };

  const renderSortingArrows = (trackCondition) => {
    if (trackCondition === "F") {
      if (sortedby === "F+") {
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
      } else if (sortedby === "F-") {
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
      if (sortedby === "G+") {
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
      } else if (sortedby === "G-") {
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
      if (sortedby === "SO+") {
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
      } else if (sortedby === "SO-") {
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
      if (sortedby === "H+") {
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
      } else if (sortedby === "H-") {
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
      if (sortedby === "SY+") {
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
      } else if (sortedby === "SY-") {
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
      if (sortedby === "sb+") {
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
      } else if (sortedby === "sb-") {
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
      if (sortedby === "ub+") {
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
      } else if (sortedby === "ub-") {
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

  const ctc = (ctc_track) => {
    if (ctc_track) {
      let tot = ctc_track.length;
      let win = 0;
      let sec = 0;
      let th = 0;
      // eslint-disable-next-line array-callback-return
      ctc_track.map((zone) => {
        if (zone.place === "1st") {
          win++;
        }
        if (zone.place === "2nd") {
          sec++;
        }
        if (zone.place === "3rd") {
          th++;
        }
      });
      return `${tot}:${win}-${sec}-${th}`;
    } else {
      return "0:0-0-0";
    }
  };

  const PTP = (horse_number) => {
    if (innerWidth > 769) {
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

  const FAV = (horse_number) => {
    if (innerWidth > 769) {
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

  const MM = (horse_number) => {
    if (innerWidth > 769) {
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

  const LMM = (horse_number) => {
    if (innerWidth > 769) {
      return (
        <p
          key={horse_number + "LMM"}
          style={{ fontSize: 10, marginRight: 2, cursor: "pointer" }}
          onClick={openLmm}
        >
          <Badge color="danger" style={{ color: "white", padding: 2.6 }}>
            <img alt="Arrow" src={Arrow} width="14px" />
          </Badge>
        </p>
      );
    } else {
      return (
        <p
          key={horse_number + "LMM"}
          style={{ fontSize: 10, marginBottom: 2, cursor: "pointer" }}
          onClick={openLmm}
        >
          <Badge color="danger" style={{ color: "white", padding: 2.6 }}>
            <img alt="Arrow" src={Arrow} width="14px" />
          </Badge>
        </p>
      );
    }
  };

  const renderBadge = (
    element,
    maxFirm,
    maxHeavy,
    maxSoft,
    maxGood,
    maxSynth,
    ubMinOdd
  ) => {
    let trackCondition = props.trackInfo[0]?.track_condition;
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
      finalBadge.push(FAV(element.horse_number));
    }
    if (element.is_market_mover === 1) {
      finalBadge.push(MM(element.horse_number));
    }
    // if (element.lb_mm === 1) {
    //     //render  LADBROKES MarketMover
    //     finalBadge.push(LBMM(element.horse_number))
    // }

    if (!props.currentUser && !props.trackInfo[0]?.result) {
      return null;
    }

    if (props.trackInfo[0]?.is_na && !isNaChecked) {
      return null;
    }

    if (element?.horse_number === lmm) {
      finalBadge.push(LMM(element.horse_number));
    }

    return finalBadge;
  };

  const openLmm = () => {
    setLmmDropdown(!lmmDropdown);
  };

  const onChangeSelector = (value) => {
    const val = value;
    lateMM(props.horses, props.trackInfo[0]?.race_time, Number(val)).then(
      (response) => {
        props.setLmm(val);
        setLmm(response);
      }
    );
  };

  // const triggerNotification = async (val) => {
  //   const register = await navigator.serviceWorker.register("/worker.js");
  //   const subscription = await register.pushManager.getSubscription();
  //   ///tips/:date/:venue/:raceNumber/:id
  //   await notifyMe({
  //     subscription: subscription,
  //     timer: val,
  //     email: props.currentUser.email,
  //     name: props.currentUser.firstName,
  //     venue: props.match.params.venue,
  //     raceNumber: props.match.params.raceNumber,
  //     meetdate: props.trackInfo[0].meetdate,
  //     race_time: props.trackInfo[0].race_time,
  //     link: `https://ptptips.com.au/horse-racing-tips/${props.match.params.date}/${props.match.params.venue}/${props.match.params.raceNumber}/${props.match.params.id}`,
  //   });
  // };

  const renderlmmSector = () => {
    if (window.innerWidth < 700) {
      return (
        <div style={{ padding: 0 }}>
          <Dropdown isOpen={lmmDropdown} toggle={openLmm}>
            <DropdownToggle style={{ padding: 0, width: "auto" }}>
              {/* <div style={{ backgroundColor: 'white', padding: 3, borderRadius: 4, display: 'flex' }}>
                                <span><strong>Late MM: </strong> {props.lmmTime} mins</span>
                                <DropDownArrow fontSize='16' color="grey" />
                            </div> */}
              <div
                color="default"
                style={{ color: "black", backgroundColor: "white", padding: 2 }}
              >
                Late MM <DropDownArrow fontSize="16" color="grey" />
              </div>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>From race start:</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => onChangeSelector(2)}>
                2 Mins
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => onChangeSelector(5)}>
                5 Mins
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => onChangeSelector(10)}>
                10 Mins
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => onChangeSelector(20)}>
                20 Mins
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => onChangeSelector(60)}>
                60 Mins
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    } else {
      return (
        <div style={{ padding: 0 }}>
          <Dropdown isOpen={lmmDropdown} toggle={openLmm}>
            <DropdownToggle style={{ padding: 0, width: "auto", marginTop: 4 }}>
              <div
                style={{
                  backgroundColor: "white",
                  padding: 3,
                  borderRadius: 4,
                  display: "flex",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                >
                  <strong>Late MM: </strong>
                  <div style={{ display: "flex", marginTop: -4 }}>
                    <span style={{ fontSize: 11, textAlign: "left" }}>
                      {props.lmmTime} min
                    </span>
                    <DropDownArrow fontSize="16" color="grey" />
                  </div>
                </div>
              </div>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>From race start:</DropdownItem>
              <DropdownItem onClick={() => onChangeSelector(2)}>
                2 Mins
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => onChangeSelector(5)}>
                5 Mins
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => onChangeSelector(10)}>
                10 Mins
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => onChangeSelector(20)}>
                20 Mins
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => onChangeSelector(60)}>
                60 Mins
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    }
  };

  const openSection = (i) => {
    let finalData = [];
    // eslint-disable-next-line array-callback-return
    openAreas.map((zone, index) => {
      if (i === index) {
        finalData.push(!zone);
      } else {
        finalData.push(zone);
      }
    });
    setOpenAreas(finalData);
    // console.log(finalData);
  };

  const openInsideOpenArea = (i, ind) => {
    let allInside = insideOpenArea[i];
    let modify = !allInside[ind];
    allInside[ind] = modify;

    let finalData = [];
    // eslint-disable-next-line array-callback-return
    insideOpenArea.map((zone, index) => {
      if (ind === index) {
        finalData.push(allInside);
      } else {
        finalData.push(zone);
      }
    });

    setInsideOpenAreas(finalData);
    // console.log(insideOpenArea);
  };

  const checkDaySpell = (lastStart) => {
    if (lastStart?.length > 0) {
      let today = moment().tz("Australia/Sydney");
      let lastDate = moment(lastStart[0]?.meetdate).tz("Australia/Sydney");
      let diff = today.diff(lastDate, "days");
      if (diff > 30) {
        return (
          <div
            style={{
              textAlign: "center",
              color: "black",
              fontSize: 16,
              fontWeight: "bold",
              margin: 5,
            }}
          >
            {diff} Day Spell
          </div>
        );
      }
    }
  };

  const careerHorseStats = (data, type) => {
    let runs = data?.length > 0 ? data?.length : 0;
    let win = 0;
    let second = 0;
    let third = 0;

    // let c = data?.map((zone) => {
    //   if (zone?.place === "1st") {
    //     win++;
    //   }
    //   if (zone?.place === "2nd") {
    //     second++;
    //   }
    //   if (zone?.place === "3rd") {
    //     third++;
    //   }
    // });
    if (type === "carrer") {
      return `${runs}:${win}-${second}-${third}`;
    }
    if (type === "winPerc") {
      if (runs) {
        return ((Number(win) / Number(runs)) * 100)?.toFixed(0);
      } else {
        return 0;
      }
    }
    if (type === "plcPerc") {
      if (runs) {
        return (
          ((Number(win) + Number(second) + Number(third)) / Number(runs)) *
          100
        )?.toFixed(0);
      } else {
        return 0;
      }
    }
  };

  const getHorses = () => {
    var maxFirm = 0;
    var maxHeavy = 0;
    var maxSoft = 0;
    var maxGood = 0;
    var maxSynth = 0;
    var odds = [];
    props.horses.forEach((element) => {
      // console.log('horses',element )
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

    const horsesList = sortTableDefault();
    // eslint-disable-next-line array-callback-return
    const allData = horsesList?.map((element, i) => {
      let last_starts = element.last_starts?.sort(function (a, b) {
        return (
          moment(b.meetdate, "YYYY-MM-DD") - moment(a.meetdate, "YYYY-MM-DD")
        );
      });

      let btria = element.btria?.sort(function (a, b) {
        return (
          moment(b.meetdate, "YYYY-MM-DD") - moment(a.meetdate, "YYYY-MM-DD")
        );
      });

      const ubOdds = oddsUpdate(
        i,
        element?.ub_win,
        element?.ub_place,
        element?.ub_flucs,
        element?.ub_open_price,
        "Unibet"
      );
      const sbOdds = oddsUpdate(
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
        if (innerWidth < 769) {
          if (expanded) {
            let tr = [];
            tr.push(
              <tr key={"smthg-" + i} onClick={() => openSection(i)}>
                <th
                  scope="row"
                  style={{
                    padding: 0,
                    minWidth: 160,
                    display: "flex",
                    borderRight: 0,
                  }}
                >
                  {renderNum(element?.horse_number, element?.horse_silksUrl)}
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
                      <strong style={{ fontWeight: "bold" }}>SF:</strong>{" "}
                      {element?.horse_sf}
                    </span>
                  </div>
                </th>

                <th style={{ padding: 0, borderLeft: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 4,
                      flexDirection: "column",
                    }}
                  >
                    {renderBadge(
                      element,
                      maxFirm,
                      maxHeavy,
                      maxSoft,
                      maxGood,
                      maxSynth,
                      ubMinOdd
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 4,
                      flexDirection: "column",
                    }}
                  >
                    <FontAwesomeIcon icon={faAngleDown} />
                  </div>
                </th>

                <th
                  style={{
                    backgroundColor: colColor(
                      "F",
                      props.trackInfo[0]?.track_condition
                    ),
                    padding: 0,
                    textAlign: "center",
                  }}
                  scope="row"
                >
                  <div style={{ marginTop: 20 }}>
                    {renderPercentages(Math.round(element?.points_per_firm))}
                  </div>
                </th>

                <th
                  style={{
                    backgroundColor: colColor(
                      "G",
                      props.trackInfo[0]?.track_condition
                    ),
                    padding: 0,
                    textAlign: "center",
                  }}
                  scope="row"
                >
                  <div style={{ marginTop: 20 }}>
                    {renderPercentages(Math.round(element?.points_per_good))}
                  </div>
                </th>

                <th
                  style={{
                    backgroundColor: colColor(
                      "SO",
                      props.trackInfo[0]?.track_condition
                    ),
                    padding: 0,
                    textAlign: "center",
                  }}
                  scope="row"
                >
                  <div style={{ marginTop: 20 }}>
                    {renderPercentages(Math.round(element?.points_per_soft))}
                  </div>
                </th>

                <th
                  style={{
                    backgroundColor: colColor(
                      "H",
                      props.trackInfo[0]?.track_condition
                    ),
                    padding: 0,
                    textAlign: "center",
                  }}
                  scope="row"
                >
                  <div style={{ marginTop: 20 }}>
                    {renderPercentages(Math.round(element?.points_per_heavy))}
                  </div>
                </th>

                <th
                  style={{
                    backgroundColor: colColor(
                      "SY",
                      props.trackInfo[0]?.track_condition
                    ),
                    padding: 0,
                    textAlign: "center",
                  }}
                  scope="row"
                >
                  <div style={{ marginTop: 20 }}>
                    {renderPercentages(Math.round(element?.points_per_synth))}
                  </div>
                </th>

                <th style={{ padding: 0, maxWidth: 32 }} scope="row">
                  <div style={{ mrenderOddsAarginTop: 8 }}>
                    {renderOddsAll(
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
                    {/* <b>N/A</b> */}
                  </div>
                </th>

                <th style={{ padding: 0, maxWidth: 32 }} scope="row">
                  <div style={{ mrenderOddsAarginTop: 8 }}>
                    {renderOddsAll(
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
            tr.push(
              <tr key={"smthg2-" + i}>
                <td colSpan="9" style={{ height: 0, padding: 0 }}>
                  <Collapse
                    isOpen={openAreas[i]}
                    style={{
                      backgroundColor: "#252525",
                      // minHeight: "auto",
                      // width: "100%",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {/*<div style={{ display: 'flex', padding: 5, paddingLeft: 10, fontSize: 10 }}>*/}
                    <Row
                      style={{ color: "white", fontSize: 10, marginBottom: 7 }}
                    >
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Career
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {careerHorseStats(last_starts, "carrer")}
                        </p>
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Prize Money
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {element.prize_money}
                        </p>
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Weight
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {element?.horse_weight}Kg
                        </p>
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Dam
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {element.dam_name}
                        </p>
                      </Col>
                    </Row>

                    <Row
                      style={{ color: "white", fontSize: 10, marginBottom: 5 }}
                    >
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Age
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>{element.age}</p>
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Sex
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>{element.sex}</p>
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Sire
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {element.sire_name}
                        </p>
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Firm
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {element.firm_stat}
                        </p>
                      </Col>
                    </Row>

                    <Row
                      style={{ color: "white", fontSize: 10, marginBottom: 5 }}
                    >
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Good
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {element.good_stat}
                        </p>
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Soft
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {element.soft_stat}
                        </p>
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Heavy
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {element.heavy_stat}
                        </p>
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Synth.
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {element.synth_stat}
                        </p>
                      </Col>
                    </Row>

                    <Row
                      style={{ color: "white", fontSize: 10, marginBottom: 5 }}
                    >
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Track
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>{element.track}</p>
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Distance
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {element.distance}
                        </p>
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Trk/Dst
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {element.trk_dist}
                        </p>
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Wins
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {Number(
                            careerHorseStats(last_starts, "carrer")
                              ?.split(":")[1]
                              ?.split("-")[0]
                          )}{" "}
                          [{careerHorseStats(last_starts, "winPerc")}%]
                        </p>
                      </Col>
                    </Row>

                    <Row
                      style={{ color: "white", fontSize: 10, marginBottom: 5 }}
                    >
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          CTC/Track{" "}
                        </p>
                        {props.isLoggedIn && !props.isExpired ? (
                          ctc(element.ctc_track)
                        ) : (
                          <FontAwesomeIcon
                            icon={faLock}
                            size="1x"
                            style={{ marginRight: 4 }}
                          />
                        )}
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          CTC/Dst{" "}
                        </p>
                        {props.isLoggedIn && !props.isExpired ? (
                          ctc(element.ctc_dist)
                        ) : (
                          <FontAwesomeIcon
                            icon={faLock}
                            size="1x"
                            style={{ marginRight: 4 }}
                          />
                        )}
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          CTC/Trk/Dst{" "}
                        </p>
                        {props.isLoggedIn && !props.isExpired ? (
                          ctc(element.ctc_track_dist)
                        ) : (
                          <FontAwesomeIcon
                            icon={faLock}
                            size="1x"
                            style={{ marginRight: 4 }}
                          />
                        )}
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Places
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {Number(
                            careerHorseStats(last_starts, "carrer")
                              .split(":")[1]
                              ?.split("-")[0]
                          ) +
                            Number(
                              careerHorseStats(last_starts, "carrer")
                                ?.split(":")[1]
                                ?.split("-")[1]
                            ) +
                            Number(
                              careerHorseStats(last_starts, "carrer")
                                ?.split(":")[1]
                                ?.split("-")[2]
                            )}{" "}
                          [{careerHorseStats(last_starts, "plcPerc")}%]
                        </p>
                      </Col>
                    </Row>

                    <div
                      style={{
                        color: "white",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      Recent Starts
                    </div>
                    {checkDaySpell(last_starts)}
                    <Row
                      style={{
                        color: "white",
                        fontSize: 10,
                        marginTop: 5,
                        padding: 5,
                      }}
                    >
                      
                      {
                      // eslint-disable-next-line array-callback-return
                      last_starts?.map((zone, ind) => {
                        if (ind < 3) {
                          return (
                            <Col
                              key={"smt-" + ind}
                              xs={12}
                              onClick={() => openInsideOpenArea(i, ind)}
                            >
                              <Row
                                style={{
                                  backgroundColor: "#3c3c3c",
                                  borderRadius: 2,
                                  padding: 3,
                                }}
                              >
                                <Col
                                  xs={2}
                                  style={{
                                    color: "white",
                                    fontSize: 10,
                                    textAlign: "center",
                                  }}
                                >
                                  {zone.place}/{zone.tot_horses}
                                </Col>
                                <Col
                                  xs={3}
                                  style={{
                                    color: "white",
                                    fontSize: 10,
                                    textAlign: "center",
                                    padding: 0,
                                  }}
                                >
                                  {moment(zone.meetdate).format("DD-MM-YYYY")}
                                </Col>
                                <Col
                                  xs={2}
                                  style={{
                                    color: "white",
                                    fontSize: 10,
                                    textAlign: "center",
                                  }}
                                >
                                  {zone.venue_code.toUpperCase()}
                                </Col>
                                <Col
                                  xs={2}
                                  style={{
                                    color: "white",
                                    fontSize: 10,
                                    textAlign: "center",
                                  }}
                                >
                                  {zone.distance}M
                                </Col>
                                <Col
                                  xs={2}
                                  style={{
                                    color: "white",
                                    fontSize: 10,
                                    textAlign: "center",
                                  }}
                                >
                                  {zone.track_condition}
                                </Col>
                                <Col
                                  xs={1}
                                  style={{
                                    color: "white",
                                    fontSize: 10,
                                    textAlign: "left",
                                    paddingLeft: 0,
                                  }}
                                >
                                  {insideOpenArea[i]?.[ind] ? (
                                    <FontAwesomeIcon icon="check-square" />
                                  ) : (
                                    <FontAwesomeIcon
                                      icon={faPlusCircle}
                                      size="1x"
                                    />
                                  )}
                                </Col>
                              </Row>
                              <Row
                                style={{
                                  marginBottom: 5,
                                  backgroundColor: "#3c3c3c",
                                }}
                              >
                                <Collapse
                                  isOpen={insideOpenArea[i]?.[ind]}
                                  style={{
                                    backgroundColor: "#3c3c3c",
                                    // width: "100%",
                                    padding: 0,
                                    margin: 0,
                                  }}
                                >
                                  <Row style={{ padding: 0, margin: 0 }}>
                                    <Col
                                      xs={6}
                                      style={{
                                        color: "white",
                                        fontSize: 10,
                                        textAlign: "left",
                                      }}
                                    >
                                      <p style={{ margin: 0 }}>
                                        <span style={{ fontSize: 11 }}>
                                          Class:
                                        </span>{" "}
                                        {zone.class}
                                      </p>
                                      <p style={{ margin: 0 }}>
                                        <span style={{ fontSize: 11 }}>
                                          Jokey:
                                        </span>{" "}
                                        {zone.jockey}
                                      </p>
                                      <p style={{ margin: 0 }}>
                                        <span style={{ fontSize: 11 }}>
                                          Weight:
                                        </span>{" "}
                                        {zone.weight}Kg
                                      </p>
                                      <p style={{ margin: 0 }}>
                                        <span style={{ fontSize: 11 }}>
                                          Barrier:
                                        </span>{" "}
                                        {zone.barrier}
                                      </p>
                                    </Col>
                                    <Col xs={6}>
                                      <p style={{ margin: 0 }}>
                                        <span style={{ fontSize: 11 }}>
                                          Margin:
                                        </span>{" "}
                                        {zone.margin}L
                                      </p>
                                      <p style={{ margin: 0 }}>
                                        <span style={{ fontSize: 11 }}>
                                          SP:
                                        </span>{" "}
                                        {zone.odds}
                                      </p>
                                      <p style={{ margin: 0 }}>
                                        <span style={{ fontSize: 11 }}>
                                          Win/Sec:
                                        </span>{" "}
                                        {zone.winner_sec}
                                      </p>
                                      {/* <p style={{ margin: 0 }}><span style={{ fontSize: 11 }}>Win Time:</span> {zone.win_time}</p> */}
                                    </Col>
                                  </Row>
                                </Collapse>
                              </Row>
                            </Col>
                          );
                        }
                      })}
                    </Row>
                    <div
                      style={{
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "center",
                      }}
                    >
                      {props.isLoggedIn && (
                        <div
                          style={{
                            width: "30%",
                            minHeight: 25,
                            backgroundColor: "lightgray",
                            fontSize: 10,
                            borderRadius: 5,
                            cursor: "pointer",
                            marginRight: 10,
                            textAlign: "center",
                            paddingTop: 5,
                          }}
                          onClick={() => addToBlackBook(element)}
                        >
                          {!props.blackBookLoading
                            ? "Add to BlackBook"
                            : "Loading..."}
                        </div>
                      )}
                      <Link
                        to={`/profile/horse/${
                          element?.horse_id
                        }/${element?.horse_name.split(" ").join("-")}`}
                        style={{
                          width: "30%",
                          minHeight: 25,
                          backgroundColor: "lightgray",
                          borderRadius: 5,
                          fontSize: 10,
                          cursor: "pointer",
                          textAlign: "center",
                          paddingTop: 5,
                          color: "#3c3c3c",
                          marginRight: 10,
                        }}
                      >
                        View Profile
                      </Link>
                      {/* <div style={{ width: '30%', minHeight: 25, fontSize: 10, backgroundColor: 'lightgray', borderRadius: 5, cursor: 'pointer', marginRight: 10, textAlign: 'center', paddingTop: 5 }}>
                                            Full Form
                                                </div> */}
                    </div>
                  </Collapse>
                </td>
              </tr>
            );
            return tr;
          } else {
            let tr = [];
            tr.push(
              <tr
                key={`abc${i}`}
                style={{ height: "32px" }}
                onClick={() => openSection(i)}
              >
                <th
                  scope="row"
                  style={{
                    padding: 0,
                    minWidth: 170,
                    display: "flex",
                    border: 0,
                  }}
                >
                  {renderNum(element?.horse_number, element?.horse_silksUrl)}
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
                      <strong style={{ fontWeight: "bold" }}>SF:</strong>{" "}
                      {element?.horse_sf}
                    </span>
                  </div>
                </th>

                <th style={{ padding: 0, border: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 4,
                      flexDirection: "column",
                    }}
                  >
                    {renderBadge(
                      element,
                      maxFirm,
                      maxHeavy,
                      maxSoft,
                      maxGood,
                      maxSynth,
                      ubMinOdd
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 4,
                      flexDirection: "column",
                    }}
                  >
                    <FontAwesomeIcon icon={faAngleDown} />
                  </div>
                </th>

                <th
                  style={{
                    backgroundColor: colColor(
                      props.trackInfo[0]?.track_condition
                    ),
                    padding: 0,
                    textAlign: "center",
                  }}
                  scope="row"
                >
                  <div style={{ marginTop: 20 }}>
                    {renderSelections(
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
                    {renderOddsAll(
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
                    {/* <b>N/A</b> */}
                  </div>
                </th>

                <th style={{ padding: 0 }}>
                  <div style={{ marginTop: 8 }}>
                    {renderOddsAll(
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
            tr.push(
              <tr key={`abc2${i}`}>
                <td colSpan="8" style={{ height: 0, padding: 0 }}>
                  <Collapse
                    className="clearfix"
                    isOpen={openAreas[i]}
                    style={{
                      backgroundColor: "#252525",
                      minHeight: 130,

                      width: "100%",
                      // padding: 0,
                      // margin:0
                    }}
                  >
                    {/*<div style={{ display: 'flex', padding: 5, paddingLeft: 10, fontSize: 10 }}>*/}
                    <Row
                      className="clearfix"
                      style={{ color: "white", fontSize: 10, marginBottom: 5 }}
                    >
                      <Col className="clearfix" xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Career
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {careerHorseStats(last_starts, "carrer")}
                        </p>
                      </Col>
                      <Col className="clearfix" xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Prize Money
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {element.prize_money}
                        </p>
                      </Col>
                      <Col className="clearfix" xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Weight
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {element?.horse_weight}Kg
                        </p>
                      </Col>
                      <Col className="clearfix" xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Dam
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {element.dam_name}
                        </p>
                      </Col>
                    </Row>

                    <Row
                      className="clearfix"
                      style={{ color: "white", fontSize: 10, marginBottom: 5 }}
                    >
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Age
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>{element.age}</p>
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Sex
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>{element.sex}</p>
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Sire
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {element.sire_name}
                        </p>
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Firm
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {element.firm_stat}
                        </p>
                      </Col>
                    </Row>

                    <Row
                      style={{ color: "white", fontSize: 10, marginBottom: 5 }}
                    >
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Good
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {element.good_stat}
                        </p>
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Soft
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {element.soft_stat}
                        </p>
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Heavy
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {element.heavy_stat}
                        </p>
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Synth.
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {element.synth_stat}
                        </p>
                      </Col>
                    </Row>

                    <Row
                      style={{ color: "white", fontSize: 10, marginBottom: 5 }}
                    >
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Track
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>{element.track}</p>
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Distance
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {element.distance}
                        </p>
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Trk/Dst
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {element.trk_dist}
                        </p>
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Wins
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {Number(
                            careerHorseStats(last_starts, "carrer")
                              ?.split(":")[1]
                              ?.split("-")[0]
                          )}{" "}
                          [{careerHorseStats(last_starts, "winPerc")}%]
                        </p>
                      </Col>
                    </Row>

                    <Row
                      style={{ color: "white", fontSize: 10, marginBottom: 5 }}
                    >
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          CTC/Track{" "}
                        </p>
                        {props.isLoggedIn && !props.isExpired ? (
                          ctc(element.ctc_track)
                        ) : (
                          <FontAwesomeIcon
                            icon={faLock}
                            size="1x"
                            style={{ marginRight: 4 }}
                          />
                        )}
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          CTC/Dst{" "}
                        </p>
                        {props.isLoggedIn && !props.isExpired ? (
                          ctc(element.ctc_dist)
                        ) : (
                          <FontAwesomeIcon
                            icon={faLock}
                            size="1x"
                            style={{ marginRight: 4 }}
                          />
                        )}
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          CTC/Trk/Dst{" "}
                        </p>
                        {props.isLoggedIn && !props.isExpired ? (
                          ctc(element.ctc_track_dist)
                        ) : (
                          <FontAwesomeIcon
                            icon={faLock}
                            size="1x"
                            style={{ marginRight: 4 }}
                          />
                        )}
                      </Col>
                      <Col xs={3}>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          Places
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>
                          {Number(
                            careerHorseStats(last_starts, "carrer")
                              ?.split(":")[1]
                              ?.split("-")[0]
                          ) +
                            Number(
                              careerHorseStats(last_starts, "carrer")
                                ?.split(":")[1]
                                ?.split("-")[1]
                            ) +
                            Number(
                              careerHorseStats(last_starts, "carrer")
                                ?.split(":")[1]
                                ?.split("-")[2]
                            )}{" "}
                          [{careerHorseStats(last_starts, "plcPerc")}%]
                        </p>
                      </Col>
                    </Row>

                    <div
                      style={{
                        color: "white",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      Recent Starts
                    </div>
                    {checkDaySpell(last_starts)}
                    <Row
                      style={{
                        color: "white",
                        fontSize: 10,
                        marginTop: 5,
                        padding: 5,
                        marginRight: 0,
                        overflow: "hidden",
                      }}
                    >
                      {
                      // eslint-disable-next-line array-callback-return
                      last_starts?.map((zone, ind) => {
                        if (ind < 3) {
                          return (
                            <Col
                              key={"smthg-" + ind}
                              xs={12}
                              onClick={() => openInsideOpenArea(i, ind)}
                            >
                              <Row
                                style={{
                                  backgroundColor: "#3c3c3c",
                                  borderRadius: 2,
                                  padding: 3,
                                }}
                              >
                                <Col
                                  xs={2}
                                  style={{
                                    color: "white",
                                    fontSize: 10,
                                    textAlign: "center",
                                  }}
                                >
                                  {zone.place}/{zone.tot_horses}
                                </Col>
                                <Col
                                  xs={3}
                                  style={{
                                    color: "white",
                                    fontSize: 10,
                                    textAlign: "center",
                                    padding: 0,
                                  }}
                                >
                                  {moment(zone.meetdate).format("DD-MM-YYYY")}
                                </Col>
                                <Col
                                  xs={2}
                                  style={{
                                    color: "white",
                                    fontSize: 10,
                                    textAlign: "center",
                                  }}
                                >
                                  {zone.venue_code.toUpperCase()}
                                </Col>
                                <Col
                                  xs={2}
                                  style={{
                                    color: "white",
                                    fontSize: 10,
                                    textAlign: "center",
                                  }}
                                >
                                  {zone.distance}M
                                </Col>
                                <Col
                                  xs={2}
                                  style={{
                                    color: "white",
                                    fontSize: 10,
                                    textAlign: "center",
                                  }}
                                >
                                  {zone.track_condition}
                                </Col>
                                <Col
                                  xs={1}
                                  style={{
                                    color: "white",
                                    fontSize: 10,
                                    textAlign: "left",
                                    paddingLeft: 0,
                                  }}
                                >
                                  {insideOpenArea[i]?.[ind] ? (
                                    <FontAwesomeIcon
                                      icon={faMinusCircle}
                                      size="1x"
                                    />
                                  ) : (
                                    <FontAwesomeIcon
                                      icon={faPlusCircle}
                                      size="1x"
                                    />
                                  )}
                                </Col>
                              </Row>
                              <Row style={{ marginBottom: 5 }}>
                                <Collapse
                                  isOpen={insideOpenArea[i]?.[ind]}
                                  style={{
                                    backgroundColor: "#3c3c3c",
                                    width: "100%",
                                    // padding: 0,
                                    // margin:0
                                  }}
                                >
                                  <Row style={{ padding: 0, margin: 0 }}>
                                    <Col
                                      xs={6}
                                      style={{
                                        color: "white",
                                        fontSize: 10,
                                        textAlign: "left",
                                      }}
                                    >
                                      <p style={{ margin: 0 }}>
                                        <span style={{ fontSize: 11 }}>
                                          Class:
                                        </span>{" "}
                                        {zone.class}
                                      </p>
                                      <p style={{ margin: 0 }}>
                                        <span style={{ fontSize: 11 }}>
                                          Jokey:
                                        </span>{" "}
                                        {zone.jockey}
                                      </p>
                                      <p style={{ margin: 0 }}>
                                        <span style={{ fontSize: 11 }}>
                                          Weight:
                                        </span>{" "}
                                        {zone.weight}Kg
                                      </p>
                                      <p style={{ margin: 0 }}>
                                        <span style={{ fontSize: 11 }}>
                                          Barrier:
                                        </span>{" "}
                                        {zone.barrier}
                                      </p>
                                    </Col>
                                    <Col xs={6}>
                                      <p style={{ margin: 0 }}>
                                        <span style={{ fontSize: 11 }}>
                                          Margin:
                                        </span>{" "}
                                        {zone.margin}L
                                      </p>
                                      <p style={{ margin: 0 }}>
                                        <span style={{ fontSize: 11 }}>
                                          SP:
                                        </span>{" "}
                                        {zone.odds}
                                      </p>
                                      <p style={{ margin: 0 }}>
                                        <span style={{ fontSize: 11 }}>
                                          Win/Sec:
                                        </span>{" "}
                                        {zone.winner_sec}
                                      </p>
                                      {/* <p style={{ margin: 0 }}><span style={{ fontSize: 11 }}>Win Time:</span> {zone.win_time}</p> */}
                                    </Col>
                                  </Row>
                                </Collapse>
                              </Row>
                            </Col>
                          );
                        }
                      })}
                    </Row>

                    <div
                      style={{
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "center",
                      }}
                    >
                      {props.isLoggedIn && (
                        <div
                          style={{
                            width: "30%",
                            minHeight: 25,
                            backgroundColor: "lightgray",
                            fontSize: 10,
                            borderRadius: 5,
                            cursor: "pointer",
                            marginRight: 10,
                            textAlign: "center",
                            paddingTop: 5,
                          }}
                          onClick={() => addToBlackBook(element)}
                        >
                          {!props.blackBookLoading
                            ? "Add to BlackBook"
                            : "Loading..."}
                        </div>
                      )}
                      <Link
                        to={`/profile/horse/${
                          element?.horse_id
                        }/${element?.horse_name.split(" ").join("-")}`}
                        style={{
                          width: "30%",
                          minHeight: 25,
                          backgroundColor: "lightgray",
                          borderRadius: 5,
                          fontSize: 10,
                          cursor: "pointer",
                          textAlign: "center",
                          paddingTop: 5,
                          color: "#3c3c3c",
                          marginRight: 10,
                        }}
                      >
                        View Profile
                      </Link>
                      {/* <div style={{ width: '30%', minHeight: 25, fontSize: 10, backgroundColor: 'lightgray', borderRadius: 5, cursor: 'pointer', marginRight: 10, textAlign: 'center', paddingTop: 5 }}>
                                            Full Form
                                                </div> */}
                    </div>
                  </Collapse>
                </td>
              </tr>
            );
            return tr;
          }
        } //render desktop
        else {
          // console.log('element', element)
          let tr = [];
          tr.push(
            <tr
              className="row-hover"
              key={`desk${i}`}
              style={{ cursor: "pointer" }}
              onClick={() => openSection(i)}
            >
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
                      {renderNum(
                        element?.horse_number,
                        element?.horse_silksUrl
                      )}
                    </div>

                    <div style={{ textAlign: "Left" }}>
                      <p style={{ textDecoration: "underline" }}>
                        {element?.horse_id !== null ? (
                          <Link
                            style={{ color: props.dark ? "white" : "black" }}
                            to={`/profile/horse/${
                              element?.horse_id
                            }/${element?.horse_name.split(" ").join("-")}`}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontWeight: "700",
                                fontSize: props.dark ? 18 : 14,
                              }}
                            >
                              {element?.horse_name} ({element?.horse_barrier})
                            </span>
                          </Link>
                        ) : (
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontWeight: "700",
                              fontSize: props.dark ? 18 : 14,
                            }}
                          >
                            {element?.horse_name}({element?.horse_barrier})
                          </span>
                        )}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginTop: -16,
                        }}
                      >
                        <div style={{ minWidth: 100 }}>
                          <div
                            style={{ fontSize: props.disableButtons ? 14 : 11 }}
                          >
                            <strong>J:</strong>
                            {element?.jockey_id !== null &&
                            element?.horse_jockey !== null ? (
                              <Link
                                style={{
                                  color: props.dark ? "white" : "black",
                                }}
                                to={`/profile/jockey/${
                                  element?.jockey_id
                                }/${(element?.horse_jockey)
                                  .split(" ")
                                  .join("-")}`}
                              >
                                <span style={{ textDecoration: "underline" }}>
                                  {renderNames(element?.horse_jockey)}
                                </span>
                              </Link>
                            ) : (
                              <span style={{ textDecoration: "underline" }}>
                                {renderNames(element?.horse_jockey)}
                              </span>
                            )}
                          </div>
                          <div
                            style={{ fontSize: props.disableButtons ? 14 : 11 }}
                          >
                            <strong>T:</strong>{" "}
                            {element?.trainer_id !== null ? (
                              <Link
                                style={{
                                  color: props.dark ? "white" : "black",
                                }}
                                to={`/profile/trainer/${element?.trainer_id}`}
                              >
                                {renderNames(element?.horse_trainer)}
                              </Link>
                            ) : (
                              renderNames(element?.horse_trainer)
                            )}
                          </div>
                        </div>

                        <div style={{ marginLeft: 8, width: 100 }}>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                fontSize: props.disableButtons ? 14 : 11,
                                width: 50,
                              }}
                            >
                              <strong>W:</strong>
                              {Number(element?.horse_weight).toFixed(1)}kg
                            </div>
                          </div>

                          <div
                            style={{ fontSize: props.disableButtons ? 14 : 11 }}
                          >
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
                          {renderBadge(
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
                    <div
                      style={{
                        margin: 0,
                        padding: 0,
                        paddingRight: 10,
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ fontSize: 10, marginRight: 2 }}>
                        {!openAreas[i] ? (
                          <Badge color="gray">
                            <FontAwesomeIcon icon={faAngleDown} size="2x" />
                          </Badge>
                        ) : (
                          <Badge color="gray">
                            <FontAwesomeIcon icon={faAngleUp} size="2x" />
                          </Badge>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </td>

              <td
                style={{
                  backgroundColor: colColor(
                    "F",
                    props.trackInfo[0]?.track_condition
                  ),
                  padding: 0,
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    marginTop: 22,
                    fontSize: props.disableButtons ? 18 : 14,
                  }}
                >
                  {renderPercentages(Math.round(element?.points_per_firm))}
                </p>
              </td>

              <td
                style={{
                  backgroundColor: colColor(
                    "G",
                    props.trackInfo[0]?.track_condition
                  ),
                  padding: 0,
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    marginTop: 22,
                    fontSize: props.disableButtons ? 18 : 14,
                  }}
                >
                  {renderPercentages(Math.round(element?.points_per_good))}
                </p>
              </td>

              <td
                style={{
                  backgroundColor: colColor(
                    "SO",
                    props.trackInfo[0]?.track_condition
                  ),
                  padding: 0,
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    marginTop: 22,
                    fontSize: props.disableButtons ? 18 : 14,
                  }}
                >
                  {renderPercentages(Math.round(element?.points_per_soft))}
                </p>
              </td>

              <td
                style={{
                  backgroundColor: colColor(
                    "H",
                    props.trackInfo[0]?.track_condition
                  ),
                  padding: 0,
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    marginTop: 22,
                    fontSize: props.disableButtons ? 18 : 14,
                  }}
                >
                  {renderPercentages(Math.round(element?.points_per_heavy))}
                </p>
              </td>

              <td
                style={{
                  backgroundColor: colColor(
                    "SY",
                    props.trackInfo[0]?.track_condition
                  ),
                  padding: 0,
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    marginTop: 22,
                    fontSize: props.disableButtons ? 18 : 14,
                  }}
                >
                  {renderPercentages(Math.round(element?.points_per_synth))}
                </p>
              </td>

              <td style={{ textAlign: "center" }}>
                {renderOddsAll(
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
                {/* <b>N/A</b> */}
              </td>

              <td style={{ textAlign: "center" }}>
                {renderOddsAll(
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

          tr.push(
            <tr key={`desk2${i}`}>
              <td colSpan="8" style={{ height: 0, padding: 0, fontSize: 12 }}>
                <Collapse
                  isOpen={openAreas[i]}
                  style={{
                    backgroundColor: "white",
                    // minHeight: 130,
                    // width: "100%",

                    margin: 0,
                    padding: 0,
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      padding: 5,
                      paddingLeft: 10,
                      fontSize: 12,
                    }}
                  >
                    <div style={{ width: "80%" }}>
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          color: "#252525",
                          borderBottom: "red",
                        }}
                      >
                        <Col xs={2}>
                          <h6 style={{ color: "#252525", fontWeight: 600 }}>
                            Career
                          </h6>
                          <p>{careerHorseStats(last_starts, "carrer")}</p>
                        </Col>
                        <Col xs={2}>
                          <h6 style={{ color: "#252525", fontWeight: 600 }}>
                            Prize Money
                          </h6>
                          <p>${element.prize_money}</p>
                        </Col>

                        <Col xs={2}>
                          <h6 style={{ color: "#252525", fontWeight: 600 }}>
                            Sire
                          </h6>
                          <p>{element.sire_name}</p>
                        </Col>
                        <Col xs={2}>
                          <h6 style={{ color: "#252525", fontWeight: 600 }}>
                            Dam
                          </h6>
                          <p>{element.dam_name}</p>
                        </Col>
                        <Col xs={2}>
                          <h6 style={{ color: "#252525", fontWeight: 600 }}>
                            Age
                          </h6>
                          <p>{element.age}</p>
                        </Col>
                        <Col xs={2}>
                          <h6 style={{ color: "#252525", fontWeight: 600 }}>
                            Sex
                          </h6>
                          <p>{element.sex}</p>
                        </Col>
                      </Row>

                      <Row style={{ color: "white", marginTop: 5 }}>
                        <Col xs={3}>
                          <div
                            style={{
                              backgroundColor: "#3c3c3c",
                              borderRadius: 3,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: 5,
                              marginBottom: 3,
                              fontSize: 12,
                            }}
                          >
                            <span style={{ fontWeight: "bold", fontSize: 12 }}>
                              Track:{" "}
                            </span>{" "}
                            {element.track}
                          </div>
                        </Col>
                        <Col xs={3}>
                          <div
                            style={{
                              backgroundColor: "#3c3c3c",
                              borderRadius: 3,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: 5,
                              marginBottom: 3,
                              fontSize: 12,
                            }}
                          >
                            <span style={{ fontWeight: "bold", fontSize: 12 }}>
                              Distance:{" "}
                            </span>{" "}
                            {element.distance}
                          </div>
                        </Col>
                        <Col xs={3}>
                          <div
                            style={{
                              backgroundColor: "#3c3c3c",
                              borderRadius: 3,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: 5,
                              marginBottom: 3,
                              fontSize: 12,
                            }}
                          >
                            <span style={{ fontWeight: "bold", fontSize: 12 }}>
                              Trk/Dst:{" "}
                            </span>{" "}
                            {element.trk_dist}
                          </div>
                        </Col>
                      </Row>
                      <Row style={{ color: "white" }}>
                        <Col xs={3}>
                          <div
                            style={{
                              backgroundColor: "#3c3c3c",
                              borderRadius: 3,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: 5,
                              fontSize: 12,
                            }}
                          >
                            <span style={{ fontWeight: "bold", fontSize: 12 }}>
                              CTC/Track:{" "}
                            </span>
                            {props.isLoggedIn && !props.isExpired ? (
                              ctc(element.ctc_track)
                            ) : (
                              <FontAwesomeIcon
                                icon={faLock}
                                size="1x"
                                style={{ marginRight: 4 }}
                              />
                            )}
                          </div>
                        </Col>
                        <Col xs={3}>
                          <div
                            style={{
                              backgroundColor: "#3c3c3c",
                              borderRadius: 3,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: 5,
                              fontSize: 12,
                            }}
                          >
                            <span style={{ fontWeight: "bold", fontSize: 12 }}>
                              CTC/Dst:{" "}
                            </span>
                            {props.isLoggedIn && !props.isExpired ? (
                              ctc(element.ctc_dist)
                            ) : (
                              <FontAwesomeIcon
                                icon={faLock}
                                size="1x"
                                style={{ marginRight: 4 }}
                              />
                            )}
                          </div>
                        </Col>
                        <Col xs={3}>
                          <div
                            style={{
                              backgroundColor: "#3c3c3c",
                              borderRadius: 3,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: 5,
                              fontSize: 12,
                            }}
                          >
                            <span style={{ fontWeight: "bold", fontSize: 12 }}>
                              CTC/Trk/Dst:{" "}
                            </span>
                            {props.isLoggedIn && !props.isExpired ? (
                              ctc(element.ctc_track_dist)
                            ) : (
                              <FontAwesomeIcon
                                icon={faLock}
                                size="1x"
                                style={{ marginRight: 4 }}
                              />
                            )}
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div style={{ width: "20%", backgroundColor: "white" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: 5,
                        }}
                      >
                        <div>
                          <Circle
                            progress={careerHorseStats(last_starts, "winPerc")}
                            size={50}
                            animate={true}
                            roundedStroke={true}
                            progressColor="#eb3638"
                            animationDuration="2s"
                            lineWidth={40}
                            textStyle={{
                              fontFamily: "Poppins",
                              fontSize: 80,
                              fontWeight: "bold",
                            }}
                          />
                          <p style={{ color: "#252525", textAlign: "center" }}>
                            {
                              careerHorseStats(last_starts, "carrer")
                                ?.split(":")[1]
                                ?.split("-")[0]
                            }{" "}
                            Wins
                          </p>
                        </div>
                        <div>
                          <Circle
                            progress={careerHorseStats(last_starts, "plcPerc")}
                            size={50}
                            animate={true}
                            roundedStroke={true}
                            progressColor="#eb3638"
                            animationDuration="2s"
                            lineWidth={40}
                            textStyle={{
                              fontFamily: "Poppins",
                              fontSize: 80,
                              fontWeight: "bold",
                            }}
                          />
                          <p style={{ color: "#252525", textAlign: "center" }}>
                            {Number(
                              careerHorseStats(last_starts, "carrer")
                                ?.split(":")[1]
                                ?.split("-")[0]
                            ) +
                              Number(
                                careerHorseStats(last_starts, "carrer")
                                  ?.split(":")[1]
                                  ?.split("-")[1]
                              ) +
                              Number(
                                careerHorseStats(last_starts, "carrer")
                                  ?.split(":")[1]
                                  ?.split("-")[2]
                              )}{" "}
                            Places
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Row
                    style={{
                      color: "white",
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    <Col xs={2}>
                      <div
                        style={{
                          backgroundColor: "#3c3c3c",
                          borderRadius: 3,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: 5,
                          fontSize: 12,
                        }}
                      >
                        <span style={{ fontWeight: "bold", fontSize: 12 }}>
                          Firm:{" "}
                        </span>{" "}
                        {element?.firm_stat}
                      </div>
                    </Col>
                    <Col xs={2}>
                      <div
                        style={{
                          backgroundColor: "#3c3c3c",
                          borderRadius: 3,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: 5,
                          fontSize: 12,
                        }}
                      >
                        <span style={{ fontWeight: "bold", fontSize: 12 }}>
                          Good:{" "}
                        </span>{" "}
                        {element?.good_stat}
                      </div>
                    </Col>
                    <Col xs={2}>
                      <div
                        style={{
                          backgroundColor: "#3c3c3c",
                          borderRadius: 3,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: 5,
                          fontSize: 12,
                        }}
                      >
                        <span style={{ fontWeight: "bold", fontSize: 12 }}>
                          Soft:{" "}
                        </span>{" "}
                        {element.soft_stat}
                      </div>
                    </Col>
                    <Col xs={2}>
                      <div
                        style={{
                          backgroundColor: "#3c3c3c",
                          borderRadius: 3,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: 5,
                          fontSize: 12,
                        }}
                      >
                        <span style={{ fontWeight: "bold", fontSize: 12 }}>
                          Heavy:{" "}
                        </span>{" "}
                        {element.heavy_stat}
                      </div>
                    </Col>
                    <Col xs={2}>
                      <div
                        style={{
                          backgroundColor: "#3c3c3c",
                          borderRadius: 3,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: 5,
                          fontSize: 12,
                        }}
                      >
                        <span style={{ fontWeight: "bold", fontSize: 12 }}>
                          Synth.:{" "}
                        </span>{" "}
                        {element.synth_stat}
                      </div>
                    </Col>
                  </Row>
                  <div style={{ width: "100%", marginBottom: 5, padding: 5 }}>
                    <div
                      style={{
                        display: "flex",
                        backgroundColor: "#3c3c3c",
                        borderRadius: 3,
                        alignItems: "center",
                        margin: 5,
                        padding: 5,
                        color: "white",
                        fontSize: 12,
                      }}
                    >
                      <div style={{ width: "8%" }}>Position</div>
                      <div style={{ width: "10%" }}>Date</div>
                      <div style={{ width: "8%" }}>Venue</div>
                      <div style={{ width: "6%" }}>Cond.</div>
                      <div style={{ width: "7%" }}>Dist.</div>
                      <div style={{ width: "7%" }}>Class</div>
                      <div style={{ width: "13%" }}>Jockey</div>
                      <div style={{ width: "5%" }}>B.</div>
                      <div style={{ width: "5%" }}>W.</div>
                      <div style={{ width: "7%" }}>Odds</div>
                      <div style={{ width: "13%" }}>Winner/2nd</div>
                      <div style={{ width: "7%" }}>Margin L</div>
                      {/* <div style={{ width: '7%' }}>
                                            Win T.
                                        </div> */}
                    </div>
                    {checkDaySpell(last_starts)}
                    <div style={{ marginBottom: 5, fontSize: 10 }}>
                      {
                      // eslint-disable-next-line array-callback-return
                      last_starts?.map((zone, index) => {
                        if (index <= 5) {
                          return (
                            <div className="johanes" key={`st-${i}` + index}>
                              <div style={{ width: "8%" }}>
                                {zone.place}/{zone.tot_horses}
                              </div>
                              <div style={{ width: "10%" }}>
                                {moment(zone.meetdate).format("DD-MM-YYYY")}
                              </div>
                              <div style={{ width: "8%" }}>
                                {zone.venue_code}
                              </div>
                              <div style={{ width: "6%" }}>
                                {zone.track_condition}
                              </div>
                              <div style={{ width: "7%" }}>{zone.distance}</div>
                              <div style={{ width: "7%" }}>{zone.class}</div>
                              <div style={{ width: "13%" }}>{zone.jockey}</div>
                              <div style={{ width: "5%" }}>{zone.barrier}</div>
                              <div style={{ width: "5%" }}>{zone.weight}</div>
                              <div style={{ width: "7%" }}>{zone.odds}</div>
                              <div style={{ width: "13%" }}>
                                {zone.winner_sec}
                              </div>
                              <div style={{ width: "7%", textAlign: "center" }}>
                                {zone.margin}
                              </div>
                              {/* <div style={{ width: '7%' }}>
                                                            {zone.win_time}
                                                        </div> */}
                            </div>
                          );
                        }
                      })}
                    </div>
                    {btria ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            backgroundColor: "#3c3c3c",
                            borderRadius: 3,
                            alignItems: "center",
                            margin: 10,
                            marginBottom: 2,
                            padding: 5,
                            color: "white",
                            fontSize: 12,
                          }}
                        >
                          <div style={{ width: "15%", fontSize: 15 }}>
                            Last Barrier Trials
                          </div>
                          <div style={{ width: "8%" }}>Position</div>
                          <div style={{ width: "10%" }}>Date</div>
                          <div style={{ width: "8%" }}>Venue</div>
                          <div style={{ width: "6%" }}>Cond.</div>
                          <div style={{ width: "7%" }}>Dist.</div>
                          <div style={{ width: "13%" }}>Jockey</div>
                          <div style={{ width: "5%" }}>B.</div>
                          <div style={{ width: "13%" }}>Winner/2nd</div>
                          <div style={{ width: "7%" }}>Margin L</div>
                          {/* <div style={{ width: '7%' }}>
                                                    Win T.
                                                </div> */}
                        </div>

                        <div style={{ marginBottom: 5, fontSize: 10 }}>
                          {
                            // eslint-disable-next-line array-callback-return
                            btria?.map((zone, index) => {
                              if (index <= 5) {
                                return (
                                  <div
                                    className="johanes"
                                    key={`bt-${index}` + i}
                                  >
                                    <div style={{ width: "15%" }}></div>
                                    <div style={{ width: "8%" }}>
                                      {zone.place}/{zone.tot_horses}
                                    </div>
                                    <div style={{ width: "10%" }}>
                                      {moment(zone.meetdate).format(
                                        "DD-MM-YYYY"
                                      )}
                                    </div>
                                    <div style={{ width: "8%" }}>
                                      {zone.venue_code}
                                    </div>
                                    <div style={{ width: "6%" }}>
                                      {zone.track_condition}
                                    </div>
                                    <div style={{ width: "7%" }}>
                                      {zone.distance}
                                    </div>
                                    <div style={{ width: "13%" }}>
                                      {zone.jockey}
                                    </div>
                                    <div style={{ width: "5%" }}>
                                      {zone.barrier}
                                    </div>
                                    <div style={{ width: "13%" }}>
                                      {zone.winner_sec}
                                    </div>
                                    <div
                                      style={{
                                        width: "7%",
                                        textAlign: "center",
                                      }}
                                    >
                                      {zone.margin}
                                    </div>
                                    {/* <div style={{ width: '7%' }}>
                                                                    {zone.win_time}
                                                                </div> */}
                                  </div>
                                );
                              }
                            })
                          }
                        </div>
                      </>
                    ) : null}
                    {element.ctc_track &&
                    props.isLoggedIn &&
                    !props.isExpired ? (
                      <>
                        <div style={{ width: "100%", marginBottom: 2 }}>
                          <div
                            style={{
                              display: "flex",
                              backgroundColor: "#3c3c3c",
                              borderRadius: 3,
                              alignItems: "center",
                              padding: 5,
                              margin: 10,
                              marginBottom: 2,
                              color: "white",
                            }}
                          >
                            <div style={{ width: "10%" }}>CTC/TRACK</div>
                            <div style={{ width: "10%" }}>Date</div>
                            <div style={{ width: "8%" }}>Venue</div>
                            <div style={{ width: "8%" }}>Position</div>
                            <div style={{ width: "8%" }}>Cond.</div>
                            <div style={{ width: "8%" }}>Dist.</div>
                            <div style={{ width: "8%" }}>Class</div>
                          </div>
                        </div>
                        <div style={{ marginBottom: 5, fontSize: 10 }}>
                          {element.ctc_track?.map((zone, index) => (
                            <div className="johanes" key={`ctc-t${i}` + index}>
                              <div style={{ width: "10%" }}></div>
                              <div style={{ width: "10%" }}>
                                {moment(zone.meetdate).format("DD-MM-YYYY")}
                              </div>
                              <div style={{ width: "8%" }}>
                                {zone.track_code}
                              </div>
                              <div style={{ width: "8%" }}>
                                {zone.place}/{zone.tot_horses}
                              </div>
                              <div style={{ width: "8%" }}>
                                {zone.track_condition}
                              </div>
                              <div style={{ width: "8%" }}>{zone.distance}</div>
                              <div style={{ width: "8%" }}>{zone.class}</div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : null}
                    {element.ctc_dist &&
                    props.isLoggedIn &&
                    !props.isExpired ? (
                      <>
                        <div style={{ width: "100%", marginBottom: 2 }}>
                          <div
                            style={{
                              display: "flex",
                              backgroundColor: "#3c3c3c",
                              borderRadius: 3,
                              alignItems: "center",
                              padding: 5,
                              margin: 10,
                              marginBottom: 2,
                              color: "white",
                            }}
                          >
                            <div style={{ width: "10%" }}>CTC/DST</div>
                            <div style={{ width: "10%" }}>Date</div>
                            <div style={{ width: "8%" }}>Venue</div>
                            <div style={{ width: "8%" }}>Position</div>
                            <div style={{ width: "8%" }}>Cond.</div>
                            <div style={{ width: "8%" }}>Dist.</div>
                            <div style={{ width: "8%" }}>Class</div>
                          </div>
                        </div>
                        <div style={{ marginBottom: 5, fontSize: 10 }}>
                          {element.ctc_dist?.map((zone, index) => (
                            <div className="johanes" key={`ctct-${i}` + index}>
                              <div style={{ width: "10%" }}></div>
                              <div style={{ width: "10%" }}>
                                {moment(zone.meetdate).format("DD-MM-YYYY")}
                              </div>
                              <div style={{ width: "8%" }}>
                                {zone.track_code}
                              </div>
                              <div style={{ width: "8%" }}>
                                {zone.place}/{zone.tot_horses}
                              </div>
                              <div style={{ width: "8%" }}>
                                {zone.track_condition}
                              </div>
                              <div style={{ width: "8%" }}>{zone.distance}</div>
                              <div style={{ width: "8%" }}>{zone.class}</div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : null}
                    {element.ctc_track_dist &&
                    props.isLoggedIn &&
                    !props.isExpired ? (
                      <>
                        <div style={{ width: "100%", marginBottom: 2 }}>
                          <div
                            style={{
                              display: "flex",
                              backgroundColor: "#3c3c3c",
                              borderRadius: 3,
                              alignItems: "center",
                              padding: 5,
                              margin: 10,
                              marginBottom: 2,
                              color: "white",
                            }}
                          >
                            <div style={{ width: "10%" }}>CTC/TRC/DST</div>
                            <div style={{ width: "10%" }}>Date</div>
                            <div style={{ width: "8%" }}>Venue</div>
                            <div style={{ width: "8%" }}>Position</div>
                            <div style={{ width: "8%" }}>Cond.</div>
                            <div style={{ width: "8%" }}>Dist.</div>
                            <div style={{ width: "8%" }}>Class</div>
                          </div>
                        </div>
                        <div style={{ marginBottom: 5, fontSize: 10 }}>
                          {element.ctc_track_dist?.map((zone, index) => (
                            <div className="johanes" key={`ctc-th${i}` + index}>
                              <div style={{ width: "10%" }}></div>
                              <div style={{ width: "10%" }}>
                                {moment(zone.meetdate).format("DD-MM-YYYY")}
                              </div>
                              <div style={{ width: "8%" }}>
                                {zone.track_code}
                              </div>
                              <div style={{ width: "8%" }}>
                                {zone.place}/{zone.tot_horses}
                              </div>
                              <div style={{ width: "8%" }}>
                                {zone.track_condition}
                              </div>
                              <div style={{ width: "8%" }}>{zone.distance}</div>
                              <div style={{ width: "8%" }}>{zone.class}</div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : null}
                    <div
                      style={{ display: "flex", margin: 10, paddingBottom: 10 }}
                    >
                      {props.isLoggedIn && (
                        <div
                          style={{
                            width: "20%",
                            height: 30,
                            backgroundColor: "#3c3c3c",
                            borderRadius: 5,
                            cursor: "pointer",
                            marginRight: 10,
                            textAlign: "center",
                            paddingTop: 5,
                            color: "white",
                          }}
                          onClick={() => addToBlackBook(element)}
                        >
                          {!props.blackBookLoading
                            ? "Add to BlackBook"
                            : "Loading..."}
                        </div>
                      )}
                      {/* {props.isLoggedIn && <div style={{ width: '20%', height: 30, backgroundColor: 'lightgray', borderRadius: 5, cursor: 'pointer', marginRight: 10, textAlign: 'center', paddingTop: 5 }}
                                                    onClick={() => addToBlackBook(element)}>
                                                    {!props.blackBookLoading ? 'Add to BlackBook Plus' : 'Loading...'}
                                                </div>} */}
                      <Link
                        to={`/profile/horse/${
                          element?.horse_id
                        }/${element?.horse_name.split(" ").join("-")}`}
                        style={{
                          width: "20%",
                          height: 30,
                          backgroundColor: "#3c3c3c",
                          borderRadius: 5,
                          cursor: "pointer",
                          textAlign: "center",
                          paddingTop: 5,
                          color: "white",
                        }}
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </Collapse>
              </td>
            </tr>
          );
          return tr;
        }
      }
    });
    return allData;
  };

  return (
    <div style={{ padding: 1 }}>
      {window.innerWidth < 769 && (
        <Row
          style={{
            paddingTop: 4,
            paddingBottom: 4,
            backgroundColor: "transparent",
          }}
        >
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {props.trackInfo[0]?.is_na === 1 && (
              <Col
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  padding: 0,
                  marign: 0,
                }}
              >
                <div style={{ display: "flex", borderRadius: 4 }}>
                  <Badge
                    style={{
                      backgroundColor: "#f64e60",
                      color: "white",
                      marginRight: 10,
                    }}
                  >
                    N/R
                  </Badge>
                  <div className="profileCheckBox">
                    <input
                      id="isNaChecked"
                      type="checkbox"
                      className="switch"
                      checked={isNaChecked}
                      onChange={changeIsNA}
                    />
                  </div>
                </div>
              </Col>
            )}
            <Infos />
          </Col>

          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                backgroundColor: "transparent",
                opacity: "100%",
                alignItems: "center",
              }}
            >
              <div style={{ marginTop: 0 }}>{renderlmmSector()}</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  marginLeft: 8,
                }}
              >
                <Button
                  onClick={() => setExpanded(!expanded)}
                  variant="contained"
                  color="default"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    padding: 2,
                  }}
                >
                  {expanded ? "Minimize" : "Expand"}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      )}

      <Table
        bordered
        hover
        size="sm"
        style={!props.dark ? styles.table : styles.tableDark}
        responsive={innerWidth < 1350 ? true : false}
      >
        <thead>{renderTr()}</thead>
        <tbody>{getHorses()}</tbody>
      </Table>

      {props.genTime ? (
        <SelectionDate
          trackInfo={props.trackInfo}
          genTime={props.genTime}
          dark={false}
        />
      ) : null}
      <Legend dark={false} />

      <Modal isOpen={bkNoteOpen} style={{ marginTop: 80 }}>
        <ModalBody
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            alt="Logo"
            src="../../favicon.png"
            width="40px"
            className="logo-default max-h-40px"
          />
          <p style={{ fontSize: 18, width: "88%", marginTop: 8 }}>
            Please add below your personal comments if needed:
          </p>
          <Input
            className="form-control h-auto form-control-solid py-4 px-8"
            style={{ textAlign: "left" }}
            onChange={(e) => setBkNotes(e.target.value)}
            placeholder="Notes"
            defaultValue={bkNotes}
          />
        </ModalBody>
        <ModalFooter
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button onClick={() => closeBlackBook()} color="primary">
            <strong>Cancel</strong>
          </Button>
          {""}
          <Button onClick={() => addToBlackBookAction()} color="primary">
            <strong>Okay</strong>
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.raceReducer.loading,
  isExpired: state.auth.isExpired,
  currentUser: state.auth.currentUser,
  isLoggedIn: state.auth.isLoggedIn,
  lmmTime: state.raceReducer.lmmTime,
  blackBookLoading: state.blackbook.loading,
  trackInfo: state.raceReducer.trackInfoOpt,
});

const mapDispatchToProps = (dispatch) => ({
  addBlackBook: (data) => dispatch(bkActions.addBlackBook(data)),
  setLmm: (data) => dispatch(actions.setLmm(data)),
  // changeTab: (num) => dispatch(raceAction.changeTab(num)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HorsesTable));
