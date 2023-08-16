var connection = require('../../config/database.config.js');
var onNowUsers = [];

exports.userInactive = (socketID, ip, timing) => {
  // console.log(socketID)
  // console.log("ip " + ip)
  console.log("Innnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnactive " + socketID)
  // if (ip === '::1' || ip === 'localhost' || ip === '::ffff:127.0.0.1' || ip === undefined) {
  // console.log('LOCALHOST INACTIVE sicketId= ' + socketID)
  // let updateUserInactive = "UPDATE client_online2 SET active =0 and connected='disconnect' and disconnect_time='" + timing + "'  WHERE socketId='" + socketID + "';"
  // let updateUserInactive = "UPDATE client_online2 SET active =0, pathName=JSON_ARRAY_APPEND(pathName, '$', '" + path + "' )  WHERE socketId='" + socketID + "';"

  let updateUserInactive = "UPDATE client_online2 SET active =0  WHERE socketId='" + socketID + "';"

  connection.query(updateUserInactive, function (error, results, fields) {
    if (error) {
      console.log("Socket UserInactive error: " + error);
    } else {
      console.log('Socket update user inactive ' + updateUserInactive)
    }
  })
  // } else {
  //   let updateUserInactive = "UPDATE client_online SET active = 0  and connected='disconnect'  and disconnect_time='" + timing + "' WHERE socketId='" + socketID + "';"
  //   connection.query(updateUserInactive, function (error, results, fields) {
  //     if (error) {
  //       console.log("Socket UserInactive error: " + error);
  //     } else {
  //       console.log('Socket update user inactive ' + socketID)
  //     }
  //   })
}
// *************************************************************

// let updateUserInactive = "UPDATE client_online SET active =0 WHERE socketId='" + socketID + "';"
// console.log(updateUserInactive)
// connection.query(updateUserInactive, function (error, results, fields) {
//   if (error) {
//     console.log("Socket UserInactive error: " + error);
//   } else {
//     console.log('Socket update user inactive ' + socketID)
//   }
// })

// *************************************************************





exports.userChangeUrl = (socketID, ip, pathname, time) => {

  // console.log("ChangeUrllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll")
  // console.log("path " + data)
  let updateUserChangeUrl = "UPDATE client_online2 as CO SET pathName=IF(pathName is not null,\
     JSON_ARRAY_APPEND(pathName, '$', \"" + pathname + "\" ), '[\"" + pathname + "\"]')\
   WHERE CO.id IN(select id from(select id  from client_online2 where socketId = '" + socketID + "') as o);\
   UPDATE client_online2 as CO SET pathName=IF(pathName is not null,\
     JSON_ARRAY_APPEND(pathName, '$', \"" + time + "\" ), '[\"" + time + "\"]')\
   WHERE CO.id IN(select id from(select id  from client_online2 where socketId = '" + socketID + "') as o);"



  // let updateUserChangeUrl = "UPDATE client_online2 SET pathName=JSON_ARRAY_APPEND(pathName, '$', '" + data + "' ) WHERE socketId='" + socketID + "';"
  console.log(updateUserChangeUrl)
  connection.query(updateUserChangeUrl, function (error, results, fields) {
    if (error) {
      console.log("Socket UserDisconnect error: " + error);
    } else {
      console.log('Socket update user disconnnect ' + socketID)
    }
  })
  // } else {
  //   let updateUserInactive = "UPDATE client_online SET active = 0  and connected='disconnect'  and disconnect_time='" + timing + "'  WHERE socketId='" + socketID + "';"
  //   connection.query(updateUserInactive, function (error, results, fields) {
  //     if (error) {
  //       console.log("Socket UserDisconnect error: " + error);
  //     } else {
  //       console.log('Socket update user disconnect ' + socketID)
  //     }
  //   })

  // }

}


exports.userBackActive = (socketID, ip) => {
  console.log("backAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaactive " + socketID)
  // let updateUserBackactive = "UPDATE client_online2 SET active=1, pathName=JSON_ARRAY_APPEND(pathName, '$', '" + path + "' )  WHERE socketId='" + socketID + "';"
  let updateUserBackactive = "UPDATE client_online2 SET active=1  WHERE socketId='" + socketID + "';"

  connection.query(updateUserBackactive, function (error, results, fields) {
    if (error) {
      console.log("Socket userBackActive error: " + error);
    } else {
      console.log('Socket user Back Active ' + updateUserBackactive)
    }
  })
  // } else {
  //   let updateUserInactive = "UPDATE client_online SET active=1 and connected='connect' WHERE socketId='" + socketID + "';"
  //   connection.query(updateUserInactive, function (error, results, fields) {
  //     if (error) {
  //       console.log("Socket userBackActive error: " + error);
  //     } else {
  //       console.log('Socket user Back Active ' + socketID)
  //     }
  //   })
  // }
}
// *************************************************************
// let updateUserInactive = "UPDATE client_online SET active=1 WHERE socketId='" + socketID + "';"
// connection.query(updateUserInactive, function (error, results, fields) {
//   if (error) {
//     console.log("Socket userBackActive error: " + error);
//   } else {
//     // console.log(results)
//     console.log('Socket user Back Active ' + socketID)
//   }
// })
// *************************************************************

/************************Socket***************************************/

// exports.socketVisitorClient = (socketID, ip, timing) => {
//   console.log("boummmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")
//   console.log(ip)
//   let sqlClients = `SELECT 
//     *
// FROM
//     client_online
//         LEFT OUTER JOIN
//     client ON client_online.client_id = client.client_id
// WHERE
//     client.client_id IS NOT NULL
//         AND DATE(${timing}) = DATE(LOCALTIME())
//         AND active = 1
//         AND connected = 'connect';`

//     let sqlVisitors = `SELECT 
//       *
//   FROM
//       client_online
//           LEFT OUTER JOIN
//       client ON client_online.client_id = client.client_id
//   WHERE
//       client.client_id IS NULL
//           AND DATE(timing) = DATE(LOCALTIME())
//           AND active = 1
//           AND connected = 'connect';`;

//   connection.query(sqlClients, (error, results) => {

//     if (error) throw error;
//     console.log(results)
//     res.status(200).send(results)
//   })
// }

/*********************************************************************/
/************************* ON NOW ************************************/
/*********************************************************************/
let pointId = "(SELECT race_id FROM online_now WHERE channel_id = 1)"
let getOnlineNow = "    SELECT meetdate, track_weather, race_time, race_num, trackcode, track_name, track_condition,\
                    result_status, deadheat_selection_pos, track_description, track_distance, result_flag, selec_resulted,\
                    race_status, result, is_future, is_na, race_result_time, race_closed_time,\
                    (select is_clockWise from race_venues where venue_shortName = trackcode ) as isClockwise \
                    FROM points as p\
                    WHERE point_id = " + pointId + " ;\
                        SELECT tab_no as horse_number, horse_name, horse_weight, horse_jockey, horse_trainer, horse_sf, horse_barrier, horse_silksUrl,\
                    points_per_firm, points_per_good, points_per_soft, points_per_heavy, points_per_synth,\
                    horse_status, scr_time, ub_flucs, sb_flucs, sb_open_price, ub_open_price, ub_win, ub_place, sb_win, sb_place, position,\
                    market_mover, lb_mm, if( (SELECT MAX(market_mover) from points_details WHERE point_id =" + pointId + "\
                    and horse_status !='Scratched' and horse_status !='Late Scratching' and horse_status is not null) = market_mover, 1, 0) as is_market_mover\
                    FROM points_details\
                    WHERE point_id =" + pointId + " ORDER by position asc, horse_number asc;\
                        SELECT generation_time from points_generation_time where point_id=" + pointId + " order by generation_time desc;\
                        SELECT race_id FROM online_now WHERE channel_id = 1;"

exports.onNow = (socket) => {
  // socket.join('OnNowRoom')
  connection.query(getOnlineNow, function (error, results, fields) {
    if (error) {
      console.log('ERROR SOCKET getOnlineNow')
    } else {
      if (results.length > 0) {
        console.log(results)
        socket.emit('onNowRace', { results: results, race: 'new' })
      } else {
        console.log('No On Now races LEFT')
      }
    }
  })
}

exports.checkOnNow = (socket, raceId) => {
  let onId = "SELECT race_id FROM online_now WHERE channel_id = 1;"
  connection.query(onId, function (error, results, fields) {
    if (error) {
      console.log('ERROR SOCKET checkOnNow')
    } else {
      let currentId = results[0].race_id
      if (currentId === raceId) {
        connection.query(getOnlineNow, function (error, resultss, fields) {
          if (error) {
            console.log('ERROR SOCKET getOnlineNow')
          } else {
            if (resultss.length > 0) {
              socket.emit('onNowRace', { results: resultss, race: 'same' })
              console.log('same race sent to onNow')
            } else {
              console.log('No On Now races LEFT')
            }
          }
        })
      } else {
        raceId = results[0].race_id
        connection.query(getOnlineNow, function (error, results, fields) {
          if (error) {
            console.log('ERROR SOCKET getOnlineNow')
          } else {
            if (results.length > 0) {
              socket.emit('onNowRace', { results: results, race: 'new' })
            } else {
              console.log('No On Now races LEFT')
            }
          }
        })
      }
    }
  })
}

/*********************************************************************/
/*********************************************************************/
/*********************************************************************/