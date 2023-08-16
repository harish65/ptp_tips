import { BLACKBOOK_REQUEST, BLACKBOOK_SUCCESS, BLACKBOOK_ERROR,
          ADDBLACKBOOK_REQUEST, ADDBLACKBOOK_SUCCESS, ADDBLACKBOOK_ERROR } from "../actions/blackbook";

const defaultState = {
  loading: false,
  blackbookList: [],
  jockeyBook : []
};

function blackbookReducer(state = defaultState, action) {
  switch (action.type) {
    case BLACKBOOK_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });
    case BLACKBOOK_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        blackbookList: action.payload.blackbook,
        jockeyBook: action.payload.jockeyBook
      });
    case BLACKBOOK_ERROR:
      return Object.assign({}, state, {
        loading: false,
        blackbookList: [],
        jockeyBook: []
      });

    case ADDBLACKBOOK_REQUEST:
      return Object.assign({}, state, {
        ...state,
        loading: true,
      });
    case ADDBLACKBOOK_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        loading: false,
      });
    case ADDBLACKBOOK_ERROR:
      return Object.assign({}, state, {
        ...state,
        loading: false,
      });
    default:
      return state;
  }
}

export default blackbookReducer;