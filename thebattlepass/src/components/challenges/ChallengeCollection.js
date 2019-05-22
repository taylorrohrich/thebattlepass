import React from "react";

import { Image } from "./../generic";
import { mapChallenges } from "./../../utils";

import "./challenges.scss";

const getHeader = header => {
  const { title, image } = header;
  return (
    <div className="challengesCollectionHeader flex-row justify-start align-center">
      <Image margin={10} dimension={40} source={image} />
      <div className="color-beige">
        <b>{title}</b>
      </div>
    </div>
  );
};
const ChallengeCollection = props => {
  const { challenges, header, type, selected, switchSelected, style } = props;
  return (
    <div>
      {header && getHeader(header)}
      {mapChallenges(challenges, type, selected, switchSelected, style)}
    </div>
  );
};
export default ChallengeCollection;
