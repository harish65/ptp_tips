import React, { Component } from "react";
import "./thanks.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default class Thanks extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: 132,
        }}
      >
        <Helmet>
          <title>Thank You</title>
          <meta charSet="utf-8" name="author" content="PTP Tips" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            charSet="utf-8"
            name="keywords"
            content="PTP Tips , thank you , contact , contacting us , thanks message , pop up , contacts us , contact for more , australia , ptp , horse racing , jockey , selections , results "
          />
          <meta name="description" content="Thank you for contacting us." />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <link rel="canonical" href="https://www.ptptips.com.au/thank-you" />
        </Helmet>

        <FontAwesomeIcon color="#44bd32" icon={faHeart} size="7x" />

        <h1 style={{ fontSize: 64, marginTop: 16, textAlign: "center" }}>
          <strong>Thank You!</strong>
        </h1>
        <h4 style={{ fontSize: 24 }}>for contacting Us.</h4>

        <h6 style={{ marginTop: 32, width: 300, textAlign: "center" }}>
          We successfully received your message and will get in touch with you
          shortly.
        </h6>

        <Link to="/horse-racing-tips/today">
          <Button color="primary" style={{ marginTop: 16 }}>
            <strong>Go To Selections</strong>
          </Button>
        </Link>
      </div>
    );
  }
}
