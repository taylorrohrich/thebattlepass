import React from "react";
import netlifyIdentity from "netlify-identity-widget";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        const user = netlifyIdentity.currentUser();
        return user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

const netlifyAuth = {
  authenticate(callback) {
    netlifyIdentity.open();
    netlifyIdentity.on("login", user => {
      callback(user);
      netlifyIdentity.close();
    });
  },
  signout(callback) {
    this.isAuthenticated = false;
    netlifyIdentity.logout();
    netlifyIdentity.on("logout", () => {
      callback();
    });
  }
};

export { PrivateRoute, netlifyAuth };
