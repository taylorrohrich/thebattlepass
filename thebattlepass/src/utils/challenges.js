import React from "react";
import ChallengeCollection from "./../components/challenges/ChallengeCollection";
import Challenge from "./../components/challenges/Challenge";

const getHeader = challengeType => {
  let title = null;
  let image = null;
  switch (challengeType) {
    case "bpChallenges":
      image = "battlebadge";
      title = "BATTLE PASS CHALLENGES";
      break;
    case "freeChallenges":
      image = "battlebadgeGrey";
      title = "FREE CHALLENGES";
      break;
    default:
      image = null;
      title = null;
  }
  return title && { title, image };
};
const mapChallengeCollections = (
  challenges,
  selected,
  switchSelected,
  style
) => {
  return ["metaChallenges", "bpChallenges", "freeChallenges"].map(
    (key, index) => {
      const challengeSet = challenges[key];
      const header = getHeader(key);
      if (challengeSet.length) {
        return (
          <ChallengeCollection
            key={`challengeCollection-${index}`}
            style={key === "metaChallenges" && style}
            header={header}
            challenges={challengeSet}
            type={key}
            selected={selected}
            switchSelected={switchSelected}
          />
        );
      }
      return null;
    },
    []
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

export { mapChallenges, mapChallengeCollections };
