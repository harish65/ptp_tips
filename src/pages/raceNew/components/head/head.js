import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//COMPONENTS
import HeaderDesktop from "./headDesktop";
import HeaderMobile from "./headMobile";

/* REDUX */
import raceAction from "../../../../redux/actions/race";

/* CSS */
import "../../race.scss";

const RaceHead = (props) => {
  const [innerWidth, ] = useState(window.innerWidth);

  const checkHead = () => {
    if (innerWidth < 650) {
      return <HeaderMobile venueNavigation={venueNavigation} />;
    } else {
      return <HeaderDesktop venueNavigation={venueNavigation} />;
    }
  };

  const venueNavigation = async (trackCode, date) => {
   
    const { dispatch } = props;
    // await dispatch(raceAction.changeTab(0));
    await dispatch(
      raceAction.getVenueSelectionsForDateOpt(
        { trackCode: trackCode, passDate: date },
        props.history
      )
    );
  };

  return <>{checkHead()}</>;
};

const mapStateToProps = (state) => ({
  // trackInfo: state.raceReducer.trackInfoOpt,
  dateVenues: state.raceReducer.dateVenues,
  isLoggedIn: state.auth.isLoggedIn,
  point_id: state.raceReducer.point_id,
  allDayResult: state.raceReducer.allDayResult,
  raceStats: state.resultsReducer.raceStats,
  currentUser: state.auth.currentUser,
});

export default withRouter(React.memo(connect(mapStateToProps)(RaceHead)));
