import {
    VENUE_RACES_STARTED,
    VENUE_RACES_SUCCESS,
    VENUE_RACES_ERROR,
    LOAD_VENUES,
    LOAD_COMMENTS,
} from '../actions/venue';

const defaultState = {
    venues: [],
    allvenues: [],
    venuesCmts: [],
    venuesLoading: false,

};

function venueReducer(state = defaultState, action) {
    switch (action.type) {

        case VENUE_RACES_STARTED:
            return Object.assign({}, state, {
                ...state,
                venuesLoading: true,
                venues: []
            });
        case VENUE_RACES_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                venuesLoading: false,
                venues: action.payload.data
            });
        case VENUE_RACES_ERROR:
            return Object.assign({}, state, {
                ...state,
                venues: [],
                venuesLoading: false
            });

        case LOAD_VENUES:
            return Object.assign(({}, state, {
                ...state,
                allvenues: action.payload.data
            }));
        case LOAD_COMMENTS:
            return Object.assign(({}, state, {
                ...state,
                venuesCmts: action.payload.data
            }))

        default:
            return state;
    }
}

export default venueReducer;