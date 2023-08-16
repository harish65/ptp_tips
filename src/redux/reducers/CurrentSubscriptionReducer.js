import {
  CURRENTSUBSCRIPTION_FETCH_STARTED,
  CURRENTSUBSCRIPTION_FETCH_SUCCESS,
  CURRENTSUBSCRIPTION_FETCH_ERROR,
} from "../actions/CurrentSubscription";

const defaultState = {
  CurrentPlan: [],
  loading: false,
};

function currentsubscriptionreducer(state = defaultState, action) {
  switch (action.type) {
    case CURRENTSUBSCRIPTION_FETCH_STARTED:
      return Object.assign({}, state, {
        ...state,
        loading: true,
      });
    case CURRENTSUBSCRIPTION_FETCH_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        CurrentPlan: action.payload.data,
      });
    case CURRENTSUBSCRIPTION_FETCH_ERROR:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        CurrentPlan: [],
      });
    default:
      return state;
  }
}

export default currentsubscriptionreducer;
