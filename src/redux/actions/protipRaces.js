import { getProtipRaces } from "../../config/config";

export const ProtipRaces_FETCH_STARTED = "ProtipRaces_FETCH_STARTED";
export const ProtipRaces_FETCH_SUCCESS = "ProtipRaces_FETCH_SUCCESS";
export const ProtipRaces_FETCH_ERROR = "ProtipRaces_FETCH_ERROR";

const actions = {
  getProtipRaces: () => async (dispatch) => {
    try {
      dispatch({
        type: ProtipRaces_FETCH_STARTED,
      });
       const response = await getProtipRaces()
       if(response){
        dispatch({
          type: ProtipRaces_FETCH_SUCCESS,
          payload: {
            data: response,
          },
        });
       }
       return response;
    
    } catch (error) {
      console.log(error);
      dispatch({
        type: ProtipRaces_FETCH_ERROR,
      });
    }
  },
};
export default actions;
