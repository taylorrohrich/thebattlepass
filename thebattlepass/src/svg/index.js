import React from "react";
const getShape = (shape, color) => {
  let svg = null;
  switch (shape) {
    case "circle":
      svg = {
        viewBox: "0 0 510 510",
        path: (
          <path
            fill={color}
            d="M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z"
          />
        )
      };
      break;
    case "arrow":
      svg = {
        viewBox: "0 0 306 306",
        path: (
          <polygon
            fill={color}
            points="94.35,0 58.65,35.7 175.95,153 58.65,270.3 94.35,306 247.35,153   "
          />
        )
      };
      break;
    case "plus":
      svg = {
        viewBox: "0 0 357 357",
        path: (
          <path
            fill={color}
            d="M357,204H204v153h-51V204H0v-51h153V0h51v153h153V204z"
          />
        )
      };
      break;
    default:
      svg = null;
  }
  return svg;
};

const svg = props => {
  const { color, dimension, rotate, shape } = props,
    svgShape = getShape(shape, color);
  return (
    <svg
      width={`${dimension}px`}
      height={`${dimension}px`}
      viewBox={svgShape.viewBox}
      transform={`rotate(${rotate || 90})`}
    >
      <g>
        <g>{svgShape.path}</g>
      </g>
    </svg>
  );
};
export default svg;
