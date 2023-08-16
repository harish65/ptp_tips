import {last10Winners_FETCH_STARTED,last10Winners_FETCH_SUCCESS,last10Winners_FETCH_ERROR } from '../actions/last10winners';

const defaultState = {
  info: [],
  loading: false,
};

function lastWinnersReducer(state = defaultState, action) {
  switch (action.type) {
    case last10Winners_FETCH_STARTED:
      return Object.assign({}, state, {
        ...state,
        loading: true,
      });
    case last10Winners_FETCH_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        info: action.payload.info
      });
    case last10Winners_FETCH_ERROR:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        //info: [],
      });
    default:
      return state;
  }
}

export default lastWinnersReducer;