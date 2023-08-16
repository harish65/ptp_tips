import {last10Winners} from '../../config/config' 

export const last10Winners_FETCH_STARTED = 'last10Winners_FETCH_STARTED';
export const last10Winners_FETCH_SUCCESS = 'last10Winners_FETCH_SUCCESS';
export const last10Winners_FETCH_ERROR = 'last10Winners_FETCH_ERROR';

const actions = {

    fetchWinners: () => async (dispatch) => {
        try {
          dispatch({
            type: last10Winners_FETCH_STARTED,
          });
  
          const response = await last10Winners()
  
          dispatch({
            type: last10Winners_FETCH_SUCCESS,
            payload: {
                info: response.info, 
            },
          });
        } catch (error) {
          console.log(error)
          dispatch({
            type: last10Winners_FETCH_ERROR,
          });
        }
    },

}

export default actions;