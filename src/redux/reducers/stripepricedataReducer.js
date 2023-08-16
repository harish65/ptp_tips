import {
  ProductsData_FETCH_STARTED,
  ProductsData_FETCH_SUCCESS,
  ProductsData_FETCH_ERROR,
} from "../actions/stripepricedata";
import {
  Subscription_FETCH_STARTED,
  Subscription_FETCH_SUCCESS,
  Subscription_FETCH_ERROR,
} from "../actions/stripepricedata";

const defaultState = {
  Productslist: [],
  loading: false,
};

const defaultState2 = {
  subscriptionData: [],
  loading: false,
};

export function subsciptionReducer(state = defaultState2, action) {
  switch (action.type) {
    case Subscription_FETCH_STARTED:
      return Object.assign({}, state, {
        ...state,
        loading: true,
      });
    case Subscription_FETCH_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        subscriptionData: action.payload.subsciption,
      });
    case Subscription_FETCH_ERROR:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        subscriptionData: [],
      });
    default:
      return state;
  }
}

function stripepricedataReducer(state = defaultState, action) {
  switch (action.type) {
    case ProductsData_FETCH_STARTED:
      return Object.assign({}, state, {
        ...state,
        loading: true,
      });
    case ProductsData_FETCH_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        Productslist: action.payload.data,
      });
    case ProductsData_FETCH_ERROR:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        //info: [],
      });
    default:
      return state;
  }
}

export default stripepricedataReducer;
