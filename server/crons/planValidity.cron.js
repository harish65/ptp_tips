const schedule = require("node-schedule");
const connection = require("../config/database.config.js");

// const func  = function (){
//   return schedule.scheduleJob(
//     "5 0 * * *",
//     () => {
//       // connection.query(
//       //   "SELECT end_date FROM client_subscription WHERE end_date > CURDATE()",
//       //   function (err, rsl, fld) {
//       //     if (rsl[0].length > 0) {
//       //       console.log(rsl[0]);
//       //       // connection.query(
//       //       //   "UPDATE client_subscription SET (status = ?) WHERE end_date > CURDATE()",
//       //       //   [false]
//       //       // );
//       //     }
//       //   }
//       // );
//       console.log("history")
//     }
//   );
// }

// const schedule = require('node-schedule');

const subscriptionValidationCron = schedule.scheduleJob("1 0 * * *", function () {
  console.log("subscriptions validated");
  connection.query(
    "UPDATE client_subscription SET active_status = 'false' WHERE end_date < CURDATE()"
  );
});

module.exports = subscriptionValidationCron;
