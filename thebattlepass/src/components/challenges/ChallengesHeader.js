import React from "react";
import { CSSTransition } from "react-transition-group";

import { Image } from "./../generic";
import { template } from "./../../styles";

import "./challenges.scss";

const ChallengesHeader = props => {
  const {
    headerOne,
    headerTwo,
    callbackLeft,
    callbackRight,
    toggle,
    isSelected,
    style
  } = props;
  const theme = template[style];
  return (
    <div
      style={{ backgroundColor: theme[0], borderColor: theme[1] }}
      className="challengesHeader justify-space-between flex-row align-center"
    >
      <div className="justify-start flex-row align-center">
        <div className="pointer" onClick={callbackLeft}>
          <Image
            margin={20}
            source="circle"
            svg={true}
            dimension={30}
            imageColor={isSelected ? "white" : theme[3]}
          />
        </div>
        <div>
          <div style={{ color: theme[2] }} className="l font-luckiest-guy">
            {headerOne}
          </div>
          <div className="xl font-luckiest-guy">
            <b>{headerTwo}</b>
          </div>
        </div>
      </div>
      <div className="pointer" onClick={callbackRight}>
        <CSSTransition timeout={500} in={toggle} classNames="rotate">
          <Image
            margin={20}
            source="arrow"
            svg={true}
            dimension={30}
            rotate={180}
            imageColor={toggle ? "white" : theme[3]}
          />
        </CSSTransition>
      </div>
    </div>
  );
};
export default ChallengesHeader;
