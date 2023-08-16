import moment from 'moment';
import React from 'react'
// import CustCountDown from '../../../components/CustCountDown';
import Timer from "../../../components/Timer"
import { ConvertUTCTimeToLocalTime } from '../../../config/utils';


function NextToJump({ meetdate, track_name, track_condition, race_num, race_time, track_description, track_distance, track_weather, race_status, PID }) {
  var racetime = race_time
  // var race_status = race_status
  var RaceHour = Number(race_time?.split(":")[0]) * 60 * 60 * 1000
  var RaceMin = Number(race_time?.split(":")[1]) * 60 * 1000
  var RTime = (RaceHour + RaceMin)
  var formatted = ConvertUTCTimeToLocalTime(moment(race_time, "HH:mm").format("HH:mm"));
  var rStatus = race_status

  var curentDate = moment().tz('Australia/Sydney').format("YYYYMMDD")
  var rDate = meetdate?.split("-")[0] + meetdate?.split("-")[1] + meetdate?.split("-")[2]

  const conditions = (val) => {

    const condition = val
    switch (condition) {
      case 'F':
        return 'FIRM'
      case 'G':
        return 'GOOD'
      case 'SO':
        return 'SOFT'
      case 'SY':
        return 'SYNTHETIC'
      case 'H':
        return 'HEAVY'
      case 'N/A':
        return 'N/A'
      case 'ABND':
        return 'ABND'
      default:
        return 'GOOD'
    }
  }

  const TimerCheck = (RaceTime, formatted, racetime, rStatus) => {
    // console.log(RaceTime)
    var currentTime = (Number(moment().tz("Australia/Sydney").format("HH")) * 60 + (Number(moment().tz("Australia/Sydney").format("mm")))) * 60 * 1000
    var timeComp = RaceTime - currentTime
    if (timeComp > 1 * 60 * 60 * 1000) {
      return (formatted)
    } else if (timeComp < 1 * 60 * 60 * 1000) {
      return (<div style={{ marginTop: "2px" }}><Timer raceTimer={RaceTime} raceTime={racetime} status={rStatus} /></div>)
    }
  }

  const DateCheck = (CD, RD, RaceTime, formatted, racetime, rStatus) => {
    if (CD < RD) {
      return (formatted)
    } else {
      return (TimerCheck(RaceTime, formatted, racetime, rStatus))
    }
  }

  return (
    <div style={{ backgroundColor: "white", borderRadius: "4px", padding: "10px", marginTop: "10px" }} key={PID}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>{track_name} Race {race_num}  {conditions(track_condition)}</div>
        {DateCheck(curentDate, rDate, RTime, formatted, racetime, rStatus)}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div> {track_description}</div>
        <div style={{ display: "flex" }}> <div style={{ marginLeft: "10px" }}>{track_distance}</div>{track_weather}</div>
      </div>
    </div>
    )
}

export default NextToJump