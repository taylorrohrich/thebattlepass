import React from "react";

import { Image } from "./../generic";
import { template } from "./../../styles";

import "./challenges.scss";

const Challenge = props => {
  const {
    title,
    count,
    rewardCount,
    rewardType,
    stage,
    total,
    isSelected,
    callback,
    style
  } = props;
  const theme = template[style];
  return (
    <div
      style={{ backgroundColor: theme && theme[0], color: theme && theme[2] }}
      className="challenge background-darkblue2 flex-row justify-space-between"
    >
      <div className="flex-row justify-space-between align-center flex-one">
        <div className="pointer" onClick={callback}>
          <Image
            dimension={20}
            source={"circle"}
            svg={true}
            imageColor={
              isSelected ? (theme ? theme[3] : "darkblue3") : "lightgrey1"
            }
          />
        </div>
        <div className="flex-one challengeText ">
          <div className="m">
            {total && (
              <b className="color-white">
                Stage {stage} of {total}
              </b>
            )}
            <b>
              {total && " - "} {title}
            </b>
          </div>
          <div className="flex-row justify-space-between align-center flex-one">
            <div
              style={{ backgroundColor: theme && theme[3] }}
              className="challengeProgressBar background-darkblue3"
            />

            {count !== null && (
              <b>
                <span className="color-white">0</span> / {count}
              </b>
            )}
          </div>
        </div>
      </div>
      <div className="flex-row justify-space-between">
        {rewardType !== "none" && (
          <Image
            dimension={40}
            source={rewardType}
            textColor="white"
            text={rewardCount}
          />
        )}
      </div>
    </div>
  );
};
export default Challenge;
