import { updateOdds_STARTED, updateOdds_SUCCESS, updateOdds_ERROR } from '../actions/oddsUpdate';
const defaultState = {
    loading: false,
    errorMessage: '',
};

function raceReducer(state = defaultState, action) {
    switch (action.type) {
        case updateOdds_STARTED:
            return Object.assign({}, state, {
                ...state,
                loading: true,
                errorMessage: '',
            });
        case updateOdds_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                errorMessage: '',
            });
        case updateOdds_ERROR:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                errorMessage: action.payload.error,
            });
        default:
            return state;
    }
}

export default raceReducer;