import { updateOdds } from '../../config/config'

export const updateOdds_STARTED = 'updateOdds_STARTED';
export const updateOdds_SUCCESS = 'updateOdds_SUCCESS';
export const updateOdds_ERROR = 'updateOdds_ERROR';

const actions = {

    UpdateOdds: (data) => async (dispatch) => {
        try {
            dispatch({
                type: updateOdds_STARTED,
            });

            await updateOdds(data).then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: updateOdds_SUCCESS,
                    });
                } else {
                    dispatch({
                        type: updateOdds_ERROR,
                        payload: {
                            error: response.data.message,
                        }
                    });
                }
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: updateOdds_ERROR,
                payload: {
                    error: 'Please try again'
                }
            });
        }
    },
}


export default actions;