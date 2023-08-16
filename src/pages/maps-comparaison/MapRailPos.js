import React, { Component } from 'react';
import "./table-fixed-header.css";
import {
  loadSavedRailPosition,
} from "../../config/config";

class MapRailPos extends Component {

  constructor(props) {
    super(props);
    this.state = {

      meetings: [],
      selectedMeeting: '',
      lbl: '',
      venueID: '',
      railPos: '',
      savedRP: [],
      venueName: '',
    };
  }

  title = () => {
    return this.state.venueName;
  };

  componentDidMount() {
    const {venue_id} = this.props;
    if(venue_id !== 0)
    {
      this.loadSavedRP(venue_id);
    }else{
      alert("Select a Venue first.");
    }
  }

  loadSavedRP = (venueID) => {
    let data = {
      venueID: venueID
    }
    loadSavedRailPosition(data).then(res => {
      this.setState({savedRP: res, venueName: res[0]['venue_fullName']});
    })
  }

  renderForm() {
    const rprows = [];
    this.state.savedRP.forEach((element, key) => {
      rprows.push(
          <tr key={key}>
            <td style={{fontWeight: 'bold'}}>{element.vrp_date}</td>
            <td style={{fontWeight: 'bold'}}>{element.rail_pos}</td>
          </tr>);
    })


    return (

        <div className={"container-fluid"}>
          <h4 className={"text-dark"}>{this.title()}</h4>
          <div style={{overflow: 'scroll', height: '400px', width: '100%'}}>
            <table className={"table-sm w-100 table-bordered text-dark table-wrapper"}>
              <thead className={"text-white"}>
                <tr>
                  <th>Date</th>
                  <th>Rail Pos.</th>
                </tr>
              </thead>
              <tbody>
              {rprows}
              </tbody>
            </table>
          </div>
        </div>

    );
  }

  render() {


    return this.renderForm();
  }
}

export default MapRailPos;
