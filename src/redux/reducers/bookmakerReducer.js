import {
    BOOK_MAKERS_FETCH_START,
    BOOK_MAKER_FETCH_SUCCESS,
    BOOK_MAKER_FETCH_ERROR,
  } from '../actions/bookmakerActions';
  
  const initialState = {
    bookmakerData: null,
    isProcessing: false,
    bookmakerList: null,
    error: ""
  };
  
  
  function bookMakerReducer(state = initialState, action) {
    switch (action.type) {
      // ============================ Bookmakers Fetching ============================
      case BOOK_MAKERS_FETCH_START:
        return Object.assign({}, state, {
          isProcessing: true,
        });
  
      case BOOK_MAKER_FETCH_SUCCESS:
        return {
          ...state,
          bookmakerData: action.payload.data,
          isProcessing: false,
          error: null
        };
      case BOOK_MAKER_FETCH_ERROR:
        return {
          ...state,
          isProcessing: false,
          error: 'Fetch Failed'
        };
  
     
  
      default:
        return state;
    }
  }
  
  export default bookMakerReducer;
  
  
  