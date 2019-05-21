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
import { wrapComponent, PrivateRoute } from "./../../utils";

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
            <PrivateRoute
              exact
              path="/moderator/"
              component={wrapComponent(Moderator)}
            />
            <Route exact path="/login" component={Authentication} />
            <Route component={Error} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default Routes;
