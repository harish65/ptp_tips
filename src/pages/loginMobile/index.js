import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Alert,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./login.scss";
import { CircularProgress } from "@material-ui/core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const authActions = require("../../redux/actions/auth");

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.goToLogin = this.goToLogin.bind(this);
    this.goToForgot = this.goToForgot.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.forgotPass = this.forgotPass.bind(this);
    this.login = this.login.bind(this);

    this.state = {
      page: 0,
      email: "",
      password: "",
      loading: false,
      showPass: false,
    };
  }

  componentDidMount() {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }

  componentWillMount() {
    if (this.props.currentUser) {
      this.props.history.goBack();
    }
  }

  goToLogin() {
    this.setState({ page: 0 });
    window.scrollTo(0, 0);
  }

  goToForgot() {
    this.setState({ page: 1 });
    window.scrollTo(0, 0);
  }

  async login(event) {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const { dispatch } = this.props;
    await dispatch(
      authActions.loginClient(
        { email: email, password: password },
        this.props.history
      )
    ).then((res) => {
      if (this.props.loginError) {
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
        this.props.history.goBack();
      }
    });
  }

  async forgotPass(e) {
    e.preventDefault();
    this.setState({ loading: true });
    const { dispatch } = this.props;
    dispatch(authActions.forgotPassword({ email: this.state.email })).then(
      (res) => {
        if (this.props.loginError) {
          this.setState({ loading: false });
        } else {
          this.setState({ loading: false });
        }
      }
    );
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
                <p
                  className="pointer"
                  onClick={this.forgotClick}
                  style={{ color: "white" }}
                >
                  Forgot Password?
                </p>
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
              <Link to="/register">
                <strong style={{ color: "white", cursor: "pointer" }}>
                  Create an Account
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

  renderForgotMsgs() {
    if (this.props.forgotMessage) {
      return (
        <Alert color="primary">
          {this.props.forgotMessage}
          <br />
        </Alert>
      );
    } else if (this.props.forgotError) {
      return (
        <Alert color="danger">
          {this.props.forgotError}
          <br />
        </Alert>
      );
    }
  }

  async logout() {
    const { dispatch, currentUser } = this.props;
    dispatch(authActions.logoutUser(currentUser.email));
    this.setState({ iOpen: false });
  }

  onChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  renderForm() {
    if (this.state.page === 0) {
      return (
        <Form
          style={{
            backgroundColor: "white",
            padding: 24,
            borderRadius: 4,
            marginTop: 24,
          }}
          onSubmit={this.login}
        >
          <FormGroup>
            <h3
              style={{
                color: "#142841",
                fontSize: 16,
                marginTop: 8,
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              Account LogIn
            </h3>
            <div>{this.renderMessage()}</div>
            <Input
              value={this.state.email}
              onChange={(val) => this.onChange(val)}
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Email Address"
            />
          </FormGroup>
          {/* <FormGroup style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Input value={this.state.password} onChange={(val) => this.onChange(val)} type="password" name="password" id="examplePassword" placeholder="Password" />
                    </FormGroup> */}

          <FormGroup>
            <InputGroup>
              <Input
                value={this.state.password}
                onChange={(val) => this.onChange(val)}
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
                    <FontAwesomeIcon color="grey" icon={faEye} size="1x" />
                  ) : (
                    <FontAwesomeIcon color="grey" icon={faEyeSlash} size="1x" />
                  )}
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>

          <Button style={{ width: "100%" }} color="primary">
            {this.state.loading ? (
              <CircularProgress size={24} />
            ) : (
              <strong>Log In</strong>
            )}
          </Button>
          <div
            style={{ textAlign: "center", marginTop: 16, cursor: "pointer" }}
            onClick={this.goToForgot}
          >
            <a href="/">Forgot Password ?</a>
          </div>
        </Form>
      );
    } else {
      return (
        <Form
          style={{
            backgroundColor: "white",
            padding: 24,
            borderRadius: 4,
            marginTop: 24,
          }}
          onSubmit={this.forgotPass}
        >
          <h3
            style={{
              color: "#142841",
              fontSize: 16,
              marginTop: 8,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Forgot Password
          </h3>
          <p style={{ textAlign: "center", marginTop: -8 }}>
            Enter your email address
          </p>
          <div>{this.renderForgotMsgs()}</div>
          <FormGroup>
            <Input
              value={this.state.email}
              onChange={(val) => this.onChange(val)}
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Email Address"
            />
          </FormGroup>
          <Button
            style={{ width: "100%" }}
            color="primary"
            onClick={this.forgotPass}
          >
            {this.state.loading ? (
              <CircularProgress size={24} />
            ) : (
              <strong>Forgot Password</strong>
            )}
          </Button>
          <div
            style={{ textAlign: "center", marginTop: 16, cursor: "pointer" }}
            onClick={this.goToLogin}
          >
            <a href="/">Back to Login</a>
          </div>
        </Form>
      );
    }
  }

  render() {
    return (
      <div
        className="box"
        style={{
          backgroundColor: "#142841",
          height: window.innerHeight,
          display: "flex",
          alignItems: "center",
          padding: 0,
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: 64,
          }}
        >
          <img
            src="https://www.ptptips.com.au/favicon.png"
            width="80px"
            alt="sample"
          />
        </div>

        <div>
          <div style={{ marginTop: 32 }}>{this.renderForm()}</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              marginTop: 32,
            }}
          >
            <p style={{ color: "white", fontSize: 14 }}>
              Dont have an Account ?
            </p>
            <Link to="/register">
              <Button
                size="small"
                color="primary"
                style={{ color: "white", backdropFilter: "blur(5px)" }}
              >
                <strong>Get Started</strong>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  isLoggedIn: state.auth.isLoggedIn,
  clientSession: state.auth.clientSession,
  loginError: state.auth.loginError,
  errorStatus: state.auth.errorStatus,
  forgotError: state.auth.forgotError,
  forgotMessage: state.auth.forgotMessage,
});

export default withRouter(connect(mapStateToProps)(Login));
