import {
  HORSE_PROFILE_STARTED,
  HORSE_PROFILE_SUCCESS,
  HORSE_PROFILE_ERROR,

  JOCKEY_PROFILE_STARTED,
  JOCKEY_PROFILE_SUCCESS,
  JOCKEY_PROFILE_ERROR,

  TRAINER_PROFILE_STARTED,
  TRAINER_PROFILE_SUCCESS,
  TRAINER_PROFILE_ERROR,

  JOCKEY_INFORM_STARTED,
  JOCKEY_INFORM_SUCCESS,
  JOCKEY_INFORM_ERROR,

  VENUE_PROFILE_STARTED,
  VENUE_PROFILE_SUCCESS,
  VENUE_PROFILE_ERROR,

  GET_IDS_STARTED,
  GET_IDS_SUCCESS,
  GET_IDS_ERROR,

  // BEST_PERFORMING_STATS_STARTED,
  // BEST_PERFORMING_STATS_SUCCESS,
  // BEST_PERFORMING_STATS_ERROR,

  BEST_PERFORMING_HORSE_STARTED,
  BEST_PERFORMING_HORSE_SUCCESS,
  BEST_PERFORMING_HORSE_ERROR,

  BEST_PERFORMING_JOCKEY_STARTED,
  BEST_PERFORMING_JOCKEY_SUCCESS,
  BEST_PERFORMING_JOCKEY_ERROR,

  BEST_PERFORMING_VENUE_STARTED,
  BEST_PERFORMING_VENUE_SUCCESS,
  BEST_PERFORMING_VENUE_ERROR,
} from '../actions/profiles';

const defaultState = {
  horseProfile: [],
  horseProfileLoading: false,
  jockeyProfile: [],
  jockeyProfileLoading: false,
  trainerProfile: [],
  trainerProfileLoading: false,
  jockeyInForm: [],
  jockeyInFormLoading: false,
  ids: [],
  idsLoading: false,
  venueProfile: [],
  venueProfileLoading: false,
  top10Stats: [],
  top10StatsLoading: false,
  bestPerformingHorse: [],
  bestPerformingHorseLoading: false,
  bestPerformingJockey: [],
  bestPerformingJockeyLoading: false,
  bestPerformingVenue: [],
  bestPerformingVenueLoading: false,

  bestPerformingHorseDetails: [],
  bestPerformingHorseDetailsLoading: false,
  bestPerformingJockeyDetails: [],
  bestPerformingJockeyDetailsLoading: false,
  bestPerformingVenueDetails: [],
  bestPerformingVenueDetailsLoading: false,
};

function profileReducer(state = defaultState, action) {
  switch (action.type) {



    case HORSE_PROFILE_STARTED:
      return Object.assign({}, state, {
        ...state,
        horseProfileLoading: true,
        horseProfile: []
      });
    case HORSE_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        horseProfileLoading: false,
        horseProfile: action.payload.data
      });
    case HORSE_PROFILE_ERROR:
      return Object.assign({}, state, {
        ...state,
        horseProfile: [],
        horseProfileLoading: false
      });



    case JOCKEY_PROFILE_STARTED:
      return Object.assign({}, state, {
        ...state,
        jockeyProfileLoading: true,
        jockeyProfile: []
      });
    case JOCKEY_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        jockeyProfileLoading: false,
        jockeyProfile: action.payload.data
      });
    case JOCKEY_PROFILE_ERROR:
      return Object.assign({}, state, {
        ...state,
        jockeyProfile: [],
        jockeyProfileLoading: false
      });


    case TRAINER_PROFILE_STARTED:
      return Object.assign({}, state, {
        ...state,
        trainerProfileLoading: true,
        trainerProfile: []
      });
    case TRAINER_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        trainerProfileLoading: false,
        trainerProfile: action.payload.data
      });
    case TRAINER_PROFILE_ERROR:
      return Object.assign({}, state, {
        ...state,
        trainerProfile: [],
        trainerProfileLoading: false
      });



    case JOCKEY_INFORM_STARTED:
      return Object.assign({}, state, {
        ...state,
        jockeyInFormLoading: true,
        jockeyInForm: []
      });
    case JOCKEY_INFORM_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        jockeyInFormLoading: false,
        jockeyInForm: action.payload.data
      });
    case JOCKEY_INFORM_ERROR:
      return Object.assign({}, state, {
        ...state,
        jockeyInFormProfile: [],
        jockeyInFormProfileLoading: false
      });


    case GET_IDS_STARTED:
      return Object.assign({}, state, {
        ...state,
        idsLoading: true,
        ids: []
      });
    case GET_IDS_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        idsLoading: false,
        ids: action.payload.data
      });
    case GET_IDS_ERROR:
      return Object.assign({}, state, {
        ...state,
        ids: [],
        idsLoading: false
      });


    case VENUE_PROFILE_STARTED:
      return Object.assign({}, state, {
        ...state,
        venueProfileLoading: true,
        venueProfile: []
      });
    case VENUE_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        venueProfileLoading: false,
        venueProfile: action.payload.data
      });
    case VENUE_PROFILE_ERROR:
      return Object.assign({}, state, {
        ...state,
        venueProfile: [],
        venueProfileLoading: false
      });

    // case BEST_PERFORMING_STATS_STARTED:
    //   return Object.assign({}, state, {
    //     ...state,
    //     top10StatsLoading: true,
    //     top10Stats: []
    //   });
    // case BEST_PERFORMING_STATS_SUCCESS:
    //   return Object.assign({}, state, {
    //     ...state,
    //     top10StatsLoading: false,
    //     top10Stats: action.payload.data
    //   });
    // case BEST_PERFORMING_STATS_ERROR:
    //   return Object.assign({}, state, {
    //     ...state,
    //     top10Stats: [],
    //     top10StatsLoading: false
    //   });




    case BEST_PERFORMING_HORSE_STARTED:
      return Object.assign({}, state, {
        ...state,
        bestPerformingHorseLoading: true,
        bestPerformingHorse: []
      });
    case BEST_PERFORMING_HORSE_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        bestPerformingHorseLoading: false,
        bestPerformingHorse: action.payload.data
      });
    case BEST_PERFORMING_HORSE_ERROR:
      return Object.assign({}, state, {
        ...state,
        bestPerformingHorse: [],
        bestPerformingHorseLoading: false
      });

    case BEST_PERFORMING_JOCKEY_STARTED:
      return Object.assign({}, state, {
        ...state,
        bestPerformingJockeyLoading: true,
        bestPerformingJockey: []
      });
    case BEST_PERFORMING_JOCKEY_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        bestPerformingJockeyLoading: false,
        bestPerformingJockey: action.payload.data
      });
    case BEST_PERFORMING_JOCKEY_ERROR:
      return Object.assign({}, state, {
        ...state,
        bestPerformingJockey: [],
        bestPerformingJockeyLoading: false
      });

    case BEST_PERFORMING_VENUE_STARTED:
      return Object.assign({}, state, {
        ...state,
        bestPerformingVenueLoading: true,
        bestPerformingVenue: []
      });
    case BEST_PERFORMING_VENUE_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        bestPerformingVenueLoading: false,
        bestPerformingVenue: action.payload.data
      });
    case BEST_PERFORMING_VENUE_ERROR:
      return Object.assign({}, state, {
        ...state,
        bestPerformingVenue: [],
        bestPerformingVenueLoading: false
      });


    default:
      return state;
  }
}

export default profileReducer;