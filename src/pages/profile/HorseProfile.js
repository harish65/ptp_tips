import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Col, Container, Badge } from "reactstrap";
import Helmet from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import ProfileHead from "./components/Horses/profileHead";
import StatsTable from "./components/Horses/statsTable";
import Results from "./components/Horses/results";
import PtpResults from "./components/Horses/ptpResults";
import Loading from "../../components/loading/LoadingNew";
/* REDUX */
import profileAction from "../../redux/actions/profiles";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import "./components/horseProfile.scoped.scss";
import moment from "moment";
import NumberFormat from "react-number-format";
import { checkRouteDate } from "../../config/utils";

class horse extends React.Component {
  constructor(props) {
    super(props);
    this.handleTabs = this.handleTabs.bind(this);
    this.state = {
      selectedTab: 0,
      insideOpenArea: [],
      upcomingRacesOpen: [],
      insideOpenRows: [],
      jockieOpen: [],
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(
      profileAction.getProfileHorse({
        horseID: this.props.match.params.horseId,
        horseName: this.props.match.params.horseName,
      })
    );
    window.scrollTo(0, 0);

    const upcomingRaces = this.props?.horseProfile?.upcoming_races;
    const upcomingRacesOpen = [];
    const jockey = [];
    if (upcomingRaces) {
      // eslint-disable-next-line array-callback-return
      await upcomingRaces?.map(() => {
        upcomingRacesOpen.push(false);
      });
      // eslint-disable-next-line array-callback-return
      await upcomingRaces?.map(() => {
        jockey.push(false);
      });
    }
    this.setState({ upcomingRacesOpen: upcomingRacesOpen, jockieOpen: jockey });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params?.horseId !== prevProps.match.params?.horseId) {
      const { dispatch } = this.props;
      dispatch(
        profileAction.getProfileHorse({
          horseID: this.props.match.params?.horseId,
        })
      );
      window.scrollTo(0, 0);
    }
  }

  handleTabs(val) {
    this.setState({ selectedTab: val });
  }

  handleRacesOpen(i) {
    const values = this.state.upcomingRacesOpen;
    values[i] = !this.state.upcomingRacesOpen[i];
    this.setState({ upcomingRacesOpen: values });
  }

  handleJockeyOpen(i) {
    const val = this.state.jockieOpen;
    val[i] = !this.state.jockieOpen[i];
    this.setState({ jockieOpen: val });
  }

  renderPtpResults() {
    if (this.props.horseProfile?.ptpList) {
      return (
        <Tab
          label={
            <strong style={{ color: "grey", fontSize: 13 }}>PTP Results</strong>
          }
        />
      );
    } else {
      return null;
    }
  }

  renderHorsePhrase() {
    const data = this.props.horseProfile;
    var allData = [];

    // const eq = data?.CAREERSTS?.split(":")[1]?.split("-")[0] !== "0";

    allData.push(
      <span style={{ marginRight: 8 }}>
        {this.props?.horseProfile?.horse_name}’s home track is{" "}
        {this.props?.horseProfile?.TRNPLACE}.
      </span>,
      <span style={{ marginRight: 8 }}>
        {this.props?.horseProfile?.horse_name} is a{" "}
        {this.props?.horseProfile?.AGE} year old {this.props?.horseProfile?.SEX}
        .
      </span>
    );

    if (data?.CAREERPRZ !== 0) {
      allData.push(
        <span style={{ marginRight: 8 }}>
          {data?.horse_name} has made a total of{" "}
          <NumberFormat
            value={data?.CAREERPRZ}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />{" "}
          in its career.
        </span>
      );
    }

    if (data?.CAREERSTS && data?.CAREERSTS?.split(":")[0] !== "0") {
      allData.push(
        <span style={{ marginRight: 8 }}>
          {data?.horse_name} has had {data?.CAREERSTS?.split(":")[0]} runs.
        </span>
      );
    }

    if (data?.last_start) {
      allData.push(
        <span style={{ marginRight: 8 }}>
          {data?.horse_name}’s last run was on{" "}
          {moment(data?.last_start).format("D-M-YYYY")}.
        </span>
      );
    }

    if (data?.last_win) {
      allData.push(
        <span style={{ marginRight: 8 }}>
          {data?.horse_name}’s last win was on{" "}
          {moment(data?.last_win)?.format("D-M-YYYY")}.
        </span>
      );
    }

    const strikeRate =
      (data?.CAREERSTS?.split(":")[1]?.split("-")[0] /
        data?.CAREERSTS?.split(":")[0]) *
      100;

    if (data?.CAREERSTS && strikeRate !== 0) {
      allData.push(
        <span style={{ marginRight: 8 }}>
          {data?.horse_name} has won{" "}
          {data?.CAREERSTS?.split(":")[1]?.split("-")[0]} times in its career
          and has a win strike rate of {strikeRate?.toFixed(2)}%.
        </span>
      );
    }

    if (data?.upcoming_races) {
      allData.push(
        <span style={{ marginRight: 8 }}>
          {data?.horse_name}’s next race is at{" "}
          {data?.upcoming_races[0]?.track_name} in race{" "}
          {data?.upcoming_races[0]?.race_num} on{" "}
          {moment(data?.upcoming_races[0]?.meetdate)?.format("D-M-YYYY")} at{" "}
          {data?.upcoming_races[0]?.race_time?.split(":")[0]}:
          {data?.upcoming_races[0]?.race_time?.split(":")[1]}.
        </span>
      );
    }

    return allData;
    //    (insert horse name)’s next race is at (insert venue) in race (insert race number) on (insert next race date) at (insert next race time).
  }

  renderTabs() {
    if (this.state.selectedTab === 0) {
      return (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: window.innerWidth > 700 ? "row" : "column",
              marginTop: 24,
            }}
          >
            <Col
              md={6}
              xs={12}
              style={{
                backgroundColor: "white",
                borderRadius: 8,
                padding: 0,
              }}
            >
              <div
                style={{
                  backgroundColor: "#142841",
                  paddingLeft: 16,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                }}
              >
                <h3
                  style={{
                    color: "white",
                    fontWeight: "500",
                    fontFamily: "Poppins",
                  }}
                >
                  Breeding
                </h3>
              </div>
              <div style={{ padding: 16 }}>
                <h5>
                  Sire: <strong>{this.props.horseProfile?.sire_name}</strong>
                </h5>
                <h5 style={{ marginTop: 8 }}>
                  Dam <strong>{this.props.horseProfile?.dam_name}</strong>
                </h5>
                <h5 style={{ marginTop: 8 }}>
                  Sire of Dam:{" "}
                  <strong>{this.props.horseProfile?.sireofdam}</strong>
                </h5>
              </div>
            </Col>

            <Col
              md={6}
              xs={12}
              style={{
                backgroundColor: "white",
                padding: 0,
                marginTop: window.innerWidth > 700 ? 0 : 16,
                marginLeft: window.innerWidth > 700 ? 4 : 0,
              }}
            >
              <div
                style={{
                  backgroundColor: "#142841",
                  paddingLeft: 16,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                }}
              >
                <h3
                  style={{
                    color: "white",
                    fontWeight: "500",
                    fontFamily: "Poppins",
                  }}
                >
                  Owners
                </h3>
              </div>
              <div style={{ padding: 16 }}>
                {this.props.horseProfile?.owner_name
                  ?.split(",")
                  ?.map((zone, i) => {
                    return <h5 key={i}>{zone}</h5>;
                  })}
              </div>
            </Col>
          </div>
          <div style={{ marginTop: 32 }}>
            <h3>Upcoming Races</h3>
            {this.props?.horseProfile?.upcoming_races ? (
              this.props?.horseProfile?.upcoming_races?.map((element, i) => {
                return (
                  <Link
                    to={`/horse-racing-tips/${checkRouteDate(
                      moment(element.meetdate)
                        .tz("Australia/Sydney")
                        .format("DD-MM-YYYY")
                    )}/${element?.track_name}/R${element?.race_num}/${
                      element?.point_id
                    }`}
                  >
                    <div
                      key={i}
                      style={{
                        marginTop: 16,
                        backgroundColor: "white",
                        padding: 8,
                        width: window.innerWidth > 700 ? "20%" : "100%",
                        borderRadius: 4,
                      }}
                    >
                      {/* <Badge>{moment(element?.meetdate).format('DD-MM-YYYY')} at {element?.race_time.split(':')[0]}:{element?.race_time.split(':')[1]}</Badge> */}
                      <div style={{ display: "flex", alignItems: "center" }}>
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
              <p style={{ marginTop: 24, opacity: "50%" }}>No Upcoming races</p>
            )}
          </div>
        </div>
      );
    } else if (this.state.selectedTab === 1) {
      return (
        <div>
          {console.log(
            "testttttttttttttttttttttttttttttttttttttttttt",
            this.props
          )}
          <StatsTable data={this.props.horseProfile} />
          <Results data={this.props.horseProfile} />
        </div>
      );
    } else if (this.state.selectedTab === 2) {
      return <PtpResults data={this.props.horseProfile} />;
    }
  }

  render() {
    if (this.props.loading) {
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
        <div>
          {this.props?.horseProfile?.horse_name ? (
            <Container>
              <Helmet>
                <title>
                  {`${this.props?.horseProfile?.horse_name}`}'s Profile | Stats
                  | Results | Horse Racing Profile
                </title>
                <meta charSet="utf-8" name="author" content="PTP Tips" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta
                  charSet="utf-8"
                  name="keywords"
                  content="PTP Tips , informations , horse , horse profile , horse racing , speed map , age , sex , breed , owner , jockey , stats , odds , jockey , live results , results , breding , Home Track , Prize Money , Upcoming Races , horse name "
                />
                <meta
                  charSet="utf-8"
                  name="description"
                  content={` Horse Profile for ${this.props?.horseProfile?.horse_name}. Every stat, every win you need to know about the horse.`}
                />
                <link
                  rel="canonical"
                  href={`https://www.ptptips.com.au/profile/horse/${this.props.match.params?.horseId}/${this.props?.horseProfile?.horseName}`}
                />
              </Helmet>

              <ProfileHead />

              <Col lg={7} style={{ padding: 0, marginTop: 8, marginBottom: 8 }}>
                <strong>{this.renderHorsePhrase()}</strong>
              </Col>

              <div style={{ marginTop: 3 }}>
                <Tabs
                  value={this.state.selectedTab}
                  onChange={(e, value) => this.handleTabs(value)}
                  style={{ backgroundColor: "white", marginTop: 0, padding: 0 }}
                  aria-label="scrollable auto tabs example"
                >
                  <Tab
                    label={
                      <strong style={{ color: "grey", fontSize: 13 }}>
                        Profile
                      </strong>
                    }
                  />
                  <Tab
                    label={
                      <strong style={{ color: "grey", fontSize: 13 }}>
                        Stats
                      </strong>
                    }
                  />
                  {this.renderPtpResults()}
                </Tabs>
              </div>

              <div>{this.renderTabs()}</div>
            </Container>
          ) : (
            <Container>
              <div style={{ textAlign: "center" }}>
                <div style={{ marginTop: 32 }}>
                  <FontAwesomeIcon icon={faExclamationCircle} size="4x" />
                  <h4 style={{ marginTop: 16 }}>
                    <strong>No Data Available</strong>
                  </h4>
                  <Link
                    to={"/horse-racing-tips/today"}
                    style={{ marginTop: -8 }}
                  >
                    Go back to selections
                  </Link>
                </div>
              </div>
            </Container>
          )}
        </div>
      );
    }
  }
}

// const styles = {
//   page: {
//     marginTop: 32,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     marginLeft: "18px",
//     marginRight: "18px",
//     paddingBottom: 32,
//   },
//   card: {
//     backgroundColor: "grey",
//     padding: "22px 12px",
//     maxWidth: "900px",
//     borderRadius: "8px",
//     boxShadow: "10px 10px 5px grey",
//   },
// };
const mapStateToProps = (state) => ({
  horseProfile: state.profilesReducer.horseProfile,
  loading: state.profilesReducer.horseProfileLoading,
});
export default withRouter(connect(mapStateToProps)(horse));
