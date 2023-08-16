import { getnext10tips, getlast10tips, getselections, getFutureTips, } from '../../config/config';

export const NEXT10_FETCH_STARTED = 'NEXT10_FETCH_STARTED';
export const NEXT10_FETCH_SUCCESS = 'NEXT10_FETCH_SUCCESS';
export const NEXT10_FETCH_ERROR = 'NEXT10_FETCH_ERROR';

export const LAST10_FETCH_STARTED = 'LAST10_FETCH_STARTED';
export const LAST10_FETCH_SUCCESS = 'LAST10_FETCH_SUCCESS';
export const LAST10_FETCH_ERROR = 'LAST10_FETCH_ERROR';

export const FUTURETIPS_FETCH_STARTED = 'FUTURETIPS_FETCH_STARTED';
export const FUTURETIPS_FETCH_SUCCESS = 'FUTURETIPS_FETCH_SUCCESS';
export const FUTURETIPS_FETCH_ERROR = 'FUTURETIPS_FETCH_ERROR';

export const SELECTION_FETCH_STARTED = 'SELECTION_FETCH_STARTED';
export const SELECTION_FETCH_SUCCESS = 'SELECTION_FETCH_SUCCESS';
export const SELECTION_FETCH_ERROR = 'SELECTION_FETCH_ERROR';

export const FULL_SCREEN = 'FULL_SCREEN'
export const SELECT_NR_LAST = 'SELECT_NR_LAST'
export const SELECT_NR_NEXT = 'SELECT_NR_NEXT'
export const SELECT_CTC_NEXT = 'SELECT_CTC_NEXT'
export const SELECT_CTC_LAST = 'SELECT_CTC_LAST'

const actions = {

  getNextTen: (boolean) => async (dispatch) => {
    try {
      dispatch({
        type: NEXT10_FETCH_STARTED,
      });

      const headers = {
        headers: { Authorization: `PTPTIPS ` + localStorage.getItem('PTPToken') }
      };

      await getnext10tips(boolean, headers, localStorage.getItem('PTPToken')).then((response) => {
        if (response.status === 200) {
          // console.log('next tips', response)
          dispatch({
            type: NEXT10_FETCH_SUCCESS,
            payload: {
              nextTips: response.data.nextTips,
            },
          });
          if(response.tokenize === 'logout'){
            localStorage.removeItem('PTPToken')
            dispatch({
              type: 'LOGOUT_USER',
            });
          }
        } else {
          dispatch({
            type: NEXT10_FETCH_ERROR,
          });
        }
      })
    } catch (error) {
      //console.log(error)
      dispatch({
        type: NEXT10_FETCH_ERROR,
      });
    }
  },

  getFutureTips: () => async (dispatch) => {
    try {
      dispatch({
        type: FUTURETIPS_FETCH_STARTED
      });
      await getFutureTips().then((response) => {
        if (response.status === 200) {
          dispatch({
            type: FUTURETIPS_FETCH_SUCCESS,
            payload: {
              futureTips: response.data,
            },
          });
        } else {
          dispatch({
            type: FUTURETIPS_FETCH_ERROR,
          });
        }
      })
    } catch (error) {
      //console.log(error)
      dispatch({
        type: FUTURETIPS_FETCH_ERROR,
      });
    }
  },

  getNextTenNoReload: (boolean) => async (dispatch) => {
    try {

      const headers = {
        headers: { Authorization: `PTPTIPS ` + localStorage.getItem('PTPToken')}
      };

      await getnext10tips(boolean, headers, localStorage.getItem('PTPToken')).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: NEXT10_FETCH_SUCCESS,
            payload: {
              nextTips: response.data.nextTips,
            },
          });
          // console.log('NEXT 10', response.data.nextTips)
          if(response.tokenize === 'logout'){
            localStorage.removeItem('PTPToken')
            dispatch({
              type: 'LOGOUT_USER',
            });
          }
        }
      })
    } catch (error) {
      //console.log(error)
      dispatch({
        type: NEXT10_FETCH_ERROR,
      });
    }
  },

  getLastTen: (boolean) => async (dispatch) => {
    try {
      dispatch({
        type: LAST10_FETCH_STARTED,
      });

      const headers = {
        headers: { Authorization: `PTPTIPS ` + localStorage.getItem('PTPToken')}
      };

      await getlast10tips(boolean, headers).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: LAST10_FETCH_SUCCESS,
            payload: {
              lastTips: response.data.lastTips,
            },
          });
        } else {
          dispatch({
            type: LAST10_FETCH_ERROR,
          });
        }
      })
    } catch (error) {
      //console.log(error)
      dispatch({
        type: LAST10_FETCH_ERROR,
      });
    }
  },

  getLastTenNoReload: (boolean) => async (dispatch) => {
    try {

      const headers = {
        headers: { Authorization: `PTPTIPS ` + localStorage.getItem('PTPToken') }
      };

      await getlast10tips(boolean, headers).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: LAST10_FETCH_SUCCESS,
            payload: {
              lastTips: response.data.lastTips,
            },
          });
        }
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: LAST10_FETCH_ERROR,
      });
    }
  },

  getSelectionsForDate: (date) => async (dispatch) => {
    try {
      dispatch({
        type: SELECTION_FETCH_STARTED,
      });

      const response = await getselections(date)

      dispatch({
        type: SELECTION_FETCH_SUCCESS,
        payload: {
          selections: response.selections,
        },
      });
    } catch (error) {
      //console.log(error)
      dispatch({
        type: SELECTION_FETCH_ERROR,
      });
    }
  },

  getSelectionsForDateNoLoading: (date) => async (dispatch) => {
    try {
      const response = await getselections(date)

      dispatch({
        type: SELECTION_FETCH_SUCCESS,
        payload: {
          selections: response.selections,
        },
      });
    } catch (error) {
      //console.log(error)
      dispatch({
        type: SELECTION_FETCH_ERROR,
      });
    }
  },


  fullScreen: (boolean) => async (dispatch) => {
    try {
      dispatch({
        type: FULL_SCREEN,
        payload: {
          state: boolean
        }
      });
    } catch (error) {
      //console.log(error)
    }
  },

  selectNRLast: (boolean) => async (dispatch) => {
    dispatch({
      type: SELECT_NR_LAST,
      payload: {
        data: boolean
      }
    });
  },

  selectNRNext: (boolean) => async (dispatch) => {
    dispatch({
      type: SELECT_NR_NEXT,
      payload: {
        data: boolean
      }
    });
  },

  selectCTCN: (boolean) => async (dispatch) => {
    dispatch({
      type: SELECT_CTC_NEXT,
      payload: {
        data: boolean
      }
    });
  },

  selectCTCL: (boolean) => async (dispatch) => {
    dispatch({
      type: SELECT_CTC_LAST,
      payload: {
        data: boolean
      }
    });
  },




}

export default actions;