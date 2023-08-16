import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";
import { Col } from "reactstrap";

/* REDUX */
import actions from "../../redux/actions/last10winners";
import raceAction from "../../redux/actions/race";
import selectionsAction from "../../redux/actions/selections";
import { checkRouteDate } from "../../config/utils";
import "./Last10Winners.css";

class last10winners extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.fetchWinners());
  }

  navigator(p_id, meetdate) {
    const { dispatch } = this.props;
    dispatch(raceAction.getRaceInfo({ raceId: p_id }));
    dispatch(
      selectionsAction.getSelectionsForDate({
        passDate: moment(meetdate).format("YYYY-MM-DD"),
      })
    );
    // this.props.history.push(`/horse-racing-tips/race/${p_id}`)
    window.scrollTo(0, 0);
  }
  navigate = async (PID) => {
    window.scrollTo(0, 0);
    await this.props.dispatch(
      raceAction.getRaceInfoOpt(
        { raceId: PID, condition: "null", raceNum: "null" },
        true,
        0
      )
    );
  };
  last() {
    var date;
    var Tname;
    var racenum;
    var hnum;
    // var odd;
    var last = this.props.info.map((index, i) => {
      // console.log(index)
      date = moment(index.meetdate).format("ddd,DD MMM YYYY");
      Tname = index.track_name;
      racenum = index.race_num;
      hnum = index?.tab_no;
      var PID = index.point_id;
      // var Rdate = checkRouteDate(moment(index.meetdate).format("DD-MM-YYYY"));
      let odd;
      if (index.ub_win >= index.sb_place) {
        odd = Number(index?.ub_win?.toFixed(2));
      } else {
        odd = Number(index?.sb_win?.toFixed(2));
      }
      return (
        <Link
          to={`/horse-racing-tips/${checkRouteDate(
            moment(index.meetdate).tz("Australia/Sydney").format("DD-MM-YYYY")
          )}/${Tname}/R${racenum}/${PID}`}
          onClick={() => this.navigate(PID)}
          key={i}
          style={{ color: "inherit" }}
          rel="nofollow"
        >
          <div className="last10"
            
            style={{
              minWidth: "200px",
              marginRight: "16px",
              borderRadius: "10px",
              backgroundColor: "white",
              textAlign: "center",
              padding: 10,
            }}
          >
            <div
              style={{
                fontSize: 13,
                height: 20,
                backgroundColor: "#44bd32",
                borderRadius: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <strong style={{ color: "white" }}>{date}</strong>
            </div>
            <div
              style={{
                marginTop: 8,
                marginBottom: 8,
                fontSize: 13,
                fontWeight: "bold",
                color: "black",
              }}
            >
              {Tname}
            </div>

            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div
                style={{ fontSize: 14, fontWeight: "bold", color: "#44bd32" }}
              >
                R{racenum}
              </div>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "black" }}>
                No.{hnum}
              </div>
              <div 
                
                style={{ fontSize: 13, fontWeight: "bold", color: "#fcb318" }}
              >
               
                ${odd}
                
              </div>
            </div>
          </div>
        </Link>
      );
    });
    return last;
  }

  render() {
    return (
      <Col xs="12" lg="12" xl="12" style={{ marginTop: "6px" }}>
        <h1 style={{ textAlign: "center",fontWeight:"bolder",marginBottom:"-5px" }}>Previous Winners At Odds</h1>
        <hr className="hr"/* style={{backgroundColor:"#44bd32", height:"1.5px"}}*//>
        <div
          style={{
            display: "flex",
            overflowX: "scroll",
            overflowY: "hidden",
            marginBottom: "14px",
            marginTop: "-6px",
          }}
        >
          {" "}
          {this.last()}
        </div>
      </Col>
    );
  }
}

const mapStateToProps = (state) => ({
  info: state.lastWinnersReducer.info,
});

export default withRouter(connect(mapStateToProps)(last10winners));
