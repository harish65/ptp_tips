import { getHomeData } from "../../config/config";

export const HOME_FETCH_STARTED = "HOME_FETCH_STARTED";
export const HOME_FETCH_SUCCESS = "HOME_FETCH_SUCCESS";
export const HOME_FETCH_ERROR = "HOME_FETCH_ERROR";

const actions = {
  fetchHome: () => async (dispatch) => {
    try {
      dispatch({
        type: HOME_FETCH_STARTED,
      });

      const response = await getHomeData();

      dispatch({
        type: HOME_FETCH_SUCCESS,
        payload: {
          monthlyTable: response.monthlyTable,
          dailyTable: response.dailyTable,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: HOME_FETCH_ERROR,
      });
    }
  },
};

export default actions;
