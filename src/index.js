import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { configurePersistor, configureStore } from "./redux/store/store";
import { doInit } from "./redux/actions/auth";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

/* SERVICE WORKER */
//import swDev from './workerDev'
//import * as serviceWorker from "./serviceWorker";

// import ReactPixel from 'react-facebook-pixel';

import App from "./components/App";
// import Login from './pages/loginMobile/index'
import "./styles/style.scss";

// Redux setup
const store = configureStore();
const persistor = configurePersistor(store);
const wrapper = document.getElementById("root");
const stripePromise = loadStripe("pk_test_eb8wQrYMUW2i0PyZiwt3FPhu005L3aAq1b");

// //Facebook Pixel Config
// const options = {
//   autoConfig: true, // set pixel's autoConfig
//   debug: false, // enable logs
// };
// ReactPixel.init('482416239282809', options)
// ReactPixel.pageView(); // For tracking page view

store.dispatch(doInit());
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<div />} persistor={persistor}>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  wrapper
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//erviceWorker.register();
//swDev()
