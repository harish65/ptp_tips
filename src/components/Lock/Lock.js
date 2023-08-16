import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@material-ui/core";

const Lock = (props) => {
  const renderPercentages = (val) => {
    if (props.currentUser) {
      if (props.isExpired === true) {
        return (
          <Link title="Sign in or Register To View Selections" to="/register">
            <FontAwesomeIcon
              icon={faLock}
              size="1x"
              style={{ marginRight: 4, color: "rgb(20, 40, 65)" }}
              to="/register"
            />
          </Link>
        );
      } else {
        return val;
      }
    } else if (!props.currentUser) {
      return (
        <div>
        <Link title="Sign in or Register To View Selections" to="/register">
          <FontAwesomeIcon
            icon={faLock}
            size="1x"
            style={{ marginRight: 4, color: "rgb(20, 40, 65)" }}
          />
        </Link>
        </div>
      );
    }
  };
  return <div>{renderPercentages(props.data)}</div>;
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  isExpired: state.auth.isExpired,
  isLoggedIn: state.auth.isLoggedIn,
});

export default withRouter(connect(mapStateToProps)(Lock));
