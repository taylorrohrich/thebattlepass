import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Routes from "./components/routes";

import "./index.scss";

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};
export default App;
