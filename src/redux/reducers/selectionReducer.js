import {
  NEXT10_FETCH_STARTED, NEXT10_FETCH_SUCCESS, NEXT10_FETCH_ERROR,
  LAST10_FETCH_STARTED, LAST10_FETCH_SUCCESS, LAST10_FETCH_ERROR,
  SELECTION_FETCH_STARTED, SELECTION_FETCH_SUCCESS, SELECTION_FETCH_ERROR,
  FUTURETIPS_FETCH_STARTED, FUTURETIPS_FETCH_SUCCESS, FUTURETIPS_FETCH_ERROR,
  SELECT_NR_NEXT, SELECT_NR_LAST, SELECT_CTC_NEXT, SELECT_CTC_LAST
} from '../actions/selections';

const defaultState = {
  dataNext: [],
  dataLast: [],
  dataFuture: [],
  selections: [],
  loadingNext: false,
  loadingLast: false,
  loadingSelection: false,
  showNextNR: false,
  showLastNR: false,
  showCTCN: true,
  showCTCL: true,
  futureTipsLoading: false,
};

function nextAndLastReducer(state = defaultState, action) {
  switch (action.type) {
    case SELECT_NR_NEXT:
      return Object.assign({}, state, {
        showNextNR: action.payload.data
      });
    case SELECT_NR_LAST:
      return Object.assign({}, state, {
        showLastNR: action.payload.data
      });
    case SELECT_CTC_NEXT:
      return Object.assign({}, state, {
        showCTCN: action.payload.data
      });
    case SELECT_CTC_LAST:
      return Object.assign({}, state, {
        showCTCL: action.payload.data
      });
    case NEXT10_FETCH_STARTED:
      return Object.assign({}, state, {
        loadingNext: true,
        dataNext: [],
      });
    case NEXT10_FETCH_SUCCESS:
      return Object.assign({}, state, {
        loadingNext: false,
        dataNext: action.payload.nextTips,
      });
    case NEXT10_FETCH_ERROR:
      return Object.assign({}, state, {
        ...state,
        loadingNext: false,
        // dataNext: [],
      });
    case LAST10_FETCH_STARTED:
      return Object.assign({}, state, {
        loadingLast: true,
        dataLast: [],
      });
    case LAST10_FETCH_SUCCESS:
      return Object.assign({}, state, {
        loadingLast: false,
        dataLast: action.payload.lastTips,
      });
    case LAST10_FETCH_ERROR:
      return Object.assign({}, state, {
        ...state,
        loadingLast: false,
        // dataLast: [],
      });
    case FUTURETIPS_FETCH_STARTED:
      return Object.assign({}, state, {
        futureTipsLoading: true,
        dataFuture: [],
      });
    case FUTURETIPS_FETCH_SUCCESS:
      return Object.assign({}, state, {
        futureTipsLoading: false,
        dataFuture: action.payload.futureTips,
      });
    case FUTURETIPS_FETCH_ERROR:
      return Object.assign({}, state, {
        ...state,
        futureTipsLoading: false,
        // dataLast: [],
      });
    case SELECTION_FETCH_STARTED:
      return Object.assign({}, state, {
        loadingSelection: true,
        //selections: [],
      });
    case SELECTION_FETCH_SUCCESS:
      return Object.assign({}, state, {
        loadingSelection: false,
        selections: action.payload.selections,
      });
    case SELECTION_FETCH_ERROR:
      return Object.assign({}, state, {
        loadingSelection: false,
        //selections: [],
      });
    default:
      return state;
  }
}

export default nextAndLastReducer;