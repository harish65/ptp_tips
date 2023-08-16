import React from "react";
import { connect } from "react-redux";
import moment from "moment-timezone";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import PhoneInput from "react-phone-input-2";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { CircularProgress } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ReCAPTCHA from "react-google-recaptcha";
import { registerStep1, registerAds } from "../../config/config";
import { Link } from "react-router-dom";
// import {FcGoogle} from "react-icons/fc"

// import Footer from "../../components/Footer";
// import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

/* CUSTOM BOX */
import { withStyles } from "@material-ui/core/styles";
//import LegalNoticePopup from "./component/LegalNoticePopups/LegalNoticePopup";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Col,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  Badge,
  Alert,
  InputGroupText,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import "react-phone-input-2/lib/style.css";

// CSS
import "./register.scss";

// STRIPE
//import { loadStripe } from "@stripe/stripe-js"
//import { STRIPE_PUBLISHABLE_KEY } from '../../config/config'
//const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

// const recaptchaRef = React.createRef();

const styles = () => ({
  boxWrapper: {
    marginBottom: "55px",
    minHeight: "calc(26vh + 260px)",
  },
});

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notice: false,
      error: false,
      errorMessage: false,
      phoneMessage: "",
      over18: false,
      firstName: "",
      lastName: "",
      phone: "",
      email: "",

      password: "",

      country: "Australia",
      region: "Australian Capital Territory",
      loading: false,
      emailError: "",
      errorCode: null,
      showPass: false,
      recaptcha: "",
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      this.props.history.push("/");
    }
    if (this.props.match.params.promoid) {
      registerAds({ promoId: this.props.match.params.promoid });
    }
  }

  onRecaptcha = (value) => {
    if (value) {
      this.setState({ recaptcha: value });
    }
    // console.log("Captcha value:", value);
  };

  handlePhone = (phone) => {
    this.setState({ phone: phone });
  };

  handleCountry = (country) => {
    this.setState({ country: country });
  };

  handleRegion = (region) => {
    this.setState({ region: region });
  };

  handleChangeFirstName = (evt) => {
    this.setState({ firstName: evt.target.value });
    // console.log(this.state.firstName)
  };

  handleChangePassword = (evt) => {
    this.setState({ password: evt.target.value });
    // console.log(this.state.password)
  };

  handleChangeLastName = (evt) => {
    this.setState({ lastName: evt.target.value });
    // console.log(this.state.lastName)
  };

  handleChangeEmail = (evt) => {
    this.setState({ email: evt.target.value });
    // console.log(this.state.email)
  };
  handleBox = (e) => {
    this.setState({ over18: e.target.checked });
  };

  closeNotice = () => {
    this.setState({ notice: false });
    let today = moment().tz("Australia/Sydney").format("DD-MM-YYYY");
    this.props.history.push(`/horse-racing-tips/${today}`);
  };

  closeWithoutRedirect = () => {
    this.setState({ notice: false });
    window.scrollTo(0, 0);
  };

  closeError = () => {
    window.scrollTo(0, 0);
    this.setState({ error: false, errorMessage: "" });
  };

  handleSubmit = async () => {
    //if(this.state.phone !== ''){
    // const { dispatch } = this.props
    this.setState({ loading: true, phoneMessage: "" });
    let userDetails = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      mobile: this.state.phone,
      country: this.state.country,
      state: this.state.region,
    };
    await registerStep1(userDetails).then((response) => {
      if (response.status === 200) {
        //we have to notice the user to check his inbox in order to verify his email
        this.setState({ loading: false, notice: true, error: false });
      } else {
        this.setState({
          errorMessage: response.message,
          loading: false,
          emailError: "red",
          errorCode: response.status,
        });
        window.scrollTo(0, 0);
      }
      // console.log(response.status)
    });
  };

  handleKeySpace = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  renderMessage() {
    if (this.state.errorCode === 400) {
      return (
        <Alert color="danger">
          <div>
            {this.state.email + " " + this.state.errorMessage}
            <br />
            {/* <Link style={{color:'white'}} to="/login"><strong>Login to your account</strong></Link> */}
            <strong>Login to your account</strong>
          </div>
        </Alert>
      );
    } else if (this.state.errorCode === 200) {
      return (
        <Alert color="primary">
          <div>
            {this.state.notice}
            <br />
          </div>
        </Alert>
      );
    }
  }

  google(data) {
    this.setState({ firstName: data.fName });
    this.setState({ lastName: data.lName });
    this.setState({ email: data.Eml });
  }

  onSignIn = async (googleUser) => {
    var profile = googleUser.getBasicProfile();
    // console.log(profile)

    let googleDetails = {
      lastName: profile.getFamilyName(),
      firstName: profile.getGivenName(),
      email: profile.getEmail(),
    };

    this.setState({ firstName: googleDetails.firstName });
    this.setState({ lastName: googleDetails.lastName });
    this.setState({ email: googleDetails.email });
  };

  render() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      this.props.history.push("/");
    }
    // const Background = "https://cdn.cnn.com/cnnnext/dam/assets/181217155518-winning-post-breeders-cup-turf-super-169.jpg"

    return (
      <Container id="container">
        <Helmet>
          <title>Register</title>
          <meta
            name="description"
            content="Sign Up and become a premium member with PTP membership in order to get the best tips in town."
          />
          <link rel="canonical" href="https://www.ptptips.com.au/register" />
        </Helmet>

        <div>
          <h1 style={{ textAlign: "center", marginTop: 15 }}>
            <strong>Create a New Account</strong>
          </h1>
          {/* <div style={{ textAlign: "center" }}>
            <GoogleLogin
              //Local Host OAuth:

              // clientId="302225152433-btgihpb7uul6e6vuhdejesfkfd9kege1.apps.googleusercontent.com"
              buttonText="Start with GOOGLE"
              clientId="302225152433-1j994e7q7jsg2a4ie9pg9t0psm9nut8b.apps.googleusercontent.com"
              onSuccess={this.onSignIn}
              onFailure={this.onSignInGoogleFailure}
              cookiePolicy={"single_host_origin"}
            />
            <br />
            <ul />
          </div> */}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Col xs="12">
            <Col
              xs="12"
              md="12"
              className="ad-box"
              style={{ borderRadius: 10, marginTop: 0, overflowY: "hidden" }}
            >
              <div
                style={{
                  height: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <h2
                  style={{ color: "white", fontSize: 22, fontWeight: "bold" }}
                >
                  6 Months
                </h2>
                <Badge
                  colmdor="primary"
                  style={{
                    fontSize: 19,
                    letterSpacing: 2,
                    fontWeight: "bold",
                    backgroundColor: "#44bd32",
                    color: "white",
                    marginLeft: 16,
                  }}
                >
                  FREE TRIAL
                </Badge>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 18,
                    marginTop: -24,
                    marginBottom: 24,
                    fontWeight: "400",
                  }}
                >
                  NO CC REQUIRED
                </span>
              </div>
            </Col>

            <Form
              autoComplete="false"
              onSubmit={(e) => {
                e.preventDefault();
                this.handleSubmit();
              }}
              // onValid={(e) => console.log("booom")}
              style={{
                backgroundColor: "white",
                padding: 12,
                borderRadius: 12,
                // marginTop: 3,
                marginBottom: 65,
                marginRight: 0,
              }}
            >
              {this.renderMessage()}
              <Row>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label for="firstName">
                      First Name
                      <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      type="text"
                      required
                      name="firstName"
                      id="firstName"
                      placeholder={
                        this.state.firstName
                          ? this.state.firstName
                          : "Your First Name"
                      }
                      value={this.state.firstName}
                      onChange={this.handleChangeFirstName}
                    />
                  </FormGroup>
                </Col>

                <Col xs="12" md="6">
                  <FormGroup>
                    <Label for="lastName">
                      Last Name<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      type="text"
                      required
                      name="lastName"
                      id="lastName"
                      value={this.state.lastName}
                      placeholder={
                        this.state.lastName
                          ? this.state.lastName
                          : "Your Last Name"
                      }
                      onChange={this.handleChangeLastName}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={6}>
                  <FormGroup>
                    <Label for="email">
                      Email Address<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      type="email"
                      required
                      name="email"
                      id="email"
                      onKeyPress={this.handleKeySpace}
                      value={this.state.email}
                      onChange={this.handleChangeEmail}
                      style={{ borderColor: this.state.emailError }}
                      placeholder={
                        this.state.email
                          ? this.state.email
                          : "Your Email Address"
                      }
                    />
                  </FormGroup>
                </Col>
                <Col xs={12} md={6}>
                  <FormGroup>
                    <Label for="password">
                      Password<span style={{ color: "red" }}>*</span>
                    </Label>
                    <InputGroup>
                      <Input
                        onChange={this.handleChangePassword}
                        style={{ marginTop: 0 }}
                        type={this.state.showPass ? "text" : "password"}
                        required
                        value={this.state.password}
                        onKeyPress={this.handleKeySpace}
                        name="password"
                        id="password"
                        placeholder="Create a unique password"
                      />
                      <InputGroupAddon
                        addonType="append"
                        style={{ cursor: "pointer" }}
                      >
                        <InputGroupText
                          onClick={() =>
                            this.setState({ showPass: !this.state.showPass })
                          }
                        >
                          {this.state.showPass ? (
                            <FontAwesomeIcon
                              color="grey"
                              icon={faEye}
                              size="1x"
                            />
                          ) : (
                            <FontAwesomeIcon
                              color="grey"
                              icon={faEyeSlash}
                              size="1x"
                            />
                          )}
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={6}>
                  <FormGroup>
                    <Label for="phone">
                      Phone{" "}
                      <span style={{ color: "red" }}>
                        {this.state.phoneMessage}
                      </span>
                    </Label>
                    <PhoneInput
                      country={"au"}
                      onChange={(phone) => this.handlePhone(phone)}
                      inputStyle={{
                        height: "45px",
                        width: "100%",
                        borderColor: "#d2d8dd",
                        textAlign: "left",
                      }}
                      id="phone"
                    />
                  </FormGroup>
                </Col>
                <Col xs="6" md="3">
                  <FormGroup>
                    <Label for="contry">Country</Label>
                    <CountryDropdown
                      className="form-control h-auto form-control-solid py-4 px-8"
                      value={this.state.country}
                      labelType="full"
                      onChange={(country) => this.handleCountry(country)}
                      placeholder="Country"
                      id="country"
                    />
                  </FormGroup>
                </Col>

                <Col xs="6" md="3">
                  <FormGroup>
                    <Label for="region">State</Label>
                    <RegionDropdown
                      labelType="full"
                      className="form-control h-auto form-control-solid py-4 px-8"
                      country={this.state.country}
                      value={this.state.region}
                      placeholder="Text"
                      onChange={(region) => this.handleRegion(region)}
                      id="region"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup tag="fieldset">
                <FormGroup check>
                  <Label check>
                    <Input
                      name="over18"
                      defaultChecked={this.state.over18}
                      onChange={this.handleBox}
                      type="checkbox"
                    />{" "}
                    Yes, I am over 18 years of age and accept the website{" "}
                    <a href="/policy" style={{ color: "#44bd32" }}>
                      Terms and Conditions
                    </a>
                  </Label>
                </FormGroup>
              </FormGroup>
              <>
                <ReCAPTCHA
                  // ref={recaptchaRef}
                  sitekey="6LfPDokaAAAAAGyPw1MFrVEklyKwytD8P6IXE3OQ"
                  onChange={this.onRecaptcha}
                  type="image"
                />
              </>

              <Button
                type="submit"
                color="primary"
                style={{ width: "150px", marginTop: 10 }}
                disabled={!this.state.over18 || !this.state.recaptcha}
              >
                {this.state.loading ? (
                  <CircularProgress color="white" size={24} />
                ) : (
                  <strong>Create Account</strong>
                )}
              </Button>
              <br />
            </Form>
          </Col>

          <Modal isOpen={this.state.notice} style={{ marginTop: 80 }}>
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
              <p style={{ fontFamily: 12, marginTop: 4, fontSize: 16 }}>
                {/*An email has been sent to your email, please check you inbox,
                click the link in our email to confirm your account
                and you're ready to go!
                Please note that if you can't find our email be sure to check your Junk or SPAM folders*/}
                An activation link has been sent to {this.state.email}
                <br />
                <span
                  onClick={this.closeWithoutRedirect}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  click here to edit email.
                </span>{" "}
                <br />
                Kindly click on the link in the email to activate your account.
                If you cannot find it, please check your junk or spam. Please
                contact us for assistance.
              </p>
            </ModalBody>
            <ModalFooter
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Link to="/horse-racing-tips/today">
                <Button onClick={this.closeNotice} color="primary">
                  <strong>Okay</strong>
                </Button>
              </Link>
              {""}
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.error} style={{ marginTop: 80 }}>
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
              <p
                style={{
                  fontFamily: 12,
                  marginTop: 4,
                  fontSize: 16,
                  color: "red",
                }}
              >
                {this.state.errorMessage}
              </p>
            </ModalBody>
            <ModalFooter
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Button onClick={this.closeError} color="danger">
                <strong>Okay</strong>
              </Button>
              {""}
            </ModalFooter>
          </Modal>
        </div>

        {/*<LegalNoticePopup />*/}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  status: state.auth.status,
  subscription: state.auth.subscription,
});

export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(Register))
);
