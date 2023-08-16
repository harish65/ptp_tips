import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../redux/actions/blackbook";
import moment from "moment-timezone";
import Helmet from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Modal, ModalBody, ModalFooter, Button } from "reactstrap";

function Blackbook({
  isLoggedIn,
  currentUser,
  getMyBlackbook,
  blackbookList,
  deleteFromBlackbook,
  deleteFromBlackbookJ,
  jockeyBook,
}) {
  const [isOpen, setisOpen] = useState(false);
  const [isOpenJ, setisOpenJ] = useState(false);
  const [selectedHorseId, setselectedHorseId] = useState(null);
  const [selectedJockeyId, setselectedJockeyId] = useState(null);

  useEffect(() => {
    getMyBlackbook({ client_id: currentUser.id });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectOpen = (horse_id) => {
    setisOpen(true);
    setselectedHorseId(horse_id);
  };

  const close = () => {
    setisOpen(false);
    setselectedHorseId(null);
  };

  const deleteHorse = async () => {
    setisOpen(false);
    deleteFromBlackbook({
      horse_id: selectedHorseId,
      client_id: currentUser.id,
    });
  };

  const selectJOpen = (jockey_id) => {
    setisOpenJ(true);
    setselectedJockeyId(jockey_id);
  };

  const closeJ = () => {
    setisOpenJ(false);
    setselectedJockeyId(null);
  };

  const deleteJockey = async () => {
    setisOpenJ(false);
    deleteFromBlackbookJ({
      jockey_id: selectedJockeyId,
      client_id: currentUser.id,
    });
  };

  if (isLoggedIn) {
    return (
      <>
        <Helmet>
          <title>My BlackBook</title>
          <meta
            charSet="utf-8"
            name="description"
            content={
              "Personalise your blackbook with PTP Tips for the best horse racing tips for today. Our process rates every horse's chance of winning for Australian thoroughbred races, and our tips are updated daily!Horse racing is one of the most popular streams of betting in Australia. This sport not only excites punters to place a bet, but also provides an added value entertainment."
            }
          />
          <meta charSet="utf-8" name="author" content={"PTP TIPS TEAM"} />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            charSet="utf-8"
            name="keywords"
            content={
              "blackbook, your blackbook, jockey, horses, venues ,horse, favorite, favourite, notification, calendar, search bar, ptp ,past the post ,australia"
            }
          />
          <link rel="canonical" href={"https://www.ptptips.com.au/blackbook"} />
        </Helmet>
        {blackbookList && (
          <div style={{ margin: 50, marginTop: 64 }}>
            <h1>My BLACK BOOK HORSES:</h1>
            <Row style={{ justifyContent: "space-between" }}>
              {blackbookList?.map((zone, i) => {
                return (
                  <Col
                    key={`bk-${i}`}
                    xs={12}
                    md={5}
                    // key={`h-${i}`}
                    style={{
                      padding: 10,
                      background: "white",

                      marginBottom: 10,
                      borderRadius: 10,
                    }}
                  >
                    <div>
                      <Col>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Link
                            to={`/profile/horse/${
                              zone.horse_id
                            }/${zone.horse_name.split(" ").join("-")}`}
                            style={{ color: "black", padding: 5 }}
                          >
                            <h2>{zone.horse_name}</h2>
                          </Link>
                          <FontAwesomeIcon
                            style={{
                              position: "absolute",
                              color: "rgb(20, 40, 65)",
                              top: 1,
                              right: 1,
                              zIndex: 10,
                            }}
                            icon={faWindowClose}
                            size="1x"
                            onClick={() => selectOpen(zone.horse_id)}
                          />
                        </div>
                        <Link
                          to={`/profile/horse/${zone.horse_id}/${zone.horse_name
                            .split(" ")
                            .join("-")}`}
                          style={{ color: "black", padding: 5 }}
                        >
                          added @{" "}
                          {moment(zone.created_at).format(
                            "DD-MM-YYYY HH:mm:ss"
                          )}
                        </Link>
                      </Col>
                      <Col>
                        <Link
                          to={`/profile/horse/${zone.horse_id}/${zone.horse_name
                            .split(" ")
                            .join("-")}`}
                          style={{ color: "black", padding: 5 }}
                        >
                          Career prize: ${zone.CAREERPRZ}
                        </Link>
                        <Link
                          to={`/profile/horse/${zone.horse_id}/${zone.horse_name
                            .split(" ")
                            .join("-")}`}
                          style={{ color: "blue", paddingLeft: 5 }}
                        >
                          <div>
                            My Notes: <br />
                            {zone.notes}
                          </div>
                        </Link>
                      </Col>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        )}

        {!blackbookList && (
          <Row style={{ margin: 50, marginTop: 64 }}>
            No Horses Added To your Blackbook.
          </Row>
        )}

        {jockeyBook && (
          <div style={{ margin: 50, marginTop: 64 }}>
            <h1>My BLACK BOOK JOCKEYS:</h1>
            <Row style={{ justifyContent: "space-between" }}>
              {jockeyBook?.map((zone, i) => {
                return (
                  <Col
                    key={`my-${i}`}
                    xs={12}
                    md={5}
                    // key={`h-${i}`}
                    style={{
                      padding: 10,
                      background: "white",

                      marginBottom: 10,
                      borderRadius: 10,
                    }}
                  >
                    <div>
                      <Col>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Link
                            to={`/profile/jockey/${
                              zone?.jockey_id
                            }/${zone?.real_jockey_name.split(" ").join("-")}`}
                            style={{ color: "black", padding: 5 }}
                          >
                            <h2>{zone?.jockey_name}</h2>
                          </Link>
                          <FontAwesomeIcon
                            style={{
                              position: "absolute",
                              color: "rgb(20, 40, 65)",
                              top: 1,
                              right: 1,
                              zIndex: 10,
                            }}
                            icon={faWindowClose}
                            size="1x"
                            onClick={() => selectJOpen(zone.jockey_id)}
                          />
                        </div>
                        <Link
                          to={`/profile/jockey/${
                            zone?.jockey_id
                          }/${zone?.real_jockey_name.split(" ").join("-")}`}
                          style={{ color: "black", padding: 5 }}
                        >
                          added @{" "}
                          {moment(zone.created_at).format(
                            "DD-MM-YYYY HH:mm:ss"
                          )}
                        </Link>
                      </Col>
                      <Col>
                        <Link
                          to={`/profile/jockey/${
                            zone?.jockey_id
                          }/${zone?.real_jockey_name.split(" ").join("-")}`}
                          style={{ color: "black", padding: 5 }}
                        >
                          Career: {zone.career_stats.runs}:
                          {zone.career_stats.win}-{zone.career_stats.second}-
                          {zone.career_stats.third}
                        </Link>
                        <Link
                          to={`/profile/jockey/${
                            zone?.jockey_id
                          }/${zone?.real_jockey_name.split(" ").join("-")}`}
                          style={{ color: "blue", paddingLeft: 5 }}
                        >
                          <div>
                            My Notes: <br />
                            {zone.notes}
                          </div>
                        </Link>
                      </Col>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        )}

        {!jockeyBook && (
          <Row style={{ margin: 50, marginTop: 64 }}>
            No Jockeys Added To your Blackbook.
          </Row>
        )}

        <Modal isOpen={isOpen} style={{ marginTop: 80 }}>
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
              Are you sure you want to remove this horse from your blackbook?
            </p>
          </ModalBody>
          <ModalFooter
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button onClick={close} color="primary">
              <strong>Cancel</strong>
            </Button>
            {""}
            <Button onClick={deleteHorse} color="primary">
              <strong>Okay</strong>
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={isOpenJ} style={{ marginTop: 80 }}>
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
              Are you sure you want to remove this jockey from your blackbook?
            </p>
          </ModalBody>
          <ModalFooter
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button onClick={closeJ} color="primary">
              <strong>Cancel</strong>
            </Button>
            {""}
            <Button onClick={deleteJockey} color="primary">
              <strong>Okay</strong>
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 64,
          flexDirection: "column",
        }}
      >
        <Helmet>
          <title>BlackBook</title>
          <meta charSet="utf-8" name="author" content={"PTP TIPS TEAM"} />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            charSet="utf-8"
            name="keywords"
            content={
              "blackbook your blackbook jockey horses venues venue horse favorite favourite notification calendar search bar ptp past the post australia bookmark"
            }
          />
          <meta
            charSet="utf-8"
            name="description"
            content={
              "Personalise your blackbook with PTP Tips for the best horse racing tips for today. Our process rates every horse's chance of winning for Australian thoroughbred races, and our tips are updated daily!"
            }
          />
          <link rel="canonical" href={"https://www.ptptips.com.au/blackbook"} />
        </Helmet>
        <h1>You are not Logged In.</h1>
        <p style={{ fontSize: 15, width: 260, textAlign: "center" }}>
          Please login to your PTP Account to access this page.
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  currentUser: state.auth.currentUser,
  blackbookList: state.blackbook.blackbookList,
  jockeyBook: state.blackbook.jockeyBook,
  loading: state.blackbook.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getMyBlackbook: (data) => dispatch(actions.getMyBlackbook(data)),
  deleteFromBlackbook: (data) => dispatch(actions.deleteBlackBook(data)),
  deleteFromBlackbookJ: (data) => dispatch(actions.deleteBlackBookJ(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Blackbook);
