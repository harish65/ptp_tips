import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter, useParams } from "react-router-dom";
import Helmet from "react-helmet";
import moment from "moment-timezone";

import Tabs from "./components/tabs/tabs";
import ResultHead from "./components/head/ResultHead";
import LoadingNew from "../../components/loading/LoadingNew";
import VenueTable from "./components/table/venueTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";


/* REDUX */
import resultAction from "../../redux/actions/results";

/* CSS */
import "./results.scss";

export const Results = (props) => {
  const params = useParams();
  const [today, setToday] = useState(false);
  const [yesterday, setYesterday] = useState(false);
  const [lastWed, setLastWed] = useState(false);
  const [lastSat, setLastSat] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    let date = transferRoute();
    assignTabs(date);
    props.getResults({
      passDate: moment(date, "DD-MM-YYYY").format("YYYY-MM-DD"),
    });
    props.setSelectedVenue(0);
  }, [params.date]);

  useEffect(() => {
    var interval = setInterval(() => {
      let today = moment().tz("Australia/Sydney").format("DD-MM-YYYY");
      let param = moment(transferRoute(), "DD-MM-YYYY").format("DD-MM-YYYY");
      if (!document.hidden && param >= today) {
        props.getResultsForDateNoLoading({
          passDate: moment(transferRoute(), "DD-MM-YYYY").format("YYYY-MM-DD"),
        });
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [params.date]);

  const transferRoute = () => {
    if (params.date === "today") {
      return moment().tz("Australia/Sydney").format("DD-MM-YYYY");
    } else if (params.date === "yesterday") {
      return moment()
        .tz("Australia/Sydney")
        .subtract(1, "day")
        .format("DD-MM-YYYY");
    } else if (params.date === "tomorrow") {
      return moment().tz("Australia/Sydney").add(1, "day").format("DD-MM-YYYY");
    }
    return params.date;
  };

  const assignTabs = (date) => {
    // var date = moment(data)
    var today = moment().tz("Australia/Sydney").format("DD-MM-YYYY");
    var yesterday = moment()
      .tz("Australia/Sydney")
      .subtract(1, "day")
      .format("DD-MM-YYYY");
    var ls = lscmp();
    var lwd = lwcmp();
    // console.log(date, today, yesterday, ls, lwd)
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

  const lscmp = () => {
    var tdf = moment().tz("Australia/Sydney").format("dddd");
    if (tdf === "Sunday") {
      return moment()
        .tz("Australia/Sydney")
        .subtract(1, "day")
        .format("DD-MM-YYYY");
    } else if (tdf === "Saturday") {
      return moment()
        .tz("Australia/Sydney")
        .subtract(7, "day")
        .format("DD-MM-YYYY");
    } else if (tdf === "Friday") {
      return moment()
        .tz("Australia/Sydney")
        .subtract(6, "day")
        .format("DD-MM-YYYY");
    } else if (tdf === "Thursday") {
      return moment()
        .tz("Australia/Sydney")
        .subtract(5, "day")
        .format("DD-MM-YYYY");
    } else if (tdf === "Wednesday") {
      return moment()
        .tz("Australia/Sydney")
        .subtract(4, "day")
        .format("DD-MM-YYYY");
    } else if (tdf === "Tuesday") {
      return moment()
        .tz("Australia/Sydney")
        .subtract(3, "day")
        .format("DD-MM-YYYY");
    } else if (tdf === "Monday") {
      return moment()
        .tz("Australia/Sydney")
        .subtract(2, "day")
        .format("DD-MM-YYYY");
    }
  };

  const lwcmp = () => {
    var td = moment().tz("Australia/Sydney");
    var tdf = moment(td).format("dddd");
    if (tdf === "Sunday") {
      return moment(td).subtract(4, "day").format("DD-MM-YYYY");
    } else if (tdf === "Saturday") {
      return moment(td).subtract(3, "day").format("DD-MM-YYYY");
    } else if (tdf === "Friday") {
      return moment(td).subtract(2, "day").format("DD-MM-YYYY");
    } else if (tdf === "Thursday") {
      return moment(td).subtract(1, "day").format("DD-MM-YYYY");
    } else if (tdf === "Wednesday") {
      return moment(td).subtract(7, "day").format("DD-MM-YYYY");
    } else if (tdf === "Tuesday") {
      return moment(td).subtract(6, "day").format("DD-MM-YYYY");
    } else if (tdf === "Monday") {
      return moment(td).subtract(5, "day").format("DD-MM-YYYY");
    }
  };

  const renderBinance = () => {
    if ( window.innerWidth > 1000) { 
    
    return (
         
     <a href="https://accounts.binance.com/en/register?ref=WN1HZSFL" target="_blank" style={{textAlign:"center"}}>
      
        <img src={Binance} style={{borderRadius:"8px",width: window.innerWidth > 1000 ? "auto" : "100%"}} className="binance"/>
      
    
      </a>
    )
  } else if(window.innerWidth < 450) {
      return (
         
      <a href="https://accounts.binance.com/en/register?ref=WN1HZSFL" target="_blank" style={{textAlign:"center"}}>
       
         <img src={BinanceCardMobile} style={{borderRadius:"8px" ,  width:"100%" ,height:"170px"}}  className="binance"/>
       
     
       </a>
       )
     
    } else {
      return (
         
        <a href="https://accounts.binance.com/en/register?ref=WN1HZSFL" target="_blank" style={{textAlign:"center"}} >
         
           <img src={Binance} style={{borderRadius:"8px" ,  width:"100%"}} className="binance"/>
         
       
         </a>
         )
    }
  }

  return (
    <div>
      <Helmet>
        <title>Results</title>
        <meta charSet="utf-8" name="author" content="PTP Tips" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          charSet="utf-8"
          name="keywords"
          content="PTP Tip , results , racing table , racing table resulted , live results , results , winner , win percentage , "
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
          href={"https://www.ptptips.com.au/horse-racing-tips/results/" + params.date}
        />
      </Helmet>

      {props.loading ? (
        <LoadingNew />
      ) : !props.results ? (
        <div style={{ textAlign: "center" }}>
          <div style={{ marginTop: 32 }}>
            <FontAwesomeIcon icon={faExclamationCircle} size="4x" />
            <h4 style={{ marginTop: 16 }}>
              <strong>No Data Available</strong>
            </h4>
            <p style={{ marginTop: -8 }}>Go back to selections</p>
          </div>
        </div>
      ) : (
        <>
          <ResultHead transferRoute={transferRoute} />

          <Tabs
            today={today}
            yesterday={yesterday}
            lastWed={lastWed}
            lastSat={lastSat}
            lwcmp={lwcmp}
            lscmp={lscmp}
            transferRoute={transferRoute}
          />

          <VenueTable />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.resultsReducer.loading,
  results: state.resultsReducer.results,
  // daily_results: state.resultsReducer.daily_results,
  // day_of_week_history: state.resultsReducer.day_of_week_history
});

const mapDispatchToProps = (dispatch) => ({
  getResults: (data) => dispatch(resultAction.getResults(data)),
  getResultsForDateNoLoading: (data) =>
    dispatch(resultAction.getResultsForDateNoLoading(data)),
  setSelectedVenue: (data) => dispatch(resultAction.setSelectedVenue(data)),
  // getRaceInfo: (data) => dispatch(raceAction.getRaceInfo(data)),
  // getSelectionsForDate: (data) => dispatch(selectionsAction.getSelectionsForDate(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Results));
