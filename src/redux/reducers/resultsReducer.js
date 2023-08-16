import { RESULT_FETCH_STARTED, RESULT_FETCH_SUCCESS, RESULT_FETCH_ERROR, SET_SELECTED_VENUE } from '../actions/results';
import { STATS_FETCH_STARTED, STATS_FETCH_SUCCESS, STATS_FETCH_ERROR } from '../actions/race';

const defaultState = {
  raceStats: [],
  racestatLoading: false,
  results: [],
  daily_results: {},
  day_of_week_history: {},
  loading: false,
  selectedVenue: 0,
};

function resultsReducer(state = defaultState, action) {
  switch (action.type) {
    case RESULT_FETCH_STARTED:
      return Object.assign({}, state, {
        ...state,
        loading: true,
      });
    case RESULT_FETCH_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        results: action.payload.results,
        daily_results: action.payload.daily_results,
        day_of_week_history: action.payload.day_of_week_history,
      });
    case RESULT_FETCH_ERROR:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        selectedVenue: 0
        //results: [],
        //dailyPerformance: [],
      });
      
    case SET_SELECTED_VENUE:
      return Object.assign({}, state, {
        ...state,
        selectedVenue: action.data,
      });

    case STATS_FETCH_STARTED:
      return Object.assign({}, state, {
        ...state,
        racestatLoading: true,
      });
    case STATS_FETCH_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        racestatLoading: false,
        raceStats: action.payload.data,
      });
    case STATS_FETCH_ERROR:
      return Object.assign({}, state, {
        ...state,
        racestatLoading: false,
        raceStats: [],
      });
    default:
      return state;
  }
}

export default resultsReducer;