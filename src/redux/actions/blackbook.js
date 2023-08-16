import { getBlackbook, deleteFromBlackBook, deleteFromBlackBookJ, addToBlackBook, addToBlackBookJ} from '../../config/config'
import { toast } from 'react-toastify'
//import moment from 'moment-timezone'

export const BLACKBOOK_REQUEST = 'BLACKBOOK_REQUEST';
export const BLACKBOOK_SUCCESS = 'BLACKBOOK_SUCCESS';
export const BLACKBOOK_ERROR = 'BLACKBOOK_ERROR';

export const ADDBLACKBOOK_REQUEST = 'ADDBLACKBOOK_REQUEST';
export const ADDBLACKBOOK_SUCCESS = 'ADDBLACKBOOK_SUCCESS';
export const ADDBLACKBOOK_ERROR = 'ADDBLACKBOOK_ERROR';


const actions = {
    getMyBlackbook: (data) => async (dispatch) => {
        try {
            dispatch({
                type: BLACKBOOK_REQUEST,
            });

            const headers = {
                headers: { Authorization: `PTPTIPS ` + localStorage.getItem('PTPToken') }
            };

            await getBlackbook(data, headers).then((resp) => {
                //console.log('BLACKBOOK', resp.data)
                if (resp.status === 200) {
                    dispatch({
                        type: BLACKBOOK_SUCCESS,
                        payload: {
                            blackbook: resp.data[0],
                            jockeyBook: resp.data[1]
                        },
                    });
                } else {
                    dispatch({
                        type: BLACKBOOK_ERROR,
                    });
                }
            })
        } catch (error) {
            console.log("BLACKBOOK GET ERROR", error.response)
            dispatch({
                type: BLACKBOOK_ERROR,
            });
        }
    },

    addBlackBook: (data) => async (dispatch) => {
        try {
            dispatch({
                type: ADDBLACKBOOK_REQUEST,
            });

            const headers = {
                headers: { Authorization: `PTPTIPS ` + localStorage.getItem('PTPToken') }
            };

            await addToBlackBook(data, headers).then((response) => {
                //console.log('BLACKBOOK', response.status)
                if (response.status === 200) {
                    dispatch({
                        type: ADDBLACKBOOK_SUCCESS,
                    });
                    toast.success(response.message)
                } else {
                    dispatch({
                        type: ADDBLACKBOOK_ERROR,
                    });
                    toast.error('Please check your blackbook detailss')
                }
            })
        } catch (error) {
            console.log('BLACKBOOK ERROR', error)
            dispatch({
                type: ADDBLACKBOOK_ERROR,
            });
            toast.error('Please check your blackbook details')
        }
    },

    deleteBlackBook: (data) => async (dispatch) => {
        try {
            dispatch({
                type: ADDBLACKBOOK_REQUEST,
            });

            const headers = {
                headers: { Authorization: `PTPTIPS ` + localStorage.getItem('PTPToken') }
            };

            await deleteFromBlackBook(data, headers).then((response) => {
                //console.log('delete response', response, data)
                if (response.status === 200) {
                    dispatch({
                        type: ADDBLACKBOOK_SUCCESS,
                    });
                    dispatch(actions.getMyBlackbook({ client_id: data.client_id }))
                    toast.success('Deleted from blackbook')
                } else {
                    dispatch({
                        type: ADDBLACKBOOK_ERROR,
                    });
                    toast.error('Error, please try again or refresh the page')
                }
            })
        } catch (error) {
            dispatch({
                type: ADDBLACKBOOK_ERROR,
            });
            toast.error('Error, please try again or refresh the page')
        }
    },

    deleteBlackBookJ: (data) => async (dispatch) => {
        try {
            dispatch({
                type: ADDBLACKBOOK_REQUEST,
            });

            const headers = {
                headers: { Authorization: `PTPTIPS ` + localStorage.getItem('PTPToken') }
            };

            await deleteFromBlackBookJ(data, headers).then((response) => {
                //console.log('delete response', response, data)
                if (response.status === 200) {
                    dispatch({
                        type: ADDBLACKBOOK_SUCCESS,
                    });
                    dispatch(actions.getMyBlackbook({ client_id: data.client_id }))
                    toast.success('Deleted from blackbook')
                } else {
                    dispatch({
                        type: ADDBLACKBOOK_ERROR,
                    });
                    toast.error('Error, please try again or refresh the page')
                }
            })
        } catch (error) {
            dispatch({
                type: ADDBLACKBOOK_ERROR,
            });
            toast.error('Error, please try again or refresh the page')
        }
    },

    addBlackBookJ: (data) => async (dispatch) => {
        try {
            dispatch({
                type: ADDBLACKBOOK_REQUEST,
            });

            const headers = {
                headers: { Authorization: `PTPTIPS ` + localStorage.getItem('PTPToken') }
            };

            await addToBlackBookJ(data, headers).then((response) => {
                // console.log('BLACKBOOK JOCKEY', response.status)
                if (response.status === 200) {
                    dispatch({
                        type: ADDBLACKBOOK_SUCCESS,
                    });
                    toast.success(response.message)
                } else {
                    dispatch({
                        type: ADDBLACKBOOK_ERROR,
                    });
                    toast.error('Please check your blackbook details')
                }
            })
        } catch (error) {
            console.log('BLACKBOOK ERROR', error)
            dispatch({
                type: ADDBLACKBOOK_ERROR,
            });
            toast.error('Please check your blackbook details')
        }
    },

}

export default actions;

