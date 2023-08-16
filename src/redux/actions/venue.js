import {
    getVenueRaces, listVenueComments,
    loadVenues,
} from '../../config/config';

export const VENUE_RACES_STARTED = 'VENUE_RACES_STARTED';
export const VENUE_RACES_SUCCESS = 'VENUE_RACES_SUCCESS'
export const VENUE_RACES_ERROR = 'VENUE_RACES_ERROR';

export const LOAD_VENUES = 'LOAD_VENUES';
export const LOAD_COMMENTS = 'LOAD_COMMENTS';


const venueRacesAction = {
    getRacesInVenue: (data) => async (dispatch) => {
        try {
            dispatch({
                type: VENUE_RACES_STARTED,
            });

            await getVenueRaces(data).then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: VENUE_RACES_SUCCESS,
                        payload: {
                            data: response.data,
                        },
                    });
                } else {
                    dispatch({
                        type: VENUE_RACES_ERROR,
                    });
                }
            })
        } catch (error) {
            //console.log(error)
            dispatch({
                type: VENUE_RACES_ERROR,
            });
        }
    },

    loadVenues: () => async (dispatch) =>{
        try{
            let response = await loadVenues();
            dispatch({
                type: LOAD_VENUES,
                payload:{
                    data: response
                }
            })
        }catch(error){

        }
    },

    listVenueComments: (data) => async (dispatch) => {
        try{
            let response = await listVenueComments(data);
            dispatch({
                type: LOAD_COMMENTS,
                payload:{
                    data: response,
                }
            })
        }catch(error){

        }
    }
}

export default venueRacesAction;