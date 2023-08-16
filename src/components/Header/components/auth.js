import React from "react";
import {
  Container,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Alert,
  InputGroupText,
  InputGroup,
  InputGroupAddon,
  Input,
  Col,
  Row,
  Form,
  Label,
  FormGroup,
} from "reactstrap";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { CircularProgress } from "@material-ui/core";
import PhoneInput from "react-phone-input-2";
import moment from "moment-timezone";
// import { GoogleLogin } from "react-google-login";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, withRouter } from "react-router-dom";
//import moment from 'moment-timezone'
import { connect } from "react-redux";
// import { CircularProgress } from "@material-ui/core";

//import FacebookLogin from "react-facebook-login";
//import GoogleLogin from 'react-google-login';
import "./smbtn.css";
import { registerStep1, registerAds } from "../../../config/config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import "../styles.scss";
const authActions = require("../../../redux/actions/auth");
class User extends React.Component {
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
      country: "Australia",
      region: "Australian Capital Territory",
      emailError: "",
      errorCode: null,
      recaptcha: "",

      forgotClicked: false,
      isOpen: false,
      rOpen: false,
      fOpen: false,
      email: "",
      password: "",
      errorPopup: false,
      loading: false,
      showPass: false,
    };
    this.toggle = this.toggle.bind(this);
    this.login = this.login.bind(this);
    this.forgotPass = this.forgotPass.bind(this);
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

  toggle = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
    this.setState({ fOpen: false });
    const { dispatch } = this.props;
    dispatch(authActions.cleanMessages());
  };

  rtoggle = () => {
    this.setState((prevState) => ({
      rOpen: !prevState.rOpen,
    }));
  };

  async login(event) {
    this.setState({ loading: true });
    event.preventDefault();
    const { email, password } = this.state;
    const { dispatch } = this.props;
    await dispatch(
      authActions.loginClient(
        { email: email, password: password },
        this.props.history
      )
    ).then((res) => {
      if (res === "Ok") {
        this.setState({ isOpen: false, loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  async forgotPass(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    this.setState({ forgotClicked: true });
    await dispatch(
      authActions.forgotPassword({ email: this.state.email })
    ).then((resp) => {
      if ((resp = "Ok")) {
        this.setState({ forgotClicked: false });
      }
    });
  }

  renderMessage() {
    if (this.props.loginError) {
      if (this.props.errorStatus === 401) {
        return (
          <div>
            <Alert color="danger">
              {this.props.loginError}
              <br />
              <strong>
                <a
                  href="/"
                  onClick={this.forgotClick}
                  style={{ color: "white" }}
                >
                  Forgot Password?
                </a>
              </strong>
            </Alert>
          </div>
        );
      } else if (this.props.errorStatus === 400) {
        return (
          <div>
            <Alert color="danger">
              {this.props.loginError}
              <br />
              <Link to="/register" onClick={this.toggle}>
                <strong>
                  <span style={{ color: "white", cursor: "pointer" }}>
                    Create an Account
                  </span>
                </strong>
              </Link>
            </Alert>
          </div>
        );
      } else if (this.props.errorStatus === 300) {
        return (
          <div>
            <Alert color="danger">
              {this.props.loginError}
              <br />
            </Alert>
          </div>
        );
      }
    }
  }

  forgotClick = () => {
    this.setState({ fOpen: true });
  };

  onChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handlePhone = (phone) => {
    this.setState({ phone: phone });
  };

  handleCountry = (country) => {
    this.setState({ country: country });
    // console.log(country)
  };

  handleRegion = (region) => {
    this.setState({ region: region });
    // console.log(region)
  };

  handleChangeFirstName = (evt) => {
    this.setState({ firstName: evt.target.value });
    // console.log(this.state.firstName)
  };

  handleChangePassword = (evt) => {
    this.setState({ password: evt.target.value });
    // console.log(this.state.firstName)
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

  handleKeySpace = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
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

  renderMessageRegister() {
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

  onSignIn = (googleUser) => {
    var profile = googleUser.getBasicProfile();
    // console.log(profile)

    let data = {
      lName: profile.getFamilyName(),
      fName: profile.getGivenName(),
      Eml: profile.getEmail(),
    };

    this.setState({ firstName: data.fName });
    this.setState({ lastName: data.lName });
    this.setState({ email: data.Eml });
  };

  render() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      this.props.history.push("/");
    }
    return (
      <>
        <Container id="container">
          <div className="topbar" style={{ marginRight: 0 }}>
            <div className="topbar-item">
              <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
                <DropdownToggle
                  className="topbar-item "
                  style={{
                    marginRight: 5,
                    backgroundColor: "transparent",
                    borderWidth: 0,
                  }}
                >
                  <span
                    style={{
                      color: "white",
                      fontFamily: "Poppins",
                      fontSize: 16,
                    }}
                    size="sm"
                  >
                    Log In
                  </span>
                </DropdownToggle>

                <DropdownMenu
                  right
                  className="dropdown-menu-lg p-0"
                  hidden={this.state.fOpen}
                >
                  <div
                    className="d-flex align-items-center p-8 rounded-top"
                    style={{ textAlign: "center" }}
                  >
                    <div className="text-dark m-0 flex-grow-1 mr-3 font-size-h5">
                      Log In to Your Account .
                    </div>
                  </div>
                  <div
                    style={{
                      marginBottom: -8,
                      paddingRight: 24,
                      paddingLeft: 24,
                    }}
                  >
                    {this.renderMessage()}
                  </div>
                  <div />

                  <form onSubmit={this.login} style={{ padding: 24 }}>
                    <InputGroup>
                      <Input
                        value={this.state.email}
                        onChange={this.onChange}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email Address"
                      />
                    </InputGroup>

                    <InputGroup style={{ marginTop: 8 }}>
                      <Input
                        value={this.state.password}
                        onChange={this.onChange}
                        type={this.state.showPass ? "text" : "password"}
                        name="password"
                        id="examplePassword"
                        placeholder="Password"
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText
                          onClick={() =>
                            this.setState({ showPass: !this.state.showPass })
                          }
                        >
                          {this.state.showPass ? (
                            <FontAwesomeIcon
                              style={{ cursor: "pointer" }}
                              color="grey"
                              icon={faEye}
                              size="1x"
                            />
                          ) : (
                            <FontAwesomeIcon
                              style={{ cursor: "pointer" }}
                              color="grey"
                              icon={faEyeSlash}
                              size="1x"
                            />
                          )}
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>

                    <div
                      style={{ marginTop: 24 }}
                      className="form-group d-flex flex-wrap justify-content-between align-items-center"
                    >
                      <p
                        className="text-muted text-hover-primary"
                        onClick={this.forgotClick}
                        style={{ cursor: "pointer" }}
                      >
                        Forget Password ?
                      </p>
                    </div>
                    <div>
                      <Button
                        type="submit"
                        color="primary"
                        style={{ color: "white" }}
                        size="md"
                      >
                        {this.state.loading ? (
                          <CircularProgress
                            style={{ color: "white" }}
                            size={24}
                          />
                        ) : (
                          <strong
                            style={{
                              fontWeight: "500",
                              fontSize: 16,
                              fontFamily: "Poppins",
                            }}
                          >
                            Log In
                          </strong>
                        )}
                      </Button>
                      <div
                        // className="text-dark m-0 flex-grow-1 mr-3 font-size-h5"
                        style={{ fontSize: 12 }}
                      >
                        Don't have an account?
                        <Link
                          color="primary"
                          type="submit"
                          to="/register"
                          style={{ color: "#44bd32" }}
                        >
                          <strong>Join Now</strong>
                        </Link>
                      </div>
                    </div>
                  </form>
                </DropdownMenu>

                <DropdownMenu
                  className="dropdown-menu-lg"
                  hidden={!this.state.fOpen}
                >
                  <div className="d-flex align-items-center p-8 rounded-top">
                    <div>
                      <p style={{ fontSize: 16 }}>Forgot Password?</p>
                      <p style={{ fontSize: 12, textAlign: "justify" }}>
                        Looks like you’re having some trouble logging in. Enter
                        your email below and an Reset Password email will be
                        sent to your inbox.
                      </p>
                      <p
                        style={{
                          color: "red",
                          fontSize: 16,
                          marginBottom: -16,
                        }}
                      >
                        {this.props.forgotError}
                      </p>
                      <p
                        style={{
                          color: "blue",
                          fontSize: 16,
                          marginBottom: -16,
                        }}
                      >
                        {this.props.forgotMessage}
                      </p>
                    </div>
                  </div>
                  <div className="separator separator-solid" />

                  <form onSubmit={this.forgotPass} style={{ padding: 15 }}>
                    <p>Enter your email address</p>
                    <input
                      type="email"
                      name="email"
                      required
                      onChange={this.onChange}
                      className="form-control rounded-right border-0 bg-light text-dark opacity-80 email-field"
                      style={{ textAlign: "left" }}
                      placeholder="Email Address"
                    />

                    <div
                      style={{ marginTop: 24 }}
                      className="form-group d-flex flex-wrap justify-content-between align-items-center"
                    >
                      <Button
                        type="submit"
                        color="primary"
                        style={{ color: "white", width: "150px" }}
                        disabled={this.state.forgotClicked}
                        size="md"
                      >
                        <strong
                          style={{
                            fontWeight: "500",
                            fontSize: 16,
                            fontFamily: "Poppins",
                          }}
                        >
                          {this.state.forgotClicked ? (
                            <CircularProgress color="white" size={24} />
                          ) : (
                            "Forgot Pass"
                          )}
                        </strong>
                      </Button>
                    </div>
                  </form>
                </DropdownMenu>
              </Dropdown>
              {/* <Link to="/register">
            <Button
              onClick={this.openRegister}
              color="primary"
              style={{ color: "white", marginLeft: 16 }}
              size="md"
            >
              <strong
                style={{
                  fontWeight: "500",
                  fontSize: 16,
                  fontFamily: "Poppins",
                }}
              >
                Get Started
              </strong>
            </Button>
            </Link>
          
         
  */}

              <Dropdown isOpen={this.state.rOpen} toggle={this.rtoggle}>
                <DropdownToggle>
                  <>
                    <Button
                      color="primary"
                      style={{ color: "white", marginLeft: 16 }}
                      size="md"
                    >
                      <strong
                        style={{
                          fontWeight: "500",
                          fontSize: 16,
                          fontFamily: "Poppins",
                        }}
                      >
                        Get Started
                      </strong>
                    </Button>
                  </>
                </DropdownToggle>
                <DropdownMenu
                  // left
                  className="dropdown-menu-lg p-0"
                  hidden={this.state.fOpen}
                  style={{ marginTop: "3px", width: "auto" }}
                >
                  {/* <div  > */}

                  {/* <div style={{ textAlign: "center" }} >
                      <br />
                      <GoogleLogin

                        //Local Host OAuth:

                        // clientId="302225152433-btgihpb7uul6e6vuhdejesfkfd9kege1.apps.googleusercontent.com"

                        clientId="302225152433-1j994e7q7jsg2a4ie9pg9t0psm9nut8b.apps.googleusercontent.com"
                        buttonText="Start with Google"
                        onSuccess={this.onSignIn}
                        // onFailure={this.onSignInGoogleFailure}
                        cookiePolicy={"single_host_origin"}
                      />
                      <ul />
                    </div> */}
                  {/* </div> */}
                  <Col>
                    <Form
                      autoComplete="false"
                      onSubmit={(e) => {
                        e.preventDefault();
                        this.handleSubmit();
                      }}
                      style={{
                        backgroundColor: "white",
                        padding: 12,
                        borderRadius: 12,
                        // marginTop: 3,
                        marginBottom: 65,
                        marginRight: 0,
                      }}
                    >
                      {this.renderMessageRegister()}
                      <Row>
                        <Col xs="12" md="6">
                          <FormGroup>
                            <Label for="firstName">
                              First Name
                              <span style={{ color: "red" }}> *</span>
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
                              Last Name<span style={{ color: "red" }}> *</span>
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
                              Email Address
                              <span style={{ color: "red" }}> *</span>
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
                              Password<span style={{ color: "red" }}> *</span>
                            </Label>
                            <InputGroup>
                              <Input
                                onChange={this.handleChangePassword}
                                style={{ marginTop: 0 }}
                                onKeyPress={this.handleKeySpace}
                                type={this.state.showPass ? "text" : "password"}
                                required
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
                                    this.setState({
                                      showPass: !this.state.showPass,
                                    })
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
                        <Col xs="10" md="6">
                          <FormGroup>
                            <Label for="contry">Country</Label>
                            <CountryDropdown
                              className="form-control h-auto form-control-solid py-4 px-8"
                              value={this.state.country}
                              labelType="full"
                              onChange={(country) =>
                                this.handleCountry(country)
                              }
                              placeholder="Country"
                              id="country"
                            />
                          </FormGroup>
                        </Col>

                        <Col xs="10" md="6">
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
                      <Row>
                        <Col>
                          <FormGroup style={{ marginBottom: "28px" }}>
                            <Label for="phone">
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
                            Yes, I am over 18 years of age and accept the
                            website{" "}
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
                        <p
                          style={{ fontFamily: 12, marginTop: 4, fontSize: 16 }}
                        >
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
                          Kindly click on the link in the email to activate your
                          account. If you cannot find it, please check your junk
                          or spam. Please contact us for assistance.
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

                    <Modal
                      size="sm"
                      isOpen={this.state.errorPopup}
                      toggle={this.closeModal}
                    >
                      <ModalHeader toggle={this.closeModal}>
                        Confirm Update
                      </ModalHeader>
                      <ModalBody>{this.renderMessage()}</ModalBody>
                      <ModalFooter>
                        <Button
                          color="primary"
                          onClick={() => this.closeModal()}
                        >
                          Confirm
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </Col>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  isFetching: state.auth.isFetching,
  loginError: state.auth.loginError,
  loadingInit: state.auth.loadingInit,
  forgotError: state.auth.forgotError,
  forgotMessage: state.auth.forgotMessage,
  errorStatus: state.auth.errorStatus,
});

export default withRouter(connect(mapStateToProps)(User));
