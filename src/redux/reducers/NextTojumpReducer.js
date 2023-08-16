import {NextTojump_FETCH_STARTED,NextTojump_FETCH_SUCCESS,NextTojump_FETCH_ERROR } from "../actions/NextTojump";

const defaultState = {
  info: [],
  loading: false,
};

function NextTojumpReducer(state = defaultState, action) {
  switch (action.type) {
    case NextTojump_FETCH_STARTED:
      return Object.assign({}, state, {
        ...state,
        loading: true,
      });
    case NextTojump_FETCH_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        info: action.payload.info
      });
    case NextTojump_FETCH_ERROR:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        //info: [],
      });
    default:
      return state;
  }
}

export default  NextTojumpReducer;