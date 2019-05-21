import React from "react";
import { Provider } from "react-redux";
import netlifyIdentity from "netlify-identity-widget";
import ReactGA from "react-ga";

import store from "./redux/store";
import Routes from "./components/routes";

import "./index.scss";

const googleAnalyticsId = process.env.REACT_APP_GOOGLE_ANALYTICS_ID;

window.netlifyIdentity = netlifyIdentity;
netlifyIdentity.init();
ReactGA.initialize(googleAnalyticsId);

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};
export default App;
