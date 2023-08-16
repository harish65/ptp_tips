import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Container,
  CardHeader,
  Row,
  Col,
  Button,
} from "reactstrap";
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

/* CSS */
import "./faq.scss";

/* REDUX */

class Faq extends Component {
  renderSocial = () => {
    if (window.innerWidth <= 1025) {
      return (
        <div
          className="social-text"
          style={{
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h4 style={{ marginTop: 32 }}>Connect With Us</h4>
          <p style={{ width: 280 }}></p>
          <div>
            <a href="https://www.facebook.com/PTPTIPSAU">
              <img
                style={{ width: 24 }}
                alt=""
                src="data:image/svg+xml;base64,PHN2ZyBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMjEgMGgtMThjLTEuNjU1IDAtMyAxLjM0NS0zIDN2MThjMCAxLjY1NCAxLjM0NSAzIDMgM2gxOGMxLjY1NCAwIDMtMS4zNDYgMy0zdi0xOGMwLTEuNjU1LTEuMzQ2LTMtMy0zeiIgZmlsbD0iIzNiNTk5OSIvPjxwYXRoIGQ9Im0xNi41IDEydi0zYzAtLjgyOC42NzItLjc1IDEuNS0uNzVoMS41di0zLjc1aC0zYy0yLjQ4NiAwLTQuNSAyLjAxNC00LjUgNC41djNoLTN2My43NWgzdjguMjVoNC41di04LjI1aDIuMjVsMS41LTMuNzV6IiBmaWxsPSIjZmZmIi8+PC9zdmc+"
              />
            </a>
            <a href="https://www.instagram.com/ptptips/">
              <img
                alt=""
                style={{ width: 24, marginLeft: 14, marginRight: 16 }}
                src="data:image/svg+xml;base64,PHN2ZyBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8xXyIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgwIC0xLjk4MiAtMS44NDQgMCAtMTMyLjUyMiAtNTEuMDc3KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSItMzcuMTA2IiB4Mj0iLTI2LjU1NSIgeTE9Ii03Mi43MDUiIHkyPSItODQuMDQ3Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZDUiLz48c3RvcCBvZmZzZXQ9Ii41IiBzdG9wLWNvbG9yPSIjZmY1NDNlIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjYzgzN2FiIi8+PC9saW5lYXJHcmFkaWVudD48cGF0aCBkPSJtMS41IDEuNjMzYy0xLjg4NiAxLjk1OS0xLjUgNC4wNC0xLjUgMTAuMzYyIDAgNS4yNS0uOTE2IDEwLjUxMyAzLjg3OCAxMS43NTIgMS40OTcuMzg1IDE0Ljc2MS4zODUgMTYuMjU2LS4wMDIgMS45OTYtLjUxNSAzLjYyLTIuMTM0IDMuODQyLTQuOTU3LjAzMS0uMzk0LjAzMS0xMy4xODUtLjAwMS0xMy41ODctLjIzNi0zLjAwNy0yLjA4Ny00Ljc0LTQuNTI2LTUuMDkxLS41NTktLjA4MS0uNjcxLS4xMDUtMy41MzktLjExLTEwLjE3My4wMDUtMTIuNDAzLS40NDgtMTQuNDEgMS42MzN6IiBmaWxsPSJ1cmwoI1NWR0lEXzFfKSIvPjxwYXRoIGQ9Im0xMS45OTggMy4xMzljLTMuNjMxIDAtNy4wNzktLjMyMy04LjM5NiAzLjA1Ny0uNTQ0IDEuMzk2LS40NjUgMy4yMDktLjQ2NSA1LjgwNSAwIDIuMjc4LS4wNzMgNC40MTkuNDY1IDUuODA0IDEuMzE0IDMuMzgyIDQuNzkgMy4wNTggOC4zOTQgMy4wNTggMy40NzcgMCA3LjA2Mi4zNjIgOC4zOTUtMy4wNTguNTQ1LTEuNDEuNDY1LTMuMTk2LjQ2NS01LjgwNCAwLTMuNDYyLjE5MS01LjY5Ny0xLjQ4OC03LjM3NS0xLjctMS43LTMuOTk5LTEuNDg3LTcuMzc0LTEuNDg3em0tLjc5NCAxLjU5N2M3LjU3NC0uMDEyIDguNTM4LS44NTQgOC4wMDYgMTAuODQzLS4xODkgNC4xMzctMy4zMzkgMy42ODMtNy4yMTEgMy42ODMtNy4wNiAwLTcuMjYzLS4yMDItNy4yNjMtNy4yNjUgMC03LjE0NS41Ni03LjI1NyA2LjQ2OC03LjI2M3ptNS41MjQgMS40NzFjLS41ODcgMC0xLjA2My40NzYtMS4wNjMgMS4wNjNzLjQ3NiAxLjA2MyAxLjA2MyAxLjA2MyAxLjA2My0uNDc2IDEuMDYzLTEuMDYzLS40NzYtMS4wNjMtMS4wNjMtMS4wNjN6bS00LjczIDEuMjQzYy0yLjUxMyAwLTQuNTUgMi4wMzgtNC41NSA0LjU1MXMyLjAzNyA0LjU1IDQuNTUgNC41NSA0LjU0OS0yLjAzNyA0LjU0OS00LjU1LTIuMDM2LTQuNTUxLTQuNTQ5LTQuNTUxem0wIDEuNTk3YzMuOTA1IDAgMy45MSA1LjkwOCAwIDUuOTA4LTMuOTA0IDAtMy45MS01LjkwOCAwLTUuOTA4eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg=="
              />
            </a>
            <a href="https://twitter.com/PTPTIPS">
              <img
                alt=""
                style={{ width: 24 }}
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
    if (window.innerWidth > 1025) {
      return (
        <div className="social-text" style={{ marginLeft: 100 }}>
          <h4 style={{ marginTop: 32 }}>Connect With Us</h4>
          <p style={{ width: 230 }}></p>
          <div className="social-section">
            <a href="https://www.facebook.com/PTPTIPSAU">
              <img
                alt=""
                style={{ width: 24 }}
                src="data:image/svg+xml;base64,PHN2ZyBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMjEgMGgtMThjLTEuNjU1IDAtMyAxLjM0NS0zIDN2MThjMCAxLjY1NCAxLjM0NSAzIDMgM2gxOGMxLjY1NCAwIDMtMS4zNDYgMy0zdi0xOGMwLTEuNjU1LTEuMzQ2LTMtMy0zeiIgZmlsbD0iIzNiNTk5OSIvPjxwYXRoIGQ9Im0xNi41IDEydi0zYzAtLjgyOC42NzItLjc1IDEuNS0uNzVoMS41di0zLjc1aC0zYy0yLjQ4NiAwLTQuNSAyLjAxNC00LjUgNC41djNoLTN2My43NWgzdjguMjVoNC41di04LjI1aDIuMjVsMS41LTMuNzV6IiBmaWxsPSIjZmZmIi8+PC9zdmc+"
              />
            </a>
            <a href="https://www.instagram.com/ptptips/">
              <img
                alt=""
                style={{ width: 24, marginLeft: 14, marginRight: 16 }}
                src="data:image/svg+xml;base64,PHN2ZyBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8xXyIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgwIC0xLjk4MiAtMS44NDQgMCAtMTMyLjUyMiAtNTEuMDc3KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSItMzcuMTA2IiB4Mj0iLTI2LjU1NSIgeTE9Ii03Mi43MDUiIHkyPSItODQuMDQ3Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZDUiLz48c3RvcCBvZmZzZXQ9Ii41IiBzdG9wLWNvbG9yPSIjZmY1NDNlIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjYzgzN2FiIi8+PC9saW5lYXJHcmFkaWVudD48cGF0aCBkPSJtMS41IDEuNjMzYy0xLjg4NiAxLjk1OS0xLjUgNC4wNC0xLjUgMTAuMzYyIDAgNS4yNS0uOTE2IDEwLjUxMyAzLjg3OCAxMS43NTIgMS40OTcuMzg1IDE0Ljc2MS4zODUgMTYuMjU2LS4wMDIgMS45OTYtLjUxNSAzLjYyLTIuMTM0IDMuODQyLTQuOTU3LjAzMS0uMzk0LjAzMS0xMy4xODUtLjAwMS0xMy41ODctLjIzNi0zLjAwNy0yLjA4Ny00Ljc0LTQuNTI2LTUuMDkxLS41NTktLjA4MS0uNjcxLS4xMDUtMy41MzktLjExLTEwLjE3My4wMDUtMTIuNDAzLS40NDgtMTQuNDEgMS42MzN6IiBmaWxsPSJ1cmwoI1NWR0lEXzFfKSIvPjxwYXRoIGQ9Im0xMS45OTggMy4xMzljLTMuNjMxIDAtNy4wNzktLjMyMy04LjM5NiAzLjA1Ny0uNTQ0IDEuMzk2LS40NjUgMy4yMDktLjQ2NSA1LjgwNSAwIDIuMjc4LS4wNzMgNC40MTkuNDY1IDUuODA0IDEuMzE0IDMuMzgyIDQuNzkgMy4wNTggOC4zOTQgMy4wNTggMy40NzcgMCA3LjA2Mi4zNjIgOC4zOTUtMy4wNTguNTQ1LTEuNDEuNDY1LTMuMTk2LjQ2NS01LjgwNCAwLTMuNDYyLjE5MS01LjY5Ny0xLjQ4OC03LjM3NS0xLjctMS43LTMuOTk5LTEuNDg3LTcuMzc0LTEuNDg3em0tLjc5NCAxLjU5N2M3LjU3NC0uMDEyIDguNTM4LS44NTQgOC4wMDYgMTAuODQzLS4xODkgNC4xMzctMy4zMzkgMy42ODMtNy4yMTEgMy42ODMtNy4wNiAwLTcuMjYzLS4yMDItNy4yNjMtNy4yNjUgMC03LjE0NS41Ni03LjI1NyA2LjQ2OC03LjI2M3ptNS41MjQgMS40NzFjLS41ODcgMC0xLjA2My40NzYtMS4wNjMgMS4wNjNzLjQ3NiAxLjA2MyAxLjA2MyAxLjA2MyAxLjA2My0uNDc2IDEuMDYzLTEuMDYzLS40NzYtMS4wNjMtMS4wNjMtMS4wNjN6bS00LjczIDEuMjQzYy0yLjUxMyAwLTQuNTUgMi4wMzgtNC41NSA0LjU1MXMyLjAzNyA0LjU1IDQuNTUgNC41NSA0LjU0OS0yLjAzNyA0LjU0OS00LjU1LTIuMDM2LTQuNTUxLTQuNTQ5LTQuNTUxem0wIDEuNTk3YzMuOTA1IDAgMy45MSA1LjkwOCAwIDUuOTA4LTMuOTA0IDAtMy45MS01LjkwOCAwLTUuOTA4eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg=="
              />
            </a>
            <a href="https://twitter.com/PTPTIPS">
              <img
                alt=""
                style={{ width: 24 }}
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

  renderGetStarted = () => {
    if (this.props.currentUser) {
      return null;
    } else {
      return (
        <Col xs={12} md={12} lg={3} style={{ marginTop: 8 }}>
          <Col style={{ height: "100%" }}>
            <div
              className="signup-box"
              style={{
                height: "auto",
                marginTop: 16,
                borderRadius: 4,
                zIndex: 1,
                padding: 32,
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
                  <br /> a {this.props.subscription} Free trial.
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
        </Col>
      );
    }
  };

  render() {
    return (
      <Container fluid>
        <Helmet>
          <title>PTP Tips Frequently Asked Questions</title>
          <meta name="author" content="PTP TIPS"></meta>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="keywords"
            content="PTP TIPS faq FAQ Frequently Asked Questions knowledgebase question answer horses racing ptp australia emmail contacts us stats "
          ></meta>
          <meta
            name="description"
            content="Frequently Asked Questions | PTP TIPS"
          />
          <link rel="canonical" href="https://www.ptptips.com.au/faq" />
        </Helmet>

        <div style={{ marginBottom: 80 }}>
          <div className="page-head">
            <div className="text-center pt-15">
              <h1 className="font-weight-bolder text-dark mb-6">
                Frequently Asked Questions
              </h1>
              <div className="h4 text-dark-50">
                Deep Dive into our Knowledgebase
              </div>
            </div>
          </div>

          <Row>
            <Col xs={12} md={12} lg={3}>
              <div className="faq-section">
                <div className="faq-text" style={{ marginRight: 0 }}>
                  <h4 style={{ marginTop: 0 }}>Contact Us</h4>
                  <p style={{ width: 232 }}>
                    Got a question? We're here to answer. If you dont see your
                    question here, drop us a line on our{" "}
                    <a href="https://www.ptptips.com.au/contactus">Contact Us</a>.
                  </p>
                </div>
                {this.renderSocialWeb()}
              </div>
            </Col>

            <Col
              xs={12}
              md={12}
              lg={6}
              style={{ marginTop: 24, textAlign: "justify", padding: 0 }}
            >
              <Card className="card p-6">
                <CardHeader
                  className="card-header"
                  style={{ backgroundColor: "white", padding: 0 }}
                >
                  <div className="card-title font-size-h4 text-dark">
                    <div className="card-label">What Is PTP TIPS?</div>
                    <CardBody
                      className="pt-3 font-size-h6 font-weight-normal"
                      style={{ padding: 0 }}
                    >
                      <ul style={{ marginTop: 16 }}>
                        <li className="bullet-pt">
                          <strong>
                            PTP TIPS is a tipping website for the Australian
                            Thoroughbred Industry (horse racing). PTP TIPS
                            provides TIPS and Percentage Ratings for all horses,
                            races and track conditions with form.
                          </strong>
                        </li>
                        <ul>
                          <li className="bullet-pt">
                            <strong>
                              Horses in each race are automatically sorted from
                              the highest percentage to the lowest according to
                              the track condition. Also, ratings for 5 different
                              track conditions are available. By clicking on any
                              one of them, the selections will be sorted
                              according to that track. You may also sort
                              selections by horse number order by clicking on
                              the arrow on top of the horse number column. PTP
                              TIPS also provides its user with the following:
                            </strong>
                            <ul>
                              <li className="bullet-pt">
                                <strong>
                                  2 Australian licensed Bookmakers live odds
                                  comparison table
                                </strong>
                              </li>
                              <li className="bullet-pt">
                                <strong>
                                  Horse Numbers - Horse Names - Horse Weights -
                                  Horse Barriers - Horse Trainer - Jockey Colors
                                  - Jockey Name - Last 10 starts (short form) -
                                  Race Names - Race Distances - Race Classes -
                                  Racing Venue Table - Next 10 PTP TIPS - Last
                                  10 PTP TIPS
                                </strong>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </ul>
                    </CardBody>
                  </div>
                </CardHeader>
              </Card>

              <Card className="card p-6" style={{ marginTop: 16 }}>
                <CardHeader className="card-header" id="faqHeading2">
                  <div
                    className="card-title font-size-h4 text-dark"
                    data-toggle="collapse"
                    data-target="#faq2"
                    aria-expanded="true"
                    aria-controls="faq2"
                    role="button"
                  >
                    <div className="card-label">
                      What Is Your Win Strike Rate?
                    </div>
                    <CardBody className="card-body pt-3 font-size-h6 font-weight-normal">
                      <ul style={{ marginTop: 16, padding: 0 }}>
                        <li className="bullet-pt">
                          <strong>
                            PTP TIPS has had a win strike rate of just over 21%
                            for the past 4 years.
                          </strong>
                        </li>
                      </ul>
                    </CardBody>
                  </div>
                </CardHeader>
                {/*end::Body*/}
              </Card>

              <Card
                className="card p-6"
                style={{ marginTop: 16, textAlign: "justify" }}
              >
                <CardHeader className="card-header" id="faqHeading3">
                  <div
                    className="card-title font-size-h4 text-dark"
                    data-toggle="collapse"
                    data-target="#faq3"
                    aria-expanded="true"
                    aria-controls="faq3"
                    role="button"
                  >
                    <div className="card-label">
                      Where Are The Tips Located?
                    </div>
                    <CardBody className="card-body pt-3 font-size-h6 font-weight-normal text-dark-50">
                      <ul style={{ marginTop: 16, padding: 0 }}>
                        <li className="bullet-pt">
                          <strong style={{ color: "black" }}>
                            <Link to={`/horse-racing-tips/today`}>
                              Click here to view the selections table.
                            </Link>
                            Then proceed to choose the race you want a tip for.
                            The highest percentage rated horse according to the
                            track condition is our tip for that particular race.
                            Keep an eye out for the “PTP TIP” logo as some races
                            have 2 or even 3 equally rated horses with highest
                            percentage for the race.
                            <br />
                            Please note you must be logged in, in order to view
                            the selection percentage ratings.
                          </strong>
                        </li>
                      </ul>
                    </CardBody>
                  </div>
                </CardHeader>
              </Card>

              {/* <Card className="card p-6" style={{ marginTop: 16 }}>
              <CardHeader className="card-header" id="faqHeading4">
                <div className="card-title font-size-h4 text-dark" data-toggle="collapse" data-target="#faq4" aria-expanded="true" aria-controls="faq4" role="button">
                  <div className="card-label">How Much Does It Cost To Sign Up?</div>
                  <CardBody className="card-body pt-3 font-size-h6 font-weight-normal">
                    <ul style={{ marginTop: 16 }}>
                      <a href="/register"> <li className="bullet-pt"><strong>Free Trial (14 Days): FREE </strong></li></a>
                      <a href="/register"> <li className="bullet-pt"><strong>Monthly : $49.95 </strong></li></a>
                      <a href="/register"> <li className="bullet-pt"><strong>3 Months : $149</strong></li></a>
                      <a href="/register"><li className="bullet-pt"><strong>6 Months : $239</strong></li> </a>
                      <a href="/register"><li className="bullet-pt"><strong>1 Year : $339 </strong></li> </a>
                    </ul>
                  </CardBody>
                </div>
              </CardHeader>
            </Card> */}

              <Card className="card p-6" style={{ marginTop: 16 }}>
                <CardHeader className="card-header" id="faqHeading5">
                  <div
                    className="card-title font-size-h4 text-dark"
                    data-toggle="collapse"
                    data-target="#faq5"
                    aria-expanded="true"
                    aria-controls="faq5"
                    role="button"
                  >
                    <div className="card-label">How Do I Sign Up?</div>
                  </div>
                  <CardBody className="card-body pt-3 font-size-h6 font-weight-normal">
                    <ul style={{ marginTop: 16, padding: 0 }}>
                      <ul style={{ marginTop: 16, padding: 0 }}>
                        <li className="bullet-pt">
                          <strong>
                            PTP TIPS has a very simple and easy sign-up process.{" "}
                            <Link to="/register"> Click here to sign up.</Link>
                          </strong>
                        </li>
                        <ul>
                          <li className="bullet-pt">
                            <strong>
                              Step 1 – Enter your email address (Username),
                              desired Password, First & Last Names, Mobile
                              Number, Country & State
                            </strong>
                          </li>
                          <li className="bullet-pt">
                            <strong>
                              Step 2 – Check your inbox or junk for an email
                              from support@ptptips.com.au{" "}
                            </strong>
                          </li>
                          <li className="bullet-pt">
                            <strong>
                              Step 3 – Click confirm account. Your account will
                              be instantly created and you will be automatically
                              signed in
                            </strong>
                          </li>
                        </ul>
                      </ul>
                    </ul>
                  </CardBody>
                </CardHeader>
              </Card>

              <Card
                className="card p-6"
                style={{ marginTop: 16, textAlign: "justify" }}
              >
                <CardHeader className="card-header" id="faqHeading6">
                  <div
                    className="card-title font-size-h4 text-dark"
                    data-toggle="collapse"
                    data-target="#faq6"
                    aria-expanded="true"
                    aria-controls="faq6"
                    role="button"
                  >
                    <div className="card-label">
                      What Time Are The Tips Uploaded To The Website?
                    </div>
                    <CardBody className="card-body pt-3 font-size-h6 font-weight-normal">
                      <ul style={{ marginTop: 16, padding: 0 }}>
                        <li className="bullet-pt">
                          <strong>
                            Today’s tips are generated and uploaded to the
                            website between 9-11am. Even though they may have
                            appeared the day before under Tomorrow’s tips, they
                            are updated daily to assure our users are provided
                            with the most accurate data (horse scratching,
                            jockey changes, etc.).
                          </strong>
                        </li>
                        <li className="bullet-pt">
                          <strong>
                            Tomorrow’s Tips are generated and uploaded to the
                            website between 12-2pm daily.
                          </strong>
                        </li>
                      </ul>
                    </CardBody>
                  </div>
                </CardHeader>
              </Card>

              <Card className="card p-6" style={{ marginTop: 16 }}>
                <CardHeader className="card-header" id="faqHeading7">
                  <div
                    className="card-title font-size-h4 text-dark"
                    data-toggle="collapse"
                    data-target="#faq7"
                    aria-expanded="true"
                    aria-controls="faq7"
                    role="button"
                  >
                    <div className="card-label">
                      Can You Provide Me With A Standout Tip For The Day?
                    </div>
                    <CardBody className="card-body pt-3 font-size-h6 font-weight-normal">
                      <ul style={{ marginTop: 16, padding: 0 }}>
                        <li className="bullet-pt">
                          <strong>
                            Generally speaking, the answer is no. What we can do
                            is provide some pointers to assist you in finding a
                            standout or a few standouts. <br />
                            We advise to look at races with a lot of history
                            (bm/cl5+ etc.) and to check the SF (last 10 starts)
                            of the horses in the race to make sure there is
                            enough data for each horse. If there is insufficient
                            data for more than 1 horse then we suggest not to
                            look for any tips in that race. Furthermore, we
                            advise keeping an eye out for the percentage figure
                            of our top-rated horse in each race with form
                            (history). Generally, over 80% is a good start.{" "}
                            <br />
                            Then we like to look at the difference in percentage
                            points between the top-rated horse and the 2nd top
                            rated horse. If there is a difference of +20% then
                            this may be deemed to be a standout selection.
                            <br />
                            Lastly the market must be taken into consideration.
                            If the top selection is at 84%, 35% above the 2nd
                            rated horse, it opened up in the markets at $8.60
                            and is currently paying $3.50 then it would be fair
                            to say that you have found yourself a ‘standout tip’
                            for the day. <br />
                            Please do keep in mind that given all of this, we
                            are still gambling and anything can happen so please
                            remember to gamble responsibly.
                          </strong>
                        </li>
                      </ul>
                    </CardBody>
                  </div>
                </CardHeader>
                {/*end::Body*/}
              </Card>

              <Card className="card p-6" style={{ marginTop: 16 }}>
                <CardHeader className="card-header" id="faqHeading8">
                  <div
                    className="card-title font-size-h4 text-dark"
                    data-toggle="collapse"
                    data-target="#faq8"
                    aria-expanded="true"
                    aria-controls="faq8"
                    role="button"
                  >
                    <div className="card-label">
                      Can I Place Bets With PTP TIPS?
                    </div>
                    <CardBody className="card-body pt-3 font-size-h6 font-weight-normal">
                      <ul style={{ marginTop: 16, padding: 0 }}>
                        <li className="bullet-pt">
                          <strong>
                            No. PTP TIPS is not a bookmaker! PTP TIPS is not
                            licensed nor claims to be licensed to accept bets in
                            any jurisdiction. PTP TIPS is purely a tipping and
                            ratings website with additional information for
                            punters who are interested in the Australian
                            Thoroughbred Industry. If punters want to place
                            bets, they may do so with any of the 2 Australian
                            licensed bookmakers that are displaying odds on our
                            website.
                          </strong>
                        </li>
                      </ul>
                    </CardBody>
                  </div>
                </CardHeader>
              </Card>
            </Col>
            {this.renderGetStarted()}
          </Row>

          {this.renderSocial()}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  subscription: state.auth.subscription,
});

export default withRouter(connect(mapStateToProps)(Faq));
