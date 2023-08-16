import { getResults } from '../../config/config';

export const RESULT_FETCH_STARTED = 'RESULT_FETCH_STARTED';
export const RESULT_FETCH_SUCCESS = 'RESULT_FETCH_SUCCESS';
export const RESULT_FETCH_ERROR = 'RESULT_FETCH_ERROR';
export const SET_SELECTED_VENUE = 'SET_SELECTED_VENUE'

const resultAction = {

  getResults: (date) => async (dispatch) => {
    try {
      dispatch({
        type: RESULT_FETCH_STARTED,
      });
      await getResults(date).then(response=>{
       dispatch({
         type: RESULT_FETCH_SUCCESS,
         payload: {
           results: response?.results,
           daily_results: response?.performance?.daily_results,
           day_of_week_history:response?.performance?.day_of_week_history,
         },
       });
     })
    } catch (error) {
      console.log(error)
      dispatch({
        type: RESULT_FETCH_ERROR,
      });
    }
  },


  getResultsForDateNoLoading: (date) => async (dispatch) => {
    try {
       await getResults(date).then(response=>{
        dispatch({
          type: RESULT_FETCH_SUCCESS,
          payload: {
            results: response?.results,
            daily_results: response?.performance?.daily_results,
            day_of_week_history:response?.performance?.day_of_week_history,
          },
        });
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: RESULT_FETCH_ERROR,
      });
    }
  },

  setSelectedVenue:(data) => async (dispatch) => {
    dispatch({
      type: SET_SELECTED_VENUE,
      data: data
    });
  },
}

export default resultAction;