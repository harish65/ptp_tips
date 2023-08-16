// import raceSelected from '../../config/config'

// export const raceSelected_STARTED = 'raceSelected_STARTED';
// export const raceSelected_SUCCESS = 'raceSelected_SUCCESS';
// export const raceSelected_ERROR = 'raceSelected_ERROR';

// const actions = {

//     raceSelected: (data) => async (dispatch) => {
//         try {
//             dispatch({
//                 type: raceSelected_STARTED,
//             });
//             await raceSelected(data).then((response) => {
//                 console.log(response)
//                 dispatch({
//                     type: raceSelected_SUCCESS,
//                     payload: {
//                         point_id: response.data.point_id,
//                     },
//                 });
//             })
//         } catch (error) {
//             console.log(error)
//             dispatch({
//                 type: raceSelected_ERROR,
//                 payload: {
//                     error: 'Please try again'
//                 }
//             });
//         }
//     },
// }


// export default actions;