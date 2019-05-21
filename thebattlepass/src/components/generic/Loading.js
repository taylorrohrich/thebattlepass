import React from "react";

import Image from "./Image";

import "./generic.scss";
const Loading = () => {
  return (
    <div className="loadingContainer flex-column align-center justify-center">
      <div className="loadingIcon">
        <Image source="battlebadgeGrey" dimension={100} />
      </div>
    </div>
  );
};
export default Loading;
