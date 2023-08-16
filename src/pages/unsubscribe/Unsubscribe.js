import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { unsubscribeUserEmail, subscribeUserEmail } from "../../config/config";
import { Helmet } from "react-helmet";
//import moment from 'moment-timezone'

class Unsubscribe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  componentDidMount() {
    this.unsubscribeUser();
  }

  async unsubscribeUser() {
    await unsubscribeUserEmail(this.props.match.params.id)
      .then((res) => {
        if (res.status === 200) {
          this.setState({ message: res.message });
        }
      })
      .catch((err) => {
        this.setState({
          message:
            "An error occurred during unsubscribe process of your account! please try again or contact customer support.",
        });
      });
  }

  resubscribe = async () => {
    await subscribeUserEmail(this.props.match.params.id)
      .then((res) => {
        if (res.status === 200) {
          this.props.history.push("/");
        }
      })
      .catch((err) => {
        this.setState({
          message:
            "An error occurred during subscribe process of your account! please try again or contact customer support.",
        });
      });
  };

  render() {
    return (
      <div style={{ marginTop: "60px", textAlign: "center" }}>
        <Helmet>
          <title>Unsubscribe</title>
          <meta charSet="utf-8" name="author" content="PTP Tips" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            charSet="utf-8"
            name="keywords"
            content="PTP Tips , unsubscribe , subscribe , results , blackbook , percentage , horse racing , bets , australia , results tips , ratings"
          />
          <meta
            name="description"
            content="user unsubscribe from email notifications."
          />
        </Helmet>
        <h1> Unsubscribe From email notifications.</h1>
        {this.state.message === "" ? (
          <p>Please wait, we are processing your request.</p>
        ) : (
          <>
            <p style={{ color: "red" }}>{this.state.message}</p>
            <p>
              if you want to resubscribe again{" "}
              <span
                style={{ color: "green", cursor: "pointer" }}
                onClick={this.resubscribe}
              >
                click here
              </span>
            </p>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default withRouter(connect(mapStateToProps)(Unsubscribe));
