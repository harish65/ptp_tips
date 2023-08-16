import { } from '../../config/config'

//import moment from 'moment-timezone'

export const ON_NOW_SUCCESS = 'ON_NOW_SUCCESS'
export const ON_NOW_ERROR = 'ON_NOW_ERROR'

export const ON_NOW_SUCCESS_SAME = 'ON_NOW_SUCCESS_SAME'

const onNowAction = {
    onNowRaceInfo: (data) => async (dispatch) => {
        try {
            dispatch({
                type: ON_NOW_SUCCESS,
                payload: {
                    trackInfo: data[0],
                    horses: data[1],
                    generationTime: data[2],
                    oldHorses: []
                },
            });
        } catch (error) {
            console.log(error)
            dispatch({
                type: ON_NOW_ERROR,
                payload: {
                    error: 'Please try again'
                }
            })
        }
    },
    
    onNowRaceSame: (data) => async (dispatch) => {
        try {
            dispatch({
                type: ON_NOW_SUCCESS_SAME,
                payload: {
                    trackInfo: data[0],
                    horses: data[1],
                    generationTime: data[2],
                },
            });
        } catch (error) {
            console.log(error)
            dispatch({
                type: ON_NOW_ERROR,
                payload: {
                    error: 'Please try again'
                }
            })
        }
    },
}

export default onNowAction;