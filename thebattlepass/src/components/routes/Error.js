import React from "react";
import { Link } from "react-router-dom";

import { Image } from "./../generic";

import "./routes.scss";

const getErrorMessage = type => {
  switch (type) {
    case "construction":
      return "This page is under construction. Try back in a bit!";
    default:
      return "Something went wrong...";
  }
};
const Error = props => {
  const type = props.match.params.type;
  return (
    <div className="flex-one align-center flex-column justify-center color-white">
      <Image source="battlebadgeGrey" dimension={100} />
      <div className="xl">{getErrorMessage(type)}</div>
      <Link className="xl remove-link-styling" to="/">
        <div className="color-lightblue1">Go Back</div>
      </Link>
    </div>
  );
};
export default Error;
