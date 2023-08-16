import { CurrentSubscription } from "../../config/config";

export const CURRENTSUBSCRIPTION_FETCH_STARTED = "ProductsData_FETCH_STARTED";
export const CURRENTSUBSCRIPTION_FETCH_SUCCESS = "ProductsData_FETCH_SUCCESS";
export const CURRENTSUBSCRIPTION_FETCH_ERROR = "ProductsData_FETCH_ERROR";

const actions = {

  CurrentSubscription: (data) => async (dispatch) => {
    try {
      dispatch({
        type: CURRENTSUBSCRIPTION_FETCH_STARTED,
      });

      const res = await CurrentSubscription(data);

      if (res) {
        dispatch({
          type: CURRENTSUBSCRIPTION_FETCH_SUCCESS,
          payload: res
        });
      } else {
        dispatch({ type: CURRENTSUBSCRIPTION_FETCH_ERROR });
      }
      return res;
      
    } catch (error) {
      console.log(error);
      dispatch({
        type: CURRENTSUBSCRIPTION_FETCH_ERROR,
        payload: {
          error: "error getting currentsubscription api",
        },
      });
    }
  },
};

export default actions;
