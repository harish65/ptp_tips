import { combineReducers } from "redux";
import auth from "./auth";
import homeReducer from "./homeReducer";
import selectionReducer from "./selectionReducer";
import resultsReducer from "./resultsReducer";
import raceReducer from "./raceReducer";
import lastWinnersReducer from "./lastWinnersReducer";
import NextTojumpReducer from "./NextTojumpReducer";
import oddsUpdateReducer from "./oddsUpdateReducer";
import getGenTimeReducer from "./generationTimeReducer";
import Last10WinnersReg from "./Last10WinnersRegReducer";
import onNowReducer from "./onNowReducer";
import profilesReducer from "./profilesReducer";
import venuesReducer from "./venuesReducer";
import racesAnalyticsReducer from "./racesAnalyticsReducer";
import blackbook from "./blackbookReducer";
import protipRacesReducer from "./protipRacesReducer";
import bookMakerReducer from "./bookmakerReducer";
import stripepricedata from "./stripepricedataReducer";
import { subsciptionReducer } from "./stripepricedataReducer";
import currentsubscriptionreducer from "./CurrentSubscriptionReducer";
import StripeTransactionsReducer from "./StripeTransactionsReducer"

const reducers = combineReducers({
  auth,
  homeReducer,
  selectionReducer,
  resultsReducer,
  raceReducer,
  lastWinnersReducer,
  NextTojumpReducer,
  oddsUpdateReducer,
  getGenTimeReducer,
  Last10WinnersReg,
  onNowReducer,
  profilesReducer,
  venuesReducer,
  racesAnalyticsReducer,
  blackbook,
  protipRacesReducer,
  bookMakerReducer,
  stripepricedata,
  subsciptionReducer,
  currentsubscriptionreducer,
  StripeTransactionsReducer
});

export default reducers;
