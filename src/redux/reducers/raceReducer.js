import {

  // RACE_FETCH_STARTED,
  // RACE_FETCH_SUCCESS,
  // RACE_FETCH_ERROR,
  RACEOPT_FETCH_STARTED,
  RACEOPT_FETCH_SUCCESS,
  RACEOPT_FETCH_ERROR,

  GET_RACES_STARTED,
  GET_RACES_SUCCESS,
  GET_RACES_ERROR,

  RACES_BY_DATE_STARTED,
  RACES_BY_DATE_SUCCESS,
  RACES_BY_DATE_ERROR,

  FORMING_STARTED,
  FORMING_SUCCESS,
  FORMING_ERROR,

  RACE_FORM_STARTED,
  RACE_FORM_SUCCESS,
  RACE_FORM_ERROR,

  LOAD_SINGLE_RACE_STARTED,
  LOAD_SINGLE_RACE_SUCCESS,
  LOAD_SINGLE_RACE_ERROR,

  RESET_SPEED_MAP_TRUE,
  RESET_SPEED_MAP_FALSE,

  CHANGE_RACE_TABS,

  SET_FORMING_RACE_STARTED,
  SET_FORMING_RACE,

  LOAD_SCRATCHINGS_STARTED,
  LOAD_SCRATCHINGS_SUCCESS,
  LOAD_SCRATCHINGS_ERROR,
  SET_RACE_LMM,

} from '../actions/race';

const defaultState = {
  // trackInfo: {}, ///////////////////////
  trackInfoOpt: {}, /*new*/
  // horses: [], /////////////////////
  oldHorsesOpt: [], /*new*/
  horsesOpt: [], /*new*/
  dateVenues: [], /*new*/
  // generationTime: [],
  // mm: [],
  // lbmm: [],
  point_id: null,
  loading: false,
  errorMessage: '',
  races: [],
  trackcodes: [],
  formings: [],
  raceForm: [],
  singleRace: [],
  raceTabs: 0,
  speedMapLoading: false,
  resetSpeedMap: false,
  raceInfo: [],
  allScratchings: [],
  allScratchingsLoading: false,
  allDayResult: [],
  lmmTime: 2,
  allRacesDayResults:{}
};

function raceReducer(state = defaultState, action) {
  switch (action.type) {

    // case RACE_FETCH_STARTED:
    //   return Object.assign({}, state, {
    //     ...state,
    //     loading: true,
    //     errorMessage: '',
    //   });
    //   /************************************************* */
    // case RACE_FETCH_SUCCESS:
    //   return Object.assign({}, state, {
    //     ...state,
    //     loading: false,
    //     errorMessage: '',
    //     trackInfo: action.payload.data,
    //     horses: action.payload.horses,
    //     mm: action.payload.mm,
    //     lbmm: action.payload.lbmm,
    //     point_id: action.payload.point_id,
    //   });
    // case RACE_FETCH_ERROR:
    //   return Object.assign({}, state, {
    //     ...state,
    //     loading: false,
    //     //trackInfo: {},
    //     //horses: [],
    //     mm: [],
    //     lbmm: [],
    //     point_id: null,
    //     errorMessage: action.payload.error,
    //   });

    case RACEOPT_FETCH_STARTED:
      return Object.assign({}, state, {
        loading: true,
        errorMessage: '',
        generationTime: [],
        oldHorsesOpt: [],
        // allDayResult: [],
      });
    case RACEOPT_FETCH_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        errorMessage: '',
        trackInfoOpt: action.payload.data,
        oldHorsesOpt: action.payload.loadNewRace ? [] : state.horsesOpt,
        horsesOpt: action.payload.horses,
        dateVenues: action.payload.dateVenues,
        point_id: action.payload.point_id,
        generationTime: action.payload.generationTime,
        allDayResult: action.payload.allDayResult,
        allRacesDayResults:action.payload.allRacesDayResults
      });
    case RACEOPT_FETCH_ERROR:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        point_id: null,
        errorMessage: action.payload.error,
        generationTime: [],
        oldHorsesOpt: [],
        allDayResult: [],
        allRacesDayResults:{}
      });
    /****************************************************** */
    case GET_RACES_STARTED:
      return Object.assign({}, state, {
        ...state,
        loading: true,
        errorMessage: '',
      });
    case GET_RACES_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        errorMessage: '',
        races: action.payload.data,
      });
    case GET_RACES_ERROR:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        races: [],
        errorMessage: 'error loading races',
      });


    case RACES_BY_DATE_STARTED:
      return Object.assign({}, state, {
        ...state,
        errorMessage: '',
      });
    case RACES_BY_DATE_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        errorMessage: '',
        trackcodes: action.payload.data,
      });
    case RACES_BY_DATE_ERROR:
      return Object.assign({}, state, {
        ...state,
        racesByDate: [],
        errorMessage: 'error loading races by  date',
      });


    case FORMING_STARTED:
      return Object.assign({}, state, {
        ...state,
        formings: [],
        errorMessage: '',
      });
    case FORMING_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        errorMessage: '',
        formings: action.payload.data,
      });
    case FORMING_ERROR:
      return Object.assign({}, state, {
        ...state,
        formings: [],
        errorMessage: 'error loading formings.',
      });

    case RACE_FORM_STARTED:
      return Object.assign({}, state, {
        ...state,
        speedMapLoading: true,
        errorMessage: '',
        raceForm: [],
      });
    case RACE_FORM_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        speedMapLoading: false,
        errorMessage: '',
        raceForm: action.payload.data,
      });
    case RACE_FORM_ERROR:
      return Object.assign({}, state, {
        ...state,
        speedMapLoading: false,
        raceForm: [],
        errorMessage: 'error loading formings.',
      });

    case LOAD_SINGLE_RACE_STARTED:
      return Object.assign({}, state, {
        ...state,
        errorMessage: '',
        singleRace: [],
      });
    case LOAD_SINGLE_RACE_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        errorMessage: '',
        singleRace: action.payload.data,
      });
    case LOAD_SINGLE_RACE_ERROR:
      return Object.assign({}, state, {
        ...state,
        errorMessage: 'error loading single race.',
      });


    case CHANGE_RACE_TABS:
      return Object.assign({}, state, {
        ...state,
        formings: [],
        raceForm: [],
        raceInfo: [],
        raceTabs: action.payload.tabs,
      });

    case RESET_SPEED_MAP_TRUE:
      return Object.assign({}, state, {
        ...state,
        resetSpeedMap: true,
      });

    case RESET_SPEED_MAP_FALSE:
      return Object.assign({}, state, {
        ...state,
        resetSpeedMap: false,
      });


    case SET_FORMING_RACE_STARTED:
      return Object.assign({}, state, {
        ...state,
        raceInfo: [],
      });

    case SET_FORMING_RACE:
      return Object.assign({}, state, {
        ...state,
        raceInfo: action.payload.raceInfo,
      });

    case LOAD_SCRATCHINGS_STARTED:
      return Object.assign({}, state, {
        ...state,
        allScratchingsLoading: true,
        allScratchings: []
      });
    case LOAD_SCRATCHINGS_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        allScratchingsLoading: false,
        allScratchings: action.payload.data
      });
    case LOAD_SCRATCHINGS_ERROR:
      return Object.assign({}, state, {
        ...state,
        allScratchingsLoading: false,
        allScratchings: []
      });

    case SET_RACE_LMM:
      return Object.assign({}, state, {
        ...state,
        lmmTime: action.payload.data,
      });

    default:
      return state;
  }
}

export default raceReducer;