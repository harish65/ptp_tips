import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_USER, UPDATE_PROFILE,
  VERIFY_ACTIVE_STEP, UPDATE_ACTIVE_STEP, UPDATE_PAYMENT_STEP, FORGOT_PASS_SUCCESS, FORGOT_PASS_ERROR,
  RESET_PASS_SUCCESS, RESET_PASS_ERROR, CLEAN_MESSAGES, UNSUBSCRIBE_SUCCESS, UNSUBSCRIBE_ERROR, NEW_SIGNUP,
  NEW_SIGNUP_CLOSE, CHECK_SESSION_ID, PROFILE_INFO_CLOSE, SUBSCRIPTION_PLAN, CHANGE_THEME, CHANGE_NAV_TAB,
  HEADER_LOGO_CHANGE
} from '../actions/auth';

import { FULL_SCREEN } from '../actions/selections'

const initialState = {
  loadingUser: false,
  loginError: '',
  errorStatus: null,
  currentUser: null,
  isLoggedIn: false,
  isExpired: false,
  activeStep: 0,
  userId: '',
  forgotError: '',
  forgotMessage: '',
  unsubscribeMessageError: '',
  unsubscribeMessage: '',
  isNewUser: false,
  clientSession: null,
  firstNameExist: true,
  subscription: '',
  fullScreen: false,
  dark: false,
  navTab: 0,
  headerLogo: null,
  
};

function auth(state = initialState, action) {
  switch (action.type) {

    case FULL_SCREEN:
      return Object.assign({}, state, {
        fullScreen: action.payload.state,
      });

    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        loadingUser: true,
        loginError: "",
        errorStatus: null,
        firstNameExist: true,
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoggedIn: true,
        isExpired: action.payload.isExpired,
        loadingUser: false,
        loginError: "",
        errorStatus: null,
        unsubscribeMessageError: "",
        unsubscribeMessage: "",
        currentUser: action.payload.resp,
        firstNameExist: action.payload.firstName,
      });
    case LOGIN_ERROR:
      return Object.assign({}, state, {
        loadingUser: false,
        loginError: action.payload.message,
        errorStatus: action.payload.status,
        currentUser: null,
        isLoggedIn: false,
        isExpired: false,
        unsubscribeMessageError: "",
        unsubscribeMessage: "",
        firstNameExist: true,
      });
    case NEW_SIGNUP:
      return Object.assign({}, state, {
        ...state,
        isNewUser: true,
      });
    case NEW_SIGNUP_CLOSE:
      return Object.assign({}, state, {
        ...state,
        isNewUser: false,
      });
    case PROFILE_INFO_CLOSE:
      return Object.assign({}, state, {
        ...state,
        firstNameExist: true,
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        isLoggedIn: false,
        isExpired: false,
        loadingUser: false,
        loginError: "",
        errorStatus: null,
        currentUser: null,
        unsubscribeMessageError: "",
        unsubscribeMessage: "",
        activeStep: 0,
        userId: "",
        // isLoggedIn: true,
        // isExpired: action.payload.isExpired,
        // loadingUser: false,
        // loginError: "",
        // errorStatus: null,
        // unsubscribeMessageError: "",
        // unsubscribeMessage: "",
        // currentUser: action.payload.resp,
        // firstNameExist: action.payload.firstName,
      });
    case UPDATE_PROFILE:
      return Object.assign({}, state, {
        ...state,
        currentUser: action.update,
      });
    case VERIFY_ACTIVE_STEP:
      return Object.assign({}, state, {
        ...state,
        activeStep: 1,
        userId: action.id,
      });
    case UPDATE_ACTIVE_STEP:
      return Object.assign({}, state, {
        ...state,
        activeStep: 0,
      });
    case UPDATE_PAYMENT_STEP:
      return Object.assign({}, state, {
        ...state,
        activeStep: 2,
        //userId: action.id,
      });
    case FORGOT_PASS_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        forgotMessage: action.message,
        forgotError: "",
      });
    case FORGOT_PASS_ERROR:
      return Object.assign({}, state, {
        ...state,
        forgotMessage: "",
        forgotError: action.message,
      });
    case RESET_PASS_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        forgotMessage: action.message,
        forgotError: "",
      });
    case RESET_PASS_ERROR:
      return Object.assign({}, state, {
        ...state,
        forgotMessage: "",
        forgotError: action.message,
      });
    case CLEAN_MESSAGES:
      return Object.assign({}, state, {
        ...state,
        forgotMessage: "",
        forgotError: "",
        loginError: "",
        errorStatus: null,
        unsubscribeMessageError: "",
        unsubscribeMessage: "",
      });
    case UNSUBSCRIBE_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        unsubscribeMessage: action.message,
        unsubscribeMessageError: "",
      });
    case UNSUBSCRIBE_ERROR:
      return Object.assign({}, state, {
        ...state,
        unsubscribeMessage: "",
        unsubscribeMessageError: action.message,
      });
    case CHECK_SESSION_ID:
      return Object.assign({}, state, {
        ...state,
        loading: true,
        clientSession: action.payload.clientSession,
      });
    case SUBSCRIPTION_PLAN:
      return Object.assign({}, state, {
        ...state,
        subscription: action.payload.subscription,
      });
    case CHANGE_THEME:
      return Object.assign({}, state, {
        ...state,
        dark: action.payload.dark,
      });
    case CHANGE_NAV_TAB:
      return Object.assign({}, state, {
        ...state,
        navTab: action.payload.navTab,
      });
    case HEADER_LOGO_CHANGE:
      return Object.assign({}, state, {
        ...state,
        headerLogo: action.payload.headerLogo,
      });
    default:
      return state;
  }
}

export default auth;


