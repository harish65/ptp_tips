import { HOME_FETCH_STARTED, HOME_FETCH_SUCCESS, HOME_FETCH_ERROR } from '../actions/home';

const defaultState = {
  monthlyTable: [],
  dailyTable: [],
  loading: false,
};

function homeReducer(state = defaultState, action) {
  switch (action.type) {
    case HOME_FETCH_STARTED:
      return Object.assign({}, state, {
        ...state,
        loading: true,
      });
    case HOME_FETCH_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        monthlyTable: action.payload.monthlyTable,
        dailyTable: action.payload.dailyTable,
      });
    case HOME_FETCH_ERROR:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        //monthlyTable: [],
        //dailyTable: [],
      });
    default:
      return state;
  }
}

export default homeReducer;