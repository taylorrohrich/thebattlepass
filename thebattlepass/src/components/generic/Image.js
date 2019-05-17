import React from "react";

import images from "./../../images";
import Svg from "./../../svg";
import { colors } from "./../../styles";

const Image = props => {
  const {
    dimension,
    source,
    text,
    margin,
    textColor,
    imageColor,
    svg,
    rotate
  } = props;
  return (
    <div
      className={"flex-column justify-center align-center"}
      style={{ margin }}
    >
      {getImage(source, svg, imageColor, dimension, rotate)}
      <b className={`color-${textColor}`}>{text}</b>
    </div>
  );
};
const getColor = imageColor => {
  if (imageColor.charAt(0) === "#") {
    return imageColor;
  }
  return colors[imageColor];
};
const getImage = (source, svg, imageColor, dimension, rotate) => {
  if (svg) {
    return (
      <Svg
        color={getColor(imageColor)}
        dimension={dimension}
        rotate={rotate}
        shape={source}
      />
    );
  } else {
    return (
      <img
        alt=""
        style={{ width: dimension, height: dimension }}
        src={images[source]}
      />
    );
  }
};
export default Image;
