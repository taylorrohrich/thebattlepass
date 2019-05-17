import React from "react";
import { CSSTransition } from "react-transition-group";

import ChallengesHeader from "./ChallengesHeader";
import ChallengeCollection from "./ChallengeCollection";
import "./challenges.scss";

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
const mapChallenges = (challenges, selected, switchSelected, style) => {
  return ["metaChallenges", "bpChallenges", "freeChallenges"].map(
    (key, index) => {
      const challengeSet = challenges[key];
      const header = getHeader(key);
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
    },
    []
  );
};
class Challenges extends React.Component {
  render() {
    const {
        event,
        switchToggle,
        seasonNumber,
        index,
        selected,
        switchSelected,
        switchIsUpdated
      } = this.props,
      { challenges, title, toggle, style } = event;
    if (!selected) {
      return <div />;
    }
    const keyOne = `${seasonNumber}-${index}`;
    const switchAndUpdate = (keyOne, keyTwo) => {
      switchSelected(keyOne, keyTwo);
      switchIsUpdated(true);
    };
    return (
      <div className="challengesContainer flex-column ">
        <ChallengesHeader
          toggle={toggle}
          isSelected={selected[keyOne].selected}
          headerOne={`Season ${seasonNumber}`}
          headerTwo={title}
          callbackRight={() => switchToggle(index)}
          callbackLeft={() => switchAndUpdate(keyOne)}
          style={style}
        />
        <CSSTransition
          unmountOnExit
          timeout={500}
          in={toggle}
          classNames="slide"
        >
          <div className="challengesBody">
            {mapChallenges(challenges, selected, switchAndUpdate, style)}
          </div>
        </CSSTransition>
      </div>
    );
  }
}

export default Challenges;
