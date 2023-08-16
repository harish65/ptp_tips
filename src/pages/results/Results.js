import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, useParams } from "react-router-dom";
import moment from "moment";
import { Nav, NavItem, NavLink, Row, Col } from "reactstrap";
import DatePicker from "react-datepicker";
// import ResultsTable from "./Components/ResultsTable"
import ResultsTableOpt from "./Components/resultTableOpt";
import ResultSum from "../../components/ResultsSum/ResultsSum";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Helmet from "react-helmet";
import selectionsAction from "../../redux/actions/selections";
import raceAction from "../../redux/actions/race";
// import Binance from "./../selections/images/binance.png";
import BinanceCardMobile from "./../selections/images/binanceCardMobile.png";
import Binance from "./../selections/images/binance.png";
//import Melbourne from '../../components/melbourn/melbourne';

// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle'

import "moment-timezone";
/* CSS */
import "./results.scss";
import "antd/dist/antd.css";
import "react-datepicker/dist/react-datepicker.css";

/* REDUX */
import resultAction from "../../redux/actions/results";
import { checkRouteDate, ConvertUTCTimeToLocalTime1 } from "../../config/utils";

const Results = (props) => {
  const params = useParams();
  const [, setStartDate] = useState(
    moment(props?.match.params.date).toDate()
  );
  const [today, setToday] = useState(false);
  const [yesterday, setYesterday] = useState(false);
  const [lastWed, setLastWed] = useState(false);
  const [lastSat, setLastSat] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    assignTabs(
      moment(transferRoute(), "DD-MM-YYYY")
        .tz("Australia/Sydney")
        .format("YYYYMMDD")
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const transferRoute = () => {
    if (props.match.path === "/horse-racing-tips/results/today") {
      return ConvertUTCTimeToLocalTime1(
        moment().tz("Australia/Sydney").format("DD-MM-YYYY")
      );
    } else if (props.match.path === "/horse-racing-tips/results/yesterday") {
      return moment()
        .tz("Australia/Sydney")
        .subtract(1, "day")
        .format("DD-MM-YYYY");
    } else if (props.match.path === "/horse-racing-tips/results/tomorrow") {
      return moment().tz("Australia/Sydney").add(1, "day").format("DD-MM-YYYY");
    }
    return params.date;
  };

  const goForward = () => {
    var max = new moment().tz("Australia/Sydney").format("YYYY-MM-DD");
    var cmp = moment(transferRoute(), "DD-MM-YYYY").format("YYYY-MM-DD");
    if (cmp < max) {
      var nextDay = moment(cmp, "YYYY-MM-DD")
        .tz("Australia/Sydney")
        .add(1, "day")
        .format("YYYY-MM-DD");
      var nextDayCalendar = moment(nextDay, "YYYY-MM-DD").toDate();
      props.history.push(
        `/horse-racing-tips/results/${checkRouteDate(
          moment(nextDay, "YYYY-MM-DD").format("DD-MM-YYYY")
        )}`
      );
      setStartDate(nextDayCalendar);
      props.getResults({
        passDate: moment(nextDay, "YYYY-MM-DD").format("YYYY-MM-DD"),
      });
      assignTabs(nextDayCalendar);
    }
  };

  const goBack = () => {
    var max = "2020-06-10";
    var cmp = moment(transferRoute(), "DD-MM-YYYY").format("YYYY-MM-DD");
    if (cmp > max) {
      var lastDay = moment(cmp, "YYYY-MM-DD")
        .tz("Australia/Sydney")
        .subtract(1, "day")
        .format("YYYY-MM-DD");
      var lastDayCalendar = moment(lastDay, "YYYY-MM-DD").toDate();
      
        props.history.push(
          `/horse-racing-tips/results/${checkRouteDate(
            moment(lastDay, "YYYY-MM-DD").format("DD-MM-YYYY")
          )}`
        );
      
      setStartDate(lastDayCalendar);
      props.getResults({
        passDate: moment(lastDay, "YYYY-MM-DD").format("YYYY-MM-DD"),
      });
      assignTabs(lastDay);
    }
  };

  const yesturday = () => {
    props.history.push(`/horse-racing-tips/results/yesterday`);
    props.getResults({
      passDate: moment()
        .tz("Australia/Sydney")
        .subtract(1, "day")
        .format("YYYY-MM-DD"),
    });
    setStartDate(moment(params.date, "DD-MM-YYYY").toDate());
    setToday(false);
    setYesterday(true);
    setLastWed(false);
    setLastSat(false);
  };

  const todays = () => {
    moment.defaultFormat = "DD.MM.YYYY HH:mm";
    props.history.push(`/horse-racing-tips/results/today`);
    props.getResults({
      passDate: moment().tz("Australia/Sydney").format("YYYY-MM-DD"),
    });
    setStartDate(moment(params.date, "DD-MM-YYYY").toDate());
    setToday(true);
    setYesterday(false);
    setLastWed(false);
    setLastSat(false);
  };

  const seletLastSat = () => {
    var s = moment(lscmp());
    moment.defaultFormat = "DD.MM.YYYY HH:mm";
    var f = moment(s, moment.defaultFormat).toDate();
    var passingDate = moment(s).tz("Australia/Sydney").format("YYYY-MM-DD");
    props.history.push(
      `/horse-racing-tips/results/${moment(s).format("DD-MM-YYYY")}`
    );
    props.getResults({ passDate: passingDate });
    setStartDate(f);
    setToday(false);
    setYesterday(false);
    setLastWed(false);
    setLastSat(true);
  };

  const seletLastWed = () => {
    var s = moment(lwcmp());
    moment.defaultFormat = "DD.MM.YYYY HH:mm";
    var f = moment(s, moment.defaultFormat).toDate();
    props.history.push(
      `/horse-racing-tips/results/${moment(s).format("DD-MM-YYYY")}`
    );
    props.getResults({ passDate: moment(s).format("YYYY-MM-DD") });
    setStartDate(f);
    setToday(false);
    setYesterday(false);
    setLastWed(true);
    setLastSat(false);
  };

  const lscmp = () => {
    var s = null;
    var tdf = moment().tz("Australia/Sydney").format("dddd");
    if (tdf === "Sunday") {
      s = moment().tz("Australia/Sydney").subtract(1, "day");
    } else if (tdf === "Saturday") {
      s = moment().tz("Australia/Sydney").subtract(7, "day");
    } else if (tdf === "Friday") {
      s = moment().tz("Australia/Sydney").subtract(6, "day");
    } else if (tdf === "Thursday") {
      s = moment().tz("Australia/Sydney").subtract(5, "day");
    } else if (tdf === "Wednesday") {
      s = moment().tz("Australia/Sydney").subtract(4, "day");
    } else if (tdf === "Tuesday") {
      s = moment().tz("Australia/Sydney").subtract(3, "day");
    } else if (tdf === "Monday") {
      s = moment().tz("Australia/Sydney").subtract(2, "day");
    }
    return s;
  };

  const lwcmp = () => {
    var lw;
    var td = moment().tz("Australia/Sydney");
    var s = null;
    var tdf = moment(td).format("dddd");
    if (tdf === "Sunday") {
      s = moment(td).subtract(4, "day");
    } else if (tdf === "Saturday") {
      s = moment(td).subtract(3, "day");
    } else if (tdf === "Friday") {
      s = moment(td).subtract(2, "day");
    } else if (tdf === "Thursday") {
      s = moment(td).subtract(1, "day");
    } else if (tdf === "Wednesday") {
      s = moment(td).subtract(7, "day");
    } else if (tdf === "Tuesday") {
      s = moment(td).subtract(6, "day");
    } else if (tdf === "Monday") {
      s = moment(td).subtract(5, "day");
    }
    lw = moment(s).format("YYYYMMDD");
    return lw;
  };

  const handleChange = (datee) => {
    var incomingDate = moment(datee).tz("Australia/Sydney");
    props.getResults({ passDate: moment(datee).format("YYYY-MM-DD") });
    setStartDate(datee);
    var c = moment(incomingDate).format("DD-MM-YYYY");
    props.history.push(
      `/horse-racing-tips/results/${checkRouteDate(
        moment(c, "DD-MM-YYYY").format("DD-MM-YYYY")
      )}`
    );
    assignTabs(incomingDate);
  };

  const assignTabs = (data) => {
    var date = moment(data).format("YYYYMMDD");
    var today = moment().tz("Australia/Sydney").format("YYYYMMDD");
    var yesterday = moment()
      .tz("Australia/Sydney")
      .subtract(1, "day")
      .format("YYYYMMDD");
    var ls = moment(lscmp()).tz("Australia/Sydney").format("YYYYMMDD");
    var lwd = moment(lwcmp()).tz("Australia/Sydney").format("YYYYMMDD");

    if (date === lwd) {
      setToday(false);
      setYesterday(false);
      setLastWed(true);
      setLastSat(false);
    } else if (date === ls) {
      setToday(false);
      setYesterday(false);
      setLastWed(false);
      setLastSat(true);
    } else if (date === today) {
      setToday(true);
      setYesterday(false);
      setLastWed(false);
      setLastSat(false);
    } else if (date === yesterday) {
      setToday(false);
      setYesterday(true);
      setLastWed(false);
      setLastSat(false);
    } else if (
      date !== today ||
      date !== yesterday ||
      date !== ls ||
      date !== lwd
    ) {
      setToday(false);
      setYesterday(false);
      setLastWed(false);
      setLastSat(false);
    }
  };

  const handleWed = () => {
    if (window.innerWidth < 422) {
      return "Last Wed";
    } else {
      return "Last Wednesday";
    }
  };

  const handleSat = () => {
    if (window.innerWidth < 422) {
      return "Last Sat";
    } else {
      return "Last Saturday";
    }
  };

  const handleWidth = () => {
    if (window.innerWidth < 1200) {
      return "center";
    } else return "start";
  };

  // const navigate = (p_id, venue, meetdate) => {
  //   props.getRaceInfo({ raceId: p_id })
  //   props.getSelectionsForDate({ passDate: moment(meetdate).format('YYYY-MM-DD') })
  //   props.history.push(`/horse-racing-tips/${meetdate}/${venue}/${p_id}`)
  //   window.scrollTo(0, 0);
  // }

  moment.defaultFormat = "DD.MM.YYYY HH:mm";
  var d = moment().tz("Australia/Sydney");
  var f = moment(d, moment.defaultFormat).toDate();
  var g = moment("2020-03-02");
  var c = moment(g, moment.defaultFormat).toDate();

  const renderBinance = () => {
    if (window.innerWidth > 1000) {
      return (
        <a
          href="https://accounts.binance.com/en/register?ref=WN1HZSFL"
          rel="noreferrer"
          target="_blank"
          style={{ textAlign: "center" }}
        >
          <img
            alt="Binance"
            src={Binance}
            style={{
              borderRadius: "8px",
              width: window.innerWidth > 1000 ? "auto" : "100%",
            }}
            className="binance"
          />
        </a>
      );
    } else if (window.innerWidth < 450) {
      return (
        <a
          href="https://accounts.binance.com/en/register?ref=WN1HZSFL"
          rel="noreferrer"
          target="_blank"
          style={{ textAlign: "center" }}
        >
          <img
            alt="BinanceCardMobile"
            src={BinanceCardMobile}
            style={{ borderRadius: "8px", width: "100%", height: "170px" }}
            className="binance"
          />
        </a>
      );
    } else {
      return (
        <a
          href="https://accounts.binance.com/en/register?ref=WN1HZSFL"
          target="_blank"
          rel="noreferrer"
          style={{ textAlign: "center" }}
        >
          <img
            alt="Binance"
            src={Binance}
            style={{ borderRadius: "8px", width: "100%" }}
            className="binance"
          />
        </a>
      );
    }
  };

  return (
    <div style={{ padding: 8 }}>
      <Helmet>
        <title>
          PTP Australia's Horse Racing Results{" "}
          {moment(transferRoute(), "DD-MM-YYYY").format("dddd LL")}
        </title>
        {/*<script data-ad-client="ca-pub-8932761519008284" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>*/}
        <meta charSet="utf-8" name="author" content="PTP Tips" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          charSet="utf-8"
          name="keywords"
          content="PTP Tip ,horse racing results , racing table , horse racing table resulted ,australian horse racing live results , results , winner , win percentage , "
        />
        <meta
          charSet="utf-8"
          name="description"
          content={
            "Get horse racing results in Australia. We provide daily horse racing tips and generate percentage chance of winning."
          }
        />
        <link
          rel="canonical"
          href={
            "https://www.ptptips.com.au/horse-racing-tips/results/" +
            params.date
          }
        />
      </Helmet>

      <div
        style={{ height: 52, padding: "6px", maxWidth: 600, margin: "auto" }}
      >
        <h1 style={{ textAlign: "center", fontWeight: "600" }}>
          {moment(transferRoute(), "DD-MM-YYYY").format("dddd LL")} Horse Racing
          Results
        </h1>
      </div>

      <Row style={{ margin: 0 }}>
        <Col
          xl={9}
          xs={12}
          style={{
            display: "flex",
            justifyContent: handleWidth(),
          }}
        >
          <Nav
            pills
            style={{ backgroundColor: "White", borderRadius: 7, marginTop: 5 }}
          >
            <NavItem>
              <NavLink onClick={() => yesturday()} active={yesterday}>
                Yesterday
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => todays()} active={today}>
                Today
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => seletLastWed()} active={lastWed}>
                {handleWed()}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => seletLastSat()} active={lastSat}>
                {handleSat()}
              </NavLink>
            </NavItem>
          </Nav>
        </Col>

        <Col xl={3} xs={12} style={{ marginTop: "4px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <FontAwesomeIcon
                className="forward"
                style={{ marginRight: "10px" }}
                icon={faAngleLeft}
                size="2x"
                onClick={() => goBack()}
              />
            </div>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              onChange={(date) => handleChange(date)}
              selected={moment(transferRoute(), "DD-MM-YYYY").toDate()}
              maxDate={f}
              minDate={c}
              className="input"
            />
            <div>
              <FontAwesomeIcon
                className="forward"
                style={{ marginLeft: "10px" }}
                icon={faAngleRight}
                size="2x"
                onClick={() => goForward()}
              />
            </div>
          </div>
        </Col>
      </Row>
      <div
        style={{
          backgroundColor: "white",
          color: "#142841",
          padding: 10,
          borderRadius: 10,
          marginBottom: 10,
          marginTop: 10,
          borderTop: "2px solid",
        }}
      >
        <h3 style={{ color: "#142841" }}>
          {moment(transferRoute(), "DD-MM-YYYY").format("dddd") +
            "'s Historical Performance"}
        </h3>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>
            Selections : {+" " + props.day_of_week_history?.runs}
          </div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>
            Win : {props.day_of_week_history?.won}
          </div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>
            Win% :{" "}
            {(
              Number(
                props.day_of_week_history?.won / props.day_of_week_history?.runs
              ) * 100
            )?.toFixed(2)}
          </div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>
            AVG$ : {props.day_of_week_history?.winOdd?.toFixed(2)}
          </div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>
            PLC : {+" " + props.day_of_week_history?.place}
          </div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>
            PLC% :{" "}
            {(
              Number(
                props.day_of_week_history?.place /
                  props.day_of_week_history?.runs
              ) * 100
            )?.toFixed(2)}
          </div>
        </div>
      </div>

      <ResultSum
        date={moment(transferRoute(), "DD-MM-YYYY")
          .tz("Australia/Sydney")
          .format("YYYY-MM-DD")}
        resPage={1}
      />
      {/* <ResultsTable date={moment(startDate).tz('Australia/Sydney').format("YYYY-MM-DD")} /> */}
      <ResultsTableOpt
        date={moment(transferRoute(), "DD-MM-YYYY")
          .tz("Australia/Sydney")
          .format("YYYY-MM-DD")}
      />
      <br />
      <Col style={{ textAlign: "center" }}>{renderBinance()}</Col>
      <br />
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.resultsReducer.loading,
  results: state.resultsReducer.results,
  daily_results: state.resultsReducer.daily_results,
  day_of_week_history: state.resultsReducer.day_of_week_history,
});

const mapDispatchToProps = (dispatch) => ({
  getResults: (data) => dispatch(resultAction.getResults(data)),
  getRaceInfo: (data) => dispatch(raceAction.getRaceInfo(data)),
  getSelectionsForDate: (data) =>
    dispatch(selectionsAction.getSelectionsForDate(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Results));
