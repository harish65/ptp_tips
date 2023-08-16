import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "./StripePayment.scss";

const StripeSuccessPage = (props) => {
  const history = useHistory();

  return (
    <div className="sucesspage">
      <div className="centerclass">
        <h1>
          Thanks For Subscription Mr./Mrs.
          <strong>{props?.currentUser && props?.currentUser?.firstName}</strong>
        </h1>

        <p>please check your email for invoice</p>

        <button className="btn btn-success" onClick={() => history.push("/")}>
          Back to Homepage
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
});

export default connect(mapStateToProps)(StripeSuccessPage);
