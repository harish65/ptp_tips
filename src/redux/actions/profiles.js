import {
  getHorseProfile, getJockeyProfile,
  getTrainerProfile, getJockeyInForm, getHorseJockeyTrainerId, getVenueProfile,
 bestPerformingVenue,bestPerformance
} from '../../config/config';

export const HORSE_PROFILE_STARTED = 'HORSE_PROFILE_STARTED';
export const HORSE_PROFILE_SUCCESS = 'HORSE_PROFILE_SUCCESS'
export const HORSE_PROFILE_ERROR = 'HORSE_PROFILE_ERROR';

export const JOCKEY_PROFILE_STARTED = 'JOCKEY_PROFILE_STARTED';
export const JOCKEY_PROFILE_SUCCESS = 'JOCKEY_PROFILE_SUCCESS'
export const JOCKEY_PROFILE_ERROR = 'JOCKEY_PROFILE_ERROR';

export const TRAINER_PROFILE_STARTED = 'TRAINER_PROFILE_STARTED';
export const TRAINER_PROFILE_SUCCESS = 'TRAINER_PROFILE_SUCCESS'
export const TRAINER_PROFILE_ERROR = 'TRAINER_PROFILE_ERROR';

export const JOCKEY_INFORM_STARTED = 'JOCKEY_INFORM_STARTED';
export const JOCKEY_INFORM_SUCCESS = 'JOCKEY_INFORM_SUCCESS'
export const JOCKEY_INFORM_ERROR = 'JOCKEY_INFORM_ERROR';

export const VENUE_PROFILE_STARTED = 'VENUE_PROFILE_STARTED';
export const VENUE_PROFILE_SUCCESS = 'VENUE_PROFILE_SUCCESS'
export const VENUE_PROFILE_ERROR = 'VENUE_PROFILE_ERROR';

export const GET_IDS_STARTED = 'GET_IDS_STARTED';
export const GET_IDS_SUCCESS = 'GET_IDS_SUCCESS'
export const GET_IDS_ERROR = 'GET_IDS_ERROR';

// export const BEST_PERFORMING_STATS_STARTED = 'BEST_PERFORMING_STATS_STARTED';
// export const BEST_PERFORMING_STATS_SUCCESS = 'BEST_PERFORMING_STATS_SUCCESS'
// export const BEST_PERFORMING_STATS_ERROR = 'BEST_PERFORMING_STATS_ERROR';

export const BEST_PERFORMING_HORSE_STARTED = 'BEST_PERFORMING_HORSE_STARTED';
export const BEST_PERFORMING_HORSE_SUCCESS = 'BEST_PERFORMING_HORSE_SUCCESS'
export const BEST_PERFORMING_HORSE_ERROR = 'BEST_PERFORMING_HORSE_ERROR';

export const BEST_PERFORMING_JOCKEY_STARTED = 'BEST_PERFORMING_JOCKEY_STARTED';
export const BEST_PERFORMING_JOCKEY_SUCCESS = 'BEST_PERFORMING_JOCKEY_SUCCESS'
export const BEST_PERFORMING_JOCKEY_ERROR = 'BEST_PERFORMING_JOCKEY_ERROR';

export const BEST_PERFORMING_VENUE_STARTED = 'BEST_PERFORMING_VENUE_STARTED';
export const BEST_PERFORMING_VENUE_SUCCESS = 'BEST_PERFORMING_VENUE_SUCCESS'
export const BEST_PERFORMING_VENUE_ERROR = 'BEST_PERFORMING_VENUE_ERROR';

const profileAction = {

  getProfileHorse: (data) => async (dispatch) => {
    try {
      dispatch({
        type: HORSE_PROFILE_STARTED,
      });

      await getHorseProfile(data).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: HORSE_PROFILE_SUCCESS,
            payload: {
              data: response.data,
            },
          });
        } else {
          dispatch({
            type: HORSE_PROFILE_ERROR,
          });
        }
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: HORSE_PROFILE_ERROR,
      });
    }
  },


  getProfileJockey: (data) => async (dispatch) => {
    try {
      dispatch({
        type: JOCKEY_PROFILE_STARTED,
      });

      await getJockeyProfile(data).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: JOCKEY_PROFILE_SUCCESS,
            payload: {
              data: response.data,
            },
          });
        } else {
          dispatch({
            type: JOCKEY_PROFILE_ERROR,
          });
        }
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: JOCKEY_PROFILE_ERROR,
      });
    }
  },


  getProfileTainer: (data) => async (dispatch) => {
    try {
      dispatch({
        type: TRAINER_PROFILE_STARTED,
      });

      await getTrainerProfile(data).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: TRAINER_PROFILE_SUCCESS,
            payload: {
              data: response.data,
            },
          });
        } else {
          dispatch({
            type: TRAINER_PROFILE_ERROR,
          });
        }
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: TRAINER_PROFILE_ERROR,
      });
    }
  },



  getInFormJockey: () => async (dispatch) => {
    try {
      dispatch({
        type: JOCKEY_INFORM_STARTED,
      });

      await getJockeyInForm().then((response) => {
        if (response.status === 200) {
          dispatch({
            type: JOCKEY_INFORM_SUCCESS,
            payload: {
              data: response.data,
            },
          });
        } else {
          dispatch({
            type: JOCKEY_INFORM_ERROR,
          });
        }
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: JOCKEY_INFORM_ERROR,
      });
    }
  },

  getIds: () => async (dispatch) => {
    try {
      dispatch({
        type: GET_IDS_STARTED,
      });

      await getHorseJockeyTrainerId().then((response) => {
        if (response.status === 200) {
          dispatch({
            type: GET_IDS_SUCCESS,
            payload: {
              data: response.data,
            },
          });
        } else {
          dispatch({
            type: GET_IDS_ERROR,
          });
        }
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: GET_IDS_ERROR,
      });
    }
  },

  getProfileVenue: (data) => async (dispatch) => {
    try {
      dispatch({
        type: VENUE_PROFILE_STARTED,
      });

      await getVenueProfile(data).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: VENUE_PROFILE_SUCCESS,
            payload: {
              data: response.data,
            },
          });
        } else {
          dispatch({
            type: VENUE_PROFILE_ERROR,
          });
        }
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: VENUE_PROFILE_ERROR,
      });
    }
  },


  // getBestPerformingStats: () => async (dispatch) => {
  //   try {
  //     dispatch({
  //       type: BEST_PERFORMING_STATS_STARTED,
  //     });

  //     await getTop10HorseJockeyTrainer().then((response) => {
  //       if (response.status === 200) {
  //         dispatch({
  //           type: BEST_PERFORMING_STATS_SUCCESS,
  //           payload: {
  //             data: response.data,
  //           },
  //         });
  //       } else {
  //         dispatch({
  //           type: BEST_PERFORMING_STATS_ERROR,
  //         });
  //       }
  //     })
  //   } catch (error) {
  //     console.log(error)
  //     dispatch({
  //       type: BEST_PERFORMING_STATS_ERROR,
  //     });
  //   }
  // },

  // getBestPerformingStats: () => async (dispatch) => {
  //   try {
  //     dispatch({
  //       type: BEST_PERFORMING_STATS_STARTED,
  //     });
  //     let data = []
  //     await getTop10PerformingHorses().then((response) => {
  //       if (response.status === 200) {
  //         data.push({ horse: response.data })
  //       } else {
  //         data.push({ horse: null })
  //       }
  //     })
  //     await getTop10PerformingJockeys().then((response) => {
  //       if (response.status === 200) {
  //         data.push({ jockey: response.data })
  //       } else {
  //         data.push({ jockey: null })
  //       }
  //     })
  //     await getTop10Performingtrainers().then((response) => {
  //       if (response.status === 200) {
  //         data.push({ trainer: response.data })
  //       } else {
  //         data.push({ trainer: null })
  //       }
  //     })
  //     await getTop10PerformingVenues().then((response) => {
  //       if (response.status === 200) {
  //         data.push({ venue: response.data })
  //       } else {
  //         data.push({ venue: null })
  //       }
  //     })

  //     if (data.length > 0) {
  //       dispatch({
  //         type: BEST_PERFORMING_STATS_SUCCESS,
  //         payload: {
  //           data: data,
  //         },
  //       })
  //     } else {
  //       dispatch({
  //         type: BEST_PERFORMING_STATS_ERROR,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     dispatch({
  //       type: BEST_PERFORMING_STATS_ERROR,
  //     });
  //   }
  // },
  bestPerformingHorse: (data) => async (dispatch) => {
    try {
      dispatch({
        type: BEST_PERFORMING_HORSE_STARTED,
      });

      await bestPerformance(data).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: BEST_PERFORMING_HORSE_SUCCESS,
            payload: {
              data: response.data,
            },
          });
        } else {
          dispatch({
            type: BEST_PERFORMING_HORSE_ERROR,
          });
        }
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: BEST_PERFORMING_HORSE_ERROR,
      });
    }

  },
  bestPerformingJockey: (data) => async (dispatch) => {
    try {
      dispatch({
        type: BEST_PERFORMING_JOCKEY_STARTED,
      });

      await bestPerformance(data).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: BEST_PERFORMING_JOCKEY_SUCCESS,
            payload: {
              data: response.data,
            },
          });
        } else {
          dispatch({
            type: BEST_PERFORMING_JOCKEY_ERROR,
          });
        }
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: BEST_PERFORMING_JOCKEY_ERROR,
      });
    }

  },

  bestPerformingVenue: (data) => async (dispatch) => {
    try {
      dispatch({
        type: BEST_PERFORMING_VENUE_STARTED,
      });

      await bestPerformingVenue(data).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: BEST_PERFORMING_VENUE_SUCCESS,
            payload: {
              data: response.data,
            },
          });
        } else {
          dispatch({
            type: BEST_PERFORMING_VENUE_ERROR,
          });
        }
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: BEST_PERFORMING_VENUE_ERROR,
      });
    }

  },

}
export default profileAction;