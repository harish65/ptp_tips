import React, { Suspense, lazy } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
// import moment from 'moment-timezone'
// import MessengerCustomerChat from "react-messenger-customer-chat";
import { ToastContainer, toast } from "react-toastify";
import "./App.scss";
/* COMPONENTS */
import Loading from "./loading/Loading";
import Layout from "./layout";
import Header from "../components/Header/headerNew";
import Footer from "../components/Footer/footer";

import "react-toastify/dist/ReactToastify.css";
import "semantic-ui-css/semantic.min.css";
import "../../node_modules/line-awesome/dist/line-awesome/css/line-awesome.css";

/* PAGES */
const ErrorPage = lazy(() => import("../pages/error"));
const Register = lazy(() => import("../pages/register"));
//const Definition = lazy(() => import("../pages/definition"))
const Home = lazy(() => import("../pages/home/Home"));
const Faq = lazy(() => import("../pages/faq/Faq"));
const Contact = lazy(() => import("../pages/contactUs/ContactUs"));
const Selections = lazy(() => import("../pages/selections/Selections"));
const Account = lazy(() => import("../pages/account/Account"));
const Blackbook = lazy(() => import("../pages/blackbook/blackbook"));
const Verify = lazy(() => import("../pages/verify/Verify"));
const ForgotPass = lazy(() => import("../pages/forgotPass/forgotPass"));
const Policy = lazy(() => import("../pages/legal/privacy"));
const Unsubscribe = lazy(() => import("../pages/unsubscribe/Unsubscribe"));
const PromotionEmail = lazy(() => import("../pages/emailPromo/emailPromo"));
const Login = lazy(() => import("../pages/loginMobile/index"));
const FreeHorseTips = lazy(() =>
  import("../pages/freeHorseTips/freeHorseTips")
);
const Sitemap = lazy(() => import("../pages/sitemap/sitemap"));
const Thanks = lazy(() => import("../pages/thank-you/Thanks"));
const OnNow = lazy(() => import("../pages/onNow/onNow"));
const HorseProfile = lazy(() => import("../pages/profile/HorseProfile"));
const JockeyProfile = lazy(() => import("../pages/profile/JockeyProfile"));
const TrainerProfile = lazy(() => import("../pages/profile/TrainerProfile"));
// const MapComp = lazy(() => import("../pages/maps-comparaison/MapsComparison"));
// const SearchFilter = lazy(() => import("../pages/search-filter/SearchFilter"));
// const Filter = lazy(() => import("../pages/Filter/Filter"));
const VenueProfile = lazy(() => import("../pages/profile/VenueProfile"));
// const TopPerforming = lazy(() => import("../components/TopPerforming/TopPerforming"))
// const TopPerformingHorseDetails = lazy(() => import("../pages/bestPerformingDetails/bestPerformingHorseDetails"))
// const TopPerformingJockeyDetails = lazy(() => import("../pages/bestPerformingDetails/bestPerformingJockeyDetails"))
// const TopPerformingVenueDetails = lazy(() => import("../pages/bestPerformingDetails/bestPerformingVenueDetails"))

const ProTips = lazy(() => import("../pages/proTips"));
const Bookmakers = lazy(() => import("../pages/bookmarkers"));
const BookmakerDetails = lazy(() => import("../pages/bookmakerDetails"));
const StripeSuccessPage = lazy(() =>
  import("../pages/StripePayment/StripeSuccessPage")
);

const SubscriptionHistory = lazy(() =>
  import("../pages/StripePayment/SubscriptionHistory")
);
const Trasactionhistory = lazy(() =>
  import("../pages/StripePayment/StripePaymentHistory")
);

const StripePayment = lazy(() =>
  import("../pages/StripePayment/StripePayment")
);
const Checkout = lazy(() => import("../pages/StripePayment/Checkout"));
const Speedmap = lazy(() => import("../pages/speedmap/speedmap"));

/* CSS */

const CloseButton = ({ closeToast }) => (
  <i
    onClick={closeToast}
    style={{ color: "white" }}
    className="la la-close notifications-close"
  />
);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      isDisconnected: false,
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener("online", this.handleConnectionChange);
    window.addEventListener("offline", this.handleConnectionChange);
    window.addEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    this.setState({
      width: window.innerWidth,
    });
  }

  componentWillUnmount() {
    window.removeEventListener("online", this.handleConnectionChange);
    window.removeEventListener("offline", this.handleConnectionChange);
    window.removeEventListener("resize", this.updateDimensions);
  }

  handleConnectionChange = () => {
    const condition = navigator.onLine ? "online" : "offline";
    if (condition === "online") {
      const webPing = setInterval(() => {
        fetch("//google.com", {
          mode: "no-cors",
        })
          .then(() => {
            this.setState({ isDisconnected: false }, () => {
              return clearInterval(webPing);
            });
          })
          .catch(() => {
            this.setState({ isDisconnected: true });
            toast.error(<p style={{ color: "white" }}>Connection lost !</p>);
          })
          .then(() => {
            this.setState({ isDisconnected: false }, () => {
              return clearInterval(webPing);
            });
          })
          .catch(() => {
            this.setState({ isDisconnected: true });
            toast.error(
              <strong style={{ color: "white", fontFamily: "" }}>
                It seems there's a problem with your <br /> internet connection!
              </strong>
            );
          });
      }, 10000);
      return;
    }
    return (
      this.setState({ isDisconnected: true }),
      toast.error(
        <strong style={{ color: "white", fontFamily: "" }}>
          It seems there's a problem with your <br /> internet connection!
        </strong>
      )
    );
  };

  handleWidth() {
    if (this.state.width > 1550) {
      return "1550px";
    } else return "100%";
  }

  renderFooter() {
    const { pathname } = this.props.location;
    if (pathname === "/login") {
      return null;
    } else if (pathname === "/register") {
      return null;
    } else {
      return <Footer />;
    }
  }

  render() {
    // let today = moment().tz('Australia/Sydney').format("DD-MM-YYYY")
    // var tomorrow = moment().tz('Australia/Sydney').add(1, 'day').format("DD-MM-YYYY")

    return (
      <div
        style={{
          backgroundColor: this.props.dark ? "black" : "#eef0f4",
        }}
      >
        {!this.props.fullScreen ? (
          <div
            style={{
              position: "fixed",
              top: 0,
              width: " 100%",
              zIndex: 10,
            }}
          >
            <Header />
            {/* <div style={{ zIndex: 1 }}>
              <Header />
            </div> */}
          </div>
        ) : (
          <div style={{ backgroundColor: "black", height: 32 }}></div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <div style={{ minHeight: 800, width: this.handleWidth() }}>
            <Suspense fallback={<Loading />}>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                pauseOnHover
                hideProgressBar
                closeButton={<CloseButton />}
              />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>

                <Redirect strict from={"/policy/"} to={"/policy"} />
                <Route exact path="/policy">
                  <Policy />
                </Route>

                <Redirect
                  strict
                  from={"/free-horse-racing-tips/"}
                  to={"/free-horse-racing-tips"}
                />
                <Route exact path="/free-horse-racing-tips">
                  <FreeHorseTips />
                </Route>

                {/*SEO ROUTES ADDED*/}
                {/* <Redirect strict from={"/horse-racing-tips/today/"} to={"/horse-racing-tips/today"} /> */}
                <Route exact path="/horse-racing-tips/today/">
                  <Selections />
                </Route>

                <Route exact path="/horse-racing-tips/yesterday/">
                  <Selections />
                </Route>

                <Redirect
                  strict
                  from={"/horse-racing-tips/next-to-jump/"}
                  to={"/horse-racing-tips/next-to-jump"}
                />
                <Route exact path="/horse-racing-tips/next-to-jump/">
                  <Selections />
                </Route>

                <Route exact path="/thank-you">
                  <Thanks />
                </Route>

                <Route exact path="/horse-racing-tips/tomorrow/">
                  <Selections />
                </Route>

                <Route exact path="/horse-racing-tips/now/">
                  <OnNow />
                </Route>

                <Route exact path="/profile/horse/:horseId/:horseName">
                  <HorseProfile />
                </Route>

                <Route exact path="/profile/jockey/:jockeyId/:jockeyName">
                  <JockeyProfile />
                </Route>

                <Route exact path="/profile/trainer/:trainerId">
                  <TrainerProfile />
                </Route>

                <Route exact path="/profile/venue/:trackCode">
                  <VenueProfile />
                </Route>
                {/*..................*/}

                <Route exact path="/horse-racing-tips/:date">
                  <Selections />
                </Route>

                <Route path="/horse-racing-tips">
                  <Layout />
                </Route>

                <Redirect strict from={"/faq/"} to={"/faq"} />
                <Route exact path="/faq">
                  <Faq />
                </Route>

                <Redirect strict from={"/sitemap/"} to={"/sitemap"} />
                <Route exact path="/sitemap">
                  <Sitemap />
                </Route>

                <Redirect strict from={"/contactus/"} to={"/contactus"} />
                <Route exact path="/contactus">
                  <Contact />
                </Route>

                {/* <Redirect strict from={"/mapcomp/"} to={"/mapcomp"} />
                <Route exact path="/mapcomp">
                  <MapComp />
                </Route> */}

                {/* <Redirect
                  strict
                  from={"/searc-filter/"}
                  to={"/search-filter"}
                />
                <Route exact path="/search-filter">
                  <SearchFilter />
                </Route> */}

                <Route exact path="/register/:promoid">
                  <Register />
                </Route>

                <Route exact path="/register/:promoid/*">
                  <Register />
                </Route>

                <Redirect strict from={"/register/"} to={"/register"} />
                <Route exact path="/register">
                  <Register />
                </Route>

                <Redirect strict from={"/login/"} to={"/login"} />
                <Route exact path="/login">
                  <Login />
                </Route>

                <Route exact path="/unsubscribe/:id">
                  <Unsubscribe />
                </Route>

                <Route exact path="/promo/:id">
                  <PromotionEmail />
                </Route>
                {/*
                <Route exact path="/filter">
                  <Filter />
                </Route> */}

                {/* <Route exact path="/allprofiles">
                  <Profiles />
                </Route>

                <Route exact path="/topPerfoming">
                  <TopPerforming />
                </Route>

                <Route exact path="/topPerfomingHorse">
                  <TopPerformingHorseDetails />
                </Route>

                <Route exact path="/topPerfomingJockey">
                  <TopPerformingJockeyDetails />
                </Route>

                <Route exact path="/topPerfomingVenue">
                  <TopPerformingVenueDetails />
                </Route> */}

                {/*<Route exact path="/definition">
                  <Definition />
                </Route>*/}

                <Redirect strict from={"/pro-tips/"} to={"/pro-tips"} />
                <Route exact path="/pro-tips">
                  <ProTips />
                </Route>

                <Redirect
                  strict
                  from={"/stripe-payment/"}
                  to={"/stripe-payment"}
                />
                <Route exact path="/stripe-payment">
                  <StripePayment />
                </Route>

                <Redirect strict from={"/checkout/"} to={"/checkout"} />
                <Route exact path="/checkout">
                  <Checkout />
                </Route>

                <Redirect strict from={"/success/"} to={"/success"} />
                <Route exact path="/success">
                  <StripeSuccessPage />
                </Route>

                <Redirect
                  strict
                  from={"/subscription-history/"}
                  to={"/subscription-history"}
                />
                <Route exact path="/subscription-history">
                  <SubscriptionHistory />
                </Route>

                <Redirect
                  strict
                  from={"/transaction-history/"}
                  to={"/transaction-history"}
                />
                <Route exact path="/transaction-history">
                  <Trasactionhistory />
                </Route>

                <Redirect strict from={"/speed-map/"} to={"/speed-map"} />
                <Route exact path="/speed-map">
                  {/* <h1>thi sis pgae</h1> */}
                  <Speedmap/>
                </Route>

                <Redirect strict from={"/bookmakers/"} to={"/bookmakers"} />
                <Route exact path="/bookmakers">
                  <Bookmakers />
                </Route>

                <Route exact path="/bookmaker/:bookmakerId">
                  <BookmakerDetails />
                </Route>

                <Redirect strict from={"/account/"} to={"/account"} />
                <Route exact path="/account">
                  <Account />
                </Route>

                <Redirect strict from={"/blackbook/"} to={"/blackbook"} />
                <Route exact path="/blackbook">
                  <Blackbook />
                </Route>

                <Route exact path="/verify/:id">
                  <Verify />
                </Route>

                <Route exact path="/forgotPassword/:id">
                  <ForgotPass />
                </Route>

                <Redirect strict from={"/error/"} to={"/error"} />
                <Route exact path="/error">
                  <ErrorPage />
                </Route>

                {/*redirection old*/}
                <Redirect
                  strict
                  from={"/xyz/"}
                  to={"/horse-racing-tips/today"}
                />
                <Route exact path="/xyz">
                  <Redirect to={"/horse-racing-tips/today"} />
                </Route>

                <Redirect strict from={"/sing_in/"} to={"/login"} />
                <Route exact path="/sign_in">
                  <Redirect to={"/login"} />
                </Route>

                <Redirect strict from={"/sign_up/"} to={"/register"} />
                <Route exact path="/sign_up">
                  <Redirect to={"/register"} />
                </Route>

                <Route exact path="/definition">
                  <Redirect to={"/"} />
                </Route>

                <Redirect strict from={"/contact/"} to={"/contactus"} />
                <Route exact path="/contact">
                  <Redirect to={"/contactus"} />
                </Route>

                <Route exact path="/about">
                  <Redirect to={"/"} />
                </Route>

                <Route>
                  <Redirect to={"/horse-racing-tips/today"} />
                </Route>
              </Switch>
            </Suspense>
          </div>
        </div>

        {!this.props.fullScreen ? this.renderFooter() : null}

        {/* <MessengerCustomerChat
          pageId="113887910039269"
          appId="348721749704038"
          htmlRef="fb"
        /> */}
      </div>
    );
  }
}

// Redux
const mapStateToProps = (state) => ({
  fullScreen: state.auth.fullScreen,
  dark: state.auth.dark,
});

export default connect(mapStateToProps)(withRouter(App));
