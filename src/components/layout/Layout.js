import React, { lazy } from "react"
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Row, Col, CustomInput } from 'reactstrap';

import actions from '../../redux/actions/selections'
/* COMPONENTS */
import Last10 from "../NextLast/Last10New";
import Next10 from "../Next10/Next10";
// import Last10Cell from "../Last10Cell/Last10Cell";
// import Next10Cell from "../Next10Cell/Next10Cell";
// import Next10Cell from "../Next10/Next10Cell";
// import Last10Cell from "../Last10/Last10Cell";
import Last10Winners from "../Last10Winners/Last10Winners"
//import Last10WinnersReg from '../Last10WinnersReg/Last10WinnersReg'
/* CSS */
import './Layout.scss';

/* PAGES */
// const Selections = lazy(() => import("../../pages/selections"))
const Results = lazy(() => import("../../pages/results/Results"))
const Race = lazy(() => import("../../pages/raceNew/races"))
const Venue = lazy(() => import("../../pages/venue/venue"))
// const RaceNicolas = lazy(() => import("../../pages/race/races"))

class Layout extends React.Component {
  constructor() {
    super()
    this.state = {
      isOpen: false,
      width: window.innerWidth,
    }
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    this.setState({
      width: window.innerWidth
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  renderRoutes() {
    return (
      <Col style={{ padding: 0 }} xs="12" lg="12" xl="8">
        <Switch>
          {/*<Route exact path={'/horse-racing-tips/'}>
            <Redirect to={`/tips`} />
          </Route>*/}

          <Route exact path="/horse-racing-tips/race/*">
            <Redirect to={"/horse-racing-tips/today"} />
          </Route>

          <Route exact path="/horse-racing-tips/results/today">
            <Results />
          </Route>

          <Route exact path="/horse-racing-tips/results/yesterday">
            <Results />
          </Route>

          <Route exact path="/horse-racing-tips/results/tomorrow">
            <Results />
          </Route>

          <Route exact path={`/horse-racing-tips/results/:date`}>
            <Results />
          </Route>

          <Route path={`/horse-racing-tips/:date/:venue/:raceNumber/:id/:tab`}>
            <Race />
          </Route>

          <Route path={`/horse-racing-tips/:date/:venue/:raceNumber/:id`}>
            <Race />
          </Route>

          <Route path={`/horse-racing-tips/venue/:venue/:date`}>
            <Venue />
          </Route>

          {/* <Route exact path={`/horse-racing-tips/:date/:venue/:raceNumber/:id/rony`}>
            <RaceRony />
          </Route> */}
        </Switch>
      </Col>
    )
  }

  button() {
    if (this.state.isOpen === false) {
      return "Show More"
    } else return "Show Less"
  }

  mobileLayout() {
    // const match = this.props.match
    return (
      <Col xs="12" lg="12" style={{ backgroundColor: '#eef0f8', marginTop: 32, marginBottom: 40 }}>
        <Row>
          {this.renderRoutes()}
          <Col xs="12" lg="3" xl="2" style={{ marginTop: "24px" }}>
            <h5 style={{ backgroundColor: '#44bd32', height: 32, borderRadius: 4, textAlign: 'center', color: 'white', fontWeight: '600', margin: 0, display: "flex", justifyContent: "center", alignItems: "center", maxWidth: "350px", marginLeft: "auto", marginRight: "auto" }}>NEXT PTP TIPS</h5>
            <div style={{ display: "flex", overflowX: "scroll", overflowY: "hidden", marginBottom: "8px" }}><Next10 /></div>
          </Col>

          <Col xs="12" lg="3" xl="2" style={{ marginTop: "24px" }}>
            <h5 style={{ backgroundColor: '#44bd32', height: 32, borderRadius: 4, textAlign: 'center', color: 'white', fontWeight: '600', margin: 0, display: "flex", justifyContent: "center", alignItems: "center", maxWidth: "350px", marginLeft: "auto", marginRight: "auto" }}>PREVIOUS PTP TIPS</h5>
            <div style={{ display: "flex", overflowX: "scroll", overflowY: "hidden" }}><Last10 /></div>
          </Col>

          {/* <Col xs="12" lg="3" xl="2" >
            <Last10WinnersReg />
          </Col> */}
          <Col xs="12" lg="3" xl="2" >
            <Last10Winners />
          </Col>

        </Row>
      </Col>
    )
  }

  tabletLayout() {
    return (
      <Col xs="12" lg="12" style={{ backgroundColor: '#eef0f8', marginTop: 32, marginBottom: 40 }}>
        <Row>
          {this.renderRoutes()}
          <Col>
            <div style={{ backgroundColor: '#44bd32', height: 32, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h5 style={{ textAlign: 'center', color: 'white', fontWeight: '600', marginTop: 5 }}>NEXT PTP TIPS</h5>
            </div>
            <div style={{ display: "flex", overflowX: "scroll", overflowY: "hidden", marginBottom: "8px" }}><Next10 /></div>
          </Col>

          <Col>
            <div style={{ backgroundColor: '#44bd32', height: 32, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h5 style={{ textAlign: 'center', color: 'white', fontWeight: '600', marginTop: 5 }}>PREVIOUS PTP TIPS</h5>
            </div>
            <div style={{ display: "flex", overflowX: "scroll", overflowY: "hidden" }}><Last10 /></div>
          </Col>

          {/* <Col>
            <Last10WinnersReg />
          </Col> */}
          <Col>
            <Last10Winners />
          </Col>

        </Row>
      </Col>
    )
  }

  selectNRNext = (e) => {
    const { dispatch } = this.props
    dispatch(actions.selectNRNext(e.target.checked))
    dispatch(actions.getNextTen(e.target.checked))
  }

  selectCTCN = (e) => {
    const { dispatch } = this.props
    dispatch(actions.selectCTCN(e.target.checked))
  }

  selectCTCL = (e) => {
    const { dispatch } = this.props
    dispatch(actions.selectCTCL(e.target.checked))
  }

  selectNRLast = (e) => {
    const { dispatch } = this.props
    dispatch(actions.selectNRLast(e.target.checked))
    dispatch(actions.getLastTen(e.target.checked))
  }

  browserLayout() {
    return (
      <div style={{ backgroundColor: '#eef0f8', marginTop: 32, marginBottom: 40 }}>
        <Row>
          <Col xs="12" lg="2" xl="2" style={{ paddingRight: "10px" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 5, backgroundColor: 'rgb(20, 40, 65)', color: 'white', height: 32, paddingTop: "3%", borderRadius: 4 }}>
              {/* <CustomInput type="checkbox" id="MYNext" label="My" checked={this.props.showNextMy} onChange={(e) => this.selectNRNext(e)} /> */}
              <h5 style={{ textAlign: 'center', color: 'white', fontWeight: '600', fontSize: 14 }}>NEXT PTP TIPS</h5>
              <CustomInput type="checkbox" id="CTCN" label="CTC" checked={this.props.showCTCN} onChange={(e) => this.selectCTCN(e)} />
              <CustomInput type="checkbox" id="NRNext" label="N/R" checked={this.props.showNextNR} onChange={(e) => this.selectNRNext(e)} />
            </div>
            <div className="next10">
              <Next10 Open={true} />
            </div>
            {/* <div className="button" onClick={() => { this.setState({ isOpen: !this.state.isOpen }) }}>
              {this.button()}
            </div> */}
          </Col>

          {this.renderRoutes()}

          <Col xs="12" lg="2" xl="2" style={{ paddingLeft: "10px" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 5, backgroundColor: 'rgb(20, 40, 65)', color: 'white', height: 32, paddingTop: "3%", borderRadius: 4 }}>
              {/* <CustomInput type="checkbox" id="MYLast" label="My" checked={this.props.showLastMy} onChange={(e) => this.selectNRNext(e)} /> */}
              <h5 style={{ textAlign: 'center', color: 'white', fontWeight: '600', fontSize: 14 }}>PREV PTP TIPS</h5>
              <CustomInput type="checkbox" id="CTCL" label="CTC" checked={this.props.showCTCL} onChange={(e) => this.selectCTCL(e)} />
              <CustomInput type="checkbox" id="NRLast" label="N/R" checked={this.props.showLastNR} onChange={(e) => this.selectNRLast(e)} />
            </div>
            <div className="next10">
              <Last10 Open={true} />
            </div>
            {/* <div className="button" onClick={() => { this.setState({ isOpen: !this.state.isOpen }) }}>
              {this.button()}
            </div> */}
          </Col>
        </Row>
        {/* <Row style={{ paddingLeft: "12.5px", paddingRight: "12.5px" }}>
          <Last10WinnersReg />
        </Row> */}
        <Row style={{ paddingLeft: "12.5px", paddingRight: "12.5px" }}>
          <Last10Winners />
        </Row>
      </div>
    )
  }
  main() {
    if (this.state.width < 769) {
      return (this.mobileLayout())
    }
    // it was 1032
    if (this.state.width < 1200) {
      return (this.tabletLayout())
    } else {
      return (this.browserLayout())
    }
  }
  render() {
    return (
      <div>
        {this.main()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showNextNR: state.selectionReducer.showNextNR,
  showLastNR: state.selectionReducer.showLastNR,
  showCTCN: state.selectionReducer.showCTCN,
  showCTCL: state.selectionReducer.showCTCL,
})

export default withRouter(connect(mapStateToProps)(Layout));