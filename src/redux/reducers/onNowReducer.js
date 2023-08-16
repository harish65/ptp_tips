import {ON_NOW_SUCCESS, ON_NOW_ERROR, ON_NOW_SUCCESS_SAME } from "../actions/onNow";

const defaultState = {
    trackInfo: [],
    horses: [],
    generationTime: [],
    oldHorses: []
};

function onNowReducer(state = defaultState, action) {
  switch (action.type) {
    case ON_NOW_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        trackInfo: action.payload.trackInfo,
        horses: action.payload.horses,
        generationTime: action.payload.generationTime,
      });
    case ON_NOW_ERROR:
      return Object.assign({}, state, {
        ...state,
        trackInfo: [],
        horses: [],
        generationTime: [],
      });

    case ON_NOW_SUCCESS_SAME:
      return Object.assign({}, state, {
        ...state,
        trackInfo: action.payload.trackInfo,
        oldHorses: state.horses,
        horses: action.payload.horses,
        generationTime: action.payload.generationTime,
      });
    default:
      return state;
  }
}

export default onNowReducer;