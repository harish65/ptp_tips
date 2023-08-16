import {
    RESULTS_ANALYTICS_STARTED, RESULTS_ANALYTICS_SUCCESS, RESULTS_ANALYTICS_ERROR,
    TRACKS_SELECTED_STARTED, TRACKS_SELECTED_SUCCESS, TRACKS_SELECTED_ERROR,
    HJT_SELECTED_STARTED, HJT_SELECTED_SUCCESS, HJT_SELECTED_ERROR,
} from '../actions/racesAnalytics';

const defaultState = {
    topTracksMonth: [],
    resultsUser: [],
    tracksUser: [],
    hjt: [],
    hjtLoading: false,
    tracksUserLoading: false,
    resultsUserLoading: false,
    isLoading: false,

};

function racesReducer(state = defaultState, action) {
    switch (action.type) {
        case RESULTS_ANALYTICS_STARTED:
            return Object.assign({}, state, {
                resultsUserLoading: true
            });
        case RESULTS_ANALYTICS_SUCCESS:
            return Object.assign({}, state, {
                resultsUserLoading: false,
                resultsUser: action.payload.data,
            });
        case RESULTS_ANALYTICS_ERROR:
            return Object.assign({}, state, {
                resultsUserLoading: false,
                resultsUser: [],
            });

        case TRACKS_SELECTED_STARTED:
            return Object.assign({}, state, {
                tracksUserLoading: true
            });
        case TRACKS_SELECTED_SUCCESS:
            return Object.assign({}, state, {
                tracksUserLoading: false,
                tracksUser: action.payload.data,
            });
        case TRACKS_SELECTED_ERROR:
            return Object.assign({}, state, {
                tracksUserLoading: false,
                tracksUser: [],
            });

        case HJT_SELECTED_STARTED:
            return Object.assign({}, state, {
                hjtLoading: true
            });
        case HJT_SELECTED_SUCCESS:
            return Object.assign({}, state, {
                hjtLoading: false,
                hjt: action.payload.data,
            });
        case HJT_SELECTED_ERROR:
            return Object.assign({}, state, {
                hjtLoading: false,
                hjt: [],
            });

        // case FIRST_HORSES_SELECTED_STARTED:
        //     return Object.assign({}, state, {
        //         loadingFirstHorses: true
        //     });
        // case FIRST_HORSES_SELECTED_SUCCESS:
        //     return Object.assign({}, state, {
        //         loadingFirstHorses: false,
        //         fHorses: action.payload.data,
        //     });
        // case FIRST_HORSES_SELECTED_ERROR:
        //     return Object.assign({}, state, {
        //         loadingFirstHorses: false,
        //         fHorses: [],
        //     });
        default:
            return state;
    }
}

export default racesReducer;
