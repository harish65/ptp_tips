/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import reducers from "../reducers/reducers";
import thunk from "redux-thunk";

// Configure persistor
const persistConfig = {
  key: "ptp-user",
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["modalReducer"],
};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const configureStore = () => {
  const pReducer = persistReducer(persistConfig, reducers);
  return createStore(pReducer, composeEnhancer(applyMiddleware(thunk)));
};

export const configurePersistor = (store) => persistStore(store);
