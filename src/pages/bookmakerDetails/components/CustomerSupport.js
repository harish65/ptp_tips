import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Col, Row } from "reactstrap";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Image } from "semantic-ui-react";

import facebook from "../../../assets/Icons/facebook.svg";
import google from "../../../assets/Icons/google.svg";
import instagram from "../../../assets/Icons/instagram.svg";
import twitter from "../../../assets/Icons/twitter.svg";
import whatsapp from "../../../assets/Icons/whatsapp.svg";

const useStyles = makeStyles({
  root: {
    marginBottom: 12,
    padding: 16,
  },
  content: {
    padding: window.innerWidth < 900 ? "0 !important" : "16px !important",
  },
  row: {
    margin: "8px 0",
    padding: "8px 0",
    borderRadius: 4,
    "&:nth-child(even)": {
      background: "#0000001a",
    },
  },
  key: {
    margin: 0,
    fontSize: 13,
  },
  value: {
    fontSize: 13,
    fontWeight: 500,
    color: "#44bd32",
    overflow: "hidden",
  },
  link: {
    margin: "0 6px",
  },
});

export default (data) => {
  const { contact_support } = data.data;
  const classes = useStyles();
  return (
    <Card className={`${classes.root} contact-support-root`}>
      <CardContent className={classes.content}>
        <h4 className="section-header">Customer Support:</h4>
        <Row>
          <Col md={6} className="contact-info">
            <h5 className="section-sub-header">Contact Info</h5>
            <Row className={classes.row}>
              <Col xs={4} style={{ margin: "auto" }}>
                <h6 className={classes.key}>Email:</h6>
              </Col>
              <Col xs={8} style={{ margin: "auto" }}>
                <p className={classes.value}>{contact_support?.email}</p>
              </Col>
            </Row>
            <Row className={classes.row}>
              <Col xs={4} style={{ margin: "auto" }}>
                <h6 className={classes.key}>phone:</h6>
              </Col>
              <Col xs={8} style={{ margin: "auto" }}>
                <p className={classes.value}>{contact_support?.phone}</p>
              </Col>
            </Row>
            <Row className={classes.row}>
              <Col xs={4} style={{ margin: "auto" }}>
                <h6 className={classes.key}>PO BOX ADDRESS:</h6>
              </Col>
              <Col xs={8} style={{ margin: "auto" }}>
                <p className={classes.value}>
                  {contact_support?.postalAddress}
                </p>
              </Col>
            </Row>
            <Row className={classes.row}>
              <Col xs={4} style={{ margin: "auto" }}>
                <h6 className={classes.key}>International Phone:</h6>
              </Col>
              <Col xs={8} style={{ margin: "auto" }}>
                <p className={classes.value}>
                  {contact_support?.interNationalNumber}
                </p>
              </Col>
            </Row>
            <Row className={classes.row}>
              <Col xs={4} style={{ margin: "auto" }}>
                <h6 className={classes.key}>PRICING ENQUIRIES:</h6>
              </Col>
              <Col xs={8} style={{ margin: "auto" }}>
                <p className={classes.value}>
                  {contact_support?.pricingEnquiryEmail}
                </p>
              </Col>
            </Row>
          </Col>
          <Col
            md={6}
            className="social-media-links"
            style={{ textAlign: "center", margin: "auto" }}
          >
            <h5 className="section-sub-header">Social Media Presence</h5>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <a
                href={contact_support?.social?.facebook}
                target="_blank"
                className={classes.link}
                rel="noreferrer"
              >
                <Image src={facebook} alt="" circular size="mini" />
              </a>
              <a
                href={contact_support?.social?.google}
                target="_blank"
                className={classes.link}
                rel="noreferrer"
              >
                <Image src={google} alt="" circular size="mini" />
              </a>
              <a
                href={contact_support?.social?.instagram}
                target="_blank"
                className={classes.link}
                rel="noreferrer"
              >
                {" "}
                <Image src={instagram} alt="" circular size="mini" />
              </a>
              <a
                href={contact_support?.social?.twitter}
                target="_blank"
                className={classes.link}
                rel="noreferrer"
              >
                {" "}
                <Image src={twitter} alt="" circular size="mini" />
              </a>
              <a
                href={`https://wa.me/${contact_support?.social?.whatsapp}`}
                target="_blank"
                className={classes.link}
                rel="noreferrer"
              >
                {" "}
                <Image src={whatsapp} alt="" circular size="mini" />
              </a>
            </div>
          </Col>
        </Row>
      </CardContent>
    </Card>
  );
};
