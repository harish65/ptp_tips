import {TIME_FETCH_STARTED,TIME_FETCH_SUCCESS,TIME_FETCH_ERROR } from "../actions/generationTime";

const defaultState = {
    info: [],
  loading: false,
};

function getGenTimeReducer(state = defaultState, action) {
  switch (action.type) {
    case TIME_FETCH_STARTED:
      return Object.assign({}, state, {
        ...state,
        loading: true,
      });
    case TIME_FETCH_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        info: action.payload.info
      });
    case TIME_FETCH_ERROR:
      // console.log("hi")
      return Object.assign({}, state, {
        ...state,
        loading: false,
        info: [],
      });
    default:
      return state;
  }
}

export default  getGenTimeReducer;