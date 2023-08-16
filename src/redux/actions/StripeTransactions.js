import { StripeTransactions } from "../../config/config";

export const StripeTransactions_FETCH_STARTED = "ProductsData_FETCH_STARTED";
export const StripeTransactions_FETCH_SUCCESS = "ProductsData_FETCH_SUCCESS";
export const StripeTransactions_FETCH_ERROR = "ProductsData_FETCH_ERROR";

const actions = {

  StripeTransactions: (data) => async (dispatch) => {
    try {
      dispatch({
        type: StripeTransactions_FETCH_STARTED,
      });

      const res = await StripeTransactions(data);

      if (res) {
        dispatch({
          type: StripeTransactions_FETCH_STARTED,
          payload: res
        });
      } else {
        dispatch({ type: StripeTransactions_FETCH_SUCCESS });
      }
      return res;
      
    } catch (error) {
      console.log(error);
      dispatch({
        type: StripeTransactions_FETCH_ERROR,
        payload: {
          error: "error getting StripeTransactions api",
        },
      });
    }
  },
};

export default actions;
