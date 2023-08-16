import React, { useState, useEffect, memo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Row, Button, Badge, Table } from "reactstrap";
import { Helmet } from "react-helmet";
import moment from "moment";

/* REDUX */
import actions from "../../redux/actions/home";

/* COMPONENTS */
import LastWinners from "../../components/Last10Winners/Last10Winners";

/* CSS */
import "./home.css";

const Home = (props) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
 

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };

    props.fetchHome()
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResize = () => {
    setInnerWidth(window.innerWidth);
  };

  const renderCardsSize = () => {
    if (innerWidth > 1440) {
      return 2;
    } else {
      return 3;
    }
  };

  const renderCheck = () => {
    var inf = props.monthlyTable;
                      // eslint-disable-next-line array-callback-return
    const datas = inf.map((index, i) => {
      if(index?.selection) {
      return (
        <tr key={i}>
          <td>{moment(index.mon_year).format("MMM/YYYY")}</td>
          <td>{index.selection}</td>
          <td>{index.win}</td>
          <td>{((index.win / index.selection) * 100).toFixed(2) + "%"} </td>
          <td>
            {index.win_odds / index.win
              ? "$" + (index.win_odds / index.win).toFixed(2)
              : "-"}
          </td>
          <td>{index.place}</td>
          <td>{((index.place / index.selection) * 100).toFixed(2) + "%"} </td>
          <td>
            {index.place_odds / index.place
              ? "$" + (index.place_odds / index.place).toFixed(2)
              : "-"}
          </td>
        </tr>
      );
      }
    });

    // daily table data rendering
    const data = props.dailyTable.map((index, i) => {
      // const year = moment().format("YYYY");
      return (
        <tr key={i}>
          <td>{moment(index.date).format("ddd,DD/MM/YY")}</td>
          <td>{index.selection}</td>

          <td>{index.win}</td>
          <td>{((index.win / index.selection) * 100).toFixed(2) + "%"} </td>
          <td>
            {index.won_odds / index.win
              ? "$" + (index.won_odds / index.win).toFixed(2)
              : "-"}
          </td>

          <td>{index.place}</td>
          <td>{((index.place / index.selection) * 100).toFixed(2) + "%"}</td>
          <td>
            {index.place_odds / index.place
              ? "$" + (index.place_odds / index.place).toFixed(2)
              : "-"}
          </td>
        </tr>
      );
    });

    if (innerWidth > 769) {
      return (
        <div>
          <Row style={{ marginTop: 0, padding: 0 }}>
            {/** Table Monthly */}
            <Col
              xl={5}
              lg={12}
              md={12}
              xs={12}
              style={{ paddingRight: 4, paddingLeft: 4 }}
            >
              <div style={{ margin: "10px" }}>
                <h2 style={{ textAlign: "center", fontWeight: "bolder" }}>
                  Monthly Selection Rating
                </h2>

                <Table style={{marginBottom : 0}}>
                  <thead
                    style={{
                      backgroundColor: "#142841",
                      color: "white",
                      textAlign: "left",
                      width: "100%",
                    }}
                  >
                    <tr>
                      <th style={{ width: "16%" }}>DATE</th>
                      <th style={{ width: "12%" }}>TIPS</th>
                      <th style={{ width: "11%" }}>WIN</th>
                      <th style={{ width: "13%" }}>WIN%</th>
                      <th style={{ width: "13%" }}>AVG $</th>
                      <th style={{ width: "11%" }}>PLC</th>
                      <th style={{ width: "13%" }}>PLC%</th>
                      <th>AVG $</th>
                    </tr>
                  </thead>
                </Table>

                <div style={{ maxHeight: 500, overflowY: "auto" }}>
                  <Table striped responsive className="home-table">
                    <tbody
                      style={{ textAlign: "center", backgroundColor: "white" }}
                    >
                      {datas}
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>
            {/*Card between tables  */}
            <Col
              xl={2}
              lg={12}
              md={12}
              xs={12}
              style={{ paddingRight: 4, paddingLeft: 4 }}
            >
              <div style={{ margin: "10px", marginTop: "48px" }}>
                <div
                  style={{ backgroundColor: "#05C359" }}
                  className="card card-custom "
                >
                  <div className="card-header border-0">
                    <div style={{ textAlign: "center" }} className="card-title">
                      <span className="card-icon">
                        <i className="flaticon2-chat-1 text-white"></i>
                      </span>
                      <h5
                        style={{ fontSize: "20px" }}
                        className="card-label text-white"
                      >
                        Welcome To Past The Post Tips
                      </h5>
                    </div>
                  </div>
                  <div className="separator separator-solid separator-white opacity-20"></div>
                  <div
                    style={{
                      fontSize: "14px",
                      padding: "12px",
                      textAlign: "justify",
                    }}
                    className="card-body text-white"
                  >
                    If You Are Looking For A Profitable Approach To Horse Racing
                    Then You Have Come To The Right Place. We Provide The Best
                    Horse Racing Ratings Online! We Offer Our Carefully Selected
                    Ratings Each Day For All Australian Meetings. These Ratings
                    Are Devised From Our Complex And Highly Sophisticated
                    Selection Process, We Use A Number Of Factors To Give Each
                    Horse With Racing Form A Rating.
                  </div>
                </div>
              </div>
            </Col>

            {/** Table Daily */}
            <Col
              xl={5}
              lg={12}
              md={12}
              xs={12}
              style={{ paddingRight: 4, paddingLeft: 4 }}
            >
              <div style={{ margin: "10px" }}>
                <h2 style={{ textAlign: "center", fontWeight: "bolder" }}>
                  Daily Selection Rating
                </h2>
                <Table style={{marginBottom : 0}}>
                  <thead
                    style={{
                      backgroundColor: "#142841",
                      color: "white",
                      textAlign: "left",
                      width: "100%",
                    }}
                  >
                    <tr>
                      <th style={{ width: "19%" }}>DATE</th>
                      <th style={{ width: "11%" }}>TIPS</th>
                      <th style={{ width: "11%" }}>WIN</th>
                      <th style={{ width: "12%" }}>WIN%</th>
                      <th style={{ width: "13%" }}>AVG $</th>
                      <th style={{ width: "11%" }}>PLC</th>
                      <th style={{ width: "11%" }}>PLC%</th>
                      <th>AVG $</th>
                    </tr>
                  </thead>
                </Table>
                <div
                  style={{ borderRadius: 4, maxHeight: 500, overflowY: "auto" }}
                >
                  <Table striped responsive className="home-table">
                    <tbody
                      style={{ textAlign: "center", backgroundColor: "white" }}
                    >
                      {data}
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>
          </Row>
          <Row style={{ marginBottom: 20, padding: 0 }}>
            <Col style={{ paddingLeft: 8, paddingRight: 8 }}>
              <LastWinners />
            </Col>
          </Row>
        </div>
      );
    } else {
      let inf = props.monthlyTable;
                      // eslint-disable-next-line array-callback-return
      const datas = inf.map((index, i) => {
        if(index?.selection) {
        return (
          <Col
            key={i}
            xs={9}
            sm={6}
            md={4}
            lg={renderCardsSize()}
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
              xs={12}
              md={12}
              lg={12}
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <Col
                lg={6}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  padding: 0,
                }}
              >
                <span>
                  <strong>{index.selection} Selections</strong>
                </span>
              </Col>

              <Col
                lg={6}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  padding: 0,
                }}
              >
                <Badge style={{ backgroundColor: "#44bd32" }}>
                  <span style={{ color: "white" }}>
                    <strong>{moment(index.mon_year).format("MMM")}</strong>{" "}
                    {moment(index.mon_year).format("YYYY")}
                  </span>
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
                    <strong style={{ fontSize: 16 }}>{index.win}</strong>
                    <span style={{ marginTop: -4, fontSize: 11 }}>WIN</span>
                  </div>
                  <div style={styles.selectionRateValueContainer}>
                    <strong style={{ fontSize: 16 }}>{index.place}</strong>
                    <span style={{ marginTop: -4, fontSize: 11 }}>PLACE</span>
                  </div>
                </Col>

                <Col style={styles.selectionRateCol}>
                  <div style={styles.selectionRateValueContainer}>
                    <strong style={{ fontSize: 16 }}>
                      {((index.win / index.selection) * 100).toFixed(0) + "%"}
                    </strong>
                    <span style={{ marginTop: -4, fontSize: 11 }}>WIN%</span>
                  </div>
                  <div style={styles.selectionRateValueContainer}>
                    <strong style={{ fontSize: 16 }}>
                      {((index.place / index.selection) * 100).toFixed(0) + "%"}
                    </strong>
                    <span style={{ marginTop: -4, fontSize: 11 }}>PLACE%</span>
                  </div>
                </Col>

                <Col style={styles.selectionRateCol}>
                  <div style={styles.selectionRateValueContainer}>
                    <strong style={{ fontSize: 16 }}>
                      {(index.win_odds / index.win)?.toFixed(2)}
                    </strong>
                    <span style={{ marginTop: -4, fontSize: 11 }}>WIN$</span>
                  </div>
                  <div style={styles.selectionRateValueContainer}>
                    <strong style={{ fontSize: 16 }}>
                      {(index.place_odds / index.place)?.toFixed(2)}
                    </strong>
                    <span style={{ marginTop: -4, fontSize: 11 }}>PLACE$</span>
                  </div>
                </Col>
              </Row>
            </Col>
          </Col>
        );
            }
      });

      // daily table data rendering
      const data = props.dailyTable.map((index, i) => {
        return (
          <Col
            key={i}
            xs={9}
            sm={6}
            md={4}
            lg={renderCardsSize()}
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              marginRight: 16,
              padding: 0,
              paddingTop: 8,
              paddingBottom: 8,
            }}
          >
            <Link
              style={{ textDecoration: "none", color: "#3F4254" }}
              to={`horse-racing-tips/results/${moment(index.date).format("DD-MM-YYYY")}`}
            >
              <Col
                lg={12}
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <Col
                  lg={6}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    padding: 0,
                  }}
                >
                  <span>
                    <strong>{index.selection} Selections</strong>
                  </span>
                </Col>

                <Col
                  lg={6}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    padding: 0,
                  }}
                >
                  <Badge style={{ backgroundColor: "#44bd32", color: "white" }}>
                    {" "}
                    <strong>{moment(index.date).format("ddd D")}</strong>{" "}
                    <span>{moment(index.date).format("MMM YYYY")}</span>
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
                      <strong style={{ fontSize: 16 }}>{index.win}</strong>
                      <span style={{ marginTop: -4, fontSize: 11 }}>WIN</span>
                    </div>
                    <div style={styles.selectionRateValueContainer}>
                      <strong style={{ fontSize: 16 }}>{index.place}</strong>
                      <span style={{ marginTop: -4, fontSize: 11 }}>PLACE</span>
                    </div>
                  </Col>

                  <Col style={styles.selectionRateCol}>
                    <div style={styles.selectionRateValueContainer}>
                      <strong style={{ fontSize: 16 }}>
                        {((index.win / index.selection) * 100).toFixed(0) + "%"}
                      </strong>
                      <span style={{ marginTop: -4, fontSize: 11 }}>WIN%</span>
                    </div>
                    <div style={styles.selectionRateValueContainer}>
                      <strong style={{ fontSize: 16 }}>
                        {Number(((index.place / index.selection) * 100).toFixed(0)) ? (((index.place / index.selection) * 100).toFixed(0) + "%") : "-"}
                      </strong>
                      <span style={{ marginTop: -4, fontSize: 11 }}>
                        PLACE%
                      </span>
                    </div>
                  </Col>

                  <Col style={styles.selectionRateCol}>
                    <div style={styles.selectionRateValueContainer}>
                      <strong style={{ fontSize: 16 }}>
                        {Number((index.won_odds / index.win)?.toFixed(2)) ? (index.won_odds / index.win)?.toFixed(2) : "--"}
                      </strong>
                      <span style={{ marginTop: -4, fontSize: 11 }}>WIN$</span>
                    </div>
                    <div style={styles.selectionRateValueContainer}>
                      <strong style={{ fontSize: 16 }}>
                        {(index.place_odds / index.place) ? (index.place_odds / index.place).toFixed(2) : "--"}
                      </strong>
                      <span style={{ marginTop: -4, fontSize: 11 }}>
                        PLACE$
                      </span>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Link>
          </Col>
        );
      });
      return (
        <div className="twoTables">
          <Col style={{ width: "100%", marginTop: 64 }}>
            <h3 style={{ fontWeight: "bolder" }}>Daily Selection Rating</h3>

            <div
              style={{
                display: "flex",
                overflowY: "hidden",
                overflowX: "auto",
                marginTop: 16,
              }}
            >
              {data}
            </div>
          </Col>

          <Col style={{ width: "100%", marginTop: 24 }}>
            <h3> Monthly Selection Rating</h3>
            <div
              style={{
                display: "flex",
                overflowY: "hidden",
                overflowX: "auto",
                marginTop: 16,
              }}
            >
              {datas}
            </div>
          </Col>

          <Col style={{ width: "100%", marginTop: 24, marginLeft: -8 }}>
            <div
              style={{
                display: "flex",
                overflowY: "hidden",
                overflowX: "auto",
                marginTop: 16,
              }}
            >
              <LastWinners />
            </div>
          </Col>
        </div>
      );
    }
  };

  return (
    <div style={{ marginTop: 32 }}>
      <Helmet>

        <title>PTP-Tips Premier Australian Horse Racing Form Guides and Tips, Predictions, Betting Tips</title>
        <meta
          charSet="utf-8"
          name="description"
          data-react-helmet="true"
          content="PTP Tips is the home of horse racing predictions
                  in Australia. We provide daily horse racing betting tips and generate the percentage
                  chance that each horse has of winning."
        />
        <meta charSet="utf-8" name="author" content="PTP Tips" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          charSet="utf-8"
          name="description"
          data-react-helmet="true"
          content="PTP Tips , Home , tips , bets ,australia , odds , horse , races , horse racing , venues , jockey , date , form, results , live results , winner , condition , barrier numbers , jockey silks, reacing table, resulted racing table , live odds, speed map , venue maps"
        />
        <meta
          charSet="utf-8"
          name="keywords"
          data-react-helmet="true"
          content="Racenet and punters , just horse racing tips, sports bet, unibet , boombetting, ladbrokes , horse racing australia"
        />
        <link rel="canonical" href="https://www.ptptips.com.au/" />
        <link rel="relevant" href="https://www.racenet.com.au/" />
        <link rel="relevant" href="https://www.punters.com.au/" />
        <link rel="relevant" href="https://www.justhorseracing.com.au/" />
        <link rel="relevant" href="https://www.racingbase.com.au/" />
        <link rel="relevant" href="https://horsebetting.com.au/tips/" />
        <link rel="relevant" href="https://www.racingbase.com.au/" />
        <link rel="relevant" href="https://horseracing.com.au/" />
        <link rel="relevant" href="https://www.sportsbet.com.au/" />
        <link rel="relevant" href="https://www.freehorseracingtipsaustralia.com/" />
      </Helmet>

      {renderCheck()}

      <Row style={{ margin: 15 }}>
        <Col xl={4} lg={4} md={12} xs={12} style={{ marginTop: 10 }}>
          <h1 style={{ marginBottom: 30, fontWeight: "bolder" }}>
            Horse Racing Tips
          </h1>
          <p style={{ textAlign: "justify" }}>
            Want to make money on horse racing without having to pour through
            all the stats?
          </p>

          <p style={{ textAlign: "justify" }}>
            For a profitable approach to horse racing that anyone can take
            advantage of, Past The Post Tips can help you.
          </p>
          <p style={{ textAlign: "justify" }}>
            PTP Tips is the online home of horse racing predictions for the
            Australian Thoroughbred Industry. We provide you with horse racing
            betting tips on a daily basis and generate the percentage chance
            that each horse has for winning.
          </p>

          <p style={{ textAlign: "justify" }}>
            Our carefully selected horse betting tips are provided for all
            Australian meetings, every day of the week. Get started with PTP
            Tips and take advantage of horse racing tips and percentage ratings
            for every horse in every race.
          </p>
        </Col>

        <Col xl={4} lg={4} md={6} xs={12} style={{ marginTop: 6 }}>
          <h1 style={{ marginBottom: 35, fontWeight: "bolder" }}>
            Australia’s Best Horse Racing Tips
          </h1>
          <p style={{ textAlign: "justify" }}>
            What makes PTP Tips the home of the best horse racing tips in
            Australia?
          </p>
          <p style={{ textAlign: "justify" }}>
            Our highly sophisticated selection process uses a number of factors
            and the latest, most accurate data to give each horse with racing
            form a rating. Each race is sorted with the highest percentage on
            top, so all you need to do is select the first horse listed in each
            meeting for your horse racing best bets.
          </p>
          <p style={{ textAlign: "justify" }}>
            The top horse racing tips we provide are based on current track
            condition and you can also analyse the past performance of each
            horse against each other. With PTP Tips, you can also view data on
            horse barriers, trainers, jockeys, weights, names, numbers, race
            distances, race classes, their last 10 starts, and much more. All
            this information is displayed alongside live Australian horse racing
            odds from 2 licenced bookmakers. This allows you to compare live
            odds to PTP’s best horse racing tips and place a bet with
            confidence.
          </p>
          {!props.isLoggedIn ? (
            <>
              <Link to={"/register"}>Sign up</Link> with Past the Post Tips
              today and get access to the best horse tips Australia has to offer
              online.
            </>
          ) : null}
        </Col>

        <Col xl={4} lg={4} md={6} xs={12} style={{ marginTop: 6 }}>
          <h1 style={{ fontWeight: "bolder" }}>
            Get Expert Horse Racing Tips Every Day with Past The Post
          </h1>
          <p style={{ textAlign: "justify" }}>
            Signing up for daily horse racing tips is easy. Simply get started
            with PTP Tips, provide us with an email address and some details and
            we’ll provide you with Aussie racing tips for every day of the week.
            Want to see how far you can go with professional horse racing tips?
          </p>
          <p style={{ textAlign: "justify" }}>
            We offer a FREE trial so you can try our expert tips for horse
            racing before you buy.
            <br />
            <br />
            So sign up for your FREE trial now and get access to pro horse
            racing tips that make a difference to your next bet.
          </p>
          {!props.isLoggedIn ? (
            <>
              <div
                className="signup_box"
                style={{
                  height: "180px",
                  borderRadius: 4,
                  zIndex: 1,
                  padding: 40,
                  backgroundSize: "cover",
                }}
              >
                <div>
                  <img
                    src="https://www.ptptips.com.au/favicon.png"
                    alt=""
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
                    <br /> a {props.subscription} FREE trial.
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
            </>
          ) : null}
        </Col>
      </Row>
    </div>
  );
};

const styles = {
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
  monthlyTable: state.homeReducer.monthlyTable,
  dailyTable: state.homeReducer.dailyTable,
  loading: state.homeReducer.loading,
  info: state.lastWinnersReducer?.info,
  currentUser: state.auth.currentUser,
  isLoggedIn: state.auth.isLoggedIn,
  subscription: state.auth.subscription,
});

const mapDispatchToProps = dispatch => ({
  fetchHome: () => dispatch(actions.fetchHome())
})

export default connect(mapStateToProps, mapDispatchToProps)(memo(Home));
