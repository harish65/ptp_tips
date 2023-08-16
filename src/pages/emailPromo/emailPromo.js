import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { checkUserPromo } from "../../../src/config/config";
import { Helmet } from "react-helmet";
import { signInCommingFromEmail } from "../../../src/redux/actions/auth";
import moment from "moment-timezone";

class PromotionEmail extends Component {
  z;
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  componentDidMount() {
    this.checkUser();
  }

  async checkUser() {
    let now = moment().tz("Australia/Sydney").format("DD-MM-YYYY");
    const { dispatch } = this.props;
    await checkUserPromo(this.props.match.params.id)
      .then((res) => {
        if (res.status === 200) {
          //dispatch redux auto login
          dispatch(signInCommingFromEmail(res.response));
          if (res.emailClick === 0) {
            this.props.history.push(`/account`);
          } else {
            this.props.history.push(`/horse-racing-tips/${now}`);
          }
        } else {
          this.props.history.push(`/horse-racing-tips/${now}`);
        }
      })
      .catch((err) => {
        this.props.history.push(`/horse-racing-tips/${now}`);
      });
  }

  render() {
    return (
      <div style={{ marginTop: "60px", textAlign: "center" }}>
        <Helmet>
          <title>PTP TIPS</title>
          <meta name="author" content="PTP TIPS"></meta>
          <meta
            name="keywords"
            content="Welcome back, information, your account, email, gmail, google, facebook ,ptp, ptptips, australia "
          ></meta>
        </Helmet>
        <h1> Welcome back.</h1>
        <p>Please wait, we are processing your account information...</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default withRouter(connect(mapStateToProps)(PromotionEmail));
