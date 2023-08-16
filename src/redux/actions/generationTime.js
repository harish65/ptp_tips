import { getGenerationTime } from '../../config/config';

export const TIME_FETCH_STARTED = 'TIME_FETCH_STARTED';
export const TIME_FETCH_SUCCESS = 'TIME_FETCH_SUCCESS';
export const TIME_FETCH_ERROR = 'TIME_FETCH_ERROR';

const actions = {
/*******************************NO MORE NEEDED AFTER OPTIMISATION *************************************/
  GenerationTime: (data) => async (dispatch) => {
    try {
      dispatch({
        type: TIME_FETCH_STARTED,
      });
      await getGenerationTime(data).then((response) => {
        dispatch({
          type: TIME_FETCH_SUCCESS,
          payload: {
            info: response.info,
          },
        })
      })
    }
    catch (error) {
      console.log(error)
      dispatch({
        type: TIME_FETCH_ERROR,
        payload: {
          error: 'error getting generation time'
        }
      });
    }
  }
}

export default actions;