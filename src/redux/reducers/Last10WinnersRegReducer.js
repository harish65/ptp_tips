import {last10WinnersReg_FETCH_STARTED,last10WinnersReg_FETCH_SUCCESS,last10WinnersReg_FETCH_ERROR } from '../actions/Last10WinnersRegular';

const defaultState = {
    info: [],
  loading: false,
};

function Last10WinnersReg(state = defaultState, action) {
  switch (action.type) {
    case last10WinnersReg_FETCH_STARTED:
      return Object.assign({}, state, {
        ...state,
        loading: true,
      });
    case last10WinnersReg_FETCH_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        info: action.payload.info
      });
    case last10WinnersReg_FETCH_ERROR:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        info: [],
      });
    default:
      return state;
  }
}

export default Last10WinnersReg;