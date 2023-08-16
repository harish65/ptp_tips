import {Last10WinnersRegular} from '../../config/config' 

export const last10WinnersReg_FETCH_STARTED = 'last10WinnersReg_FETCH_STARTED';
export const last10WinnersReg_FETCH_SUCCESS = 'last10WinnersReg_FETCH_SUCCESS';
export const last10WinnersReg_FETCH_ERROR = 'last10WinnersReg_FETCH_ERROR';

const actions = {

    fetchWinners: () => async (dispatch) => {
        try {
          dispatch({
            type: last10WinnersReg_FETCH_STARTED,
          });
  
          const response = await Last10WinnersRegular()
          dispatch({
            type: last10WinnersReg_FETCH_SUCCESS,
            payload: {
                info:response.info, 
            },
          });
        } catch (error) {
          console.log(error)
          dispatch({
            type: last10WinnersReg_FETCH_ERROR,
          });
        }
    },

}

export default actions;