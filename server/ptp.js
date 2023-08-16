const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
var useragent = require("express-useragent");
const fileUpload = require("express-fileupload");
var schedule = require("node-schedule");
const expressip = require("express-ip");
const socketio = require("socket.io");
var moment = require("moment-timezone");
//var blackList = require('./util/blacklistedIp')
//var geolite2 = require('geolite2');
// var ipgeoblock = require("./util/node-ipgeoblock");
var server = http.createServer(app);
const PORT = 3051;

// MYSQL DATABASE CONNECTION
const connection = require("./config/database.config.js");

//cron
const subscriptionValidationCron  = require("./crons/planValidity.cron.js");

// SETUP MIDDLEWARE
app.use("/api/webhook", bodyParser.raw({ type: "*/*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // combine
//app.use(cors());
var whitelist = [
  "http://localhost:3000",
  "http://localhost:3050",
  "http://localhost:3051",
  "http://ptptips.com.au",
  "http://www.ptptips.com.au",
  "http://beta.ptptips.com.au",
  "https://ptptips.com.au",
  "https://www.ptptips.com.au",
  "http://5startips.com.au",
  "http://www.5startips.com.au",
  "https://5startips.com.au",
  "https://www.5startips.com.au",
  "https://beta.ptptips.com.au",
  "https://dev.ptptips.com.au",
  "https://www.dev.ptptips.com.au",
  "http://www.localhost:3050",
  "http://localhost:3050/pro-tips",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (whitelist.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

/*try {
  app.use(
    ipgeoblock({
      geolite2: "server/util/GeoLite2-Country.mmdb",
      blocked: ["23.100.232.233"],
      blockedCountries: ["SG", "CN"],
    })
  );
} catch (err) {
  console.log("ERROR GEO", err);
}*/

app.use(helmet());
app.enable("trust proxy");
app.use(fileUpload());
app.use(useragent.express());
app.use(expressip().getIpInfoMiddleware);

// ROUTES
var UserRoutes = require("./app/routes/users.routes");
app.use("/users", UserRoutes);

var ApiRoutes = require("./app/routes/api.routes");
app.use("/api", ApiRoutes);

var PaymentRoutes = require("./app/routes/payment.routes");
app.use("/payment", PaymentRoutes);

var oddsRoutes = require("./app/routes/oddsUpdate.routes");
app.use("/update", oddsRoutes);

var userSocket = require("./app/sockets/user.socket");
const { data } = require("jquery");
const { monthlySelections } = require("./app/controllers/users.controller.js");

server.listen(PORT, () => {
  console.log("HTTP API is up and listening on " + PORT);
  schedule.scheduleJob("0 */4 * * *", () => {
    startDBCroneJob();
  }); // crone running every four hour in order to reset the connection with the DB
});

//Working with SOCKET.IO
var io = socketio(server);
//io.set('heartbeat timeout', 12000);
//io.set('heartbeat interval', 4000);
const userSocketIdMap = new Map(); //a map of online usernames and their clients
// console.log(userSocketIdMap);

io.sockets.on("connection", (socket) => {
  // console.log(socket)
  // var address = socket.handshake.headers["x-real-ip"];
  let address;
  if (socket.handshake.headers["x-real-ip"]) {
    address = socket.handshake.headers["x-real-ip"];
  } else {
    address = socket.handshake.address;
  }

  // console.log(address)

  // var address = socket.handshake.headers["sec-websocket-version"];
  // var address = socket.handshake.address;
  // socket.conn.remoteAddress
  // var address = socket.conn.remoteAddress;

  socket.emit("WELCOME", socket.id);

  socket.on("connected", (data) => {
    // console.log(data)
    // console.log(data)

    var userAgent = socket.request.headers["user-agent"];

    if (userAgent.indexOf("Googlebot/2.1;") === -1) {
      addClientToMap(data.user, socket.id);
      // debug if maps is unique F5 second red points and F10 ligne
      // console.log(userSocketIdMap, data);

      var onlineUsers = [...userSocketIdMap.keys()].length;
      // console.log("nb of online clients : " + onlineUsers);
      // if (data.ClId) {
      //   console.log("This is a client with id =  " + data.ClId)
      updateOnlineUserCount(
        onlineUsers,
        address,
        socket.id,
        "connect",
        data.user,
        userAgent,
        data.tabHidden
      );

      // } else {
      //   console.log("visitor ")
      //   updateOnlineUserCount(
      //     onlineUsers,
      //     address,
      //     socket.id,
      //     "connect",
      //     data.user,
      //     userAgent,
      //     data.tabHidden
      //   );
      // }
    } else {
      console.log("BOT IS SEARCHING " + userAgent);
    }
    var timing = moment().tz("Australia/Sydney").format("YYYY-MM-DD HH:mm:ss");

    socket.on("userInactive", function (event) {
      // console.log(event);
      userSocket.userInactive(socket.id, address, timing);
    });
    socket.on("userBackActive", function (event) {
      userSocket.userBackActive(socket.id, address, timing);
    });

    // socket.on("socketVisitorClient", function (event) {
    //   userSocket.socketVisitorClient(socket.id, address, timing);
    // })

    socket.on("disconnect", function () {
      // userSocket.disconnect(socket.id,address, timing)
      if (userAgent.indexOf("Googlebot/2.1;") === -1) {
        removeClientFromMap(data.user, socket.id);
        // console.log(userSocketIdMap, timing)
        var disconnectedUser = [...userSocketIdMap.keys()].length;
        // console.log(disconnectedUser)
        // if (data.ClId) {
        //   console.log("disconnect this client id = " + data.ClId)
        //   updateOnlineUserCount(
        //     onlineUsers,
        //     address,
        //     socket.id,
        //     "disconnect",
        //     data.ClId,
        //     userAgent,
        //     data.tabHidden
        //   );
        // } else {
        //   console.log("disconnect this is a visitor")
        updateOnlineUserCount(
          disconnectedUser,
          address,
          socket.id,
          "disconnect",
          data.user,
          userAgent,
          data.tabHidden
        );
        // }
      } else {
        console.log("BOT HAS FINISHED SEARCHING " + userAgent);
      }
    });
  });

  /***********************ON NOW***********************************/

  // let onNowTimer
  // let raceId
  // socket.on('OnNow', (userData) => {
  //   console.log('on Now started')
  //   userSocket.onNow(socket)
  //   let onId = "SELECT race_id FROM online_now WHERE channel_id = 1;"
  //   connection.query(onId, function (error, results, fields) {
  //     if (error) {
  //       console.log('ERROR SOCKET getRaceId')
  //     } else {
  //       raceId = results[0].race_id
  //       console.log(raceId + ' selected in OnNow')
  //       onNowTimer = setInterval(() => { userSocket.checkOnNow(socket, raceId) }, 5000)
  //     }
  //   })
  // })
  // socket.on('OnNowClosed', () => { clearInterval(onNowTimer) })
  // socket.on('disconnect', () => { clearInterval(onNowTimer) })
  /*****************************************************************/
});

function startDBCroneJob() {
  let checkConnection = "SELECT 'Reset Connection';";
  connection.query(checkConnection, function (error, results, fields) {
    if (error) {
      console.log("ERROR RESETING CONNECTION :" + error);
    } else {
      console.log("CONNECTION WITH DB RESET SUCCESS");
    }
  });
}

//Monthly Selections
schedule.scheduleJob({ hour: 8, minute: 0 }, async () => {
  monthlySelections();
});

function updateOnlineUserCount(
  count,
  ip,
  socketId,
  connected,
  userId,
  userAgent,
  tabHidden

  // onlineUsers,
  // address,
  // socket.id,
  // "connect",
  // data.user,
  // userAgent,
  // data.tabHidden
) {
  var timing = moment().tz("Australia/Sydney").format("YYYY-MM-DD HH:mm:ss");
  // handle if the ip comming from localhost
  if (
    ip === "::1" ||
    ip === "localhost" ||
    ip === "::ffff:127.0.0.1" ||
    ip === undefined
  ) {
    if (connected === "connect") {
      // console.log("LOCALHOST CONNECTED id= " + userId);
      var active;
      let updateQuery;
      // if (connected === "connect") {
      if (!tabHidden) {
        active = 1;
      } else {
        active = 0;
      }
      console.log("testtt");

      updateQuery =
        "INSERT INTO client_online2(visitors, timing, socketId, ip, connected, active, client_id, user_agent)\
            VALUES(" +
        count +
        ",'" +
        timing +
        "','" +
        socketId +
        "','" +
        "LOCALHOST" +
        "','" +
        connected +
        "'," +
        active +
        ",'" +
        userId +
        "','" +
        userAgent +
        "');";

      // } else {
      //   active = 0;
      //   updateQuery =
      //     "UPDATE client_online2 SET disconnect_time ='" +
      //     timing +
      //     "',visitors=" +
      //     count +
      //     ", \
      //                               connected ='" +
      //     connected +
      //     "', active=" +
      //     active +
      //     "\
      //                   WHERE socketId='" +
      //     socketId +
      //     "';";
      // }

      console.log(updateQuery);
      connection.query(updateQuery, function (error, results, fields) {
        if (error) {
          console.log("ERROR UPDATING COUNT OF ONLINE VISITORS :" + error);
        } else {
          console.log(
            "/*********************************************************************/"
          );
          console.log(
            "PTP Online Users increased right now to: " + count + " ip: " + ip
          );
          console.log(
            "/*********************************************************************/"
          );
        }
      });
      // not connected
    } else {
      console.log("LOCALHOST DISCONNECTED");
      var active = 0;
      let updateQuery =
        "UPDATE client_online2 SET disconnect_time ='" +
        timing +
        "',visitors=" +
        count +
        ", \
                                    connected ='" +
        connected +
        "', active=" +
        active +
        "\
                        WHERE socketId='" +
        socketId +
        "';";

      console.log(updateQuery);
      connection.query(updateQuery, function (error, results, fields) {
        if (error) {
          console.log("ERROR UPDATING COUNT OF ONLINE VISITORS :" + error);
        } else {
          console.log(
            "/*********************************************************************/"
          );
          console.log(
            "PTP Online Users decreased right now to: " + count + " ip: " + ip
          );
          console.log(
            "/*********************************************************************/"
          );
        }
      });
    }
    //not localhost
  } else {
    if (connected === "connect") {
      // console.log("Not LOCALHOST with ip= " + ip)
      var active;
      let updateQuery;
      if (!tabHidden) {
        active = 1;
      } else {
        active = 0;
      }

      updateQuery =
        "INSERT INTO client_online2(visitors, timing, socketId, ip, connected, active, client_id, user_agent)\
            VALUES(" +
        count +
        ",'" +
        timing +
        "','" +
        socketId +
        "','" +
        ip +
        "','" +
        connected +
        "'," +
        active +
        ",'" +
        userId +
        "','" +
        userAgent +
        "');";

      // } else {
      //   active = 0;
      //   updateQuery =
      //     "UPDATE client_online2 SET disconnect_time ='" +
      //     timing +
      //     "',visitors=" +
      //     count +
      //     ", \
      //                                 connected ='" +
      //     connected +
      //     "', active=" +
      //     active +
      //     "\
      //                     WHERE socketId='" +
      //     socketId +
      //     "';";
      // }

      console.log(updateQuery);
      connection.query(updateQuery, function (error, results, fields) {
        if (error) {
          console.log("ERROR UPDATING COUNT OF ONLINE VISITORS :" + error);
        } else {
          console.log(
            "/*********************************************************************/"
          );
          console.log(
            "PTP Online Users increased right now to: " + count + " ip: " + ip
          );
          console.log(
            "/*********************************************************************/"
          );
        }
      });
    } else {
      console.log(ip + " DISCONNECTED");
      var active = 0;
      let updateQuery =
        "UPDATE client_online2 SET disconnect_time ='" +
        timing +
        "',visitors=" +
        count +
        ", \
                                      connected ='" +
        connected +
        "', active=" +
        active +
        "\
                          WHERE socketId='" +
        socketId +
        "';";

      console.log(updateQuery);
      connection.query(updateQuery, function (error, results, fields) {
        if (error) {
          console.log("ERROR UPDATING COUNT OF ONLINE VISITORS :" + error);
        } else {
          console.log(
            "/*********************************************************************/"
          );
          console.log(
            "PTP Online Users decreased right now to: " + count + " ip: " + ip
          );
          console.log(
            "/*********************************************************************/"
          );
        }
      });
    }
  }
}

function addClientToMap(userName, socketId, address) {
  if (!userSocketIdMap.has(userName)) {
    // console.log(userSocketIdMap)
    //when user is joining first time
    userSocketIdMap.set(userName, new Set([socketId]));
    // console.log(userName)
  } else {
    //user had already joined from one client and now joining using anotherclient
    // console.log(userName)

    userSocketIdMap.get(userName).add(socketId);
  }
}

function removeClientFromMap(userName, socketId) {
  if (userSocketIdMap.has(userName)) {
    let userSocketIdSet = userSocketIdMap.get(userName);
    userSocketIdSet.delete(socketId);
    //if there are no clients for a user, remove that user from online list (map)
    if (userSocketIdSet.size == 0) {
      userSocketIdMap.delete(userName);
    }
  }
}

// ////// Interface paths
app.use("/", express.static("../dist"));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});
