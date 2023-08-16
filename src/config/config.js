import axios from "axios";
//import io from "socket.io-client";
import socketIOClient from "socket.io-client";

const hostApi =
  process.env.NODE_ENV === "development" ? "http://localhost" : "";
const portApi = process.env.NODE_ENV === "development" ? 3051 : "";
const serverUrl =
  process.env.NODE_ENV === "development" ? `http://localhost:4051` : "";
const usersURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/users`;
const apiURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/api`;
const updateApi = `${hostApi}${portApi ? `:${portApi}` : ``}/update`;

const spsTipsAPIUrl = "https://www.spstips.com.au";

export const STRIPE_PUBLISHABLE_KEY =
  "pk_test_eb8wQrYMUW2i0PyZiwt3FPhu005L3aAq1b";
export const publicVapidKey =
  "BLhr5SZ93oBs6dbEq0EvUgn72Yxp28hzNLa5_FQG-AS0OUxbwgUQnPGf9W4NFq_0dQ02lxLOIj409zpJMJ4Kd-4"; // web-push key
export const socket = socketIOClient(serverUrl, {
  transports: ["websocket"],
  upgrade: false,
});

const headers = {
  headers: { Authorization: `PTPTIPS ` + localStorage.PTPToken },
};

const spsTipsHeaders = {
  headers: {
    Authorization: `SMARTPUNTING c91fe46c-7033-4525-87cc-08f81e3f9439`,
  },
};

/* USERS FUNCTIONS */
async function loginUser(data) {
  const url = `${usersURLApi}/login`;
  console.log(url);
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function alreadyLoggedIn(data) {
  const url = `${usersURLApi}/alreadyLoggedIn`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function logoutUserAPI(email) {
  const url = `${usersURLApi}/logoutUser`;
  return await axios
    .post(url, email, headers)
    .then((response) => response.data);
}

async function contactUs(data) {
  const url = `${usersURLApi}/contactUs`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function updateUserName(data) {
  const url = `${usersURLApi}/updateUserName`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function forgotPass(email) {
  const url = `${usersURLApi}/forgotPass`;
  return await axios
    .post(url, email, headers)
    .then((response) => response.data);
}

async function resetPassword(id) {
  const url = `${usersURLApi}/resetPassword`;
  return await axios.post(url, id, headers).then((response) => response.data);
}

async function registerStep1(data) {
  const url = `${usersURLApi}/registerContact`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function registerStep2(data) {
  const url = `${usersURLApi}/registerAddress`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function registerStep3(data) {
  const url = `${usersURLApi}/registerPayment`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function cancelSubscription(email) {
  const url = `${usersURLApi}/cancelSubscription`;
  return await axios
    .post(url, email, headers)
    .then((response) => response.data);
}

async function updateProfile(data) {
  const url = `${usersURLApi}/editProfile`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function verifyAccount(id) {
  const url = `${usersURLApi}/verify/${id}`;
  return await axios.get(url, headers).then((response) => response.data);
}

async function unsubscribeUserEmail(id) {
  const url = `${usersURLApi}/unsubscribe/${id}`;
  return await axios.get(url, headers).then((response) => response.data);
}

async function subscribeUserEmail(id) {
  const url = `${usersURLApi}/subscribe/${id}`;
  return await axios.get(url, headers).then((response) => response.data);
}

async function updateMailingDates(data) {
  const url = `${usersURLApi}/updateMail`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function checkUserPromo(id) {
  const url = `${usersURLApi}/checkUserPromo/${id}`;
  return await axios.get(url, headers).then((response) => response.data);
}

async function seenPromo(data) {
  const url = `${usersURLApi}/seenPromo`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function getSubscription() {
  const url = `${usersURLApi}/getSubscription`;
  return await axios.get(url, headers).then((response) => response.data);
}

async function registerAds(data) {
  const url = `${usersURLApi}/registerAds`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function notifyMe(data) {
  const url = `${usersURLApi}/notification`;
  return await axios.post(url, data, headers).then((response) => response);
}

/* API INFO FUNCTIONS */
async function getHomeData() {
  const url = `${apiURLApi}/home`;
  return await axios.get(url, headers).then((response) => response.data.data);
}

async function getnext10tips(boolean, headers, token) {
  const url = `${apiURLApi}/next10tips`;
  return await axios
    .post(url, { pull: "next", checked: boolean, token: token }, headers)
    .then((response) => response.data);
}

async function getFutureTips() {
  const url = `${apiURLApi}/futureTips`;
  return await axios.get(url, headers).then((response) => response.data);
}

async function getlast10tips(boolean, headers) {
  const url = `${apiURLApi}/last10tips`;
  return await axios
    .post(url, { pull: "last", checked: boolean }, headers)
    .then((response) => response.data);
}

async function getselections(date) {
  const url = `${apiURLApi}/selections`;
  return await axios
    .post(url, date, headers)
    .then((response) => response.data.data);
}

/********************************************************************************************************** */
// async function getVenueselections(data) {
//   const url = `${apiURLApi}/VenueSelections`;
//   return await axios.post(url, data, headers).then(response => response.data);
// }
async function getVenueselectionsOpt(data) {
  const url = `${apiURLApi}/VenueSelectionsOpt`;
  return await axios.post(url, data, headers).then((response) => response.data);
}
/********************************************************************************************************** */

async function getResults(data) {
  const url = `${apiURLApi}/results`;
  return await axios
    .post(url, data, headers)
    .then((response) => response.data.data);
}
/*********************************************************************************************************** */
// async function getRaceInfo(data) {
//   const url = `${apiURLApi}/getRace`;
//   return await axios.post(url, data, headers).then(response => response.data);
// }
async function getRaceInfoOptimized(data) {
  const url = `${apiURLApi}/getRaceOpt`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function getRaceInfoOptimizedNextPrev(data) {
  const url = `${apiURLApi}/getRaceOptNextPrev`;
  return await axios.post(url, data, headers).then((response) => response.data);
}
/************************************************************************************************************* */
/* remove after optimisation */
// async function getRaceInfoNextOrLast(data) {
//   const url = `${apiURLApi}/getRaceInfoNextOrLast`;
//   return await axios.post(url, data, headers).then(response => response.data);
// }
/************************************************************************************************************ */

async function last10Winners(data) {
  const url = `${apiURLApi}/last10Winners`;
  return await axios
    .post(url, data, headers)
    .then((response) => response.data.data);
}

async function NextTojump(data) {
  const url = `${apiURLApi}/NextTojump`;
  return await axios
    .post(url, data, headers)
    .then((response) => response.data.data);
}

async function Last10WinnersRegular(data) {
  const url = `${apiURLApi}/last10WinnersRegular`;
  return await axios
    .post(url, data, headers)
    .then((response) => response.data.data);
}

async function getGenerationTime(data) {
  const url = `${apiURLApi}/generationTime`;
  return await axios
    .post(url, data, headers)
    .then((response) => response.data.data);
}

async function getProtipRaces() {
  const url = `${apiURLApi}/getraces`;
  return await axios.get(url).then((response) => response.data);
}

async function getProductslist() {
  const url = `${apiURLApi}/getProducts`;
  return await axios.get(url).then((response) => response.data);
}

async function SubscriptionData(data) {
  const url = `${apiURLApi}/create_sub`;
  
  return await axios.post(url, data).then((response) => response.data);
}

async function CurrentSubscription(data) {
  const url = `${apiURLApi}/get-user-plan`;
  return await axios.post(url, data).then((response) => response.data);
}

async function StripeTransactions(data) {
  const url = `${apiURLApi}/getUserTransactions`;
  return await axios.post(url, data).then((response) => response.data);
}


/* UPDATE FOR HADY */
async function updateOdds(data) {
  const url = `${updateApi}/OddsSUpdate/${data.getID}`;
  return await axios.get(url, headers).then((response) => response.data);
}

//async function checkSessionID(data) {
//  const url = `${usersURLApi}/checkSessionID`;
//  return await axios.post(url, data, headers).then((response) => response.data);
//}

//async function saveSessionID(data) {
//  const url = `${usersURLApi}/savesessionid`;
//  return await axios.post(url, data, headers).then((response) => response.data);
//}

async function getRaces(date, trackCode) {
  const url = `${apiURLApi}/races`;
  let data = { date: date, trackCode: trackCode };
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function getRacesByDate(date) {
  const url = `${apiURLApi}/racebydate`;
  let data = { date: date };
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function getFormings(data) {
  const url = `${apiURLApi}/formings`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function loadRaceForm(item) {
  const url = `${apiURLApi}/loadRaceForm`;
  return await axios.post(url, item, headers).then((response) => response.data);
}

async function loadSingleRace(data) {
  const url = `${apiURLApi}/loadSingleRace`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function GetRaceResultsAnalytics(data) {
  const url = `${apiURLApi}/raceResultAnalytics`;
  return await axios.post(url, data).then((response) => response.data);
}

async function getAllScratching(data) {
  const url = `${apiURLApi}/allScratchings`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function getBlackbook(data, headers) {
  const url = `${apiURLApi}/getMyBlackBook`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function addToBlackBook(data, headers) {
  const url = `${apiURLApi}/addToBlackBook`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function addToBlackBookJ(data, headers) {
  const url = `${apiURLApi}/addToBlackBookJockey`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function deleteFromBlackBook(data, headers) {
  const url = `${apiURLApi}/deleteFromBlackBook`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function deleteFromBlackBookJ(data, headers) {
  const url = `${apiURLApi}/deleteJockeyBlackBook`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function getHorseProfile(data) {
  const url = `${apiURLApi}/horseProfile`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function getJockeyProfile(data) {
  const url = `${apiURLApi}/jockeyProfile`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function getTrainerProfile(data) {
  const url = `${apiURLApi}/trainerProfile`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function getJockeyInForm() {
  const url = `${apiURLApi}/jockeyInForm`;
  return await axios.get(url, headers).then((response) => response.data);
}

async function getVenueRaces(data) {
  const url = `${apiURLApi}/racesInVenue`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function loadVenues() {
  const url = `${apiURLApi}/loadvenues`;
  return await axios.get(url, headers).then((response) => response.data);
}

async function loadSavedRailPosition(data) {
  const url = `${apiURLApi}/loadsavedrp`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function listVenueComments(data) {
  const url = `${apiURLApi}/listCmts`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function getHorseJockeyTrainerForAnalytics(data) {
  const url = `${apiURLApi}/getHorseJockeyTrainer`;
  return await axios
    .post(url, data, headers)
    .then((response) => response.data.data);
}

async function getVenuesForAnalytics() {
  const url = `${apiURLApi}/getVenuesInDateForAnalytics`;
  return await axios.get(url, headers).then((response) => response.data.data);
}

async function getAnalyticsResults(data) {
  const url = `${apiURLApi}/getAnalyticsBasedOnDate`;
  return await axios
    .post(url, data, headers)
    .then((response) => response.data.data);
}

async function getHorseJockeyTrainerId() {
  const url = `${apiURLApi}/getHorseJockeyTrainerId`;
  return await axios.get(url, headers).then((response) => response.data);
}

async function getVenueProfile(data) {
  const url = `${apiURLApi}/getVenueProfile`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

// async function getTop10HorseJockeyTrainer() {
//   const url = `${apiURLApi}/getTop10HorseJockeyTrainer`;
//   return await axios.get(url, headers).then(response => response.data);
// }

// async function getTop10PerformingVenues() {
//   const url = `${apiURLApi}/getTop10PerformingVenues`;
//   return await axios.get(url, headers).then(response => response.data);
// }
// async function getTop10Performingtrainers() {
//   const url = `${apiURLApi}/getTop10Performingtrainers`;
//   return await axios.get(url, headers).then(response => response.data);
// }
// async function getTop10PerformingJockeys() {
//   const url = `${apiURLApi}/getTop10PerformingJockeys`;
//   return await axios.get(url, headers).then(response => response.data);
// }
// async function getTop10PerformingHorses() {
//   const url = `${apiURLApi}/getTop10PerformingHorses`;
//   return await axios.get(url, headers).then(response => response.data);
// }

// async function bestPerformingHorse() {
//   const url = `${apiURLApi}/bestPerformingHorse`;
//   return await axios.get(url, headers).then(response => response.data);
// }

// async function bestPerformingJockey() {
//   const url = `${apiURLApi}/bestPerformingJockey`;
//   return await axios.get(url, headers).then(response => response.data);
// }

// async function bestPerformingVenueDetails(data) {
//   const url = `${apiURLApi}/bestPerformingVenueDetails`;
//   return await axios.post(url, data, headers).then(response => response.data);
// }

// async function bestPerformingHorseDetails(data) {
//   const url = `${apiURLApi}/bestPerformingHorseDetails`;
//   return await axios.post(url, data, headers).then(response => response.data);
// }

// async function bestPerformingJockeyDetails(data) {
//   const url = `${apiURLApi}/bestPerformingJockeyDetails`;
//   return await axios.post(url, data, headers).then(response => response.data);
// }

async function bestPerformance(data) {
  const url = `${apiURLApi}/bestPerformance`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function bestPerformingVenue(data) {
  const url = `${apiURLApi}/bestPerformingVenue`;
  return await axios.post(url, data, headers).then((response) => response.data);
}

async function search(value) {
  const url = `${apiURLApi}/search?value=${value}`;
  return await axios.get(url, headers).then((response) => response.data.data);
}

// get spsTips selections
async function fetchSpsTipsSelections(data) {
  const url = `${spsTipsAPIUrl}/api/calculator/listRaces`;
  return await axios
    .post(url, data, spsTipsHeaders)
    .then((response) => response.data);
}

// get bookmakers data
const fetchBookmakersAPIService = async (data) => {
  const url = `${apiURLApi}/all-bookmakers`;
  return await axios
    .get(url, headers)
    .then((response) => response)
    .catch((err) => err.response);
};

export {
  loginUser,
  alreadyLoggedIn,
  logoutUserAPI,
  registerStep1,
  registerStep2,
  registerStep3,
  updateUserName,
  getHomeData,
  getnext10tips,
  getlast10tips,
  getselections,
  getResults,
  // getRaceInfo,
  getRaceInfoOptimized,
  getRaceInfoOptimizedNextPrev,
  // getRaceInfoNextOrLast,
  // getVenueselections,
  getVenueselectionsOpt,
  last10Winners,
  NextTojump,
  contactUs,
  updateProfile,
  verifyAccount,
  updateOdds,
  forgotPass,
  resetPassword,
  cancelSubscription,
  //checkSessionID,
  //saveSessionID,
  getGenerationTime,
  Last10WinnersRegular,
  updateMailingDates,
  unsubscribeUserEmail,
  subscribeUserEmail,
  checkUserPromo,
  seenPromo,
  getSubscription,
  registerAds,
  getRacesByDate,
  getFormings,
  loadRaceForm,
  getRaces,
  loadSingleRace,
  GetRaceResultsAnalytics,
  getAllScratching,
  getHorseProfile,
  getJockeyProfile,
  getTrainerProfile,
  getJockeyInForm,
  getVenueRaces,
  notifyMe,
  loadVenues,
  loadSavedRailPosition,
  listVenueComments,
  getHorseJockeyTrainerForAnalytics,
  getVenuesForAnalytics,
  getAnalyticsResults,
  getHorseJockeyTrainerId,
  getVenueProfile,
  getFutureTips,
  getBlackbook,
  addToBlackBook,
  addToBlackBookJ,
  deleteFromBlackBook,
  deleteFromBlackBookJ,
  bestPerformance,
  bestPerformingVenue,
  search,
  fetchSpsTipsSelections,
  getProtipRaces,
  fetchBookmakersAPIService,
  getProductslist,
  SubscriptionData,
  CurrentSubscription,
  StripeTransactions
};
