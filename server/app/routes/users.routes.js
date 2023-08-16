// /////////////////////////////////////////////////////
//              HANDLE ROUTES RELATED TO USERS        //
// /////////////////////////////////////////////////////
var express = require('express');
var router = express.Router();

const auth = require('../../util/auth');
const users = require('../controllers/users.controller');


/* USERS */
// LOGIN
router.post('/login', users.login);

// LOGIN REMEMBER ME
router.post('/alreadyLoggedIn', auth, users.alreadyLoggedIn);

// LOGOUT
router.post('/logoutUser', auth, users.logout);

// CONTACT US
router.post('/contactUs', users.contactUs);

// REGISTER STEP 1 CONTACT INFO
router.post('/registerContact', users.registerContactInfo);

// REGISTER STEP 2 ADDRESS
router.post('/registerAddress', users.registerAddressInfo);

// REGISTER STEP 3 PAYMENT
router.post('/registerPayment', users.registerPayment);

// REGISTER CANCEL SUBSCRIPTION FOR A SPECIFIC USER
router.post('/cancelSubscription', auth, users.cancelSubscription);

// USER UPDATE PROFILE INFO
router.post('/editProfile', auth, users.editProfile);

// USER EMAIL VERIFICATION
router.get('/verify/:id', users.verifyAccount);

// USER FORGOT PASS RESET
router.post('/forgotPass', users.forgotPassword);

// USER PASS RESET
router.post('/resetPassword', users.resetPass);

router.post('/test', users.test);

// SAVE SESSION ID
//router.post("/savesessionid", auth, users.saveSessionID);

// GET SESSION ID
//router.post("/checkSessionID", auth, users.getSessionID);

//UPDATE MAILING DATES
router.post("/updateMail", auth, users.updateMailingDates);

// USER UNSUBSCRIBE FROM EMAILS
router.get("/unsubscribe/:id", users.unsubscribeEmail);

// USER UNSUBSCRIBE FROM EMAILS
router.get("/subscribe/:id", users.subscribeEmail);

//UPDATE USER FIRSTNAME AND LASTNAME
router.post("/updateUserName", auth, users.updateUserName);

// USER COMING FROM EMAIL PROMO CHECK, VERIFY AND SIGN
router.get("/checkUserPromo/:id", users.checkUserAndVerify);

//Promo SEEn Updater
router.post("/seenPromo", users.updatePromo);

// get Subscription Plan
router.get("/getSubscription", users.getSubscriptionPlan);

// facebook Promotion id registration
router.post("/registerAds", users.userCommingfromPromo);

// user triggering a push notification
router.post("/notification", users.notifyMe);



module.exports = router