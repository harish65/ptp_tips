import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import moment from "moment-timezone";
import { Row, Col, Table, Button } from "reactstrap";

import LoadingNew from "../../components/loading/LoadingNew";
/* REDUX */
import profileAction from "../../redux/actions/profiles";
import ExpandableCard from "./components/ExpandableCard";
import Badge from "reactstrap/lib/Badge";
import Loading from "../../components/loading/LoadingNew";
import Helmet from "react-helmet";

import PhoneIcon from "react-ionicons/lib/IosCall";
import MobileIcon from "react-ionicons/lib/MdPhonePortrait";
import LocateIcon from "react-ionicons/lib/MdLocate";
import WebIcon from "react-ionicons/lib/MdGlobe";

import PaperPlane from "react-ionicons/lib/IosPaperPlane";
import Tooltip from "@material-ui/core/Tooltip";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Lightbox from "react-image-lightbox";

import "./components/venues/venues.scoped.scss";
import "react-image-lightbox/style.css";
import { checkRouteDate } from "../../config/utils";

const VenueProfile = (props) => {
  const [section, setSection] = useState(0);
  const [imageOpen, setImageOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    props.dispatch(
      profileAction.getProfileVenue({ trackCode: props.match.params.trackCode})
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.trackCode]);

  // const openFax = () => {
  //   setFaxToolTip(!faxToolTip);
  // };

  const changeSection = (val) => {
    setSection(val);
  };

  const renderTabs = () => {
    if (section === 0) {
      let sortedHorses = props?.venueProfile?.best_performing_horse?.sort(
        (a, b) => ((a.won / a.runs) * 100 > (b.won / b.runs) * 100 ? -1 : 1)
      );
      let sortedJockeys = props?.venueProfile?.best_performing_jockey?.sort(
        (a, b) => ((a.won / a.runs) * 100 > (b.won / b.runs) * 100 ? -1 : 1)
      );
      let sortedVenues = props?.venueProfile?.data?.sort((a, b) =>
        (a.won / a.runs) * 100 > (b.won / b.runs) * 100 ? -1 : 1
      );

      return (
        <Row style={{ margin: 0, marginTop: 24, padding: 0 }}>
          <Col xs={12} style={{ padding: 0 }}>
            {window.innerWidth < 1000 && (
              <img
                alt=""
                src={`/maps/${props.match.params.trackCode}.png`}
                style={{ width: "100%" }}
              />
            )}

            <h2
              style={{
                marginTop: 16,
                marginLeft: window.innerWidth > 1000 ? 16 : 0,
              }}
            >
              Best Performing Horses
            </h2>
            {window.innerWidth < 1000 ? (
              <div style={styles.mobileSlider}>
                {sortedHorses?.map((index, i) => {
                  return (
                    <Col
                      key={i}
                      xs={9}
                      sm={6}
                      md={4}
                      lg={2}
                      style={{
                        backgroundColor: "white",
                        borderRadius: 10,
                        marginRight: 16,
                        padding: 0,
                        paddingTop: 8,
                        paddingBottom: 8,
                      }}
                    >
                      <Col
                        lg={12}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          padding: 0,
                        }}
                      >
                      {(index?.horse_id && index?.horse_name) ?  <Link
                             style={{ textDecoration: "underline" , color : "black"}}
                        to={`/profile/horse/${index?.horse_id}/${index?.horse_name.split(" ").join("-")}`}
                        >
                        <Col
                          lg={6}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            flexDirection: "column",
                            padding: 0,
                            marginLeft: 8,
                          }}
                        >
                          <strong>{index?.horse_name}</strong>
                        </Col></Link> :  <Col
                          lg={6}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            flexDirection: "column",
                            padding: 0,
                            marginLeft: 8,
                          }}
                        >
                          <strong>{index?.horse_name}</strong>
                        </Col>}

                        <Col
                          lg={6}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            justifyContent: "flex-end",
                            padding: 0,
                            marginRight: 8,
                          }}
                        >
                          <Badge
                            style={{
                              backgroundColor: "#44bd32",
                              color: "white",
                            }}
                          >
                            {" "}
                            <strong>{index.runs}</strong> <span>Runs</span>
                          </Badge>
                        </Col>
                      </Col>

                      <Col
                        xs={12}
                        md={12}
                        lg={12}
                        style={{
                          width: "100%",
                          marginTop: 12,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Row>
                          <Col style={styles.selectionRateCol}>
                            <div style={styles.selectionRateValueContainer}>
                              <strong style={{ fontSize: 16 }}>
                                {index?.won}
                              </strong>
                              <span style={{ marginTop: -4, fontSize: 11 }}>
                                WIN
                              </span>
                            </div>
                            <div style={styles.selectionRateValueContainer}>
                              <strong style={{ fontSize: 16 }}>
                                {index?.place}
                              </strong>
                              <span style={{ marginTop: -4, fontSize: 11 }}>
                                PLACE
                              </span>
                            </div>
                          </Col>

                          <Col style={styles.selectionRateCol}>
                            <div style={styles.selectionRateValueContainer}>
                              <strong style={{ fontSize: 16 }}>
                                {((index?.won / index?.runs) * 100)?.toFixed(
                                  2
                                ) + "%"}
                              </strong>
                              <span style={{ marginTop: -4, fontSize: 11 }}>
                                WIN%
                              </span>
                            </div>
                            <div style={styles.selectionRateValueContainer}>
                              <strong style={{ fontSize: 16 }}>
                                {((index?.place / index?.runs) * 100)?.toFixed(
                                  2
                                ) + "%"}
                              </strong>
                              <span style={{ marginTop: -4, fontSize: 11 }}>
                                PLACE%
                              </span>
                            </div>
                          </Col>

                          <Col style={styles.selectionRateCol}>
                            <div style={styles.selectionRateValueContainer}>
                              <strong style={{ fontSize: 16 }}>
                                {index.winOdd?.toFixed(2)}
                              </strong>
                              <span style={{ marginTop: -4, fontSize: 11 }}>
                                WIN$
                              </span>
                            </div>
                            <div style={styles.selectionRateValueContainer}>
                              <strong style={{ fontSize: 16 }}>
                                {index.placeOdd?.toFixed(2)}
                              </strong>
                              <span style={{ marginTop: -4, fontSize: 11 }}>
                                PLACE$
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Col>
                  );
                })}
              </div>
            ) : (
              <Table striped responsive style={{ marginTop: 16, width: "70%" }}>
                <thead
                  style={{
                    backgroundColor: "#142841",
                    color: "white",
                    textAlign: "center",
                    width: "34%",
                  }}
                >
                  <tr>
                    <th>Horse</th>
                    <th>Runs</th>
                    <th>Win</th>
                    <th>WIN%</th>
                    <th>AVG$</th>
                    <th>PLC</th>
                    <th>PLC%</th>
                    <th>AVG$</th>
                  </tr>
                </thead>

                <tbody
                  style={{ textAlign: "center", backgroundColor: "white" }}
                >
                  {sortedHorses?.map((index, i) => {
                    return (
                      <tr key={i}>
                        <td>{(index?.horse_id && index?.horse_name) ? <Link 
                      style={{ textDecoration: "underline" , color : "black"}}
                        to={`/profile/horse/${index?.horse_id}/${index?.horse_name.split(" ").join("-")}`}
                        >{index?.horse_name}</Link> : <>{index?.horse_name}</>}</td>
                        <td>{index?.runs}</td>
                        <td>{index?.won}</td>
                        <td>
                          {((index?.won / index?.runs) * 100)?.toFixed(2)}
                        </td>
                        <td>{index.winOdd?.toFixed(2)}</td>
                        <td>{index?.place}</td>
                        <td>
                          {((index?.place / index?.runs) * 100)?.toFixed(2)}
                        </td>
                        <td>{index.placeOdd?.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </Col>
          <Col xs={12} style={{ padding: 0 }}>
            <h2
              style={{
                marginTop: 16,
                marginLeft: window.innerWidth > 1000 ? 16 : 0,
              }}
            >
              Best Performing Jockeys
            </h2>
            {window.innerWidth < 1000 ? (
              <div style={styles.mobileSlider}>
                {sortedJockeys?.map((index, i) => {
                  return (
                    <Col
                      key={i}
                      xs={9}
                      sm={6}
                      md={4}
                      lg={2}
                      style={{
                        backgroundColor: "white",
                        borderRadius: 10,
                        marginRight: 16,
                        padding: 0,
                        paddingTop: 8,
                        paddingBottom: 8,
                      }}
                    >
                      <Col
                        lg={12}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          padding: 0,
                        }}
                      >
                          {(index?.jockey_id && index?.horse_jockey) ?  <Link
                             style={{ textDecoration: "underline" , color : "black"}}
                        to={`/profile/jockey/${index?.jockey_id}/${index?.horse_jockey.split(" ").join("-")}`}
                        ><Col
                          lg={6}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            flexDirection: "column",
                            padding: 0,
                            marginLeft: 8,
                          }}
                        >
                          <strong>{index?.horse_jockey}</strong>
                        </Col></Link> : <Col
                          lg={6}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            flexDirection: "column",
                            padding: 0,
                            marginLeft: 8,
                          }}
                        >
                          <strong>{index?.horse_jockey}</strong>
                        </Col>}

                        <Col
                          lg={6}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            justifyContent: "flex-end",
                            padding: 0,
                            marginRight: 8,
                          }}
                        >
                          <Badge
                            style={{
                              backgroundColor: "#44bd32",
                              color: "white",
                            }}
                          >
                            {" "}
                            <strong>{index.runs}</strong> <span>Runs</span>
                          </Badge>
                        </Col>
                      </Col>

                      <Col
                        xs={12}
                        md={12}
                        lg={12}
                        style={{
                          width: "100%",
                          marginTop: 12,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Row>
                          <Col style={styles.selectionRateCol}>
                            <div style={styles.selectionRateValueContainer}>
                              <strong style={{ fontSize: 16 }}>
                                {index?.won}
                              </strong>
                              <span style={{ marginTop: -4, fontSize: 11 }}>
                                WIN
                              </span>
                            </div>
                            <div style={styles.selectionRateValueContainer}>
                              <strong style={{ fontSize: 16 }}>
                                {index?.place}
                              </strong>
                              <span style={{ marginTop: -4, fontSize: 11 }}>
                                PLACE
                              </span>
                            </div>
                          </Col>

                          <Col style={styles.selectionRateCol}>
                            <div style={styles.selectionRateValueContainer}>
                              <strong style={{ fontSize: 16 }}>
                                {((index?.won / index?.runs) * 100)?.toFixed(
                                  2
                                ) + "%"}
                              </strong>
                              <span style={{ marginTop: -4, fontSize: 11 }}>
                                WIN%
                              </span>
                            </div>
                            <div style={styles.selectionRateValueContainer}>
                              <strong style={{ fontSize: 16 }}>
                                {((index?.place / index?.runs) * 100)?.toFixed(
                                  2
                                ) + "%"}
                              </strong>
                              <span style={{ marginTop: -4, fontSize: 11 }}>
                                PLACE%
                              </span>
                            </div>
                          </Col>

                          <Col style={styles.selectionRateCol}>
                            <div style={styles.selectionRateValueContainer}>
                              <strong style={{ fontSize: 16 }}>
                                {index.winOdd?.toFixed(2)}
                              </strong>
                              <span style={{ marginTop: -4, fontSize: 11 }}>
                                WIN$
                              </span>
                            </div>
                            <div style={styles.selectionRateValueContainer}>
                              <strong style={{ fontSize: 16 }}>
                                {index.placeOdd?.toFixed(2)}
                              </strong>
                              <span style={{ marginTop: -4, fontSize: 11 }}>
                                PLACE$
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </Col>


                            {/* <Table striped responsive style={{ marginTop: 16, width: '70%' }}>
                                <thead style={{ backgroundColor: "#142841", color: 'white', textAlign: 'center', width: '34%' }}>
                                    <tr style={{ padding: 0 }}>
                                        <th>Venue</th>
                                        <th>Runs</th>
                                        <th>Win</th>
                                        <th>WIN%</th>
                                        <th >AVG$</th>
                                        <th>PLC</th>
                                        <th>PLC%</th>
                                        <th>AVG$</th>
                                    </tr>
                                </thead>

                                <tbody style={{ textAlign: 'center', backgroundColor: 'white' }}>
                                    {sortedJockeys?.map((index, i) => {
                                        return (
                                            <tr key={i} style={{ padding: 0 }}>
                                                <td>
                                                    {index?.horse_jockey}
                                                </td>
                                                <td>
                                                    {index?.runs}
                                                </td>
                                                <td>
                                                    {index?.won}
                                                </td>
                                                <td>
                                                    {((index?.won / index?.runs) * 100)?.toFixed(2)}
                                                </td>
                                                <td>
                                                    {index.winOdd?.toFixed(2)}
                                                </td>
                                                <td>
                                                    {index?.place}
                                                </td>
                                                <td>
                                                    {((index?.place / index?.runs) * 100)?.toFixed(2)}
                                                </td>
                                                <td>
                                                    {index.placeOdd?.toFixed(2)}
                                                </td>

                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </Table> */}


                        {/* <h2 style={{ marginTop: 16, marginLeft: window.innerWidth > 1000 ? 16 : 0 }}>PTP Results</h2>
                        {
                            window.innerWidth < 1000 ?
                                <div style={styles.mobileSlider}>
                                    {sortedVenues?.map((zone, i) => {
                                        return (
                                            <ExpandableCard stats={zone} key={i} />
                                        )
                                    })}
                                </div>

                                :

                                <Table striped responsive style={{ marginTop: 16, width: '70%',overflowX:"auto" }}>
                                    <thead style={{ backgroundColor: "#142841", color: 'white', textAlign: 'center', width: '34%' }}>
                                        <tr>
                                            <th>Date</th>
                                            <th>Runs</th>
                                            <th>Win</th>
                                            <th>WIN%</th>
                                            <th>AVG$</th>
                                            <th>PLC</th>
                                            <th>PLC%</th>
                                            <th>AVG$</th>
                                        </tr>
                                    </thead>

                                    <tbody style={{ textAlign: 'center', backgroundColor: 'white' }}>
                                        {sortedVenues?.map((index, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>
                                                        {moment(index?.meetdate)?.format('DD-MM-YYYY')}
                                                    </td>
                                                    <td>
                                                        {index?.runs}
                                                    </td>
                                                    <td>
                                                        {index?.won}
                                                    </td>
                                                    <td>
                                                        {((index?.won / index?.runs) * 100)?.toFixed(2)}
                                                    </td>
                                                    <td>
                                                        {index.winOdd?.toFixed(2)}
                                                    </td>
                                                    <td>
                                                        {index?.place}
                                                    </td>
                                                    <td>
                                                        {((index?.place / index?.runs) * 100)?.toFixed(2)}
                                                    </td>
                                                    <td>
                                                        {index.placeOdd?.toFixed(2)}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        }
                                    </tbody>
                                </Table>
                        } */}

                    </Col>
                  );
                })}
              </div>
            ) : (
              <Table striped responsive style={{ marginTop: 16, width: "70%" }}>
                <thead
                  style={{
                    backgroundColor: "#142841",
                    color: "white",
                    textAlign: "center",
                    width: "34%",
                  }}
                >
                  <tr style={{ padding: 0 }}>
                    <th>Venue</th>
                    <th>Runs</th>
                    <th>Win</th>
                    <th>WIN%</th>
                    <th>AVG$</th>
                    <th>PLC</th>
                    <th>PLC%</th>
                    <th>AVG$</th>
                  </tr>
                </thead>

                <tbody
                  style={{ textAlign: "center", backgroundColor: "white" }}
                >
                  {sortedJockeys?.map((index, i) => {
                    return (
                      <tr key={i} style={{ padding: 0 }}>
                      <td> {(index?.jockey_id && index?.horse_jockey) ? <Link 
                      style={{ textDecoration: "underline" , color : "black"}}
                        to={`/profile/jockey/${index?.jockey_id}/${index?.horse_jockey.split(" ").join("-")}`}
                        >{index?.horse_jockey}</Link> : <>{index?.horse_jockey}</>}</td>
                        <td>{index?.runs}</td>
                        <td>{index?.won}</td>
                        <td>
                          {((index?.won / index?.runs) * 100)?.toFixed(2)}
                        </td>
                        <td>{index.winOdd?.toFixed(2)}</td>
                        <td>{index?.place}</td>
                        <td>
                          {((index?.place / index?.runs) * 100)?.toFixed(2)}
                        </td>
                        <td>{index.placeOdd?.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
            <h2
              style={{
                marginTop: 16,
                marginLeft: window.innerWidth > 1000 ? 16 : 0,
              }}
            >
              PTP Results
            </h2>
            {window.innerWidth < 1000 ? (
              <div style={styles.mobileSlider}>
                {sortedVenues?.map((zone, i) => {
                  return <ExpandableCard stats={zone} key={i} />;
                })}
              </div>
            ) : (
              <Table striped responsive style={{ marginTop: 16, width: "70%" }}>
                <thead
                  style={{
                    backgroundColor: "#142841",
                    color: "white",
                    textAlign: "center",
                    width: "34%",
                  }}
                >
                  <tr>
                    <th>Date</th>
                    <th>Runs</th>
                    <th>Win</th>
                    <th>WIN%</th>
                    <th>AVG$</th>
                    <th>PLC</th>
                    <th>PLC%</th>
                    <th>AVG$</th>
                  </tr>
                </thead>

                <tbody
                  style={{ textAlign: "center", backgroundColor: "white" }}
                >
                  {sortedVenues?.map((index, i) => {
                    return (
                      <tr key={i}>
                        <td>{moment(index?.meetdate)?.format("DD-MM-YYYY")}</td>
                        <td>{index?.runs}</td>
                        <td>{index?.won}</td>
                        <td>
                          {((index?.won / index?.runs) * 100)?.toFixed(2)}
                        </td>
                        <td>{index.winOdd?.toFixed(2)}</td>
                        <td>{index?.place}</td>
                        <td>
                          {((index?.place / index?.runs) * 100)?.toFixed(2)}
                        </td>
                        <td>{index.placeOdd?.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      );
    }
    // else if (section === 1) {
    //     // if (props.venueProfile?.data?.length > 0) {
    //     //     return (
    //     //         <div style={styles.mobileSlider}>
    //     //         {props.venueProfile?.data?.map((zone, i) => {
    //     //             return(
    //     //                 <ExpandableCard stats={zone} key={i}/>
    //     //             )
    //     //         })}
    //     //         </div>
    //     //     )
    //     // }
    // }
    else if (section === 1) {
      return (
        <div style={{ marginTop: 24 }}>
          <Table bordered>
            <thead
              style={{ backgroundColor: "rgb(20, 40, 65)", color: "white" }}
            >
              <tr>
                <th style={{ borderColor: "rgb(20, 40, 65)" }}>Distance</th>
                <th style={{ borderColor: "rgb(20, 40, 65)" }}>First Run</th>
                <th style={{ borderColor: "rgb(20, 40, 65)" }}>Comment</th>
              </tr>
            </thead>

            <tbody>
              {props.venueProfile?.venue_comment?.map((element, i) => {
                return (
                  <tr
                    key={i}
                    style={{ backgroundColor: i % 2 === 0 ? "white" : null }}
                  >
                    <td>{element?.distance}</td>
                    <td>{element?.first_turn}</td>
                    <td>{element?.race_comment}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      );
    } else if (section === 2) {
      const sorted = props.venueProfile?.venue_rail_position.sort(sortByDate);

      return (
        <div style={{ marginTop: 24 }}>
          <Table bordered>
            <thead
              style={{ backgroundColor: "rgb(20, 40, 65)", color: "white" }}
            >
              <tr>
                <th style={{ borderColor: "rgb(20, 40, 65)" }}>Date</th>
                <th style={{ borderColor: "rgb(20, 40, 65)" }}>
                  Rail Position
                </th>
              </tr>
            </thead>

            <tbody>
              {sorted.map((element, i) => {
                return (
                  <tr
                    key={i}
                    style={{ backgroundColor: i % 2 === 0 ? "white" : null }}
                  >
                    <td>{moment(element?.vrp_date).format("DD-MM-YYYY")}</td>
                    <td>{element?.rail_pos}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      );
    }
  };

  const sortByDate = (a, b) => {
    if (a.vrp_date < b.vrp_date) {
      return 1;
    }
    if (a.vrp_date > b.vrp_date) {
      return -1;
    }
    return 0;
  };
 
  // console.log("venue profile", props.venueProfile);
  if (props.loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 48,
        }}
      >
        <Loading />
      </div>
    );
  } else {
    return (
      <div style={{ marginTop: 16, padding: 8 }}>
        <Helmet>
          <title>Australian Horse Racing Racecourse |
            {`${props.venueProfile?.venue_info?.venue_fullName}`} Profile | Stats | Results
          </title>
          <meta charSet="utf-8" name="author" content="PTP Tips" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            charSet="utf-8"
            name="keywords"
            content="PTP Tips , track condition , location , length , distance , class , rail position , market , day , date , closed at , starters , Best Performing Horses , Best Performing Jockeys , Upcoming Races , stats "
          />
          <meta
            charSet="utf-8"
            name="description"
            content={`${props.venueProfile?.venue_info?.venue_fullName} Venue Profile. Every stat, every win you need to know about the venue.`}
          />
          <link
            rel="canonical"
            href={`https://www.ptptips.com.au/profile/venue/${props.match.params.trackCode}`}
          />
        </Helmet>

        {props.loading === true ? (
          <LoadingNew />
        ) : (
          <Row style={{ padding: 0, margin: 0 }}>
            {window.innerWidth > 1000 && (
              <Col lg={3}>
                <img
                  alt=""
                  src={`/maps/${props.match.params.trackCode.toUpperCase()}.png`}
                  style={{ width: "100%", cursor: "pointer" }}
                  onClick={() => setImageOpen(true)}
                />
                <Tabs
                  orientation="vertical"
                  value={section}
                  onChange={(event, value) => changeSection(value)}
                  aria-label="simple tabs example"
                >
                  <Tab label="Stats" />
                  {/* <Tab label="History" /> */}
                  {/* <Tab label="Comments" /> */}
                  <Tab label="Rail Position" />
                </Tabs>
              </Col>
            )}

            <Col
              style={{
                padding: 0,
                maxHeight:
                  window.innerWidth > 1000 ? window.innerHeight / 1.01 : null,
                overflowY: window.innerWidth > 1000 ? "scroll" : null,
              }}
            >
              <h1 style={{ fontWeight: "bold", textTransform: "uppercase" }}>
                {props.venueProfile?.venue_info?.venue_fullName} (
                {props.venueProfile?.venue_info?.venue_state})
              </h1>

              <Col style={{ padding: 0 }}>
                <Col xs={12} style={{ padding: 0 }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      alt=""
                      style={{ opacity: "64%" }}
                      src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_location_on_48px-256.png"
                      width="17px"
                      height="17px"
                    />
                    <p style={{ fontSize: 18, marginLeft: 3 }}>
                      {props.venueProfile?.venue_info?.venue_location}
                    </p>
                  </div>
                  {props.venueProfile?.venue_info?.venue_contact_website && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: 8,
                      }}
                    >
                      <WebIcon
                        className="action-icon"
                        fontSize="18"
                        color="grey"
                      />
                      <a
                        rel="noreferrer"
                        href={`http://${props.venueProfile?.venue_info?.venue_contact_website}`}
                        target="_blank"
                      >
                        <p
                          style={{
                            fontSize: 18,
                            marginLeft: 3,
                            fontVariant: "small-caps",
                          }}
                        >
                          {props.venueProfile?.venue_info?.venue_contact_website?.split(
                            "."
                          )[1] +
                            "." +
                            props.venueProfile?.venue_info?.venue_contact_website?.split(
                              "."
                            )[2]}
                        </p>
                      </a>
                    </div>
                  )}
                </Col>

                <Col
                  xs={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: 0,
                    marginTop: 24,
                  }}
                >
                  {props.venueProfile?.venue_info?.venue_contact_phone !==
                    "" && (
                    <a
                      href={`tel:${props.venueProfile?.venue_info?.venue_contact_phone}`}
                    >
                      <Button
                        className="action-button"
                        color="default"
                        style={{ display: "flex", color: "grey" }}
                      >
                        <PhoneIcon
                          className="action-icon"
                          fontSize="18"
                          color="grey"
                        />
                        <strong
                          className="action-label"
                          style={{ marginLeft: 4 }}
                        >
                          Call Phone
                        </strong>
                      </Button>
                    </a>
                  )}

                  {props.venueProfile?.venue_info?.venue_contact_mobile !==
                    "" && (
                    <a
                      href={`tel:${props.venueProfile?.venue_info?.venue_contact_mobile}`}
                    >
                      <Button
                        className="action-button"
                        color="default"
                        style={{
                          display: "flex",
                          marginLeft: 16,
                          color: "grey",
                        }}
                      >
                        <MobileIcon
                          className="action-icon"
                          fontSize="18"
                          color="grey"
                        />
                        <strong
                          className="action-label"
                          style={{ marginLeft: 4 }}
                        >
                          Call Mobile
                        </strong>
                      </Button>
                    </a>
                  )}

                  {props.venueProfile?.venue_info?.venue_map_link && (
                    <a
                      href={props.venueProfile?.venue_info?.venue_map_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button
                        className="action-button"
                        color="default"
                        style={{
                          display: "flex",
                          marginLeft: 16,
                          color: "grey",
                        }}
                      >
                        <LocateIcon
                          className="action-icon"
                          fontSize="18"
                          color="grey"
                        />
                        <strong
                          className="action-label"
                          style={{ marginLeft: 4 }}
                        >
                          View Map
                        </strong>
                      </Button>
                    </a>
                  )}

                  {props.venueProfile?.venue_info?.venue_contact_fax !== "" && (
                    <Tooltip
                      title={
                        <p style={{ fontSize: 14 }}>
                          {props.venueProfile?.venue_info?.venue_contact_fax}
                        </p>
                      }
                      interactive
                    >
                      <Button
                        className="action-button"
                        color="default"
                        style={{
                          display: "flex",
                          marginLeft: 16,
                          color: "grey",
                        }}
                      >
                        <PaperPlane
                          className="action-icon"
                          fontSize="18"
                          color="grey"
                        />
                        <strong
                          className="action-label"
                          style={{ marginLeft: 4 }}
                        >
                          FAX
                        </strong>
                      </Button>
                    </Tooltip>
                  )}
                </Col>
              </Col>
              {window.innerWidth < 1000 ? (
                <Tabs
                  value={section}
                  onChange={(event, value) => changeSection(value)}
                  aria-label="simple tabs example"
                >
                  <Tab label="Stats" />
                  {/* <Tab label="History" /> */}
                  <Tab label="Comments" />
                  <Tab label="Rail Position" />
                </Tabs>
              ) : null}
              {renderTabs()}

              <h2>Upcoming Races</h2>
              <div style={{ display: "flex", overflowX: "scroll", padding: 8 }}>
                {props.venueProfile?.upcoming_races ? (
                  props.venueProfile?.upcoming_races?.map((element, i) => {
                    return (
                      <Link
                        key={i}
                        to={`/horse-racing-tips/${checkRouteDate(moment(element.meetdate).tz('Australia/Sydney').format('DD-MM-YYYY'))}/${element?.track_name}/R${element?.race_num}/${element?.point_id}`}
                        style={{ marginLeft: i !== 0 ? 24 : null }}
                      >
                        <div
                          key={i}
                          style={{
                            marginTop: 12,
                            backgroundColor: "white",
                            padding: 8,
                            borderRadius: 4,
                            minWidth: 232,
                          }}
                        >
                          {/* <Badge>{moment(element?.meetdate).format('DD-MM-YYYY')} at {element?.race_time.split(':')[0]}:{element?.race_time.split(':')[1]}</Badge> */}
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Badge>
                              {moment(element?.meetdate).format("DD-MM-YYYY")}
                            </Badge>
                            <p style={{ marginLeft: 4, color: "grey" }}>
                              at {element?.race_time?.split(":")[0]}:
                              {element?.race_time?.split(":")[1]}
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              justifyContent: "flex-start",
                              flexDirection: "column",
                              marginTop: 8,
                            }}
                          >
                            <h3 style={{ color: "black", fontWeight: "bold" }}>
                              {element?.track_name} R{element?.race_num}
                            </h3>
                            <p>{element?.track_description}</p>
                            {/* <p>{moment(element?.meetdate).format('DD-MM-YYYY')} at {element?.race_time.split(':')[0]}:{element?.race_time.split(':')[1]}</p> */}
                          </div>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <p style={{ marginTop: 24, opacity: "50%" }}>
                    No Upcoming races
                  </p>
                )}
              </div>
            </Col>

            {imageOpen && (
              <Lightbox
                mainSrc={`/maps/${props.match.params.trackCode}.png`}
                // nextSrc={images[(photoIndex + 1) % images.length]}
                // prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                onCloseRequest={() => setImageOpen(false)}
                // onMovePrevRequest={() =>
                //     this.setState({
                //         photoIndex: (photoIndex + images.length - 1) % images.length,
                //     })
                // }
                // onMoveNextRequest={() =>
                //     this.setState({
                //         photoIndex: (photoIndex + 1) % images.length,
                //     })
                // }
              />
            )}
          </Row>
        )}
      </div>
    );
  }
};

const styles = {
  mobileSlider: {
    display: "flex",
    overflowY: "hidden",
    overflowX: "auto",
    marginTop: 16,
  },
  selectionRateCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  selectionRateValueContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
  },
};
const mapStateToProps = (state) => ({
  venueProfile: state.profilesReducer.venueProfile,
  loading: state.profilesReducer.venueProfileLoading,
});
export default withRouter(connect(mapStateToProps)(VenueProfile));
