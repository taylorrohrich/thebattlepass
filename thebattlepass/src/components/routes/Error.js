import React from "react";
import { Link } from "react-router-dom";

import "./routes.scss";

const Error = () => {
  return (
    <div className="flex-one align-center flex-column justify-center color-white">
      <div className="xl">Something went wrong...</div>
      <Link className="xl remove-link-styling" to="/">
        <div className="color-darkblue1">Go Back</div>
      </Link>
    </div>
  );
};
export default Error;
