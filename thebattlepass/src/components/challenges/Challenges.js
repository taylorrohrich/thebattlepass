import React from "react";
import { CSSTransition } from "react-transition-group";

import ChallengesHeader from "./ChallengesHeader";
import { mapChallengeCollections } from "./../../utils";

import "./challenges.scss";

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
            {mapChallengeCollections(
              challenges,
              selected,
              switchAndUpdate,
              style
            )}
          </div>
        </CSSTransition>
      </div>
    );
  }
}

export default Challenges;
