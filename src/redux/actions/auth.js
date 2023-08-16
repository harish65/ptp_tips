//import { toast } from 'react-toastify';
import {
  loginUser,
  alreadyLoggedIn,
  logoutUserAPI,
  forgotPass,
  resetPassword,
  cancelSubscription,
  updateUserName,
  getSubscription,
} from "../../config/config";
// contactUs,
import moment from "moment-timezone";
// import { v4 as uuidv4 } from "uuid";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT_USER = "LOGOUT_USER";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const VERIFY_ACTIVE_STEP = "VERIFY_ACTIVE_STEP";
export const UPDATE_ACTIVE_STEP = "UPDATE_ACTIVE_STEP";
export const UPDATE_PAYMENT_STEP = "UPDATE_PAYMENT_STEP";
export const FORGOT_PASS_ERROR = "FORGOT_PASS_ERROR";
export const FORGOT_PASS_SUCCESS = "FORGOT_PASS_SUCCESS";
export const RESET_PASS_SUCCESS = "RESET_PASS_SUCCESS";
export const RESET_PASS_ERROR = "RESET_PASS_ERROR";
export const CLEAN_MESSAGES = "CLEAN_MESSAGES";
export const UNSUBSCRIBE_SUCCESS = "UNSUBSCRIBE_SUCCESS";
export const UNSUBSCRIBE_ERROR = "UNSUBSCRIBE_ERROR";
export const NEW_SIGNUP = "NEW_SIGNUP";
export const NEW_SIGNUP_CLOSE = "NEW_SIGNUP_CLOSE";
export const CHECK_SESSION_ID = "CHECK_SESSION_ID";
export const PROFILE_INFO_CLOSE = "PROFILE_INFO_CLOSE";
export const SUBSCRIPTION_PLAN = "SUBSCRIPTION_PLAN";
export const CHANGE_NAV_TAB = "CHANGE_NAV_TAB";
export const HEADER_LOGO_CHANGE = "HEADER_LOGO_CHANGE";

export const CHANGE_THEME = "CHANGE_THEME";

const loginResponse = (response) => {
  console.log("response", response)
  let userDetails = {
    id: response?.id,
    token: response?.token,
    firstName: response?.first_name,
    lastName: response?.last_name,
    email: response?.email,
    password: response?.password,
    plan: response?.plan,
    phone: response?.phone,
    country: response?.country,
    region: response?.region,
    dob: response?.dob,
    exp: response?.exp,
    email_pause: response?.client_pause_email,
    never_promo: response?.never_promo,
    promo_seen: response?.promo_seen,
    client_role: response?.client_role,
    customer_id: response?.customer_id
  };
  return userDetails;
};

export function loginClient(creds, history) {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOGIN_REQUEST,
      });
      await loginUser(creds).then((response) => {
        if (response.message) {
          let message = response.message;
          let status = response.status;

          dispatch({
            type: LOGIN_ERROR,
            payload: {
              message,
              status,
            },
          });
          return;
        } else {
          localStorage.setItem("PTPToken", response?.token);
          //generateUserSession(response);
          let resp = loginResponse(response);
          let isExpired;
          if (
            moment(resp.exp).tz("Australia/Sydney") >
            moment().tz("Australia/Sydney")
          ) {
            isExpired = false;
          } else {
            isExpired = true;
          }

          let firstName;
          if (response.first_name) {
            firstName = true;
          } else {
            firstName = false;
          }

          dispatch({
            type: LOGIN_SUCCESS,
            payload: {
              resp,
              isExpired,
              firstName,
            },
          });
          //let today = moment().tz('Australia/Sydney').format("YYYY-MM-DD")
          // history.push(`/selections/${today}`)
          return;
        }
      });
    } catch (error) {
      let message =
        "Error sign in, please try again or contact customer support.";
      //toast.error(message)
      //console.log('Init error ' + error)
      dispatch({
        type: LOGIN_ERROR,
        payload: {
          message,
        },
      });
    }
  };
}

export function doInit() {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("PTPToken");

      await getSubscription().then((response) => {
        dispatch({
          type: SUBSCRIPTION_PLAN,
          payload: {
            subscription: response.data[0].details,
          },
        });
      });

      if (token) {
        dispatch({
          type: LOGIN_REQUEST,
        });
        let tok = JSON.parse(token);
        await alreadyLoggedIn({
          email: tok.email,
          password: tok.password,
        }).then((response) => {
          if (response.status === 200) {
            //generateUserSession(response.data);
            let resp = loginResponse(response.data);

            let isExpired;
            if (
              moment(resp.exp).tz("Australia/Sydney") >
              moment().tz("Australia/Sydney")
            ) {
              isExpired = false;
            } else {
              isExpired = true;
            }

            let firstName;
            if (response.data.first_name) {
              firstName = true;
            } else {
              firstName = false;
            }

            dispatch({
              type: LOGIN_SUCCESS,
              payload: {
                resp,
                isExpired,
                firstName,
              },
            });
          } else {
            dispatch(logoutUser(tok.email));
            // console.log(response.message)
            // if (response.message === 'Logout') {
            //   // forces log out for the user
            //   dispatch(logoutUser(tok.email))
            // } else if (response.message === 'Account Expired') {
            //   dispatch(logoutUser(tok.email))
            //   let id = response.id
            //   dispatch({
            //     type: VERIFY_ACTIVE_STEP,
            //     id
            //   });
            //   return
            // } else {
            //   return
            // }
          }
        });
      } else {
        return;
      }
    } catch (error) {
      console.log("No auto login found");
    }
  };
}

export function logoutUser(email) {
  return async (dispatch) => {
    localStorage.removeItem("PTPToken");
    dispatch({
      type: LOGOUT_USER,
    });
    await logoutUserAPI({ email: email })
      .then((response) => {
        if (response.message === "OK") {
          localStorage.removeItem("PTPToken");
          dispatch({
            type: LOGOUT_USER,
          });
        } else if (response.message === "ERROR LOGOUT") {
          localStorage.removeItem("PTPToken");
          dispatch({
            type: LOGOUT_USER,
          });
        } else {
          // console.log(response.message)
        }
      })
      .catch((err) => {
        //toast.error('Logout error, please try again.')
        console.log("Logout error " + err);
      });
  };
}

//export function contactUsPTP(data, history) {
//  return async (dispatch) => {
//    await contactUs(data).then(response => {
//      if (response.message === 'OK') {
//        //history.push('/')
//        return 'OK'
//      } else {
//        return 'ERROR'
//      }
//    }).catch(err => {
//      toast.error('An error occurred with connection, please try again.')
//      console.log('Contact Us error ' + err)
//      return 'ERROR'
//    })
//  };
//}

export function updateRedProfile(data, user) {
  //console.log(data)
  return async (dispatch) => {
    let update = {
      id: user.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: user.email,
      password: user.password,
      plan: user.plan,
      phone: data.phone,
      country: data.country,
      region: data.region,
      dob: data.dob,
      exp: user.exp,
      email_pause: data.email_pause,
    };
    dispatch({
      type: UPDATE_PROFILE,
      update,
    });
  };
}

export function updateMailPause(data) {
  return async (dispatch) => {
    let update = loginResponse(data);
    dispatch({
      type: UPDATE_PROFILE,
      update,
    });
  };
}
export function updatePromo(data) {
  return async (dispatch) => {
    let update = loginResponse(data);
    dispatch({
      type: UPDATE_PROFILE,
      update,
    });
  };
}

export function verifyActiveStep(id) {
  return async (dispatch) => {
    dispatch({
      type: VERIFY_ACTIVE_STEP,
      id,
    });
  };
}

export function updateActiveStep() {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_ACTIVE_STEP,
    });
  };
}

export function updatePaymentStep() {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_PAYMENT_STEP,
    });
  };
}

export function forgotPassword(email) {
  return async (dispatch) => {
    try {
      await forgotPass(email).then((response) => {
        if (response.status === 200) {
          let message = response.message;
          dispatch({
            type: FORGOT_PASS_SUCCESS,
            message,
          });
          return "Ok";
        } else {
          let message = response.message;
          dispatch({
            type: FORGOT_PASS_ERROR,
            message,
          });
          return;
        }
      });
    } catch (err) {
      let message = "Something went wrong please contact customer support";
      dispatch({
        type: FORGOT_PASS_ERROR,
        message,
      });
    }
  };
}

export function resetPass(id, history) {
  return async (dispatch) => {
    try {
      await resetPassword(id).then((response) => {
        if (response.status === 200) {
          let message = response.message;
          //generateUserSession(response.response);
          let resp = loginResponse(response.response);
          dispatch({
            type: RESET_PASS_SUCCESS,
            message,
          });

          localStorage.removeItem("PTPToken");
          localStorage.setItem("PTPToken", JSON.stringify(response.response));

          let isExpired;
          if (
            moment(resp.exp).tz("Australia/Sydney") >
            moment().tz("Australia/Sydney")
          ) {
            isExpired = false;
          } else {
            isExpired = true;
          }

          let firstName;
          if (response.response.first_name) {
            firstName = true;
          } else {
            firstName = false;
          }

          dispatch({
            type: LOGIN_SUCCESS,
            payload: {
              resp,
              isExpired,
              firstName,
            },
          });

          let today = moment().tz("Australia/Sydney").format("YYYY-MM-DD");
          history.push(`/selections/${today}`);
          return;
        } else {
          let message = response.message;
          dispatch({
            type: RESET_PASS_ERROR,
            message,
          });
          return;
        }
      });
    } catch (err) {
      let message = "Something went wrong please contact customer support";
      dispatch({
        type: RESET_PASS_ERROR,
        message,
      });
    }
  };
}

export function cleanMessages() {
  return async (dispatch) => {
    dispatch({
      type: CLEAN_MESSAGES,
    });
  };
}

export function signInAfterRegistration(response) {
  return async (dispatch) => {
    //console.log('login after signup')
    localStorage.removeItem("PTPToken");
    localStorage.setItem("PTPToken", JSON.stringify(response));

    let resp = loginResponse(response);

    let isExpired;
    if (
      moment(resp.exp).tz("Australia/Sydney") > moment().tz("Australia/Sydney")
    ) {
      isExpired = false;
    } else {
      isExpired = true;
    }

    let firstName;
    if (response.first_name) {
      firstName = true;
    } else {
      firstName = false;
    }

    //generateUserSession(response);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        resp,
        isExpired,
        firstName,
      },
    });
    dispatch({
      type: NEW_SIGNUP,
    });
  };
}

export function signInCommingFromEmail(response) {
  return async (dispatch) => {
    localStorage.removeItem("PTPToken");
    localStorage.setItem("PTPToken", JSON.stringify(response));

    let resp = loginResponse(response);

    let isExpired;
    if (
      moment(resp.exp).tz("Australia/Sydney") > moment().tz("Australia/Sydney")
    ) {
      isExpired = false;
    } else {
      isExpired = true;
    }

    let firstName;
    if (response.first_name) {
      firstName = true;
    } else {
      firstName = false;
    }

    //generateUserSession(response);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        resp,
        isExpired,
        firstName,
      },
    });
  };
}

export function closeNewUserPopup() {
  return async (dispatch) => {
    dispatch({
      type: NEW_SIGNUP_CLOSE,
    });
  };
}

export function closeProfileInfoPopup(firstName, lastName, data) {
  return async (dispatch) => {
    if (firstName !== "") {
      await updateUserName({
        firstName: firstName,
        lastName: lastName,
        email: data.email,
      }).then((resp) => {
        if (resp.status === 200) {
          let update = {
            id: data.id,
            firstName: firstName,
            lastName: lastName,
            email: data.email,
            password: data.password,
            plan: data.plan,
            phone: data.phone,
            country: data.country,
            region: data.region,
            dob: data.dob,
            exp: data.exp,
            email_pause: data.email_pause,
          };
          dispatch({
            type: UPDATE_PROFILE,
            update,
          });
        }
        dispatch({
          type: PROFILE_INFO_CLOSE,
        });
      });
    } else {
      dispatch({
        type: PROFILE_INFO_CLOSE,
      });
    }
  };
}

export function unsubscribe(email) {
  return async (dispatch) => {
    await cancelSubscription(email)
      .then((resp) => {
        if (resp.status === 200) {
          let message = resp.message;
          dispatch({
            type: UNSUBSCRIBE_SUCCESS,
            message,
          });
          dispatch(logoutUser(email.email));
        } else {
          let message = resp.message;
          dispatch({
            type: UNSUBSCRIBE_ERROR,
            message,
          });
        }
      })
      .catch((err) => {
        let message =
          "Something Went wrong, please try again or contact customer support.";
        dispatch({
          type: UNSUBSCRIBE_ERROR,
          message,
        });
      });
  };
}

//export function checkSessID(clientID) {
//  return async (dispatch) => {
//    try {
//      const response = await checkSessionID(clientID);
//      dispatch({
//        type: CHECK_SESSION_ID,
//        payload: {
//          clientSession: response.info[0],
//        },
//      });
//    } catch (error) {
//      console.log(error);
//    }
//  };
//}

export function changeTheme(data) {
  return async (dispatch) => {
    dispatch({
      type: CHANGE_THEME,
      payload: {
        dark: data,
      },
    });
  };
}

export function changeNavTab(data) {
  return async (dispatch) => {
    dispatch({
      type: CHANGE_NAV_TAB,
      payload: {
        navTab: data,
      },
    });
  };
}

export function headerLogoChange(data) {
  return async (dispatch) => {
    dispatch({
      type: HEADER_LOGO_CHANGE,
      payload: {
        headerLogo: data,
      },
    });
  };
}

//function generateUserSession(response) {
//  let sessionID = uuidv4();
//  let data = {
//    sessionID: sessionID,
//    clientID: response.id,
//  };

//  // SAVE A SESSION ID INTO THE DB.
//  saveSessionID(data);
//  localStorage.setItem("PTPsessionID", sessionID);
//}
