//////////////////////////////////////////////////////////
//  HANDLE ACTION CONTROLLED BY USERS                  ///
//////////////////////////////////////////////////////////
var connection = require("../../config/database.config.js");
var bcrypt = require("bcryptjs");
var CryptoJS = require("crypto-js");
var moment = require("moment-timezone");
var mailerConfig = require("../../config/mailer.config");
var getStripeProduct = require("../../util/getProductDetails");
var clientExpiry = require("../../util/clientExpiry");
const webpush = require("web-push");
var schedule = require("node-schedule");
var jwt = require("jsonwebtoken");
var config = require("../../config/config");
const {
  recordEmailSent,
  recordUnsentEmail,
} = require("../helpers/EmailStatHelper.js");
// Global API KEY
// const stripe = require('stripe')('sk_live_c1qknJ6CoHYmftYS9fqZjEDy00O9iAP0np')
const stripe = require("stripe")("sk_test_beAPffHK4BvYSbs4Wx1Tzgni00ZqrsiBBk");

function encryptPass(pass) {
  var encID = CryptoJS.AES.encrypt(JSON.stringify(pass), "PTP@TIPS").toString();
  //var encryption = encID.toString().replace(/\+/g, 'pTpTiPs123').replace(/\//g, 'Por21Ld').replace('=', 'Ml32')
  return encID;
}

function decryptPass(pass) {
  //var replacement = pass.replace(/pTpTiPs123/g, '+').replace(/Por21Ld/g, '/').replace('Ml32', '=');
  // Decrypt
  try {
    var bytes = CryptoJS.AES.decrypt(pass, "PTP@TIPS");
    var final = bytes.toString(CryptoJS.enc.Utf8);
    var bouv = JSON.parse(`{"pass": ${final}}`);
    return bouv.pass;
  } catch (err) {
    console.log("ERROR DECRYPTING PASSWORD :" + err);
  }
}

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // console.log(req)
  let SignIn =
    "SELECT *\
                FROM client \
                WHERE client_email='" +
    email +
    "';";

  connection.query(SignIn, function (error, results, fields) {
    if (error) {
      var today = moment().tz("Australia/Sydney").format("YYYY-MM-DD HH:mm:ss");
      const ipInfo = req.ipInfo;
      const browser = req.useragent.browser + " " + req.useragent.version;
      const platform = req.useragent.os;
      const ip = ipInfo.ip === "::1" ? "localhost" : ipInfo.ip;

      let signInError =
        "INSERT INTO client_activity(activity_time, activity_type, client_email, client_platform, client_browser, client_ip)\
                        VALUES('" +
        today +
        "','Sign In ERROR'," +
        email +
        ",'" +
        platform +
        "','" +
        browser +
        "','" +
        ip +
        "');";
      connection.query(signInError, function (err, results, fields) {
        if (err) {
          console.log("error sign in: " + err);
          res.status(500).send({
            status: 500,
            message: "Failed to find email",
          });
        } else {
          res.status(500).send({
            status: 500,
            message: "Failed to find client with email " + email,
          });
        }
      });
    } else {
      if (results.length > 0) {
        if (results[0].client_is_verified === 1) {
          var today = moment()
            .tz("Australia/Sydney")
            .format("YYYY-MM-DD HH:mm:ss");
          const ipInfo = req.ipInfo;
          const browser = req.useragent.browser + " " + req.useragent.version;
          const platform = req.useragent.os;
          const ip = ipInfo.ip === "::1" ? "localhost" : ipInfo.ip;
          var _id = results[0].client_id;
          let days = [];
          if (results[0].client_password == password) {
            let activityType = "Sign In";

            // jwt
            var payload = {
              id: results[0].client_id,
            };
            // expires after 24 hours , { expiresIn: '172800s' }
            var token = jwt.sign(payload, config.JWT_SECRET);

            let updateIsActive =
              "UPDATE client SET client_is_active = 1, token = " +
              JSON.stringify(token) +
              " WHERE client_email='" +
              email +
              "';\
                                      INSERT INTO client_activity(activity_time, activity_type, client_id, client_platform, client_browser, client_ip)\
                                      VALUES('" +
              today +
              "','" +
              activityType +
              "'," +
              _id +
              ",'" +
              platform +
              "','" +
              browser +
              "','" +
              ip +
              "');";
            console.log(
              "updateIsActiveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee :" +
                updateIsActive
            );

            // console.log(JSON.parse(results[0].client_pause_email))
            //console.log(results[0].client_pause_email)
            if (results[0].client_pause_email) {
              for (let i = 0; i < results[0].client_pause_email.length; i++) {
                days.push(results[0].client_pause_email[i]);
              }
            } else days = [];
            //console.log(days)

            var encryptedPass = encryptPass(results[0].client_password);

            var customerId;
            connection.query(
              "SELECT client_id FROM client WHERE client_email = ?",
              [email],
              function (error, result, fields) {
                console.log(result[0]);
                const clientId = result[0].client_id;
                connection.query(
                  "SELECT customer.customer_id FROM client INNER JOIN customer ON client.client_id  = customer.client_id WHERE client.client_id = ?",
                  [clientId],
                  function (err, rsl, fld) {
                    if (rsl.length === 0) {
                      stripe.customers
                        .create({
                          email: email,
                        })
                        .then((customer) => {
                          customerId = customer.id;
                          //here we have to register the id of the customer in our database
                          connection.query(
                            "INSERT INTO customer (client_id, customer_id) VALUES (?, ?)",
                            [clientId, customerId],
                            function (error, result, fields) {
                              console.log(result[0]);
                              console.log("customer id created");
                            }
                          );
                        });
                    } else {
                      customerId = rsl[0].customer_id;
                      let response = {
                        id: results[0].client_id,
                        token: token,
                        first_name: results[0].client_firstName,
                        last_name: results[0].client_lastName,
                        email: results[0].client_email,
                        password: encryptedPass,
                        plan: results[0].client_plan,
                        phone: results[0].client_mobile,
                        country: results[0].client_country,
                        region: results[0].client_region,
                        dob: results[0].client_dob,
                        exp: results[0].client_expiry_date,
                        client_pause_email: days,
                        never_promo: results[0].never_promo,
                        client_role: results[0].client_role,
                        promo_seen: results[0].promo_seen,
                        customer_id: customerId,
                      };

                      // stripe.customers.create({
                      //   email: email,
                      // }).then((customer) => {
                      //   const customerID = customer.id
                      //   //here we have to register the id of the customer in our database
                      //   let updateUserStripeID = "INSERT INTO customer set client_stripe_id='" + customerID + "', client_stripe_card ='" + JSON.stringify(card) + "', client_plan='" + plan + "' WHERE client_id =" + userId + ";"
                      //   connection.query(updateUserStripeID, async function (error, result, fields) {
                      //     if (error) {
                      //       res.status(500).send({
                      //         status: 500,
                      //         message: "error ocurred while communicating with the server, please try registering again",
                      //       });
                      //       console.log("error ocurred updateUserStripeID: " + error);
                      //     } else {
                      //       const paymentMethod = await stripe.paymentMethods.create({
                      //         type: 'card',
                      //         card: {
                      //           token: tokenId
                      //         },
                      //       });

                      connection.query(
                        updateIsActive,
                        function (error, result, fields) {
                          if (error) {
                            console.log(
                              "cannot update is active for email:  " + email,
                              error
                            );
                            return res.status(200).send({
                              status: 500,
                              message:
                                "Server Error please try again, or contact customer support.",
                            });
                          } else {
                            return (
                              res.status(200).send(response),
                              console.log(
                                "user with email " + email + " just logged in"
                              )
                            );
                          }
                        }
                      );
                      console.log("already have customer_id", customerId);
                    }
                  }
                );
              }
            );
            console.log("..................................", customerId);
            //send back
          } else {
            var today = moment()
              .tz("Australia/Sydney")
              .format("YYYY-MM-DD HH:mm:ss");
            let activityType = "Sign In User No Credentials";
            const ipInfo = req.ipInfo;
            const browser = req.useragent.browser + " " + req.useragent.version;
            const platform = req.useragent.os;
            const ip = ipInfo.ip === "::1" ? "localhost" : ipInfo.ip;

            let signInUserError =
              "INSERT INTO client_error(activity_time, activity_type, client_email, client_platform, client_browser, client_ip)\
                                              VALUES('" +
              today +
              "','" +
              activityType +
              "','" +
              email +
              "','" +
              platform +
              "','" +
              browser +
              "','" +
              ip +
              "');";

            connection.query(signInUserError, function (error, result, fields) {
              if (error) {
                console.log(
                  "cannot update signInError for email:  " +
                    email +
                    "  " +
                    error
                );
                res.status(200).send({
                  status: 500,
                  message:
                    "Server Error please try again, or contact customer support.",
                });
              } else {
                // we have to send an email that the user is trying to login with wrong credentials
                let mailOptions = {
                  from: "PTP TIPS Team <support@ptptips.com.au>",
                  to: "support@ptptips.com.au; pasttheposttips@gmail.com",
                  subject: "PTP User Wrong Credential",
                  html: mailerConfig.templates.wrongCredentialUser(email),
                };
                mailerConfig.smtpTransport.sendMail(
                  mailOptions,
                  (err, resp) => {
                    if (err) {
                      console.log(
                        "mailer error email, wrong credential email not sent to: " +
                          email +
                          " error: " +
                          err
                      );
                      recordUnsentEmail(
                        "support@ptptips.com.au",
                        "wrong credential"
                      );
                    } else {
                      console.log("wrong credential of" + email + " sent");
                      recordEmailSent(1, "wrong credential");
                    }
                  }
                );
                return res.status(200).send({
                  status: 401,
                  message: "Your Email or Password was incorrect.",
                });
                //console.log("Invalid credentials. Please check Email/password with email :" + email)
              }
            });
          }
          //} else {
          //  let activityType = 'Sign In Exceeded Devices'
          //  let updateExceededClient = "INSERT INTO client_activity(activity_time, activity_type, client_id, client_platform, client_browser, client_ip)\
          //                              VALUES('"+ today + "','" + activityType + "'," + _id + ",'" + platform + "','" + browser + "','" + ip + "');"

          //  connection.query(updateExceededClient, function (error, result, fields) {
          //    if (error) {
          //      console.log("cannot update updateExceededClient for email:  " + email);
          //      res.status(200).send({
          //        status: 500,
          //        message: "Account exceeded device limit, please contact customer support."
          //      })
          //    }
          //    else {
          //      return (
          //        res.status(200).send({
          //          status: 500,
          //          message: "You are currently signed in from 3 devices, please sign out from one of them and then try again.",
          //        }),
          //        console.log("Client with " + email + " is signed in on different device.")
          //      );
          //    }
          //  })
          //}
          //} else {
          //  // we have to encrypt the id and register
          //  let activityType = 'Sign In Expired'
          //  // Encrypt the client id
          //  var encID = CryptoJS.AES.encrypt(JSON.stringify(_id), 'PTP@TIPS@ENCRYPTION').toString();
          //  var encryption = encID.toString().replace(/\+/g, 'xMl3Jk').replace(/\//g, 'Por21Ld').replace('=', 'Ml32');

          //  let updateExpiredClient = "INSERT INTO client_activity(activity_time, activity_type, client_id, client_platform, client_browser, client_ip)\
          //                              VALUES('"+ today + "','" + activityType + "'," + _id + ",'" + platform + "','" + browser + "','" + ip + "');"

          //  connection.query(updateExpiredClient, function (error, result, fields) {
          //    if (error) {
          //      console.log("cannot update updateExpiredClient for email:  " + email);
          //      res.status(200).send({
          //        message: "Account Expired please contact customer support."
          //      })
          //    }
          //    else {
          //      return (
          //        res.status(200).send({
          //          message: "Account Expired",
          //          id: encryption,
          //        }),
          //        console.log("Client with " + email + " is trying to sign in but expiry date is exceeded")
          //      )
          //    }
          //  })
          //}
        } else {
          //we have to send the verification email
          let clientId = results[0].client_id;
          var encID = CryptoJS.AES.encrypt(
            JSON.stringify(clientId),
            "PTP@TIPS@ENCRYPTION"
          ).toString();
          var encryption = encID
            .toString()
            .replace(/\+/g, "xMl3Jk")
            .replace(/\//g, "Por21Ld")
            .replace("=", "Ml32");

          let link = "https://www.ptptips.com.au/verify/" + encryption;
          let mailOptions = {
            from: "PTP TIPS Team <support@ptptips.com.au>",
            to: email,
            subject: "PTP Account Verification",
            html: mailerConfig.templates.verificationForClient(link),
          };
          mailerConfig.smtpTransport.sendMail(mailOptions, (err, resp) => {
            if (err) {
              console.log(
                "mailer error email, verification email not sent to: " +
                  email +
                  " error: " +
                  err
              );
              recordUnsentEmail(email, "verification");
              return res.status(200).send({
                status: 500,
                message:
                  "Error occurred while sending the verification email. Please contact customer support",
              });
            } else {
              console.log("Verification email sent to: " + email);
              recordEmailSent(1, "verification");
              return res.status(200).send({
                status: 300,
                message:
                  "Email not verified. Please check your inbox or contact customer support",
              });
            }
          });
        }
      } else {
        var today = moment()
          .tz("Australia/Sydney")
          .format("YYYY-MM-DD HH:mm:ss");
        let activityType = "Sign In No Credentials";
        const ipInfo = req.ipInfo;
        const browser = req.useragent.browser + " " + req.useragent.version;
        const platform = req.useragent.os;
        const ip = ipInfo.ip === "::1" ? "localhost" : ipInfo.ip;

        let signInError =
          "INSERT INTO client_error(activity_time, activity_type, client_email, client_platform, client_browser, client_ip)\
                                      VALUES('" +
          today +
          "','" +
          activityType +
          "','" +
          email +
          "','" +
          platform +
          "','" +
          browser +
          "','" +
          ip +
          "');";

        connection.query(signInError, function (error, result, fields) {
          if (error) {
            console.log(
              "cannot update signInError for email:  " + email + "  " + error
            );
            res.status(500).send({
              status: 500,
              message:
                "Server Error please try again, or contact customer support.",
            });
          } else {
            // we have to send an email that the user is trying to login with wrong credentials
            let mailOptions = {
              from: "PTP TIPS Team <support@ptptips.com.au>",
              to: "support@ptptips.com.au; pasttheposttips@gmail.com",
              subject: "PTP User Wrong Credential",
              html: mailerConfig.templates.wrongCredential(email),
            };
            mailerConfig.smtpTransport.sendMail(mailOptions, (err, resp) => {
              if (err) {
                console.log(
                  "mailer error email, wrong credential email not sent to: " +
                    email +
                    " error: " +
                    err
                );
                recordUnsentEmail(email, "wrong credential");
              } else {
                console.log("wrong credential of" + email + " sent");
                recordEmailSent(1, "wrong credential");
              }
            });
            return (
              res.status(200).send({
                status: 400,
                message: "Invalid user, email not found",
              }),
              console.log(
                "Invalid credentials. Please check Email/password with email :" +
                  email
              )
            );
          }
        });
      }
    }
  });
};

// alreadyLogin function for clients with remember me
exports.alreadyLoggedIn = (req, res) => {
  const email = req.body.email;
  const password = decryptPass(req.body.password);

  let SignIn =
    "SELECT *\
                FROM client \
                WHERE client_email='" +
    email +
    "';";

  connection.query(SignIn, function (error, results, fields) {
    if (error) {
      res.status(200).send({
        status: 500,
        message: "Failed to find client with email " + email,
      });
      console.log(
        "Failed to find client with email " + email + " error: " + error
      );
    } else {
      if (results.length > 0) {
        if (results[0].client_is_verified === 1) {
          let userExpiry = moment(results[0].client_expiry_date).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          var today = moment()
            .tz("Australia/Sydney")
            .format("YYYY-MM-DD HH:mm:ss");
          const ipInfo = req.ipInfo;
          const browser = req.useragent.browser + " " + req.useragent.version;
          const platform = req.useragent.os;
          const ip = ipInfo.ip === "::1" ? "localhost" : ipInfo.ip;
          var _id = results[0].client_id;
          let days = [];
          //if (userExpiry >= today) {
          //if (results[0].client_is_active === 0) {
          //  //proceed with logout the user
          //  return (
          //    res.status(200).send({
          //      status: 400,
          //      message: 'Logout'
          //    }),
          //    console.log("user with email " + email + "forced logout")
          //  )
          //} else {
          //NEED TO BCRUPT AND COMPARE
          if (results[0].client_password === password) {
            let activityType = "Sign In Auto";

            let updateIsActive =
              "UPDATE client SET client_is_active = 1 WHERE client_email='" +
              email +
              "';\
                                      INSERT INTO client_activity(activity_time, activity_type, client_id, client_platform, client_browser, client_ip)\
                                      VALUES('" +
              today +
              "','" +
              activityType +
              "'," +
              _id +
              ",'" +
              platform +
              "','" +
              browser +
              "','" +
              ip +
              "');";

            if (results[0].client_pause_email === null) {
              days = [];
            } else {
              for (let i = 0; i < results[0].client_pause_email.length; i++) {
                days.push(results[0].client_pause_email[i]);
              }
            }

            var encryptedPass = encryptPass(results[0].client_password);
            // Send back data
            let response = {
              id: results[0].client_id,
              first_name: results[0].client_firstName,
              last_name: results[0].client_lastName,
              email: results[0].client_email,
              password: encryptedPass,
              plan: results[0].client_plan,
              phone: results[0].client_mobile,
              country: results[0].client_country,
              region: results[0].client_region,
              dob: results[0].client_dob,
              exp: results[0].client_expiry_date,
              client_pause_email: days,
              never_promo: results[0].never_promo,
              promo_seen: results[0].promo_seen,
            };

            connection.query(updateIsActive, function (error, results, fields) {
              if (error) {
                console.log("cannot update is active for email:  " + email);
                res.status(200).send({
                  status: 500,
                  message:
                    "Something went Wrong, please contact customer support.",
                });
              } else {
                return (
                  res.status(200).send({
                    status: 200,
                    data: response,
                  }),
                  console.log("user with email " + email + " just logged in")
                );
              }
            });
          } else {
            return (
              res.status(200).send({
                status: 500,
                message: "Invalid credentials. Please check Email/password.",
              }),
              console.log("Password not match with " + email)
            );
          }
          //}
          //} else {
          //  // we have to encrypt the id and register
          //  let activityType = 'Sign In Expired Auto'
          //  // Encrypt the client id
          //  var encID = CryptoJS.AES.encrypt(JSON.stringify(_id), 'PTP@TIPS@ENCRYPTION').toString();
          //  var encryption = encID.toString().replace(/\+/g, 'xMl3Jk').replace(/\//g, 'Por21Ld').replace('=', 'Ml32');

          //  let updateExpiredClient = "INSERT INTO client_activity(activity_time, activity_type, client_id, client_platform, client_browser, client_ip)\
          //                            VALUES('"+ today + "','" + activityType + "'," + _id + ",'" + platform + "','" + browser + "','" + ip + "');"

          //  connection.query(updateExpiredClient, function (error, result, fields) {
          //    if (error) {
          //      console.log("cannot update updateExpiredClient for email:  " + email);
          //      res.status(200).send({
          //        message: "Account Expired please contact customer support."
          //      })
          //    }
          //    else {
          //      return (
          //        res.status(200).send({
          //          message: "Account Expired",
          //          id: encryption,
          //        }),
          //        console.log("Client with " + email + " is trying to sign in but expiry date is exceeded")
          //      )
          //    }
          //  })
          //}
        } else {
          return (
            res.status(200).send({
              status: 500,
              message:
                "Email not verified. Please check your email for verification link.",
            }),
            console.log("Client with " + email + " is not verified.")
          );
        }
      } else {
        return (
          res.status(200).send({
            status: 500,
            message: "Invalid credentials. Please check Email/password.",
          }),
          console.log(
            "Invalid credentials. Please check Email/password with email :" +
              email
          )
        );
      }
    }
  });
};

// LOGOUT USER
exports.logout = (req, res) => {
  const { email } = req.body;

  let selectUser =
    "SELECT client_id FROM client WHERE client_email='" + email + "';";
  connection.query(selectUser, function (error, results, fields) {
    if (error) {
      res.status(200).send({
        status: 500,
        message: "ERROR LOGOUT",
      });
      console.log("Log out failed with email:  " + email + " error: " + error);
    } else {
      if (results.length > 0) {
        var today = moment()
          .tz("Australia/Sydney")
          .format("YYYY-MM-DD HH:mm:ss");
        const ipInfo = req.ipInfo;
        const browser = req.useragent.browser + " " + req.useragent.version;
        const platform = req.useragent.os;
        const ip = ipInfo.ip === "::1" ? "localhost" : ipInfo.ip;
        var _id = results[0].client_id;
        let activityType = "Sign Out";

        let signOut =
          "UPDATE client SET client_is_active = 0 WHERE client_email='" +
          email +
          "';\
                          INSERT INTO client_activity(activity_time, activity_type, client_id, client_platform, client_browser, client_ip)\
                                        VALUES('" +
          today +
          "','" +
          activityType +
          "'," +
          _id +
          ",'" +
          platform +
          "','" +
          browser +
          "','" +
          ip +
          "');";

        connection.query(signOut, function (error, result, fields) {
          if (error) {
            res.status(200).send({
              status: 500,
              message: "ERROR LOGOUT",
            });
            console.log(
              "Log out failed with email:  " + email + " error: " + error
            );
          } else {
            res.status(200).send({
              status: 200,
              message: "OK",
            });
            console.log("User with email: " + email + " just logged out");
          }
        });
      } else {
        res.status(200).send({
          status: 500,
          message: "ERROR LOGOUT",
        });
        console.log("No user with email:  " + email + " to sign out: " + error);
      }
    }
  });
};

// CONTACT US
exports.contactUs = (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;
  var today = moment().format("YYYY-MM-DD HH:mm:ss");
  const ipInfo = req.ipInfo;
  const browser = req.useragent.browser + " " + req.useragent.version;
  const platform = req.useragent.os;
  const ip = ipInfo.ip === "::1" ? "localhost" : ipInfo.ip;

  let fName;
  let lName;
  let userEmail;
  let userMessage;
  let userPhone;
  if (firstName === "null" || firstName === null || firstName === "") {
    fName = "";
  } else {
    fName = firstName;
  }
  if (lastName === "null" || lastName === null || lastName === "") {
    lName = "";
  } else {
    lName = lastName;
  }
  if (email === "null" || email === null || email === "") {
    userEmail = null;
  } else {
    userEmail = JSON.stringify(email);
  }
  if (phone === "null" || phone === null || phone === "") {
    userPhone = null;
  } else {
    userPhone = JSON.stringify(phone);
  }
  if (message === "null" || message === null || message === "") {
    userMessage = null;
  } else {
    userMessage = JSON.stringify(message);
  }
  let fullName = fName + " " + lName;

  let insertQuery =
    "INSERT INTO contact_us(contact_email, contact_name, contact_message, contact_phone, contact_date, contact_platform, contact_browser, contact_ip) \
                      VALUES(" +
    userEmail +
    ",'" +
    fullName +
    "'," +
    userMessage +
    "," +
    userPhone +
    ",'" +
    today +
    "','" +
    platform +
    "','" +
    browser +
    "','" +
    ip +
    "');";

  connection.query(insertQuery, function (error, results, fields) {
    if (error) {
      console.log("insert into contact us table error:  " + error);
      res.status(500).send({
        message: "SERVER ERROR.",
      });
    } else {
      try {
        let mailOptions = {
          from: "PTP TIPS Team <support@ptptips.com.au>",
          to: email,
          subject: "Message received",
          html: mailerConfig.templates.contactUs(fName, userMessage),
        };

        mailerConfig.smtpTransport.sendMail(mailOptions, (err, resp) => {
          if (err) {
            recordUnsentEmail(email, "contact us");
            res.status(500).send({
              message: "Contact Us email error",
            });
            console.log(
              "mailer error email, contact email not sent to: " +
                email +
                " error: " +
                err
            );
            recordEmailSent(1, "contact us");
          } else {
            let mailOptions2 = {
              from: "Support Team <support@ptptips.com.au>",
              to: "support@ptptips.com.au; pasttheposttips@gmail.com",
              subject: "Contact Us client",
              html: mailerConfig.templates.contactUsTeam(
                fName,
                lName,
                email,
                phone,
                message,
                ip
              ),
            };
            mailerConfig.smtpTransport.sendMail(
              mailOptions2,
              (error, response) => {
                if (error) {
                  console.log(
                    "mailer error email, contact us email not sent to the team:" +
                      error
                  );
                  recordUnsentEmail(email, "contact us");
                } else {
                  console.log("Contact Us email sent to Support");
                  recordEmailSent(1, "contact us");
                }
              }
            );
            res.status(200).send({
              status: 200,
              message: "OK",
            });
          }
        });
      } catch (err) {
        res.status(500).send({
          message: "An unknown error occurred, please try again.",
        });
        console.log("contact us error" + err);
      }
    }
  });
};

exports.registerContactInfo = (req, res) => {
  const { firstName, lastName, email, password, mobile, state, country } =
    req.body;
  const ipInfo = req.ipInfo;
  const browser = req.useragent.browser + " " + req.useragent.version;
  const platform = req.useragent.os;
  const ip = ipInfo.ip === "::1" ? "localhost" : ipInfo.ip;
  // check if email exists
  let checkUser = "SELECT * FROM client WHERE client_email = '" + email + "';";
  console.log(checkUser);
  connection.query(checkUser, function (error, results, fields) {
    if (error) {
      res.status(200).send({
        status: 500,
        message:
          "error ocurred while communicating with the server, please contact customer support",
      });
      console.log(
        "error ocurred while communicating between server and DB: " + error
      );
    } else {
      // console.log(results)
      if (results.length > 0) {
        res.status(200).send({
          status: 400,
          message: "has already been registered.",
        });
        console.log("email registration already exists: " + email);
      } else {
        bcrypt.hash(password, 10, function (err, hash) {
          // Check for hashing error
          if (err) {
            console.log("Password Hashing Error: " + err);
            return res.status(500).send({
              status: 500,
              message: "Password error.",
            });
          }
          var today = moment()
            .tz("Australia/Sydney")
            .format("YYYY-MM-DD HH:mm:ss");
          let stage = "Sign Up 1";
          let fName;
          let lName;
          let phone;
          let region;
          let countryy;
          if (firstName === "null" || firstName === null || firstName === "") {
            fName = null;
          } else {
            fName = JSON.stringify(firstName);
          }
          if (lastName === "null" || lastName === null || lastName === "") {
            lName = null;
          } else {
            lName = JSON.stringify(lastName);
          }
          if (mobile === "null" || mobile === null || mobile === "") {
            phone = null;
          } else {
            phone = JSON.stringify(mobile);
          }
          if (state === "null" || state === null || state === "") {
            region = null;
          } else {
            region = JSON.stringify(state);
          }
          if (country === "null" || country === null || country === "") {
            countryy = null;
          } else {
            countryy = JSON.stringify(country);
          }
          let insertQuery =
            "INSERT INTO client \
                                (client_firstName, client_lastName, client_email, client_password, client_password_hash, \
                                  client_country, client_region, client_mobile,\
                                  client_is_active, client_is_verified, client_creation_date, client_role, client_stage) \
                                  VALUES(" +
            fName +
            "," +
            lName +
            ",'" +
            email +
            "','" +
            password +
            "','" +
            hash +
            "',\
                                          " +
            countryy +
            "," +
            region +
            "," +
            phone +
            ",\
                                         " +
            0 +
            "," +
            0 +
            ",'" +
            today +
            "', " +
            3 +
            " , '" +
            stage +
            "');\
                                SELECT client_id from client where client_email='" +
            email +
            "';";
          console.log(insertQuery);

          connection.query(insertQuery, function (error, resultss, fields) {
            if (error) {
              res.status(200).send({
                status: 500,
                message:
                  "Error ocurred while registering, please try again or contact customer support",
              });
              console.log("error ocurred while registering: " + error);
            } else {
              try {
                // Generate a link in order to verify the user
                var _id = resultss[1][0].client_id;
                // insert into client activity table
                let userActivity =
                  "INSERT INTO client_activity(activity_time, activity_type, client_id, client_platform, client_browser, client_ip)\
                                      VALUES('" +
                  today +
                  "','" +
                  stage +
                  "'," +
                  _id +
                  ",'" +
                  platform +
                  "','" +
                  browser +
                  "','" +
                  ip +
                  "');";
                connection.query(
                  userActivity,
                  function (error, result, fields) {
                    if (error) {
                      console.log("error adding userActivity: " + error);
                    } else {
                      console.log(
                        "userActivity for registration step 1 added successfully"
                      );
                    }
                  }
                );

                // Encrypt the client id
                var encID = CryptoJS.AES.encrypt(
                  JSON.stringify(_id),
                  "PTP@TIPS@ENCRYPTION"
                ).toString();
                var encryption = encID
                  .toString()
                  .replace(/\+/g, "xMl3Jk")
                  .replace(/\//g, "Por21Ld")
                  .replace("=", "Ml32");

                let link = "https://www.ptptips.com.au/verify/" + encryption;
                let mailOptions = {
                  from: "PTP TIPS Team <support@ptptips.com.au>",
                  to: email,
                  subject: "PTP Account Verification",
                  html: mailerConfig.templates.verificationForClient(link),
                };
                mailerConfig.smtpTransport.sendMail(
                  mailOptions,
                  (err, resp) => {
                    if (err) {
                      recordUnsentEmail(email, "verification");
                      res.status(200).send({
                        status: 500,
                        message:
                          "Error occurred while sending the verification email. Please contact customer support",
                      });
                      console.log(
                        "mailer error email, verification email not sent to: " +
                          email +
                          " error: " +
                          err
                      );
                    } else {
                      res.status(200).send({
                        status: 200,
                        message:
                          "You will now receive a verification message to your email. Please verify your email address in order to continue.",
                      });
                      console.log("Verification email sent to: " + email);
                      recordEmailSent(1, "verification");
                    }
                  }
                );
              } catch (err) {
                res.status(500).send({
                  status: 500,
                  message:
                    "An unknown error occurred while trying to register.",
                });
                console.log(err);
              }
            }
          });
        });
      }
    }
  });
};

exports.registerAddressInfo = async (req, res) => {
  const {
    id,
    phone,
    country,
    dob,
    street_address,
    city,
    state,
    zip_code,
    googleMapLink,
  } = req.body;
  const ipInfo = req.ipInfo;
  const browser = req.useragent.browser + " " + req.useragent.version;
  const platform = req.useragent.os;
  const ip = ipInfo.ip === "::1" ? "localhost" : ipInfo.ip;

  let address = {
    street_address: street_address,
    city: city,
    zip_code: zip_code,
    googleMapLink,
    googleMapLink,
  };
  var today = moment().tz("Australia/Sydney").format("YYYY-MM-DD HH:mm:ss");
  let stage = "Sign Up 2";
  // decrypt id  exists
  var replacement = id
    .replace(/xMl3Jk/g, "+")
    .replace(/Por21Ld/g, "/")
    .replace("Ml32", "=");
  // Decrypt
  var bytes = CryptoJS.AES.decrypt(replacement, "PTP@TIPS@ENCRYPTION");
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  let updateClient =
    "UPDATE client SET client_mobile='" +
    phone +
    "', client_country ='" +
    country +
    "', client_region='" +
    state +
    "', \
                                        client_dob='" +
    dob +
    "', client_address='" +
    JSON.stringify(address) +
    "', client_stage ='" +
    stage +
    "'\
                      WHERE client_id=" +
    decryptedData +
    ";\
                      INSERT INTO client_activity(activity_time, activity_type, client_id, client_platform, client_browser, client_ip)\
                                      VALUES('" +
    today +
    "','" +
    stage +
    "'," +
    decryptedData +
    ",'" +
    platform +
    "','" +
    browser +
    "','" +
    ip +
    "');";

  connection.query(updateClient, function (error, results, fields) {
    if (error) {
      res.status(200).send({
        status: 500,
        message:
          "error ocurred while communicating with the server, please contact customer support",
      });
      console.log(
        "error ocurred while communicating between server and DB: " + error
      );
    } else {
      res.status(200).send({
        status: 200,
        message: "Registration Step 2 Completed",
      });
    }
  });
};

exports.registerPayment = async (req, res) => {
  const { userId, plan, card } = req.body;
  console.log("payment from userId " + userId);
  // decrypt id  exists
  var replacement = userId
    .replace(/xMl3Jk/g, "+")
    .replace(/Por21Ld/g, "/")
    .replace("Ml32", "=");
  // Decrypt
  var bytes = CryptoJS.AES.decrypt(replacement, "PTP@TIPS@ENCRYPTION");
  var id = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  let checkEmail = "SELECT * from client WHERE client_id='" + id + "';";

  connection.query(checkEmail, async function (error, resu, fields) {
    if (error) {
      res.status(500).send({
        status: 500,
        message:
          "error ocurred while communicating with the server, please try registering again",
      });
      console.log("error ocurred registerPayment: " + error);
    } else {
      if (resu.length > 0) {
        let subPlan;
        if (resu[0].client_unsubscribe === 1) {
          subPlan = "direct";
        } else {
          subPlan = plan;
        }
        const product = getStripeProduct(subPlan);
        const userId = resu[0].client_id;
        const tokenId = card.id;
        const email = resu[0].client_email;
        const client_firstName = resu[0].client_firstName;

        var encryptedPass = encryptPass(resu[0].client_password);

        let clientDetails = {
          id: resu[0].client_id,
          first_name: resu[0].client_firstName,
          last_name: resu[0].client_lastName,
          email: resu[0].client_email,
          password: encryptedPass,
          plan: resu[0].client_plan,
          phone: resu[0].client_mobile,
          country: resu[0].client_country,
          region: resu[0].client_region,
          dob: resu[0].client_dob,
          exp: resu[0].client_expiry_date,
          client_pause_email: "hi",
        };

        // proceed with the payment steps
        // first we have to create the customer with the card and save the customer id in our database
        await stripe.customers
          .create({
            email: email,
          })
          .then((customer) => {
            const customerID = customer.id;
            //here we have to register the id of the customer in our database
            let updateUserStripeID =
              "UPDATE client set client_stripe_id='" +
              customerID +
              "', client_stripe_card ='" +
              JSON.stringify(card) +
              "', client_plan='" +
              plan +
              "' WHERE client_id =" +
              userId +
              ";";
            connection.query(
              updateUserStripeID,
              async function (error, result, fields) {
                if (error) {
                  res.status(500).send({
                    status: 500,
                    message:
                      "error ocurred while communicating with the server, please try registering again",
                  });
                  console.log("error ocurred updateUserStripeID: " + error);
                } else {
                  const paymentMethod = await stripe.paymentMethods.create({
                    type: "card",
                    card: {
                      token: tokenId,
                    },
                  });

                  // Attach the payment method to the customer
                  try {
                    await stripe.paymentMethods.attach(paymentMethod.id, {
                      customer: customerID,
                    });
                  } catch (error) {
                    console.log(error);
                    return res
                      .status(500)
                      .send({ error: { message: error.message } });
                  }

                  // Change the default invoice settings on the customer to the new payment method
                  await stripe.customers.update(customerID, {
                    invoice_settings: {
                      default_payment_method: paymentMethod.id,
                    },
                  });

                  // Create the subscription
                  const subscription = await stripe.subscriptions.create({
                    customer: customerID,
                    items: [{ price: product.id }],
                    trial_end: product.trial_period,
                    expand: ["latest_invoice.payment_intent"],
                  });
                  console.log(
                    "hoooooooooooooooooooooooo " + subscription.status
                  );
                  // we have to add to the client the expiry date
                  if (
                    subscription.status === "active" ||
                    subscription.status === "trialing"
                  ) {
                    res.status(200).send({
                      status: 200,
                      subscription: subscription.status,
                      message: "Payment success.",
                      response: clientDetails,
                    });

                    // do a function for expiry date
                    let expiry = clientExpiry(subPlan);
                    let stage = "Completed";
                    let updateUserExpiry =
                      "UPDATE client SET client_expiry_date='" +
                      expiry +
                      "', client_stripe_subscription='" +
                      subscription.id +
                      "', client_stage='" +
                      stage +
                      "', client_unsubscribe = 0 WHERE client_id=" +
                      userId +
                      ";";
                    connection.query(
                      updateUserExpiry,
                      async function (error, result, fields) {
                        if (error) {
                          console.log(
                            "error ocurred updateUserExpiry: " + error
                          );
                        } else {
                          console.log(
                            email + "expiry date aupdated succesfully"
                          );
                        }
                      }
                    );

                    let mailOptions = {
                      from: "PTP TIPS Team <support@ptptips.com.au>",
                      to: "support@ptptips.com.au; pasttheposttips@gmail.com",
                      subject: "Client Registered Successfully",
                      html: mailerConfig.templates.clientRegistration(
                        JSON.stringify(resu[0])
                      ),
                    };

                    mailerConfig.smtpTransport.sendMail(
                      mailOptions,
                      (err, resp) => {
                        if (err) {
                          recordUnsentEmail(email, "registration");
                          console.log(
                            "error sending support a new client is registered"
                          );
                        } else {
                          console.log("done");
                          recordEmailSent(1, "registration");
                        }
                      }
                    );

                    let mailOptions2 = {
                      from: "PTP TIPS Team <support@ptptips.com.au>",
                      to: email,
                      subject: "Welcome to PTP TIPS",
                      html: mailerConfig.templates.welcome(
                        resu[0].client_firstName,
                        resu[0].client_email,
                        resu[0].client_password
                      ),
                    };

                    mailerConfig.smtpTransport.sendMail(
                      mailOptions2,
                      (err, resp) => {
                        if (err) {
                          recordUnsentEmail(email, "registration");
                          console.log(
                            "error sending welcome email to a new client is registered"
                          );
                        } else {
                          console.log("done");
                          recordEmailSent(1, "registration");
                        }
                      }
                    );
                  } else {
                    res.status(200).send({
                      status: 500,
                      message:
                        "Your card was declined. Please contact customer support.",
                    });
                  }
                }
              }
            );
          })
          .catch((err) => {
            res.status(500).send({
              status: 200,
              message: "Error creating customer.",
            });
            console.log(
              "Stripe error creatig new customer with email: " + email + err
            );
          });

        // stripe.charges.create(
        //   {
        //     amount: product.price,
        //     currency: 'aud',
        //     source: card.id,
        //     description: `Payment for ${product.title}`,
        //     metadata: {
        //       productId: product.id
        //     }
        //   },
        //   function(err, charge) {
        //     if(err){
        //       console.log("Payment Failed with user email: " + email + " error: " + err)
        //       res.status(500).send({
        //         status: 500,
        //         message: 'Payment failed, please try again.'
        //       })
        //     }
        //     else {
        //       res.status(200).send({
        //         status: 200,
        //         message: 'Payment success.'
        //       })
        //       console.log("Payment Success " + JSON.stringify(charge))
        //     }
        //   }
        // )
      } else {
        res.status(200).send({
          status: 500,
          message:
            "Invalid Credentials please try again or contact customer support",
        });
        console.log("Invalid Credentials please try again");
      }
    }
  });
};

// CANCEL SUBSCRIPTION FROM STRIPE FOR A SPECIFIC USER
exports.cancelSubscription = async (req, res) => {
  const { email } = req.body;
  let getSubscriptionId =
    " SELECT client_stripe_subscription, client_id FROM client WHERE client_email='" +
    email +
    "' AND client_stripe_subscription IS NOT NULL;";

  connection.query(getSubscriptionId, async function (error, results, fields) {
    if (error) {
      res.status(200).send({
        status: 500,
        message:
          "Error Canceling subscription, please contact customer support.",
      });
      console.log("ERROR Canceling subscription :" + error);
    } else {
      if (results.length > 0) {
        let subId = results[0].client_stripe_subscription;
        var _id = results[0].client_id;
        // Cancel the subscription
        try {
          const cancelSubscription = await stripe.subscriptions.del(subId);

          if (cancelSubscription.status === "canceled") {
            // update that the client stage to sign up stage 2
            var today = moment()
              .tz("Australia/Sydney")
              .format("YYYY-MM-DD HH:mm:ss");
            const ipInfo = req.ipInfo;
            const browser = req.useragent.browser + " " + req.useragent.version;
            const platform = req.useragent.os;
            const ip = ipInfo.ip === "::1" ? "localhost" : ipInfo.ip;
            let stage = "Unsubscribe";

            let updateFlag =
              "UPDATE client SET client_unsubscribe= 1, client_stage='Sign Up 2', client_expiry_date='" +
              today +
              "' WHERE client_email='" +
              email +
              "';\
                            INSERT INTO client_activity(activity_time, activity_type, client_id, client_platform, client_browser, client_ip)\
                            VALUES('" +
              today +
              "','" +
              stage +
              "'," +
              _id +
              ",'" +
              platform +
              "','" +
              browser +
              "','" +
              ip +
              "');";

            connection.query(
              updateFlag,
              async function (error, results, fields) {
                if (error) {
                  res.status(200).send({
                    status: 500,
                    message:
                      "Error Canceling subscription, please contact customer support.",
                  });
                  console.log("ERROR Canceling subscription :" + error);
                } else {
                  res.status(200).send({
                    status: 200,
                    message: "Unsubscribed successfully.",
                  });
                }
              }
            );
          } else {
            res.status(200).send({
              status: 500,
              message:
                "Error Canceling subscription, please contact customer support.",
            });
          }
        } catch (err) {
          return res.status(200).send({
            status: 500,
            message: "You are already unsubscribed",
          });
        }
      } else {
        res.status(200).send({
          status: 500,
          message: "No subscription detected",
        });
      }
    }
  });
};

// EDIT PROFILE
exports.editProfile = (req, res) => {
  const { firstName, lastName, email, country, region, phone, dob } = req.body;

  let fName;
  let lName;
  let emai;
  let mobile;
  let countr;
  let reg;
  let yob;

  if (firstName === "null" || firstName === null || firstName === "") {
    fName = null;
  } else {
    fName = JSON.stringify(firstName);
  }
  if (lastName === "null" || lastName === null || lastName === "") {
    lName = null;
  } else {
    lName = JSON.stringify(lastName);
  }
  if (email === "null" || email === null || email === "") {
    emai = null;
  } else {
    emai = JSON.stringify(email);
  }
  if (phone === "null" || phone === null || phone === "") {
    mobile = null;
  } else {
    mobile = JSON.stringify(phone);
  }
  if (country === "null" || country === null || country === "") {
    countr = null;
  } else {
    countr = JSON.stringify(country);
  }
  if (region === "null" || region === null || region === "") {
    reg = null;
  } else {
    reg = JSON.stringify(region);
  }
  if (dob === "null" || dob === null || dob === "") {
    yob = null;
  } else {
    yob = JSON.stringify(dob);
  }

  let updateProfile =
    "UPDATE client SET client_firstName=" +
    fName +
    ",\
                                          client_lastName=" +
    lName +
    ",\
                                          client_mobile=" +
    mobile +
    ",\
                                          client_country=" +
    countr +
    ",\
                                          client_region=" +
    reg +
    ",\
                                          client_dob=" +
    yob +
    "\
                                    WHERE client_email=" +
    emai +
    ";";

  connection.query(updateProfile, function (error, results, fields) {
    if (error) {
      res.status(500).send({
        message:
          "ERROR UPDATING PROFILE INFORMATION, PLEASE CONTACT CUSTOMER SUPPORT",
      });
      console.log("ERROR UPDATING PROFILE INFORMATION :" + error);
    } else {
      res.status(200).send({
        status: 200,
        message: "Profile information updated successfully.",
      });
      console.log("Profile of " + email + " updated successfully");
    }
  });
};

// VERIFY CLIENT BY ID
exports.verifyAccount = (req, res) => {
  var today = moment().tz("Australia/Sydney").format("YYYY-MM-DD HH:mm:ss");

  const ipInfo = req.ipInfo;
  const browser = req.useragent.browser + " " + req.useragent.version;
  const platform = req.useragent.os;
  const ip = ipInfo.ip === "::1" ? "localhost" : ipInfo.ip;
  const stage = "Sign Up 1 Verify";

  // replace special charachters
  var input = req.params.id;
  var replacement = input
    .replace(/xMl3Jk/g, "+")
    .replace(/Por21Ld/g, "/")
    .replace("Ml32", "=");
  // Decrypt
  var bytes = CryptoJS.AES.decrypt(replacement, "PTP@TIPS@ENCRYPTION");
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  let getSubscriptionPlan =
    "SELECT * from package WHERE status =1;\
                              SELECT client_is_verified, client_expiry_date FROM client WHERE client_id=" +
    decryptedData +
    ";";
  connection.query(getSubscriptionPlan, function (error, resultss, fields) {
    if (error) {
      console.log("getSubscriptionPlan error " + error);
      return res.status(500).send({
        message: "Error verifying client !",
      });
    } else {
      if (
        resultss[1][0].client_is_verified === 0 ||
        resultss[1][0].client_expiry_date === null
      ) {
        var endSubscription = clientExpiry(resultss[0][0].pack_validity);

        let verifyUser =
          "UPDATE client SET client_is_verified = 1, client_is_active = 1, client_expiry_date =IF(client_expiry_date IS NOT NULL, client_expiry_date, '" +
          endSubscription +
          "') WHERE client_id=" +
          decryptedData +
          ";\
                    SELECT * FROM client WHERE client_id=" +
          decryptedData +
          ";\
                    INSERT INTO client_activity(activity_time, activity_type, client_id, client_platform, client_browser, client_ip)\
                                      VALUES('" +
          today +
          "','" +
          stage +
          "'," +
          decryptedData +
          ",'" +
          platform +
          "','" +
          browser +
          "','" +
          ip +
          "');\
                    SELECT * from package WHERE status =1;";
        connection.query(verifyUser, function (error, results, fields) {
          if (error) {
            res.status(500).send({
              message: "Error verifying client !",
            });
            console.log(
              "verification of id: " + decryptedData + " error " + error
            );
          } else {
            if (results[1].length > 0) {
              let days = [];
              if (results[1][0].client_pause_email) {
                for (
                  let i = 0;
                  i < results[1][0].client_pause_email.length;
                  i++
                ) {
                  days.push(results[1][0].client_pause_email[i]);
                }
              } else {
                days = [];
              }

              var encryptedPass = encryptPass(results[1][0].client_password);
              let response = {
                id: results[1][0].client_id,
                first_name: results[1][0].client_firstName,
                last_name: results[1][0].client_lastName,
                email: results[1][0].client_email,
                password: encryptedPass,
                plan: results[1][0].client_plan,
                phone: results[1][0].client_mobile,
                country: results[1][0].client_country,
                region: results[1][0].client_region,
                dob: results[1][0].client_dob,
                exp: results[1][0].client_expiry_date,
                client_pause_email: days,
                never_promo: results[1][0].never_promo,
                promo_seen: results[1][0].promo_seen,
              };

              res.status(200).send({
                status: 200,
                response: response,
                message: "verification Done",
              });

              let mailOptions2 = {
                from: "PTP TIPS Team <support@ptptips.com.au>",
                to: results[1][0].client_email,
                subject: "Welcome to PTP TIPS",
                html: mailerConfig.templates.welcome(
                  results[1][0].client_firstName,
                  results[1][0].client_expiry_date,
                  results[3][0].details
                ),
              };

              mailerConfig.smtpTransport.sendMail(mailOptions2, (err, resp) => {
                if (err) {
                  recordUnsentEmail(results[1][0].client_email, "welcome");
                  console.log(
                    "error sending welcome email to a new client is registered " +
                      results[1][0].client_email
                  );
                } else {
                  console.log(
                    "welcome email to a new client is registered " +
                      results[1][0].client_email
                  );
                  recordEmailSent(1, "welcome");
                }
              });

              let mailOptions3 = {
                from: "PTP TIPS Team <support@ptptips.com.au>",
                to: "support@ptptips.com.au; pasttheposttips@gmail.com",
                subject: "Client Registered Successfully",
                html: mailerConfig.templates.clientRegistration(
                  JSON.stringify(results[1][0])
                ),
              };

              mailerConfig.smtpTransport.sendMail(mailOptions3, (err, resp) => {
                if (err) {
                  recordUnsentEmail("support@ptptips.com.au", "registration");
                  console.log(
                    "error sending support a new client is registered"
                  );
                } else {
                  console.log("done");
                  recordEmailSent(1, "registration");
                }
              });
            } else {
              res.status(200).send({
                status: 500,
                message:
                  "Something went wrong, please contact customer support.",
              });
            }
          }
        });
      } else {
        // the user has been already verified
        const stages = "Sign In Auto Email Verify";
        let autoSignIn =
          "SELECT * FROM client WHERE client_id=" +
          decryptedData +
          ";\
                      INSERT INTO client_activity(activity_time, activity_type, client_id, client_platform, client_browser, client_ip)\
                                        VALUES('" +
          today +
          "','" +
          stages +
          "'," +
          decryptedData +
          ",'" +
          platform +
          "','" +
          browser +
          "','" +
          ip +
          "');\
                      SELECT * from package WHERE status =1;";
        connection.query(autoSignIn, function (error, results, fields) {
          if (error) {
            res.status(500).send({
              message: "Error auto SignIn client !",
            });
            console.log(
              "autoSignIn of id: " + decryptedData + " error " + error
            );
          } else {
            if (results[0].length > 0) {
              let days = [];
              if (results[0][0].client_pause_email) {
                for (
                  let i = 0;
                  i < results[0][0].client_pause_email.length;
                  i++
                ) {
                  days.push(results[0][0].client_pause_email[i]);
                }
              } else {
                days = [];
              }

              var encryptedPass = encryptPass(results[0][0].client_password);
              let response = {
                id: results[0][0].client_id,
                first_name: results[0][0].client_firstName,
                last_name: results[0][0].client_lastName,
                email: results[0][0].client_email,
                password: encryptedPass,
                plan: results[0][0].client_plan,
                phone: results[0][0].client_mobile,
                country: results[0][0].client_country,
                region: results[0][0].client_region,
                dob: results[0][0].client_dob,
                exp: results[0][0].client_expiry_date,
                client_pause_email: days,
                never_promo: results[0][0].never_promo,
                promo_seen: results[0][0].promo_seen,
              };

              res.status(200).send({
                status: 300,
                response: response,
                message: "verification Done",
              });
            } else {
              res.status(200).send({
                status: 500,
                message:
                  "Something went wrong, please contact customer support.",
              });
            }
          }
        });
      }
    }
  });
};

// FORGOT PASSWORD
exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  // get the user id
  let getUserId =
    "SELECT client_id FROM client WHERE client_email='" + email + "';";
  connection.query(getUserId, function (error, results, fields) {
    if (error) {
      res.status(200).send({
        status: 500,
        message: "Server Error, please contact customer support",
      });
      console.log("forgot pass of email: " + email + " error " + error);
    } else {
      if (results.length > 0) {
        let clientID = results[0].client_id;
        // generate an encrypted link for forgot password
        // Encrypt the client id
        var encID = CryptoJS.AES.encrypt(
          JSON.stringify(clientID),
          "PTP@TIPS@ENCRYPTION"
        ).toString();
        var encryption = encID
          .toString()
          .replace(/\+/g, "xMl3Jk")
          .replace(/\//g, "Por21Ld")
          .replace("=", "Ml32");

        let link = "https://www.ptptips.com.au/forgotPassword/" + encryption;
        let mailOptions = {
          from: "PTP TIPS TEAM <support@ptptips.com.au>",
          to: email,
          subject: "PTP TIPS Reset Account Password",
          html: mailerConfig.templates.forgotClientPassword(link),
        };
        mailerConfig.smtpTransport.sendMail(mailOptions, (err, resp) => {
          if (err) {
            recordUnsentEmail(email, "forgotPassword");
            res.status(200).send({
              status: 500,
              message:
                "Error occured while sending the forgot password email. Please contact custumer support.",
            });
            console.log(
              "mailer error email, forgot password email not sent to: " +
                email +
                " error: " +
                err
            );
          } else {
            res.status(200).send({
              status: 200,
              message: "Please check your inbox.",
            });
            console.log("forgot password email sent to: " + email);
            recordEmailSent(1, "forgotPassword");
          }
        });
      } else {
        res.status(200).send({
          status: 400,
          message: "Email does not exist, please register with this account",
        });
        console.log(
          "email: " + email + " try forgot pass but he is not registered "
        );
      }
    }
  });
};

// RESET PASSWORD
exports.resetPass = (req, res) => {
  const { id, pass } = req.body;

  const ipInfo = req.ipInfo;
  const browser = req.useragent.browser + " " + req.useragent.version;
  const platform = req.useragent.os;
  const ip = ipInfo.ip === "::1" ? "localhost" : ipInfo.ip;
  var today = moment().tz("Australia/Sydney").format("YYYY-MM-DD HH:mm:ss");
  let stage = "Password Reset";

  var replacement = id
    .replace(/xMl3Jk/g, "+")
    .replace(/Por21Ld/g, "/")
    .replace("Ml32", "=");
  // Decrypt
  var bytes = CryptoJS.AES.decrypt(replacement, "PTP@TIPS@ENCRYPTION");
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  bcrypt.hash(pass, 10, function (err, hashPass) {
    // Check for hashing error
    if (err) {
      console.log("Password Hashing Error: " + err);
      return res.status(200).send({
        status: 500,
        message: "Password error. Please Contact Customer Support.",
      });
    } else {
      let changePassword =
        "UPDATE client SET client_password = '" +
        pass +
        "', client_password_hash ='" +
        hashPass +
        "', client_is_active = 1 \
                            WHERE client_id=" +
        decryptedData +
        ";\
                            SELECT * FROM client WHERE client_id = " +
        decryptedData +
        " AND client_is_verified = 1;\
                            INSERT INTO client_activity(activity_time, activity_type, client_id, client_platform, client_browser, client_ip)\
                            VALUES('" +
        today +
        "','" +
        stage +
        "'," +
        decryptedData +
        ",'" +
        platform +
        "','" +
        browser +
        "','" +
        ip +
        "');";
      connection.query(changePassword, function (error, results, fields) {
        if (error) {
          res.status(200).send({
            status: 500,
            message:
              "Error changing user password! Please Contact Customer Support.",
          });
          console.log("reset pass of id: " + decryptedData + " error " + error);
        } else {
          if (results[1].length > 0) {
            let clientEmail = results[1][0].client_email;
            let clientName = results[1][0].client_firstName;

            let days = [];
            if (results[1][0].client_pause_email) {
              for (
                let i = 0;
                i < results[1][0].client_pause_email.length;
                i++
              ) {
                days.push(results[1][0].client_pause_email[i]);
              }
            } else {
              days = [];
            }

            // Send back data
            var encryptedPass = encryptPass(results[1][0].client_password);
            let response = {
              id: results[1][0].client_id,
              first_name: results[1][0].client_firstName,
              last_name: results[1][0].client_lastName,
              email: results[1][0].client_email,
              password: encryptedPass,
              plan: results[1][0].client_plan,
              phone: results[1][0].client_mobile,
              country: results[1][0].client_country,
              region: results[1][0].client_region,
              dob: results[1][0].client_dob,
              exp: results[1][0].client_expiry_date,
              client_pause_email: days,
              never_promo: results[1][0].never_promo,
              promo_seen: results[1][0].promo_seen,
            };

            let mailOptions = {
              from: "PTP TIPS Team <support@ptptips.com.au>",
              to: clientEmail,
              subject: "PTP TIPS Reset Password",
              html: mailerConfig.templates.passwordReset(pass),
            };
            mailerConfig.smtpTransport.sendMail(mailOptions, (err, resp) => {
              if (err) {
                recordUnsentEmail(clientEmail, "passwordReset");
                res.status(200).send({
                  status: 500,
                  message:
                    "Error occurred while sending the reset password email. Please contact customer support",
                });
                console.log(
                  "mailer error email, reset password email not sent to: " +
                    email +
                    " error: " +
                    err
                );
              } else {
                res.status(200).send({
                  status: 200,
                  message:
                    "Password Reset Success. Please login with your new password.",
                  response: response,
                });
                console.log("Verification email sent to: " + email);
                recordEmailSent(1, "passwordReset");
              }
            });
          } else {
            res.status(200).send({
              status: 400,
              message:
                "Please complete your registration, verify your email and then try again.",
            });
          }
        }
      });
    }
  });
};

exports.test = (req, res) => {
  let mailOptions2 = {
    from: "PTP TIPS Team <support@ptptips.com.au>",
    to: "elmirnicolas@gmail.com",
    subject: "Welcome to PTP TIPS",
    html: mailerConfig.templates.selectionsEmail("https://jedo.app"),
  };

  mailerConfig.smtpTransport.sendMail(mailOptions2, (err, resp) => {
    if (err) {
      recordUnsentEmail("email", "welcome");
      console.log("error sending welcome email to a new client is registered");
    } else {
      console.log("done");
      recordEmailSent(1, "welcome");
    }
  });
};

exports.saveSessionID = (req, res) => {
  const { sessionID } = req.body;
  const { clientID } = req.body;
  let sql = `update client set session_id = "${sessionID}" where client_id = ${clientID}`;
  // console.log(sql);
  connection.query(sql, (err, result) => {
    if (err) {
      console.log("ERROR => error setting session id");
    }
  });
};

exports.getSessionID = (req, res) => {
  const { clientID } = req.body;
  let sql = `select * from client where client_id = ${clientID}`;
  // console.log(sql);
  connection.query(sql, (err, result) => {
    if (err) throw err;
    let data = {
      status: 200,
      info: result,
    };
    res.status(200).send(data);
  });
};

exports.monthlySelections = (req, res) => {
  let sql = "call monthly_selection_rate";

  connection.query(sql, (err, result) => {
    if (err) throw err;
    let data = {
      status: 200,
    };
    console.log("monthly updated");
  });
};

// RESET PASSWORD
//exports.test = (req, res) => {
//console.log(getStripeProduct('month'))

//}

//Updating mailing dates (hady)
exports.updateMailingDates = (req, res) => {
  const { mailer, clientId } = req.body;
  let updateMailerDates;

  if (mailer.length === 0) {
    updateMailerDates =
      "UPDATE client SET client_pause_email=" +
      null +
      " WHERE client_id=" +
      clientId +
      ";\
                          SELECT * FROM client WHERE client_id=" +
      clientId +
      ";";
  } else {
    updateMailerDates =
      "UPDATE client SET client_pause_email='" +
      JSON.stringify(mailer) +
      "' WHERE client_id=" +
      clientId +
      ";\
                          SELECT * FROM client WHERE client_id=" +
      clientId +
      ";";
  }

  connection.query(updateMailerDates, function (error, results, fields) {
    if (error) {
      res.status(500).send({
        message:
          "ERROR UPDATING MAIL PAUSE DAYS, PLEASE CONTACT CUSTOMER SUPPORT",
      });
    } else {
      console.log(results[1][0].client_pause_email);
      let days = [];
      if (results[1][0].client_pause_email) {
        for (let i = 0; i < results[1][0].client_pause_email.length; i++) {
          days.push(results[1][0].client_pause_email[i]);
        }
      }

      var encryptedPass = encryptPass(results[1][0].client_password);
      let response = {
        id: results[1][0].client_id,
        first_name: results[1][0].client_firstName,
        last_name: results[1][0].client_lastName,
        email: results[1][0].client_email,
        password: encryptedPass,
        plan: results[1][0].client_plan,
        phone: results[1][0].client_mobile,
        country: results[1][0].client_country,
        region: results[1][0].client_region,
        dob: results[1][0].client_dob,
        exp: results[1][0].client_expiry_date,
        client_pause_email: days,
        never_promo: results[1][0].never_promo,
        promo_seen: results[1][0].promo_seen,
      };
      console.log(response);

      res.status(200).send({
        status: 200,
        message: "SELECTED DAYS updated successfully.",
        response: response,
      });
    }
  });
};

// Unsubscribe a user from email
exports.unsubscribeEmail = (req, res) => {
  //decrypt clientId
  var input = req.params.id;
  var replacement = input
    .replace(/xMl3Jk/g, "+")
    .replace(/Por21Ld/g, "/")
    .replace("Ml32", "=");
  // Decrypt
  var bytes = CryptoJS.AES.decrypt(replacement, "PTP@TIPS@ENCRYPTION");
  var clientID = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  const days = [0, 1, 2, 3, 4, 5, 6];
  let activityType = "Unsubscribe Emails";
  var today = moment().tz("Australia/Sydney").format("YYYY-MM-DD HH:mm:ss");
  const ipInfo = req.ipInfo;
  const browser = req.useragent.browser + " " + req.useragent.version;
  const platform = req.useragent.os;
  const ip = ipInfo.ip === "::1" ? "localhost" : ipInfo.ip;

  let unsubscribeUser =
    "UPDATE client SET client_pause_email ='" +
    JSON.stringify(days) +
    "', client_is_verified = 1 WHERE client_id=" +
    clientID +
    ";\
                        INSERT INTO client_activity(activity_time, activity_type, client_id, client_platform, client_browser, client_ip)\
                        VALUES('" +
    today +
    "','" +
    activityType +
    "'," +
    clientID +
    ",'" +
    platform +
    "','" +
    browser +
    "','" +
    ip +
    "');";
  connection.query(unsubscribeUser, function (error, results, fields) {
    if (error) {
      console.log("unsubscribe from email error: " + error);
      return res.status(200).send({
        status: 500,
        message: "An error has occurred. Please contact customer support.",
      });
    } else {
      return res.status(200).send({
        status: 200,
        message: "You have been unsubscribed successfully.",
      });
    }
  });
};

// Unsubscribe a user from email
exports.subscribeEmail = (req, res) => {
  //decrypt clientId
  var input = req.params.id;
  var replacement = input
    .replace(/xMl3Jk/g, "+")
    .replace(/Por21Ld/g, "/")
    .replace("Ml32", "=");
  // Decrypt
  var bytes = CryptoJS.AES.decrypt(replacement, "PTP@TIPS@ENCRYPTION");
  var clientID = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  let activityType = "Subscribe Emails";
  var today = moment().tz("Australia/Sydney").format("YYYY-MM-DD HH:mm:ss");
  const ipInfo = req.ipInfo;
  const browser = req.useragent.browser + " " + req.useragent.version;
  const platform = req.useragent.os;
  const ip = ipInfo.ip === "::1" ? "localhost" : ipInfo.ip;

  let subscribeUser =
    "UPDATE client SET client_pause_email = null WHERE client_id=" +
    clientID +
    ";\
                        INSERT INTO client_activity(activity_time, activity_type, client_id, client_platform, client_browser, client_ip)\
                        VALUES('" +
    today +
    "','" +
    activityType +
    "'," +
    clientID +
    ",'" +
    platform +
    "','" +
    browser +
    "','" +
    ip +
    "');";
  connection.query(subscribeUser, function (error, results, fields) {
    if (error) {
      console.log("subscribe from email error: " + error);
      return res.status(200).send({
        status: 500,
        message: "An error has occurred. Please contact customer support.",
      });
    } else {
      return res.status(200).send({
        status: 200,
        message: "You have been resubscribed successfully.",
      });
    }
  });
};

// USER COMING FROM EMAIL PROMO CHECK, VERIFY AND SIGN
exports.checkUserAndVerify = (req, res) => {
  //decrypt clientId
  var input = req.params.id;
  var replacement = input
    .replace(/xMl3Jk/g, "+")
    .replace(/Por21Ld/g, "/")
    .replace("Ml32", "=");
  // Decrypt
  var bytes = CryptoJS.AES.decrypt(replacement, "PTP@TIPS@ENCRYPTION");
  var clientID = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  let activityType = "Sign In Email Promo";
  var today = moment().tz("Australia/Sydney").format("YYYY-MM-DD HH:mm:ss");
  const ipInfo = req.ipInfo;
  const browser = req.useragent.browser + " " + req.useragent.version;
  const platform = req.useragent.os;
  const ip = ipInfo.ip === "::1" ? "localhost" : ipInfo.ip;

  let getSubscriptionPlan = "SELECT * from package WHERE status =1;";
  connection.query(getSubscriptionPlan, function (error, resultss, fields) {
    if (error) {
      console.log("getSubscriptionPlan error " + error);
      return res.status(500).send({
        message: "Error verifying client !",
      });
    } else {
      var endSubscription = clientExpiry(resultss[0].pack_validity);
      let updateAndGetInfo =
        "UPDATE client SET client_is_verified = 1, client_expiry_date = IF(client_expiry_date IS NOT NULL, client_expiry_date, '" +
        endSubscription +
        "')  WHERE client_id=" +
        clientID +
        ";\
                              INSERT INTO client_activity(activity_time, activity_type, client_id, client_platform, client_browser, client_ip)\
                              VALUES('" +
        today +
        "','" +
        activityType +
        "'," +
        clientID +
        ",'" +
        platform +
        "','" +
        browser +
        "','" +
        ip +
        "');\
                              SELECT * from client WHERE client_id=" +
        clientID +
        ";\
                              UPDATE client SET client_first_click_email = client_first_click_email + 1 WHERE client_id=" +
        clientID +
        ";";

      connection.query(updateAndGetInfo, function (error, results, fields) {
        if (error) {
          console.log("subscribe from email error: " + error);
          return res.status(200).send({
            status: 500,
            message: "An error has occurred. Please contact customer support.",
          });
        } else {
          if (results[2].length > 0) {
            let days = [];
            if (results[2][0].client_pause_email) {
              for (
                let i = 0;
                i < results[2][0].client_pause_email.length;
                i++
              ) {
                days.push(results[2][0].client_pause_email[i]);
              }
            }

            var encryptedPass = encryptPass(results[2][0].client_password);

            let response = {
              id: results[2][0].client_id,
              first_name: results[2][0].client_firstName,
              last_name: results[2][0].client_lastName,
              email: results[2][0].client_email,
              password: encryptedPass,
              plan: results[2][0].client_plan,
              phone: results[2][0].client_mobile,
              country: results[2][0].client_country,
              region: results[2][0].client_region,
              dob: results[2][0].client_dob,
              exp: results[2][0].client_expiry_date,
              client_pause_email: days,
              never_promo: results[2][0].never_promo,
              promo_seen: results[2][0].promo_seen,
            };

            console.log(
              "user with email " +
                results[2][0].client_email +
                " just logged in"
            );

            return res.status(200).send({
              status: 200,
              response: response,
              emailClick: results[2][0].client_first_click_email,
            });
          } else {
            res.status(200).send({
              status: 400,
              message: "No User Found",
            });
          }
        }
      });
    }
  });
};

exports.updatePromo = (req, res) => {
  const { neverPromo, clientId, affiliate } = req.body;

  let updatePromo;
  if (affiliate === "unibet") {
    let activityType = "Affiliate Promo";
    var today = moment().tz("Australia/Sydney").format("YYYY-MM-DD HH:mm:ss");
    const ipInfo = req.ipInfo;
    const browser = req.useragent.browser + " " + req.useragent.version;
    const platform = req.useragent.os;
    const ip = ipInfo.ip === "::1" ? "localhost" : ipInfo.ip;

    updatePromo =
      "UPDATE client SET never_promo=" +
      neverPromo +
      ", promo_seen = promo_seen + 1 WHERE client_id=" +
      clientId +
      ";\
                    SELECT * FROM client WHERE client_id=" +
      clientId +
      ";\
                    INSERT INTO client_activity(activity_time, activity_type, client_id, client_platform, client_browser, client_ip, client_bookie_frwd)\
                    VALUES('" +
      today +
      "','" +
      activityType +
      "'," +
      clientId +
      ",'" +
      platform +
      "','" +
      browser +
      "','" +
      ip +
      "', 'Unibet');";
  } else {
    updatePromo =
      "UPDATE client SET never_promo=" +
      neverPromo +
      ", promo_seen = promo_seen + 1 WHERE client_id=" +
      clientId +
      ";\
                  SELECT * FROM client WHERE client_id=" +
      clientId +
      ";";
  }

  connection.query(updatePromo, function (error, results, fields) {
    if (error) {
      res.status(500).send({
        message:
          "ERROR UPDATING MAIL PAUSE DAYS, PLEASE CONTACT CUSTOMER SUPPORT",
      });
    } else {
      // console.log(results[1][0].client_pause_email)
      let days = [];
      if (results[1][0].client_pause_email) {
        for (let i = 0; i < results[1][0].client_pause_email.length; i++) {
          days.push(results[1][0].client_pause_email[i]);
        }
      }

      var encryptedPass = encryptPass(results[1][0].client_password);
      let response = {
        id: results[1][0].client_id,
        first_name: results[1][0].client_firstName,
        last_name: results[1][0].client_lastName,
        email: results[1][0].client_email,
        password: encryptedPass,
        plan: results[1][0].client_plan,
        phone: results[1][0].client_mobile,
        country: results[1][0].client_country,
        region: results[1][0].client_region,
        dob: results[1][0].client_dob,
        exp: results[1][0].client_expiry_date,
        client_pause_email: days,
        never_promo: results[1][0].never_promo,
        promo_seen: results[1][0].promo_seen,
      };
      res.status(200).send({
        status: 200,
        message: "SELECTED DAYS updated successfully.",
        response: response,
      });
    }
  });
};

//UPDATE USER FIRSTNAME AND LASTNAME
exports.updateUserName = (req, res) => {
  const { firstName, lastName, email } = req.body;

  console.log(firstName + " " + lastName + " " + email);

  let updateUser =
    "UPDATE client SET client_firstName='" +
    firstName +
    "', client_lastName='" +
    lastName +
    "'\
                  WHERE client_email='" +
    email +
    "';";

  connection.query(updateUser, function (error, results, fields) {
    if (error) {
      res.status(200).send({
        status: 500,
        message: "Failed to update info client with email " + email,
      });
      console.log(
        "Failed to update info client with email " + email + " error: " + error
      );
    } else {
      res.status(200).send({
        status: 200,
        message: "User info updated",
      });
    }
  });
};

//GET DEFAUL SUBSCRIPTION PLAN
exports.getSubscriptionPlan = (req, res) => {
  let getSubscription = "SELECT details FROM package WHERE status = 1;";

  connection.query(getSubscription, function (error, results, fields) {
    if (error) {
      res.status(200).send({
        status: 500,
        message: "Failed to get subscription plan",
      });
      console.log("Failed to get subscription plan error: " + error);
    } else {
      res.status(200).send({
        status: 200,
        data: results,
      });
    }
  });
};

//REGISTER USER COMMING FROM PROMOTION FACEBOOK
exports.userCommingfromPromo = (req, res) => {
  const { promoId } = req.body;
  console.log(promoId);
  var today = moment().tz("Australia/Sydney").format("YYYY-MM-DD HH:mm:ss");
  const ipInfo = req.ipInfo;
  const browser = req.useragent.browser + " " + req.useragent.version;
  const platform = req.useragent.os;
  const ip = ipInfo.ip === "::1" ? "localhost" : ipInfo.ip;

  let insertPromo =
    "INSERT INTO advertisements(ads_id, ads_time, client_platform, client_browser, client_ip)\
                          VALUES('" +
    promoId +
    "','" +
    today +
    "','" +
    platform +
    "','" +
    browser +
    "','" +
    ip +
    "');";

  connection.query(insertPromo, function (error, results, fields) {
    if (error) {
      res.status(200).send({
        status: 500,
        message: "Failed to insertPromo",
      });
      console.log("Failed insertPromo error: " + error);
    } else {
      res.status(200).send({
        status: 200,
      });
    }
  });
};

// register and push a race notification for a user
exports.notifyMe = (req, res) => {
  const {
    subscription,
    timer,
    email,
    venue,
    raceNumber,
    link,
    name,
    meetdate,
    race_time,
  } = req.body;
  const publicVapidKey = mailerConfig.publicVapidKey;
  const privateVapidKey = mailerConfig.privateVapidKey;
  //console.log(race_time)
  var now = moment().format(`${meetdate} ${race_time}`);
  var setTimer = moment(now)
    .subtract(timer, "minutes")
    .format(`YYYY-MM-DD HH:mm:ss`);
  //var setTimer = moment().add(5, 'seconds').format(`YYYY-MM-DD HH:mm:ss`)
  schedule.scheduleJob(setTimer, async () => {
    pushNotificationTimer(
      publicVapidKey,
      privateVapidKey,
      subscription,
      email,
      venue,
      raceNumber,
      link,
      name
    );
  });
  console.log("timer notification trigger at " + setTimer);
  // Send 201 - resource created
  res.status(201).json({});
};

function pushNotificationTimer(
  publicVapidKey,
  privateVapidKey,
  subscription,
  email,
  venue,
  raceNumber,
  link,
  name
) {
  webpush.setVapidDetails(
    "mailto:support@ptptips.com.au",
    publicVapidKey,
    privateVapidKey
  );

  // Create payload
  const payload = JSON.stringify({
    title: "PTP Tips",
    name: name,
    venue: venue,
    race: raceNumber,
    link: link,
  });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));

  //send email also
  let mailOptions = {
    from: "PTP TIPS Team <support@ptptips.com.au>",
    to: email,
    subject: "PTP TIPS notification",
    html: mailerConfig.templates.notification(name, venue, raceNumber, link),
  };
  mailerConfig.smtpTransport.sendMail(mailOptions, (err, resp) => {
    if (err) {
      console.log(
        "notification email error, wrong credential email not sent to: " +
          email +
          " error: " +
          err
      );
      recordUnsentEmail(email, "wrong credentials");
    } else {
      console.log("notification email has been sent to " + email);
      recordEmailSent(1, "wrong credentials");
    }
  });
}
