import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Season from "./../season";
import Moderator from "./../moderator";
import Error from "./Error";
import Authentication from "./../authentication";
import { PrivateRoute } from "./../../utils";

class Routes extends React.Component {
  componentDidMount() {
    const { updateWidth } = this.props;
    window.addEventListener("resize", () => {
      setTimeout(() => updateWidth(window.innerWidth), 300);
    });
  }
  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Redirect exact from="/" to="/season/" />}
            />
            <Route exact path="/season/:number?" component={Season} />
            <PrivateRoute exact path="/moderator/" component={Moderator} />
            <Route exact path="/login" component={Authentication} />
            <Route exact path="/error/:type?" component={Error} />
            <Route
              exact
              path="/contact"
              render={() => (
                <Redirect exact from="/contact" to="/error/construction" />
              )}
            />
            <Route
              exact
              path="/subscribe"
              render={() => (
                <Redirect exact from="/subscribe" to="/error/construction" />
              )}
            />
            <Route render={() => <Redirect exact from="/" to="/error" />} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default Routes;
