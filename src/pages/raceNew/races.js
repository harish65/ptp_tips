import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import MelbourneCup from "../MelbouneCup/MelbourneCup";

//COMPONENTS
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import RaceHead from "./components/head/head";
import LoadingNew from "../../components/loading/LoadingNew";
import { Col, Row, Button } from "reactstrap";
import ScratchinsIcon from "react-ionicons/lib/MdClose";
import Options from "react-ionicons/lib/MdOptions";
import Star from "react-ionicons/lib/MdStar";
import Stat from "react-ionicons/lib/MdStats";
import MdMap from "react-ionicons/lib/MdMap";
import Result from "./components/resultSection/results";
import Odds from "./components/odds/odds";
import SpeedMap from "./components/speedMap/SpeedMap";
import Scratchings from "./components/scratching/scratches";
import HorsesTable from "./components/horseTable/horseTable";
//REDUX
import raceAction from "../../redux/actions/race";
import { headerLogoChange } from "../../redux/actions/auth";

//SCSS

import "./race.scss";

export const Races = ({
  trackInfo,
  raceTabs,
  changeTab,
  headerLogoChange,
  subscription,
  loading,
  horses,
  isLoggedIn,
  getRaceInfoOpt,
  genTime,
  oldHorses,
  history,
}) => {
  const params = useParams();
  // const [raceRating, setraceRating] = useState(0);
  const [showMore, setShowMore] = useState(false);
 const raceRating = 0
  useEffect(() => {
    changeTab(0);
    headerLogoChange(null);
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
    if (window.innerWidth < 700) {
      window.onscroll = (e) => {
        if (window.scrollY) {
          headerLogoChange(trackInfo[0]?.track_name);
        } else {
          headerLogoChange(null);
        }
      };
    }
    return () => {
      headerLogoChange("null");
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // window.scrollTo(0, 0);
    if (params.tab && params.tab === "tips") {
      changeTab(0);
    } else if (params.tab && params.tab === "speedmap") {
      changeTab(1);
    } else if (params.tab && params.tab === "scratchings") {
      changeTab(2);
    } else if (params.tab && params.tab === "odds") {
      changeTab(3);
    } else {
      changeTab(0);
    }
    getRaceInfoOpt(
      { raceId: params.id, condition: "null", raceNum: "null" },
      true,
      0
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  // const renderMelbourne = () => {
  //   if ((params.id = "50886")) {
  //     return <div>MElbbbb</div>;
  //   }
  // };

  useEffect(() => {
    window.scrollTo(10, 10);
    var resulted = trackInfo[0]?.selec_resulted;
    var interval = setInterval(() => {
      if (!document.hidden && resulted === 0) {
        getRaceInfoOpt(
          { raceId: params.id, condition: "null", raceNum: "null" },
          false,
          trackInfo[0]?.selec_resulted
        );
      }
    }, 120000);

    return () => {
      clearInterval(interval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackInfo[0]?.selec_resulted, params.id]);

  const seoText = `Want to place a better bet on ${
    history?.location?.pathname
      ? history?.location?.pathname?.split("/")[3]
      : null
  } Australia horse racing? You can get the best free horse racing tips for ${
    history?.location?.pathname
      ? history?.location?.pathname?.split("/")[3]
      : null
  } through Past the Post Tips. PTP Tips provides daily data that analyses the past performance of each horse against its competitors. This is paired with information on the track condition, the horse barriers, the jockey, live odds, and more to provide you with ${
    history?.location?.pathname
      ? history?.location?.pathname?.split("/")[3]
      : null
  } best free horse racing tips.
  The PTP Tips team then uses this highly sophisticated selection process to provide you with a rating for each horse. Every race is sorted from the highest rating to the lowest, with the horse with the greatest percentage of winning according to our system displayed first.
  View ${
    history?.location?.pathname
      ? history?.location?.pathname?.split("/")[3]
      : null
  } Free Horse Racing Tips Now.
  ${
    history?.location?.pathname
      ? history?.location?.pathname?.split("/")[3]
      : null
  } Free Horse Racing Tips For ${
    history?.location?.pathname
      ? history?.location?.pathname?.split("/")[2]
      : null
  }
  You can be sure that our (insert venue) Australian horse racing tips for ${
    history?.location?.pathname
      ? history?.location?.pathname?.split("/")[2]
      : null
  } provide you with the most accurate and up-to-date data on every horse and every race. Our ${
    history?.location?.pathname
      ? history?.location?.pathname?.split("/")[3]
      : null
  } horse tips for  ${
    history?.location?.pathname
      ? history?.location?.pathname?.split("/")[2]
      : null
  } include any late changes such as horse scratching details, jockey changes, alterations in track conditions, and anything else you need to know.
  ${
    history?.location?.pathname
      ? history?.location?.pathname?.split("/")[3]
      : null
  } Australia horse racing tips for each day are uploaded between 9 am and 11 am. While you can also view tips for tomorrow, daily tips will be updated every morning to ensure you’re getting the best possible information.
  Get the Best Free ${
    history?.location?.pathname
      ? history?.location?.pathname?.split("/")[3]
      : null
  } Horse Racing Tips Every Meeting with Past The Post
  When it comes to horse racing, you need a little bit of luck and a lot of data to work with. At Past The Post Tips, we believe you can make a lot of your own luck with the live and accurate information that we provide.
  Our {history?.location?.pathname ? history?.location?.pathname?.split("/")[3] : null} horse racing tips not only provide you with the latest information on every ${
    history?.location?.pathname
      ? history?.location?.pathname?.split("/")[3]
      : null
  } horse racing meeting as we also crunch all the data for you and provide you with ratings for every horse for every  ${
    history?.location?.pathname
      ? history?.location?.pathname?.split("/")[3]
      : null
  } race. The horse with the highest percentage has the best chance of winning according to our data.`;

  const renderBanner = () => {
    if (window.innerWidth < 767) {
      return null;
    } else {
      if (!isLoggedIn) {
        return (
          <div style={{ height: "100%" }}>
            <div
              className="signup-box"
              style={{
                height: 240,
                marginTop: 4,
                borderRadius: 4,
                zIndex: 1,
                padding: 8,
                backgroundSize: "cover",
              }}
            >
              <div>
                <img
                  alt=""
                  src="https://www.ptptips.com.au/favicon.png"
                  width="48px"
                  height="48px"
                />
              </div>
              <div>
                {" "}
                <p
                  style={{
                    fontSize: 16,
                    fontFamily: "Poppins",
                    color: "white",
                    marginBottom: 8,
                    lineHeight: 1.4,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginTop: 8,
                  }}
                >
                  Join PTP TIPS Now and Receive
                  <br /> a {subscription} Free trial.
                </p>
              </div>

              <Link to={"/register"} style={{ marginTop: 2 }}>
                <Button
                  size="sm"
                  color="primary"
                  style={{
                    display: "flex",
                    alignSelf: "center",
                    marginTop: 16,
                  }}
                >
                  <strong>Get Started</strong>
                </Button>
              </Link>
            </div>
          </div>
        );
      } else {
        return (
          <div style={{ height: "100%" }}>
            <div
              className="signup-sps"
              style={{
                height: 240,
                marginTop: 4,
                borderRadius: 4,
                zIndex: 1,
                padding: 8,
                backgroundSize: "cover",
                color: "white",
                fontWeight: "600",
              }}
            >
              {/* <div>
                                <img alt="" src={SpsLogo} width="68px" height="48px" />
                            </div> */}
              {/* <div>
                                <p style={{
                                    fontSize: 16,
                                    fontFamily: 'Poppins',
                                    color: 'white',
                                    marginBottom: 8,
                                    lineHeight: 1.4,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    padding: 10,
                                    marginTop: 8
                                }}>
                                    Join Smart Punting System Now and Receive<br /> 2 Weeks Free trial.
                                </p>
                            </div>

                            <a href='https://spstips.com.au/signUp' target='_blank' style={{ marginTop: 2 }}>
                                <Button size="sm" color="primary" style={{ display: 'flex', alignSelf: 'center', marginTop: 16 }}><strong>Get Started</strong></Button>
                            </a> */}
            </div>
          </div>
        );
      }
    }
  };

  const handleTabs = (newValue) => {
    let raceName = trackInfo[0]?.track_description;

    // console.log(`${params.venue}${ " "}Racecourse${" "}${params.raceNumber}${" "}${raceName}`)
    changeTab(newValue);
    if (newValue === 0) {
      history.push(
        `/horse-racing-tips/${params.date}/${params.venue}/${params.raceNumber}/${params.id}/${raceName}`
      );
    } else if (newValue === 1) {
      history.push(
        `/horse-racing-tips/${params.date}/${params.venue}/${params.raceNumber}/${params.id}/${raceName}/speed-map`
      );
    } else if (newValue === 2) {
      history.push(
        `/horse-racing-tips/${params.date}/${params.venue}/${params.raceNumber}/${params.id}/${raceName}/scratchings`
      );
    } else if (newValue === 3) {
      history.push(
        `/horse-racing-tips/${params.date}/${params.venue}/${params.raceNumber}/${params.id}/${raceName}/odds`
      );
    }
  };

  // const renderMelbourne = () => {
  //   if ()
  //   return (

  //   )
  // }

  const scratchingsCheck = () => {
    const data = horses.find(
      (element) =>
        element.horse_status === "Scratched" ||
        element.horse_status === "LateScratching"
    );
    if (data) {
      return (
        <Tab
          value={2}
          label={
            <span style={{ fontFamily: "Poppins" }}>
              <ScratchinsIcon
                fontSize="16"
                color={"grey"}
                style={{ marginTop: -4 }}
              />
              <span style={{ marginLeft: 4, marginTop: -4, fontSize: 14 }}>
                {window.innerWidth > 700 ? "Scratchings" : null}
              </span>
              {raceTabs === 2 && window.innerWidth < 700 ? "Scratchings" : null}
            </span>
          }
        />
      );
    }
  };

  const renderTabsContent = () => {
    // console.log(params)
    if (params?.id === "50886") {
      if (raceTabs === 0) {
        return (
          <div>
            <HorsesTable
              trackInfo={trackInfo}
              horses={horses}
              genTime={genTime}
              oldHorses={oldHorses}
              disableButtons={false}
            />
            <MelbourneCup />
          </div>
        );
      } else if (raceTabs === 1) {
        return (
          <div style={{ padding: 13 }}>
            <SpeedMap />
            <HorsesTable
              trackInfo={trackInfo}
              horses={horses}
              genTime={genTime}
              oldHorses={oldHorses}
              disableButtons={false}
            />
          </div>
        );
      } else if (raceTabs === 2) {
        return <Scratchings />;
      } else if (raceTabs === 3) {
        return <Odds />;
      } else if (raceTabs === 4) {
        return (
          <div style={{ padding: 13 }}>
            <Row>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={`/maps/${(trackInfo[0]?.trackcode).toUpperCase()}.png`}
                  className={
                    window.innerWidth < 1224
                      ? "img-thumbnail w-100 w-100"
                      : "img-thumbnail w-50 w-50"
                  }
                  alt="No map for this venue"
                />
              </Col>
            </Row>
            <HorsesTable
              trackInfo={trackInfo}
              horses={horses}
              genTime={genTime}
              oldHorses={oldHorses}
              disableButtons={false}
            />
          </div>
        );
      }
    }

    if (raceTabs === 0) {
      return (
        <HorsesTable
          trackInfo={trackInfo}
          horses={horses}
          genTime={genTime}
          oldHorses={oldHorses}
          disableButtons={false}
        />
      );
    } else if (raceTabs === 1) {
      return (
        <div style={{ padding: 13 }}>
          <SpeedMap />
          <HorsesTable
            trackInfo={trackInfo}
            horses={horses}
            genTime={genTime}
            oldHorses={oldHorses}
            disableButtons={false}
          />
        </div>
      );
    } else if (raceTabs === 2) {
      return <Scratchings />;
    } else if (raceTabs === 3) {
      return <Odds />;
    } else if (raceTabs === 4) {
      return (
        <div style={{ padding: 13 }}>
          <Row>
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={`/maps/${(trackInfo[0]?.trackcode).toUpperCase()}.png`}
                className={
                  window.innerWidth < 1224
                    ? "img-thumbnail w-100 w-100"
                    : "img-thumbnail w-50 w-50"
                }
                alt="No map for this venue"
              />
            </Col>
          </Row>
          <HorsesTable
            trackInfo={trackInfo}
            horses={horses}
            genTime={genTime}
            oldHorses={oldHorses}
            disableButtons={false}
          />
        </div>
      );
    }
  };

  return (
    <div
      className="races"
      style={{
        maxHeight: window.innerWidth > 700 ? "auto" : null,
        // overflowY: "auto",
        height: "auto",
      }}
    >
      <Helmet>
        <title>
          {params.venue +
            " " +
            "Racecourse" +
            " " +
            params.raceNumber +
            " " +
            trackInfo[0]?.track_description +
            " " +
            "| Australia Horse Racing Form Guides and Tips"}
        </title>
        <meta
          name="description"
          content={
            "All details for " +
            params.venue +
            " " +
            "Racecourse" +
            " " +
            params.raceNumber +
            " analysis and PTP tips selection. Result, places, odds, horse information, jockey and trainer are all there. All punters information needed for race analysis are there."
          }
        />
        <link
          rel="canonical"
          href={
            raceTabs === 0
              ? "https://www.ptptips.com.au/horse-racing-tips/" +
                params.date +
                "/" +
                params.venue +
                "/" +
                params.raceNumber +
                "/" +
                params.id +
                "/horse-racing-tips"
              : raceTabs === 1
              ? "https://www.ptptips.com.au/horse-racing-tips/" +
                params.date +
                "/" +
                params.venue +
                "/" +
                params.raceNumber +
                "/" +
                params.id +
                "/speed-map"
              : raceTabs === 2
              ? "https://www.ptptips.com.au/horse-racing-tips/" +
                params.date +
                "/" +
                params.venue +
                "/" +
                params.raceNumber +
                "/" +
                params.id +
                "/scratchings"
              : "https://www.ptptips.com.au/horse-racing-tips/" +
                params.date +
                "/" +
                params.venue +
                "/" +
                params.raceNumber +
                "/" +
                params.id +
                "/odds"
          }
        />
      </Helmet>

      {loading ? (
        <LoadingNew />
      ) : trackInfo[0]?.track_condition === "ABND" || horses.length === 0 ? (
        // <div style={{ textAlign: "center" }}>
        //   <div style={{ marginTop: 32 }}>
        //     <FontAwesomeIcon
        //       icon={faExclamationCircle}
        //       size="4x"
        //       style={{ color: "#44bd32" }}
        //     />
        //     {/* <h4 style={{ marginTop: 16 }}><strong>No Data Available</strong></h4>
        //                     <p style={{ marginTop: -8 }}>Go back to selections</p> */}
        //     <div id="racehead" style={{ marginTop: 5 }}>
        //       <RaceHead raceRating={raceRating} />
        //       <hr id="hr-abnd" />
        //       <h2 style={{ textAlign: "center" }}>
        //         The Race That You Selected Was Abandoned !
        //       </h2>
        //       <div>
        //         <HorsesTable
        //           trackInfo={trackInfo}
        //           horses={horses}
        //           genTime={genTime}
        //           oldHorses={oldHorses}
        //           disableButtons={false}
        //         />
        //       </div>
        //     </div>
        //   </div>
        // </div>
        <>
          <div>
            <div style={{ marginTop: 0 }}>
              <RaceHead raceRating={raceRating} />
            </div>
          </div>

          {trackInfo[0]?.result && (
            <div>
              <Col md={12} style={{ paddingRight: 16 }}>
                <Row>
                  <Col md={7} sm={12} style={{ padding: 4 }}>
                    <Result />
                  </Col>
                  <Col md={5} style={{ margin: "auto", padding: 0 }}>
                    {renderBanner()}
                  </Col>
                </Row>
              </Col>
            </div>
          )}
          {history?.location?.pathname ? (
            <div
              style={{
                marginBottom: -15,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              <h3>
                &nbsp; {history?.location?.pathname?.split("/")[3]} Horse Racing
                Tips For{" "}
                {history?.location?.pathname
                  ?.split("/")[2]
                  .charAt(0)
                  .toUpperCase() +
                  history?.location?.pathname?.split("/")[2].slice(1)}{" "}
              </h3>
            </div>
          ) : (
            <></>
          )}
          <div style={{ marginTop: 0, marginBottom: 15 }}>
            <Tabs
              scrollButtons="auto"
              style={{
                backgroundColor: "white",
                marginTop: 16,
                padding: 0,
                borderBottomLeftRadius: 6,
                borderBottomRightRadius: 6,
              }}
              value={raceTabs}
              onChange={(e, value) => handleTabs(value)}
            >
              <Tab
                style={{ padding: 0 }}
                value={0}
                label={
                  <span style={{ fontFamily: "Poppins" }}>
                    <Star
                      fontSize="16"
                      color={"grey"}
                      style={{ marginTop: -4 }}
                    />
                    <span
                      style={{ marginLeft: 4, marginTop: -4, fontSize: 14 }}
                    >
                      {window.innerWidth > 700 ? "Tips" : null}
                    </span>
                    {raceTabs === 0 && window.innerWidth < 700 ? "Tips" : null}
                  </span>
                }
              />
              <Tab
                style={{ padding: 0 }}
                value={1}
                label={
                  <span style={{ fontFamily: "Poppins" }}>
                    <Options
                      fontSize="16"
                      color={"grey"}
                      style={{ marginTop: -4 }}
                    />
                    <span
                      style={{ marginLeft: 4, marginTop: -4, fontSize: 14 }}
                    >
                      {window.innerWidth > 700 ? "Speed Map" : null}
                    </span>
                    {raceTabs === 1 && window.innerWidth < 700
                      ? "Speed Map"
                      : null}
                  </span>
                }
              />
              {scratchingsCheck()}
              <Tab
                style={{ padding: 0 }}
                value={4}
                label={
                  <span style={{ fontFamily: "Poppins" }}>
                    <MdMap
                      fontSize="16"
                      color={"grey"}
                      style={{ marginTop: -4 }}
                    />
                    <span
                      style={{ marginLeft: 4, marginTop: -4, fontSize: 14 }}
                    >
                      {window.innerWidth > 700 ? "Map" : null}
                    </span>
                    {raceTabs === 4 && window.innerWidth < 700 ? "Map" : null}
                  </span>
                }
              />
              <Tab
                style={{ padding: 0 }}
                value={3}
                label={
                  <span style={{ fontFamily: "Poppins" }}>
                    <Stat
                      fontSize="16"
                      color={"grey"}
                      style={{ marginTop: -4 }}
                    />
                    <span
                      style={{ marginLeft: 4, marginTop: -4, fontSize: 14 }}
                    >
                      {window.innerWidth > 700 ? "odds" : null}
                    </span>
                    {raceTabs === 3 && window.innerWidth < 700 ? "Odds" : null}
                  </span>
                }
              />
            </Tabs>
          </div>

          {renderTabsContent()}
          {history?.location?.pathname ? (
            <div style={{ fontWeight: "bold", textAlign: "center" }}>
              <b>
                <h3>
                  &nbsp; {history?.location?.pathname?.split("/")[3]} Free Horse
                  Racing Tips For{" "}
                  {history?.location?.pathname
                    ?.split("/")[2]
                    .charAt(0)
                    .toUpperCase() +
                    history?.location?.pathname?.split("/")[2].slice(1)}{" "}
                </h3>
              </b>
            </div>
          ) : (
            <></>
          )}
          <br />
          <div style={{ textAlign: "justify" }}>
            {showMore ? (
              <p style={{ display: "inline" }}>
                Want to place a better bet on{" "}
                {history?.location?.pathname
                  ? history?.location?.pathname?.split("/")[3]
                  : null}{" "}
                Australia horse racing? You can get the best free horse racing
                tips for{" "}
                {history?.location?.pathname
                  ? history?.location?.pathname?.split("/")[3]
                  : null}{" "}
                through Past the Post Tips. PTP Tips provides daily data that
                analyses the past performance of each horse against its
                competitors. This is paired with information on the track
                condition, the horse barriers, the jockey, live odds, and more
                to provide you with{" "}
                {history?.location?.pathname
                  ? history?.location?.pathname?.split("/")[3]
                  : null}{" "}
                best free horse racing tips.
                <br />
                <br />
                The PTP Tips team then uses this highly sophisticated selection
                process to provide you with a rating for each horse. Every race
                is sorted from the highest rating to the lowest, with the horse
                with the greatest percentage of winning according to our system
                displayed first.
                <br />
                <br />
                View{" "}
                {history?.location?.pathname
                  ? history?.location?.pathname?.split("/")[3]
                  : null}{" "}
                Free Horse Racing Tips Now.
                <br />
                <br />
                <b>
                  <h4>
                    {history?.location?.pathname
                      ? history?.location?.pathname?.split("/")[3]
                      : null}{" "}
                    Free Horse Racing Tips For{" "}
                    {history?.location?.pathname
                      ? history?.location?.pathname
                          ?.split("/")[2]
                          .charAt(0)
                          .toUpperCase() +
                        history?.location?.pathname?.split("/")[2].slice(1)
                      : null}
                  </h4>
                </b>
                <br />
                <br />
                You can be sure that our{" "}
                {history?.location?.pathname
                  ? history?.location?.pathname?.split("/")[3]
                  : null}{" "}
                Australian horse racing tips for{" "}
                {history?.location?.pathname
                  ? history?.location?.pathname?.split("/")[2]
                  : null}{" "}
                provide you with the most accurate and up-to-date data on every
                horse and every race. Our{" "}
                {history?.location?.pathname
                  ? history?.location?.pathname?.split("/")[3]
                  : null}{" "}
                horse tips for{" "}
                {history?.location?.pathname
                  ? history?.location?.pathname?.split("/")[2]
                  : null}{" "}
                include any late changes such as horse scratching details,
                jockey changes, alterations in track conditions, and anything
                else you need to know.
                <br />
                <br />
                {history?.location?.pathname
                  ? history?.location?.pathname?.split("/")[3]
                  : null}{" "}
                Australia horse racing tips for each day are uploaded between 9
                am and 11 am. While you can also view{" "}
                <a href="/horse-racing-tips/tomorrow">tips for tomorrow</a>,
                daily tips will be updated every morning to ensure you’re
                getting the best possible information.
                <br />
                <br />
                <b>
                  <h4>
                    Get the Best Free{" "}
                    {history?.location?.pathname
                      ? history?.location?.pathname?.split("/")[3]
                      : null}{" "}
                    Horse Racing Tips Every Meeting with Past The Post
                  </h4>
                </b>
                <br />
                <br />
                When it comes to horse racing, you need a little bit of luck and
                a lot of data to work with. At Past The Post Tips, we believe
                you can make a lot of your own luck with the live and accurate
                information that we provide.
                <br />
                <br />
                Our{" "}
                {history?.location?.pathname
                  ? history?.location?.pathname?.split("/")[3]
                  : null}{" "}
                horse racing tips not only provide you with the latest
                information on every{" "}
                {history?.location?.pathname
                  ? history?.location?.pathname?.split("/")[3]
                  : null}{" "}
                horse racing meeting as we also crunch all the data for you and
                provide you with ratings for every horse for every{" "}
                {history?.location?.pathname
                  ? history?.location?.pathname?.split("/")[3]
                  : null}{" "}
                race. The horse with the highest percentage has the best chance
                of winning according to our data.
              </p>
            ) : (
              `${seoText.substring(0, 250)}...`
            )}{" "}
            <p
              style={{
                display: "inline",
                fontWeight: "bolder",
                cursor: "pointer",
              }}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show less" : "Show more"}
            </p>
          </div>
        </>
      ) : (
        <>
          <div>
            <div style={{ marginTop: 0 }}>
              <RaceHead raceRating={raceRating} />
            </div>
          </div>

          {trackInfo[0]?.result && (
            <div>
              <Col md={12} style={{ paddingRight: 16 }}>
                <Row>
                  <Col md={7} sm={12} style={{ padding: 4 }}>
                    <Result />
                  </Col>
                  <Col md={5} style={{ margin: "auto", padding: 0 }}>
                    {renderBanner()}
                  </Col>
                </Row>
              </Col>
            </div>
          )}

          {history?.location?.pathname ? (
            <div
              style={{
                marginBottom: -15,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              <h3>
                &nbsp; {history?.location?.pathname?.split("/")[3]} Horse Racing
                Tips For{" "}
                {history?.location?.pathname
                  ?.split("/")[2]
                  .charAt(0)
                  .toUpperCase() +
                  history?.location?.pathname?.split("/")[2].slice(1)}{" "}
              </h3>
            </div>
          ) : (
            <></>
          )}
          <div style={{ marginTop: 0, marginBottom: 15 }}>
            <Tabs
              scrollButtons="auto"
              style={{
                backgroundColor: "white",
                marginTop: 16,
                padding: 0,
                borderBottomLeftRadius: 6,
                borderBottomRightRadius: 6,
              }}
              value={raceTabs}
              onChange={(e, value) => handleTabs(value)}
            >
              <Tab
                style={{ padding: 0 }}
                value={0}
                label={
                  <span style={{ fontFamily: "Poppins" }}>
                    <Star
                      fontSize="16"
                      color={"grey"}
                      style={{ marginTop: -4 }}
                    />
                    <span
                      style={{ marginLeft: 4, marginTop: -4, fontSize: 14 }}
                    >
                      {window.innerWidth > 700 ? "Tips" : null}
                    </span>
                    {raceTabs === 0 && window.innerWidth < 700 ? "Tips" : null}
                  </span>
                }
              />
              <Tab
                style={{ padding: 0 }}
                value={1}
                label={
                  <span style={{ fontFamily: "Poppins" }}>
                    <Options
                      fontSize="16"
                      color={"grey"}
                      style={{ marginTop: -4 }}
                    />
                    <span
                      style={{ marginLeft: 4, marginTop: -4, fontSize: 14 }}
                    >
                      {window.innerWidth > 700 ? "Speed Map" : null}
                    </span>
                    {raceTabs === 1 && window.innerWidth < 700
                      ? "Speed Map"
                      : null}
                  </span>
                }
              />
              {scratchingsCheck()}
              <Tab
                style={{ padding: 0 }}
                value={4}
                label={
                  <span style={{ fontFamily: "Poppins" }}>
                    <MdMap
                      fontSize="16"
                      color={"grey"}
                      style={{ marginTop: -4 }}
                    />
                    <span
                      style={{ marginLeft: 4, marginTop: -4, fontSize: 14 }}
                    >
                      {window.innerWidth > 700 ? "Map" : null}
                    </span>
                    {raceTabs === 4 && window.innerWidth < 700 ? "Map" : null}
                  </span>
                }
              />
              <Tab
                style={{ padding: 0 }}
                value={3}
                label={
                  <span style={{ fontFamily: "Poppins" }}>
                    <Stat
                      fontSize="16"
                      color={"grey"}
                      style={{ marginTop: -4 }}
                    />
                    <span
                      style={{ marginLeft: 4, marginTop: -4, fontSize: 14 }}
                    >
                      {window.innerWidth > 700 ? "odds" : null}
                    </span>
                    {raceTabs === 3 && window.innerWidth < 700 ? "Odds" : null}
                  </span>
                }
              />
            </Tabs>
          </div>

          {renderTabsContent()}
          {history?.location?.pathname ? (
            <div style={{ fontWeight: "bold", textAlign: "center" }}>
              <b>
                <h3>
                  &nbsp; {history?.location?.pathname?.split("/")[3]} Free Horse
                  Racing Tips For{" "}
                  {history?.location?.pathname
                    ?.split("/")[2]
                    .charAt(0)
                    .toUpperCase() +
                    history?.location?.pathname?.split("/")[2].slice(1)}{" "}
                </h3>
              </b>
            </div>
          ) : (
            <></>
          )}
          <br />
          <div style={{ textAlign: "justify" }}>
            {showMore ? (
              <p style={{ display: "inline" }}>
                Want to place a better bet on{" "}
                {history?.location?.pathname
                  ? history?.location?.pathname?.split("/")[3]
                  : null}{" "}
                Australia horse racing? You can get the best free horse racing
                tips for{" "}
                {history?.location?.pathname
                  ? history?.location?.pathname?.split("/")[3]
                  : null}{" "}
                through Past the Post Tips. PTP Tips provides daily data that
                analyses the past performance of each horse against its
                competitors. This is paired with information on the track
                condition, the horse barriers, the jockey, live odds, and more
                to provide you with{" "}
                {history?.location?.pathname
                  ? history?.location?.pathname?.split("/")[3]
                  : null}{" "}
                best free horse racing tips.
                <br />
                <br />
                The PTP Tips team then uses this highly sophisticated selection
                process to provide you with a rating for each horse. Every race
                is sorted from the highest rating to the lowest, with the horse
                with the greatest percentage of winning according to our system
                displayed first.
                <br />
                <br />
                View{" "}
                {history?.location?.pathname
                  ? history?.location?.pathname?.split("/")[3]
                  : null}{" "}
                Free Horse Racing Tips Now.
                <br />
                <br />
                <b>
                  <h4>
                    {history?.location?.pathname
                      ? history?.location?.pathname?.split("/")[3]
                      : null}{" "}
                    Free Horse Racing Tips For{" "}
                    {history?.location?.pathname
                      ? history?.location?.pathname
                          ?.split("/")[2]
                          .charAt(0)
                          .toUpperCase() +
                        history?.location?.pathname?.split("/")[2].slice(1)
                      : null}
                  </h4>
                </b>
                <br />
                <br />
                You can be sure that our{" "}
                {history?.location?.pathname
                  ? history?.location?.pathname?.split("/")[3]
                  : null}{" "}
                Australian horse racing tips for{" "}
                {history?.location?.pathname
                  ? history?.location?.pathname?.split("/")[2]
                  : null}{" "}
                provide you with the most accurate and up-to-date data on every
                horse and every race. Our{" "}
                {history?.location?.pathname
                  ? history?.location?.pathname?.split("/")[3]
                  : null}{" "}
                horse tips for{" "}
                {history?.location?.pathname
                  ? history?.location?.pathname?.split("/")[2]
                  : null}{" "}
                include any late changes such as horse scratching details,
                jockey changes, alterations in track conditions, and anything
                else you need to know.
                <br />
                <br />
                {history?.location?.pathname
                  ? history?.location?.pathname?.split("/")[3]
                  : null}{" "}
                Australia horse racing tips for each day are uploaded between 9
                am and 11 am. While you can also view{" "}
                <a href="/horse-racing-tips/tomorrow">tips for tomorrow</a>,
                daily tips will be updated every morning to ensure you’re
                getting the best possible information.
                <br />
                <br />
                <b>
                  <h4>
                    Get the Best Free{" "}
                    {history?.location?.pathname
                      ? history?.location?.pathname?.split("/")[3]
                      : null}{" "}
                    Horse Racing Tips Every Meeting with Past The Post
                  </h4>
                </b>
                <br />
                <br />
                When it comes to horse racing, you need a little bit of luck and
                a lot of data to work with. At Past The Post Tips, we believe
                you can make a lot of your own luck with the live and accurate
                information that we provide.
                <br />
                <br />
                Our{" "}
                {history?.location?.pathname
                  ? history?.location?.pathname?.split("/")[3]
                  : null}{" "}
                horse racing tips not only provide you with the latest
                information on every{" "}
                {history?.location?.pathname
                  ? history?.location?.pathname?.split("/")[3]
                  : null}{" "}
                horse racing meeting as we also crunch all the data for you and
                provide you with ratings for every horse for every{" "}
                {history?.location?.pathname
                  ? history?.location?.pathname?.split("/")[3]
                  : null}{" "}
                race. The horse with the highest percentage has the best chance
                of winning according to our data.
              </p>
            ) : (
              `${seoText.substring(0, 250)}...`
            )}{" "}
            <p
              style={{
                display: "inline",
                fontWeight: "bolder",
                cursor: "pointer",
              }}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show less" : "Show more"}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  trackInfo: state.raceReducer.trackInfoOpt,
  raceTabs: state.raceReducer.raceTabs,
  loading: state.raceReducer.loading,
  horses: state.raceReducer.horsesOpt,
  oldHorses: state.raceReducer.oldHorsesOpt,
  genTime: state.raceReducer?.generationTime,
  isLoggedIn: state.auth.isLoggedIn,
  subscription: state.auth.subscription,
  dailyPerformance: state.resultsReducer.daily_results,
});

const mapDispatchToProps = (dispatch) => ({
  changeTab: (num) => dispatch(raceAction.changeTab(num)),
  headerLogoChange: (data) => dispatch(headerLogoChange(data)),
  getRaceInfoOpt: (data, bool, int) =>
    dispatch(raceAction.getRaceInfoOpt(data, bool, int)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Races));
