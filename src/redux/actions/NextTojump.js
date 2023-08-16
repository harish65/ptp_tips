import {NextTojump} from '../../config/config' 

export const NextTojump_FETCH_STARTED = 'NextTojump_FETCH_STARTED';
export const NextTojump_FETCH_SUCCESS = 'NextTojump_FETCH_SUCCESS';
export const NextTojump_FETCH_ERROR = 'NextTojump_FETCH_ERROR';

const actions = {

    NextTojump: () => async (dispatch) => {
        try {
          dispatch({
            type: NextTojump_FETCH_STARTED,
          });
  
          const response = await NextTojump()
  
          dispatch({
            type: NextTojump_FETCH_SUCCESS,
            payload: {
                info: response.info, 
            },
          });
        } catch (error) {
          console.log(error)
          dispatch({
            type: NextTojump_FETCH_ERROR,
          });
        }
    },
}

export default actions;