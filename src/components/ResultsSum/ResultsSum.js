import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal, faTrophy, faAward, faHorseHead, faThumbsDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
/* CSS */

/* REDUX */
// import resultAction from '../../redux/actions/results'


class ResultsSum extends React.Component {

  getLost() {
    var res = 0
    var selec = 0
    var lost = 0
    res = this.props.dailyPerformance?.won + this.props.dailyPerformance?.second + this.props.dailyPerformance?.third
    selec = this.props.dailyPerformance?.runs
    lost = selec - res
    return (lost)
  }
  // componentWillMount() {
  //   const { dispatch } = this.props;
  //   // dispatch(resultAction.getResults({ passDate: this.props.date }));
  // }

  render() {

    if (this.props.resPage === 1) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          {/* <div style={{ height: 32, padding: "6px", maxWidth: 400 }}>
            <h5 style={{ fontWeight: '600' }}>Horse Racing Results{" "}{moment(this.props.match.params.date).format("dddd LL")}</h5>
          </div> */}
        
          <Row style={{ width: "100%" }} >
            <Col style={{ marginTop: "6px", marginBottom: "6px" }}>
              <div style={{ backgroundColor: "white", display: "flex", justifyContent: "center", borderRadius: "4px", paddingTop: "8px", height: "63px", border: "1px solid rgb(55, 146, 57)" }}>
                <div style={{ display: "flex", marginTop: "10px" }}>
                  <FontAwesomeIcon style={{ color: "rgb(55, 146, 57)", marginRight: "4px", marginTop: "2px" }} icon={faHorseHead} size="2x" />
                  <div>
                    <div style={{ backgroundColor: "#379239", padding: "6px", fontSize: "11px", borderRadius: "6px" }}><strong style={{ color: 'white' }}> {this.props.dailyPerformance?.runs} Selections</strong></div>
                  </div>
                </div>
              </div>
            </Col>

            {/* <Col style={{ marginTop: "6px", marginBottom: "6px" }}>
              <div style={{ backgroundColor: "white", display: "flex", justifyContent: "center", borderRadius: "4px", padding: "8px", height: "63px" }}>
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex", flexDirection: "column", marginRight: "4px", alignItems: "center", marginTop: "2px" }}>
                    <FontAwesomeIcon style={{ color: "rgb(252, 179, 24)" }} icon={faTrophy} size="2x" />
                    <div style={{ color: "rgb(252, 179, 24)" }}>
                      1st
              </div>
                  </div>
                  <div>
                    <div style={{ backgroundColor: "rgb(252, 179, 24)", padding: "6px", fontSize: "11px", borderRadius: "4px" }}><strong style={{ color: 'white' }}>
                      <div>
                        <div style={styles.card}>
                          {this.props.dailyPerformance?.won}
                          <div>{this.props.dailyPerformance?.runs ? ((this.props.dailyPerformance?.won / this.props.dailyPerformance?.runs) * 100).toFixed(2) + "%" : "0.00%"}</div></div>
                      </div>
                    </strong>
                    </div>
                  </div>
                </div>
              </div>
            </Col> */}

            <Col style={{ marginTop: "6px", marginBottom: "6px" }}>
              <div style={{ backgroundColor: "white", display: "flex", justifyContent: "space-between", borderRadius: "4px", padding: "8px", height: "63px", border: "1px solid rgb(252, 179, 24)" }}>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: "14px", color: "rgb(252, 179, 24)", fontWeight: "500" }} >{this.props.dailyPerformance?.won}</div>
                  <strong style={{ fontSize: "14px", color: "rgb(252, 179, 24)" }}>
                    {this.props.dailyPerformance?.runs ? ((this.props.dailyPerformance?.won / this.props.dailyPerformance?.runs) * 100).toFixed(2) + "%" : "0.00%"}
                  </strong>
                </div>

                <div style={{ display: "flex", marginRight: "4px", alignItems: "center", marginTop: "2px" }}>
                  <FontAwesomeIcon style={{ color: "rgb(252, 179, 24)", fontSize: "25px" }} icon={faTrophy} />
                  <div style={{ color: "rgb(252, 179, 24)" }}>
                    1st
                    </div>
                </div>

              </div>
            </Col>

            <Col style={{ marginTop: "6px", marginBottom: "6px" }}>
              <div style={{ backgroundColor: "white", display: "flex", justifyContent: "space-between", borderRadius: "4px", padding: "8px", height: "63px", border: "1px solid #096ab3" }}>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: "14px", color: "#096ab3", fontWeight: "500" }} >{this.props.dailyPerformance?.second}</div>
                  <strong style={{ fontSize: "14px", color: "#096ab3" }}>
                    {this.props.dailyPerformance?.runs ? ((this.props.dailyPerformance?.second / this.props.dailyPerformance?.runs) * 100).toFixed(2) + "%" : "0.00%"}
                  </strong>
                </div>

                <div style={{ display: "flex", marginRight: "4px", alignItems: "center", marginTop: "2px" }}>
                  <FontAwesomeIcon style={{ color: "#096ab3", fontSize: "25px" }} icon={faMedal} />
                  <div style={{ color: "#096ab3" }}>
                    2nd
                    </div>
                </div>

              </div>
            </Col>

            {/* <Col style={{ marginTop: "6px", marginBottom: "6px" }}>
              <div style={{ backgroundColor: "white", display: "flex", justifyContent: "center", borderRadius: "4px", padding: "8px", height: "63px" }}>
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex", flexDirection: "column", marginRight: "4px", alignItems: "center", marginTop: "2px" }}>
                    <FontAwesomeIcon style={{ color: "rgb(9, 106, 179)" }} icon={faMedal} size="2x" />
                    <div style={{ color: "rgb(9, 106, 179)" }}>
                      2nd
                </div>
                  </div>
                  <div>
                    <div style={{ backgroundColor: '#096ab3', padding: "6px", fontSize: "11px", borderRadius: "4px" }}><strong style={{ color: 'white' }}>
                      <div style={{ color: 'white' }}>
                        <div style={styles.card}>
                          <div> {this.props.dailyPerformance?.second}</div>{this.props.dailyPerformance?.runs ? ((this.props.dailyPerformance?.second / this.props.dailyPerformance?.runs) * 100).toFixed(2) + "%" : "0.00%"}</div>
                      </div>
                    </strong>
                    </div>
                  </div>

                </div>
              </div>
            </Col> */}

            <Col style={{ marginTop: "6px", marginBottom: "6px" }}>
              <div style={{ backgroundColor: "white", display: "flex", justifyContent: "space-between", borderRadius: "4px", padding: "8px", height: "63px", border: "1px solid rgb(139, 52, 191)" }}>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: "14px", color: "rgb(139, 52, 191)", fontWeight: "500" }} > {this.props.dailyPerformance?.third}</div>
                  <strong style={{ fontSize: "14px", color: "rgb(139, 52, 191)" }}>
                    {this.props.dailyPerformance?.runs ? ((this.props.dailyPerformance?.third / this.props.dailyPerformance?.runs) * 100).toFixed(2) + "%" : "0.00%"}
                  </strong>
                </div>

                <div style={{ display: "flex", marginRight: "4px", alignItems: "center", marginTop: "2px" }}>
                  <FontAwesomeIcon style={{ color: "rgb(139, 52, 191)", fontSize: "25px" }} icon={faAward} />
                  <div style={{ color: "rgb(139, 52, 191)" }}>
                    3rd
                    </div>
                </div>

              </div>
            </Col>

            {/* <Col style={{ marginTop: "6px", marginBottom: "6px" }}>
              <div style={{ backgroundColor: "white", display: "flex", justifyContent: "center", borderRadius: "4px", padding: "8px", height: "63px" }}>
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex", flexDirection: "column", marginRight: "4px", alignItems: "center", marginTop: "2px" }}>
                    <FontAwesomeIcon style={{ color: "rgb(139, 52, 191)" }} icon={faAward} size="2x" />
                    <div style={{ color: "rgb(139, 52, 191)" }}>
                      3rd
              </div>
                  </div>
                  <div style={{ backgroundColor: "#8b34bf", padding: "6px", fontSize: "11px", borderRadius: "4px" }}><strong>
                    <div style={{ color: "white" }}>
                      <div style={styles.card}>
                        {this.props.dailyPerformance?.third}
                        <div>{this.props.dailyPerformance?.runs ? ((this.props.dailyPerformance?.third / this.props.dailyPerformance?.runs) * 100).toFixed(2) + "%" : "0.00%"}</div>
                      </div>
                    </div>
                  </strong>
                  </div>
                </div>
              </div>
            </Col> */}


            <Col style={{ marginTop: "6px", marginBottom: "6px" }}>
              <div style={{ backgroundColor: "white", display: "flex", justifyContent: "space-between", borderRadius: "4px", padding: "8px", height: "63px", border: "1px solid red" }}>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: "14px", color: "red", fontWeight: "500" }} >  {this.getLost()}</div>
                  <strong style={{ fontSize: "14px", color: "red" }}>
                    {this.props.dailyPerformance?.runs ? ((this.getLost() / this.props.dailyPerformance?.runs) * 100).toFixed(2) + "%" : "0.00%"}
                  </strong>
                </div>

                <div style={{ display: "flex", marginRight: "4px", alignItems: "center", marginTop: "2px" }}>
                  <FontAwesomeIcon style={{ color: "red", fontSize: "25px", marginRight:4}} icon={faThumbsDown} />
                  <div style={{ color: "red" }}>
                    Lost
                    </div>
                </div>

              </div>
            </Col>

            {/* <Col style={{ marginTop: "6px", marginBottom: "6px" }}>
              <div style={{ backgroundColor: "white", display: "flex", justifyContent: "center", borderRadius: "4px", padding: "8px", height: "63px" }}>
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex", flexDirection: "column", marginRight: "4px", alignItems: "center", marginTop: "2px" }}>
                    <FontAwesomeIcon style={{ color: "red" }} icon={faAngleDoubleDown} size="2x" />
                    <div style={{ color: "red" }}>
                      Lost
              </div>
                  </div>
                  <div style={{ backgroundColor: "red", padding: "6px", fontSize: "11px", borderRadius: "4px" }}><strong>
                    <div style={{ color: "white" }}>
                      <div style={styles.card}>
                        {this.getLost()}
                        <div>{this.props.dailyPerformance?.runs ? ((this.getLost() / this.props.dailyPerformance?.runs) * 100).toFixed(2) + "%" : "0.00%"}</div>
                      </div>
                    </div>
                  </strong>
                  </div>
                </div>
              </div>
            </Col> */}

          </Row>
        </div>
      )
    } else
      return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#44bd32', height: 32, padding: "6px", borderRadius: 4, maxWidth: 400 }}>
            <h5 style={{ textAlign: 'center', color: 'white', fontWeight: '600' }}>{moment(this.props.match.params.date).format("dddd LL")} Results</h5>
          </div>
          <Row style={{ width: "100%" }} >
            <Col xs="4" md="4" lg="4" xl="2" className="result-card" style={{ marginTop: "6px", marginBottom: "6px" }}>
              <div style={{ backgroundColor: "white", display: "flex", justifyContent: "center", borderRadius: "4px", paddingTop: "8px", height: "63px" }}>
                <div style={{ display: "flex", marginTop: "10px" }}>
                  <FontAwesomeIcon style={{ color: "rgb(55, 146, 57)", marginRight: "4px", marginTop: "2px" }} icon={faHorseHead} size="2x" />
                  <div>
                    <div style={{ backgroundColor: "#379239", padding: "6px", fontSize: "11px", borderRadius: "6px" }}><strong style={{ color: 'white' }}> {this.props.dailyPerformance?.runs} Selections</strong></div>
                  </div>
                </div>
              </div>
            </Col>

            <Col xs="4" md="4" lg="4" xl="2" className="result-card" style={{ marginTop: "6px", marginBottom: "6px" }}>
              <div style={{ backgroundColor: "white", display: "flex", justifyContent: "center", borderRadius: "4px", padding: "8px", height: "63px" }}>
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex", flexDirection: "column", marginRight: "4px", alignItems: "center", marginTop: "2px" }}>
                    <FontAwesomeIcon style={{ color: "rgb(252, 179, 24)" }} icon={faTrophy} size="2x" />
                    <div style={{ color: "rgb(252, 179, 24)" }}>
                      1st
                </div>
                  </div>
                  <div>
                    <div style={{ backgroundColor: "rgb(252, 179, 24)", padding: "6px", fontSize: "11px", borderRadius: "4px" }}><strong style={{ color: 'white' }}>
                      <div>
                        <div style={styles.card}>
                          {this.props.dailyPerformance?.won}
                          <div>{this.props.dailyPerformance?.runs ? ((this.props.dailyPerformance?.won / this.props.dailyPerformance?.runs) * 100).toFixed(2) + "%" : "0.00%"}</div></div>
                      </div>
                    </strong>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col xs="4" md="4" lg="4" xl="2" className="result-card" style={{ marginTop: "6px", marginBottom: "6px" }}>
              <div style={{ backgroundColor: "white", display: "flex", justifyContent: "center", borderRadius: "4px", padding: "8px", height: "63px" }}>
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex", flexDirection: "column", marginRight: "4px", alignItems: "center", marginTop: "2px" }}>
                    <FontAwesomeIcon style={{ color: "rgb(9, 106, 179)" }} icon={faMedal} size="2x" />
                    <div style={{ color: "rgb(9, 106, 179)" }}>
                      2nd
                  </div>
                  </div>
                  <div>
                    <div style={{ backgroundColor: '#096ab3', padding: "6px", fontSize: "11px", borderRadius: "4px" }}><strong style={{ color: 'white' }}>
                      <div style={{ color: 'white' }}>
                        <div style={styles.card}>
                          <div> {this.props.dailyPerformance?.second}</div>{this.props.dailyPerformance?.runs ? ((this.props.dailyPerformance?.second / this.props.dailyPerformance?.runs) * 100).toFixed(2) + "%" : "0.00%"}</div>
                      </div>
                    </strong>
                    </div>
                  </div>

                </div>
              </div>
            </Col>

            <Col xs="4" md="4" lg="4" xl="2" className="result-card" style={{ marginTop: "6px", marginBottom: "6px" }}>
              <div style={{ backgroundColor: "white", display: "flex", justifyContent: "center", borderRadius: "4px", padding: "8px", height: "63px" }}>
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex", flexDirection: "column", marginRight: "4px", alignItems: "center", marginTop: "2px" }}>
                    <FontAwesomeIcon style={{ color: "rgb(139, 52, 191)" }} icon={faAward} size="2x" />
                    <div style={{ color: "rgb(139, 52, 191)" }}>
                      3rd
                </div>
                  </div>
                  <div style={{ backgroundColor: "#8b34bf", padding: "6px", fontSize: "11px", borderRadius: "4px" }}><strong>
                    <div style={{ color: "white" }}>
                      <div style={styles.card}>
                        {this.props.dailyPerformance?.third}
                        <div>{this.props.dailyPerformance?.runs ? ((this.props.dailyPerformance?.third / this.props.dailyPerformance?.runs) * 100).toFixed(2) + "%" : "0.00%"}</div>
                      </div>
                    </div>
                  </strong>
                  </div>
                </div>
              </div>
            </Col>

            <Col xs="4" md="4" lg="4" xl="2" className="result-card" style={{ marginTop: "6px", marginBottom: "6px" }}>
              <div style={{ backgroundColor: "white", display: "flex", justifyContent: "center", borderRadius: "4px", padding: "8px", height: "63px" }}>
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex", flexDirection: "column", marginRight: "4px", alignItems: "center", marginTop: "2px" }}>
                    <FontAwesomeIcon style={{ color: "red", marginRight:4}} icon={faThumbsDown} size="2x" />
                    <div style={{ color: "red" }}>
                      Lost
                </div>
                  </div>
                  <div style={{ backgroundColor: "red", padding: "6px", fontSize: "11px", borderRadius: "4px" }}><strong>
                    <div style={{ color: "white" }}>
                      <div style={styles.card}>
                        {this.getLost()}
                        <div>{this.props.dailyPerformance?.runs ? ((this.getLost() / this.props.dailyPerformance?.runs) * 100).toFixed(2) + "%" : "0.00%"}</div>
                      </div>
                    </div>
                  </strong>
                  </div>
                </div>
              </div>
            </Col>

            <Col xs="4" md="4" lg="4" xl="2" className="result-card" style={{ marginTop: "6px", marginBottom: "6px" }}>
              <div style={{ backgroundColor: "white", display: "flex", justifyContent: "center", borderRadius: "4px", paddingTop: "8px", height: "63px" }} onClick={() => { this.props.history.push(`/horse-racing-tips/results/${this.props.match.params.date}`) }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                  <div>
                    <div style={{ backgroundColor: "#379239", padding: "4px", fontSize: "11px", borderRadius: "6px" }}><strong style={{ color: 'white' }}>View More</strong></div>
                  </div>
                  <FontAwesomeIcon style={{ color: "rgb(55, 146, 57)", marginRight: "4px", marginTop: "2px" }} icon={faPlusCircle} size="2x" />
                </div>
              </div>
            </Col>

          </Row>
        </div>
      )
  }
}
const mapStateToProps = state => ({
  loading: state.resultsReducer.loading,
  dailyPerformance: state.resultsReducer.daily_results,

  // results: state.resultsReducer.results,
  // daily_results: state.resultsReducer.daily_results,
  // day_of_week_history: state.resultsReducer.day_of_week_history
})
const styles = {
  card: {
    flexDirection: "column",
    justifyContent: "space-between",
    display: "flex",
  }
}
export default withRouter(connect(mapStateToProps)(ResultsSum));