import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Col, Row, Button } from "reactstrap";
import { Helmet } from "react-helmet";
import Last10Cell from "../../components/Last10/Last10Cell";
import Next10Cell from "../../components/Next10/Next10Cell";
import Next10 from "../../components/Next10/Next10";
import Last10 from "../../components/Last10/Last10";

/* CSS */
import "./freeHorse.css";

class FreeRatings extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      width: window.innerWidth,
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  async componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    this.setState({
      width: window.innerWidth,
    });
  }

  button() {
    if (this.state.isOpen === false) {
      return "Show More";
    } else return "Show Less";
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Free Horse Racing Ratings | PTP Tips</title>
          <meta name="author" content="PTP TIPS"></meta>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="keywords"
            content="Horse racing ratings ,PTP TIPS, Past The Post, free horse racing tips , free trial , Sign up , australia, bets, odds, winner, monney, ratings "
          ></meta>
          <meta name="description" content="Free Horse Racing Ratings with PTP Tips" />
          <link
            rel="canonical"
            href="https://www.ptptips.com.au/free-horse-racing-ratings"
          />
        </Helmet>

        <div style={{ marginTop: 30, marginBottom: 30 }}>
          <Col
            xl={12}
            lg={6}
            style={{ paddingLeft: "30px", paddingRight: "30px" }}
          >
            <Col xs={12} style={{ marginTop: 20 }}>
              <h1 style={{ textAlign: "center" }}>Free Horse Racing Ratings</h1>
              <p style={{ textAlign: "justify" }}>
                Free horse racing ratings for every Australian horse race with
                form. Free horse racing ratings for Australian horse racing.
                Every future horse race that is racing in Australia. Every horse
                has a separate free rating for each of the 5 possible track
                conditions. We have free horse racing ratings for every horse
                racing in the Melbourne Cup, Cox Plate, Caulfield Cup, Golden
                Slipper, The Everest, Victoria Derby, VRC Oaks, Caulfield
                Guineas, All Star Mile, and Champions Stakes.
              </p>

              <p style={{ textAlign: "justify" }}>
                Free horse racing ratings for today are uploaded to the website
                2 days before the todays horse races. Free horse racing ratings
                for tomorrow are uploaded to the website the day before
                tomorrow’s races. Free horse racing ratings for Saturday are
                uploaded to the website 2 days before Saturdays races.
              </p>
              <p style={{ textAlign: "justify" }}>
                Behind every rating is data about the track condition and each
                horse’s past performance against others in the race. We look at
                everything from the distance they run to the barriers they draw
                to horse weights and jockeys. All this information is also
                available to view through
                <a href="https://www.ptptips.com.au/"> PTP Tips</a>, as well as
                a live odds comparison table from two Australian licensed
                bookmakers.
              </p>
              <p style={{ textAlign: "justify" }}>
                Of course, lady luck will always play a role, but with the free
                horse racing tips from our team, luck is more likely to land on
                your side!
              </p>

              <div
                className="sign_box"
                style={{
                  height: "auto",
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
                    <br /> Tips for Free
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
            </Col>

            <Col xs={12} style={{ marginTop: 20 }}>
              <h2 style={{ textAlign: "center" }}>
                Get Your Professional Horse Racing Tips for Free
              </h2>
              <p style={{ textAlign: "justify" }}>
                The free horse tips from our team are backed by data and
                research, and they’re all tips we have used ourselves to make
                money on horse racing. When you{" "}
                <Link to={"/register"}> sign up</Link> to Past The Post Tips,
                you get access to our professional horse racing tips for free
                for every thoroughbred meeting in the country.
              </p>
              <p style={{ textAlign: "justify" }}>
                You can sign up for PTP Tips and take advantage of our trial to
                get your horse racing tips 100% free for 14 days. If you get the
                results we expect, you can sign up and pay your membership fee
                and nothing else – there are no extra costs for access to the
                tips, ratings, and data we provide.
              </p>
            </Col>

            <Col xs={12} style={{ marginTop: 20 }}>
              <h2 style={{ textAlign: "center" }}>
                The Best Free Horse Racing Tips in Australia
              </h2>
              <p style={{ textAlign: "justify" }}>
                Sign up with Past The Post Tips today for free horse racing tips
                Australia-wide. After your 14-day free trial, you can then sign
                up on a monthly, quarterly, half-yearly, or yearly basis for
                ongoing access to horse racing ratings!
              </p>
            </Col>
          </Col>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default withRouter(connect(mapStateToProps)(FreeRatings));
