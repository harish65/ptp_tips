// /////////////////////////////////////////////////////
//              HANDLE ROUTES RELATED TO DATA       //
// /////////////////////////////////////////////////////
var express = require("express");
var router = express.Router();

const auth = require("../../util/auth");
const api = require("../controllers/api.controller");
const webhook = require("../controllers/webhook.controller");
// / API INFOS /
// GET HOME TABLES DATA
router.get("/home", api.getHomeInfo);

// // NEXT 10 TIPS DATA
router.post("/next10tips", api.getNextTenTips);

// // LAST 10 TIPS DATA
router.post("/last10tips", api.getLastTenTips);

// // GET SELECTIONS FOR A SPECIFIC DATE
router.post("/selections", api.getSelectionsDate);

// // GET SELECTIONS FOR A SPECIFIC DATE AND VENUE
// router.post('/VenueSelections',  api.getVenueSelections);           /*********remove after optimisation */
router.post("/VenueSelectionsOpt", api.getVenueSelectionsOpt);

// // GET RESULTS FOR A SPECIFIC DATE
router.post("/results", api.getResults);

// // GET DATA FOR INSIDE SELECTION PAGE
// router.post('/getRace',  api.getRaceInfo);                          /*********remove after optimisation */
router.post("/getRaceOpt", api.getRaceInfoOptimized);

router.post("/getRaceOptNextPrev", api.getRaceInfoOptimizedNextPrv);
// // GET DATA FOR INSIDE SELECTION PAGE
// router.post('/getRaceInfoNextOrLast',  api.getRaceInfoNextOrLast);  /*********remove after optimisation */

// //GET GENERATION TIMES FOR A SPECIFIC RACE
// router.post('/generationTime', api.GenerationTimes);                /*********remove after optimisation */

// //GET DATA FOR LAS 10 WINNERS AT ODDS
router.post("/last10Winners", api.last10Winners);

// //GET DATA FOR LAS 10 WINNERS AT ODDS
router.post("/NextTojump", api.NextTojump);

// //GET DATA FOR LAS 10 WINNERS
router.post("/last10WinnersRegular", api.GETLastTenWinners);

//GET DATA FOR A SPecific Venue Race Results
router.post("/raceResultAnalytics", api.getVenuesSummary);

router.post("/racebydate", api.getRacesByDate);

router.post("/formings", api.formings);

router.post("/loadRaceForm", api.loadRaceForm);

router.post("/races", api.races);

router.post("/loadSingleRace", api.loadSingleRace);

router.post("/allScratchings", api.getAllScratchings);

//GET DATA FOR HORSE PROFILE
router.post("/horseProfile", api.getHorseProfile);

//GET DATA FOR Jockey Profile
router.post("/jockeyProfile", api.getJockeyProfile);

//GET DATA FOR Trainer Profile
router.post("/trainerProfile", api.getTrainerProfile);

//GET DATA FOR Jockey in Form
router.get("/jockeyInForm", api.getJockeyInForm);

//GET RACES IN VENUES
router.post("/racesInVenue", api.getAllRacesInVenue);

// LOAD VENUES THAT HAS MAPS.
router.get("/loadvenues", api.loadVenues);

router.post("/loadsavedrp", api.loadSavedRailPos);

router.post("/listCmts", api.listVenueComments);

router.post("/getHorseJockeyTrainer", api.getHorseAndJockey);

router.get("/getVenuesInDateForAnalytics", api.getTracksonSpeificDate);

router.post("/getAnalyticsBasedOnDate", api.getResultsBasedOnCondition);

router.get("/getHorseJockeyTrainerId", api.getHorseJockeyTrainerId);

router.post("/getVenueProfile", api.getVenueProfile);

router.get("/futureTips", api.getFutureTips);

router.post("/bestPerformance", api.bestPerformance);
router.post("/bestPerformingVenue", api.bestPerformingVenue);

// search bar
router.get("/search", api.searching);

// BlackBook
router.post("/addToBlackBook", auth, api.addBlackBook);

router.post("/addToBlackBookJockey", auth, api.addBlackBookJockey);

router.post("/deleteFromBlackBook", auth, api.deleteBlackBook);

router.post("/getMyBlackBook", auth, api.getBlackBook);

router.post("/deleteJockeyBlackBook", auth, api.deleteJockeyBlackBook);

// router.post('/getVenuesSummary',  api.getVenuesSummary);

router.get("/getraces", api.getRaces);

router.get("/all-bookmakers", api.getBookmakersData);

router.get("/getProducts", api.getProducts);

router.post("/create-subsciption", api.createStripeCustomer);

router.post("/create_sub", api.createStripeSubscription);

router.post("/webhook", webhook.stripeWebhook);

router.get("/get-subscriptions", api.getSubscriptions);

router.get("/get-live-plans", api.getLivePlans);

router.post("/get-user-plan", api.getUserPlan);

router.post("/getUserTransactions", api.getUserTransactions)

module.exports = router;
