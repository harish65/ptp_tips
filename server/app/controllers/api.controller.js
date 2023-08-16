//////////////////////////////////////////////////////////
// HANDLE ACTION CONTROLLED BY ADMIN FOR ANALYTICS ///
//////////////////////////////////////////////////////////
var connection = require("../../config/database.config.js");
var connectionsecond = require("../../config/database_sec.config.js");
var moment = require("moment-timezone");
var FormData = require("form-data");
var mailerConfig = require("../../config/mailer.config");
var getTrackCondition = require("../../util/trackConditionsAAP");
var jwt = require("jsonwebtoken");
var config = require("../../config/config");
var db = require("../../config/database.pool.config");
var connectionPromise = db.getPoolPromise();
const stripe = require("stripe")("sk_test_beAPffHK4BvYSbs4Wx1Tzgni00ZqrsiBBk");

//var Feed = require('rss-to-json');

// GET HOME INFO
exports.getHomeInfo = (req, res) => {
  let homePageData = `SELECT * FROM monthly_selections order by mon_year desc;
                        SELECT meetdate as date, count(result) as selection,
                            (COUNT(CASE WHEN result = 'WON' then 1 ELSE NULL END) +
                            COUNT(CASE WHEN result = '2ND' then 1 ELSE NULL END) +
                            COUNT(CASE WHEN result = '3RD' then 1 ELSE NULL END) ) as place,
                            COUNT(CASE WHEN result = 'WON' then 1 ELSE NULL END) as win
                            FROM points where result IS NOT NULL AND is_na !=1 AND track_condition !='ABND'
                            group by meetdate order by meetdate desc limit 30 ;
                            SELECT p.meetdate as date, ub_win ,ub_place , result, position
                            FROM points as p join points_details as pd on p.point_id = pd.point_id
                            where result IS NOT NULL AND is_na !=1 AND track_condition !='ABND' AND meetdate> DATE_SUB(NOW(), INTERVAL 30 DAY)
                            AND (CASE WHEN p.track_condition = 'G' THEN pd.points_per_good
							   WHEN p.track_condition = 'SO' THEN pd.points_per_soft
							   WHEN p.track_condition = 'SY' THEN pd.points_per_synth
							   WHEN p.track_condition = 'F' THEN pd.points_per_firm
							   WHEN p.track_condition = 'H' THEN pd.points_per_heavy
							   ELSE pd.points_per_good
							   END)= (CASE WHEN p.track_condition = 'G' THEN (select (pd3.points_per_good) from points_details as pd3 where pd3.point_id=p.point_id order by pd3.points_per_good desc limit 1)
							   WHEN p.track_condition = 'SO' THEN (select max(pd3.points_per_soft) from points_details as pd3 where pd3.point_id=p.point_id order by pd3.points_per_soft desc limit 1)
							   WHEN p.track_condition = 'SY' THEN(select max(pd3.points_per_synth) from points_details as pd3 where pd3.point_id=p.point_id order by pd3.points_per_synth desc limit 1)
							   WHEN p.track_condition = 'F' THEN (select max(pd3.points_per_firm) from points_details as pd3 where pd3.point_id=p.point_id order by pd3.points_per_firm desc limit 1)
							   WHEN p.track_condition = 'H' THEN(select max(pd3.points_per_heavy) from points_details as pd3 where pd3.point_id=p.point_id order by pd3.points_per_heavy desc limit 1)
							   ELSE (select max(pd3.points_per_good) from points_details as pd3 where pd3.point_id=p.point_id order by pd3.points_per_good desc limit 1)
							   END)
							order by meetdate desc ,
                            (CASE WHEN p.track_condition = 'G' THEN pd.points_per_good
                            WHEN p.track_condition = 'SO' THEN pd.points_per_soft
                            WHEN p.track_condition = 'SY' THEN pd.points_per_synth
                            WHEN p.track_condition = 'F' THEN pd.points_per_firm
                            WHEN p.track_condition = 'H' THEN pd.points_per_heavy
                            ELSE pd.points_per_good
                            END)DESC;`;

  connection.query(homePageData, function (error, results, fields) {
    if (error) {
      res.status(500).send({
        status: 500,
        message: "Error getting data for the monthly selection table",
      });
      console.log(
        "Error getting data for the monthly selection table :" + error
      );
    } else {
      let dailyTable = [];

      results[1].map((zone) => {
        won_odds = 0;
        place_odds = 0;
        results[2].map((zone1) => {
          if (zone.date === zone1.date) {
            if (zone1.result !== "LOST") {
              if (zone1.result === "WON" && zone1.position === 1) {
                won_odds += Number(zone1.ub_win);
                place_odds += Number(zone1.ub_place);
              } else {
                place_odds += zone1.ub_place;
              }
            }
          }
        });
        dailyTable.push({
          date: zone.date,
          selection: zone.selection,
          place: zone.place,
          win: zone.win,
          won_odds: won_odds,
          place_odds: place_odds,
        });
      });

      res.status(200).send({
        status: 200,
        data: { monthlyTable: results[0], dailyTable: dailyTable },
      });
    }
  });
};

// GET NEXT 10 TIPS INFOS
exports.getNextTenTips = (req, res) => {
  const { checked, token } = req.body;
  let uuid = jwt.decode(token, config.JWT_SECRET);

  let Next10combined;
  // if (checked) {
  Next10combined = `CALL new_next10tips(${1});`;
  // } else {
  //     Next10combined = `CALL new_next10tips(${0});`
  // }

  if (uuid) {
    Next10combined =
      Next10combined +
      "SELECT token FROM client WHERE client_id =" +
      uuid.id +
      " ;";
  }

  connection.query(Next10combined, function (error, results, fields) {
    if (error) {
      res.status(500).send({
        status: 500,
        message: "Error getting data for next 10 tips",
      });
      console.log("Error getting data for next 10 tips :" + error);
    } else {
      let tokenize;
      if (results[2]) {
        if (results[2][0].token && results[2][0].token === token) {
          tokenize = "ok";
        } else {
          tokenize = "logout";
        }
      } else {
        tokenize = "nothing";
      }
      console.log("next10", tokenize);

      let nextData = results[0];
      for (let i = 0; i < results[1].length; i++) {
        nextData.push(results[1][i]);
      }
      res.status(200).send({
        status: 200,
        data: { nextTips: nextData },
        time: moment().tz("Australia/Sydney").format("YYYY-MM-DD HH:mm:ss"),
        tokenize: tokenize,
      });
    }
  });
};

exports.getFutureTips = (req, res) => {
  let futureTips = `select  (select JSON_ARRAYAGG(JSON_OBJECT('point_id',point_id,'meetdate',meetdate,'race_num',race_num,'track_condition',track_condition,'track_name',track_name,'track_distance',track_distance,
    'track_description',track_description,'raceprize',ind_raceprize,'rating',rating,'is_na',is_na,'raceDetails',raceDetails,'race_time',race_time))as s
    from (select point_id,meetdate,race_num,track_condition,track_name,track_distance,rating,is_na,race_time,track_description,ind_raceprize,
        (SELECT JSON_ARRAYAGG(JSON_OBJECT
        ('tab_no',tab_no,'horse_name',horse_name,'horse_jockey',horse_jockey,'ub_win',ub_win,'ub_place',ub_place,'sb_win',sb_win,'sb_place',sb_place,'horse_id',horse_id,'career',career,'selection',selection_ptp, 'horse_barrier', horse_barrier)) as race_details
        from (select horse_barrier,tab_no,horse_name,horse_jockey,ROUND(pd.ub_win,2) as ub_win,ub_place,horse_id,sb_win,sb_place,
        (CASE WHEN p.track_condition = 'G' THEN ROUND(pd.points_per_good,2)
             WHEN p.track_condition = 'SO' THEN ROUND(pd.points_per_soft,2)
             WHEN p.track_condition = 'SY' THEN ROUND(pd.points_per_synth,2)
             WHEN p.track_condition = 'F' THEN ROUND(pd.points_per_firm,2)
             WHEN p.track_condition = 'H' THEN ROUND(pd.points_per_heavy,2)
             ELSE ROUND(pd.points_per_good,2) END) as selection_ptp,(select hp.CAREERSTS from horse_profile as hp where hp.horse_id=pd.horse_id limit 1 ) as career
        from points_details as pd where pd.point_id=p.point_id and pd.horse_status!='Scratched' and pd.horse_status !='LateScratching' order by selection_ptp desc )as t )as raceDetails
        from points as p where meetdate>=curdate() AND track_condition!='ABND' and result_flag=0 order by meetdate asc) as s
    )as races,
    (select JSON_ARRAYAGG(JSON_OBJECT('value',track_name,'label',track_name))as t
    from (select distinct(track_name) from points as p where meetdate>=curdate() AND track_condition!='ABND' and result_flag=0 )as t
    )as venues,
    (select JSON_ARRAYAGG(JSON_OBJECT('value',horse_name,'label',horse_name))as t
    from (select distinct(pd.horse_name) from points as p join points_details as pd on p.point_id=pd.point_id where  meetdate>=curdate() AND track_condition!='ABND' and result_flag=0 )as t
    )as horses,
    (select JSON_ARRAYAGG(JSON_OBJECT('value',horse_jockey,'label',horse_jockey))as t
    from (select distinct(pd.horse_jockey) from points as p join points_details as pd on p.point_id=pd.point_id where  meetdate>=curdate() AND track_condition!='ABND' and result_flag=0 and pd.horse_jockey!='Unknown')as t
    )as jockeys;`;

  //CONNECTION FOR HORSES DETAILS
  connection.query(futureTips, async function (error, results, fields) {
    if (error) {
      res.status(500).send({
        status: 500,
        message: "Error getting data for future tips",
      });
      console.log("Error getting data for future tips: " + error);
    } else {
      let allHorses = await loadHorsesByRace(results);
      res.status(200).send({
        status: 200,
        data: results[0],
        allHorses: allHorses,
        time: moment().format("YYYY-MM-DD HH:mm:ss"),
      });
    }
  });

  //CONNECTION FOR JOCKEYS
  connection.query(futureTips, async function (error, results, fields) {
    if (error) {
      res.status(500).send({
        status: 500,
        message: "Error getting data for futur tips",
      });
      console.log("Error getting data for futur tips: " + error);
    } else {
      let allJockeys = await loadJockeys(results);
      res
        .status(200)
        .send({
          status: 200,
          data: results[0],
          allJockeys: allJockeys,
          time: moment().format("YYYY-MM-DD HH:mm:ss"),
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

//GET HORSES DETAILS FOR SEARCH FILTER

const loadHorsesByRace = async (data) => {
  let sql = `select * from points_details where point_id in (`;
  for (let i = 0; i < data[0].races.length; i++) {
    if (i === 0) {
      sql += `${data[0].races[i].point_id}`;
    } else {
      sql += `,${data[0].races[i].point_id}`;
    }
  }
  sql += `);`;

  let con;
  try {
    con = await connectionPromise.getConnection();
    const [horses] = await con.query(sql).catch((err) => { });
    //console.log(horses);
    return horses;
  } catch (error) {
    console.log(error);
  } finally {
    if (con) {
      con.release();
    }
  }
};

//GET JOCKEYS DETAILS FOR SEARCH FILTER
const loadJockeys = async (data) => {
  let sql = `select * from jockeys `;

  for (let i = 0; i < data[0].jockeys; i++) {
    if (i === 0) {
      sql += `${data[0].jockeys[i]}`;
    } else {
      sql += `,${data[0].jockeys[i]}`;
    }
  }

  let con;
  try {
    con = await connectionPromise.getConnection();
    const [jockeys] = await con.query(sql);
    console.log(jockeys);
    return jockeys;
  } catch (error) {
    console.log(error);
  } finally {
    if (con) {
      con.release();
    }
  }
};

// GET LAST 10 TIPS INFOS
exports.getLastTenTips = (req, res) => {
  const { checked } = req.body;
  //console.log('last', checked )

  let Last10combined;
  // if (checked) {
  Last10combined = `CALL new_last10tips(${1}) ;`;
  // } else {
  //     Last10combined = `CALL new_last10tips(${0}) ;`
  // }

  connection.query(Last10combined, function (error, results, fields) {
    if (error) {
      res.status(500).send({
        status: 500,
        message: "Error getting data for last 10 tips",
      });
      console.log("Error getting data for last 10 tips :" + error);
    } else {
      // console.log(results)
      let lastData = results[0];
      for (let i = 0; i < results[1].length; i++) {
        lastData.push(results[1][i]);
      }
      res.status(200).send({
        status: 200,
        data: { lastTips: lastData },
      });
    }
  });
};

// GET SELECTION DATE DATA
exports.getSelectionsDate = (req, res) => {
  const { passDate } = req.body;
  let getSelections =
    " SELECT  *\
                            FROM (\
                            SELECT distinct track_name as venue, trackcode, \
                                    (case when track_condition = 'ABND' THEN 0 ELSE raceprize end) as raceprize,\
                                    (case when track_condition != 'N/A' THEN track_condition end) as trackcond, full_track_condition,\
                                    (select JSON_OBJECT('venue_message',message,'message_finished',finished,'venue_state',venue_state) as vm \
                                        from( select message,finished,venue_state from venue_message as v ,race_venues as rv  where p.track_name = rv.venue_fullName and rv.venue_id = v.venue_id \
                                        order by v.meetdate desc,v.time desc limit 1)as t )as message, \
                                    (select venue_state \
                                        from( select venue_state from race_venues as rv  where p.trackcode = rv.venue_shortname \
                                        limit 1)as t )as state \
                            FROM points as p \
                            WHERE p.meetdate ='" +
    passDate +
    "' \
                            ORDER BY raceprize desc, venue asc\
                            )\
                            as t\
                            WHERE t.trackcond is not null AND t.trackcond != 'ABND';\
                        SELECT point_id as pt, race_time, p.meetdate, race_num, track_name as venue, track_condition,result_status, race_status,result,is_na,\
                                (select JSON_ARRAYAGG(JSON_OBJECT('horse_name',horse_name,'tab_no',tab_no,'silkUrl',horse_silksUrl,'position',position,'ub_win',ub_win,'ub_place',ub_place,'sb_win',sb_win,'sb_place',sb_place,'percent',percent)) as t \
                                from( select horse_name,tab_no,horse_silksUrl,position,ub_win,ub_place,sb_win,sb_place, \
                                    (CASE \
                                        WHEN p.track_condition = 'G' THEN d.points_per_good \
                                        WHEN p.track_condition = 'SO' THEN d.points_per_soft \
                                        WHEN p.track_condition = 'SY' THEN d.points_per_synth \
                                        WHEN p.track_condition = 'F' THEN d.points_per_firm \
                                        WHEN p.track_condition = 'H' THEN d.points_per_heavy \
                                        ELSE d.points_per_good END) as percent \
                                    from points_details as d,points as p  where d.point_id=pt and d.point_id=p.point_id \
                                ORDER BY CASE \
                                    WHEN result is not null THEN position*-1 \
                                    WHEN track_condition = 'G' THEN points_per_good \
                                    WHEN track_condition = 'SO' THEN points_per_soft \
                                    WHEN track_condition = 'SY' THEN points_per_synth \
                                    WHEN track_condition = 'F' THEN points_per_firm \
                                    WHEN track_condition = 'H' THEN points_per_heavy \
                                    ELSE points_per_good \
                                END DESC,tab_no asc  limit 4)as t )as horses \
                                FROM points as p  \
                                WHERE p.meetdate ='" +
    passDate +
    "' \
                                ORDER BY raceprize desc , track_name asc,race_num asc;\
                        SELECT p.track_name,p.race_num,d.tab_no,d.position from points as p,points_details as d WHERE p.point_id=d.point_id AND meetdate ='" +
    passDate +
    "' \
                            AND d.position IS NOT NULL AND d.position between 1 and 4 \
                            order by p.raceprize desc , p.track_name asc,p.race_num asc,d.position asc;";

  connection.query(getSelections, function (error, results, fields) {
    if (error) {
      res.status(500).send({
        status: 500,
        message: "Error getting data for getSelectionsDate",
      });
      console.log("Error getting data for getSelectionsDate :" + error);
    } else {
      let finalData = [];
      if (results[0]) {
        results[0].map((zone, i) => {
          if (i === 0 || results[0][i].venue !== results[0][i - 1].venue) {
            let venue = zone.venue;
            let trackcode = zone.trackcode;
            let trackcond = zone.trackcond;
            let trackCondFull = zone.full_track_condition;
            let info = [];
            let ids = [];
            results[1].map((zone2) => {
              if (venue === zone2.venue) {
                let positions = [];
                results[2].map((zone3) => {
                  if (
                    zone2.venue === zone3.track_name &&
                    zone2.race_num === zone3.race_num
                  ) {
                    positions.push({
                      pos: zone3.position,
                      tab_no: zone3.tab_no,
                    });
                  }
                });
                ids.push({ point_id: zone2.pt });
                info.push({
                  point_id: zone2.pt,
                  meetdate: zone2.meetdate,
                  race_time: zone2.race_time,
                  race_num: zone2.race_num,
                  track_condition: zone2.track_condition,
                  result_status: zone2.result_status,
                  race_status: zone2.race_status,
                  result: zone2.result,
                  is_na: zone2.is_na,
                  positions: positions,
                  horses: zone2.horses,
                });
              }
            });
            finalData.push({
              venue: venue,
              trackcode: trackcode,
              info: info,
              ids: ids,
              trackcond: trackcond,
              full_track_condition: trackCondFull,
              finished: zone.finished,
              message: zone.message,
              state: zone.state,
            });
          }
        });
      }
      res.status(200).send({
        status: 200,
        data: { selections: finalData },
      });
    }
  });
};

// GET RESULTS FOR A SPECIFIC DATE
exports.getResults = (req, res) => {
  const { passDate } = req.body;
  let dayOfWeek = moment(passDate, "YYYY-MM-DD").format("d");

  // let getResultsForDate = "SELECT DISTINCT track_name,raceprize,trackcode as tc , runs, won, place, avg_win_odd\
  //                             FROM points as p join race_venues as rv on p.trackcode = rv.venue_shortName\
  //                             WHERE meetdate ='" + passDate + "'\
  //                             ORDER BY raceprize desc , track_name asc; \
  //                     SELECT point_id, race_num, race_time, track_name,result_status,meetdate,\
  //                         track_condition, bookie_name, selections, result, r1, r2, r3,r4,race_status,is_na \
  //                         FROM points \
  //                         WHERE meetdate ='" + passDate + "' \
  //                         ORDER BY raceprize desc , track_name asc, race_num asc; \
  //                     SELECT COUNT(selections ) as selections, COUNT(CASE WHEN result = 'WON' then 1 ELSE NULL END) as winners, \
  //                         COUNT(CASE WHEN result = '2ND' then 1 ELSE NULL END) as second, COUNT(CASE WHEN result = '3RD' then 1 ELSE NULL END) as third \
  //                         FROM points \
  //                         WHERE meetdate ='" + passDate + "' \
  //                         AND (is_na !=1 AND track_condition !='ABND') \
  //                         AND result is not null; \
  //                     SELECT p.track_name,p.race_num,d.tab_no,d.position,d.ub_win,d.ub_place,d.sb_win,d.sb_place from points as p,points_details as d WHERE p.point_id=d.point_id AND meetdate ='" + passDate + "' \
  //                         AND d.position IS NOT NULL AND d.position between 1 and 4 \
  //                         order by p.raceprize desc , p.track_name asc,p.race_num asc,d.position asc;\
  //                     SELECT (select JSON_OBJECT('runs',runs,'won',won,'winOdd',avgOdd,'place',place)as t \
  // 		                from (   SELECT count(distinct(p.point_id)) as runs, \
  //                         count(case when p.result='WON' then 1 else null end) as won,  \
  //                         TRUNCATE(AVG(CASE WHEN p.result = 'WON' then SUBSTRING_INDEX(SUBSTRING_INDEX(r1, '@', -1) ,',' , 1) ELSE NULL END) , 2) as avgOdd, \
  //                         (COUNT(CASE WHEN p.result = 'WON' then 1 ELSE NULL END) \
  //                         + COUNT(CASE WHEN p.result = '2ND' then 1 ELSE NULL END) \
  //                         + COUNT(CASE WHEN p.result = '3RD' then 1 ELSE NULL END) ) as place \
  //                         from points as p \
  //                         WHERE WEEKDAY(meetdate)="+ dayOfWeek + " \
  //                         and p.is_na=0 \
  //                         and p.track_condition !='ABND' \
  //                         and p.result_flag!=0 \
  //                         and result is not null \
  //                         and result !='N/A' )as t)as daily_history ;"

  let getResultsForDate = `SELECT DISTINCT track_name, raceprize, trackcode as tc , venue_location,
                            /* venue history*/
                                (json_object('runs',runs,'won', won, 'place',place, 'avg_win_odd',avg_win_odd)) as venue_history
                                FROM points as p left join race_venues as rv on p.trackcode = rv.venue_shortName
                                WHERE meetdate ='${passDate}'
                                ORDER BY raceprize desc , track_name asc;

                            SELECT
                            /*races details*/

                                point_id, race_num, race_time, track_name,result_status,meetdate,sb_venue_id,unibet_venue_id
                                track_condition, full_track_condition,track_condition, bookie_name, selections, result,race_status,is_na ,raceprize,

                                /*race positions*/

                                (select json_arrayagg(json_object('tab_no', tab_no, 'position', position, 'ub_win', ub_win, 'ub_place', ub_place ,'sb_win', sb_win, 'sb_place', sb_place, 'horse_silksUrl',horse_silksUrl))as t
                                from (  SELECT d.tab_no,d.position,d.ub_win,d.ub_place,d.sb_win,d.sb_place, d.horse_silksUrl
                                from points_details as d WHERE d.point_id=p1.point_id
                                AND d.position IS NOT NULL AND d.position between 1 and 4
                                order by d.position asc ) as t
                                ) as positions

                                FROM points as p1
                                WHERE meetdate ='${passDate}'
                                ORDER BY raceprize desc , track_name asc, race_num asc  ;



                            select (select JSON_OBJECT('runs',runs,'won',won,'second',second,'third',third)as t
                                                from (   SELECT COUNT(point_id ) as runs, COUNT(CASE WHEN result = 'WON' then 1 ELSE NULL END) as won,
                                                COUNT(CASE WHEN result = '2ND' then 1 ELSE NULL END) as second, COUNT(CASE WHEN result = '3RD' then 1 ELSE NULL END) as third
                                                FROM points
                                                WHERE meetdate ='${passDate}'
                                                AND (is_na !=1 AND track_condition !='ABND')
                                                AND result is not null )as t) as daily_results ,

                            (select JSON_OBJECT('runs',runs,'won',won,'winOdd',avgOdd,'place',place)as t
                                                from (   SELECT count(distinct(p.point_id)) as runs,
                                                count(case when p.result='WON' then 1 else null end) as won,
                                                TRUNCATE(AVG(CASE WHEN p.result = 'WON' then SUBSTRING_INDEX(SUBSTRING_INDEX(r1, '@', -1) ,',' , 1) ELSE NULL END) , 2) as avgOdd,
                                                (COUNT(CASE WHEN p.result = 'WON' then 1 ELSE NULL END)
                                                + COUNT(CASE WHEN p.result = '2ND' then 1 ELSE NULL END)
                                                + COUNT(CASE WHEN p.result = '3RD' then 1 ELSE NULL END) ) as place
                                                from points as p
                                                WHERE WEEKDAY(meetdate)=${dayOfWeek}
                                                and p.is_na=0
                                                and p.track_condition !='ABND'
                                                and p.result_flag!=0
                                                and result is not null
                                                and result !='N/A' )as t)as day_of_week_history ;`;
  connection.query(getResultsForDate, function (error, results, fields) {
    if (error) {
      res.status(500).send({
        status: 500,
        message: "Error getting results for a date",
      });
      console.log("Error getting results for a date :" + error);
    } else {
      let venuesData = [];
      if (results[0].length > 0) {
        results[0].map((zone) => {
          let venueDetails = [];
          if (results[1].length > 0) {
            results[1].map((zone1) => {
              if (zone.track_name === zone1.track_name) {
                venueDetails.push(zone1);
              }
            });
            venuesData.push({
              track_name: zone.track_name,
              raceprize: zone.raceprize,
              venue_location: zone.venue_location,
              track_condition: zone.tc,
              venue_history: zone.venue_history,
              venue_details: venueDetails,
            });
          }
        });

        res.status(200).send({
          status: 200,
          data: {
            results: venuesData,
            performance: results[2].length > 0 ? results[2][0] : null,
          },
        });
      }

      // let finalData = []
      // if (results[0]) {
      //     results[0].map((zone, i) => {
      //         let venue = zone.track_name
      //         let venue_history = [{
      //             runs: zone.runs,
      //             won: zone.won,
      //             place: zone.place,
      //             winOdd: zone.avg_win_odd,
      //             placeOdd: zone.avg_place_odd,
      //         }]
      //         let info = []
      //         results[1].map((zone2) => {
      //             if (venue === zone2.track_name) {
      //                 let positions = []
      //                 results[3].map((zone3) => {
      //                     if (zone2.track_name === zone3.track_name && zone2.race_num === zone3.race_num) {
      //                         positions.push({
      //                             'pos': zone3.position,
      //                             'tab_no': zone3.tab_no,
      //                             'sb_win': zone3.sb_win,
      //                             'sb_place': zone3.sb_place,
      //                             'ub_win': zone3.ub_win,
      //                             'ub_place': zone3.ub_place,
      //                         })
      //                     }
      //                 })

      //                 info.push({
      //                     'point_id': zone2.point_id,
      //                     'race_num': zone2.race_num,
      //                     'race_time': zone2.race_time,
      //                     'race_num': zone2.race_num,
      //                     'track_condition': zone2.track_condition,
      //                     'bookie_name': zone2.bookie_name,
      //                     'selections': zone2.selections,
      //                     'result': zone2.result,
      //                     'meetdate': zone2.meetdate,
      //                     'r1': zone2.r1,
      //                     'r2': zone2.r2,
      //                     'r3': zone2.r3,
      //                     'r4': zone2.r4,
      //                     'result_status': zone2.result_status,
      //                     'race_status': zone2.race_status,
      //                     'is_na': zone2.is_na,
      //                     'positions': positions
      //                 }
      //                 )
      //             }
      //         })
      //         finalData.push({
      //             'track': venue,
      //             'venue_history': venue_history,
      //             'info': info
      //         })
      //         info = []
      //     })
      // }
      // res.status(200).send({
      //     status: 200,
      //     data: {
      //         results: finalData,
      //         dailyStrikeRate: results[4],
      //         dailyPerformance: results[2]
      //     }
      // });
    }
  });
};

// GET DATA FOR INSIDE SELECTION PAGE                    ****removed for OPT
// exports.getRaceInfo = (req, res) => {
//   const { raceId } = req.body;
//   let getRaceInfo =
//     "SELECT meetdate, track_weather, race_time, race_num, trackcode, track_name, track_condition, is_na, bookie_name,result_status,deadheat_selection_pos,\
//                         track_description, track_distance, result_flag, race_status, result, is_future,is_na,race_result_time,race_closed_time,\
//                         r1, (SELECT horse_name from points_details where point_id=" +
//     raceId +
//     " and tab_no = SUBSTRING_INDEX((SELECT r1 from points where point_id =" +
//     raceId +
//     "), '@', 1) ) as h1,\
//                         r2, (SELECT horse_name from points_details where point_id=" +
//     raceId +
//     " and tab_no = SUBSTRING_INDEX((SELECT r2 from points where point_id =" +
//     raceId +
//     "), '@', 1) ) as h2,\
//                         r3, (SELECT horse_name from points_details where point_id=" +
//     raceId +
//     " and tab_no = SUBSTRING_INDEX((SELECT r3 from points where point_id =" +
//     raceId +
//     "), '@', 1) ) as h3 ,\
//                         r4, (SELECT horse_name from points_details where point_id=" +
//     raceId +
//     " and tab_no = SUBSTRING_INDEX((SELECT r4 from points where point_id =" +
//     raceId +
//     "), '@', 1) ) as h4 ,\
//                         (SELECT horse_jockey from points_details where point_id=" +
//     raceId +
//     " and tab_no = SUBSTRING_INDEX((SELECT r1 from points where point_id =" +
//     raceId +
//     "), '@', 1) ) as j1 ,\
//                         (SELECT horse_jockey from points_details where point_id=" +
//     raceId +
//     " and tab_no = SUBSTRING_INDEX((SELECT r2 from points where point_id =" +
//     raceId +
//     "), '@', 1) ) as j2 ,\
//                         (SELECT horse_jockey from points_details where point_id=" +
//     raceId +
//     " and tab_no = SUBSTRING_INDEX((SELECT r3 from points where point_id =" +
//     raceId +
//     "), '@', 1) ) as j3 ,\
//                         (SELECT horse_jockey from points_details where point_id=" +
//     raceId +
//     " and tab_no = SUBSTRING_INDEX((SELECT r4 from points where point_id =" +
//     raceId +
//     "), '@', 1) ) as j4 ,\
//                         (SELECT sportsbetting_odds from points_details where point_id=" +
//     raceId +
//     " and tab_no = SUBSTRING_INDEX((SELECT r1 from points where point_id =" +
//     raceId +
//     "), '@', 1) ) as sb1 ,\
//                         (SELECT sportsbetting_odds from points_details where point_id=" +
//     raceId +
//     " and tab_no = SUBSTRING_INDEX((SELECT r2 from points where point_id =" +
//     raceId +
//     "), '@', 1) ) as sb2 ,\
//                         (SELECT sportsbetting_odds from points_details where point_id=" +
//     raceId +
//     " and tab_no = SUBSTRING_INDEX((SELECT r3 from points where point_id =" +
//     raceId +
//     "), '@', 1) ) as sb3 ,\
//                         (SELECT sportsbetting_odds from points_details where point_id=" +
//     raceId +
//     " and tab_no = SUBSTRING_INDEX((SELECT r4 from points where point_id =" +
//     raceId +
//     "), '@', 1) ) as sb4,\
//                         (select is_clockWise from race_venues where venue_shortName = trackcode ) as isClockwise \
//                         FROM points\
//                         WHERE point_id =" +
//     raceId +
//     ";\
//                             SELECT tab_no as horse_number, horse_name, horse_weight, horse_jockey, horse_trainer, horse_sf, horse_barrier, horse_silksUrl,\
//                         points_per_firm, points_per_good, points_per_soft, points_per_heavy, points_per_synth,\
//                         unibet_odds, sportsbetting_odds, horse_status ,scr_time,ub_flucs,sb_flucs,sb_open_price,ub_open_price\
//                         FROM points_details\
//                         WHERE point_id =" +
//     raceId +
//     "\
//                         ORDER BY tab_no asc;\
//                             SELECT tab_no as mm from points_details where market_mover=(SELECT max(market_mover) from points_details where point_id=" +
//     raceId +
//     "\
//                         and horse_status !='Scratched' and horse_status !='Late Scratching' and horse_status is not null ) \
//                         and horse_status !='Scratched' and horse_status !='Late Scratching' and horse_status is not null and point_id=" +
//     raceId +
//     ";\
//                             SELECT tab_no as lbmm from points_details where lb_mm=1 and point_id=" +
//     raceId +
//     ";";

//   connection.query(getRaceInfo, function (error, results, fields) {
//     if (error) {
//       res.status(500).send({
//         status: 500,
//         message: "Error getting race info",
//       });
//       console.log("Error getting race info :" + error);
//     } else {
//       if (results[0].length > 0) {
//         res.status(200).send({
//           status: 200,
//           data: {
//             trackInfo: results[0],
//             horses: results[1],
//             mm: results[2].length > 0 ? results[2][0].mm : null,
//             lbmm: results[3].length > 0 ? results[3][0].lbmm : null,
//             point_id: raceId,
//           },
//         });
//       } else {
//         res.status(200).send({
//           status: 500,
//           message: "No data Available",
//         });
//       }
//     }
//   });
// };

// GET DATA FOR INSIDE SELECTION PAGE
exports.getRaceInfoOptimized = (req, res) => {
  const { raceId, condition, raceNum } = req.body;
  // console.log(raceId);
  let pointId;
  if (condition === "null" && raceNum === "null") {
    pointId = raceId;
  } else if (condition === "null" && raceNum !== "null") {
    pointId = `(SELECT p2.point_id from points as p2 WHERE p2.meetdate = (SELECT p3.meetdate from points as p3 WHERE p3.point_id =${raceId}) \
                                                        AND p2.trackcode = (SELECT p3.trackcode from points as p3 WHERE p3.point_id =${raceId})\
                                                        AND p2.race_num = ${raceNum})`;
  } else {
    pointId = checkRaceId(raceId, condition);
  }
  let getRaceInfo =
    "SELECT point_id, meetdate, track_weather, race_time, race_num, trackcode, track_name, track_condition, full_track_condition,sb_venue_id, unibet_venue_id,\
                        result_status, deadheat_selection_pos, track_description, track_distance, result_flag, selec_resulted,rating,\
                        race_status, result, is_future, is_na, race_result_time, race_closed_time,ind_raceprize,sb_venue_id, ub_market_open_time,sb_market_open_time,\
                        (SELECT COUNT(p2.trackcode) FROM points as p2 WHERE p2.trackcode = p.trackcode AND p2.meetdate = p.meetdate) as tot_races,\
                        (select is_clockWise from race_venues where venue_shortName = trackcode limit 1) as isClockwise ,\
                        (SELECT distinct vrp.rail_pos from venue_rail_pos as vrp,race_venues as rv,points as p where rv.venue_id=vrp.venue_id and rv.venue_shortName=p.trackcode and p.meetdate=vrp_date and p.point_id=" +
    pointId +
    " limit 1) as rail_position ,\
                        p.ub_market_open_time,p.sb_market_open_time \
                        FROM points as p \
                        WHERE point_id =" +
    pointId +
    ";\
                            SELECT tab_no as horse_number, pd.horse_name, horse_weight, horse_jockey, horse_trainer, horse_sf, horse_barrier, horse_silksUrl,\
                        points_per_firm, points_per_good, points_per_soft, points_per_heavy, points_per_synth,\
                        horse_status, scr_time, ub_flucs, sb_flucs, sb_open_price, ub_open_price, ub_win, ub_place, sb_win, sb_place, position,ub_open_price_main,sb_open_price_main,\
                        market_mover, lb_mm, if( (SELECT MAX(market_mover) from points_details WHERE point_id =" +
    pointId +
    "\
                                                and horse_status !='Scratched' and horse_status !='Late Scratching' and horse_status is not null) = market_mover \
                                                AND (SELECT MAX(market_mover) from points_details WHERE point_id =" +
    pointId +
    "\
                                                and horse_status !='Scratched' and horse_status !='Late Scratching' and horse_status is not null) != 0, 1, 0) as is_market_mover,\
						pd.horse_id, pd.jockey_id, pd.trainer_id,\
                        CAREERSTS as career, CAREERPRZ as prize_money, s.sire_name, d.dam_name, hp.SEX as sex, hp.AGE as age, hp.PLACEPERC as place_percentage, hp.WINPERC as win_percentage, \
                        TRACKSTAT as track, DISTSTAT as distance, DTRKSTAT as trk_dist, \
						hp.GOODSTAT as good_stat, hp.SYNTHSTAT as synth_stat, hp.FIRMSTAT as firm_stat, hp.SOFTSTAT as soft_stat, hp.HEAVYSTAT as heavy_stat,\
                        (select JSON_ARRAYAGG(JSON_OBJECT('place', PLACE, 'tot_horses', STARTERS, 'distance', DISTANCE, 'track_condition', GOING,\
                                                            'venue_code', TRACKCODE, 'win_time', RACETIME, 'class', CLASSCODE, 'odds', PRICESP, 'weight', HCPWGT, 'barrier', BARRIER,\
                                                            'winner_sec', `OTHRR1PLC-NAME`, 'margin', WPMARGIN, 'jockey', jockey_name, 'meetdate', DATE(MEETDATE))) as result\
                                                        FROM (SELECT PLACE, STARTERS, DISTANCE, GOING, MEETDATE, jockey_name, TRACKCODE, CLASSCODE, RACETIME, PRICESP, HCPWGT,`OTHRR1PLC-NAME`, WPMARGIN, BARRIER\
                                                            FROM horse_history_details as hh LEFT JOIN jockeys as j ON hh.jockey_id=j.jockey_id \
                                                            WHERE hh.horse_id = pd.horse_id \
                                                            AND date(hh.MEETDATE) < date(po.meetdate) AND hh.CLASSCODE != 'Btria' order by MEETDATE desc) as t) as last_starts,\
                        (select JSON_ARRAYAGG(JSON_OBJECT('place', PLACE, 'tot_horses', STARTERS, 'distance', DISTANCE, 'track_condition', GOING,\
                                                            'venue_code', TRACKCODE, 'win_time', RACETIME, 'class', CLASSCODE, 'odds', PRICESP, 'weight', HCPWGT, 'barrier', BARRIER,\
                                                            'winner_sec', `OTHRR1PLC-NAME`, 'margin', WPMARGIN, 'jockey', jockey_name, 'meetdate', DATE(MEETDATE))) as result\
                                                        FROM (SELECT PLACE, STARTERS, DISTANCE, GOING, MEETDATE, jockey_name, TRACKCODE, CLASSCODE, RACETIME, PRICESP, HCPWGT,`OTHRR1PLC-NAME`, WPMARGIN, BARRIER\
                                                            FROM horse_history_details as hh LEFT JOIN jockeys as j ON hh.jockey_id=j.jockey_id \
                                                            WHERE hh.horse_id = pd.horse_id \
                                                            AND date(hh.MEETDATE) < date(po.meetdate) AND hh.CLASSCODE like 'Btria' order by MEETDATE desc ) as t) as btria,\
                                    (select JSON_ARRAYAGG(JSON_OBJECT('place', hh2.PLACE, 'track_condition', hh2.GOING, 'track_code', hh2.TRACKCODE, 'class', CLASSCODE, 'meetdate', DATE(MEETDATE), 'tot_horses', STARTERS, 'distance', DISTANCE))\
                                                            FROM horse_history_details as hh2\
                                                            WHERE hh2.horse_id = pd.horse_id AND hh2.GOING like CONCAT(po.track_condition, '%') AND hh2.CLASSCODE != 'Btria' AND hh2.TRACKCODE = po.trackcode and hh2.MEETDATE<(SELECT p3.meetdate from points as p3 WHERE p3.point_id =" +
    pointId +
    ")) as ctc_track,\
                                    (select JSON_ARRAYAGG(JSON_OBJECT('place', hh2.PLACE, 'track_condition', hh2.GOING, 'track_code', hh2.TRACKCODE, 'class', CLASSCODE, 'meetdate', DATE(MEETDATE), 'tot_horses', STARTERS, 'distance', DISTANCE))\
                                                            FROM horse_history_details as hh2\
                                                            WHERE hh2.horse_id = pd.horse_id AND hh2.GOING like CONCAT(po.track_condition, '%') AND hh2.CLASSCODE != 'Btria' AND hh2.DISTANCE BETWEEN SUBSTRING_INDEX(po.track_distance, 'M', 1)-20 AND SUBSTRING_INDEX(po.track_distance, 'M', 1)+20 and hh2.MEETDATE<(SELECT p3.meetdate from points as p3 WHERE p3.point_id =" +
    pointId +
    ")) as ctc_dist,\
                                    (select JSON_ARRAYAGG(JSON_OBJECT('place', hh2.PLACE, 'track_condition', hh2.GOING, 'track_code', hh2.TRACKCODE, 'class', CLASSCODE, 'meetdate', DATE(MEETDATE), 'tot_horses', STARTERS, 'distance', DISTANCE))\
                                                            FROM horse_history_details as hh2\
                                                            WHERE hh2.horse_id = pd.horse_id AND hh2.GOING like CONCAT(po.track_condition, '%') AND hh2.CLASSCODE != 'Btria' AND hh2.DISTANCE = SUBSTRING_INDEX(po.track_distance, 'M', 1) AND hh2.TRACKCODE = po.trackcode and hh2.MEETDATE<(SELECT p3.meetdate from points as p3 WHERE p3.point_id =" +
    pointId +
    ") ) as ctc_track_dist\
                                    FROM points_details  as pd LEFT JOIN horse_profile as hp On pd.horse_id = hp.horse_id\
                        LEFT JOIN points as po On pd.point_id = po.point_id\
						LEFT JOIN sires as s ON hp.sire_id=s.sire_id\
                        LEFT JOIN dams as d ON hp.dam_id=d.dam_id\
                        WHERE pd.point_id =" +
    pointId +
    " ORDER by position asc, horse_number asc;\
                        SELECT distinct track_name as venue, trackcode, raceprize,(select venue_state  \
                            from( select venue_state from race_venues as rv  where trackcode = rv.venue_shortName \
                            limit 1)as t )as state  FROM points WHERE meetdate = (SELECT meetdate from points where point_id =" +
    pointId +
    ") \
                                ORDER BY raceprize desc, venue asc; \
                            SELECT generation_time from points_generation_time where point_id=" +
    pointId +
    " order by generation_time desc;\
                            SELECT p.race_num, d.tab_no, p.race_time, d.position,p.result,p.is_na,p.point_id,p.meetdate, p.track_condition ,track_name\
                        FROM points as p Join points_details as d\
                        On p.point_id = d.point_id\
                        WHERE p.point_id in (SELECT p2.point_id FROM points as p2\
                                                WHERE p2.trackcode = (SELECT trackcode from points WHERE point_id = " +
    pointId +
    ")\
                                                AND p2.meetdate = (SELECT meetdate from points WHERE point_id = " +
    pointId +
    "))\
                        AND IF(p.result is null, d.position is null , d.position between 1 and 3)\
                        AND d.horse_status like 'Starter'\
                        ORDER BY p.race_num asc, d.position asc; \
                        SELECT   (SELECT JSON_OBJECT('runs',runs,'won',won,'winOdd',avgOdd,'place',place ,'plcOdd',avgPlcOdd)as t \
                        from (   SELECT count(distinct(p.point_id)) as runs, \
                        count(case when p.result='WON' then 1 else null end) as won, \
                        TRUNCATE(AVG(CASE WHEN p.result = 'WON' then SUBSTRING_INDEX(SUBSTRING_INDEX(r1, '@', -1) ,',' , 1) ELSE NULL END) , 2) as avgOdd, \
                        (COUNT(CASE WHEN p.result = 'WON' then 1 ELSE NULL END) \
                        + COUNT(CASE WHEN p.result = '2ND' then 1 ELSE NULL END) \
                        + COUNT(CASE WHEN p.result = '3RD' then 1 ELSE NULL END) ) as place, \
                        TRUNCATE(AVG( \
                        CASE WHEN p.result = 'WON' then SUBSTRING_INDEX(SUBSTRING_INDEX(r1, '@', -1) ,',' , -1)  \
                        WHEN p.result= '2ND' then  SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(r2, '@', -1) ,',' , -1),'/',1) \
                        WHEN p.result= '3RD' then  SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(r3, '@', -1) ,',' , -1),'/',1) \
                        ELSE NULL END \
                        ) , 2) as avgPlcOdd \
                        from points as p \
                        WHERE meetdate=(SELECT meetdate from points where point_id=" +
    pointId +
    " limit 1)  \
                        and p.is_na=0 \
                        and p.track_condition !='ABND' \
                        and p.result_flag!=0 \
                        and result is not null \
                        and result !='N/A' )as t)as current_date_results;";

  connection.query(getRaceInfo, function (error, results, fields) {
    if (error) {
      res.status(500).send({
        status: 500,
        message: "Error getting race info",
      });
      console.log("Error getting race info OPT :" + error);
    } else {
      if (results[0].length > 0) {
        let allDayResult = [];
        for (let j = 1; j <= results[0][0].tot_races; j++) {
          let filter = [];
          results[4].map((zone) => {
            if (zone.race_num === j) {
              filter.push(zone);
              // console.log(filter)
            }
          });

          //console.log(results);
          //filter.sort(function(a, b){return a.position - b.position})
          // console.log(filter[0])
          if (filter[0]?.position === null) {
            allDayResult.push({
              race_num: filter[0] ? filter[0].race_num : j,
              first: null,
              second: null,
              third: null,
              race_time: filter[0] ? filter[0].race_time : null,
              result: filter[0] ? filter[0].result : null,
              is_na: filter[0] ? filter[0].is_na : null,
              point_id: filter[0] ? filter[0].point_id : null,
              venue_name: filter[0] ? filter[0].track_name : null,
              meetdate: filter[0] ? filter[0].meetdate : null,
              track_condition: filter[0] ? filter[0].track_condition : null,
            });
          } else {
            allDayResult.push({
              race_num: filter[0] ? filter[0].race_num : j,
              first: filter[0] ? filter[0].tab_no : null,
              second: filter[1] ? filter[1].tab_no : null,
              third: filter[2] ? filter[2].tab_no : null,
              race_time: filter[0] ? filter[0].race_time : null,
              result: filter[0] ? filter[0].result : null,
              is_na: filter[0] ? filter[0].is_na : null,
              point_id: filter[0] ? filter[0].point_id : null,
              venue_name: filter[0] ? filter[0].track_name : null,
              meetdate: filter[0] ? filter[0].meetdate : null,
              track_condition: filter[0] ? filter[0].track_condition : null,
            });
          }
        }
        // console.log(allDayResult);
        res.status(200).send({
          status: 200,
          data: {
            trackInfo: results[0],
            horses: results[1],
            venues: results[2],
            point_id: results[0][0].point_id,
            generationTime: results[3],
            allDayResult: allDayResult,
            allRacesDayResults: results[5],
          },
        });
      } else {
        res.status(200).send({
          status: 500,
          message: "No data Available",
        });
      }
    }
  });
};

// GET DATA FOR NEXT OR PREV RACE
exports.getRaceInfoOptimizedNextPrv = (req, res) => {
  const { raceId, condition, raceNum } = req.body;
  let pointId;
  if (condition === "null" && raceNum === "null") {
    pointId = raceId;
  } else if (condition === "null" && raceNum !== "null") {
    pointId = `(SELECT p2.point_id from points as p2 WHERE p2.meetdate = (SELECT p3.meetdate from points as p3 WHERE p3.point_id =${raceId}) \
                                                        AND p2.trackcode = (SELECT p3.trackcode from points as p3 WHERE p3.point_id =${raceId})\
                                                        AND p2.race_num = ${raceNum})`;
  } else {
    pointId = checkRaceId(raceId, condition);
  }
  let getRaceInfo = `SELECT point_id, meetdate, track_weather, race_time, race_num, trackcode, track_name, track_condition, full_track_condition, unibet_venue_id,
                        result_status, deadheat_selection_pos, track_description, track_distance, result_flag, selec_resulted,
                        race_status, result, is_future, is_na, race_result_time, race_closed_time,ind_raceprize,ub_market_open_time,sb_market_open_time,
                        (SELECT COUNT(p2.trackcode) FROM points as p2 WHERE p2.trackcode = p.trackcode AND p2.meetdate = p.meetdate) as tot_races,
                        (select is_clockWise from race_venues where venue_shortName = trackcode limit 1) as isClockwise ,
                        (SELECT distinct vrp.rail_pos from venue_rail_pos as vrp,race_venues as rv,points as p where rv.venue_id=vrp.venue_id and rv.venue_shortName=p.trackcode and p.meetdate=vrp_date and p.point_id= ${pointId} ) as rail_position ,
                        p.ub_market_open_time,p.sb_market_open_time \
                        FROM points as p \
                        WHERE point_id =${pointId};`;

  connection.query(getRaceInfo, function (error, results, fields) {
    if (error) {
      res.status(500).send({
        status: 500,
        message: "Error getting race info",
      });
      console.log("Error getting race info OPT :" + error);
    } else {
      if (results.length > 0) {
        res.status(200).send({
          status: 200,
          data: {
            trackInfo: results[0],
            point_id: results[0].point_id,
          },
        });
      } else {
        res.status(200).send({
          status: 500,
          message: "No data Available",
        });
      }
    }
  });
};

function checkRaceId(id, condition) {
  if (condition === "next") {
    let query = `IF((SELECT point_id FROM\
                    points where track_name = (SELECT track_name FROM points WHERE point_id= ${id})
                    AND meetdate = (SELECT meetdate FROM points WHERE point_id= ${id})
                    AND race_num = (SELECT race_num+1 FROM points WHERE point_id= ${id})) IS NULL,
                    (SELECT point_id FROM
                    points where track_name = (SELECT track_name FROM points WHERE point_id= ${id})
                    AND meetdate = (SELECT meetdate FROM points WHERE point_id= ${id})
                    ORDER BY race_num LIMIT 1)
                    ,(SELECT point_id FROM
                    points where track_name = (SELECT track_name FROM points WHERE point_id= ${id})
                    AND meetdate = (SELECT meetdate FROM points WHERE point_id= ${id})
                    AND race_num = (SELECT race_num+1 FROM points WHERE point_id= ${id}))
                    )`;
    return query;
  } else {
    let query = `IF((SELECT point_id FROM\
                    points where track_name = (SELECT track_name FROM points WHERE point_id= ${id})
                    AND meetdate = (SELECT meetdate FROM points WHERE point_id= ${id})
                    AND race_num = (SELECT race_num-1 FROM points WHERE point_id= ${id})) IS NULL,
                    (SELECT point_id FROM
                    points where track_name = (SELECT track_name FROM points WHERE point_id= ${id})
                    AND meetdate = (SELECT meetdate FROM points WHERE point_id= ${id})
                    ORDER BY race_num LIMIT 1)
                    ,(SELECT point_id FROM
                    points where track_name = (SELECT track_name FROM points WHERE point_id= ${id})
                    AND meetdate = (SELECT meetdate FROM points WHERE point_id= ${id})
                    AND race_num = (SELECT race_num-1 FROM points WHERE point_id= ${id})))`;
    return query;
  }
}

// GET DATA FOR INSIDE SELECTION PAGE FOR NEXT OR LAST RACE               ******removed fot OPT
// exports.getRaceInfoNextOrLast = (req, res) => {
//   const { raceId, condition } = req.body;

//   let getRaceInfo =
//     "SELECT p.meetdate, p.track_weather, p.race_time, p.race_num, p.track_name, p.track_condition,p.race_result_time,p.race_closed_time, \
//  p.bookie_name, p.result_status, p.generation_time, p.deadheat_selection_pos,p.is_na,\
//  track_description, track_distance, result_flag, race_status, result, is_future,\
//  p.r1, (SELECT horse_name from points_details where point_id=p.point_id and tab_no = SUBSTRING_INDEX((SELECT r1 from points where point_id =p.point_id), '@', 1) ) as h1,\
//  p.r2, (SELECT horse_name from points_details where point_id=p.point_id and tab_no = SUBSTRING_INDEX((SELECT r2 from points where point_id =p.point_id), '@', 1) ) as h2,\
//  p.r3, (SELECT horse_name from points_details where point_id=p.point_id and tab_no = SUBSTRING_INDEX((SELECT r3 from points where point_id =p.point_id), '@', 1) ) as h3 ,\
//  p.r4, (SELECT horse_name from points_details where point_id=p.point_id and tab_no = SUBSTRING_INDEX((SELECT r4 from points where point_id =p.point_id), '@', 1) ) as h4 ,\
//  (SELECT horse_jockey from points_details where point_id=p.point_id and tab_no = SUBSTRING_INDEX((SELECT r1 from points where point_id =p.point_id), '@', 1) ) as j1 ,\
//  (SELECT horse_jockey from points_details where point_id=p.point_id and tab_no = SUBSTRING_INDEX((SELECT r2 from points where point_id =p.point_id), '@', 1) ) as j2 ,\
//  (SELECT horse_jockey from points_details where point_id=p.point_id and tab_no = SUBSTRING_INDEX((SELECT r3 from points where point_id =p.point_id), '@', 1) ) as j3 ,\
//  (SELECT horse_jockey from points_details where point_id=p.point_id and tab_no = SUBSTRING_INDEX((SELECT r4 from points where point_id =p.point_id), '@', 1) ) as j4 ,\
//  (SELECT sportsbetting_odds from points_details where point_id=p.point_id and tab_no = SUBSTRING_INDEX((SELECT r1 from points where point_id =p.point_id), '@', 1) ) as sb1 ,\
//  (SELECT sportsbetting_odds from points_details where point_id=p.point_id and tab_no = SUBSTRING_INDEX((SELECT r2 from points where point_id =p.point_id), '@', 1) ) as sb2 ,\
//  (SELECT sportsbetting_odds from points_details where point_id=p.point_id and tab_no = SUBSTRING_INDEX((SELECT r3 from points where point_id =p.point_id), '@', 1) ) as sb3 ,\
//  (SELECT sportsbetting_odds from points_details where point_id=p.point_id and tab_no = SUBSTRING_INDEX((SELECT r4 from points where point_id =p.point_id), '@', 1) ) as sb4 ,\
//  (select is_clockWise from race_venues where venue_shortName = trackcode ) as isClockwise \
//  FROM points as p\
//  WHERE p.point_id =" +
//     checkRaceId(raceId, condition) +
//     ";\
//  SELECT tab_no as horse_number, horse_name, horse_weight, horse_jockey, horse_trainer, horse_sf, horse_barrier, horse_silksUrl,\
//  points_per_firm, points_per_good, points_per_soft, points_per_heavy, points_per_synth,\
//  unibet_odds, sportsbetting_odds, horse_status ,scr_time, point_id,sb_open_price,ub_open_price\
//  FROM points_details\
//  WHERE point_id = " +
//     checkRaceId(raceId, condition) +
//     "\
//  ORDER BY tab_no asc;\
//  SELECT tab_no as mm from points_details where market_mover=(SELECT max(market_mover) from points_details where point_id=" +
//     checkRaceId(raceId, condition) +
//     "\
//  and horse_status !='Scratched' and horse_status !='Late Scratching' and horse_status is not null ) \
//  and horse_status !='Scratched' and horse_status !='Late Scratching' and horse_status is not null and point_id=" +
//     checkRaceId(raceId, condition) +
//     ";\
//  SELECT tab_no as lbmm from points_details where lb_mm=1 and point_id=" +
//     checkRaceId(raceId, condition) +
//     ";";

//   //console.log(getRaceInfo)

//   connection.query(getRaceInfo, function (error, results, fields) {
//     if (error) {
//       res.status(500).send({
//         status: 500,
//         message: "Error getting race info",
//       });
//       console.log("Error getting race info :" + error);
//     } else {
//       if (results[0].length > 0) {
//         if (results[2].length > 0) {
//           if (results[3].length > 0) {
//             res.status(200).send({
//               status: 200,
//               data: {
//                 trackInfo: results[0],
//                 horses: results[1],
//                 point_id: results[1][0].point_id,
//                 mm: results[2][0].mm,
//                 lbmm: results[3][0].lbmm,
//               },
//             });
//           } else {
//             res.status(200).send({
//               status: 200,
//               data: {
//                 trackInfo: results[0],
//                 horses: results[1],
//                 point_id: results[1][0].point_id,
//                 mm: results[2][0].mm,
//                 lbmm: null,
//               },
//             });
//           }
//         } else {
//           res.status(200).send({
//             status: 200,
//             data: {
//               trackInfo: results[0],
//               horses: results[1],
//               point_id: results[1][0].point_id,
//               mm: null,
//               lbmm: null,
//             },
//           });
//         }
//       } else {
//         res.status(200).send({
//           status: 500,
//           message: "No data Available",
//         });
//       }
//     }
//   });
// };

// GET SELECTION DATE DATA                            ***removed for OPT

// exports.getVenueSelections = (req, res) => {
//   const { passDate, venueName } = req.body;
//   const dateF = moment(passDate).format("YYYY-MM-DD");

//   let getNextRaceInVenue =
//     " SELECT IF( (SELECT point_id FROM points\
//                                 WHERE meetdate ='" +
//     dateF +
//     "'\
//                                 AND race_time > TIME(localtime())\
//                                 AND track_name ='" +
//     venueName +
//     "'\
//                                 ORDER BY race_time asc LIMIT 1) is null,\
//                                 (SELECT point_id FROM points\
//                                 WHERE meetdate ='" +
//     dateF +
//     "'\
//                                 AND track_name ='" +
//     venueName +
//     "'\
//                                 ORDER BY race_time asc LIMIT 1),\
//                                 (SELECT point_id FROM points\
//                                 WHERE meetdate ='" +
//     dateF +
//     "'\
//                                 AND race_time > TIME(localtime())\
//                                 AND track_name ='" +
//     venueName +
//     "'\
//                                 ORDER BY race_time asc LIMIT 1)) as 'point_id';";

//   connection.query(getNextRaceInVenue, function (error, results, fields) {
//     if (error) {
//       res.status(500).send({
//         status: 500,
//         message: "Error getting data for getNextRaceInVenue",
//       });
//       console.log("Error getting data for getNextRaceInVenue :" + error);
//     } else {
//       if (results.length > 0) {
//         var raceId = results[0].point_id;

//         let getSpecRaceInfo =
//           "SELECT meetdate, track_weather, race_time, race_num, trackcode, track_name, track_condition, bookie_name,result_status,generation_time,deadheat_selection_pos,\
//                                         track_description, track_distance, result_flag, race_status, result, is_future,is_na,race_result_time,race_closed_time,\
//                                         r1, (SELECT horse_name from points_details where point_id=" +
//           raceId +
//           " and tab_no = SUBSTRING_INDEX((SELECT r1 from points where point_id =" +
//           raceId +
//           "), '@', 1) ) as h1,\
//                                         r2, (SELECT horse_name from points_details where point_id=" +
//           raceId +
//           " and tab_no = SUBSTRING_INDEX((SELECT r2 from points where point_id =" +
//           raceId +
//           "), '@', 1) ) as h2,\
//                                         r3, (SELECT horse_name from points_details where point_id=" +
//           raceId +
//           " and tab_no = SUBSTRING_INDEX((SELECT r3 from points where point_id =" +
//           raceId +
//           "), '@', 1) ) as h3 ,\
//                                         r4, (SELECT horse_name from points_details where point_id=" +
//           raceId +
//           " and tab_no = SUBSTRING_INDEX((SELECT r4 from points where point_id =" +
//           raceId +
//           "), '@', 1) ) as h4 ,\
//                                         (SELECT horse_jockey from points_details where point_id=" +
//           raceId +
//           " and tab_no = SUBSTRING_INDEX((SELECT r1 from points where point_id =" +
//           raceId +
//           "), '@', 1) ) as j1 ,\
//                                         (SELECT horse_jockey from points_details where point_id=" +
//           raceId +
//           " and tab_no = SUBSTRING_INDEX((SELECT r2 from points where point_id =" +
//           raceId +
//           "), '@', 1) ) as j2 ,\
//                                         (SELECT horse_jockey from points_details where point_id=" +
//           raceId +
//           " and tab_no = SUBSTRING_INDEX((SELECT r3 from points where point_id =" +
//           raceId +
//           "), '@', 1) ) as j3 ,\
//                                         (SELECT horse_jockey from points_details where point_id=" +
//           raceId +
//           " and tab_no = SUBSTRING_INDEX((SELECT r4 from points where point_id =" +
//           raceId +
//           "), '@', 1) ) as j4 ,\
//                                         (SELECT sportsbetting_odds from points_details where point_id=" +
//           raceId +
//           " and tab_no = SUBSTRING_INDEX((SELECT r1 from points where point_id =" +
//           raceId +
//           "), '@', 1) ) as sb1 ,\
//                                         (SELECT sportsbetting_odds from points_details where point_id=" +
//           raceId +
//           " and tab_no = SUBSTRING_INDEX((SELECT r2 from points where point_id =" +
//           raceId +
//           "), '@', 1) ) as sb2 ,\
//                                         (SELECT sportsbetting_odds from points_details where point_id=" +
//           raceId +
//           " and tab_no = SUBSTRING_INDEX((SELECT r3 from points where point_id =" +
//           raceId +
//           "), '@', 1) ) as sb3 ,\
//                                         (SELECT sportsbetting_odds from points_details where point_id=" +
//           raceId +
//           " and tab_no = SUBSTRING_INDEX((SELECT r4 from points where point_id =" +
//           raceId +
//           "), '@', 1) ) as sb4,\
//                                         (select is_clockWise from race_venues where venue_shortName = trackcode ) as isClockwise \
//                                         FROM points\
//                                         WHERE point_id =" +
//           raceId +
//           ";\
//                                         SELECT tab_no as horse_number, horse_name, horse_weight, horse_jockey, horse_trainer, horse_sf, horse_barrier, horse_silksUrl,\
//                                         points_per_firm, points_per_good, points_per_soft, points_per_heavy, points_per_synth,sb_open_price,ub_open_price,\
//                                         unibet_odds, sportsbetting_odds\
//                                         FROM points_details\
//                                         WHERE point_id =" +
//           raceId +
//           "\
//                                         ORDER BY tab_no asc;\
//                                         SELECT tab_no as mm from points_details where market_mover=(SELECT max(market_mover) from points_details where point_id=" +
//           raceId +
//           "\
//                                         and horse_status !='Scratched' and horse_status !='Late Scratching' and horse_status is not null ) \
//                                         and horse_status !='Scratched' and horse_status !='Late Scratching' and horse_status is not null and point_id=" +
//           raceId +
//           ";\
//                                         SELECT tab_no as lbmm from points_details where lb_mm=1 and point_id=" +
//           raceId +
//           ";";

//         connection.query(getSpecRaceInfo, function (error, resultss, fields) {
//           if (error) {
//             res.status(500).send({
//               status: 500,
//               message: "Error getting getSpecRaceInfo",
//             });
//             console.log("Error getting getSpecRaceInfo:" + error);
//           } else {
//             if (resultss[2].length > 0) {
//               if (resultss[3].length > 0) {
//                 res.status(200).send({
//                   status: 200,
//                   data: {
//                     trackInfo: resultss[0],
//                     horses: resultss[1],
//                     point_id: raceId,
//                     mm: resultss[2][0].mm,
//                     lbmm: resultss[3][0].lbmm,
//                   },
//                 });
//               } else {
//                 res.status(200).send({
//                   status: 200,
//                   data: {
//                     trackInfo: resultss[0],
//                     horses: resultss[1],
//                     point_id: raceId,
//                     mm: resultss[2][0].mm,
//                     lbmm: null,
//                   },
//                 });
//               }
//             } else {
//               res.status(200).send({
//                 status: 200,
//                 data: {
//                   trackInfo: resultss[0],
//                   horses: resultss[1],
//                   point_id: raceId,
//                   mm: null,
//                   lbmm: null,
//                 },
//               });
//             }
//           }
//         });
//       } else {
//         res.status(200).send({
//           status: 500,
//           message: "No Data Available",
//         });
//       }
//     }
//   });
// };

// GET SELECTION DATE DATA AND VENUE
exports.getVenueSelectionsOpt = (req, res) => {
  const { passDate, trackCode } = req.body;

  let getNextRaceInVenue =
    " SELECT IF( (SELECT point_id FROM points\
                                WHERE meetdate ='" +
    passDate +
    "'\
                                AND race_time > TIME(localtime())\
                                AND trackcode ='" +
    trackCode.replace(/'/g, "''") +
    "'\
                                ORDER BY race_time asc LIMIT 1) is null,\
                                (SELECT point_id FROM points\
                                WHERE meetdate ='" +
    passDate +
    "'\
                                AND trackcode ='" +
    trackCode.replace(/'/g, "''") +
    "'\
                                ORDER BY race_time asc LIMIT 1),\
                                (SELECT point_id FROM points\
                                WHERE meetdate ='" +
    passDate +
    "'\
                                AND race_time > TIME(localtime())\
                                AND trackcode ='" +
    trackCode.replace(/'/g, "''") +
    "'\
                                ORDER BY race_time asc LIMIT 1)) as 'point_id';";

  connection.query(getNextRaceInVenue, function (error, results, fields) {
    if (error) {
      res.status(500).send({
        status: 500,
        message: "Error getting data for getNextRaceInVenue",
      });
      console.log("Error getting data for getNextRaceInVenue :" + error);
    } else {
      if (results.length > 0) {
        var raceId = results[0].point_id;
        let getRaceInfo =
          "SELECT point_id, meetdate, track_weather, race_time, race_num, trackcode, track_name, track_condition, full_track_condition, unibet_venue_id,\
                                    result_status, deadheat_selection_pos, track_description, track_distance, result_flag, selec_resulted,rating,\
                                    race_status, result, is_future, is_na, race_result_time, race_closed_time,ind_raceprize,ub_market_open_time,sb_market_open_time,\
                                    (SELECT COUNT(p2.trackcode) FROM points as p2 WHERE p2.trackcode = p.trackcode AND p2.meetdate = p.meetdate) as tot_races,\
                                    (select is_clockWise from race_venues where venue_shortName = trackcode limit 1) as isClockwise ,\
                                    (SELECT distinct vrp.rail_pos from venue_rail_pos as vrp,race_venues as rv,points as p where rv.venue_id=vrp.venue_id and rv.venue_shortName=p.trackcode and p.meetdate=vrp_date and p.point_id=" +
          raceId +
          " limit 1) as rail_position ,\
                                    p.ub_market_open_time,p.sb_market_open_time \
                                    FROM points as p \
                                    WHERE point_id =" +
          raceId +
          ";\
                                        SELECT tab_no as horse_number, pd.horse_name, horse_weight, horse_jockey, horse_trainer, horse_sf, horse_barrier, horse_silksUrl,\
                                    points_per_firm, points_per_good, points_per_soft, points_per_heavy, points_per_synth,\
                                    horse_status, scr_time, ub_flucs, sb_flucs, sb_open_price, ub_open_price, ub_win, ub_place, sb_win, sb_place, position,ub_open_price_main,sb_open_price_main,\
                                    market_mover, lb_mm, if( (SELECT MAX(market_mover) from points_details WHERE point_id =" +
          raceId +
          "\
                                                            and horse_status !='Scratched' and horse_status !='Late Scratching' and horse_status is not null) = market_mover \
                                                            AND (SELECT MAX(market_mover) from points_details WHERE point_id =" +
          raceId +
          "\
                                                            and horse_status !='Scratched' and horse_status !='Late Scratching' and horse_status is not null) != 0, 1, 0) as is_market_mover,\
                                    pd.horse_id, pd.jockey_id, pd.trainer_id,\
                                    CAREERSTS as career, CAREERPRZ as prize_money, s.sire_name, d.dam_name, hp.SEX as sex, hp.AGE as age, hp.PLACEPERC as place_percentage, hp.WINPERC as win_percentage, \
                                    TRACKSTAT as track, DISTSTAT as distance, DTRKSTAT as trk_dist, \
                                    hp.GOODSTAT as good_stat, hp.SYNTHSTAT as synth_stat, hp.FIRMSTAT as firm_stat, hp.SOFTSTAT as soft_stat, hp.HEAVYSTAT as heavy_stat,\
                                    (select JSON_ARRAYAGG(JSON_OBJECT('place', PLACE, 'tot_horses', STARTERS, 'distance', DISTANCE, 'track_condition', GOING,\
                                                                        'venue_code', TRACKCODE, 'win_time', RACETIME, 'class', CLASSCODE, 'odds', PRICESP, 'weight', HCPWGT, 'barrier', BARRIER,\
                                                                        'winner_sec', `OTHRR1PLC-NAME`, 'margin', WPMARGIN, 'jockey', jockey_name, 'meetdate', DATE(MEETDATE))) as result\
                                                                    FROM (SELECT PLACE, STARTERS, DISTANCE, GOING, MEETDATE, jockey_name, TRACKCODE, CLASSCODE, RACETIME, PRICESP, HCPWGT,`OTHRR1PLC-NAME`, WPMARGIN, BARRIER\
                                                                        FROM horse_history_details as hh LEFT JOIN jockeys as j ON hh.jockey_id=j.jockey_id \
                                                                        WHERE hh.horse_id = pd.horse_id \
                                                                        AND date(hh.MEETDATE) < date(po.meetdate) AND hh.CLASSCODE != 'Btria' order by MEETDATE desc) as t) as last_starts,\
                                    (select JSON_ARRAYAGG(JSON_OBJECT('place', PLACE, 'tot_horses', STARTERS, 'distance', DISTANCE, 'track_condition', GOING,\
                                                                        'venue_code', TRACKCODE, 'win_time', RACETIME, 'class', CLASSCODE, 'odds', PRICESP, 'weight', HCPWGT, 'barrier', BARRIER,\
                                                                        'winner_sec', `OTHRR1PLC-NAME`, 'margin', WPMARGIN, 'jockey', jockey_name, 'meetdate', DATE(MEETDATE))) as result\
                                                                    FROM (SELECT PLACE, STARTERS, DISTANCE, GOING, MEETDATE, jockey_name, TRACKCODE, CLASSCODE, RACETIME, PRICESP, HCPWGT,`OTHRR1PLC-NAME`, WPMARGIN, BARRIER\
                                                                        FROM horse_history_details as hh LEFT JOIN jockeys as j ON hh.jockey_id=j.jockey_id \
                                                                        WHERE hh.horse_id = pd.horse_id \
                                                                        AND date(hh.MEETDATE) < date(po.meetdate) AND hh.CLASSCODE like 'Btria' order by MEETDATE desc ) as t) as btria,\
                                                (select JSON_ARRAYAGG(JSON_OBJECT('place', hh2.PLACE, 'track_condition', hh2.GOING, 'track_code', hh2.TRACKCODE, 'class', CLASSCODE, 'meetdate', DATE(MEETDATE), 'tot_horses', STARTERS, 'distance', DISTANCE))\
                                                                        FROM horse_history_details as hh2\
                                                                        WHERE hh2.horse_id = pd.horse_id AND hh2.GOING like CONCAT(po.track_condition, '%') AND hh2.CLASSCODE != 'Btria' AND hh2.TRACKCODE = po.trackcode and hh2.MEETDATE<(SELECT p3.meetdate from points as p3 WHERE p3.point_id =" +
          raceId +
          ")) as ctc_track,\
                                                (select JSON_ARRAYAGG(JSON_OBJECT('place', hh2.PLACE, 'track_condition', hh2.GOING, 'track_code', hh2.TRACKCODE, 'class', CLASSCODE, 'meetdate', DATE(MEETDATE), 'tot_horses', STARTERS, 'distance', DISTANCE))\
                                                                        FROM horse_history_details as hh2\
                                                                        WHERE hh2.horse_id = pd.horse_id AND hh2.GOING like CONCAT(po.track_condition, '%') AND hh2.CLASSCODE != 'Btria' AND hh2.DISTANCE BETWEEN SUBSTRING_INDEX(po.track_distance, 'M', 1)-20 AND SUBSTRING_INDEX(po.track_distance, 'M', 1)+20 and hh2.MEETDATE<(SELECT p3.meetdate from points as p3 WHERE p3.point_id =" +
          raceId +
          ")) as ctc_dist,\
                                                (select JSON_ARRAYAGG(JSON_OBJECT('place', hh2.PLACE, 'track_condition', hh2.GOING, 'track_code', hh2.TRACKCODE, 'class', CLASSCODE, 'meetdate', DATE(MEETDATE), 'tot_horses', STARTERS, 'distance', DISTANCE))\
                                                                        FROM horse_history_details as hh2\
                                                                        WHERE hh2.horse_id = pd.horse_id AND hh2.GOING like CONCAT(po.track_condition, '%') AND hh2.CLASSCODE != 'Btria' AND hh2.DISTANCE = SUBSTRING_INDEX(po.track_distance, 'M', 1) AND hh2.TRACKCODE = po.trackcode and hh2.MEETDATE<(SELECT p3.meetdate from points as p3 WHERE p3.point_id =" +
          raceId +
          ") ) as ctc_track_dist\
                                                FROM points_details  as pd LEFT JOIN horse_profile as hp On pd.horse_id = hp.horse_id\
                                    LEFT JOIN points as po On pd.point_id = po.point_id\
                                    LEFT JOIN sires as s ON hp.sire_id=s.sire_id\
                                    LEFT JOIN dams as d ON hp.dam_id=d.dam_id\
                                    WHERE pd.point_id =" +
          raceId +
          " ORDER by position asc, horse_number asc;\
                                SELECT distinct track_name as venue, trackcode, raceprize,(select venue_state  \
                                        from( select venue_state from race_venues as rv  where trackcode = rv.venue_shortName \
                                        limit 1)as t )as state  FROM points WHERE meetdate = (SELECT meetdate from points where point_id =" +
          raceId +
          ") \
                                            ORDER BY raceprize desc, venue asc; \
                                SELECT generation_time from points_generation_time where point_id=" +
          raceId +
          " order by generation_time desc;\
                                SELECT p.race_num, d.tab_no, p.race_time, d.position,p.result,p.is_na,p.point_id,p.meetdate,track_name\
                                    FROM points as p Join points_details as d\
                                    On p.point_id = d.point_id\
                                    WHERE p.point_id in (SELECT p2.point_id FROM points as p2\
                                                            WHERE p2.trackcode = (SELECT trackcode from points WHERE point_id = " +
          raceId +
          ")\
                                                            AND p2.meetdate = (SELECT meetdate from points WHERE point_id = " +
          raceId +
          "))\
                                    AND IF(p.result is null, d.position is null , d.position between 1 and 3)\
                                    AND d.horse_status like 'Starter'\
                                    ORDER BY p.race_num asc, d.position asc; \
                                SELECT   (SELECT JSON_OBJECT('runs',runs,'won',won,'winOdd',avgOdd,'place',place ,'plcOdd',avgPlcOdd)as t \
                                    from (   SELECT count(distinct(p.point_id)) as runs, \
                                    count(case when p.result='WON' then 1 else null end) as won, \
                                    TRUNCATE(AVG(CASE WHEN p.result = 'WON' then SUBSTRING_INDEX(SUBSTRING_INDEX(r1, '@', -1) ,',' , 1) ELSE NULL END) , 2) as avgOdd, \
                                    (COUNT(CASE WHEN p.result = 'WON' then 1 ELSE NULL END) \
                                    + COUNT(CASE WHEN p.result = '2ND' then 1 ELSE NULL END) \
                                    + COUNT(CASE WHEN p.result = '3RD' then 1 ELSE NULL END) ) as place, \
                                    TRUNCATE(AVG( \
                                    CASE WHEN p.result = 'WON' then SUBSTRING_INDEX(SUBSTRING_INDEX(r1, '@', -1) ,',' , 1)  \
                                    WHEN p.result= '2ND' then  SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(r2, '@', -1) ,',' , -1),'/',1) \
                                    WHEN p.result= '3RD' then  SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(r3, '@', -1) ,',' , -1),'/',1) \
                                    ELSE NULL END \
                                    ) , 2) as avgPlcOdd \
                                    from points as p \
                                    WHERE meetdate=(SELECT meetdate from points where point_id=" +
          raceId +
          " limit 1)  \
                                    and p.is_na=0 \
                                    and p.track_condition !='ABND' \
                                    and p.result_flag!=0 \
                                    and result is not null \
                                    and result !='N/A' )as t)as current_date_results;";

        connection.query(getRaceInfo, function (error, resultss, fields) {
          if (error) {
            res.status(500).send({
              status: 500,
              message: "Error getting race info",
            });
            console.log("Error getting race info :" + error);
          } else {
            if (resultss[0].length > 0) {
              let allDayResult = [];
              for (let j = 1; j <= resultss[0][0].tot_races; j++) {
                let filter = [];
                resultss[4].map((zone) => {
                  if (zone.race_num === j) {
                    filter.push(zone);
                  }
                });

                if (filter[0]?.position === null) {
                  allDayResult.push({
                    race_num: filter[0] ? filter[0].race_num : j,
                    first: null,
                    second: null,
                    third: null,
                    race_time: filter[0] ? filter[0].race_time : null,
                    result: filter[0] ? filter[0].result : null,
                    is_na: filter[0] ? filter[0].is_na : null,
                    point_id: filter[0] ? filter[0].point_id : null,
                    venue_name: filter[0] ? filter[0].track_name : null,
                    meetdate: filter[0] ? filter[0].meetdate : null,
                    track_condition: filter[0]
                      ? filter[0].track_condition
                      : null,
                  });
                } else {
                  allDayResult.push({
                    race_num: filter[0] ? filter[0].race_num : j,
                    first: filter[0] ? filter[0].tab_no : null,
                    second: filter[1] ? filter[1].tab_no : null,
                    third: filter[2] ? filter[2].tab_no : null,
                    race_time: filter[0] ? filter[0].race_time : null,
                    result: filter[0] ? filter[0].result : null,
                    is_na: filter[0] ? filter[0].is_na : null,
                    point_id: filter[0] ? filter[0].point_id : null,
                    venue_name: filter[0] ? filter[0].track_name : null,
                    meetdate: filter[0] ? filter[0].meetdate : null,
                    track_condition: filter[0]
                      ? filter[0].track_condition
                      : null,
                  });
                }
              }
              // console.log(allDayResult);
              res.status(200).send({
                status: 200,
                data: {
                  trackInfo: resultss[0],
                  horses: resultss[1],
                  venues: resultss[2],
                  point_id: raceId,
                  generationTime: resultss[3],
                  allDayResult: allDayResult,
                  allRacesDayResults: resultss[5],
                },
              });
            } else {
              res.status(200).send({
                status: 500,
                message: "No data Available",
              });
            }
          }
        });
      } else {
        res.status(200).send({
          status: 300,
          message: "No data Available",
        });
      }
    }
  });
};

exports.last10Winners = (req, res) => {
  let getLat10Winners = `SELECT meetdate,race_num,track_name ,p.point_id ,
    (select json_object('position', position , 'ub_win' , ub_win , 'sb_win', sb_win , 'tab_no', tab_no)
    from (select pd.tab_no, pd.position , pd.ub_win , pd.sb_win from points_details as pd where pd.point_id= p.point_id
     and pd.position=1  order by (CASE WHEN p.track_condition = 'G' THEN pd.points_per_good
         WHEN p.track_condition = 'SO' THEN pd.points_per_soft
         WHEN p.track_condition = 'SY' THEN pd.points_per_synth
         WHEN p.track_condition = 'F' THEN pd.points_per_firm
         WHEN p.track_condition = 'H' THEN pd.points_per_heavy
         ELSE pd.points_per_good
         END)DESC,pd.ub_win Desc limit 1
    ) as t )as details ,
    (select  JSON_EXTRACT(details,'$."ub_win"')) as ub_win ,
     (select  JSON_EXTRACT(details,'$."sb_win"')) as sb_win  ,
     (select  JSON_EXTRACT(details,'$."tab_no"')) as tab_no ,
     (select  JSON_EXTRACT(details,'$."position"')) as position
     from points as p
    WHERE result ='WON'  AND is_na !=1 and
    ((select  pd.ub_win  from points_details as pd where pd.point_id= p.point_id
     and pd.position=1  order by (CASE WHEN p.track_condition = 'G' THEN pd.points_per_good
         WHEN p.track_condition = 'SO' THEN pd.points_per_soft
         WHEN p.track_condition = 'SY' THEN pd.points_per_synth
         WHEN p.track_condition = 'F' THEN pd.points_per_firm
         WHEN p.track_condition = 'H' THEN pd.points_per_heavy
         ELSE pd.points_per_good
         END)DESC,pd.ub_win Desc limit 1 ) >7
         or
         (select  pd.sb_win  from points_details as pd where pd.point_id= p.point_id
     and pd.position=1  order by (CASE WHEN p.track_condition = 'G' THEN pd.points_per_good
         WHEN p.track_condition = 'SO' THEN pd.points_per_soft
         WHEN p.track_condition = 'SY' THEN pd.points_per_synth
         WHEN p.track_condition = 'F' THEN pd.points_per_firm
         WHEN p.track_condition = 'H' THEN pd.points_per_heavy
         ELSE pd.points_per_good
         END)DESC,pd.ub_win Desc limit 1 ) > 7)
    ORDER BY meetdate DESC Limit 10;`;
  connection.query(getLat10Winners, function (error, resultss, fields) {
    if (error) {
      res.status(500).send({
        status: 500,
        message: "Error getting LAST 10 winners at odds",
      });
      console.log("Error getting gLAST 10 winners at odds:" + error);
    } else {
      res.status(200).send({
        status: 200,
        data: { info: resultss },
        // data: {trackInfo: resultss[0],
        // horses: resultss[1],
        // point_id : raceId,
        // },
      });
    }
  });
};

exports.NextTojump = (req, res) => {
  // let getLat10Winners = " SELECT p.point_id, race_num, track_name, tab_no as horse_nb,track_condition, horse_sf, unibet_odds,\
  // sportsbetting_odds,meetdate,race_time, \
  // (CASE WHEN p.track_condition = 'G' THEN pd.points_per_good \
  // WHEN p.track_condition = 'SO' THEN pd.points_per_soft \
  // WHEN p.track_condition = 'SY' THEN pd.points_per_synth \
  // WHEN p.track_condition = 'F' THEN pd.points_per_firm \
  // WHEN p.track_condition = 'H' THEN pd.points_per_heavy \
  // ELSE pd.points_per_good \
  // END) AS selections_first, \
  // (SELECT (CASE WHEN p5.track_condition = 'G' THEN p6.points_per_good \
  // WHEN p5.track_condition = 'SO' THEN p6.points_per_soft \
  // WHEN p5.track_condition = 'SY' THEN p6.points_per_synth \
  // WHEN p5.track_condition = 'F' THEN p6.points_per_firm \
  // WHEN p5.track_condition = 'H' THEN p6.points_per_heavy \
  // ELSE p6.points_per_good END) AS selection2 \
  // FROM points AS p5 LEFT JOIN points_details AS p6 ON p5.point_id = p6.point_id \
  // WHERE p5.meetdate = DATE(LOCALTIME()) \
  // AND p5.point_id = p.point_id \
  // ORDER BY selection2 DESC \
  // LIMIT 1,1 ) as selections_second \
  //FROM points as p join points_details as pd ON p.point_id=pd.point_id \
  //WHERE DATE(p.meetdate) >= DATE(LOCALTIME()) \
  //AND race_time >= TIME(LOCALTIME()) \
  //AND CASE WHEN p.track_condition = 'G' THEN pd.points_per_good = (SELECT MAX(p4.points_per_good) from points_details as p4 where p4.point_id = p.point_id) \
  //WHEN p.track_condition = 'SO' THEN pd.points_per_soft = (SELECT MAX(p4.points_per_soft) from points_details as p4 where p4.point_id = p.point_id) \
  //WHEN p.track_condition = 'SY' THEN pd.points_per_synth = (SELECT MAX(p4.points_per_synth) from points_details as p4 where p4.point_id = p.point_id) \
  //WHEN p.track_condition = 'F' THEN pd.points_per_firm = (SELECT MAX(p4.points_per_firm) from points_details as p4 where p4.point_id = p.point_id) \
  //WHEN p.track_condition = 'H' THEN pd.points_per_heavy = (SELECT MAX(p4.points_per_heavy) from points_details as p4 where p4.point_id = p.point_id) \
  //ELSE pd.points_per_good = (SELECT MAX(p4.points_per_good) from points_details as p4 where p4.point_id = p.point_id) \
  //END \
  //ORDER BY meetdate asc, race_time asc; "

  let getLat10Winners =
    "SELECT meetdate,race_num,race_status,race_time,selections,track_condition,track_description,track_distance,track_name,track_weather,point_id from points WHERE meetdate >=(select CURDATE()) AND race_status='Open' ORDER BY meetdate ASC, race_time ASC Limit 10;";
  connection.query(getLat10Winners, function (error, resultss, fields) {
    if (error) {
      res.status(500).send({
        status: 500,
        message: "Error getting NextTojump",
      });
      console.log("Error getting NextTojump:" + error);
    } else {
      res.status(200).send({
        status: 200,
        data: { info: resultss },
      });
    }
  });
};

// exports.GenerationTimes = (req, res) => {                                ***********removed for OPT
//   const { raceId } = req.body;
//   let getGenerationTime =
//     "select generation_time,point_id from points_generation_time where point_id=" +
//     raceId +
//     " order by generation_time desc;";
//   connection.query(getGenerationTime, function (error, resultss, fields) {
//     if (error) {
//       res.status(500).send({
//         status: 500,
//         message: "Error getting generation time",
//       });
//       console.log("Error getting generation time:" + error);
//     } else {
//       res.status(200).send({
//         status: 200,
//         data: { info: resultss },
//       });
//     }
//   });
// };

exports.GETLastTenWinners = (req, res) => {
  let getLast10Winners =
    "select * from points WHERE is_na !=1 AND result ='WON' order by meetdate desc,race_time desc LIMIT 10;";
  connection.query(getLast10Winners, function (error, resultss, fields) {
    if (error) {
      res.status(500).send({
        status: 500,
        message: "Error getting generation time",
      });
      console.log("Error getting generation time:" + error);
    } else {
      res.status(200).send({
        status: 200,
        data: { info: resultss },
      });
    }
  });
};

//exports.getAllNews = (req, res) => {
// Feed.load('https://www.theroar.com.au/feed/', function(err, rss){
// res.send(rss)
// });
//}

exports.getRacesByDate = (req, res) => {
  let data = req.body;
  let sql = `SELECT distinct trackcode FROM race_aap WHERE MEETDATE = '${moment(
    data.date
  ).format("YYYY-MM-DD 00:00:00")}'`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).send({
      status: 200,
      data: result,
    });
  });
};

exports.formings = (req, res) => {
  let data = req.body;
  let sql = `SELECT * FROM forming_aap WHERE RACE_ID = ${data.id}`;
  connection.query(sql, (err, result) => {
    res.status(200).send({
      status: 200,
      data: result,
    });
  });
};

/**
 *
 * @param req
 * @param res
 * This function is for getting horses for each race.
 */
exports.loadRaceForm = async (req, res) => {
  /**
   * let sql = `select * from points_details where point_id in (`;
  for (let i = 0; i < data[0].races.length; i++) {
    if (i === 0) {
      sql += `${data[0].races[i].point_id}`;
    } else {
      sql += `,${data[0].races[i].point_id}`;
    }
  }
  sql += `);`;

  let con;
  try {
    con = await connectionPromise.getConnection();
    const [horses] = await con.query(sql).catch((err) => {});
    //console.log(horses);
    return horses;
  } catch (error) {
    console.log(error);
  } finally {
    if (con) {
      con.release();
    }
  }
   */
  let item = req?.body;
  let sql = `SELECT * FROM horse_aap where RACENUM = '${item?.RACENUM
    }' AND MEETDATE = '${moment(item?.MEETDATE).format(
      "YYYY-MM-DD 00:00:00"
    )}' AND TRACKCODE = "${item?.TRACKCODE}"`;
  let con;
  try {
    // console.log(item);
    con = await connectionPromise.getConnection();
    const [result] = await con.query(sql).catch((err) => { });
    // console.log(result);
    res.status(200).send({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.log("Error: ", err);
  } finally {
    if (con) {
      con.release();
    }
  }
};

exports.races = async (req, res) => {
  let data = req?.body;
  let sql = `SELECT * FROM race_aap WHERE MEETDATE = "${moment(
    data?.date
  ).format("YYYY-MM-DD 00:00:00")}" AND TRACKCODE = "${data?.trackCode
    }" ORDER BY RACENUM ASC`;
  let con;
  try {
    // console.log(item);
    con = await connectionPromise.getConnection();
    const [result] = await con.query(sql).catch((err) => { });
    // console.log(result);
    res.status(200).send({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.log("Error: ", err);
  } finally {
    if (con) {
      con.release();
    }
  }
};

exports.loadSingleRace = async (req, res) => {
  let data = req?.body;
  let sql = `select * from race_aap where meetdate = "${moment(
    data?.meetdate
  ).format("YYYY-MM-DD 00:00:00")}" \
 and trackcode = "${data?.trackcode}" and racenum = "${data?.racenum}"`;
  let con;
  try {
    // console.log(item);
    con = await connectionPromise.getConnection();
    const [result] = await con.query(sql).catch((err) => { });
    // console.log(result);
    res.status(200).send({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.log("Error: ", err);
  } finally {
    if (con) {
      con.release();
    }
  }
};

exports.getVenueStats = (req, res) => {
  const { date, trackCode } = req.body;
  let dayOfWeek = moment(date, "YYYY-MM-DD").format("d");
  // var last30 = moment(date).subtract(30, 'day').format("YYYY-MM-DD")
  // var lastyear = moment(date).subtract(6, 'month').format("YYYY-MM-DD")
  //console.log(date, trackCode)

  let GetRaceAnalytics = ` select
    /*
    ( select json_arrayagg(json_object('runs',runs,'won',won,'place',place,'avg_win_odd',avg_win_odd)  ) as t
    from (SELECT runs,won,place,avg_win_odd from race_venues where venue_shortName='${trackCode.replace(
    /'/g,
    "''"
  )}' limit 1 ) as venue_sts
    )as venue_stats ,*/
    (select json_arrayagg(json_object('tname',tname,'tc',tc,'venuesPerformance',venuesPerformance,'venue_history',venue_history))
    from ( select distinct(track_name) as tname, (trackcode) as tc,
    (select JSON_OBJECT('win',win,'place',place,'avg_win_odds',avg_win_odds,'avg_place_odds',avg_place_odds,'runs',runs) as t
        from (SELECT
      COUNT(CASE WHEN result = 'WON' then 1 ELSE NULL END) as win,
       (COUNT(CASE WHEN result = 'WON' then 1 ELSE NULL END) +
       COUNT(CASE WHEN result = '2ND' then 1 ELSE NULL END) +
       COUNT(CASE WHEN result = '3RD' then 1 ELSE NULL END) ) as place,
       FORMAT(AVG(CASE WHEN result = 'WON' then d.ub_win ELSE NULL END),2) as avg_win_odds,
       FORMAT(AVG(CASE WHEN result = 'WON' then d.ub_place WHEN result = '2ND' then d.ub_place WHEN result = '3RD' then d.ub_place ELSE NULL END),2)
       as avg_place_odds,
       COUNT(CASE WHEN result = 'WON' then 1
                   WHEN result = '2ND' then 1
                   WHEN result = '3RD' then 1
                   WHEN result = 'LOST' then 1
                   END) as runs
        FROM points as p ,points_details as d
        WHERE result IS NOT NULL AND is_na!=1  AND track_condition !='ABND' and d.horse_status!='Scratched'  and d.horse_status!='LateScratching'
        AND meetdate='${date}' AND trackcode=tc
        AND p.point_id=d.point_id AND (Case when result='WON' then d.position=1
        when result='2ND' then d.position=2 when result='3RD' then d.position=3 else d.position=1 end)
        ) as venuesPerformance ) as venuesPerformance ,
        (select JSON_OBJECT('runs',runs,'won',won,'place',place,'avg_win_odd',avg_win_odd) as t
        from (select runs,won,place,avg_win_odd from race_venues where venue_shortName=tc limit 1 ) as venue_history)as venue_history
        from  points as pt1 where meetdate='${date}' group by tname,tc  order by ( JSON_EXTRACT(venuesPerformance,'$."win"')/ JSON_EXTRACT(venuesPerformance,'$."runs"')) desc
            )as v) as venues ,
    /*
        (select JSON_OBJECT('runs',runs,'won',won,'winOdd',avgOdd,'place',place)as t
        from (   SELECT count(distinct(p.point_id)) as runs,
        count(case when p.result='WON' then 1 else null end) as won,
        TRUNCATE(AVG(CASE WHEN p.result = 'WON' then SUBSTRING_INDEX(SUBSTRING_INDEX(r1, '@', -1) ,',' , 1) ELSE NULL END) , 2) as avgOdd,
        (COUNT(CASE WHEN p.result = 'WON' then 1 ELSE NULL END)
        + COUNT(CASE WHEN p.result = '2ND' then 1 ELSE NULL END)
        + COUNT(CASE WHEN p.result = '3RD' then 1 ELSE NULL END) ) as place
        from points as p
        WHERE WEEKDAY(meetdate)=${dayOfWeek}
        and p.is_na=0
        and p.track_condition !='ABND'
        and p.result_flag!=0
        and result is not null
        and result !='N/A' )as t)as daily_history ,
        */

        (select JSON_OBJECT('runs',runs,'won',won,'winOdd',avgOdd,'place',place ,'plcOdd',avgPlcOdd)as t
        from (   SELECT count(distinct(p.point_id)) as runs,
        count(case when p.result='WON' then 1 else null end) as won,
        TRUNCATE(AVG(CASE WHEN p.result = 'WON' then SUBSTRING_INDEX(SUBSTRING_INDEX(r1, '@', -1) ,',' , 1) ELSE NULL END) , 2) as avgOdd,
        (COUNT(CASE WHEN p.result = 'WON' then 1 ELSE NULL END)
        + COUNT(CASE WHEN p.result = '2ND' then 1 ELSE NULL END)
        + COUNT(CASE WHEN p.result = '3RD' then 1 ELSE NULL END) ) as place,
        TRUNCATE(AVG(
        CASE WHEN p.result = 'WON' then SUBSTRING_INDEX(SUBSTRING_INDEX(r1, '@', -1) ,',' , 1)
         WHEN p.result= '2ND' then  SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(r2, '@', -1) ,',' , -1),'/',1)
         WHEN p.result= '3RD' then  SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(r3, '@', -1) ,',' , -1),'/',1)
        ELSE NULL END
        ) , 2) as avgPlcOdd
        from points as p
        WHERE meetdate='${date}'
        and p.is_na=0
        and p.track_condition !='ABND'
        and p.result_flag!=0
        and result is not null
        and result !='N/A' )as t)as current_date_results;`;

  connection.query(GetRaceAnalytics, function (error, results, fields) {
    if (error) {
      res.status(500).send({
        status: 500,
        message: "Error Race analytics",
      });
      console.log("Error getting Race analytics:" + error);
    } else {
      if (results.length > 0) {
        res.status(200).send({
          status: 200,
          data: results[0],
        });
      } else {
        res.status(200).send({
          status: 200,
          data: null,
        });
      }
    }
  });
};

exports.getAllScratchings = (req, res) => {
  let data = req.body;
  let sql = `select horse_name, tab_no, scr_time, horse_status, horse_silksUrl,trackcode, meetdate, p.point_id, p.track_condition, ub_open_price, sb_open_price, scr_time from points_details as pd join points as p on pd.point_id = p.point_id
    where (horse_status = 'Scratched' or horse_status = 'LateScratching') and p.meetdate = "${data.meetdate}";`;

  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).send({
      status: 200,
      data: result,
    });
  });
};

exports.getHorseProfile = (req, res) => {
  const { horseID } = req.body;
  let getData = `SELECT hp.FORMSUM,h.horse_name,t.trainer_name,t.trainer_id,o.owner_name,s.sire_name,d.dam_name,sod.sire_name as sireofdam,hp.SEX,hp.AGE,hp.CAREERPRZ,hp.TRNPLACE,hp.CAREERSTS,
    hp.PLACEPERC,hp.WINPERC,hp.COLOUR,hp.COLOURS,hp.CAREERSTS,hp.GOODSTAT,hp.SYNTHSTAT,hp.FIRMSTAT,hp.SOFTSTAT,hp.HEAVYSTAT,hp.1STUPSTAT as firstup,hp.2NDUPSTAT as secondup,hp.3RDUPSTAT as thirdUp ,
    (select pd.horse_sf from points as p,points_details as pd where p.point_id=pd.point_id and horse_name=h.horse_name order by meetdate desc limit 1)as bookie_form ,(select rv.venue_shortName from race_venues as rv where rv.venue_fullName=hp.TRNPLACE limit 1) as trnplace_trackcode,
    (select MEETDATE from horse_history_details as hd1 where hd1.horse_id=${horseID} order by meetdate desc limit 1)as last_start,
    (select MEETDATE from horse_history_details as hd1 where hd1.horse_id=${horseID} and PLACE='1st' order by meetdate desc limit 1)as last_win,

   /*ptpList*/

    (select JSON_ARRAYAGG(JSON_OBJECT('position',position,'result',result,'track_distance',track_distance,'track_description',track_description,'meetdate',meetdate,'race_time',race_time,'point_id',point_id,
    'tab_no',tab_no,'horse_jockey',horse_jockey,'horse_trainer',horse_trainer,'trainer_id',trainer_id,'jockey_id',jockey_id,'trackcode',trackcode,'track_condition',
    track_condition,'race_num',race_num,'track_name',track_name)) as t
    from ( SELECT d.position,p.result,p.track_distance,p.track_description,p.meetdate,p.race_time,p.point_id,d.tab_no,d.horse_jockey,d.horse_trainer,d.trainer_id,d.jockey_id,p.trackcode,p.track_condition,p.race_num,p.track_name
    from points as p,points_details as d,horses as h where p.point_id=d.point_id and d.horse_name=h.horse_name and h.horse_id=${horseID} and p.result is not null
    and p.is_na=0 and (CASE WHEN p.track_condition = 'G' THEN d.points_per_good=(select max(points_per_good) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching' )
    WHEN p.track_condition = 'SO' THEN d.points_per_soft=(select max(points_per_soft) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching')
    WHEN p.track_condition = 'SY' THEN d.points_per_synth=(select max(points_per_synth) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching')
    WHEN p.track_condition = 'F' THEN d.points_per_firm=(select max(points_per_firm) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching')
    WHEN p.track_condition = 'H' THEN d.points_per_heavy=(select max(points_per_heavy) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching')
    ELSE NULL END ) order by meetdate desc limit 5 ) as t
    ) as ptpList,

    /*ptp stats*/

    (select JSON_OBJECT('runs',ptpRaces,'won',ptpWon,'second',ptpscnd,'third',ptpThird,'avg_win',totWin,'avg_place',totPlace) as t
       from (SELECT COUNT(CASE WHEN p.result is not null then 1 else null end) as ptpRaces,COUNT(CASE WHEN p.result='WON' and d.position=1 THEN 1 ELSE NULL END) as ptpWon,
    COUNT(CASE WHEN p.result='2ND' and d.position=2 THEN 1 ELSE NULL END) as ptpscnd,COUNT(CASE WHEN p.result='3RD' and d.position=3 THEN 1 ELSE NULL END) as ptpThird,
    AVG(CASE WHEN p.result = 'WON' AND d.position=1 then d.ub_place
           WHEN p.result = '2ND' AND d.position=2  then d.ub_place
           WHEN p.result = '3RD' AND d.position=3  then d.ub_place ELSE NULL END) as totPlace,
           AVG(CASE WHEN p.result = 'WON' AND d.position=1 then d.ub_win ELSE NULL END) as totWin
    from points as p,points_details as d,horses as h where p.point_id=d.point_id and d.horse_name=h.horse_name and h.horse_id=${horseID} and p.result is not null
    and p.is_na=0 and (CASE WHEN p.track_condition = 'G' THEN d.points_per_good=(select max(points_per_good) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching' )
    WHEN p.track_condition = 'SO' THEN d.points_per_soft=(select max(points_per_soft) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching')
    WHEN p.track_condition = 'SY' THEN d.points_per_synth=(select max(points_per_synth) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching')
    WHEN p.track_condition = 'F' THEN d.points_per_firm=(select max(points_per_firm) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching')
    WHEN p.track_condition = 'H' THEN d.points_per_heavy=(select max(points_per_heavy) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching')
    ELSE NULL END ) order by meetdate desc) as test) as ptpStats,

    /*upcoming race*/

    (select JSON_ARRAYAGG(JSON_OBJECT('meetdate',meetdate,'race_time',race_time,'track_name',track_name,'point_id',point_id,'track_condition',track_condition,'track_distance',track_distance,'race_num',race_num,'track_description',track_description))as t
    from (SELECT p.meetdate,p.race_time,p.track_name,p.point_id,p.track_condition,p.track_description,p.track_distance,p.race_num from points as p ,points_details as d,horses as h where p.point_id=d.point_id and d.horse_name=h.horse_name and h.horse_id=${horseID} and p.meetdate>= curdate()
    and p.result_flag=0 and d.horse_status!='Scratched' And d.horse_status!='LateScratching' and  p.track_condition !='ABND' order by meetdate asc
    ) as upcoming_races) as upcoming_races ,

    /*results aap*/

    (select JSON_ARRAYAGG(JSON_OBJECT(
    'TRACKCODE',TRACKCODE,'venue_fullName',venue_fullName,'STARTERS',STARTERS,'STARTERS',STARTERS,'PLACE',PLACE,'STEWIND',STEWIND,'STEWCODE1',STEWCODE1,'WPMARGIN',WPMARGIN,
    'RACENAME',RACENAME,'HORSEPRIZE',HORSEPRIZE,'CLASSCODE',CLASSCODE,'CLASSAGE',CLASSAGE,'DISTANCE',DISTANCE,'RACETIME',RACETIME,'SECTDISTTIME',SECTDISTTIME,'PRICEOPN',PRICEOPN,
    'PRICEMID',PRICEMID,'PRICESP',PRICESP,'HCPWGT',HCPWGT,'BARRIER',BARRIER,'OTHRR1WGT',OTHRR1WGT,'OTHRR2WGT',OTHRR2WGT,'OTHRR3WGT',OTHRR3WGT,'FFRATING',FFRATING,'OTRATING',OTRATING,
    'AGE',AGE,'GOING',GOING,'jockey_name',jockey_name,"real_jockey_name" , real_jockey_name,'jockey_id',jockey_id,'MEETDATE',MEETDATE
    )) as t
    from( SELECT hd.TRACKCODE,v.venue_fullName,hd.STARTERS,hd.PLACE,hd.STEWIND,hd.STEWCODE1,hd.STEWCODE2,hd.WPMARGIN,hd.RACENAME,hd.HORSEPRIZE,hd.CLASSCODE,
        hd.CLASSAGE,hd.DISTANCE,hd.RACETIME,hd.SECTDISTTIME,hd.PRICEOPN,hd.PRICEMID,hd.PRICESP,hd.HCPWGT,hd.BARRIER,hd.OTHRR1WGT,
        hd.OTHRR2WGT,hd.OTHRR3WGT,hd.FFRATING,hd.OTRATING,hd.AGE,hd.GOING,j.jockey_name,real_jockey_name,j.jockey_id,hd.MEETDATE
        from horse_history_details as hd,race_venues as v ,jockeys as j
        WHERE hd.horse_id=${horseID} and hd.CLASSCODE !='Btria' AND v.venue_shortName=hd.TRACKCODE AND j.jockey_id=hd.jockey_id ORDER BY MEETDATE DESC limit 6)as t) as races_result_aap,

        /*best performing venues*/

    (select JSON_ARRAYAGG(JSON_OBJECT('TRACKCODE',TRACKCODE,'runs',runs,'won',won,'place',place,'avgwin',avgwin,'details',details ))as t
        from ( SELECT count( hd.TRACKCODE) as runs,count(case when hd.PLACE ='1st' then 1 else null end ) as won,
        count(case when hd.PLACE ='1st' then 1
         when hd.PLACE ='2nd' then 1
         when hd.PLACE ='3rd' then 1
        else null end) as place,
        AVG(Case WHEN hd.PLACE='1st' then SUBSTRING_INDEX(SUBSTRING_INDEX(hd.PRICESP, '$', -1),'F',1) ELSE NULL END) AS avgwin,
        TRACKCODE,
        (select JSON_ARRAYAGG(JSON_OBJECT('PLACE',PLACE,'MEETDATE',MEETDATE,'TRACKCODE',TRACKCODE,'CLASS',CLASSCODE,'TRACKCOND',GOING,
        'DISTANCE',DISTANCE,'PRICESP',PRICESP,'jockey_name',jockey_name,'race_nav',race_nav))as t
		from (select j1.jockey_name,hp.PLACE,hp.MEETDATE,hp.TRACKCODE,hp.DISTANCE,hp.PRICESP,hp.CLASSCODE,hp.GOING,
        (select JSON_OBJECT('point_id',point_id,'race_num',race_num,'meetdate',meetdate,'track_name',track_name) as t
        from (select pts.point_id,pts.race_num,pts.meetdate,pts.track_name from points as pts where pts.meetdate=hp.MEETDATE and pts.trackcode=hp.TRACKCODE and pts.track_description=hp.RACENAME and hp.CLASSCODE !='Btria' limit 1) as race_nav)as race_nav
		from horse_history_details as hp,jockeys as j1
		where hp.horse_id=${horseID} and hp.CLASSCODE !='Btria' and hp.jockey_id=j1.jockey_id and hp.TRACKCODE=hd.TRACKCODE   order by meetdate desc limit 5) as bestPerformingVenues) as details
        from horse_history_details as hd
        WHERE hd.horse_id=${horseID} and hd.CLASSCODE !='Btria'  group by TRACKCODE order by won desc , place desc limit 5) as bestPerformingVenues)as bestPerformingVenues,

        /* bestPerformingJockey */

        (select JSON_ARRAYAGG(JSON_OBJECT('jockey_name',jockey_name,'runs',runs,'won',won,'place',place,'avgwin',avgwin,'details',details ))as t
        from ( SELECT count( j.jockey_name) as runs,count(case when hd.PLACE ='1st' then 1 else null end ) as won,
            count(case when hd.PLACE ='1st' then 1
             when hd.PLACE ='2nd' then 1
             when hd.PLACE ='3rd' then 1
            else null end) as place,
            AVG(Case WHEN hd.PLACE='1st' then SUBSTRING_INDEX(SUBSTRING_INDEX(hd.PRICESP, '$', -1),'F',1) ELSE NULL END) AS avgwin,j.jockey_name,
            (select JSON_ARRAYAGG(JSON_OBJECT('PLACE',PLACE,'MEETDATE',MEETDATE,'TRACKCODE',TRACKCODE,'CLASS',CLASSCODE,'TRACKCOND',GOING,
            'DISTANCE',DISTANCE,'PRICESP',PRICESP,'jockey_name',jockey_name,'race_nav',race_nav))as t
            from (select hp.PLACE,hp.MEETDATE,hp.TRACKCODE,hp.DISTANCE,hp.PRICESP,hp.CLASSCODE,hp.GOING,
            (select JSON_OBJECT('point_id',point_id,'race_num',race_num,'meetdate',meetdate,'track_name',track_name) as t
            from (select pts.point_id,pts.race_num,pts.meetdate,pts.track_name from points as pts where pts.meetdate=hp.MEETDATE and pts.trackcode=hp.TRACKCODE and pts.track_description=hp.RACENAME and hp.CLASSCODE !='Btria' limit 1) as race_nav)as race_nav
            from horse_history_details as hp,jockeys as j1
            where hp.horse_id=${horseID} and hp.jockey_id=j1.jockey_id and j1.jockey_name=j.jockey_name and hp.CLASSCODE !='Btria'  order by meetdate desc limit 5) as bestPerformingJockey) as details
            from horse_history_details as hd ,jockeys as j
            WHERE hd.jockey_id=j.jockey_id and hd.horse_id=${horseID} and hd.CLASSCODE !='Btria' group by jockey_name order by won desc , place desc limit 5) as bestPerformingJockey) as bestPerformingJockey,

        /*is clockwise*/

        (select JSON_OBJECT('runs',runs,'fst',1st,'scnd',2nd,'thrd',3rd)as t
        from (select count(hd.id) as runs,count(case when hd.place='1st' then 1 else null end)as 1st,count(case when hd.place='2nd' then 1 else null end)as 2nd,
        count(case when hd.place='3rd' then 1 else null end)as 3rd
        from horse_history_details as hd,race_venues as rv where hd.TRACKCODE=rv.venue_shortName and rv.is_clockWise=1 and hd.horse_id=${horseID} and hd.CLASSCODE !='Btria' )as t)as is_clockwise,

        /*is not clockwise*/

        (select JSON_OBJECT('runs',runs,'fst',1st,'scnd',2nd,'thrd',3rd)as t
        from (select count(hd.id) as runs,count(case when hd.place='1st' then 1 else null end)as 1st,count(case when hd.place='2nd' then 1 else null end)as 2nd,
        count(case when hd.place='3rd' then 1 else null end)as 3rd
        from horse_history_details as hd,race_venues as rv where hd.TRACKCODE=rv.venue_shortName and rv.is_clockWise=0 and hd.horse_id=${horseID} and hd.CLASSCODE !='Btria')as t)as is_not_clockwise,

        /*fav stats*/

        (select JSON_OBJECT('runs',runs,'fst',1st,'scnd',2nd,'thrd',3rd)as t
        from (select count(hd.id) as runs,count(case when hd.place='1st' then 1 else null end)as 1st,count(case when hd.place='2nd' then 1 else null end)as 2nd,
        count(case when hd.place='3rd' then 1 else null end)as 3rd
        from horse_history_details as hd where  hd.horse_id=${horseID} and hd.PRICESP like '%F%' and hd.CLASSCODE !='Btria' )as t)as is_fav,

        /*group 1*/

        (select JSON_OBJECT('runs',runs,'fst',1st,'scnd',2nd,'thrd',3rd)as t
        from (select count(hd.id) as runs,count(case when hd.place='1st' then 1 else null end)as 1st,count(case when hd.place='2nd' then 1 else null end)as 2nd,
        count(case when hd.place='3rd' then 1 else null end)as 3rd
        from horse_history_details as hd where  hd.horse_id=${horseID} and hd.GROUP ='G1' and hd.CLASSCODE !='Btria' )as t)as group1,

        /*group 2*/

        (select JSON_OBJECT('runs',runs,'fst',1st,'scnd',2nd,'thrd',3rd)as t
        from (select count(hd.id) as runs,count(case when hd.place='1st' then 1 else null end)as 1st,count(case when hd.place='2nd' then 1 else null end)as 2nd,
        count(case when hd.place='3rd' then 1 else null end)as 3rd
        from horse_history_details as hd where  hd.horse_id=${horseID} and hd.GROUP ='G2' and hd.CLASSCODE !='Btria' )as t)as group2,

        /*group 3*/

        (select JSON_OBJECT('runs',runs,'fst',1st,'scnd',2nd,'thrd',3rd)as t
        from (select count(hd.id) as runs,count(case when hd.place='1st' then 1 else null end)as 1st,count(case when hd.place='2nd' then 1 else null end)as 2nd,
        count(case when hd.place='3rd' then 1 else null end)as 3rd
        from horse_history_details as hd where  hd.horse_id=${horseID} and hd.GROUP ='G3' and hd.CLASSCODE !='Btria' )as t)as group3,

     /*bestPerformingVenuesPtp */

    (select JSON_ARRAYAGG(JSON_OBJECT('runs',ptpRaces,'won',ptpWon,'second',ptpscnd,'third',ptpThird,'avg_win',totWin,'avg_place',totPlace,'trackcode',trackcode,'details',details)) as t
	from (SELECT COUNT(CASE WHEN p.result is not null then 1 else null end) as ptpRaces,COUNT(CASE WHEN p.result='WON' and d.position=1 THEN 1 ELSE NULL END) as ptpWon,
    COUNT(CASE WHEN p.result='2ND' and d.position=2 THEN 1 ELSE NULL END) as ptpscnd,COUNT(CASE WHEN p.result='3RD' and d.position=3 THEN 1 ELSE NULL END) as ptpThird,
    AVG(CASE WHEN p.result = 'WON' AND d.position=1 then d.ub_place
	WHEN p.result = '2ND' AND d.position=2  then d.ub_place
	WHEN p.result = '3RD' AND d.position=3  then d.ub_place ELSE NULL END) as totPlace,
	AVG(CASE WHEN p.result = 'WON' AND d.position=1 then d.ub_win ELSE NULL END) as totWin ,p.trackcode,
   (select JSON_ARRAYAGG(JSON_OBJECT('meetdate',meetdate,'horse_jockey',horse_jockey,'position',position,'track_condition',track_condition,'track_distance',track_distance,'ub_win',ub_win,'ub_place',ub_place))as t
	from ( select meetdate,horse_jockey,position,track_condition,track_distance,ub_win,ub_place from points as p1,points_details as pd,horses as h where p1.point_id=pd.point_id and pd.horse_name=h.horse_name and (CASE WHEN p1.track_condition = 'G' THEN pd.points_per_good=(select max(points_per_good) from points_details where point_id=pd.point_id and p1.is_na=0 and pd.horse_status!='Scratched' and pd.horse_status!='LateScratching' )
	WHEN p1.track_condition = 'SO' THEN pd.points_per_soft=(select max(points_per_soft) from points_details where point_id=pd.point_id and p1.is_na=0 and pd.horse_status!='Scratched' and pd.horse_status!='LateScratching')
	WHEN p1.track_condition = 'SY' THEN pd.points_per_synth=(select max(points_per_synth) from points_details where point_id=pd.point_id and p1.is_na=0 and pd.horse_status!='Scratched' and pd.horse_status!='LateScratching')
	WHEN p1.track_condition = 'F' THEN pd.points_per_firm=(select max(points_per_firm) from points_details where point_id=pd.point_id and p1.is_na=0 and pd.horse_status!='Scratched' and pd.horse_status!='LateScratching')
	WHEN p1.track_condition = 'H' THEN pd.points_per_heavy=(select max(points_per_heavy) from points_details where point_id=pd.point_id and p1.is_na=0 and pd.horse_status!='Scratched' and pd.horse_status!='LateScratching')
	ELSE NULL END ) and h.horse_id=${horseID} and p1.trackcode=p.trackcode order by p1.meetdate desc limit 5 ) as t2 )as details
    from points as p,points_details as d,horses as h where p.point_id=d.point_id and d.horse_name=h.horse_name and h.horse_id=${horseID} and p.result is not null
    and p.is_na=0 and (CASE WHEN p.track_condition = 'G' THEN d.points_per_good=(select max(points_per_good) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching' )
    WHEN p.track_condition = 'SO' THEN d.points_per_soft=(select max(points_per_soft) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching')
    WHEN p.track_condition = 'SY' THEN d.points_per_synth=(select max(points_per_synth) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching')
    WHEN p.track_condition = 'F' THEN d.points_per_firm=(select max(points_per_firm) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching')
    WHEN p.track_condition = 'H' THEN d.points_per_heavy=(select max(points_per_heavy) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching')
    ELSE NULL END ) group by trackcode) as test) as bestPerformingVenuesPtp,

    /* bestPerformingJockeysPtp */

    (select JSON_ARRAYAGG(JSON_OBJECT('runs',ptpRaces,'won',ptpWon,'second',ptpscnd,'third',ptpThird,'avg_win',totWin,'avg_place',totPlace,'horse_jockey',horse_jockey,'details',details)) as t
	from (SELECT COUNT(CASE WHEN p.result is not null then 1 else null end) as ptpRaces,COUNT(CASE WHEN p.result='WON' and d.position=1 THEN 1 ELSE NULL END) as ptpWon,
    COUNT(CASE WHEN p.result='2ND' and d.position=2 THEN 1 ELSE NULL END) as ptpscnd,COUNT(CASE WHEN p.result='3RD' and d.position=3 THEN 1 ELSE NULL END) as ptpThird,
    AVG(CASE WHEN p.result = 'WON' AND d.position=1 then d.ub_place
	WHEN p.result = '2ND' AND d.position=2  then d.ub_place
	WHEN p.result = '3RD' AND d.position=3  then d.ub_place ELSE NULL END) as totPlace,
	AVG(CASE WHEN p.result = 'WON' AND d.position=1 then d.ub_win ELSE NULL END) as totWin ,d.horse_jockey,
   (select JSON_ARRAYAGG(JSON_OBJECT('meetdate',meetdate,'trackcode',trackcode,'position',position,'track_condition',track_condition,'track_distance',track_distance,'ub_win',ub_win,'ub_place',ub_place))as t
	from ( select meetdate,trackcode,position,track_condition,track_distance,ub_win,ub_place from points as p1,points_details as pd,horses as h where p1.point_id=pd.point_id and pd.horse_name=h.horse_name and (CASE WHEN p1.track_condition = 'G' THEN pd.points_per_good=(select max(points_per_good) from points_details where point_id=pd.point_id and p1.is_na=0 and pd.horse_status!='Scratched' and pd.horse_status!='LateScratching' )
	WHEN p1.track_condition = 'SO' THEN pd.points_per_soft=(select max(points_per_soft) from points_details where point_id=pd.point_id and p1.is_na=0 and pd.horse_status!='Scratched' and pd.horse_status!='LateScratching')
	WHEN p1.track_condition = 'SY' THEN pd.points_per_synth=(select max(points_per_synth) from points_details where point_id=pd.point_id and p1.is_na=0 and pd.horse_status!='Scratched' and pd.horse_status!='LateScratching')
	WHEN p1.track_condition = 'F' THEN pd.points_per_firm=(select max(points_per_firm) from points_details where point_id=pd.point_id and p1.is_na=0 and pd.horse_status!='Scratched' and pd.horse_status!='LateScratching')
	WHEN p1.track_condition = 'H' THEN pd.points_per_heavy=(select max(points_per_heavy) from points_details where point_id=pd.point_id and p1.is_na=0 and pd.horse_status!='Scratched' and pd.horse_status!='LateScratching')
	ELSE NULL END ) and h.horse_id=${horseID}  order by p1.meetdate desc limit 5 ) as t2 )as details
    from points as p,points_details as d,horses as h where p.point_id=d.point_id and d.horse_name=h.horse_name and h.horse_id=${horseID} and p.result is not null
    and p.is_na=0 and (CASE WHEN p.track_condition = 'G' THEN d.points_per_good=(select max(points_per_good) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching' )
    WHEN p.track_condition = 'SO' THEN d.points_per_soft=(select max(points_per_soft) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching')
    WHEN p.track_condition = 'SY' THEN d.points_per_synth=(select max(points_per_synth) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching')
    WHEN p.track_condition = 'F' THEN d.points_per_firm=(select max(points_per_firm) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching')
    WHEN p.track_condition = 'H' THEN d.points_per_heavy=(select max(points_per_heavy) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching')
    ELSE NULL END ) group by horse_jockey) as test) as bestPerformingJockeysPtp

    from horse_profile as hp,horses as h, sires as s ,dams as d ,owners as o, trainers as t,sires as sod
    where hp.horse_id=h.horse_id and hp.sireofdam_id=sod.sire_id
    and hp.sire_id=s.sire_id and hp.dam_id=d.dam_id and hp.owner_id=o.owner_id and hp.trainer_id=t.trainer_id and hp.horse_id=${horseID};`;

  connection.query(getData, function (error, results, fields) {
    if (error) {
      res.status(500).send({
        status: 500,
        message: "Error getting Horse Profile",
      });
      console.log("Error getting Horse Profile :" + error);
    } else {
      res.status(200).send({
        status: 200,
        data: results[0],
      });
    }
  });
};

exports.getJockeyProfile = (req, res) => {
  const { jockeyID } = req.body;
  // let getJockeyData = `select  (select horse_jockey from points_details as pd where pd.jockey_id=${jockeyID} order by pd.point_id desc limit 1) as hj1
  let getJockeyData = `select (select real_jockey_name from jockeys where jockey_id=${jockeyID} order by jockey_id desc limit 1) as hj1
  ,

            /*career stats*/
            (select JSON_OBJECT('runs',runs,'win',1st,'second',2nd,'third',3rd,'avg_win_odd',avg_win_odd,'avg_plc_odd',avg_plc_odd)as t
            from (select count(pd1.point_id) as runs,count(case when pd1.position='1' then 1 else null end)as 1st,count(case when pd1.position='2' then 1 else null end)as 2nd,
            count(case when pd1.position='3' then 1 else null end)as 3rd ,
            ROUND(avg(case when pd1.position='1' then ub_win else null end),2) as avg_win_odd,
            ROUND(avg(case when pd1.position='1' then ub_place when pd1.position='2' then ub_place when pd1.position='3' then ub_place else null end),2) as avg_plc_odd
            from points_details as pd1,points as pt1 where  pt1.point_id=pd1.point_id and pt1.result_flag=1 and pd1.horse_jockey=hj1 and pt1.track_condition !='ABND' and  pd1.horse_status!='Scratched'
            and  pd1.horse_status!='LateScratching')as t)as career_stats,


            /*best performing horses*/
            (select JSON_ARRAYAGG( JSON_OBJECT('runs',runs,'win',1st,'winPer',per,'second',2nd,'third',3rd,'horse_name',horse_name, 'horse_id', horse_id))as t
            from (select count(pd1.point_id) as runs,count(case when pd1.position='1' then 1 else null end)as 1st,count(case when pd1.position='1' then 1 else null end)/count(pd1.point_id)*100 as per,
            count(case when pd1.position='2' then 1 else null end)as 2nd,
            count(case when pd1.position='3' then 1 else null end)as 3rd ,pd1.horse_name,
            horse_id
            from points_details as pd1,points as pt1 where pt1.point_id=pd1.point_id and pt1.result_flag=1 and pd1.horse_jockey=hj1 and pt1.track_condition !='ABND' and  pd1.horse_status!='Scratched'
            and  pd1.horse_status!='LateScratching' group by pd1.horse_name order by per desc, 1st desc limit 10) as t)as best_performing_horses,

            /*best performing venues */
            (select JSON_ARRAYAGG( JSON_OBJECT('runs',runs,'win',1st,'winPer',per, 'second',2nd,'third',3rd,'trackcode',trackcode))as t
            from (select count(pd1.point_id) as runs,count(case when pd1.position='1' then 1 else null end)as 1st,count(case when pd1.position='1' then 1 else null end)/count(pd1.point_id)*100 as per,
            count(case when pd1.position='2' then 1 else null end)as 2nd,
            count(case when pd1.position='3' then 1 else null end)as 3rd ,pt1.trackcode
            from points_details as pd1,points as pt1 where  pt1.point_id=pd1.point_id and pt1.result_flag=1 and pd1.horse_jockey=hj1 and pt1.track_condition !='ABND' and  pd1.horse_status!='Scratched'
            and  pd1.horse_status!='LateScratching' group by pt1.trackcode order by per desc, 1st desc limit 10 )as t)as best_performing_venues,

            /*upcoming races*/

            (select JSON_ARRAYAGG( JSON_OBJECT('horse_name',horse_name,'meetdate',meetdate,'race_time',race_time,'point_id',point_id,'race_num',race_num,'track_name',track_name,'track_description',track_description)) as t
            from (select horse_name,meetdate,race_time,pt1.point_id,race_num,track_name,track_description from points as pt1 ,points_details as pd1 where pt1.point_id=pd1.point_id and pt1.meetdate>=curdate() and pt1.result_flag=0
            and pt1.track_condition !='ABND' and  pd1.horse_status!='Scratched' and  pd1.horse_status!='LateScratching' and pd1.horse_jockey=hj1 )as t2 ) as upcoming_races,

            /* ptp form */

            (select JSON_OBJECT('runs',ptpRaces,'won',ptpWon,'second',ptpscnd,'third',ptpThird,'avg_win',totWin,'avg_place',totPlace) as t
           from (SELECT COUNT(CASE WHEN p.result is not null then 1 else null end) as ptpRaces,COUNT(CASE WHEN p.result='WON' and d.position=1 THEN 1 ELSE NULL END) as ptpWon,
        COUNT(CASE WHEN p.result='2ND' and d.position=2 THEN 1 ELSE NULL END) as ptpscnd,COUNT(CASE WHEN p.result='3RD' and d.position=3 THEN 1 ELSE NULL END) as ptpThird,
        ROUND(AVG(CASE WHEN p.result = 'WON' AND d.position=1 then d.ub_place
               WHEN p.result = '2ND' AND d.position=2  then d.ub_place
               WHEN p.result = '3RD' AND d.position=3  then d.ub_place ELSE NULL END),2) as totPlace,
               ROUND(AVG(CASE WHEN p.result = 'WON' AND d.position=1 then d.ub_win ELSE NULL END),2) as totWin
        from points as p,points_details as d where p.point_id=d.point_id and d.horse_jockey=hj1 and p.result is not null and p.result_flag=1
        and p.is_na=0 and (CASE WHEN p.track_condition = 'G' THEN d.points_per_good=(select max(points_per_good) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching' )
        WHEN p.track_condition = 'SO' THEN d.points_per_soft=(select max(points_per_soft) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching')
        WHEN p.track_condition = 'SY' THEN d.points_per_synth=(select max(points_per_synth) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching')
        WHEN p.track_condition = 'F' THEN d.points_per_firm=(select max(points_per_firm) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching')
        WHEN p.track_condition = 'H' THEN d.points_per_heavy=(select max(points_per_heavy) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching')
        ELSE NULL END ) order by meetdate desc) as test) as ptpStats,

        /*ptp_results*/

        (select JSON_ARRAYAGG(JSON_OBJECT('horse_name',horse_name,'position',position,'result',result,'track_distance',track_distance,'track_description',track_description,'meetdate',meetdate,'race_time',race_time,'point_id',point_id,
        'tab_no',tab_no,'horse_jockey',horse_jockey,'horse_trainer',horse_trainer,'trainer_id',trainer_id,'jockey_id',jockey_id,'trackcode',trackcode,'track_condition',
        track_condition,'race_num',race_num,'track_name',track_name)) as t
        from ( SELECT d.horse_name,d.position,p.result,p.track_distance,p.track_description,p.meetdate,p.race_time,p.point_id,d.tab_no,d.horse_jockey,d.horse_trainer,d.trainer_id,d.jockey_id,p.trackcode,p.track_condition,p.race_num,p.track_name
        from points as p,points_details as d where p.point_id=d.point_id and d.horse_jockey=hj1  and p.result is not null and p.result_flag=1
        and p.is_na=0 and (CASE WHEN p.track_condition = 'G' THEN d.points_per_good=(select max(points_per_good) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching' )
        WHEN p.track_condition = 'SO' THEN d.points_per_soft=(select max(points_per_soft) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching')
        WHEN p.track_condition = 'SY' THEN d.points_per_synth=(select max(points_per_synth) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching')
        WHEN p.track_condition = 'F' THEN d.points_per_firm=(select max(points_per_firm) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching')
        WHEN p.track_condition = 'H' THEN d.points_per_heavy=(select max(points_per_heavy) from points_details where point_id=d.point_id and p.is_na=0 and d.horse_status!='Scratched' and d.horse_status!='LateScratching')
        ELSE NULL END ) order by meetdate desc limit 5 ) as t) as ptp_results ,

        /*last 5 starts*/
        (select JSON_ARRAYAGG(JSON_OBJECT('horse_name',horse_name,'position',position,'track_distance',track_distance,'track_description',track_description,'meetdate',meetdate,'race_time',race_time,'point_id',point_id,
        'tab_no',tab_no,'horse_jockey',horse_jockey,'horse_trainer',horse_trainer,'trainer_id',trainer_id,'jockey_id',jockey_id,'trackcode',trackcode,'track_condition',
        track_condition,'race_num',race_num,'track_name',track_name)) as t
        from ( SELECT d.horse_name,d.position,p.result,p.track_distance,p.track_description,p.meetdate,p.race_time,p.point_id,d.tab_no,d.horse_jockey,d.horse_trainer,d.trainer_id,
        d.jockey_id,p.trackcode,p.track_condition,p.race_num,p.track_name
        from points as p,points_details as d where p.point_id=d.point_id and d.horse_jockey=hj1  and p.result_flag=1
		order by meetdate desc limit 5 ) as t) as last_5_starts
        ;`;

  connection.query(getJockeyData, function (error, results, fields) {
    if (error) {
      res.status(500).send({
        status: 500,
        message: "Error getting Jockey Profile",
      });
      console.log("Error getting Jockey Profile :" + error);
    } else {
      // console.log(results[0])
      res.status(200).send({
        status: 200,
        data: results.length > 0 ? results[0] : null,
      });
    }
  });
};

exports.getTrainerProfile = (req, res) => {
  const { trainerID } = req.body;
  let getTrainerData = `SELECT count(hd.id)as best ,j.jockey_name, j.real_jockey_name , j.jockey_id FROM horse_history_details AS hd ,horse_profile AS hp,jockeys AS j WHERE hd.horse_id=hp.horse_id \
    AND hd.jockey_id=j.jockey_id AND hd.PLACE='1st' AND hp.trainer_id=${trainerID} GROUP BY j.jockey_id ORDER BY best DESC LIMIT 1; \
        SELECT count(hd.id) as best,h.horse_name,h.horse_id  from horse_history_details AS hd,horse_profile AS hp,horses AS h WHERE hd.horse_id=hp.horse_id \
    AND hp.horse_id=h.horse_id AND hd.PLACE='1st' AND hp.trainer_id=${trainerID} GROUP BY hd.horse_id ORDER BY best DESC LIMIT 1; \
        SELECT COUNT(CASE WHEN hd.PLACE='1st' THEN 1 ELSE NULL END) AS wins, \
   COUNT(CASE WHEN hd.PLACE='2nd' THEN 1 ELSE NULL END) AS secnds, \
   COUNT(CASE WHEN hd.PLACE='3rd' THEN 1 ELSE NULL END) AS thirds,COUNT(hd.PLACE) AS runs,SUM(Case WHEN hd.PLACE='1st' then SUBSTRING_INDEX(SUBSTRING_INDEX(hd.PRICESP, '$', -1),'F',1) ELSE NULL END) AS wonOdd,SUM(Case WHEN hd.PLACE='1st' then SUBSTRING_INDEX(SUBSTRING_INDEX(hd.PRICESP, '$', -1),'F',1) \
   WHEN hd.PLACE='2nd' then SUBSTRING_INDEX(SUBSTRING_INDEX(hd.PRICESP, '$', -1),'F',1) \
   WHEN hd.PLACE='3rd' then SUBSTRING_INDEX(SUBSTRING_INDEX(hd.PRICESP, '$', -1),'F',1) \
   ELSE NULL END) AS plcOdd FROM horse_history_details as hd,horse_profile as hp  \
   WHERE hd.horse_id=hp.horse_id AND  hp.trainer_id=${trainerID} ORDER BY wins DESC; \
        SELECT COUNT(CASE WHEN hd.PLACE='1st' THEN 1 ELSE NULL END) AS wins, \
   COUNT(CASE WHEN hd.PLACE='2nd' THEN 1 ELSE NULL END) AS secnds, \
   COUNT(CASE WHEN hd.PLACE='3rd' THEN 1 ELSE NULL END) AS thirds,COUNT(hd.PLACE) AS runs,SUM(Case WHEN hd.PLACE='1st' then SUBSTRING_INDEX(SUBSTRING_INDEX(hd.PRICESP, '$', -1),'F',1) ELSE NULL END) AS wonOdd,SUM(Case WHEN hd.PLACE='1st' then SUBSTRING_INDEX(SUBSTRING_INDEX(hd.PRICESP, '$', -1),'F',1) \
   WHEN hd.PLACE='2nd' then SUBSTRING_INDEX(SUBSTRING_INDEX(hd.PRICESP, '$', -1),'F',1) \
   WHEN hd.PLACE='3rd' then SUBSTRING_INDEX(SUBSTRING_INDEX(hd.PRICESP, '$', -1),'F',1) \
   ELSE NULL END) AS plcOdd FROM horse_history_details as hd,horse_profile as hp \
   WHERE hd.horse_id=hp.horse_id AND  hp.trainer_id=${trainerID} AND hd.MEETDATE>=DATE_SUB(curdate(), INTERVAL 1 YEAR) ORDER BY wins DESC; \
        SELECT hd.TRACKCODE,COUNT(CASE WHEN hd.PLACE='1st' THEN 1 ELSE NULL END) AS wins, \
   COUNT(CASE WHEN hd.PLACE='2nd' THEN 1 ELSE NULL END) AS secnds, \
   COUNT(CASE WHEN hd.PLACE='3rd' THEN 1 ELSE NULL END) AS thirds,COUNT(hd.PLACE) AS runs ,SUM(Case WHEN hd.PLACE='1st' then SUBSTRING_INDEX(SUBSTRING_INDEX(hd.PRICESP, '$', -1),'F',1) ELSE NULL END) AS wonOdd,SUM(Case WHEN hd.PLACE='1st' then SUBSTRING_INDEX(SUBSTRING_INDEX(hd.PRICESP, '$', -1),'F',1) \
   WHEN hd.PLACE='2nd' then SUBSTRING_INDEX(SUBSTRING_INDEX(hd.PRICESP, '$', -1),'F',1) \
   WHEN hd.PLACE='3rd' then SUBSTRING_INDEX(SUBSTRING_INDEX(hd.PRICESP, '$', -1),'F',1) \
   ELSE NULL END) AS plcOdd FROM horse_history_details as hd,horse_profile as hp \
   WHERE hd.horse_id=hp.horse_id AND  hp.trainer_id=${trainerID} GROUP BY hd.TRACKCODE  ORDER BY wins DESC; \
        SELECT j.real_jockey_name , j.jockey_name,j.jockey_id,COUNT(CASE WHEN hd.PLACE='1st' THEN 1 ELSE NULL END) AS wins, \
   COUNT(CASE WHEN hd.PLACE='2nd' THEN 1 ELSE NULL END) AS secnds, \
   COUNT(CASE WHEN hd.PLACE='3rd' THEN 1 ELSE NULL END) AS thirds,COUNT(hd.PLACE) AS runs ,SUM(Case WHEN hd.PLACE='1st' then SUBSTRING_INDEX(SUBSTRING_INDEX(hd.PRICESP, '$', -1),'F',1) ELSE NULL END) AS wonOdd,SUM(Case WHEN hd.PLACE='1st' then SUBSTRING_INDEX(SUBSTRING_INDEX(hd.PRICESP, '$', -1),'F',1) \
   WHEN hd.PLACE='2nd' then SUBSTRING_INDEX(SUBSTRING_INDEX(hd.PRICESP, '$', -1),'F',1) \
   WHEN hd.PLACE='3rd' then SUBSTRING_INDEX(SUBSTRING_INDEX(hd.PRICESP, '$', -1),'F',1) \
   ELSE NULL END) AS plcOdd FROM horse_history_details as hd,horse_profile as hp ,jockeys as j \
   WHERE hd.jockey_id=j.jockey_id AND hd.horse_id=hp.horse_id AND  hp.trainer_id=${trainerID} GROUP BY hd.jockey_id  ORDER BY wins DESC; \
        SELECT trainer_name,(select meetdate from horse_history_details where trainer_id=${trainerID} order by meetdate asc limit 1)as startdate from trainers where trainer_id=${trainerID}; \
    SELECT * from points as p,points_details as d,trainers as t where p.point_id=d.point_id and t.trainer_name=d.horse_trainer and t.trainer_id=${trainerID} and p.meetdate>= curdate() \
    and p.result_flag=0 and d.horse_status!='Scratched' And d.horse_status!='LateScratching' and p.track_condition !='ABND' order by meetdate asc ; \
    SELECT d.position,p.result,p.track_distance,p.track_description,p.meetdate,p.race_time,p.point_id,d.tab_no,d.horse_jockey,d.horse_trainer,d.trainer_id,d.jockey_id,p.trackcode,p.track_condition,p.race_num,p.track_name,d.horse_name,d.horse_id \
    from points as p,points_details as d,trainers as t where p.point_id=d.point_id and t.trainer_name=d.horse_trainer and t.trainer_id=${trainerID} and p.result is not null \
    and p.is_na=0 and (CASE WHEN p.track_condition = 'G' THEN d.points_per_good=(select max(points_per_good) from points_details where point_id=d.point_id) \
    WHEN p.track_condition = 'SO' THEN d.points_per_soft=(select max(points_per_soft) from points_details where point_id=d.point_id) \
    WHEN p.track_condition = 'SY' THEN d.points_per_synth=(select max(points_per_synth) from points_details where point_id=d.point_id) \
    WHEN p.track_condition = 'F' THEN d.points_per_firm=(select max(points_per_firm) from points_details where point_id=d.point_id) \
    WHEN p.track_condition = 'H' THEN d.points_per_heavy=(select max(points_per_heavy) from points_details where point_id=d.point_id) \
    ELSE NULL END ) order by meetdate desc ; \
    SELECT COUNT(CASE WHEN p.result is not null then 1 else null end) as ptpRaces,COUNT(CASE WHEN p.result='WON' and d.position=1 THEN 1 ELSE NULL END) as ptpWon, \
    COUNT(CASE WHEN p.result='2ND' and d.position=2 THEN 1 ELSE NULL END) as ptpscnd,COUNT(CASE WHEN p.result='3RD' and d.position=3 THEN 1 ELSE NULL END) as ptpThird,\
    SUM(CASE WHEN p.result = 'WON' AND d.position=1 then d.ub_place \
           WHEN p.result = '2ND' AND d.position=2  then d.ub_place \
           WHEN p.result = '3RD' AND d.position=3  then d.ub_place ELSE NULL END) as totPlace, \
           SUM(CASE WHEN p.result = 'WON' AND d.position=1 then d.ub_win ELSE NULL END) as totWin \
    from points as p,points_details as d,trainers as t where p.point_id=d.point_id and t.trainer_name=d.horse_trainer and t.trainer_id=${trainerID} and p.result is not null \
    and p.is_na=0 and (CASE WHEN p.track_condition = 'G' THEN d.points_per_good=(select max(points_per_good) from points_details where point_id=d.point_id) \
    WHEN p.track_condition = 'SO' THEN d.points_per_soft=(select max(points_per_soft) from points_details where point_id=d.point_id) \
    WHEN p.track_condition = 'SY' THEN d.points_per_synth=(select max(points_per_synth) from points_details where point_id=d.point_id) \
    WHEN p.track_condition = 'F' THEN d.points_per_firm=(select max(points_per_firm) from points_details where point_id=d.point_id) \
    WHEN p.track_condition = 'H' THEN d.points_per_heavy=(select max(points_per_heavy) from points_details where point_id=d.point_id) \
    ELSE NULL END ) order by meetdate desc ; \
    SELECT h.horse_name,j.jockey_name,hd.MEETDATE,hd.PLACE,hd.TRACKCODE,hd.RACENUM,hd.RACENAME from horses as h,jockeys as j,horse_history_details as hd,horse_profile as hp where hd.horse_id=h.horse_id and j.jockey_id=hd.jockey_id and hp.horse_id=hd.horse_id and hp.trainer_id=${trainerID} order by hd.meetdate desc; \
      SELECT h.horse_name,j.jockey_name,hd.MEETDATE,hd.PLACE,hd.TRACKCODE,hd.RACENUM,hd.RACENAME from horses as h,jockeys as j,horse_history_details as hd,horse_profile as hp where hd.horse_id=h.horse_id and j.jockey_id=hd.jockey_id and hp.horse_id=hd.horse_id  and hd.PLACE='1st' and hp.trainer_id=${trainerID} order by hd.meetdate desc ;`;

  connection.query(getTrainerData, function (error, results, fields) {
    if (error) {
      res.status(500).send({
        status: 500,
        message: "Error getting Trainer Profile",
      });
      console.log("Error getting Trainer Profile :" + error);
    } else {
      res.status(200).send({
        status: 200,
        data: {
          bestJockey: results[0],
          bestHorse: results[1],
          careerStats: results[2],
          last12monthStats: results[3],
          trackStats: results[4],
          jockeysStats: results[5],
          trainer: results[6],
          upcomingRaces: results[7],
          ptpRacesDetails: results[8],
          ptpStats: results[9],
          runsDetails: results[10],
          runsWonDetails: results[11],
        },
      });
    }
  });
};

exports.getJockeyInForm = (req, res) => {
  let thisMonth = moment().tz("Australia/Sydney").format("YYYY-MM-01");
  let jockeyInForm = `SELECT d.horse_jockey, COUNT(CASE WHEN d.position=1 THEN 1 ELSE NULL END)AS wins,COUNT(CASE WHEN d.position!=0 AND d.position IS NOT NULL THEN 1 ELSE NULL END)AS runs \
from points_details as d,points as p where p.point_id=d.point_id AND  p.meetdate=CURDATE()  GROUP BY d.horse_jockey ORDER BY WINS DESC limit 1;  \
    SELECT d.horse_jockey, COUNT(CASE WHEN d.position=1 THEN 1 ELSE NULL END)AS wins,COUNT(CASE WHEN d.position!=0 AND d.position IS NOT NULL THEN 1 ELSE NULL END)AS runs \
from points_details as d,points as p where p.point_id=d.point_id and p.track_condition !='ABND' and d.horse_status!='Scratched' and d.horse_status!='LateScratching' AND  p.meetdate<=CURDATE() AND p.meetdate>='${thisMonth}' GROUP BY d.horse_jockey ORDER BY WINS DESC limit 1; \
    SELECT horse_jockey, COUNT(CASE WHEN position=1 THEN 1 ELSE NULL END)AS wins,COUNT(CASE WHEN position!=0 AND position IS NOT NULL THEN 1 ELSE NULL END)AS runs  \
from points_details as d,points as p where p.point_id=d.point_id and p.track_condition !='ABND' and d.horse_status!='Scratched' and d.horse_status!='LateScratching' GROUP BY horse_jockey ORDER BY WINS DESC limit 1;`;
  connection.query(jockeyInForm, function (error, results, fields) {
    if (error) {
      res.status(500).send({
        status: 500,
        message: "Error getting Horse Profile",
      });
      console.log("Error getting Horse Profile :" + error);
    } else {
      res.status(200).send({
        status: 200,
        data: {
          today: results[0],
          thisMonth: results[1],
          alltime: results[2],
        },
      });
    }
  });
};

exports.getAllRacesInVenue = async (req, res) => {
  const { ids, trackName, meetdate } = req.body;
  let getRaces = `Select point_id from points where meetdate='${meetdate}' AND track_name='${trackName}';`;
  await connection
    .promise()
    .query(getRaces)
    .then(async (resp) => {
      var i = 0;
      let data = [];
      while (i < resp[0].length) {
        let getRaceInfo =
          "SELECT point_id, meetdate, track_weather, race_time, race_num, trackcode, track_name, track_condition,\
                                result_status, deadheat_selection_pos, track_description, track_distance, result_flag, selec_resulted,\
                                race_status, result, is_future, is_na, race_result_time, race_closed_time,\
                                (SELECT COUNT(p2.trackcode) FROM points as p2 WHERE p2.trackcode = p.trackcode AND p2.meetdate = p.meetdate) as tot_races,\
                                (select is_clockWise from race_venues where venue_shortName = trackcode ) as isClockwise \
                                FROM points as p\
                                WHERE point_id =" +
          resp[0][i].point_id +
          ";\
                            SELECT tab_no as horse_number, horse_name, horse_weight, horse_jockey, horse_trainer, horse_sf, horse_barrier, horse_silksUrl,\
                                points_per_firm, points_per_good, points_per_soft, points_per_heavy, points_per_synth, horse_id,jockey_id,trainer_id,\
                                horse_status, scr_time, ub_flucs, sb_flucs, sb_open_price, ub_open_price, ub_win, ub_place, sb_win, sb_place, position,\
                                market_mover, lb_mm, if( (SELECT MAX(market_mover) from points_details WHERE point_id =" +
          resp[0][i].point_id +
          "\
                                and horse_status !='Scratched' and horse_status !='Late Scratching' and horse_status is not null) = market_mover \
                                AND (SELECT MAX(market_mover) from points_details WHERE point_id =" +
          resp[0][i].point_id +
          "\
                                and horse_status !='Scratched' and horse_status !='Late Scratching' and horse_status is not null) != 0, 1, 0) as is_market_mover\
                                FROM points_details\
                                WHERE point_id =" +
          resp[0][i].point_id +
          " ORDER by position asc, horse_number asc;\
                            SELECT distinct track_name as venue, trackcode, raceprize FROM points WHERE meetdate = (SELECT meetdate from points where point_id =" +
          resp[0][i].point_id +
          ")\
                                ORDER BY raceprize desc, venue asc;\
                            SELECT generation_time from points_generation_time where point_id=" +
          resp[0][i].point_id +
          " order by generation_time desc;";
        await connection
          .promise()
          .query(getRaceInfo)
          .then((response) => {
            data.push({
              trackInfo: response[0][0],
              horses: response[0][1],
              venues: response[0][2],
              point_id: response[0][0].point_id,
              generationTime: response[0][3],
            });
            i++;
          });
      }
      if (data.length > 0) {
        res.status(200).send({
          status: 200,
          data: data,
        });
      } else {
        res.status(500).send({
          status: 500,
          message: "Error getting venue races",
        });
        console.log("Error getting venue races ");
      }
    });
};

/**
 * LOAD VENUES WITH MAPS.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.loadVenues = async (req, res) => {
  let sql = `select * from race_venues where has_map = 1 order by venue_fullName`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
};

exports.loadSavedRailPos = (req, res) => {
  let data = req.body;
  let venueID = data.venueID;
  refreshSavedRailPos(venueID, res);
};

function refreshSavedRailPos(venueID, res) {
  let sql = `SELECT * FROM venue_rail_pos \
	LEFT OUTER JOIN race_venues on venue_rail_pos.venue_id = race_venues.venue_id \
	WHERE venue_rail_pos.venue_id = ${venueID} \
	ORDER BY vrp_date DESC`;

  connection.query(sql, (err, result) => {
    if (err) throw err;
    let railres = [];
    for (let i in result) {
      let railresobj = {
        id: result[i].id,
        venue_fullName: result[i].venue_fullName,
        venue_id: result[i].venue_id,
        vrp_date: moment(result[i].vrp_date).format("DD-MM-YYYY"),
        rail_pos: result[i].rail_pos,
      };
      railres.push(railresobj);
    }

    res.send(railres);
  });
}

/**
 * list comments for each venue
 * @param req
 * @param res
 */
exports.listVenueComments = (req, res) => {
  const { venueID } = req.body;

  let sql = `select * from venue_comment join race_venues on venue_comment.venue_id = race_venues.venue_id where venue_comment.venue_id = ${venueID} order by distance asc;`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).send({
      venueCmts: result,
    });
  });
};

exports.getResultsBasedOnCondition = (req, res) => {
  const {
    months,
    PTP,
    FAV,
    MM,
    over7,
    noStarts,
    horses,
    jockeys,
    trainers,
    selectedH,
    tracks,
    selectedTracks,
    selectedJ,
    selectedT,
  } = req.body;
  let where = "";
  let ptpTip = "";
  let tracksWhere = "";

  if (trainers == true) {
    if (selectedT.length > 0) {
      let trainer = " AND d.horse_trainer in(";
      for (let i = 0; i < selectedT.length; i++) {
        if (i == 0) {
          trainer += "'" + selectedT[i].replace(/'/g, "''") + "'";
        } else {
          trainer += " , " + "'" + selectedT[i].replace(/'/g, "''") + "'";
        }
      }
      trainer += ") ";
      where += trainer;
      tracksWhere += trainer;
    }
  }

  if (jockeys == true) {
    if (selectedJ.length > 0) {
      let jockey = " AND d.horse_jockey in(";
      for (let i = 0; i < selectedJ.length; i++) {
        if (i == 0) {
          jockey += "'" + selectedJ[i].replace(/'/g, "''") + "'";
        } else {
          jockey += " , " + "'" + selectedJ[i].replace(/'/g, "''") + "'";
        }
      }
      jockey += ") ";
      where += jockey;
      tracksWhere += jockey;
    }
  }

  if (horses == true) {
    if (selectedH.length > 0) {
      let horse = "AND d.horse_name in(";
      for (let i = 0; i < selectedH.length; i++) {
        if (i == 0) {
          horse += "'" + selectedH[i].replace(/'/g, "''") + "'";
        } else {
          horse += " , " + "'" + selectedH[i].replace(/'/g, "''") + "'";
        }
      }
      horse += ") ";
      where += horse;
      tracksWhere += horse;
    }
  }

  if (tracks == true) {
    if (selectedTracks.length > 0) {
      let track = "AND p.track_name in(";
      for (let i = 0; i < selectedTracks.length; i++) {
        if (i == 0) {
          track += "'" + selectedTracks[i].replace(/'/g, "''") + "'";
        } else {
          track += " , " + "'" + selectedTracks[i].replace(/'/g, "''") + "'";
        }
      }
      track += ") ";
      where += track;
      tracksWhere += track;
    }
  }
  if (PTP == true) {
    where += "AND p.result='WON' AND p.is_na !=1";
    ptpTip +=
      "(CASE \
        WHEN p.track_condition = 'G' THEN d.points_per_good\
        WHEN p.track_condition = 'SO' THEN d.points_per_soft\
        WHEN p.track_condition = 'SY' THEN d.points_per_synth\
        WHEN p.track_condition = 'F' THEN d.points_per_firm\
        WHEN p.track_condition = 'H' THEN d.points_per_heavy\
        ELSE d.points_per_good\
    END) AS selec,";
  }
  if (FAV == true) {
    where +=
      " AND d.ub_win=(select min(ub_win) from points_details where point_id=p.point_id)";
  }
  if (MM == true) {
    where +=
      " AND d.market_mover=(select max(market_mover) from points_details where point_id=p.point_id AND market_mover IS NOT NULL  AND market_mover !=0)";
  }
  if (over7 == true) {
    where += " AND d.ub_win>7";
  }
  if (noStarts == true) {
    where += " AND (d.horse_sf is null or d.horse_sf='')";
  }
  let getConditions = `select p.track_name,p.race_num,d.tab_no,p.result,d.horse_name,p.meetdate,p.point_id,d.horse_jockey,\
    ${ptpTip}d.ub_win,d.ub_place,(select count(distinct p.point_id) from points as p ,points_details as d where p.point_id=d.point_id and p.result is not null \
    and p.track_condition !='ABND' and p.is_na !=1 and p.track_condition is not null  and p.result!='N/A'  ${months} ${tracksWhere} ) as ptpRaces ,\
        (select count(distinct p.point_id) from points as p ,points_details as d where p.point_id=d.point_id and p.result is not null \
    and p.track_condition !='ABND' and p.track_condition is not null  ${months} ${tracksWhere}  ) as allRaces,\
        (select count(distinct p.point_id) from points as p WHERE p.result is not null \
    and p.track_condition !='ABND' and p.is_na =0 and p.track_condition is not null  and p.result!='N/A' AND p.result='WON'  ${months} ${tracksWhere}) as ptpWON
    from points as p ,points_details as d where p.point_id=d.point_id and p.result is not null and d.position is not null and d.position='1' ${months} ${where} ${tracksWhere} order by meetdate desc ;`;
  connection.query(getConditions, async function (error, results, fields) {
    if (error) {
      console.log("get results ERROR: " + JSON.stringify(error));
    } else {
      if (results.length == 0) {
        res.status(200).send({
          data: {
            avgWinPercent: null,
            count: null,
            avgWin: null,
            avgPlace: null,
            avgPTP: null,
            data: false,
            details: null,
          },
        });
      } else {
        let count = results.length;
        let win = 0;
        let place = 0;
        let selection = 0;
        for (let i = 0; i < results.length; i++) {
          win += results[i].ub_win;
          place += results[i].ub_place;
          if (PTP == true) {
            selection += results[i].selec;
          }
        }
        if (PTP == true) {
          res.status(200).send({
            data: {
              tot: results[0].ptpRaces,
              count: count,
              avgWinPercent: ((count / results[0].ptpRaces) * 100).toFixed(2),
              avgWin: (win / count).toFixed(2),
              avgPlace: (place / count).toFixed(2),
              avgPTP: (selection / count).toFixed(2),
              data: true,
              details: results,
              ptpWON: results[0].ptpWON,
            },
          });
        } else {
          res.status(200).send({
            data: {
              tot: results[0].allRaces,
              avgWinPercent: ((count / results[0].allRaces) * 100).toFixed(2),
              count: count,
              avgWin: (win / count).toFixed(2),
              avgPlace: (place / count).toFixed(2),
              avgPTP: null,
              data: true,
              details: results,
              ptpWON: null,
            },
          });
        }
      }
    }
  });
};

exports.getTracksonSpeificDate = (req, res) => {
  let getTracks = `select distinct p.track_name from points as p where p.track_condition!='ABND' AND p.meetdate<='${moment()
    .tz("Australia/Sydney")
    .format("YYYY-MM-DD")}'; `;
  connection.query(getTracks, async function (error, results, fields) {
    if (error) {
      console.log("getting tracks error ERROR: " + JSON.stringify(error));
    } else {
      if (results.length == 0) {
        res.status(200).send({
          data: {
            tracks: null,
          },
        });
      } else {
        res.status(200).send({
          data: {
            tracks: results,
          },
        });
      }
    }
  });
};

exports.getHorseAndJockey = (req, res) => {
  const { months, tracks, selectedTracks } = req.body;
  let where = "";
  if (tracks == true) {
    if (selectedTracks.length > 0) {
      let track = "AND p.track_name in(";
      for (let i = 0; i < selectedTracks.length; i++) {
        if (i == 0) {
          track += "'" + selectedTracks[i] + "'";
        } else {
          track += " , " + "'" + selectedTracks[i] + "'";
        }
      }
      track += ") ";
      where += track;
    }
  }
  let getHorsesAndJockey = `select distinct d.horse_name from points as p,points_details as d where p.track_condition!='ABND' AND p.point_id=d.point_id ${months} AND p.result is not null ${where} ;\
                        select distinct d.horse_jockey from points as p,points_details as d where p.track_condition!='ABND'  AND p.point_id=d.point_id ${months}  AND p.result is not null ${where};\
                        select distinct d.horse_trainer from points as p,points_details as d where p.track_condition!='ABND'  AND p.point_id=d.point_id ${months}  AND p.result is not null ${where};`;
  connection.query(getHorsesAndJockey, async function (error, results, fields) {
    if (error) {
      console.log("getting hjt error ERROR: " + JSON.stringify(error));
    } else {
      if (results.length == 0) {
        res.status(200).send({
          data: {
            horses: null,
            jockeys: null,
            trainers: null,
          },
        });
      } else {
        res.status(200).send({
          data: {
            horses: results[0],
            jockeys: results[1],
            trainers: results[2],
          },
        });
      }
    }
  });
};

exports.getHorseJockeyTrainerId = (req, res) => {
  let getData =
    "select * from horses ; \
    select * from jockeys; \
    select * from trainers;";
  connection.query(getData, async function (error, results, fields) {
    if (error) {
      console.log("getting hjt error ERROR: " + JSON.stringify(error));
    } else {
      res.status(200).send({
        status: 200,
        data: {
          horses: results[0],
          jockeys: results[1],
          trainers: results[2],
        },
      });
    }
  });
};

exports.getVenueProfile = (req, res) => {
  const { trackCode } = req.body;
  let getVenueProfileData = ` select (select JSON_ARRAYAGG(JSON_OBJECT('runs',runs,'won',won,'winOdd',winOdd,'place',place,'placeOdd',placeOdd,'meetdate',meetdate,'details',details)) as today
    from  (select p.meetdate,count(distinct(p.point_id))as runs,count(case when position=1 and result='WON' then 1 else null end) as won,
    AVG(CASE WHEN p.result = 'WON' AND d.position=1 then d.ub_win ELSE NULL END) as winOdd ,(COUNT(CASE WHEN result = 'WON' and d.position=1
    then 1 ELSE NULL END) + COUNT(CASE WHEN result = '2ND' and d.position=2 then 1 ELSE NULL END) +
    COUNT(CASE WHEN result = '3RD' and d.position=3 then 1 ELSE NULL END) ) as place,
    AVG(CASE WHEN p.result = 'WON' AND d.position=1 then d.ub_place WHEN p.result = '2ND' AND d.position=2  then d.ub_place
    WHEN p.result = '3RD' AND d.position=3  then d.ub_place ELSE NULL END) as placeOdd ,

    (select JSON_ARRAYAGG(JSON_OBJECT('point_id',point_id,'meetdate',meetdate,'race_time',race_time,'race_num',race_num,'track_name',track_name,'track_description',
     track_description,'track_distance',track_distance,'result',result,'track_condition',track_condition)) as today
     from ( select point_id,meetdate,race_time,race_num,track_name,track_description,track_distance,result,track_condition from points
     where track_condition !='ABND' and trackcode='${trackCode.replace(
    /'/g,
    "''"
  )}' and meetdate=p.meetdate order by meetdate desc,race_num asc)as test) as details
    from points as p,points_details as d where p.point_id=d.point_id and p.trackcode='${trackCode.replace(
    /'/g,
    "''"
  )}'
 and p.is_na=0  and p.track_condition !='ABND' and d.horse_status!='Scratched'  and d.horse_status!='LateScratching'
    AND (CASE WHEN p.track_condition = 'G' THEN d.details_id= (SELECT pd2.details_id FROM points_details as pd2 WHERE pd2.point_id=p.point_id
         AND pd2.horse_status!='Scratched'  and pd2.horse_status!='LateScratching' order by pd2.points_per_good desc LIMIT 1)
                WHEN p.track_condition = 'SO' THEN d.details_id= (SELECT pd2.details_id FROM points_details as pd2 WHERE pd2.point_id=p.point_id AND
                     pd2.horse_status!='Scratched'  and pd2.horse_status!='LateScratching' order by pd2.points_per_soft desc LIMIT 1)
                WHEN p.track_condition = 'SY' THEN d.details_id= (SELECT pd2.details_id FROM points_details as pd2 WHERE pd2.point_id=p.point_id AND
                    pd2.horse_status!='Scratched'  and pd2.horse_status!='LateScratching' order by pd2.points_per_synth desc LIMIT 1)
                WHEN p.track_condition = 'F' THEN d.details_id= (SELECT pd2.details_id FROM points_details as pd2 WHERE pd2.point_id=p.point_id AND
                     pd2.horse_status!='Scratched'  and pd2.horse_status!='LateScratching' order by pd2.points_per_firm desc LIMIT 1)
                WHEN p.track_condition = 'H' THEN d.details_id= (SELECT pd2.details_id FROM points_details as pd2 WHERE pd2.point_id=p.point_id AND
                    pd2.horse_status!='Scratched'  and pd2.horse_status!='LateScratching' order by pd2.points_per_heavy desc LIMIT 1)
                ELSE d.details_id= (SELECT pd2.details_id FROM points_details as pd2 WHERE pd2.point_id=p.point_id AND pd2.horse_status!='Scratched'
                and pd2.horse_status!='LateScratching' order by pd2.points_per_good desc LIMIT 1)  END ) and p.result_flag!=0 group by meetdate order by meetdate desc ) as data )as data,

                /* best performing jockey*/

                (select JSON_ARRAYAGG(JSON_OBJECT('jockey_id' , jockey_id ,'horse_jockey',horse_jockey,'runs',runs,'won',won,'winOdd',winOdd,'place',place,'placeOdd',placeOdd)) as today
                from  (select horse_jockey,count(p.point_id) as runs,count(case when position=1  then 1 else null end) as won,
                AVG(CASE WHEN d.position=1 then d.ub_win ELSE NULL END) as winOdd ,(COUNT(CASE WHEN d.position=1
                then 1 ELSE NULL END) + COUNT(CASE WHEN d.position=2 then 1 ELSE NULL END) +
                COUNT(CASE WHEN  d.position=3 then 1 ELSE NULL END) ) as place,jockey_id,
                AVG(CASE WHEN d.position=1 then d.ub_place WHEN d.position=2  then d.ub_place
                WHEN d.position=3  then d.ub_place ELSE NULL END) as placeOdd
                from points as p,points_details as d where p.point_id=d.point_id  and p.track_condition !='ABND' and d.horse_status!='Scratched'
                and d.horse_status!='LateScratching' and p.result_flag!=0 and p.trackcode='${trackCode.replace(
    /'/g,
    "''"
  )}'  group by horse_jockey order by won desc limit 10 ) as t) as best_performing_jockey,

                    /*best performing horse*/

                (select JSON_ARRAYAGG(JSON_OBJECT('horse_id',horse_id,'horse_name',horse_name,'runs',runs,'won',won,'winOdd',winOdd,'place',place,'placeOdd',placeOdd)) as today
                from (select horse_name,count(p.point_id) as runs,count(case when position=1  then 1 else null end) as won,
                AVG(CASE WHEN d.position=1 then d.ub_win ELSE NULL END) as winOdd ,(COUNT(CASE WHEN d.position=1
                then 1 ELSE NULL END) + COUNT(CASE WHEN d.position=2 then 1 ELSE NULL END) +
                COUNT(CASE WHEN  d.position=3 then 1 ELSE NULL END) ) as place,horse_id,
                AVG(CASE WHEN d.position=1 then d.ub_place WHEN d.position=2  then d.ub_place
                WHEN d.position=3  then d.ub_place ELSE NULL END) as placeOdd
                from points as p,points_details as d where p.point_id=d.point_id  and p.track_condition !='ABND' and d.horse_status!='Scratched'
                and d.horse_status!='LateScratching' and p.result_flag!=0 and p.trackcode='${trackCode.replace(
    /'/g,
    "''"
  )}'  group by horse_name order by won desc limit 10 ) as t) as best_performing_horse,

                /* venue info*/
                (select JSON_OBJECT('venue_fullName',venue_fullName,
                'venue_clubname',venue_clubname,'venue_location',venue_location,'venue_map_link',venue_map_link,'venue_contact_phone',venue_contact_phone,'venue_state',venue_state,
                'venue_contact_mobile',venue_contact_mobile,'venue_contact_fax',venue_contact_fax,'venue_contact_website',venue_contact_website,'is_clockWise',is_clockWise,'has_map',has_map) as today
                from  (select venue_fullName,venue_clubname,venue_location,venue_map_link,venue_contact_phone,venue_contact_mobile,venue_contact_fax,venue_contact_website,venue_state,is_clockWise,has_map
                from race_venues  where venue_shortName='${trackCode.replace(
    /'/g,
    "''"
  )}'  limit 1 ) as t) as venue_info,

                    /*venue history stats*/
                (select JSON_OBJECT('runs',runs,'won',won,'place',place,'avg_win_odd',avg_win_odd) as today
                from  (SELECT runs,won,place,avg_win_odd from race_venues where venue_shortName='${trackCode.replace(
    /'/g,
    "''"
  )}' limit 1 ) as t) as venue_ptp_history,

                /*upcoming races*/

            (select JSON_ARRAYAGG( JSON_OBJECT('meetdate',meetdate,'point_id',point_id,'race_time',race_time,'race_num',race_num,'track_name',track_name,'track_condition',track_condition
            ,'track_description',track_description,'track_distance',track_distance))as t
            from(select meetdate,point_id,race_time,race_num,track_name,track_condition,track_description,track_distance
            from points where  result_flag=0 and track_condition !='ABND' and meetdate>= curdate()  and trackcode='${trackCode.replace(
    /'/g,
    "''"
  )}' order by meetdate desc
            ) as t3)as upcoming_races ,

            /*venue_comment*/
            (select JSON_ARRAYAGG(JSON_OBJECT('first_turn',first_turn,'race_comment',race_comment,'distance',distance))as t
            from (select first_turn,race_comment,distance from  venue_comment as vc ,race_venues as rv where rv.venue_id=vc.venue_id and rv.venue_shortName='${trackCode.replace(
    /'/g,
    "''"
  )}' )as venue_comment
            )as venue_comment ,

            /*venue rail pos*/
            (select JSON_ARRAYAGG(JSON_OBJECT('vrp_date',vrp_date,'rail_pos',rail_pos))as t
            from (select vrp_date,rail_pos from  venue_rail_pos as vrp ,race_venues as rv where rv.venue_id=vrp.venue_id and rv.venue_shortName='${trackCode.replace(
    /'/g,
    "''"
  )}' )as venue_comment
            )as venue_rail_position ; `;
  connection.query(getVenueProfileData, async function (error, results) {
    if (error) {
      console.log("getting venue profile ERROR: " + JSON.stringify(error));
    } else {
      res.send({
        status: 200,
        data: results[0],
      });
    }
  });
};

exports.bestPerformingHorse = (req, res) => {
  const { type, date, user, limit } = req.body;
  let getData;
  if (type === "ptp") {
    getData = `select (select JSON_ARRAYAGG(JSON_OBJECT('${userAssign(
      user
    )}',${userAssign(
      user
    )},'runs',runs,'won',won,'winOdd',winOdd,'place',place,'placeOdd',placeOdd,'t',t)) as today
from  (select ${userAssign(
      user
    )},count(p.point_id) as runs,count(case when position=1 AND p.result='WON'  then 1 else null end) as won,
AVG(CASE WHEN d.position=1  AND p.result='WON' then d.ub_win ELSE NULL END) as winOdd ,(COUNT(CASE WHEN d.position=1   AND p.result='WON'
then 1 ELSE NULL END) + COUNT(CASE WHEN d.position=2  AND p.result='2ND' then 1 ELSE NULL END) +
COUNT(CASE WHEN  d.position=3  AND p.result='3RD' then 1 ELSE NULL END) ) as place,
AVG(CASE WHEN d.position=1  AND p.result='WON' then d.ub_place WHEN d.position=2  AND p.result='2ND'  then d.ub_place
WHEN d.position=3  AND p.result='3RD' then d.ub_place ELSE NULL END) as placeOdd ,
((count(case when position=1 AND p.result='WON'  then 1 else null end)/count(p.point_id))*100)as t
from points as p,points_details as d where p.point_id=d.point_id  and p.track_condition !='ABND' and d.horse_status!='Scratched'
        and d.horse_status!='LateScratching' ${dateQuerry(
      date
    )} and p.result_flag!=0 and p.is_na =0  group by ${userAssign(
      user
    )} ${orderBy(date, user)} limit ${limitAssign(limit)}) as t) as horse;`;
  } else {
    getData = `select (select JSON_ARRAYAGG(JSON_OBJECT('${userAssign(
      user
    )}',${userAssign(
      user
    )},'runs',runs,'won',won,'winOdd',winOdd,'place',place,'placeOdd',placeOdd,'t',t)) as today
from  (select ${userAssign(
      user
    )},count(p.point_id) as runs,count(case when position=1  then 1 else null end) as won,
AVG(CASE WHEN d.position=1 then d.ub_win ELSE NULL END) as winOdd ,(COUNT(CASE WHEN d.position=1
then 1 ELSE NULL END) + COUNT(CASE WHEN d.position=2 then 1 ELSE NULL END) +
COUNT(CASE WHEN  d.position=3 then 1 ELSE NULL END) ) as place,
AVG(CASE WHEN d.position=1 then d.ub_place WHEN d.position=2  then d.ub_place
WHEN d.position=3  then d.ub_place ELSE NULL END) as placeOdd ,
((count(case when position=1 then 1 else null end)/count(p.point_id))*100)as t
from points as p,points_details as d where p.point_id=d.point_id  and p.track_condition !='ABND' and d.horse_status!='Scratched'
        and d.horse_status!='LateScratching'${dateQuerry(
      date
    )} and p.result_flag!=0  group by ${userAssign(user)} ${orderBy(
      date,
      user
    )} limit ${limitAssign(limit)}}) as t) as horse;`;
  }
  connection.query(getData, async function (error, results) {
    if (error) {
      console.log("getting top runners Error: " + JSON.stringify(error));
    } else {
      res.send({
        status: 200,
        data: results[0],
      });
    }
  });
};

const dateQuerry = (type) => {
  if (type === "today") {
    return "AND  p.meetdate=CURDATE()";
  } else if (type === "yesterday") {
    let yesterday = moment()
      .tz("Australia/Sydney")
      .subtract(1, "day")
      .format("YYYY-MM-DD");
    return ` AND  p.meetdate<=CURDATE() AND p.meetdate>='${yesterday}' `;
  } else if (type === "last7") {
    let last7 = moment()
      .tz("Australia/Sydney")
      .subtract(7, "day")
      .format("YYYY-MM-DD");
    return ` AND  p.meetdate<=CURDATE() AND p.meetdate>='${last7}' `;
  } else if (type === "last30") {
    let thisMonth = moment()
      .tz("Australia/Sydney")
      .subtract(1, "month")
      .format("YYYY-MM-DD");
    return ` AND  p.meetdate<=CURDATE() AND p.meetdate>='${thisMonth}' `;
  } else if (type === "month6") {
    let month6 = moment()
      .tz("Australia/Sydney")
      .subtract(6, "month")
      .format("YYYY-MM-DD");
    return ` AND p.meetdate>='${month6}' `;
  }
};

const orderBy = (date, user) => {
  let orderBy;
  if (user === "horse") {
    if (date === "today") {
      orderBy = "order by won desc, winOdd desc";
    } else {
      orderBy = "order by t desc";
    }
  } else {
    orderBy = "order by t desc";
  }
  return orderBy;
};

const userAssign = (user) => {
  if (user === "horse") {
    return "horse_name";
  } else {
    return "horse_jockey";
  }
};
const limitAssign = (limit) => {
  if (limit === "regular") {
    return "5";
  } else {
    return "100";
  }
};
(exports.bestPerformance = (req, res) => {
  const { type, date, user, limit } = req.body;
  let getData;
  if (type === "ptp") {
    getData = `select (select JSON_ARRAYAGG(JSON_OBJECT('${userAssign(
      user
    )}',${userAssign(
      user
    )},'runs',runs,'won',won,'winOdd',winOdd,'place',place,'placeOdd',placeOdd,'t',t)) as today
            from  (select ${userAssign(
      user
    )},count(p.point_id) as runs,count(case when position=1 AND p.result='WON'  then 1 else null end) as won,
            AVG(CASE WHEN d.position=1  AND p.result='WON' then d.ub_win ELSE NULL END) as winOdd ,(COUNT(CASE WHEN d.position=1   AND p.result='WON'
            then 1 ELSE NULL END) + COUNT(CASE WHEN d.position=2  AND p.result='2ND' then 1 ELSE NULL END) +
            COUNT(CASE WHEN  d.position=3  AND p.result='3RD' then 1 ELSE NULL END) ) as place,
            AVG(CASE WHEN d.position=1  AND p.result='WON' then d.ub_place WHEN d.position=2  AND p.result='2ND'  then d.ub_place
            WHEN d.position=3  AND p.result='3RD' then d.ub_place ELSE NULL END) as placeOdd ,
            ((count(case when position=1 AND p.result='WON'  then 1 else null end)/count(p.point_id))*100)as t
            from points as p,points_details as d where p.point_id=d.point_id  and p.track_condition !='ABND' and d.horse_status!='Scratched'
            and d.horse_status!='LateScratching' ${dateQuerry(
      date
    )} and p.result_flag!=0 and p.is_na =0  group by ${userAssign(
      user
    )} ${orderBy(date, user)} limit ${limitAssign(limit)}) as t) as data;`;
  } else {
    getData = `select (select JSON_ARRAYAGG(JSON_OBJECT('${userAssign(
      user
    )}',${userAssign(
      user
    )},'runs',runs,'won',won,'winOdd',winOdd,'place',place,'placeOdd',placeOdd,'t',t)) as today
            from  (select ${userAssign(
      user
    )},count(p.point_id) as runs,count(case when position=1  then 1 else null end) as won,
            AVG(CASE WHEN d.position=1 then d.ub_win ELSE NULL END) as winOdd ,(COUNT(CASE WHEN d.position=1
            then 1 ELSE NULL END) + COUNT(CASE WHEN d.position=2 then 1 ELSE NULL END) +
            COUNT(CASE WHEN  d.position=3 then 1 ELSE NULL END) ) as place,
            AVG(CASE WHEN d.position=1 then d.ub_place WHEN d.position=2  then d.ub_place
            WHEN d.position=3  then d.ub_place ELSE NULL END) as placeOdd ,
            ((count(case when position=1 then 1 else null end)/count(p.point_id))*100)as t
            from points as p,points_details as d where p.point_id=d.point_id  and p.track_condition !='ABND' and d.horse_status!='Scratched'
            and d.horse_status!='LateScratching'${dateQuerry(
      date
    )} and p.result_flag!=0  group by ${userAssign(user)} ${orderBy(
      date,
      user
    )} limit ${limitAssign(limit)}) as t) as data;`;
  }
  connection.query(getData, async function (error, results) {
    if (error) {
      console.log("getting top runners Error: " + JSON.stringify(error));
    } else {
      res.send({
        status: 200,
        data: results[0],
      });
    }
  });
}),
  (exports.bestPerformingVenue = (req, res) => {
    const { date, limit } = req.body;

    let getData = `select (select JSON_ARRAYAGG(JSON_OBJECT('track_name',track_name,'runs',runs,'won',won,'winOdd',winOdd,'place',place,'placeOdd',placeOdd,'t',t)) as today
    from  (select track_name,count(distinct(p.point_id))as runs,count(case when position=1 and result='WON' then 1 else null end) as won,
    AVG(CASE WHEN p.result = 'WON' AND d.position=1 then d.ub_win ELSE NULL END) as winOdd ,(COUNT(CASE WHEN result = 'WON' and d.position=1
    then 1 ELSE NULL END) + COUNT(CASE WHEN result = '2ND' and d.position=2 then 1 ELSE NULL END) +
    COUNT(CASE WHEN result = '3RD' and d.position=3 then 1 ELSE NULL END) ) as place,
    AVG(CASE WHEN p.result = 'WON' AND d.position=1 then d.ub_place WHEN p.result = '2ND' AND d.position=2  then d.ub_place
    WHEN p.result = '3RD' AND d.position=3  then d.ub_place ELSE NULL END) as placeOdd ,
    ((count(case when position=1 and result='WON' then 1 else null end)/count(distinct(p.point_id)))*100)as t
    from points as p,points_details as d where p.point_id=d.point_id
    ${dateQuerry(
      date
    )} and p.is_na=0  and p.track_condition !='ABND' and d.horse_status!='Scratched'  and d.horse_status!='LateScratching'
    AND (CASE WHEN p.track_condition = 'G' THEN d.details_id= (SELECT pd2.details_id FROM points_details as pd2 WHERE pd2.point_id=p.point_id
         AND pd2.horse_status!='Scratched'  and pd2.horse_status!='LateScratching' order by pd2.points_per_good desc LIMIT 1)
                WHEN p.track_condition = 'SO' THEN d.details_id= (SELECT pd2.details_id FROM points_details as pd2 WHERE pd2.point_id=p.point_id AND
                     pd2.horse_status!='Scratched'  and pd2.horse_status!='LateScratching' order by pd2.points_per_soft desc LIMIT 1)
                WHEN p.track_condition = 'SY' THEN d.details_id= (SELECT pd2.details_id FROM points_details as pd2 WHERE pd2.point_id=p.point_id AND
                    pd2.horse_status!='Scratched'  and pd2.horse_status!='LateScratching' order by pd2.points_per_synth desc LIMIT 1)
                WHEN p.track_condition = 'F' THEN d.details_id= (SELECT pd2.details_id FROM points_details as pd2 WHERE pd2.point_id=p.point_id AND
                     pd2.horse_status!='Scratched'  and pd2.horse_status!='LateScratching' order by pd2.points_per_firm desc LIMIT 1)
                WHEN p.track_condition = 'H' THEN d.details_id= (SELECT pd2.details_id FROM points_details as pd2 WHERE pd2.point_id=p.point_id AND
                    pd2.horse_status!='Scratched'  and pd2.horse_status!='LateScratching' order by pd2.points_per_heavy desc LIMIT 1)
                ELSE d.details_id= (SELECT pd2.details_id FROM points_details as pd2 WHERE pd2.point_id=p.point_id AND pd2.horse_status!='Scratched'
                and pd2.horse_status!='LateScratching' order by pd2.points_per_good desc LIMIT 1)  END ) and p.result_flag!=0 group by track_name
                order by t desc limit ${limitAssign(limit)}) as t) as data;`;
    connection.query(getData, async function (error, results) {
      if (error) {
        console.log("getting top runners Error: " + JSON.stringify(error));
      } else {
        res.send({
          status: 200,
          data: results[0],
        });
      }
    });
  });

exports.searching = (req, res) => {
  var value = req.query.value.toLowerCase();
  var splited = value.split(" ");
  var joined = splited.join("|");
  var final = value + "|" + joined;
  // console.log(final.toLowerCase())

  let searchQuery =
    "SELECT horse_id, horse_name\
                            FROM horses\
                            WHERE LOWER(horse_name) REGEXP '" +
    final +
    "'\
                            AND horse_name != 'Unknown'\
                            ORDER BY (LOWER(horse_name) like '%" +
    value +
    "%') desc, length(horse_name) desc\
                            LIMIT 5;\
                        SELECT jockey_id, real_jockey_name as jockey_name\
                            FROM jockeys\
                            WHERE LOWER(real_jockey_name) REGEXP '" +
    final +
    "'\
                            AND real_jockey_name != 'Unknown'\
                            ORDER BY (LOWER(real_jockey_name) like '%" +
    value +
    "%') desc, length(real_jockey_name) desc\
                            LIMIT 3;\
                        SELECT venue_shortName, venue_fullName\
                            FROM race_venues\
                            WHERE LOWER(venue_fullName) REGEXP '" +
    final +
    "'\
                            AND LOWER(venue_fullName) not like '%?%' \
                            ORDER BY (LOWER(venue_fullName) like '%" +
    value +
    "%') desc, venue_fullName asc\
                            LIMIT 3;\
                        SELECT meetdate, track_name, point_id\
                            FROM points\
                            WHERE LOWER(track_name) REGEXP '" +
    final +
    "'\
                            AND race_num = 1 \
                            AND meetdate >='2020-06-10' \
                            ORDER BY LOWER(track_name) asc, meetdate desc, length(track_description) desc\
                            LIMIT 3;";
  //SELECT meetdate, track_name, track_description, race_num, point_id\
  //    FROM points\
  //    WHERE LOWER(track_description) REGEXP '"+ final + "'\
  //    AND meetdate >='2020-06-10' \
  //    ORDER BY (LOWER(track_description) like '%"+ value + "%') desc, meetdate desc, length(track_description) desc\
  //    LIMIT 3;"

  connection.query(searchQuery, function (error, results) {
    if (error) {
      console.log("getting top runners Error: " + JSON.stringify(error));
      res.send({
        status: 200,
        data: "",
      });
    } else {
      let horses = [];
      results[0].map((zone) => {
        horses.push({
          key: `/profile/horse/${zone.horse_id}/${zone.horse_name
            .split(" ")
            .join("-")}`,
          title: zone.horse_name,
          route: `/profile/horse/${zone.horse_id}/${zone.horse_name
            .split(" ")
            .join("-")}`,
        });
      });

      let jockey = [];
      results[1].map((zone) => {
        jockey.push({
          key: `/profile/jockey/${zone.jockey_id}/${zone.jockey_name
            .split(" ")
            .join("-")}`,
          title: zone.jockey_name,
          route: `/profile/jockey/${zone.jockey_id}/${zone.jockey_name
            .split(" ")
            .join("-")}`,
        });
      });

      let venue = [];
      results[2].map((zone) => {
        venue.push({
          key: `/profile/venue/${zone.venue_shortName.toLowerCase()}`,
          title: zone.venue_fullName,
          route: `/profile/venue/${zone.venue_shortName.toLowerCase()}`,
        });
      });

      let race = [];
      results[3].map((zone) => {
        race.push({
          key: `/horse-racing-tips/${moment(zone.meetdate).format(
            "DD-MM-YYYY"
          )}/${zone.track_name}/R1/${zone.point_id}`,
          title: `${zone.track_name}  ${moment(zone.meetdate).format(
            "dddd, MMMM D, YYYY"
          )}`,
          route: `/horse-racing-tips/${moment(zone.meetdate).format(
            "DD-MM-YYYY"
          )}/${zone.track_name}/R1/${zone.point_id}`,
        });
      });

      let final = {};
      if (horses.length > 0) {
        final["horse"] = {
          name: "horse",
          results: horses,
        };
      }
      if (jockey.length > 0) {
        final["Jockey"] = {
          name: "Jockey",
          results: jockey,
        };
      }
      if (venue.length > 0) {
        final["Venue"] = {
          name: "Venue",
          results: venue,
        };
      }
      if (race.length > 0) {
        final["Race"] = {
          name: "Race",
          results: race,
        };
      }
      res.send({
        status: 200,
        data: final,
      });
    }
  });
};

// ADD TO BLACKBOOK
exports.addBlackBook = (req, res) => {
  const { horse_id, client_id, notes } = req.body;
  //console.log(req)
  let time = moment().tz("Australia/Sydney").format("YYYY-MM-DD HH:mm:ss");

  let addBK = `INSERT INTO blackbook(client_id, horse_id, notes, created_at)\
                    VALUES(${client_id},${horse_id},${JSON.stringify(
    notes
  )},${JSON.stringify(time)});`;
  connection.query(addBK, function (error, results) {
    if (error) {
      console.log("Add to blackbook error: " + JSON.stringify(error));

      res.send({
        status: 300,
        message: "Already added.",
      });
    } else {
      res.send({
        status: 200,
        message: "Added Successfully.",
      });
    }
  });
};

// ADD TO BLACKBOOK JOVKEY
exports.addBlackBookJockey = (req, res) => {
  const { jockey_id, client_id, notes } = req.body;
  //console.log(req)
  let time = moment().tz("Australia/Sydney").format("YYYY-MM-DD HH:mm:ss");

  let addBKJ = `INSERT INTO blackbook_jockey(client_id, jockey_id, notes, created_at)\
                    VALUES(${client_id},${jockey_id},${JSON.stringify(
    notes
  )},${JSON.stringify(time)});`;
  connection.query(addBKJ, function (error, results) {
    if (error) {
      console.log("Add to blackbook error: " + JSON.stringify(error));

      res.send({
        status: 300,
        message: "Already added.",
      });
    } else {
      res.send({
        status: 200,
        message: "Added Successfully.",
      });
    }
  });
};

// DELETE FROM BLACKBOOK
exports.deleteBlackBook = (req, res) => {
  const { horse_id, client_id } = req.body;

  let deleteBK =
    "DELETE FROM blackbook WHERE client_id =" +
    client_id +
    " AND horse_id = " +
    horse_id +
    ";";
  connection.query(deleteBK, function (error, results) {
    if (error) {
      console.log("Delete from blackbook error: " + JSON.stringify(error));
      res.send({
        status: 300,
        message: "Server Error. Please try again",
      });
    } else {
      res.send({
        status: 200,
        message: "Deleted Successfully",
      });
    }
  });
};

// DELETE FROM JOCKEY BLACKBOOK
exports.deleteJockeyBlackBook = (req, res) => {
  const { jockey_id, client_id } = req.body;

  let deleteJBK =
    "DELETE FROM blackbook_jockey WHERE client_id =" +
    client_id +
    " AND jockey_id = " +
    jockey_id +
    ";";
  connection.query(deleteJBK, function (error, results) {
    if (error) {
      console.log(
        "Delete Jockey from blackbook error: " + JSON.stringify(error)
      );
      res.send({
        status: 300,
        message: "Server Error. Please try again",
      });
    } else {
      res.send({
        status: 200,
        message: "Deleted Successfully",
      });
    }
  });
};

// GET MY BLACKBOOK
exports.getBlackBook = (req, res) => {
  const { client_id } = req.body;

  let getBK = `SELECT * from blackbook as bk
                    JOIN horses as h ON h.horse_id = bk.horse_id
                    JOIN horse_profile as hp ON hp.horse_id = bk.horse_id
                    WHERE bk.client_id = ${client_id}
                    ORDER BY created_at DESC;
                SELECT * from blackbook_jockey as bkj
                    JOIN jockeys as j ON j.jockey_id = bkj.jockey_id
                    WHERE bkj.client_id = ${client_id}
                    ORDER BY bkj.created_at DESC;`;

  connection.query(getBK, function (error, results) {
    if (error) {
      console.log("get from blackbook error: " + JSON.stringify(error));
      res.send({
        status: 300,
        message: "Server Error. Please try again",
      });
    } else {
      res.status(200).send({
        status: 200,
        data: results,
      });
    }
  });
};

exports.getVenuesSummary = (req, res) => {
  const { date } = req.body;
  // let GetRaceAnalytics = ` select
  // (select json_arrayagg(json_object('tname',tname,'tc',tc,'venuesPerformance',venuesPerformance,'venue_history',venue_history))
  // from ( select distinct(track_name) as tname, (trackcode) as tc,
  // (select JSON_OBJECT('win',win,'place',place,'avg_win_odds',avg_win_odds,'avg_place_odds',avg_place_odds,'runs',runs) as t
  //     from (SELECT
  //   COUNT(CASE WHEN result = 'WON' then 1 ELSE NULL END) as win,
  //    (COUNT(CASE WHEN result = 'WON' then 1 ELSE NULL END) +
  //    COUNT(CASE WHEN result = '2ND' then 1 ELSE NULL END) +
  //    COUNT(CASE WHEN result = '3RD' then 1 ELSE NULL END) ) as place,
  //    FORMAT(AVG(CASE WHEN result = 'WON' then d.ub_win ELSE NULL END),2) as avg_win_odds,
  //    FORMAT(AVG(CASE WHEN result = 'WON' then d.ub_place WHEN result = '2ND' then d.ub_place WHEN result = '3RD' then d.ub_place ELSE NULL END),2)
  //    as avg_place_odds,
  //    COUNT(CASE WHEN result = 'WON' then 1
  //                WHEN result = '2ND' then 1
  //                WHEN result = '3RD' then 1
  //                WHEN result = 'LOST' then 1
  //                END) as runs
  //     FROM points as p ,points_details as d
  //     WHERE result IS NOT NULL AND is_na!=1  AND track_condition !='ABND' and d.horse_status!='Scratched'  and d.horse_status!='LateScratching'
  //     AND meetdate='${date}' AND trackcode=tc
  //     AND p.point_id=d.point_id AND (Case when result='WON' then d.position=1
  //     when result='2ND' then d.position=2 when result='3RD' then d.position=3 else d.position=1 end)
  //     ) as venuesPerformance ) as venuesPerformance ,
  //     (select JSON_OBJECT('runs',runs,'won',won,'place',place,'avg_win_odd',avg_win_odd) as t
  //     from (select runs,won,place,avg_win_odd from race_venues where venue_shortName=tc limit 1 ) as venue_history)as venue_history
  //     from  points as pt1 where meetdate='${date}' group by tname,tc  order by ( JSON_EXTRACT(venuesPerformance,'$."win"')/ JSON_EXTRACT(venuesPerformance,'$."runs"')) desc
  //         )as v) as venues ;`

  let GetRaceAnalytics = `
            select
    (select json_arrayagg(json_object('tname',tname,'tc',tc,'venuesPerformance',venuesPerformance,'venue_history',venue_history))
    from ( select distinct(track_name) as tname, (trackcode) as tc,

   (select json_arrayagg(json_object('position', position , 'result' , result , 'ub_win' , ub_win , 'ub_place' , ub_place , 'percentage' , percentage, 'race_number' ,race_num ))
   from (select pd1.position , p1.result , pd1.ub_win , pd1.ub_place ,p1.race_num,
   (CASE WHEN p1.track_condition = 'G' THEN pd1.points_per_good
         WHEN p1.track_condition = 'SO' THEN pd1.points_per_soft
         WHEN p1.track_condition = 'SY' THEN pd1.points_per_synth
         WHEN p1.track_condition = 'F' THEN pd1.points_per_firm
         WHEN p1.track_condition = 'H' THEN pd1.points_per_heavy
         ELSE pd1.points_per_good
         END) as percentage
   from points as p1 left join points_details as pd1 on p1.point_id = pd1.point_id where p1.track_name=tname and p1.trackcode= tc
   and p1.meetdate = '${date}' and p1.result IS NOT NULL AND p1.is_na!=1  AND p1.track_condition !='ABND' and pd1.horse_status!='Scratched'  and pd1.horse_status!='LateScratching'
   and (CASE WHEN p1.track_condition = 'G' THEN pd1.points_per_good
   WHEN p1.track_condition = 'SO' THEN pd1.points_per_soft
   WHEN p1.track_condition = 'SY' THEN pd1.points_per_synth
   WHEN p1.track_condition = 'F' THEN pd1.points_per_firm
   WHEN p1.track_condition = 'H' THEN pd1.points_per_heavy
   ELSE pd1.points_per_good
   END)= (CASE WHEN p1.track_condition = 'G' THEN (select (pd3.points_per_good) from points_details as pd3 where pd3.point_id=p1.point_id order by pd3.points_per_good desc limit 1)
   WHEN p1.track_condition = 'SO' THEN (select max(pd3.points_per_soft) from points_details as pd3 where pd3.point_id=p1.point_id order by pd3.points_per_soft desc limit 1)
   WHEN p1.track_condition = 'SY' THEN(select max(pd3.points_per_synth) from points_details as pd3 where pd3.point_id=p1.point_id order by pd3.points_per_synth desc limit 1)
   WHEN p1.track_condition = 'F' THEN (select max(pd3.points_per_firm) from points_details as pd3 where pd3.point_id=p1.point_id order by pd3.points_per_firm desc limit 1)
   WHEN p1.track_condition = 'H' THEN(select max(pd3.points_per_heavy) from points_details as pd3 where pd3.point_id=p1.point_id order by pd3.points_per_heavy desc limit 1)
   ELSE (select max(pd3.points_per_good) from points_details as pd3 where pd3.point_id=p1.point_id order by pd3.points_per_good desc limit 1)
   END)
   order by (CASE WHEN p1.track_condition = 'G' THEN pd1.points_per_good
         WHEN p1.track_condition = 'SO' THEN pd1.points_per_soft
         WHEN p1.track_condition = 'SY' THEN pd1.points_per_synth
         WHEN p1.track_condition = 'F' THEN pd1.points_per_firm
         WHEN p1.track_condition = 'H' THEN pd1.points_per_heavy
         ELSE pd1.points_per_good
         END)DESC
   )as t) as venuesPerformance,

        (select JSON_OBJECT('runs',runs,'won',won,'place',place,'avg_win_odd',avg_win_odd) as t
        from (select runs,won,place,avg_win_odd from race_venues where venue_shortName=tc limit 1 ) as venue_history)as venue_history
        from  points as pt1 where meetdate='${date}' group by tname,tc  order by ( JSON_EXTRACT(venuesPerformance,'$."win"')/ JSON_EXTRACT(venuesPerformance,'$."runs"')) desc
            )as v) as venues ;
            `;

  connection.query(GetRaceAnalytics, function (error, results, fields) {
    if (error) {
      res.status(500).send({
        status: 500,
        message: "Error Race analytics",
      });
      console.log("Error getting Race analytics:" + error);
    } else {
      if (results.length > 0) {
        let venues = [];
        if (results[0].venues.length > 0) {
          results[0].venues.map((zone, i) => {
            if (
              zone.venuesPerformance !== null &&
              zone.venuesPerformance.length > 0
            ) {
              let runs = 0;
              let last_race = 0;
              let win = 0;
              let place = 0;
              let winOdd = 0;
              let plcOdd = 0;
              zone.venuesPerformance?.map((zone1) => {
                if (zone1.race_number !== last_race) {
                  runs++;
                  last_race = zone1.race_number;
                  if (zone1.result !== "LOST") {
                    if (zone1.result === "WON") {
                      win++;
                      place++;
                      winOdd += zone1.ub_win;
                      plcOdd += zone1.ub_place;
                    } else {
                      place++;
                      plcOdd += zone1.ub_place;
                    }
                  }
                }
              });
              let venuesPerformance = {
                win: win,
                place: place,
                runs: runs,
                avg_win_odds: (winOdd / win).toFixed(2),
                avg_place_odds: (plcOdd / place).toFixed(2),
              };
              venues.push({
                tc: zone.tc,
                tname: zone.tname,
                venue_history: zone.venue_history,
                venuesPerformance: venuesPerformance,
              });
            }
          });
        }
        res.status(200).send({
          status: 200,
          data: { venues: venues },
        });
      } else {
        res.status(200).send({
          status: 500,
          data: null,
        });
      }
    }
  });
};

exports.getRaces =  (req, res) => {
  //let raceData = `SELECT * FROM race WHERE race_date IN (CURDATE(), CURDATE() - INTERVAL 1 DAY) AND is_deleted = 0`;
  let raceData ='select * from racecalc_cust_db.race where is_gold = 1 AND race_date >= CURDATE()';
  connectionsecond.query(raceData, function (error, results, fields) {
    if (error) {
      res.status(500).send({
        status: 500,
        message: "Error Race analytics",
      });
      console.log("Error getting Race analytics:" + error);
    } else {
      if (results.length > 0) {
        
        res.status(200).send(results);
      } else {
        res.status(200).send({
          status: 200,
          data: null,
        });
      }
    }
  });
};


