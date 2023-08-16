import {
  // getRaceInfo, /////////////
  getRaceInfoOptimized /* New */,
  getRaceInfoOptimizedNextPrev,
  // getRaceInfoNextOrLast, /////////
  // getVenueselections, ///////////
  getVenueselectionsOpt /* New */,
  getRaces,
  getRacesByDate,
  getFormings,
  loadRaceForm,
  loadSingleRace,
  getAllScratching,
  GetRaceResultsAnalytics,
  NextTojump,
} from "../../config/config";
// import { toast } from "react-toastify";
import { checkRouteDate } from "../../config/utils";
import moment from "moment-timezone";

/********************************************************** */
// export const RACE_FETCH_STARTED = 'RACE_FETCH_STARTED';
// export const RACE_FETCH_SUCCESS = 'RACE_FETCH_SUCCESS';
// export const RACE_FETCH_ERROR = 'RACE_FETCH_ERROR';

export const RACEOPT_FETCH_STARTED = "RACEOPT_FETCH_STARTED";
export const RACEOPT_FETCH_SUCCESS = "RACEOPT_FETCH_SUCCESS";
export const RACEOPT_FETCH_ERROR = "RACEOPT_FETCH_ERROR";
/************************************************************** */

export const GET_RACES_STARTED = "GET_RACES_STARTED";
export const GET_RACES_SUCCESS = "GET_RACES_SUCCESS";
export const GET_RACES_ERROR = "GET_RACES_ERROR";

export const RACES_BY_DATE_STARTED = "RACES_BY_DATE_STARTED";
export const RACES_BY_DATE_SUCCESS = "RACES_BY_DATE_SUCCESS";
export const RACES_BY_DATE_ERROR = "RACES_BY_DATE_ERROR";

export const FORMING_STARTED = "FORMING_STARTED";
export const FORMING_SUCCESS = "FORMING_SUCCESS";
export const FORMING_ERROR = "FORMING_ERROR";

export const RACE_FORM_STARTED = "RACE_FORM_STARTED";
export const RACE_FORM_SUCCESS = "RACE_FORM_SUCCESS";
export const RACE_FORM_ERROR = "RACE_FORM_ERROR";

export const LOAD_SINGLE_RACE_STARTED = "LOAD_SINGLE_RACE_STARTED";
export const LOAD_SINGLE_RACE_SUCCESS = "LOAD_SINGLE_RACE_SUCCESS";
export const LOAD_SINGLE_RACE_ERROR = "LOAD_SINGLE_RACE_ERROR";

export const CHANGE_RACE_TABS = "CHANGE_RACE_TABS";
export const RESET_SPEED_MAP_TRUE = "RESET_SPEED_MAP_TRUE";
export const RESET_SPEED_MAP_FALSE = "RESET_SPEED_MAP_FALSE";

export const SET_FORMING_RACE_STARTED = "SET_FORMING_RACE_STARTED";
export const SET_FORMING_RACE = "SET_FORMING_RACE";

export const LOAD_SCRATCHINGS_STARTED = "LOAD_SCRATCHINGS_STARTED";
export const LOAD_SCRATCHINGS_SUCCESS = "LOAD_SCRATCHINGS_SUCCESS";
export const LOAD_SCRATCHINGS_ERROR = "LOAD_SCRATCHINGS_ERROR";

export const STATS_FETCH_STARTED = "STATS_FETCH_STARTED";
export const STATS_FETCH_SUCCESS = "STATS_FETCH_SUCCESS";
export const STATS_FETCH_ERROR = "STATS_FETCH_ERROR";

export const SET_RACE_LMM = "SET_RACE_LMM";

const raceAction = {
  /******************************************************************************************** */
  /******************************************************************************************** */
  /******************************************************************************************** */
  /* remove after OPT */
  // getRaceInfo: (data) => async (dispatch) => {
  //   try {
  //     dispatch({
  //       type: RACE_FETCH_STARTED,
  //     });

  //     await getRaceInfo(data).then((response) => {
  //       if (response.status === 200) {
  //         dispatch({
  //           type: RACE_FETCH_SUCCESS,
  //           payload: {
  //             data: response.data.trackInfo,
  //             horses: response.data.horses,
  //             point_id: response.data.point_id,
  //             mm: response.data.mm,
  //             lbmm: response.data.lbmm,
  //           },
  //         });
  //       } else {
  //         dispatch({
  //           type: RACE_FETCH_ERROR,
  //           payload: {
  //             error: response.message,
  //           }
  //         });
  //       }
  //     })
  //   } catch (error) {
  //     console.log(error)
  //     dispatch({
  //       type: RACE_FETCH_ERROR,
  //       payload: {
  //         error: 'Please try again'
  //       }
  //     });
  //   }
  // },
  // /* remove after OPT */
  // getRaceInfoNoLoading: (data) => async (dispatch) => {
  //   try {
  //     await getRaceInfo(data).then((response) => {
  //       if (response.status === 200) {
  //         dispatch({
  //           type: RACE_FETCH_SUCCESS,
  //           payload: {
  //             data: response.data.trackInfo,
  //             horses: response.data.horses,
  //             point_id: response.data.point_id,
  //             mm: response.data.mm,
  //             lbmm: response.data.lbmm,
  //           },
  //         });
  //       } else {
  //         dispatch({
  //           type: RACE_FETCH_ERROR,
  //           payload: {
  //             error: response.message,
  //           }
  //         });
  //       }
  //     })
  //   } catch (error) {
  //     console.log(error)
  //     dispatch({
  //       type: RACE_FETCH_ERROR,
  //       payload: {
  //         error: 'Please try again'
  //       }
  //     });
  //   }
  // },

  getRaceInfoOpt: (data, load, raceResulted) => async (dispatch) => {
    try {
      if (load === true) {
        dispatch({
          type: RACEOPT_FETCH_STARTED,
        });
      }
      if (raceResulted === 0) {
        await getRaceInfoOptimized(data).then(async (response) => {
          if (response.status === 200) {
            // console.log('raceInfo', response.data)
            dispatch({
              type: RACEOPT_FETCH_SUCCESS,
              payload: {
                data: response.data.trackInfo,
                horses: response.data.horses,
                dateVenues: response.data.venues,
                point_id: response.data.point_id,
                generationTime: response.data.generationTime,
                loadNewRace: load,
                allDayResult: response.data.allDayResult,
                allRacesDayResults: response.data?.allRacesDayResults[0],
              },
            });
          } else {
            dispatch({
              type: RACEOPT_FETCH_ERROR,
              payload: {
                error: response.message,
              },
            });
          }
        });
      }
    } catch (error) {
      //console.log(error)
      dispatch({
        type: RACEOPT_FETCH_ERROR,
        payload: {
          error: "Please try again",
        },
      });
      dispatch({
        type: STATS_FETCH_ERROR,
      });
    }
  },

  /******************************************************************************************** */
  /******************************************************************************************** */
  /******************************************************************************************** */
  /* remove after optimizing */
  // getRaceNextOrLast: (data) => async (dispatch) => {
  //   try {
  //     dispatch({
  //       type: RACE_FETCH_STARTED,
  //     });

  //     await getRaceInfoNextOrLast(data).then((response) => {
  //       if (response.status === 200) {
  //         dispatch({
  //           type: RACE_FETCH_SUCCESS,
  //           payload: {
  //             data: response.data.trackInfo,
  //             horses: response.data.horses,
  //             point_id: response.data.point_id,
  //             mm: response.data.mm,
  //             lbmm: response.data.lbmm,
  //           },
  //         });
  //       } else {
  //         dispatch({
  //           type: RACE_FETCH_ERROR,
  //           payload: {
  //             error: response.message,
  //           }
  //         });
  //       }
  //     })
  //   } catch (error) {
  //     console.log(error)
  //     dispatch({
  //       type: RACE_FETCH_ERROR,
  //       payload: {
  //         error: 'Please try again'
  //       }
  //     });
  //   }
  // },

  getRaceNextOrLastOpt:
    (data, history, date, trackCode) => async (dispatch) => {
      try {
        dispatch({
          type: RACEOPT_FETCH_STARTED,
        });
        await getRaceInfoOptimizedNextPrev(data).then((response) => {
          if (response.status === 200) {
            // console.log(response)
            history.push(
              `/horse-racing-tips/${checkRouteDate(
                moment(response.data.trackInfo.meetdate)
                  .tz("Australia/Sydney")
                  .format("DD-MM-YYYY")
              )}/${response.data.trackInfo.track_name}/R${
                response.data.trackInfo.race_num
              }/${response.data.point_id}`
            );
          } else {
            dispatch({
              type: RACEOPT_FETCH_ERROR,
              payload: {
                error: response.message,
              },
            });
          }
        });
      } catch (error) {
        //console.log(error)
        dispatch({
          type: RACEOPT_FETCH_ERROR,
          payload: {
            error: "Please try again",
          },
        });
        dispatch({
          type: STATS_FETCH_ERROR,
        });
      }
    },

  // getRaceWithoutRouteOpt: (data, date) => async (dispatch) => {
  //   try {
  //     dispatch({
  //       type: STATS_FETCH_STARTED,
  //     });
  //     dispatch({
  //       type: RACEOPT_FETCH_STARTED,
  //     });

  //     await getRaceInfoOptimized(data).then(async (response) => {
  //       if (response.status === 200) {
  //         dispatch({
  //           type: RACEOPT_FETCH_SUCCESS,
  //           payload: {
  //             data: response.data.trackInfo,
  //             horses: response.data.horses,
  //             dateVenues: response.data.venues,
  //             point_id: response.data.point_id,
  //             generationTime: response.data.generationTime,
  //             loadNewRace: true,
  //           },
  //         });

  //         await GetRaceResultsAnalytics({ date: date, trackCode: response.data.trackInfo[0].trackcode }).then((stats) => {
  //           dispatch({
  //             type: STATS_FETCH_SUCCESS,
  //             payload: {
  //               data: stats.data,
  //             },
  //           });
  //         })
  //       } else {
  //         dispatch({
  //           type: RACEOPT_FETCH_ERROR,
  //           payload: {
  //             error: response.message,
  //           }
  //         });
  //       }
  //     })
  //   } catch (error) {
  //     console.log(error)
  //     dispatch({
  //       type: RACEOPT_FETCH_ERROR,
  //       payload: {
  //         error: 'Please try again'
  //       }
  //     });
  //     dispatch({
  //       type: STATS_FETCH_ERROR,
  //     });
  //   }
  // },

  /******************************************************************************************** */
  /******************************************************************************************** */
  /******************************************************************************************** */
  /*remove after optimization */
  // getVenueSelectionsForDate: (data) => async (dispatch) => {
  //   try {
  //     dispatch({
  //       type: RACE_FETCH_STARTED,
  //     });

  //     await getVenueselections(data).then((response) => {
  //       if (response.status === 200) {
  //         dispatch({
  //           type: RACE_FETCH_SUCCESS,
  //           payload: {
  //             data: response.data.trackInfo,
  //             horses: response.data.horses,
  //             point_id: response.data.point_id,
  //             mm: response.data.mm,
  //             lbmm: response.data.lbmm,
  //           },
  //         });
  //       } else {
  //         dispatch({
  //           type: RACE_FETCH_ERROR,
  //           payload: {
  //             error: response.data.message,
  //           }
  //         });
  //       }
  //     })
  //   } catch (error) {
  //     console.log(error)
  //     dispatch({
  //       type: RACE_FETCH_ERROR,
  //       payload: {
  //         error: 'Please try again'
  //       }
  //     });
  //   }
  // },

  getVenueSelectionsForDateOpt: (data, history) => async (dispatch) => {
    try {
      dispatch({
        type: RACEOPT_FETCH_STARTED,
      });
      let response = await getVenueselectionsOpt(data);
      if (response.status === 200) {
        let goToRace = response.data.trackInfo[0];
        let nToJump = await NextTojump(data);
        let info = nToJump.info;
        for (let i = 0; i < info.length; i++) {
          let race = info[i];
          if (response.data.trackInfo[0].track_name === race.track_name) {
            goToRace = race;
            break;
          }
        }
        dispatch({
          type: RACEOPT_FETCH_SUCCESS,
          payload: {
            data: response.data.trackInfo,
            horses: response.data.horses,
            dateVenues: response.data.venues,
            point_id: response.data.point_id,
            generationTime: response.data.generationTime,
            allDayResult: response.data.allDayResult,
            loadNewRace: true,
          },
        });
        history.push(
          `/horse-racing-tips/${checkRouteDate(
            moment(goToRace.meetdate)
              .tz("Australia/Sydney")
              .format("DD-MM-YYYY")
          )}/${goToRace.track_name}/R${goToRace.race_num}/${goToRace.point_id}`
        );
      } else {
        dispatch({
          type: RACEOPT_FETCH_ERROR,
          payload: {
            error: response.message,
          },
        });
      }
    } catch (error) {
      //console.log(error)
      dispatch({
        type: RACEOPT_FETCH_ERROR,
        payload: {
          error: "Please try again",
        },
      });
      dispatch({
        type: STATS_FETCH_ERROR,
      });
    }
  },

  /******************************************************************************************** */
  /******************************************************************************************** */
  /******************************************************************************************** */

  getRaces: (date, trackcode) => async (dispatch) => {
    try {
      dispatch({
        type: GET_RACES_STARTED,
      });

      await getRaces(date, trackcode).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: GET_RACES_SUCCESS,
            payload: {
              data: response.data,
            },
          });
        } else {
          dispatch({
            type: GET_RACES_ERROR,
            payload: {
              error: "Error getting races.",
            },
          });
        }
      });
    } catch (error) {
      //console.log(error)
      dispatch({
        type: GET_RACES_ERROR,
        payload: {
          error: "Please try again",
        },
      });
    }
  },
  getRacesByDate: (date) => async (dispatch) => {
    try {
      dispatch({
        type: RACES_BY_DATE_STARTED,
      });

      await getRacesByDate(date).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: RACES_BY_DATE_SUCCESS,
            payload: {
              data: response.data,
            },
          });
        } else {
          dispatch({
            type: RACES_BY_DATE_ERROR,
            payload: {
              error: "ERROR",
            },
          });
        }
      });
    } catch (error) {
      //console.log(error)
      dispatch({
        type: RACES_BY_DATE_ERROR,
        payload: {
          error: "Please try again",
        },
      });
    }
  },
  getFormings: (data) => async (dispatch) => {
    try {
      dispatch({
        type: FORMING_STARTED,
      });

      await getFormings(data).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: FORMING_SUCCESS,
            payload: {
              data: response.data,
            },
          });
        } else {
          dispatch({
            type: FORMING_ERROR,
            payload: {
              error: "ERROR",
            },
          });
        }
      });
    } catch (error) {
      //console.log(error)
      dispatch({
        type: FORMING_ERROR,
        payload: {
          error: "Please try again",
        },
      });
    }
  },

  setLoadingSpeedMap: () => (dispatch) => {
    dispatch({
      type: RACE_FORM_STARTED,
    });
  },

  loadRaceForm: (data) => async (dispatch) => {
    try {
      dispatch({
        type: RACE_FORM_STARTED,
      });

      await loadRaceForm(data).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: RACE_FORM_SUCCESS,
            payload: {
              data: response.data,
            },
          });
        } else {
          dispatch({
            type: RACE_FORM_ERROR,
            payload: {
              error: "ERROR",
            },
          });
        }
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: RACE_FORM_ERROR,
        payload: {
          error: "Please try again",
        },
      });
    }
  },

  loadSingleRace: (data) => async (dispatch) => {
    try {
      dispatch({
        type: LOAD_SINGLE_RACE_STARTED,
      });

      await loadSingleRace(data).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: LOAD_SINGLE_RACE_SUCCESS,
            payload: {
              data: response.data,
            },
          });
        } else {
          dispatch({
            type: LOAD_SINGLE_RACE_ERROR,
            payload: {
              error: "ERROR",
            },
          });
        }
      });
    } catch (error) {
      //console.log(error)
      dispatch({
        type: LOAD_SINGLE_RACE_ERROR,
        payload: {
          error: "Please try again",
        },
      });
    }
  },
  changeTab: (data) => async (dispatch) => {
    dispatch({
      type: CHANGE_RACE_TABS,
      payload: {
        tabs: data,
      },
    });
  },

  resetSpeedMap: (data) => async (dispatch) => {
    // console.log(data)
    if (data === true) {
      dispatch({
        type: RESET_SPEED_MAP_TRUE,
      });
    } else {
      dispatch({
        type: RESET_SPEED_MAP_FALSE,
      });
    }
  },

  setFormingRace: (data) => async (dispatch) => {
    dispatch({
      type: SET_FORMING_RACE_STARTED,
    });

    dispatch({
      type: SET_FORMING_RACE,
      payload: {
        raceInfo: data,
      },
    });
  },

  getAllScratching: (data) => async (dispatch) => {
    try {
      dispatch({
        type: LOAD_SCRATCHINGS_STARTED,
      });

      await getAllScratching(data).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: LOAD_SCRATCHINGS_SUCCESS,
            payload: {
              data: response.data,
            },
          });
        } else {
          dispatch({
            type: LOAD_SCRATCHINGS_ERROR,
          });
        }
      });
    } catch (error) {
      //console.log(error)
      dispatch({
        type: LOAD_SCRATCHINGS_ERROR,
      });
    }
  },
  setLmm: (data) => async (dispatch) => {
    dispatch({
      type: SET_RACE_LMM,
      payload: {
        data: data,
      },
    });
  },

  getRacesResults: (date) => async (dispatch) => {
    dispatch({
      type: STATS_FETCH_STARTED,
    });

    try {
      await GetRaceResultsAnalytics({ date: date }).then((stats) => {
        if (stats.status === 200) {
          dispatch({
            type: STATS_FETCH_SUCCESS,
            payload: {
              data: stats.data,
            },
          });
          
        } else {
          dispatch({
            type: STATS_FETCH_ERROR,
          });
        }
      });
    } catch (err) {
      dispatch({
        type: STATS_FETCH_ERROR,
      });
    }
  },
};

export default raceAction;
