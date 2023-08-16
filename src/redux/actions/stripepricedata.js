import { getProductslist } from "../../config/config";
import { SubscriptionData } from "../../config/config";

export const ProductsData_FETCH_STARTED = "ProductsData_FETCH_STARTED";
export const ProductsData_FETCH_SUCCESS = "ProductsData_FETCH_SUCCESS";
export const ProductsData_FETCH_ERROR = "ProductsData_FETCH_ERROR";

export const Subscription_FETCH_STARTED = "ProductsData_FETCH_STARTED";
export const Subscription_FETCH_SUCCESS = "ProductsData_FETCH_SUCCESS";
export const Subscription_FETCH_ERROR = "ProductsData_FETCH_ERROR";

const actions = {
  getProductslist: () => async (dispatch) => {
    try {
      dispatch({
        type: ProductsData_FETCH_STARTED,
      });
      const res = await getProductslist();
      if(res){
        dispatch({
          type: ProductsData_FETCH_SUCCESS,
          payload: {
            data: res,
          },
        });
      }
        return res
      // await getProductslist().then((response) => {
      //   dispatch({
      //     type: ProductsData_FETCH_SUCCESS,
      //     payload: {
      //       data: response,
      //     },
      //   });
      // });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ProductsData_FETCH_ERROR,
      });
    }
  },

  SubscriptionData: (data) => async (dispatch) => {
    try {
      dispatch({
        type: Subscription_FETCH_STARTED,
      });

      const res = await SubscriptionData(data);

      if (res) {
        dispatch({
          type: Subscription_FETCH_SUCCESS,
          payload: {
            subsciption: res,
          },
        });
      } else {
        dispatch({ type: Subscription_FETCH_ERROR });
      }
      return res;
    } catch (error) {
      console.log(error);
      dispatch({
        type: Subscription_FETCH_ERROR,
        payload: {
          error: "error getting subscription api",
        },
      });
    }
  },
};

export default actions;
