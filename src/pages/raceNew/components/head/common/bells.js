import React, { useState } from "react";
import { connect } from "react-redux";

import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import Bell from "react-ionicons/lib/IosNotifications";
import { notifyMe } from "../../../../../config/config";
import moment from "moment-timezone";
// import { ConvertUTCTimeToLocalTime } from "../../../../../config/utils";

export const Bells = (props) => {
  const [notification, setnotification] = useState(false);
  const [notifyDrop, setnotifyDrop] = useState(false);
  const [setreminder] = useState(2);

  const onChangeReminder = (value) => {
    const val = value;
    setreminder(val);
    if ("serviceWorker" in navigator && props.isLoggedIn) {
      triggerNotification(val).catch(
        (err) => console.error(err)

        //  console.log(props.currentUser.email),
        //  console.log(props.currentUser.firstName),
        //  console.log(props.trackInfo[0]?.track_name),
        //  console.log(props.trackInfo[0]?.race_num),
      );
    }
  };

  const triggerNotification = async (val) => {
    const register = await navigator.serviceWorker.register("/worker.js");
    const subscription = await register.pushManager.getSubscription();
    ///horse-racing-tips/:date/:venue/:raceNumber/:id
    // console.log(val);
    await notifyMe({
      subscription: subscription,
      timer: val,
      // raceTimeBeforeTimer:,
      email: props.currentUser.email,
      name: props.currentUser.firstName,
      venue: props.trackInfo[0]?.track_name,
      raceNumber: props.trackInfo[0]?.race_num,
      meetdate: moment(props.trackInfo[0].meetdate),
      race_time: moment(props.trackInfo[0].race_time),
      link: `https://www.ptptips.com.au/horse-racing-tips/${props.trackInfo[0]?.track_name}/${props.trackInfo[0]?.race_num}/${props.trackInfo[0]?.point_id}`,
    });
    // console.log(props.trackInfo[0])

    // if ((triggerNotification, val)) {
    //   let venue = props.trackInfo[0]?.track_name;
    //   let racenumber = props.trackInfo[0]?.race_num;

    //   let timeNowArray = [];
    //   let raceTimeArray = [];

    //   let raceTime = props.trackInfo[0]?.race_time;
    //   // let raceTimeAsDate = new Date(raceTime)

    //   //We are converting from Australian time to local time using ConvertUTCTimeToLocalTime function
    //   let raceTimeConverted = ConvertUTCTimeToLocalTime(raceTime);

    //   let timeNow = new Date().toTimeString();

    //   timeNowArray.push(timeNow);
    //   raceTimeArray.push(raceTime);
    //   // let yourTimeNow = timeNow.split(":", 2);
    //   let raceTimeConvertedFormatted = raceTimeConverted.split(":", 2)
    //   let y = moment(raceTimeConvertedFormatted[2]).subtract(val, "minutes");
    //   let z = moment(y).format("HH:mm");
    //   let raceTimeSplitter = raceTimeConverted.split(":", 2);
    //   let raceTimeMinusTimer = moment(raceTimeSplitter[2]).subtract(val, "minutes")
    //   let raceTimeMinusTimerFormatted = moment(raceTimeMinusTimer).format("HH:mm")
    //   // let zz = moment(zx[2]).subtract(val, "minutes");
    //   // let zzFormatted = moment(zz).format("HH:mm")
    //   // let raceTimeMinusTimer = zz;
    //   // let yourMoment = moment(zz).format("HH:mm");
    //   // console.log(z + " " + yourMoment);
    //   console.log(raceTimeSplitter)
    //   console.log(raceTimeMinusTimer)
    //   console.log(raceTimeMinusTimerFormatted)
    //   // console.log(zzFormatted)
    //   // console.log(z === yourMoment);
    //   // if (y === yourMoment) {
    //   //   alert("yes");
    //   // }

    //   // console.log(raceTimeAsDate)
    //   console.log(`Race Time in your Locale time : ${raceTimeConverted}`);
    //   // console.log(
    //   //   `This time that you selected the notidication Bell : ${timeNow}`
    //   // );

    //   return alert(
    //     `You Will be Notified ${val} Minutes Before ${venue} Race ${racenumber} Starts`
    //   );
    // }
  };

  const renderBell = () => {
    if (!props.trackInfo[0]?.result && props.isLoggedIn) {
      return (
        <Dropdown
          isOpen={notification}
          toggle={() => setnotification(!notification)}
        >
          <DropdownToggle>
            <div
              onClick={() => setnotifyDrop(!notifyDrop)}
              style={{
                backgroundColor: notification ? "#44BD32" : "#eef0f4",
                height: 30,
                width: 30,
                borderRadius: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Bell fontSize="20" color={notification ? "white" : "grey"} />
            </div>
          </DropdownToggle>
          <DropdownMenu right>
            {/* <DropdownItem header>Choose reminder time</DropdownItem> */}
            <DropdownItem onClick={() => onChangeReminder(2)}>
              2 Mins
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => onChangeReminder(5)}>
              5 Mins
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => onChangeReminder(10)}>
              10 Mins
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => onChangeReminder(20)}>
              20 Mins
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => onChangeReminder(60)}>
              60 Mins
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    } else {
      return null;
    }
  };

  return renderBell();
};

const mapStateToProps = (state) => ({
  trackInfo: state.raceReducer.trackInfoOpt,
  isLoggedIn: state.auth.isLoggedIn,
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Bells);
