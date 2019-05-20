import React from "react";
import { Redirect } from "react-router-dom";

import { netlifyAuth } from "./../../utils";

import "./authentication.scss";

class Authentication extends React.Component {
  state = { redirectToReferrer: false };

  login = () => {
    netlifyAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div className="flex-one align-center flex-column justify-center color-white">
        <div className="xl">
          You must log in to view the page at {from.pathname}
        </div>
        <div className="color-darkblue1 xl pointer" onClick={this.login}>
          Log in
        </div>
      </div>
    );
  }
}
export default Authentication;
