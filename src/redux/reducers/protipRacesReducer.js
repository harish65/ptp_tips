import {
  ProtipRaces_FETCH_STARTED,
  ProtipRaces_FETCH_SUCCESS,
  ProtipRaces_FETCH_ERROR,
} from "../actions/protipRaces";

const defaultState = {
  info: [],
  loading: false,
};
function protipRacesReducer(state = defaultState, action) {
  switch (action.type) {
    case ProtipRaces_FETCH_STARTED:
      return Object.assign({}, state, {
        ...state,
        loading: true,
      });
    case ProtipRaces_FETCH_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        info: action.payload.data,
      });
    case ProtipRaces_FETCH_ERROR:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        //info: [],
      });
    default:
      return state;
  }
}

export default protipRacesReducer;
