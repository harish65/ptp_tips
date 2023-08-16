import {
  getHorseJockeyTrainerForAnalytics,
  getVenuesForAnalytics,
  getAnalyticsResults
} from '../../config/config';
import { toast } from 'react-toastify'
// import { getFirstHorses } from '../../../server/app/controllers/api.controller';

export const RESULTS_ANALYTICS_STARTED = 'RESULTS_ANALYTICS_STARTED'
export const RESULTS_ANALYTICS_SUCCESS = 'RESULTS_ANALYTICS_SUCCESS'
export const RESULTS_ANALYTICS_ERROR = 'RESULTS_ANALYTICS_ERROR'

export const TRACKS_SELECTED_STARTED = 'TRACKS_SELECTED_STARTED'
export const TRACKS_SELECTED_SUCCESS = 'TRACKS_SELECTED_SUCCESS'
export const TRACKS_SELECTED_ERROR = 'TRACKS_SELECTED_ERROR'

export const HJT_SELECTED_STARTED = 'HJT_SELECTED_STARTED'
export const HJT_SELECTED_SUCCESS = 'HJT_SELECTED_SUCCESS'
export const HJT_SELECTED_ERROR = 'HJT_SELECTED_ERROR'



const racesActions = {

  getResultsUser: (data) => async (dispatch) => {
    try {
      dispatch({
        type: RESULTS_ANALYTICS_STARTED,
      });
      let response = await getAnalyticsResults(data)
      dispatch({
        type: RESULTS_ANALYTICS_SUCCESS,
        payload: {
          data: response,
        },
      });
    } catch (error) {
      toast.error('ERROR GETTING venues BASED ON USER PREF' + error)
      dispatch({
        type: RESULTS_ANALYTICS_ERROR,
      });
    }
  },
  getTracksUser: (data) => async (dispatch) => {
    try {
      dispatch({
        type: TRACKS_SELECTED_STARTED,
      });
      let response = await getVenuesForAnalytics(data)
      dispatch({
        type: TRACKS_SELECTED_SUCCESS,
        payload: {
          data: response,
        },
      });
    } catch (error) {
      toast.error('ERROR GETTING ALL RESULTS BASED ON USER PREF' + error)
      dispatch({
        type: TRACKS_SELECTED_ERROR,
      });
    }
  },

  getHJTUser: (data) => async (dispatch) => {
    try {
      dispatch({
        type: HJT_SELECTED_STARTED,
      });
      let response = await getHorseJockeyTrainerForAnalytics(data)
      dispatch({
        type: HJT_SELECTED_SUCCESS,
        payload: {
          data: response,
        },
      });
    } catch (error) {
      toast.error('ERROR GETTING ALL RESULTS BASED ON USER PREF' + error)
      dispatch({
        type: HJT_SELECTED_ERROR,
      });
    }
  },



};

export default racesActions;



