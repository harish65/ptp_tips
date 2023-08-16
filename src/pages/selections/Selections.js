import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import moment from "moment-timezone";
import DatePicker from "react-datepicker";
import Melbourne from "../../components/melbourn/melbourneLogo";
import {
  Nav,
  Form,
  NavItem,
  NavLink,
  Row,
  Col,
  // Breadcrumb,
  // BreadcrumbItem,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  Input,
  CustomInput,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {
  closeNewUserPopup,
  closeProfileInfoPopup,
} from "../../redux/actions/auth";
import { checkRouteDate } from "../../config/utils";
//import InfiniteScroll from 'react-infinite-scroller';
import { Helmet } from "react-helmet";
// import { Badge } from 'reactstrap';
import Infos from "../raceNew/components/head/common/info";
import BinanceCardMobile from "./../selections/images/binanceCardMobile.png";
import Binance from "./../selections/images/binance.png";

//react animation

/* REDUX */
import actions from "../../redux/actions/selections";
import actions1 from "../../redux/actions/NextTojump";
import actions2 from "../../redux/actions/results";
import raceAction from "../../redux/actions/race";
import selectionsAction from "../../redux/actions/selections";

/* CSS */
import "antd/dist/antd.css";
import "./selections.scss";
import "react-datepicker/dist/react-datepicker.css";

/*Components */
import STable from "./components/selectionTable";
// import Last10Cell from "../../components/Last10/Last10Cell"
// import Next10Cell from "../../components/Next10/Next10Cell"
import Next10 from "../../components/Next10/Next10";
import Last10 from "../../components/NextLast/Last10New";
import Last10Winners from "../../components/Last10Winners/Last10Winners";
import NextToJump from "./components/NextToJump";
// import melbourne from "../../components/melbourn/melbourne";
// import { postClicksBinance } from "../../config/config";
// import Legend from './components/legend'

export const Selections = (props) => {
  const [today, setToday] = useState(false);
  const [tomorrow, setTomorrow] = useState(false);
  const [yesterday, setYesterday] = useState(false);
  const [nextToJump, setNextToJump] = useState(false);
  const [afterTomorrow, setAfterTomorrow] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    const { dispatch } = props;
    // console.log(props.isLoggedIn);
    var params = moment(transferRoute(), "DD-MM-YYYY")
      .tz("Australia/Sydney")
      .format("YYYYMMDD");
    var base = moment(params).tz("Australia/Sydney").format("YYYY-MM-DD");
    dispatch(actions.getSelectionsForDate({ passDate: base }));
    assignTab(params);

    if (props.match.path === "/horse-racing-tips/next-to-jump/") {
      dispatch(actions1.NextTojump());
      setToday(false);
      setTomorrow(false);
      setYesterday(false);
      setNextToJump(true);
      setAfterTomorrow(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const selectNRNext = (e) => {
    const { dispatch } = props;
    dispatch(actions.selectNRNext(e.target.checked));
    dispatch(actions.getNextTen(e.target.checked));
  };

  const selectNRLast = (e) => {
    const { dispatch } = props;
    dispatch(actions.selectNRLast(e.target.checked));
    dispatch(actions.getLastTen(e.target.checked));
  };

  const selectCTCN = (e) => {
    const { dispatch } = props;
    dispatch(actions.selectCTCN(e.target.checked));
  };

  const selectCTCL = (e) => {
    const { dispatch } = props;
    dispatch(actions.selectCTCL(e.target.checked));
  };

  const handleNameChange = (evt) => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  };

  const closeWelcome = () => {
    const { dispatch } = props;
    dispatch(closeNewUserPopup());
  };

  const closeFirstNameExist = () => {
    const { dispatch } = props;
    dispatch(
      closeProfileInfoPopup(form.firstName, form.lastName, props.currentUser)
    );
  };

  const transferRoute = () => {
    if (props.match.path === "/horse-racing-tips/today/") {
      return moment().tz("Australia/Sydney").format("DD-MM-YYYY");
    } else if (props.match.path === "/horse-racing-tips/yesterday/") {
      return moment()
        .tz("Australia/Sydney")
        .subtract(1, "day")
        .format("DD-MM-YYYY");
    } else if (props.match.path === "/horse-racing-tips/tomorrow/") {
      return moment().tz("Australia/Sydney").add(1, "day").format("DD-MM-YYYY");
    } else if (props.match.path === "/horse-racing-tips/next-to-jump/") {
      return moment().tz("Australia/Sydney").format("DD-MM-YYYY");
    }
    return props.match.params.date;
  };

  const updateDimensions = () => {};

  const handleChange = (datee) => {
    const { dispatch } = props;
    // const caldate = moment(datee).tz("Australia/Sydney");
    // setStartDate(caldate)
    dispatch(
      actions.getSelectionsForDate({
        passDate: moment(datee).tz("Australia/Sydney").format("YYYY-MM-DD"),
      })
    );
    dispatch(
      actions2.getResults({
        passDate: moment(datee).tz("Australia/Sydney").format("YYYY-MM-DD"),
      })
    );
    var c = moment(datee).format("YYYY-MM-DD");
    props.history.push(
      `/horse-racing-tips/${checkRouteDate(
        moment(c, "YYYY-MM-DD").format("DD-MM-YYYY")
      )}`
    );
    assignTab(c);
  };

  const yesterdayFunction = () => {
    window.scrollTo(0, 0);
    const { dispatch } = props;
    // var d = moment().tz("Australia/Sydney").tz("Australia/Sydney").toDate();
    // var a = moment(d).subtract(1, "day").tz("Australia/Sydney").toDate();
    dispatch(
      actions.getSelectionsForDate({
        passDate: moment()
          .tz("Australia/Sydney")
          .subtract(1, "day")
          .format("YYYY-MM-DD"),
      })
    );
    dispatch(
      actions2.getResults({
        passDate: moment()
          .tz("Australia/Sydney")
          .subtract(1, "day")
          .format("YYYY-MM-DD"),
      })
    );
    props.history.push(`/horse-racing-tips/yesterday`);
    // setStartDate(a)
    setToday(false);
    setTomorrow(false);
    setYesterday(true);
    setNextToJump(false);
    setAfterTomorrow(false);
  };

  const tomorrowFunction = () => {
    window.scrollTo(0, 0);
    const { dispatch } = props;
    // var d = moment().tz("Australia/Sydney");
    // var f = moment(d, moment.defaultFormat).toDate();
    // var b = moment(f).add(1, "day").tz("Australia/Sydney").toDate();
    // { props.history.push(`/selections/${moment().add(1, 'day').format("YYYY-MM-DD")}`) }
    dispatch(
      actions.getSelectionsForDate({
        passDate: moment()
          .tz("Australia/Sydney")
          .add(1, "day")
          .format("YYYY-MM-DD"),
      })
    );
    dispatch(
      actions2.getResults({
        passDate: moment()
          .tz("Australia/Sydney")
          .add(1, "day")
          .format("YYYY-MM-DD"),
      })
    );
    props.history.push(`/horse-racing-tips/tomorrow`);
    // setStartDate(b)
    setToday(false);
    setTomorrow(true);
    setYesterday(false);
    setNextToJump(false);
    setAfterTomorrow(false);
  };

  const aftertomorrowFunction = () => {
    window.scrollTo(0, 0);
    const { dispatch } = props;
    // var d = moment().tz("Australia/Sydney").tz("Australia/Sydney").toDate();
    // var b = moment(d).add(2, "day").toDate();
    dispatch(
      actions.getSelectionsForDate({
        passDate: moment()
          .tz("Australia/Sydney")
          .add(2, "day")
          .format("YYYY-MM-DD"),
      })
    );
    dispatch(
      actions2.getResults({
        passDate: moment()
          .tz("Australia/Sydney")
          .add(1, "day")
          .format("YYYY-MM-DD"),
      })
    );
    props.history.push(
      `/horse-racing-tips/${moment()
        .tz("Australia/Sydney")
        .add(2, "day")
        .format("DD-MM-YYYY")}`
    );
    // setStartDate(b)
    setToday(false);
    setTomorrow(false);
    setYesterday(false);
    setNextToJump(false);
    setAfterTomorrow(true);
  };

  const todayFunction = () => {
    window.scrollTo(0, 0);
    const { dispatch } = props;
    // var d = moment().tz("Australia/Sydney").tz("Australia/Sydney").toDate();
     props.history.push(`/horse-racing-tips/today`); 
    dispatch(
      actions.getSelectionsForDate({
        passDate: moment().tz("Australia/Sydney").format("YYYY-MM-DD"),
      })
    );
    dispatch(
      actions2.getResults({
        passDate: moment().tz("Australia/Sydney").format("YYYY-MM-DD"),
      })
    );

    // setStartDate(d)
    setToday(true);
    setTomorrow(false);
    setYesterday(false);
    setNextToJump(false);
    setAfterTomorrow(false);
  };

  const nextToJumpFunction = () => {
    const { dispatch } = props;
    dispatch(actions1.NextTojump());

    setToday(false);
    setTomorrow(false);
    setYesterday(false);
    setNextToJump(true);
    setAfterTomorrow(false);
    props.history.push(`/horse-racing-tips/next-to-jump/`);
  };

  const navigate = (p_id, venue, meetdate) => {
    const { dispatch } = props;
    dispatch(raceAction.getRaceInfo({ raceId: p_id }));
    dispatch(
      selectionsAction.getSelectionsForDate({
        passDate: moment(meetdate).format("YYYY-MM-DD"),
      })
    );
    props.history.push(`/horse-racing-tips/${meetdate}/${venue}/${p_id}`);
    window.scrollTo(0, 0);
  };

  //renderMelbourne() {
  //  if (window.innerWidth < 1024) {
  //    return (
  //      <Melbourne />
  //    )
  //  }
  //}

  const goForward = () => {
    const { dispatch } = props;
    var max = new moment()
      .tz("Australia/Sydney")
      .add(3, "day")
      .format("YYYY-MM-DD");
    var cmp = moment(transferRoute(), "DD-MM-YYYY").format("YYYY-MM-DD");
    if (cmp < max) {
      var nextDay = moment(cmp, "YYYY-MM-DD")
        .tz("Australia/Sydney")
        .add(1, "day")
        .format("YYYY-MM-DD");
      // var nextDayCalendar = moment(nextDay, "YYYY-MM-DD").toDate();
      
        props.history.push(
          `/horse-racing-tips/${checkRouteDate(
            moment(nextDay, "YYYY-MM-DD").format("DD-MM-YYYY")
          )}`
        );
      
      // setStartDate(nextDayCalendar)
      dispatch(
        actions.getSelectionsForDate({
          passDate: moment(nextDay, "YYYY-MM-DD").format("YYYY-MM-DD"),
        })
      );
      dispatch(
        actions2.getResults({
          passDate: moment(nextDay, "YYYY-MM-DD").format("YYYY-MM-DD"),
        })
      );
      assignTab(nextDay);
    }
  };

  const goBack = () => {
    const { dispatch } = props;
    var max = "2020-06-10";
    var cmp = moment(transferRoute(), "DD-MM-YYYY").format("YYYY-MM-DD");
    if (cmp > max) {
      var lastDay = moment(cmp, "YYYY-MM-DD")
        .tz("Australia/Sydney")
        .subtract(1, "day")
        .format("YYYY-MM-DD");
      // var lastDayCalendar = moment(lastDay, "YYYY-MM-DD").toDate();
      
        props.history.push(
          `/horse-racing-tips/${checkRouteDate(
            moment(lastDay, "YYYY-MM-DD").format("DD-MM-YYYY")
          )}`
        );
      
      // setStartDate(lastDayCalendar)
      dispatch(
        actions.getSelectionsForDate({
          passDate: moment(lastDay, "YYYY-MM-DD").format("YYYY-MM-DD"),
        })
      );
      dispatch(
        actions2.getResults({
          passDate: moment(lastDay, "YYYY-MM-DD").format("YYYY-MM-DD"),
        })
      );
      assignTab(lastDay);
    }
  };

  const assignTab = (data) => {
    var date = moment(data).format("YYYYMMDD");
    var today = moment() /*.tz("Australia/Sydney")*/
      .format("YYYYMMDD");
    var tomorrow = moment()
      // .tz("Australia/Sydney")
      .add(1, "day")
      .format("YYYYMMDD");
    var yesterday = moment()
      // .tz("Australia/Sydney")
      .subtract(1, "day")
      .format("YYYYMMDD");
    var afterTomorrow = moment()
      .tz("Australia/Sydney")
      .add(2, "day")
      .format("YYYYMMDD");
    if (date === today) {
      setToday(true);
      setTomorrow(false);
      setYesterday(false);
      setNextToJump(false);
      setAfterTomorrow(false);
    } else if (date === tomorrow) {
      setToday(false);
      setTomorrow(true);
      setYesterday(false);
      setNextToJump(false);
      setAfterTomorrow(false);
    } else if (date === yesterday) {
      setToday(false);
      setTomorrow(false);
      setYesterday(true);
      setNextToJump(false);
      setAfterTomorrow(false);
    } else if (date === afterTomorrow) {
      setToday(false);
      setTomorrow(false);
      setYesterday(false);
      setNextToJump(false);
      setAfterTomorrow(true);
    } else if (
      date !== tomorrow ||
      date !== today ||
      date !== yesterday ||
      date !== afterTomorrow
    ) {
      setToday(false);
      setTomorrow(false);
      setYesterday(false);
      setNextToJump(false);
      setAfterTomorrow(false);
    }
  };
  // const UpdateTime = () => {
  //   if (today === true) {
  //     return (
  //       <div
  //         style={{
  //           backgroundColor: "white",
  //           padding: 8,
  //           paddingBottom: -8,
  //           marginTop: "6px",
  //           textAlign: "center",
  //           fontWeight: "600",
  //         }}
  //       >
  //         {/* style={{ backgroundColor: "#FAFAFA", marginTop: "6px", padding: "4px", borderRadius: "4px", textAlign: "center", fontWeight: "600" }} */}
  //         Today’s Selections are generated and uploaded between 9-11am AEST.
  //         Even though they appeared yesterday as Tomorrow’s Selections they are
  //         re-generated and re-uploaded daily between 9-11am AEST to incorporate
  //         the updated data/information (scratchings, jockey changes, etc…).
  //       </div>
  //     );
  //   } else if (tomorrow === true) {
  //     return (
  //       <div
  //         style={{
  //           backgroundColor: "white",
  //           padding: 8,
  //           paddingBottom: -8,
  //           marginTop: "6px",
  //           textAlign: "center",
  //           fontWeight: "600",
  //         }}
  //       >
  //         Tomorrow’s Selections are generated and uploaded daily between 12-2pm
  //         AEST.
  //       </div>
  //     );
  //   }
  // };

  const nextToJumpRender = () => {
    if (nextToJump === true) {
      var c = props.nextToJump.map((element) => {
        return (
          <Link
            to={`/horse-racing-tips/${checkRouteDate(
              moment(element.meetdate).format("DD-MM-YYYY")
            )}/${element.track_name}/R${element.race_num}/${element.point_id}`}
            key={element.point_id}
            style={{ color: "inherit" }}
            onClick={() => {
              navigate(element.point_id);
            }}
          >
            <div>
              <NextToJump
                meetdate={element.meetdate}
                track_name={element.track_name}
                track_condition={element.track_condition}
                race_num={element.race_num}
                race_time={element.race_time}
                track_description={element.track_description}
                track_distance={element.track_distance}
                track_weather={element.track_weather}
                race_status={element.race_status}
                PID={element.point_id}
                unibet_odds={element.unibet_odds}
                sb_odds={element.sportsbetting_odds}
                horse_nb={element.horse_nb}
                selections_first={element.selections_first}
                selections_second={element.selections_second}
              />
            </div>
          </Link>
        );
      });
      return c;
    } else {
      return (
        <div>
          <STable
            date={moment(transferRoute(), "DD-MM-YYYY")
              .tz("Australia/Sydney")
              .format("YYYY-MM-DD")}
          />
        </div>
      );
    }
  };

  const renderNext10 = () => {
    if (window.innerWidth < 1200) {
      return (
        <Col xs="12" lg="12" xl="2" style={{ marginTop: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h5
              style={{
                backgroundColor: "rgb(20, 40, 65)",
                height: 32,
                borderRadius: 4,
                textAlign: "center",
                padding: 5,
                color: "white",
                fontWeight: "600",
                margin: 0,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "300px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {/* <CustomInput type="checkbox" id="NRNext" label="My" checked={props.showNextMy} onChange={(e) => selectNRNext(e)} /> */}
              <span>NEXT PTP TIPS</span>
              <CustomInput
                type="checkbox"
                id="CTCN"
                label="CTC"
                checked={props.showCTCN}
                onChange={(e) => selectCTCN(e)}
              />
              <CustomInput
                type="checkbox"
                id="NRNext"
                label="N/R"
                checked={props.showNextNR}
                onChange={(e) => selectNRNext(e)}
              />
            </h5>
          </div>
          <div
            style={{
              display: "flex",
              overflowX: "scroll",
              overflowY: "hidden",
              marginBottom: "8px",
            }}
          >
            <Next10 />
          </div>
        </Col>
      );
    } else {
      return (
        <Col xs="12" lg="3" xl="2" style={{ paddingRight: "1px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 5,
              backgroundColor: "rgb(20, 40, 65)",
              color: "white",
              height: 32,
              paddingTop: "3%",
              borderRadius: 4,
            }}
          >
            {/* <CustomInput type="checkbox" id="MyNext" label="My" checked={props.showNextMy} onChange={(e) => selectNRNext(e)} /> */}
            <h5
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "600",
                fontSize: 14,
              }}
            >
              NEXT PTP TIPS
            </h5>
            <CustomInput
              type="checkbox"
              id="CTCN"
              label="CTC"
              checked={props.showCTCN}
              onChange={(e) => selectCTCN(e)}
            />
            <CustomInput
              type="checkbox"
              id="NRNext"
              label="N/R"
              checked={props.showNextNR}
              onChange={(e) => selectNRNext(e)}
            />
          </div>
          <div className="next10">
            <Next10 Open={true} />
          </div>
        </Col>
      );
    }
  };

  const renderLast10 = () => {
    if (window.innerWidth < 1280) {
      return (
        <Col xs="12" lg="12" xl="2" style={{ marginTop: "24px" }}>
          <h5
            style={{
              backgroundColor: "rgb(20, 40, 65)",
              height: 32,
              borderRadius: 4,
              textAlign: "center",
              color: "white",
              fontWeight: "600",
              margin: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "300px",
              marginLeft: "auto",
              marginRight: "auto",
              padding: 5,
            }}
          >
            {/* <CustomInput type="checkbox" id="MYLast" label="My" checked={props.showLastMY} onChange={(e) => selectNRNext(e)} /> */}
            <span>PREV PTP TIPS</span>
            <CustomInput
              type="checkbox"
              id="CTCL"
              label="CTC"
              checked={props.showCTCL}
              onChange={(e) => selectCTCL(e)}
            />
            <CustomInput
              type="checkbox"
              id="NRLast"
              label="N/R"
              checked={props.showLastNR}
              onChange={(e) => selectNRLast(e)}
            />
          </h5>
          <div
            style={{
              display: "flex",
              overflowX: "scroll",
              overflowY: "hidden",
            }}
          >
            <Last10 Open={true} />
          </div>
        </Col>
      );
    } else {
      return (
        <Col xs="12" lg="3" xl="2" style={{ paddingLeft: "1px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 5,
              backgroundColor: "rgb(20, 40, 65)",
              color: "white",
              height: 32,
              paddingTop: "3%",
              borderRadius: 4,
            }}
          >
            {/* <CustomInput type="checkbox" id="MYLast" label="My" checked={props.showLastMY} onChange={(e) => selectNRNext(e)} /> */}
            <h5
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "600",
                fontSize: 14,
              }}
            >
              PREV PTP TIPS
            </h5>
            <CustomInput
              type="checkbox"
              id="CTCL"
              label="CTC"
              checked={props.showCTCL}
              onChange={(e) => selectCTCL(e)}
            />
            <CustomInput
              type="checkbox"
              id="NRLast"
              label="N/R"
              checked={props.showLastNR}
              onChange={(e) => selectNRLast(e)}
            />
          </div>
          <div className="next10">
            <Last10 Open={true} />
          </div>
        </Col>
      );
    }
  };

  // const renderBreadCrumbs=()=> {
  //   if (window.innerWidth > 420) {
  //     return (
  //       <Breadcrumb color="default">
  //         <span>You are here:  </span>
  //         <BreadcrumbItem style={{ marginLeft: 8 }}> <a href="/" style={{ marginLeft: 4 }}>Home</a></BreadcrumbItem>
  //         <BreadcrumbItem>Selections<a href={"/horse-racing-tips/" + transferRoute()} style={{ marginLeft: 4 }}>{moment(transferRoute(), 'DD-MM-YYYY').format("DD-MM-YYYY")}</a></BreadcrumbItem>
  //       </Breadcrumb>
  //     )
  //   }
  // }

  const renderBinance = () => {
    if (window.innerWidth > 1000) {
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
          target="_blank"
          rel="noreferrer"
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

  // const binanceClicks = () => {
  //   let data = {
  //     id: props.currentUser.id,
  //     date: moment().tz("Australia/Sydney").format("YYYY-MM-DD HH:mm:ss"),
  //   };
  //   console.log(data);
  //   postClicksBinance(data);
  // };

  const renderTabs = () => {
    moment.defaultFormat = "DD.MM.YYYY HH:mm";
    var curent = moment().tz("Australia/Sydney").add(2, "day");
    var currentTodate = moment(curent).toDate();
    return (
      <Row style={{ marginBottom: 5 }}>
        <Col
          xl={7}
          md={7}
          xs={12}
          style={{
            display: "flex",
            justifyContent: window.innerWidth < 420 ? "center" : "flex-start",
            marginBottom: 10,
          }}
        >
          <Nav pills>
            <NavItem>
              <NavLink onClick={() => yesterdayFunction()} active={yesterday}>
                {window.innerWidth < 1000 ? "Yesterday" : "Yesterday"}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => todayFunction()} active={today}>
                Today
              </NavLink>
            </NavItem>
            {window.innerWidth < 1000 ? (
              ""
            ) : (
              <NavItem>
                <NavLink
                  onClick={() => nextToJumpFunction()}
                  active={nextToJump}
                >
                  Next To Jump
                </NavLink>
              </NavItem>
            )}

            <NavItem>
              <NavLink onClick={() => tomorrowFunction()} active={tomorrow}>
                Tomorrow
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => aftertomorrowFunction()}
                active={afterTomorrow}
              >
                {moment().tz("Australia/Sydney").add(2, "day").format("dddd")}
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col xl={5} md={5} xs={12}>
          <div
            style={{
              display: "flex",
              justifyContent: window.innerWidth < 1000 ? "center" : "flex-end",
            }}
          >
            <div>
              <FontAwesomeIcon
                className="forward"
                style={{ marginRight: "10px" }}
                icon={faAngleLeft}
                size="2x"
                onClick={() => goBack()}
              />
            </div>
            <div style={{ marginTop: 1 }}>
              <DatePicker
                dateFormat="dd-MM-yyyy"
                onChange={(date) => handleChange(date)}
                selected={moment(transferRoute(), "DD-MM-YYYY").toDate()}
                maxDate={currentTodate}
                minDate={moment("10-06-2020", "DD-MM-YYYY").toDate()}
                className="input"
              />
            </div>
            <div style={{ marginRight: 10 }}>
              <FontAwesomeIcon
                className="forward"
                style={{ marginLeft: "10px" }}
                icon={faAngleRight}
                size="2x"
                onClick={() => goForward()}
              />
            </div>
            <Infos />
          </div>
        </Col>
      </Row>
    );
  };

  //SEO CHECK
  const SEO = () => {
    var passingDate = moment(transferRoute(), "DD-MM-YYYY")
      .tz("Australia/Sydney")
      .format("YYYY-MM-DD");
    var today = moment().tz("Australia/Sydney").format("YYYY-MM-DD");
    var tomorrow = moment()
      .tz("Australia/Sydney")
      .add(1, "day")
      .format("YYYY-MM-DD");
    var yesterday = moment()
      .tz("Australia/Sydney")
      .subtract(1, "day")
      .format("YYYY-MM-DD");

    if (passingDate === today) {
      return (
        <Helmet>
          <title>
            Australian Horse Racing Form Guides and Free Tips for Today{" "}
            {passingDate}, Best Free Horse Racing Tips
          </title>
          <meta
            charSet="utf-8"
            name="description"
            content={
              "Sign up to PTP Tips for the best horse free racing tips for today. Our process rates every horse's chance of winning for Australian thoroughbred races, and our tips are updated daily! , Australian Horse Racing Form Guides"
            }
          />
          <link
            rel="canonical"
            href={"https://www.ptptips.com.au/horse-racing-tips/today"}
          />
        </Helmet>
      );
    } else if (passingDate === tomorrow) {
      return (
        <Helmet>
          <title>
            Australian Horse Racing Form Guides and Tips for Tomorrow{" "}
            {passingDate}, FREE Tips!
          </title>
          <meta
            charSet="utf-8"
            name="description"
            content={
              "Get horse racing tips and predictions for tomorrow that rate each horse based on its chance of victory. Sign up to PTP Tips for tomorrow's racing tips on every meeting in Australia!"
            }
          />
          <link
            rel="canonical"
            href={"https://www.ptptips.com.au/horse-racing-tips/tomorrow"}
          />
        </Helmet>
      );
    } else if (passingDate === yesterday) {
      return (
        <Helmet>
          <title>
            Australian Horse Racing Form Guides and Free Tips for Yesterday{" "}
            {passingDate}, FREE Tips!
          </title>
          <meta
            charSet="utf-8"
            name="description"
            content="Get horse racing tips and predictions for yesterday results that rate each horse based on its chance of victory.
          Sign up to PTP Tips for tomorrow's racing tips on every meeting in Australia!"
          />
          <link
            rel="canonical"
            href={"https://www.ptptips.com.au/horse-racing-tips/yesterday"}
          />
        </Helmet>
      );
    } else {
      return (
        <Helmet>
          <title>
            Australian Horse Racing Free Tips, Predictions, Betting Tips | PTP
            Tips
          </title>
          <meta
            charSet="utf-8"
            name="description"
            content={
              "Get free horse racing tips and predictions for " +
              passingDate +
              " in Australia. We provide daily free horse racing tips and generate percentage chance of winning. Here're the winning % for " +
              passingDate
            }
          />
          <link
            rel="canonical"
            href={
              "https://www.ptptips.com.au/horse-racing-tips/" +
              moment(transferRoute(), "DD-MM-YYYY")
                .tz("Australia/Sydney")
                .format("DD-MM-YYYY")
            }
          />
        </Helmet>
      );
    }
  };

  const checkTodaySEO = () => {
    var passingDate = moment(transferRoute(), "DD-MM-YYYY")
      .tz("Australia/Sydney")
      .format("DD-MM-YYYY");
    var today = moment().tz("Australia/Sydney").format("DD-MM-YYYY");
    var tomorrow = moment()
      .tz("Australia/Sydney")
      .add(1, "day")
      .format("DD-MM-YYYY");
    var yesterday = moment()
      .tz("Australia/Sydney")
      .subtract(1, "day")
      .format("DD-MM-YYYY");
    if (passingDate === today) {
      return (
        <>
          <Col xs={12}>
            <h1 style={{ textAlign: "center" }}>
              Today’s Free Horse Racing Tips
            </h1>
            <p style={{ textAlign: "justify" }}>
              Want to place a better bet on today’s Australian thoroughbred
              meetings? You can get the best free horse racing tips for today
              through Past the Post Tips. PTP Tips provides daily data that
              analyses the past performance of each horse against its
              competitors. This is paired with information on the track
              condition, the horse barriers, the jockey, live odds, and more to
              provide you with today’s best free horse racing tips.
            </p>
            <p style={{ textAlign: "justify" }}>
              The PTP Tips team then uses this highly sophisticated selection
              process to provide you with a rating for each horse. Every race is
              sorted from the highest rating to the lowest, with the horse with
              the greatest percentage of winning according to our system
              displayed first.
            </p>
            <h6 style={{ textAlign: "justify" }}>
              View Today’s Free Horse Racing Tips Now.
            </h6>
            <hr />
          </Col>
          <ul></ul>

          <Col xs={12}>
            <h1 style={{ textAlign: "center" }}>
              Australian Horse Racing Tips 7 Days a Week
            </h1>
            <p style={{ textAlign: "justify" }}>
              You can be sure that our Australian horse racing tips for today
              provide you with the most accurate and up-to-date data on every
              horse and every race. Our horse tips for today include any late
              changes such as horse scratching details, jockey changes,
              alterations in track conditions, and anything else you need to
              know.
            </p>
            <p style={{ textAlign: "justify" }}>
              Our Australian horse racing tips for each day are uploaded between
              9 am and 11 am. While you can also view{" "}
              <a href="https://www.ptptips.com.au/horse-racing-tips/tomorrow">
                tips for tomorrow
              </a>
              , daily tips will be updated every morning to ensure you’re
              getting the best possible information.
            </p>
            <hr />
          </Col>

          <Col xs={12}>
            <h1 style={{ textAlign: "center" }}>
              Get the Best Free Horse Racing Tips Every Day with Past The Post
            </h1>
            <p style={{ textAlign: "justify" }}>
              When it comes to horse racing, you need a little bit of luck and a
              lot of data to work with. At Past The Post Tips, we believe you
              can make a lot of your own luck with the live and accurate
              information that we provide.
            </p>
            <p style={{ textAlign: "justify" }}>
              Our daily horse racing tips not only provide you with the latest
              information on every Australian thoroughbred meeting every day of
              the week. We also crunch all the data for you and provide you with
              ratings for every horse for every race. The horse with the highest
              percentage has the best chance of winning according to our data.
            </p>
            <p style={{ textAlign: "justify" }}>
              {!props.isLoggedIn ? (
                <>
                  With {props.subscription} trial available, you can get FREE
                  horse tips for today and every day. With a deal like that, who
                  needs luck? <Link to={"/register"}>Get started today!</Link>
                </>
              ) : null}
            </p>
            <hr />
          </Col>
        </>
      );
    } else if (passingDate === tomorrow) {
      return (
        <>
          <Col xs={12}>
            <h1 style={{ textAlign: "center" }}>
              Free Horse Racing Tips for Tomorrow
            </h1>
            <p style={{ textAlign: "justify" }}>
              If you’re planning your bets for future Australian thoroughbred
              meetings, you can rely on luck or you can rely on{" "}
              <a href="https://www.ptptips.com.au/">Past The Post Tips</a>. As
              Australia’s leading online hub for horse racing data and rankings,
              we can give you the data you need to beat the odds.
            </p>
            <p style={{ textAlign: "justify" }}>
              Here’s how it works. PTP Tips analyses all future horse racing
              meetings in Australia based on each horse’s performance against
              the others. We also take into consideration a range of other
              factors, including who’s riding the horse, what condition the
              track is in, horse weights, classes, and barriers, and much more.
            </p>
            <p style={{ textAlign: "justify" }}>
              The result is horse racing tips for tomorrow that rank and rate
              each horse based on its chance of victory. These carefully
              selected ratings give each horse a percentage. The higher the
              percentage, the greater the horse’s chance of winning on that
              track for that race.
            </p>
            <p style={{ textAlign: "justify" }}>
              Get started with Past the Post Tips and get access to horse racing
              tips for tomorrow right now!
            </p>
            <hr />
          </Col>

          <Col xs={12}>
            <h2 style={{ textAlign: "center" }}>
              Get Tomorrow’s Best Free Horse Racing Tips with Past the Post
            </h2>
            <p style={{ textAlign: "justify" }}>
              The hardworking team at Past The Post Tips has the knowledge and
              the time to provide you with the most accurate and up-to-date
              horse racing data. We do the hard work, so you don’t have to and
              we upload racing tips for tomorrow every day of the week.
            </p>
            <p style={{ textAlign: "justify" }}>
              You can view tomorrow’s ratings and data between 12 pm and 2 pm
              daily when it is generated and uploaded to the website. We always
              display live odds from two Australian licensed bookmakers
              alongside our rankings, allowing you to make a choice with all the
              information in front of you.<ul></ul>
            </p>
            <hr />
          </Col>

          <Col xs={12}>
            <h2 style={{ textAlign: "center" }}>
              Australian Horse Racing Tips for Every Day of the Week
            </h2>
            <p style={{ textAlign: "justify" }}>
              As well as horse racing tips for tomorrow, you can also view
              updated tips and ratings for today. Keep in mind that any tips you
              view in the “Tomorrow’s Tips” section will be generated and
              re-uploaded on race day to keep you up to date with all the latest
              information. If a horse has been scratched, a jockey has been
              changed, or the weather has altered the conditions of the track,
              you’ll know about it in the updated tips we provide on race day.
            </p>
            <p style={{ textAlign: "justify" }}>
              {!props.isLoggedIn ? (
                <>
                  With a{" "}
                  <Link to={"/register"}>
                    {props.subscription} trial available
                  </Link>
                  , you can get FREE horse racing tips for tomorrow and try out
                  our system for yourself.
                </>
              ) : null}
            </p>
            <hr />
          </Col>
        </>
      );
    } else if (passingDate === yesterday) {
      return (
        <>
          <Col xs={12}>
            <h1 style={{ textAlign: "center" }}>
              Yesterday’s Horse Racing Tips
            </h1>
            <p style={{ textAlign: "justify" }}>
              Want to place a better bet on yesterday’s Australian thoroughbred
              meetings? You can get the best horse racing tips for yesterday
              through Past the Post Tips. PTP Tips provides daily data that
              analyses the past performance of each horse against its
              competitors. This is paired with information on the track
              condition, the horse barriers, the jockey, live odds, and more to
              provide you with yesterday’s best horse racing tips.
            </p>
            <p style={{ textAlign: "justify" }}>
              The PTP Tips team then uses this highly sophisticated selection
              process to provide you with a rating for each horse. Every race is
              sorted from the highest rating to the lowest, with the horse with
              the greatest percentage of winning according to our system
              displayed first.
            </p>
            <h6 style={{ textAlign: "justify" }}>
              View yesterday’s horse racing tips now.
            </h6>
            <hr />
          </Col>

          <Col xs={12}>
            <h1 style={{ textAlign: "center" }}>
              Australian Horse Racing Tips 7 Days a Week
            </h1>
            <p style={{ textAlign: "justify" }}>
              You can be sure that our Australian horse racing tips for
              yesterday provide you with the most accurate and up-to-date data
              on every horse and every race. Our horse tips for yesterday
              include any late changes such as horse scratching details, jockey
              changes, alterations in track conditions, and anything else you
              need to know.
            </p>
            <p style={{ textAlign: "justify" }}>
              Our Australian horse racing tips for each day are uploaded between
              9 am and 11 am. While you can also view{" "}
              <a href="https://www.ptptips.com.au/horse-racing-tips/tomorrow">
                tips for tomorrow
              </a>
              , daily tips will be updated every morning to ensure you’re
              getting the best possible information.
            </p>
            <hr />
          </Col>

          <Col xs={12}>
            <h1 style={{ textAlign: "center" }}>
              Get the Best Horse Racing Tips Every Day with Past The Post
            </h1>
            <p style={{ textAlign: "justify" }}>
              When it comes to horse racing, you need a little bit of luck and a
              lot of data to work with. At Past The Post Tips, we believe you
              can make a lot of your own luck with the live and accurate
              information that we provide.
            </p>
            <p style={{ textAlign: "justify" }}>
              Our daily horse racing tips not only provide you with the latest
              information on every Australian thoroughbred meeting every day of
              the week. We also crunch all the data for you and provide you with
              ratings for every horse for every race. The horse with the highest
              percentage has the best chance of winning according to our data.
            </p>
            <p style={{ textAlign: "justify" }}>
              {!props.isLoggedIn ? (
                <>
                  With {props.subscription} trial available, you can get FREE
                  horse tips for yesterday and every day. With a deal like that,
                  who needs luck?{" "}
                  <Link to={"/register"}>Get started yesterday!</Link>
                </>
              ) : null}
            </p>
            <hr />
          </Col>
        </>
      );
    } else if (passingDate === "01-11-2022") {
      return (
        <>
          <Col xs={12}>
            <h1 style={{ textAlign: "center" }}>
              Melbourne Cup's Horse Racing Tips
            </h1>
            <p style={{ textAlign: "justify" }}>
              Want to place a better bet on{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href={"/horse-racing-tips/01-11-2022/Flemington/R7/50886"}
              >
                Melbourne Cup’s{" "}
              </a>{" "}
              Australian thoroughbred meetings? You can get the best horse
              racing tips for{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href={"/horse-racing-tips/01-11-2022/Flemington/R7/50886"}
              >
                Melbourne Cup{" "}
              </a>{" "}
              through Past the Post Tips. PTP Tips provides daily data that
              analyses the past performance of each horse against its
              competitors. This is paired with information on the track
              condition, the horse barriers, the jockey, live odds, and more to
              provide you with Melbourne Cup best horse racing tips.
            </p>
            <p style={{ textAlign: "justify" }}>
              The PTP Tips team then uses this highly sophisticated selection
              process to provide you with a rating for each horse. Every race is
              sorted from the highest rating to the lowest, with the horse with
              the greatest percentage of winning according to our system
              displayed first.
            </p>
            <p style={{ textAlign: "justify" }}>
              View{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href={"/horse-racing-tips/01-11-2022/Flemington/R7/50886"}
              >
                Melbourne Cup’s{" "}
              </a>
              horse racing tips now.
            </p>
            <hr />
          </Col>

          <Col xs={12}>
            <h1 style={{ textAlign: "center" }}>
              Australian Horse Racing Tips 7 Days a Week
            </h1>
            <p style={{ textAlign: "justify" }}>
              You can be sure that our Australian horse racing tips for{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href={"/horse-racing-tips/01-11-2022/Flemington/R7/50886"}
              >
                Melbourne Cup{" "}
              </a>{" "}
              provide you with the most accurate and up-to-date data on every
              horse and every race. Our horse tips for{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href={"/horse-racing-tips/01-11-2022/Flemington/R7/50886"}
              >
                Melbourne Cup{" "}
              </a>{" "}
              include any late changes such as horse scratching details, jockey
              changes, alterations in track conditions, and anything else you
              need to know.
            </p>
            <p style={{ textAlign: "justify" }}>
              Our Australian horse racing tips for each day are uploaded between
              9 am and 11 am. While you can also view{" "}
              <a href={"https://www.ptptips.com.au/horse-racing-tips/today"}>
                tips for today
              </a>
              , daily tips will be updated every morning to ensure you’re
              getting the best possible information.
            </p>
            <hr />
          </Col>

          <Col xs={12}>
            <h1 style={{ textAlign: "center" }}>
              Get the Best Horse Racing Tips Every Day with Past The Post
            </h1>
            <p style={{ textAlign: "justify" }}>
              When it comes to horse racing, you need a little bit of luck and a
              lot of data to work with. At Past The Post Tips, we believe you
              can make a lot of your own luck with the live and accurate
              information that we provide.
            </p>
            <p style={{ textAlign: "justify" }}>
              Our daily horse racing tips not only provide you with the latest
              information on every Australian thoroughbred meeting every day of
              the week. We also crunch all the data for you and provide you with
              ratings for every horse for every race. The horse with the highest
              percentage has the best chance of winning according to our data.
            </p>
            <p style={{ textAlign: "justify" }}>
              {!props.isLoggedIn ? (
                <>
                  With {props.subscription} trial available, you can get FREE
                  horse tips for{" "}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={"/horse-racing-tips/01-11-2022/Flemington/R7/50886"}
                  >
                    Melbourne Cups{" "}
                  </a>{" "}
                  and every day. With a deal like that, who needs luck?{" "}
                  <Link to={"/register"}>Get started today!</Link>
                </>
              ) : null}
            </p>
            <hr />
          </Col>
        </>
      );
    } else {
      return (
        <>
          <Col xs={12}>
            <h1 style={{ textAlign: "center" }}>
              Horse Racing Tips of {passingDate}
            </h1>
            <p style={{ textAlign: "justify" }}>
              Want to place a better bet on {passingDate}’s Australian
              thoroughbred meetings? You can get the best horse racing tips for{" "}
              {passingDate} through Past the Post Tips. PTP Tips provides daily
              data that analyses the past performance of each horse against its
              competitors. This is paired with information on the track
              condition, the horse barriers, the jockey, live odds, and more to
              provide you with {passingDate} best horse racing tips.
            </p>
            <p style={{ textAlign: "justify" }}>
              The PTP Tips team then uses this highly sophisticated selection
              process to provide you with a rating for each horse. Every race is
              sorted from the highest rating to the lowest, with the horse with
              the greatest percentage of winning according to our system
              displayed first.
            </p>
            <p style={{ textAlign: "justify" }}>
              View {passingDate}’s horse racing tips now.
            </p>
            <hr />
          </Col>

          <Col xs={12}>
            <h1 style={{ textAlign: "center" }}>
              Australian Horse Racing Tips 7 Days a Week
            </h1>
            <p style={{ textAlign: "justify" }}>
              You can be sure that our Australian horse racing tips for{" "}
              {passingDate} provide you with the most accurate and up-to-date
              data on every horse and every race. Our horse tips for{" "}
              {passingDate} include any late changes such as horse scratching
              details, jockey changes, alterations in track conditions, and
              anything else you need to know.
            </p>
            <p style={{ textAlign: "justify" }}>
              Our Australian horse racing tips for each day are uploaded between
              9 am and 11 am. While you can also view{" "}
              <a href={"https://www.ptptips.com.au/horse-racing-tips/today"}>
                tips for today
              </a>
              , daily tips will be updated every morning to ensure you’re
              getting the best possible information.
            </p>
            <hr />
          </Col>

          <Col xs={12}>
            <h1 style={{ textAlign: "center" }}>
              Get the Best Horse Racing Tips Every Day with Past The Post
            </h1>
            <p style={{ textAlign: "justify" }}>
              When it comes to horse racing, you need a little bit of luck and a
              lot of data to work with. At Past The Post Tips, we believe you
              can make a lot of your own luck with the live and accurate
              information that we provide.
            </p>
            <p style={{ textAlign: "justify" }}>
              Our daily horse racing tips not only provide you with the latest
              information on every Australian thoroughbred meeting every day of
              the week. We also crunch all the data for you and provide you with
              ratings for every horse for every race. The horse with the highest
              percentage has the best chance of winning according to our data.
            </p>
            <p style={{ textAlign: "justify" }}>
              {!props.isLoggedIn ? (
                <>
                  With {props.subscription} trial available, you can get FREE
                  horse tips for {passingDate} and every day. With a deal like
                  that, who needs luck?{" "}
                  <Link to={"/register"}>Get started today!</Link>
                </>
              ) : null}
            </p>
            <hr />
          </Col>
        </>
      );
    }
  };

  return (
    <>
      {SEO()}

      <Col
        xs="12"
        lg="12"
        style={{
          marginTop: 32,
          marginBottom: 40,
          paddingLeft: "8px",
          paddingRight: "8px",
        }}
      >
        {/*{renderMelbourne()}*/}
        {/* <Melbourne /> */}
        <Row style={{ margin: 0 }}>
          {renderNext10()}

          <Col xl={8} lg={12}>
            {moment().format("YYYYMMDD") <= "20221101" && <Melbourne />}

            {renderTabs()}
            {nextToJumpRender()}

            {/* <div style={{ backgroundColor: "#FAFAFA", marginTop: "6px", padding: "4px", borderRadius: "4px", textAlign: "left" }}>
                <p style={{ fontWeight: "700" }}>Legend</p>
                <p> <strong>N/R:</strong> No Selections Available Due To Insufficient Racing History</p>
                <p> <strong>ABND:</strong> Abandoned </p>
              </div> */}
            {/* <Legend /> */}

            <Row style={{ margin: 15 }}>{checkTodaySEO()}</Row>
          </Col>

          {renderLast10()}
        </Row>
        <br />

        <Form>
          <Col style={{ textAlign: "center" }}>{renderBinance()}</Col>
        </Form>

        <br />

        <Row style={{ margin: 0 }}>
          <Col>
            <Last10Winners />
          </Col>
        </Row>

        <Row style={{ margin: 0 }}>
          <Col>
            <Button />
          </Col>
        </Row>

        <Modal isOpen={props.isNewUser} style={{ marginTop: 80 }}>
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
            <p style={{ fontFamily: 12, marginTop: 4, fontSize: 16 }}>
              <strong>Welcom To</strong>
            </p>
            <h1 style={{ marginTop: -8 }}>
              <strong>Past The Post</strong>
            </h1>
            <p style={{ fontSize: 18, width: "88%", marginTop: 8 }}>
              <strong>Hi {props.currentUser?.firstName}</strong> , you have
              successfully created your account.
            </p>
            <span style={{ marginTop: 8, fontSize: 18 }}>
              {" "}
              Now you can enjoy your{" "}
              <span style={{ fontWeight: "bold", color: "#44bd32" }}>
                {props.subscription}
              </span>{" "}
              FREE trial!
            </span>
          </ModalBody>
          <ModalFooter
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Button onClick={closeWelcome} color="primary">
              <strong>Okay</strong>
            </Button>
            {""}
          </ModalFooter>
        </Modal>

        <Modal isOpen={!props.firstNameExist} style={{ marginTop: 80 }}>
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
              <strong>Hi</strong>, looks like we are missing some important
              information, please fill out the required fields in order to
              complete your profile.
            </p>
            <Row>
              <Label for="firstName">
                First Name<span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                style={{ textAlign: "left" }}
                placeholder="Your First Name"
                onChange={handleNameChange}
              />
            </Row>
            <Row>
              <Label for="lastName">
                Last Name<span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                style={{ textAlign: "left" }}
                placeholder="Your Last Name"
                onChange={handleNameChange}
              />
            </Row>
          </ModalBody>
          <ModalFooter
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Button onClick={closeFirstNameExist} color="primary">
              <strong>Okay</strong>
            </Button>
            {""}
          </ModalFooter>
        </Modal>
      </Col>
    </>
  );
};

const mapStateToProps = (state) => ({
  selections: state.selectionReducer.selections,
  nextToJump: state.NextTojumpReducer?.info,
  loadingSelection: state.selectionReducer.loadingSelection,
  isNewUser: state.auth.isNewUser,
  isLoggedIn: state.auth.isLoggedIn,
  firstNameExist: state.auth.firstNameExist,
  currentUser: state.auth.currentUser,
  subscription: state.auth.subscription,
  showNextNR: state.selectionReducer.showNextNR,
  showLastNR: state.selectionReducer.showLastNR,
  showCTCN: state.selectionReducer.showCTCN,
  showCTCL: state.selectionReducer.showCTCL,
});

export default withRouter(connect(mapStateToProps)(Selections));
