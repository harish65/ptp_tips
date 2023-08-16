import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./contactUs.scss";
import { Col, Row, Button } from "reactstrap";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { Modal, Form, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CircularProgress } from "@material-ui/core";
import ReCAPTCHA from "react-google-recaptcha";

/* REDUX */
//import {contactUsPTP} from '../../redux/actions/auth';
import { contactUs } from "../../config/config";

// const recaptchaRef = React.createRef();

class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      notice: false,
      noticeMessage: "",
      loading: false,
      recaptcha: "",
    };
  }

  componentDidMount() {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
    if (this.props.currentUser) {
      this.setState({
        email: this.props.currentUser.email,
        firstName: this.props.currentUser.firstName,
        lastName: this.props.currentUser.lastName,
        phone: this.props.currentUser?.phone,
      });
    } else {
      this.setState({
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
      });
    }
  }

  onRecaptcha = (value) => {
    if (value) {
      this.setState({ recaptcha: value });
    }
    // console.log("Captcha value:", value);
  };

  renderSocial = () => {
    if (window.innerWidth < 768) {
      return (
        <div className="social-text">
          <h4 style={{ marginTop: 32 }}>Connect With Us</h4>
          <p style={{ width: 280 }}></p>
          <div className="social-section">
            <a href="https://www.facebook.com/PTPTIPSAU">
              <img
                style={{ width: 24 }}
                src="data:image/svg+xml;base64,PHN2ZyBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMjEgMGgtMThjLTEuNjU1IDAtMyAxLjM0NS0zIDN2MThjMCAxLjY1NCAxLjM0NSAzIDMgM2gxOGMxLjY1NCAwIDMtMS4zNDYgMy0zdi0xOGMwLTEuNjU1LTEuMzQ2LTMtMy0zeiIgZmlsbD0iIzNiNTk5OSIvPjxwYXRoIGQ9Im0xNi41IDEydi0zYzAtLjgyOC42NzItLjc1IDEuNS0uNzVoMS41di0zLjc1aC0zYy0yLjQ4NiAwLTQuNSAyLjAxNC00LjUgNC41djNoLTN2My43NWgzdjguMjVoNC41di04LjI1aDIuMjVsMS41LTMuNzV6IiBmaWxsPSIjZmZmIi8+PC9zdmc+"
                alt=""
              />
            </a>
            <a href="https://www.instagram.com/ptptips/">
              <img
                style={{ width: 24, marginLeft: 14, marginRight: 16 }}
                alt=""
                src="data:image/svg+xml;base64,PHN2ZyBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8xXyIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgwIC0xLjk4MiAtMS44NDQgMCAtMTMyLjUyMiAtNTEuMDc3KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSItMzcuMTA2IiB4Mj0iLTI2LjU1NSIgeTE9Ii03Mi43MDUiIHkyPSItODQuMDQ3Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZDUiLz48c3RvcCBvZmZzZXQ9Ii41IiBzdG9wLWNvbG9yPSIjZmY1NDNlIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjYzgzN2FiIi8+PC9saW5lYXJHcmFkaWVudD48cGF0aCBkPSJtMS41IDEuNjMzYy0xLjg4NiAxLjk1OS0xLjUgNC4wNC0xLjUgMTAuMzYyIDAgNS4yNS0uOTE2IDEwLjUxMyAzLjg3OCAxMS43NTIgMS40OTcuMzg1IDE0Ljc2MS4zODUgMTYuMjU2LS4wMDIgMS45OTYtLjUxNSAzLjYyLTIuMTM0IDMuODQyLTQuOTU3LjAzMS0uMzk0LjAzMS0xMy4xODUtLjAwMS0xMy41ODctLjIzNi0zLjAwNy0yLjA4Ny00Ljc0LTQuNTI2LTUuMDkxLS41NTktLjA4MS0uNjcxLS4xMDUtMy41MzktLjExLTEwLjE3My4wMDUtMTIuNDAzLS40NDgtMTQuNDEgMS42MzN6IiBmaWxsPSJ1cmwoI1NWR0lEXzFfKSIvPjxwYXRoIGQ9Im0xMS45OTggMy4xMzljLTMuNjMxIDAtNy4wNzktLjMyMy04LjM5NiAzLjA1Ny0uNTQ0IDEuMzk2LS40NjUgMy4yMDktLjQ2NSA1LjgwNSAwIDIuMjc4LS4wNzMgNC40MTkuNDY1IDUuODA0IDEuMzE0IDMuMzgyIDQuNzkgMy4wNTggOC4zOTQgMy4wNTggMy40NzcgMCA3LjA2Mi4zNjIgOC4zOTUtMy4wNTguNTQ1LTEuNDEuNDY1LTMuMTk2LjQ2NS01LjgwNCAwLTMuNDYyLjE5MS01LjY5Ny0xLjQ4OC03LjM3NS0xLjctMS43LTMuOTk5LTEuNDg3LTcuMzc0LTEuNDg3em0tLjc5NCAxLjU5N2M3LjU3NC0uMDEyIDguNTM4LS44NTQgOC4wMDYgMTAuODQzLS4xODkgNC4xMzctMy4zMzkgMy42ODMtNy4yMTEgMy42ODMtNy4wNiAwLTcuMjYzLS4yMDItNy4yNjMtNy4yNjUgMC03LjE0NS41Ni03LjI1NyA2LjQ2OC03LjI2M3ptNS41MjQgMS40NzFjLS41ODcgMC0xLjA2My40NzYtMS4wNjMgMS4wNjNzLjQ3NiAxLjA2MyAxLjA2MyAxLjA2MyAxLjA2My0uNDc2IDEuMDYzLTEuMDYzLS40NzYtMS4wNjMtMS4wNjMtMS4wNjN6bS00LjczIDEuMjQzYy0yLjUxMyAwLTQuNTUgMi4wMzgtNC41NSA0LjU1MXMyLjAzNyA0LjU1IDQuNTUgNC41NSA0LjU0OS0yLjAzNyA0LjU0OS00LjU1LTIuMDM2LTQuNTUxLTQuNTQ5LTQuNTUxem0wIDEuNTk3YzMuOTA1IDAgMy45MSA1LjkwOCAwIDUuOTA4LTMuOTA0IDAtMy45MS01LjkwOCAwLTUuOTA4eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg=="
              />
            </a>
            <a href="https://twitter.com/PTPTIPS">
              <img
                style={{ width: 24 }}
                alt=""
                src="data:image/svg+xml;base64,PHN2ZyBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMjEuNTUyIDcuNzQ5YzAtLjIxNy0uMDA4LS40MjgtLjAxOC0uNjM2Ljk3Ni0uNjkzIDEuNzk3LTEuNTU4IDIuNDY2LTIuNTU0di0uMDAxYy0uODkzLjM5MS0xLjg0My42NTEtMi44MzUuNzc3IDEuMDItLjYwOSAxLjc5OS0xLjU2NiAyLjE2NS0yLjcxOS0uOTUxLjU2Ny0yLjAwMS45NjctMy4xMiAxLjE5MS0uOTAzLS45NjItMi4xOS0xLjU1Ny0zLjU5NC0xLjU1Ny0yLjcyNCAwLTQuOTE3IDIuMjExLTQuOTE3IDQuOTIxIDAgLjM5LjAzMy43NjUuMTE0IDEuMTIyLTQuMDktLjItNy43MS0yLjE2LTEwLjE0Mi01LjE0Ny0uNDI0LjczNy0uNjc0IDEuNTgtLjY3NCAyLjQ4NyAwIDEuNzA0Ljg3NyAzLjIxNCAyLjE4NiA0LjA4OS0uNzkxLS4wMTUtMS41NjYtLjI0NS0yLjIyMy0uNjA2di4wNTRjMCAyLjM5MSAxLjcwNSA0LjM3NyAzLjk0MiA0LjgzNS0uNzUyLjIwNi0xLjY3OC4xOTgtMi4yMjEuMDc4LjYzNyAxLjk0OCAyLjQ0NyAzLjM4MSA0LjU5NyAzLjQyOC0xLjY3NCAxLjMwOS0zLjggMi4wOTgtNi4xMDEgMi4wOTgtLjQwMyAwLS43OS0uMDE4LTEuMTc3LS4wNjcgMi4xOCAxLjQwNSA0Ljc2MiAyLjIwOCA3LjU0OCAyLjIwOCA5LjA1NCAwIDE0LjAwNC03LjUgMTQuMDA0LTE0LjAwMXoiIGZpbGw9IiM1NWFjZWUiLz48L3N2Zz4="
              />
            </a>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  renderSocialWeb = () => {
    if (window.innerWidth > 768) {
      return (
        <div className="social-text">
          <h4 style={{ marginTop: 32 }}>Connect With Us</h4>
          <p style={{ width: 280 }}></p>
          <div className="social-section">
            <a href="https://www.facebook.com/PTPTIPSAU">
              <img
                style={{ width: 24 }}
                alt=""
                src="data:image/svg+xml;base64,PHN2ZyBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMjEgMGgtMThjLTEuNjU1IDAtMyAxLjM0NS0zIDN2MThjMCAxLjY1NCAxLjM0NSAzIDMgM2gxOGMxLjY1NCAwIDMtMS4zNDYgMy0zdi0xOGMwLTEuNjU1LTEuMzQ2LTMtMy0zeiIgZmlsbD0iIzNiNTk5OSIvPjxwYXRoIGQ9Im0xNi41IDEydi0zYzAtLjgyOC42NzItLjc1IDEuNS0uNzVoMS41di0zLjc1aC0zYy0yLjQ4NiAwLTQuNSAyLjAxNC00LjUgNC41djNoLTN2My43NWgzdjguMjVoNC41di04LjI1aDIuMjVsMS41LTMuNzV6IiBmaWxsPSIjZmZmIi8+PC9zdmc+"
              />
            </a>
            <a href="https://www.instagram.com/ptptips/">
              <img
                style={{ width: 24, marginLeft: 14, marginRight: 16 }}
                alt=""
                src="data:image/svg+xml;base64,PHN2ZyBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8xXyIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgwIC0xLjk4MiAtMS44NDQgMCAtMTMyLjUyMiAtNTEuMDc3KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSItMzcuMTA2IiB4Mj0iLTI2LjU1NSIgeTE9Ii03Mi43MDUiIHkyPSItODQuMDQ3Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZDUiLz48c3RvcCBvZmZzZXQ9Ii41IiBzdG9wLWNvbG9yPSIjZmY1NDNlIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjYzgzN2FiIi8+PC9saW5lYXJHcmFkaWVudD48cGF0aCBkPSJtMS41IDEuNjMzYy0xLjg4NiAxLjk1OS0xLjUgNC4wNC0xLjUgMTAuMzYyIDAgNS4yNS0uOTE2IDEwLjUxMyAzLjg3OCAxMS43NTIgMS40OTcuMzg1IDE0Ljc2MS4zODUgMTYuMjU2LS4wMDIgMS45OTYtLjUxNSAzLjYyLTIuMTM0IDMuODQyLTQuOTU3LjAzMS0uMzk0LjAzMS0xMy4xODUtLjAwMS0xMy41ODctLjIzNi0zLjAwNy0yLjA4Ny00Ljc0LTQuNTI2LTUuMDkxLS41NTktLjA4MS0uNjcxLS4xMDUtMy41MzktLjExLTEwLjE3My4wMDUtMTIuNDAzLS40NDgtMTQuNDEgMS42MzN6IiBmaWxsPSJ1cmwoI1NWR0lEXzFfKSIvPjxwYXRoIGQ9Im0xMS45OTggMy4xMzljLTMuNjMxIDAtNy4wNzktLjMyMy04LjM5NiAzLjA1Ny0uNTQ0IDEuMzk2LS40NjUgMy4yMDktLjQ2NSA1LjgwNSAwIDIuMjc4LS4wNzMgNC40MTkuNDY1IDUuODA0IDEuMzE0IDMuMzgyIDQuNzkgMy4wNTggOC4zOTQgMy4wNTggMy40NzcgMCA3LjA2Mi4zNjIgOC4zOTUtMy4wNTguNTQ1LTEuNDEuNDY1LTMuMTk2LjQ2NS01LjgwNCAwLTMuNDYyLjE5MS01LjY5Ny0xLjQ4OC03LjM3NS0xLjctMS43LTMuOTk5LTEuNDg3LTcuMzc0LTEuNDg3em0tLjc5NCAxLjU5N2M3LjU3NC0uMDEyIDguNTM4LS44NTQgOC4wMDYgMTAuODQzLS4xODkgNC4xMzctMy4zMzkgMy42ODMtNy4yMTEgMy42ODMtNy4wNiAwLTcuMjYzLS4yMDItNy4yNjMtNy4yNjUgMC03LjE0NS41Ni03LjI1NyA2LjQ2OC03LjI2M3ptNS41MjQgMS40NzFjLS41ODcgMC0xLjA2My40NzYtMS4wNjMgMS4wNjNzLjQ3NiAxLjA2MyAxLjA2MyAxLjA2MyAxLjA2My0uNDc2IDEuMDYzLTEuMDYzLS40NzYtMS4wNjMtMS4wNjMtMS4wNjN6bS00LjczIDEuMjQzYy0yLjUxMyAwLTQuNTUgMi4wMzgtNC41NSA0LjU1MXMyLjAzNyA0LjU1IDQuNTUgNC41NSA0LjU0OS0yLjAzNyA0LjU0OS00LjU1LTIuMDM2LTQuNTUxLTQuNTQ5LTQuNTUxem0wIDEuNTk3YzMuOTA1IDAgMy45MSA1LjkwOCAwIDUuOTA4LTMuOTA0IDAtMy45MS01LjkwOCAwLTUuOTA4eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg=="
              />
            </a>
            <a href="https://twitter.com/PTPTIPS">
              <img
                style={{ width: 24 }}
                alt=""
                src="data:image/svg+xml;base64,PHN2ZyBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMjEuNTUyIDcuNzQ5YzAtLjIxNy0uMDA4LS40MjgtLjAxOC0uNjM2Ljk3Ni0uNjkzIDEuNzk3LTEuNTU4IDIuNDY2LTIuNTU0di0uMDAxYy0uODkzLjM5MS0xLjg0My42NTEtMi44MzUuNzc3IDEuMDItLjYwOSAxLjc5OS0xLjU2NiAyLjE2NS0yLjcxOS0uOTUxLjU2Ny0yLjAwMS45NjctMy4xMiAxLjE5MS0uOTAzLS45NjItMi4xOS0xLjU1Ny0zLjU5NC0xLjU1Ny0yLjcyNCAwLTQuOTE3IDIuMjExLTQuOTE3IDQuOTIxIDAgLjM5LjAzMy43NjUuMTE0IDEuMTIyLTQuMDktLjItNy43MS0yLjE2LTEwLjE0Mi01LjE0Ny0uNDI0LjczNy0uNjc0IDEuNTgtLjY3NCAyLjQ4NyAwIDEuNzA0Ljg3NyAzLjIxNCAyLjE4NiA0LjA4OS0uNzkxLS4wMTUtMS41NjYtLjI0NS0yLjIyMy0uNjA2di4wNTRjMCAyLjM5MSAxLjcwNSA0LjM3NyAzLjk0MiA0LjgzNS0uNzUyLjIwNi0xLjY3OC4xOTgtMi4yMjEuMDc4LjYzNyAxLjk0OCAyLjQ0NyAzLjM4MSA0LjU5NyAzLjQyOC0xLjY3NCAxLjMwOS0zLjggMi4wOTgtNi4xMDEgMi4wOTgtLjQwMyAwLS43OS0uMDE4LTEuMTc3LS4wNjcgMi4xOCAxLjQwNSA0Ljc2MiAyLjIwOCA3LjU0OCAyLjIwOCA5LjA1NCAwIDE0LjAwNC03LjUgMTQuMDA0LTE0LjAwMXoiIGZpbGw9IiM1NWFjZWUiLz48L3N2Zz4="
              />
            </a>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  closeNotice = () => {
    this.setState({ notice: false });
    // if (this.state.noticeMessage === 'Your message has been received, our cutomer service will be in contact with you shortly.') {
    //   this.props.history.push('/thank-you')
    // }
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  sendMessage = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    var { firstName, lastName, email, message, phone } = this.state;
    // const { dispatch, history } = this.props;

    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      message: message,
    };
    await contactUs(userData).then((response) => {
      if (response.message === "OK") {
        window.scrollTo(0, 0);
        this.props.history.push("/thank-you");
        // this.setState({ notice: true, noticeMessage: 'Your message has been received, our cutomer service will be in contact with you shortly.', loading: false })
      } else {
        this.setState({
          notice: true,
          noticeMessage: response.message,
          loading: false,
        });
      }
    });
  };

  render() {
    return (
      <div className="main">
        <Helmet>
          <title>Contact PTP Tips | Australian House For Horse Racing Tips</title>
          <meta name="author" content="PTP TIPS"></meta>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="keywords"
            content="PTP TIPS, contact us ,email ,facebook ,instagram, google ,FAQ, Send Now, Please enter your message, Notice, name ,first name ,last name ,australia ,ptp, ptptips "
          ></meta>
          <meta
            name="description"
            content="Contact PTP tips support team for more offers and customized tips for special users."
          />
          <link rel="canonical" href="https://www.ptptips.com.au/contactus" />
        </Helmet>
        <div className="page-head">
          <div className="text-center pt-15">
            <h1 className="font-weight-bolder text-dark mb-6">Contact Us</h1>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: 16,
          }}
        >
          <Col
            md={12}
            sm={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Row style={{ margin: 0 }}>
              <a
                href="mailto:support@ptptips.com.au"
                style={{
                  display: "flex",
                  width: 64,
                  height: 64,
                  borderRadius: 60,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#142841",
                }}
              >
                <FontAwesomeIcon
                  color="white"
                  icon={faEnvelopeOpenText}
                  size="2x"
                />
              </a>
              <div style={{ marginTop: 8, marginLeft: 16, textAlign: "left" }}>
                <p>
                  <strong>Contact Email</strong>
                </p>
                <div className="h6" style={{ marginTop: -8 }}>
                  <a href="mailto:support@ptptips.com.au">
                    support@ptptips.com.au
                  </a>
                </div>
              </div>
            </Row>
          </Col>
        </div>

        <Row style={{ margin: 0 }}>
          <Col xs={12} md={12} lg={4}>
            <div className="faq-section">
              <div className="faq-text">
                <h4 style={{ marginTop: 40 }}>FAQ</h4>
                <p style={{ width: 280 }}>
                  Get the answers to the most frequently asked questions{" "}
                  <a href="https://www.ptptips.com.au/faq">Here</a>.
                </p>
              </div>

              {this.renderSocialWeb()}
            </div>
          </Col>

          <Col xs={12} md={12} lg={4}>
            <div style={{ marginBottom: 32 }}>
              <div className="box-left">
                <div className="box-head">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <h2>Fill up your message</h2>
                    <div className="h4 text-dark-50">
                      This will go straight to our Inbox.
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <form className="rounded" onSubmit={this.sendMessage}>
                      <Row>
                        <Col className="input-group p-2 align-items-center first-name">
                          <input
                            type="text"
                            name="firstName"
                            required
                            value={this.state.firstName}
                            onChange={this.handleInputChange}
                            className="form-control rounded-right border-0 bg-transparent text-dark opacity-80 email-field"
                            placeholder="First Name"
                          />
                        </Col>

                        <Col
                          style={{ marginLeft: 8 }}
                          className="input-group p-2 align-items-center last-name"
                        >
                          <input
                            type="text"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.handleInputChange}
                            className="form-control rounded-right border-0 bg-transparent text-dark opacity-80 email-field"
                            placeholder="Last Name"
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col
                          xs={12}
                          className="input-group p-2 align-items-center first-name"
                        >
                          <input
                            type="email"
                            name="email"
                            required
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            className="form-control rounded-right border-0 bg-transparent text-dark opacity-80 email-field"
                            placeholder="Your email"
                          />
                        </Col>

                        <Col
                          xs={12}
                          className="input-group p-2 align-items-center last-name"
                        >
                          <input
                            type="numeric"
                            name="phone"
                            value={this.state.phone}
                            onChange={this.handleInputChange}
                            className="form-control rounded-right border-0 bg-transparent text-dark opacity-80 email-field"
                            placeholder="Your phone number"
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col
                          xs={12}
                          className="input-group p-2 align-items-center message"
                        >
                          <textarea
                            name="message"
                            required
                            onChange={this.handleInputChange}
                            className="form-control rounded-right border-0 bg-transparent text-dark opacity-80 message-field"
                            rows={8}
                            placeholder="Please enter your message"
                            defaultValue={""}
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Form>
                          <ReCAPTCHA
                            // ref={recaptchaRef}
                            sitekey="6LfPDokaAAAAAGyPw1MFrVEklyKwytD8P6IXE3OQ"
                            onChange={this.onRecaptcha}
                            type="image"
                            style={{ marginTop: 5 }}
                          />
                        </Form>
                      </Row>

                      <div className="send-section">
                        <Row>
                          <Button
                            style={{
                              marginTop: 5,
                              paddingLeft: 32,
                              paddingRight: 32,
                            }}
                            color="primary"
                            size="lg"
                            disabled={
                              this.state.loading || !this.state.recaptcha
                            }
                          >
                            {this.state.loading ? (
                              <CircularProgress color="white" size={24} />
                            ) : (
                              <strong>Send Now</strong>
                            )}
                          </Button>
                        </Row>
                      </div>
                    </form>

                    <Col xs={12} md={4}>
                      {this.renderSocial()}
                    </Col>
                  </div>

                  <Modal
                    size="sm"
                    isOpen={this.state.notice}
                    toggle={this.closeNotice}
                  >
                    <ModalHeader toggle={this.closeNotice}>Notice</ModalHeader>
                    <ModalBody>
                      <p>{this.state.noticeMessage}</p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.closeNotice}>
                        Ok
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  currentUser: state.auth.currentUser,
});

export default withRouter(connect(mapStateToProps)(ContactUs));
