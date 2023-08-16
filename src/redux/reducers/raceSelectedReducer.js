import { raceSelected_STARTED, raceSelected_SUCCESS, raceSelected_ERROR } from '../actions/raceSelected'
const defaultState = {
    point_id: null,
    loading: false,
    errorMessage: '',
};

function raceSelectedReducer(state = defaultState, action) {
    switch (action.type) {
        case raceSelected_STARTED:
            return Object.assign({}, state, {
                ...state,
                loading: true,
                errorMessage: '',
            });
        case raceSelected_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                errorMessage: '',
                point_id: action.payload.point_id,
            });
        case raceSelected_ERROR:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                point_id: null,
                errorMessage: action.payload.error,
            });
        default:
            return state;
    }
}

export default raceSelectedReducer;