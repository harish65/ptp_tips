import React, { Component } from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import MapComp from "./MapComp";


class MapsComparison extends Component {

  constructor(props) {
    super(props);
    this.state = {
      increment: 1,
    };
  }

  title = () => {
    return 'MAPS COMPARISON';
  };

  componentDidMount = () => {

  }

  loadMoreMaps_ClickHandler = (event) => {
    let increment = this.state.increment;
    increment = increment + 1;
    this.setState({increment});
  }

  renderForm() {

    let maps = [];
    for(let i = 0; i < this.state.increment; i++)
    {
      maps.push(
          <div className={"row"} key={Math.floor(Math.random())}>
            <div className={"col"}>
              <MapComp />
            </div>
            <div className={"col"}>
              <MapComp />
            </div>
          </div>
      )
    }


    return (

        <div className="container-fluid m-5" style={{ fontSize: "12px" }}>
          <h3>{this.title()}</h3>
          {maps}
          <div>
            <button className={"btn btn-primary"} onClick={this.loadMoreMaps_ClickHandler}>Load More Maps</button>
          </div>
        </div>

    );
  }

  render() {

    return this.renderForm();
  }
}

const mapStateToProps = state => ({
  venues: state.venuesReducer.venues,
})

export default connect(mapStateToProps)(withRouter(MapsComparison));
