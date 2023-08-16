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

class FreeHorseTips extends React.Component {
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

  renderNext10() {
    if (window.innerWidth < 900) {
      return (
        <Col xs="12" lg="3" xl="2" style={{ marginTop: "24px" }}>
          <h5
            style={{
              backgroundColor: "#44bd32",
              height: 32,
              borderRadius: 4,
              textAlign: "center",
              color: "white",
              fontWeight: "600",
              margin: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "350px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            NEXT PTP TIPS
          </h5>
          <div
            style={{
              display: "flex",
              overflowX: "scroll",
              overflowY: "hidden",
              marginBottom: "8px",
            }}
          >
            <Next10Cell />
          </div>
        </Col>
      );
    } else {
      return (
        <Col xs="12" lg="3" xl="2" style={{ paddingRight: "1px" }}>
          <div>
            <div
              style={{
                backgroundColor: "#44bd32",
                height: 32,
                paddingTop: "3%",
                borderRadius: 4,
              }}
            >
              <h5
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "600",
                }}
              >
                NEXT PTP TIPS
              </h5>
            </div>
            <Next10 Open={this.state.isOpen} />
            <div
              className="button"
              onClick={() => {
                this.setState({ isOpen: !this.state.isOpen });
              }}
            >
              {this.button()}
            </div>
          </div>
        </Col>
      );
    }
  }

  renderLast10() {
    if (window.innerWidth < 900) {
      return (
        <Col xs="12" lg="3" xl="2" style={{ marginTop: "24px" }}>
          <h5
            style={{
              backgroundColor: "#44bd32",
              height: 32,
              borderRadius: 4,
              textAlign: "center",
              color: "white",
              fontWeight: "600",
              margin: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "350px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            PREVIOUS PTP TIPS
          </h5>
          <div
            style={{
              display: "flex",
              overflowX: "scroll",
              overflowY: "hidden",
            }}
          >
            <Last10Cell />
          </div>
        </Col>
      );
    } else {
      return (
        <Col xs="12" lg="3" xl="2" style={{ paddingLeft: "1px" }}>
          <div
            style={{
              backgroundColor: "#44bd32",
              height: 32,
              paddingTop: "3%",
              borderRadius: 4,
            }}
          >
            <h5
              style={{ textAlign: "center", color: "white", fontWeight: "600" }}
            >
              PREVIOUS PTP TIPS
            </h5>
          </div>
          <Last10 Open={this.state.isOpen} />
          <div
            className="button"
            onClick={() => {
              this.setState({ isOpen: !this.state.isOpen });
            }}
          >
            {this.button()}
          </div>
        </Col>
      );
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>
            Free Horse Racing Tips Australia, Subscribe Now | PTP Tips
          </title>
          <meta name="author" content="PTP TIPS"></meta>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="keywords"
            content="PTP TIPS, Past The Post, free horse racing tips , free trial , Sign up , australia, bets, odds, winner, monney, ratings "
          ></meta>
          <meta
            name="description"
            content="Partner with Past The Post Tips for free horse racing tips
                            that rank every horse in every race based on its chance of victory in current conditions.
                            Sign up for a free trial!"
          />
          <link
            rel="canonical"
            href="https://www.ptptips.com.au/free-horse-racing-tips"
          />
        </Helmet>

        <div style={{ marginTop: 30, marginBottom: 30 }}>
          <Row>
            {this.renderNext10()}
            <Col
              xl={8}
              lg={6}
              style={{ paddingLeft: "30px", paddingRight: "30px" }}
            >
              <Col xs={12} style={{ marginTop: 20 }}>
                <h1 style={{ textAlign: "center" }}>Free Horse Racing Tips</h1>
                <p style={{ textAlign: "justify" }}>
                  If you want to go into every horse racing meeting in Australia
                  with confidence, you need stats, data, and ratings to back you
                  up. Pouring hours of time and research into the Australian
                  Thoroughbred Industry is one option, but who has the patience
                  for that?
                </p>
                <p style={{ textAlign: "justify" }}>
                  There’s an easier way to get ratings on every horse with
                  racing form in Australia on a daily basis! Partner with Past
                  The Post Tips for free horse racing tips that rank every horse
                  in every race.
                </p>
                <p style={{ textAlign: "justify" }}>
                  At PTP Tips, our process is very simple to understand yet
                  highly sophisticated behind the scenes. We provide the best
                  free horse racing tips by rating every horse in a race with a
                  percentage. The higher the percentage, the more likely they
                  are to win based on our research.
                </p>
                <p style={{ textAlign: "justify" }}>
                  Behind every rating is data about the track condition and each
                  horse’s past performance against others in the race. We look
                  at everything from the distance they run to the barriers they
                  draw to horse weights and jockeys. All this information is
                  also available to view through
                  <a href="https://www.ptptips.com.au/"> PTP Tips</a>, as well as a
                  live odds comparison table from two Australian licensed
                  bookmakers.
                </p>
                <p style={{ textAlign: "justify" }}>
                  Of course, lady luck will always play a role, but with the
                  free horse racing tips from our team, luck is more likely to
                  land on your side!
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
                      <br /> a 14 Day Free trial.
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
                  You can sign up for PTP Tips and take advantage of our trial
                  to get your horse racing tips 100% free for 14 days. If you
                  get the results we expect, you can sign up and pay your
                  membership fee and nothing else – there are no extra costs for
                  access to the tips, ratings, and data we provide.
                </p>
              </Col>

              <Col xs={12} style={{ marginTop: 20 }}>
                <h2 style={{ textAlign: "center" }}>
                  The Best Free Horse Racing Tips in Australia
                </h2>
                <p style={{ textAlign: "justify" }}>
                  Sign up with Past The Post Tips today for free horse racing
                  tips Australia-wide. After your 14-day free trial, you can
                  then sign up on a monthly, quarterly, half-yearly, or yearly
                  basis for ongoing access to horse racing ratings!
                </p>
              </Col>
            </Col>
            {this.renderLast10()}
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default withRouter(connect(mapStateToProps)(FreeHorseTips));
