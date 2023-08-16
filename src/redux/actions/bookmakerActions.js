import { fetchBookmakersAPIService } from '../../config/config'
import { toast } from 'react-toastify'

export const BOOK_MAKERS_FETCH_START = 'BOOK_MAKERS_FETCH_START';
export const BOOK_MAKER_FETCH_SUCCESS = 'BOOK_MAKER_FETCH_SUCCESS';
export const BOOK_MAKER_FETCH_ERROR = 'BOOK_MAKER_FETCH_ERROR';

//  fxn in case data comes in string format
// eslint-disable-next-line no-unused-vars
const bookmakerObj = async (rows) => {
    let newArr = [];
    // eslint-disable-next-line array-callback-return
    await rows.map((item) => {
        let obj = {
            id: item?.id,
            basicInfo: JSON.parse(item?.basicInfo),
            rating: item?.rating,
            shortDescription: item?.shortDescription,
            expertReview: item?.expertReview,
            website: JSON.parse(item?.web_site),
            mobileApps: JSON.parse(item?.mobile_Apps),
            signUpBonus: item?.signUpBonus,
            salientFeatures: JSON.parse(item?.salient_features),
            pros: JSON.parse(item?.pros_bs),
            cons: JSON.parse(item?.cons_bs),
            contactSupport: JSON.parse(item?.contact_support),
            licenseAndSecurity: JSON.parse(item?.license_security),
            registrationProcess: JSON.parse(item?.registration_process),
            verificationProcess: JSON.parse(item?.verification_process),
            paymentMethods: JSON.parse(item?.payment_methods),
        }
        newArr.push(obj)
    })
    return newArr;
}

const ACTIONS = {
    // fetch all bookmakers data
    fetchBookmakersData: () => async (dispatch) => {
        try {
            dispatch({ type: BOOK_MAKERS_FETCH_START });
            const res = await fetchBookmakersAPIService();
            if (res.status === 200) {
                // const rows = await bookmakerObj(res.data.data);
                dispatch({ type: BOOK_MAKER_FETCH_SUCCESS, payload: { data: res.data.data }, });
            } else {
                dispatch({ type: BOOK_MAKER_FETCH_ERROR });
                toast.error("Error in fetching Bookmaker List");
            }
            return res.data;
        } catch (error) {
            dispatch({ type: BOOK_MAKER_FETCH_ERROR });
            toast.error('Error in fetching Bookmaker List' + error);
        }
    },
};




export default ACTIONS;
