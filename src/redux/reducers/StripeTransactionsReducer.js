import {
  StripeTransactions_FETCH_STARTED,
  StripeTransactions_FETCH_SUCCESS,
  StripeTransactions_FETCH_ERROR,
} from "../actions/StripeTransactions";

const defaultState = {
 TransactionDetails: [],
  loading: false,
};

function StripeTransactionsReducer(state = defaultState, action) {
  switch (action.type) {
    case StripeTransactions_FETCH_STARTED:
      return Object.assign({}, state, {
        ...state,
        loading: true,
      });
    case StripeTransactions_FETCH_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        TransactionDetails: action.payload.data,
      });
    case StripeTransactions_FETCH_ERROR:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        TransactionDetails: [],
      });
    default:
      return state;
  }
}

export default StripeTransactionsReducer;
