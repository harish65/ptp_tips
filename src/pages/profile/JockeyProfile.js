import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  Row,
  Col,
  Table,
  Button,
  Badge,
  Modal,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import Helmet from "react-helmet";
import moment from "moment-timezone";
import LoadingNew from "../../components/loading/LoadingNew";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
//import { checkRouteDate } from "../../config/utils"
/* REDUX */
import profileAction from "../../redux/actions/profiles";
import AddIcon from "react-ionicons/lib/MdAddCircle";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import actions from "../../redux/actions/blackbook";

import "./tableStyle.css";
import { checkRouteDate } from "../../config/utils";

export const JockeyProfile = (props) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [bkNoteOpen, setBkNoteOpen] = useState(false);
  const [bkSelected, setBkSelected] = useState(null);
  const [bkNotes, setBkNotes] = useState("");

  useEffect(() => {
    // console.log(props?.match?.params)
    window.scrollTo(0, 0);
    props.dispatch(
      profileAction.getProfileJockey({
        jockeyID: props?.match?.params?.jockeyId,
        jokceyName: props?.match?.params?.jockeyName,
      })
      );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.match?.params?.jockeyId]);

  const handleTabs = (val) => {
    setSelectedTab(val);
  };

  const addToBlackBook = () => {
    setBkNoteOpen(true);
    setBkSelected(props?.match?.params?.jockeyId);
  };

  const closeBlackBook = () => {
    setBkNoteOpen(false);
    setBkSelected(null);
  };

  const addToBlackBookAction = () => {
    props.dispatch(
      actions.addBlackBookJ({
        jockey_id: bkSelected,
        client_id: props.currentUser.id,
        notes: bkNotes,
      })
    );
    setBkNoteOpen(false);
    setBkSelected(null);
  };

  // console.log(props.jockeyProfile)

  if (props.loading) {
    return <LoadingNew />;
  } else {
    return (
      <div>
        {props.jockeyProfile.hj1 ? (
          <div style={styles.page}>
            <Helmet>
              <title>
                {props.jockeyProfile?.hj1 ? props.jockeyProfile?.hj1 : "Jockey"}{" "}
               Jockey Profile | Jockeys Career Stats
              </title>
              <meta charSet="utf-8" name="author" content="PTP Tips" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta
                charSet="utf-8"
                name="keywords"
                content="PTP Tips , jockey , winner , stats , name , home town , Best Performing Horses , Best Performing Venues , Career Stats , age , weight , upcoming races , last 5 runs "
              />
              <meta
                charSet="utf-8"
                name="description"
                content={`${props.jockeyProfile?.hj1 ? props.jockeyProfile?.hj1 : "Jockey"
                  } Profile. Every stat, every win you need to know about the jockey.`}
              />
              <link
                rel="canonical"
                href={`https://www.ptptips.com.au/profile/jockey/${props?.match?.params?.jockeyId}/${props?.match?.params?.jockeyName.split(" ").join("-")}`}
              />
            </Helmet>
            <Row
              style={{ backgroundColor: "white", padding: 0, paddingTop: 16 }}
            >
              <Col>
              <h1
                  style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: 24,
                  }}
                >
                  {props.jockeyProfile?.hj1}
                </h1>

              </Col>
            </Row>

            <Row
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: "white",
              }}
            >
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h4 style={{ fontWeight: "bold", opacity: "50%" }}>
                  <strong>JOCKEY PROFILE</strong>
                </h4>


                {props.isLoggedIn && (
                  <Button
                    color="default"
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      padding: 6,
                      marginTop: 8,
                      marginBottom: 8,
                      marginLeft: 16,
                    }}
                    onClick={() => addToBlackBook()}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AddIcon color="black" fontSize={"16"} />
                      <strong
                        style={{ marginLeft: 4, fontSize: 13, color: "black" }}
                      >
                        {window.innerWidth > 700 ? "Black Book" : "BB"}
                      </strong>
                    </div>
                  </Button>
                )}

              </Col>
            </Row>

            <Row
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: "white",

              }}>

              <Col style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>

                <strong>
                  {props.jockeyProfile?.hj1}{" "}Had a Total of{" "}{props?.jockeyProfile?.career_stats?.runs}{" "}Runs , Won {props?.jockeyProfile?.career_stats?.win} Times .
                </strong>
              </Col>
            </Row>

            <Row>
              <Col style={{ padding: 0 }}>
                <Tabs
                  value={selectedTab}
                  onChange={(e, value) => handleTabs(value)}
                  style={{ backgroundColor: "white", marginTop: 0, padding: 0 }}
                  aria-label="scrollable auto tabs example"
                >
                  <Tab
                    label={
                      <strong style={{ color: "grey", fontSize: 13 }}>
                        Stats
                      </strong>
                    }
                  />
                  {/* <Tab label={<strong style={{ color: 'grey', fontSize: 13 }}>PTP Results</strong>} /> */}
                </Tabs>
              </Col>
            </Row>

            {selectedTab === 0 ? (

              <>
                <Row>
                  <Col
                    lg={6}
                    xs={12}
                    style={{
                      backgroundColor: "white",
                      paddingBottom: 8,
                      marginTop: 16,
                      borderRadius: 4,
                    }}
                  >
                    <h4 style={{ marginTop: 8 }}>{props.jockeyProfile?.hj1}{" "}Career Stats</h4>
                    <Row style={{ marginTop: 16 }}>
                      <Col style={{ display: "flex", flexDirection: "column" }}>
                        <strong style={{ fontSize: 18 }}>
                          {props?.jockeyProfile?.career_stats?.runs}
                        </strong>
                        <span style={{ marginTop: -4, fontSize: 14 }}>
                          RUNS
                        </span>
                      </Col>
                      <Col style={{ display: "flex", flexDirection: "column" }}>
                        <strong style={{ fontSize: 18 }}>
                          {props?.jockeyProfile?.career_stats?.win}
                        </strong>
                        <span style={{ marginTop: -4, fontSize: 14 }}>
                          WINS
                        </span>
                      </Col>
                      <Col style={{ display: "flex", flexDirection: "column" }}>
                        <strong style={{ fontSize: 18 }}>
                          {props?.jockeyProfile?.career_stats?.second}
                        </strong>
                        <span style={{ marginTop: -4, fontSize: 14 }}>2nd</span>
                      </Col>
                      <Col style={{ display: "flex", flexDirection: "column" }}>
                        <strong style={{ fontSize: 18 }}>
                          {props?.jockeyProfile?.career_stats?.third}
                        </strong>
                        <span style={{ marginTop: -4, fontSize: 14 }}>3rd</span>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 8 }}>
                      <Col style={{ display: "flex", flexDirection: "column" }}>
                        <strong style={{ fontSize: 18 }}>
                          {(
                            (props?.jockeyProfile?.career_stats?.win /
                              props?.jockeyProfile?.career_stats?.runs) *
                            100
                          ).toFixed(2)}
                        </strong>
                        <span style={{ marginTop: -4, fontSize: 14 }}>
                          WIN%
                        </span>
                      </Col>
                      <Col style={{ display: "flex", flexDirection: "column" }}>
                        <strong style={{ fontSize: 18 }}>
                          {(
                            ((Number(props?.jockeyProfile?.career_stats?.win) +
                              Number(
                                props?.jockeyProfile?.career_stats?.second
                              ) +
                              Number(
                                props?.jockeyProfile?.career_stats?.third
                              )) /
                              Number(
                                props?.jockeyProfile?.career_stats?.runs
                              )) *
                            100
                          ).toFixed(2)}
                        </strong>
                        <span style={{ marginTop: -4, fontSize: 14 }}>
                          PLC%
                        </span>
                      </Col>
                      <Col style={{ display: "flex", flexDirection: "column" }}>
                        <strong style={{ fontSize: 18 }}>
                          {props?.jockeyProfile?.career_stats?.avg_win_odd?.toFixed(
                            2
                          )}
                        </strong>
                        <span style={{ marginTop: -4, fontSize: 14 }}>
                          AVGWIN$
                        </span>
                      </Col>
                      <Col style={{ display: "flex", flexDirection: "column" }}>
                        <strong style={{ fontSize: 18 }}>
                          {props?.jockeyProfile?.career_stats?.avg_plc_odd?.toFixed(
                            2
                          )}
                        </strong>
                        <span style={{ marginTop: -4, fontSize: 14 }}>
                          AVGPLC$
                        </span>
                      </Col>
                    </Row>
                  </Col>

                  <Col
                    lg={6}
                    xs={12}
                    style={{
                      backgroundColor: "white",
                      paddingBottom: 8,
                      marginTop: 16,
                      borderRadius: 4,
                    }}
                  >
                    <h4 style={{ marginTop: 8 }}>{props.jockeyProfile?.hj1}{" "}PTP Stats</h4>
                    <Row style={{ marginTop: 16 }}>
                      <Col style={{ display: "flex", flexDirection: "column" }}>
                        <strong style={{ fontSize: 18 }}>
                          {props?.jockeyProfile?.ptpStats?.runs}
                        </strong>
                        <span style={{ marginTop: -4, fontSize: 14 }}>
                          RUNS
                        </span>
                      </Col>
                      <Col style={{ display: "flex", flexDirection: "column" }}>
                        <strong style={{ fontSize: 18 }}>
                          {props?.jockeyProfile?.ptpStats?.won}
                        </strong>
                        <span style={{ marginTop: -4, fontSize: 14 }}>
                          WINS
                        </span>
                      </Col>
                      <Col style={{ display: "flex", flexDirection: "column" }}>
                        <strong style={{ fontSize: 18 }}>
                          {props?.jockeyProfile?.ptpStats?.second}
                        </strong>
                        <span style={{ marginTop: -4, fontSize: 14 }}>2nd</span>
                      </Col>
                      <Col style={{ display: "flex", flexDirection: "column" }}>
                        <strong style={{ fontSize: 18 }}>
                          {props?.jockeyProfile?.ptpStats?.third}
                        </strong>
                        <span style={{ marginTop: -4, fontSize: 14 }}>3rd</span>
                      </Col>
                    </Row>

                    <Row style={{ marginTop: 8 }}>
                      <Col style={{ display: "flex", flexDirection: "column" }}>
                        <strong style={{ fontSize: 18 }}>
                          {(
                            (props?.jockeyProfile?.ptpStats?.won /
                              props?.jockeyProfile?.ptpStats?.runs) *
                            100
                          ).toFixed(2)}
                        </strong>
                        <span style={{ marginTop: -4, fontSize: 14 }}>
                          WIN%
                        </span>
                      </Col>
                      <Col style={{ display: "flex", flexDirection: "column" }}>
                        <strong style={{ fontSize: 18 }}>
                          {(
                            ((props?.jockeyProfile?.ptpStats?.won +
                              props?.jockeyProfile?.ptpStats?.second +
                              props?.jockeyProfile?.ptpStats?.third) /
                              props?.jockeyProfile?.ptpStats?.runs) *
                            100
                          ).toFixed(2)}
                        </strong>
                        <span style={{ marginTop: -4, fontSize: 14 }}>
                          PLC%
                        </span>
                      </Col>
                      <Col style={{ display: "flex", flexDirection: "column" }}>
                        <strong style={{ fontSize: 18 }}>
                          {props?.jockeyProfile?.ptpStats?.avg_win?.toFixed(2)}
                        </strong>
                        <span style={{ marginTop: -4, fontSize: 14 }}>
                          AVGWIN$
                        </span>
                      </Col>
                      <Col style={{ display: "flex", flexDirection: "column" }}>
                        <strong style={{ fontSize: 18 }}>
                          {props?.jockeyProfile?.ptpStats?.avg_place?.toFixed(
                            2
                          )}
                        </strong>
                        <span style={{ marginTop: -4, fontSize: 14 }}>
                          AVGPLC$
                        </span>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col style={{ marginTop: 16, padding: 0 }}>
                    <h2>{props.jockeyProfile?.hj1}{" "}Best Performing Horses</h2>
                    <Table responsive style={{ marginTop: 8 }}>
                      <thead
                        style={{ backgroundColor: "#142841", color: "white" }}
                      >
                        <tr>
                          <th>Horse Name</th>
                          <th>RUNS</th>
                          <th>WIN</th>
                          <th>WIN%</th>
                          <th>2ND</th>
                          <th>3rd</th>
                        </tr>
                      </thead>
                      <tbody style={{ backgroundColor: "white" }}>
                        {props.jockeyProfile?.best_performing_horses?.map(
                          (element, i) => {
                            return (
                              <tr key={i}>
                              <td style={{ textDecoration: "underline" }}><Link
                              style={{ color: props.dark ? "white" : "black" }}
                              to={`/profile/horse/${element?.horse_id}/${element?.horse_name.split(" ").join("-")}`}
                              >{element?.horse_name}</Link></td>
                                <td>{element?.runs}</td>
                                <td>{element?.win}</td>
                                <td>{element?.winPer?.toFixed(2)}</td>
                                <td>{element?.second}</td>
                                <td>{element?.third}</td>
                              </tr>
                            );
                          }
                        ).sort((a, b) => b - a)}
                      </tbody>
                    </Table>
                  </Col>
                  <Col
                    style={{
                      marginTop: 16,
                      padding: window.innerWidth > 700 ? null : 0,
                    }}
                  >
                    <h2>{props.jockeyProfile?.hj1}{" "}Best Performing Venues</h2>
                    <Table responsive style={{ marginTop: 8 }}>
                      <thead
                        style={{ backgroundColor: "#142841", color: "white" }}
                      >
                        <tr>
                          <th>Venue</th>
                          <th>RUNS</th>
                          <th>WIN</th>
                          <th>WIN%</th>
                          <th>2ND</th>
                          <th>3rd</th>
                        </tr>
                      </thead>
                      <tbody style={{ backgroundColor: "white" }}>
                        {props.jockeyProfile?.best_performing_venues?.map(
                          (element, i) => {
                            return (
                              <tr key={i}>
                                <td style={{ textDecoration: "underline" }}><Link style={{ color: props.dark ? "white" : "black" }} to={(`/profile/venue/${element?.trackcode}`)}>{element?.trackcode}</Link></td>
                                <td>{element?.runs}</td>
                                <td>{element?.win}</td>
                                <td>{element?.winPer?.toFixed(2)}</td>
                                <td>{element?.second}</td>
                                <td>{element?.third}</td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                {props?.jockeyProfile?.ptp_results?.length > 0 ? (
                  <Col style={{ marginTop: 16, padding: 0 }}>
                    <h2>{props.jockeyProfile?.hj1}{" "}Last 5 PTP Runs</h2>
                    <div
                      style={{ display: "flex", overflowX: "auto", padding: 8 }}
                    >
                      {props?.jockeyProfile?.ptp_results ? (
                        props?.jockeyProfile?.ptp_results?.map((element, i) => {
                          return (
                            <Link
                              key={i}
                              to={`/horse-racing-tips/${checkRouteDate(moment(element.meetdate).tz('Australia/Sydney').format('DD-MM-YYYY'))}/${element?.track_name}/R${element?.race_num}/${element?.point_id}`}
                              style={{ marginLeft: i !== 0 ? 24 : null }}
                            >
                              <div
                                key={i}
                                style={{
                                  marginTop: 16,
                                  backgroundColor: "white",
                                  padding: 8,
                                  borderRadius: 4,
                                  minWidth: 232,
                                }}
                              >
                                {/* <Badge>{moment(element?.meetdate).format('DD-MM-YYYY')} at {element?.race_time.split(':')[0]}:{element?.race_time.split(':')[1]}</Badge> */}
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Badge>
                                    {moment(element?.meetdate).format(
                                      "DD-MM-YYYY"
                                    )}
                                  </Badge>
                                  <p style={{ marginLeft: 4, color: "grey" }}>
                                    {element.result}
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
                                  <h3
                                    style={{
                                      color: "black",
                                      fontWeight: "bold",
                                    }}
                                  >
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
                          No PTP runs
                        </p>
                      )}
                    </div>
                  </Col>
                ) : null}

                {props?.jockeyProfile?.last_5_starts?.length > 0 ? (
                  <Col style={{ marginTop: 16, padding: 0 }}>
                    <h2>{props.jockeyProfile?.hj1}{" "}Last Runs</h2>
                    <div
                      style={{ display: "flex", overflowX: "auto", padding: 8 }}
                    >
                      {props?.jockeyProfile?.last_5_starts ? (
                        props?.jockeyProfile?.last_5_starts?.map(
                      // eslint-disable-next-line array-callback-return
                          (element, i) => {
                              if (element?.position !== null) {
                            return (
                              <Link
                                key={i}
                                to={`/horse-racing-tips/${checkRouteDate(moment(element.meetdate).tz('Australia/Sydney').format('DD-MM-YYYY'))}/${element?.track_name}/R${element?.race_num}/${element?.point_id}`}
                                style={{ marginLeft: i !== 0 ? 24 : null }}
                              >
                                <div
                                  key={i}
                                  style={{
                                    marginTop: 16,
                                    backgroundColor: "white",
                                    padding: 8,
                                    borderRadius: 4,
                                    minWidth: 232,
                                  }}
                                >
                                  {/* <Badge>{moment(element?.meetdate).format('DD-MM-YYYY')} at {element?.race_time.split(':')[0]}:{element?.race_time.split(':')[1]}</Badge> */}
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Badge>
                                      {moment(element?.meetdate).format(
                                        "DD-MM-YYYY"
                                      )}
                                    </Badge>
                                    <p style={{ marginLeft: 4, color: "grey" }}>
                                     Position: {element.position}
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
                                    <h3
                                      style={{
                                        color: "black",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {element?.track_name} R{element?.race_num}
                                    </h3>
                                    <p>{element?.track_description}</p>
                                    {/* <p>{moment(element?.meetdate).format('DD-MM-YYYY')} at {element?.race_time.split(':')[0]}:{element?.race_time.split(':')[1]}</p> */}
                                  </div>
                                </div>
                              </Link>
                            );
                          }
                          }
                        )
                      ) : (
                        <p style={{ marginTop: 24, opacity: "50%" }}>No runs</p>
                      )}
                    </div>
                  </Col>
                ) : null}

                <Col style={{ marginTop: 16, padding: 0 }}>
                  <h2>{props.jockeyProfile?.hj1}{" "}Upcoming Races</h2>
                  <div
                    style={{ display: "flex", overflowX: "auto", padding: 8 }}
                  >
                    {props?.jockeyProfile?.upcoming_races ? (
                      props?.jockeyProfile?.upcoming_races?.map(
                        (element, i) => {
                          return (
                            <Link
                              key={i}
                              to={`/horse-racing-tips/${checkRouteDate(moment(element.meetdate).tz('Australia/Sydney').format('DD-MM-YYYY'))}/${element?.track_name}/R${element?.race_num}/${element?.point_id}`}
                              style={{ marginLeft: i !== 0 ? 24 : null }}
                            >
                              <div
                                key={i}
                                style={{
                                  marginTop: 16,
                                  backgroundColor: "white",
                                  padding: 8,
                                  borderRadius: 4,
                                  minWidth: 232,
                                }}
                              >
                                {/* <Badge>{moment(element?.meetdate).format('DD-MM-YYYY')} at {element?.race_time.split(':')[0]}:{element?.race_time.split(':')[1]}</Badge> */}
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Badge>
                                    {moment(element?.meetdate).format(
                                      "DD-MM-YYYY"
                                    )}
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
                                  <h3
                                    style={{
                                      color: "black",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {element?.track_name} R{element?.race_num}
                                  </h3>
                                  <p>{element?.track_description}</p>
                                  {/* <p>{moment(element?.meetdate).format('DD-MM-YYYY')} at {element?.race_time.split(':')[0]}:{element?.race_time.split(':')[1]}</p> */}
                                </div>
                              </div>
                            </Link>
                          );
                        }
                      )
                    ) : (
                      <p style={{ marginTop: 24, opacity: "50%" }}>
                        No Upcoming races
                      </p>
                    )}
                  </div>
                </Col>
              </>
            ) : null}

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
        ) : (
          <div style={styles.page}>
            <div style={{ textAlign: "center" }}>
              <div style={{ marginTop: 32 }}>
                <FontAwesomeIcon icon={faExclamationCircle} size="4x" />
                <h4 style={{ marginTop: 16 }}>
                  <strong>No Data Available</strong>
                </h4>
                <Link to={"/horse-racing-tips/today"} style={{ marginTop: -8 }}>
                  Go back to selections
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

const styles = {
  page: {
    marginTop: 32,
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    marginLeft: "18px",
    marginRight: "18px",
    paddingBottom: 32,
  },
  card: {
    backgroundColor: "white",
    padding: "22px 12px",
    maxWidth: "900px",
    borderRadius: "8px",
    boxShadow: "10px 10px 5px grey",
  },
};

const mapStateToProps = (state) => ({
  jockeyProfile: state.profilesReducer.jockeyProfile,
  loading: state.profilesReducer.jockeyProfileLoading,
  currentUser: state.auth.currentUser,
  isLoggedIn: state.auth.isLoggedIn,
});

export default withRouter(connect(mapStateToProps)(JockeyProfile));
