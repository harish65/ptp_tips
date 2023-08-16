var connection = require("../../config/database.config.js");
var connectionPool = require("../../config/database.pool.config");
var moment = require("moment-timezone");
const axios = require("axios");
var xml2js = require("xml2js");
var XMLParser = new xml2js.Parser();

/* GET DATA FUNCTION */
const getData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("get data ERROR" + JSON.stringify(error));
  }
};

let pool = connectionPool.getPool();
function executeMltpQueries(sqls) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    }
    try {
      for (let i = 0; i < sqls.length; i++) {
        try {
          connection
            .promise()
            .query(sqls[i])
            .then(([rows, fields]) => {
              // console.log('query ' + i + ' done')
              // console.log(sqls[i]);
            })
            .catch("query " + i + " error: " + console.log);
        } catch (err) {
          console.log("POOL ERROR 2" + err);
        }
      }
    } catch (error) {
      console.log("executeMltpQueries error :" + error);
    } finally {
      connection.release();
    }
  });
}

exports.updateOdds = (req, res) => {
  // console.log(req)
  // const { getID } = req.body
  var UBID;
  var SBID;
  var LBID;
  var PID;
  var getID = req.params.id;
  let getIDAndTime =
    "SELECT unibet_venue_id,sb_venue_id,ladbrokes_venue_id,point_id from points WHERE point_id=" +
    getID +
    ";";
  try {
    connection.query(getIDAndTime, async function (error, results, fields) {
      if (error) {
        res.status(500).send({
          status: 500,
          message: "Error getting data update odds",
        });
        console.log("get RaceId ERROR: " + JSON.stringify(error));
      } else {
        for (let i = 0; i < results.length; i++) {
          LBID = results[i].ladbrokes_venue_id;
          UBID = results[i].unibet_venue_id;
          SBID = results[i].sb_venue_id;
          PID = results[i].point_id;
          console.log(UBID + " : HAS BEEN UPDATED USING REFRESH ODDS ");
          if (SBID != null) {
            SBODDS(SBID, PID);
          }
          if (LBID != null) {
            LBODDS(LBID, PID);
          }
          getUBODDS(UBID, PID);
        }
        res.status(200).send({
          status: 200,
        });
      }
    });
  } catch (err) {
    console.log("GETTING IDS FROM DB ERROR" + getID);
  }
};

/*********************GET ODDS FROM SPORTSBETTING**********************/
var SBODDS = async (raceID, PID) => {
  var SBHNUM;
  var SBWin;
  var SBPlace;
  var SBOdds;
  const SportsBetting = "http://feeds.boombetau.com/sportprices.asp?sportid=1"; //with this link we will fetch the real prices

  try {
    XMLParser.parseString(await getData(SportsBetting), function (err, result) {
      if (err) {
        console.log("XML PARSE ERROR: " + err);
      } else {
        try {
          let queries = [];
          for (let j = 0; j < result.SportFeed.e.length; j++) {
            if (result.SportFeed.e[j].$.EventID == raceID) {
              for (let k = 0; k < result.SportFeed.e[j].c.length; k++) {
                SBHNUM = result.SportFeed.e[j].c[k].$.num;
                if (result.SportFeed.e[j].c[k].$.win) {
                  SBWin = result.SportFeed.e[j].c[k].$.win;
                } else {
                  SBWin = 0.0;
                }
                if (result.SportFeed.e[j].c[k].$.plc) {
                  SBPlace = result.SportFeed.e[j].c[k].$.plc;
                } else {
                  SBPlace = 0.0;
                }
                SBOdds = SBWin + "," + SBPlace;
                let UpdateSBOdds =
                  "UPDATE points_details SET sportsbetting_odds='" +
                  SBOdds +
                  "' WHERE point_id=" +
                  PID +
                  " AND tab_no=" +
                  SBHNUM +
                  ";";
                queries.push(UpdateSBOdds);
              }
            }
          }
          if (queries) {
            executeMltpQueries(queries);
          }
        } catch (err) {
          console.log("SBODDS UPDATE ERROR " + PID);
        }
      }
    });
  } catch (err) {
    console.log("GETTING DATA  FROM SB ERROR" + PID);
  }
};

var getUBODDS = async (raceID, PID) => {
  try {
    /* UNIBET */
    const app_id = "3d645c8d";
    const app_key = "03599abd599417ae8e4f43739eb3945b";
    const UnibetRace = `http://api.unicdn.net/v1/feeds/racingau/api/v1/events/${raceID}.json?app_id=${app_id}&app_key=${app_key}`;
    let queries = [];
    await getData(UnibetRace).then(async (response) => {
      try {
        //var trackCondition = getTrackCondition(response.meeting.trackCondition)
        // var rDate =moment(response.eventDateTimeUtc).tz('Australia/Sydney').format("YYYY-MM-DD")
        var raceTime;
        if (response.eventDateTimeUtc) {
          raceTime = JSON.stringify(
            moment(response.eventDateTimeUtc)
              .tz("Australia/Sydney")
              .format("HH:mm:ss")
          );
        } else {
          raceTime = null;
        }
        var raceSuspended;
        if (response.eventCloseDateTimeUtc) {
          raceSuspended = JSON.stringify(
            moment(response.eventCloseDateTimeUtc)
              .tz("Australia/Sydney")
              .format("HH:mm:ss")
          );
        } else {
          raceSuspended = null;
        }
        var status;
        if (response.status) {
          if (response.status == "Abandoned") {
            let updateAbandoned =
              "UPDATE points SET track_condition='ABND' WHERE unibet_venue_id='" +
              raceID +
              "';";
            queries.push(updateAbandoned);
          }
          status = JSON.stringify(response.status);
        } else {
          status = null;
        }

        let Unibet_update_point =
          "UPDATE points SET race_closed_time =" +
          raceSuspended +
          " ,race_status=" +
          status +
          "  WHERE unibet_venue_id ='" +
          raceID +
          "';";
        queries.push(Unibet_update_point);

        try {
          for (let i = 0; i < response.competitors.length; i++) {
            var hStatus;
            var hNumber;
            var hName;
            var jockey;
            var trainer;
            var SF;
            var barrier;
            var ub_fw;
            var ub_fp;
            var ub_w;
            var ub_p;
            var unibetOdds;
            var fw = 0;
            var w = 0;
            var fp = 0;
            var p = 0;

            if (response.competitors[i].status) {
              hStatus = JSON.stringify(response.competitors[i].status);
            } else {
              hStatus = null;
            } //check if it is starter or scratched
            if (response.competitors[i].sequence) {
              hNumber = response.competitors[i].sequence;
            } else {
              hNumber = null;
            }
            if (response.competitors[i].name) {
              hName = JSON.stringify(response.competitors[i].name);
            } else {
              hName = null;
            }
            if (response.competitors[i].jockey) {
              jockey = JSON.stringify(response.competitors[i].jockey);
            } else {
              jockey = null;
            }
            if (response.competitors[i].trainer) {
              trainer = JSON.stringify(response.competitors[i].trainer);
            } else {
              trainer = null;
            }
            if (response.competitors[i].shortForm) {
              SF = JSON.stringify(response.competitors[i].shortForm);
            } else {
              SF = null;
            }
            if (response.competitors[i].startPos) {
              barrier = response.competitors[i].startPos;
            } else {
              barrier = null;
            }
            if (hStatus === '"LateScratching"' || hStatus === '"Scratched"') {
              let updateselec =
                " CALL Set_Selction_scratched(" + PID + "," + hNumber + ");";
              queries.push(updateselec);
              console.log(updateselec);
              unibetOdds = JSON.stringify(0 + "," + 0);
            } else {
              for (let j = 0; j < response.competitors[i].prices.length; j++) {
                if (response.competitors[i].prices[j].betType === "FixedWin") {
                  fw++;
                  if (response.competitors[i].prices[j].price) {
                    ub_fw = response.competitors[i].prices[j].price;
                  } else {
                    ub_fw = 0;
                  }
                } else if (
                  response.competitors[i].prices[j].betType === "FixedPlace"
                ) {
                  fp++;
                  if (response.competitors[i].prices[j].price) {
                    ub_fp = response.competitors[i].prices[j].price;
                  } else {
                    ub_fp = 0;
                  }
                } else if (
                  response.competitors[i].prices[j].betType === "Place"
                ) {
                  p++;
                  if (response.competitors[i].prices[j].price) {
                    ub_p = response.competitors[i].prices[j].price;
                  } else {
                    ub_p = 0;
                  }
                } else if (
                  response.competitors[i].prices[j].betType === "Win"
                ) {
                  if (response.competitors[i].prices[j].price) {
                    ub_w = response.competitors[i].prices[j].price;
                  } else {
                    ub_w = 0;
                  }
                  w++;
                }
              }
              if (fw == 1 && fp == 1) {
                unibetOdds = JSON.stringify(ub_fw + "," + ub_fp);
              } else if (fw == 1 && p == 1) {
                unibetOdds = JSON.stringify(ub_fw + "," + ub_p);
              } else if ((w = 1 && fp == 1)) {
                unibetOdds = JSON.stringify(ub_w + "," + ub_fp);
              } else if (w == 1 && p == 1) {
                unibetOdds = JSON.stringify(ub_fw + "," + ub_fp);
              } else {
                unibetOdds = JSON.stringify(0 + "," + 0);
              }
            }

            let ubUpdate =
              "UPDATE points_details SET  horse_status= " +
              hStatus +
              ",tab_no=" +
              hNumber +
              ",horse_name=" +
              hName +
              ",\
              horse_jockey=" +
              jockey +
              ",horse_trainer=" +
              trainer +
              ",horse_sf=" +
              SF +
              ",horse_barrier=" +
              barrier +
              ",unibet_odds=" +
              unibetOdds +
              " Where point_id=" +
              PID +
              " AND tab_no=" +
              hNumber +
              ";";
            queries.push(ubUpdate);
          }
          // getSelectONTrackCond(PID)
        } catch (err) {
          console.log("ERRROOORRRRRRR" + err);
        }

        if (queries) {
          executeMltpQueries(queries);
        }
      } catch (err) {
        console.log("ERROR 146 " + err);
      }
    });
  } catch (err) {
    console.log("ERROR 147 " + err);
  }
};

var LBODDS = async (LBID, P_ID) => {
  try {
    var LBWeight;
    var LBWin;
    var LBPlace;
    var LBHNumb;
    var LBOdds;
    var trackCond;
    var hStatus;
    var scrTime;
    var racetime;
    var scratchedT;
    var scrNumb;

    const url = `https://api-affiliates.ladbrokes.com.au/racing/events/${LBID}`;

    getData(url).then((response) => {
      let queries = [];

      // if (response.data.race.status) {
      //   if (response.data.race.status == "Abandoned") {
      //     trackCond = JSON.stringify("ABND")
      //   } else {
      //     if (response.data.race.meeting_name == SyBasedOnName(response.data.race.meeting_name)) {
      //       trackCond = JSON.stringify("SY")
      //     } else {
      //       if (response.data.race.track_condition) { trackCond = JSON.stringify(getTrackCondition(response.data.race.track_condition)) } else { trackCond = JSON.stringify("G") }
      //     }
      //   }
      // } else { if (response.data.race.track_condition) { trackCond = JSON.stringify(getTrackCondition(response.data.race.track_condition)) } else { trackCond = JSON.stringify("G") } }

      // if (response.data.race.actual_start_string) {
      //   var t = (response.data.race.actual_start_string).split(" ")
      //   var ti = t[0] + "T" + t[1] + t[2]
      //   racetime = (moment(ti).tz('Australia/Sydney').format("YYYY-MM-DDTHH:mm:ss"))
      // } else { racetime = null }

      for (let i = 0; i < response.data.runners.length; i++) {
        if (response.data.runners[i].is_scratched == true) {
          scrTime = JSON.stringify(
            moment(response.data.runners[i].scr_time)
              .tz("Australia/Sydney")
              .format("YYYY-MM-DDTHH:mm:ss")
          );
          scratchedT = moment(response.data.runners[i].scr_time)
            .tz("Australia/Sydney")
            .format("YYYY-MM-DDTHH:mm:ss");
          scrNumb = response.data.runners[i].runner_number;
          // sendScratchedmail(racetime, scratchedT, scrNumb, P_ID)
        } else {
          scrTime = null;
        }
        if (response.data.runners[i].weight.total) {
          LBWeight = JSON.stringify(response.data.runners[i].weight.total);
        } else {
          LBWeight = null;
        }
        if (response.data.runners[i].is_scratched == false) {
          hStatus = JSON.stringify("Starter");
          if (response.data.runners[i].odds.fixed_win) {
            LBWin = response.data.runners[i].odds.fixed_win;
          } else {
            LBWin = 0.0;
          }
          if (response.data.runners[i].odds.fixed_place) {
            LBPlace = response.data.runners[i].odds.fixed_place;
          } else {
            LBPlace = 0.0;
          }
          LBOdds = JSON.stringify(LBWin + "," + LBPlace);
        } else {
          LBOdds = JSON.stringify(0 + "," + 0);
          hStatus = JSON.stringify("Scratched");
        }
        LBHNumb = response.data.runners[i].runner_number;

        let updateLBData =
          "UPDATE points_details SET ladbrokes_odds=" +
          LBOdds +
          ",horse_weight=" +
          LBWeight +
          ",horse_status=" +
          hStatus +
          ",scr_time=" +
          scrTime +
          " WHERE point_id=" +
          P_ID +
          " AND tab_no=" +
          LBHNumb +
          ";";
        queries.push(updateLBData);
      }
      // let updateTrackCond = "UPDATE points SET track_condition=" + trackCond + " WHERE point_id=" + P_ID + " AND track_condition !='N/A' ;"
      // queries.push(updateTrackCond)
      if (queries) {
        executeMltpQueries(queries);
        console.log("LB Data Uppdated");
      }
    });
  } catch (err) {
    console.log("ERROR 141 " + err);
  }
};
