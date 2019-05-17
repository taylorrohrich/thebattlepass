import React from "react";

import { Image } from "./../generic";
import Challenge from "./Challenge";
import "./challenges.scss";

const getHeader = header => {
  const { title, image } = header;
  return (
    <div className="challengesCollectionHeader flex-row justify-start align-center">
      <Image margin={10} dimension={50} source={image} />
      <div className="color-beige">
        <b>{title}</b>
      </div>
    </div>
  );
};
const mapChallenges = (challenges, type, selected, switchSelected, style) => {
  return challenges.map((challenge, index) => {
    const {
      title,
      count,
      color,
      rewardCount,
      rewardType,
      stage,
      total,
      keyOne,
      keyTwo
    } = challenge;
    const isSelected = selected[keyOne][keyTwo].selected;
    return (
      <Challenge
        key={`challenge-${index}`}
        title={title}
        count={count}
        color={color}
        rewardCount={rewardCount}
        rewardType={rewardType}
        type={type}
        stage={stage}
        total={total}
        isSelected={isSelected}
        style={style}
        callback={() => switchSelected(keyOne, keyTwo)}
      />
    );
  });
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
