import moment from "moment-timezone";
import React from "react";
import { Link } from "react-router-dom";

export function checkRouteDate(date) {
  var today = moment().tz("Australia/Sydney").format("DD-MM-YYYY");
  var tomorrow = moment()
    .tz("Australia/Sydney")
    .add(1, "day")
    .format("DD-MM-YYYY");
  var yesterday = moment()
    .tz("Australia/Sydney")
    .subtract(1, "day")
    .format("DD-MM-YYYY");

  if (date === today) {
    return "today";
  } else if (date === tomorrow) {
    return "tomorrow";
  } else if (date === yesterday) {
    return "yesterday";
  } else {
    return moment(date, "DD-MM-YYYY")
      .tz("Australia/Sydney")
      .format("DD-MM-YYYY");
  }
}

export function transferRouteRaces(matchDate) {
  if (matchDate === "today") {
    return "today";
  } else if (matchDate === "tomorrow") {
    return "tomorrow";
  } else if (matchDate === "yesterday") {
    return "yesterday";
  }
  return moment(matchDate, "DD-MM-YYYY")
    .tz("Australia/Sydney")
    .format("DD-MM-YYYY");
}

export function transferRouteRacesDispatch(matchDate) {
  if (matchDate === "today") {
    return moment().tz("Australia/Sydney").format("YYYY-MM-DD");
  } else if (matchDate === "tomorrow") {
    return moment().tz("Australia/Sydney").add(1, "day").format("YYYY-MM-DD");
  } else if (matchDate === "yesterday") {
    return moment()
      .tz("Australia/Sydney")
      .subtract(1, "day")
      .format("YYYY-MM-DD");
  }
  return moment(matchDate, "DD-MM-YYYY")
    .tz("Australia/Sydney")
    .format("YYYY-MM-DD");
}

export function transferRouteRacesDD(matchDate) {
  if (matchDate === "today") {
    return ConvertUTCTimeToLocalTime1(
      moment().tz("Australia/Sydney").format("DD-MM-YYYY")
    );
  } else if (matchDate === "tomorrow") {
    return moment().tz("Australia/Sydney").add(1, "day").format("DD-MM-YYYY");
  } else if (matchDate === "yesterday") {
    return moment()
      .tz("Australia/Sydney")
      .subtract(1, "day")
      .format("DD-MM-YYYY");
  }
  return moment(matchDate, "DD-MM-YYYY")
    .tz("Australia/Sydney")
    .format("DD-MM-YYYY");
}

export function linkToRacePageWhileReturningDataToTable(
  data,
  date,
  venue,
  rnum,
  point_id
) {
  var baseDate = moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
  var today = moment().tz("Australia/Sydney").format("DD-MM-YYYY");
  var tomorrow = moment()
    .tz("Australia/Sydney")
    .add(1, "day")
    .format("DD-MM-YYYY");
  var yesterday = moment()
    .tz("Australia/Sydney")
    .subtract(1, "day")
    .format("DD-MM-YYYY");
  var meetdate;
  if (baseDate === today) {
    meetdate = "today";
  } else if (baseDate === tomorrow) {
    meetdate = "tomorrow";
  } else if (baseDate === yesterday) {
    meetdate = "yesterday";
  } else {
    meetdate = moment(date, "YYYY-MM-DD")
      .tz("Australia/Sydney")
      .format("DD-MM-YYYY");
  }
  return (
    <Link
      style={{ color: "inherit" }}
      to={`/horse-racing-tips/${meetdate}/${venue}/R${rnum}/${point_id}`}
    >
      {data}
    </Link>
  );
}

export function bookie(bookie, disableB) {
  if (!disableB) {
    if (bookie === "Unibet") {
      return "https://b1.trickyrock.com/redirect.aspx?pid=31144281&bid=21418";
    } else if (bookie === "sportsBetting") {
      return "https://www.boombet.com.au/join/?Referrer=PTPTips";
    }
  }
}

export function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function ConvertUTCTimeToLocalTime(RTime, RDate, RName) {
  try {
    let raceDate = moment(RDate).tz("Australia/Sydney");
    let arr = RTime.split(":");
    raceDate.set("hour", arr[0]);
    raceDate.set("minute", arr[1]);

    let now = moment();
    let hoursDif =
      moment().tz("Australia/Sydney").get("hour") - now.get("hour");
    let timediff =
      moment().tz("Australia/Sydney").get("hour") + 24 - now.get("hour");
    if (raceDate.get("day") === now.get("day") && hoursDif < 0) {
      raceDate.set("hour", raceDate.get("hour") + Math.abs(hoursDif));
    } else if (raceDate.get("day") === now.get("day") && hoursDif > 0) {
      raceDate.set("hour", raceDate.get("hour") - hoursDif);
    } else {
      raceDate.set("hour", raceDate.get("hour") - timediff);
    }

    return raceDate.format("HH:mm");
  } catch (error) {
    console.log("Error converting time.");
    return "";
  }
}

export function ConvertUTCTimeToLocalTime1(RTime, RDate, RName) {
  try {
    let raceDate = moment(RDate).tz("Australia/Sydney");
    let arr = RTime.split(":");
    raceDate.set("day", arr[0]);
    raceDate.set("month", arr[1]);
    raceDate.set("year", arr[2]);

    let now = moment();

    // let timez = raceDate(moment.tz(now));

    if (
      raceDate.get("day") === now.get("day") &&
      raceDate.get("month") === now.get("month") &&
      raceDate.get("year") === now.get("year")
    ) {
      /**
       * Do nothing.
       */
    } else {
      raceDate.set("day", now.get("day"));
      raceDate.set("month", now.get("month"));
      raceDate.set("year", now.get("year"));
    }
    // if (raceDate.get('day') === now.get('day')  ){
    //   raceDate.set('day' , raceDate.get('day'));
    // }else{
    //   raceDate.set('day' , now.get('day'));
    // }
    return raceDate.format("DD-MM-YYYY");
  } catch (error) {
    console.log("Error converting time.");
    return "";
  }
}
