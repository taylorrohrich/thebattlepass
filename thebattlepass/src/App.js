import React from "react";
import { Provider } from "react-redux";
import netlifyIdentity from "netlify-identity-widget";

import store from "./redux/store";
import Routes from "./components/routes";

import "./index.scss";

window.netlifyIdentity = netlifyIdentity;
netlifyIdentity.init();

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};
export default App;
