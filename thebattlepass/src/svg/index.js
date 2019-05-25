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
    case "menu":
      svg = {
        viewBox: "0 0 73.168 73.168",
        path: (
          <path
            d="M4.242,14.425h64.684c2.344,0,4.242-1.933,4.242-4.324c0-2.385-1.898-4.325-4.242-4.325H4.242     C1.898,5.776,0,7.716,0,10.101C0,12.493,1.898,14.425,4.242,14.425z M68.926,32.259H4.242C1.898,32.259,0,34.2,0,36.584     c0,2.393,1.898,4.325,4.242,4.325h64.684c2.344,0,4.242-1.933,4.242-4.325C73.168,34.2,71.27,32.259,68.926,32.259z      M68.926,58.742H4.242C1.898,58.742,0,60.683,0,63.067c0,2.393,1.898,4.325,4.242,4.325h64.684c2.344,0,4.242-1.935,4.242-4.325     C73.168,60.683,71.27,58.742,68.926,58.742z"
            fill={color}
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
      transform={`rotate(${rotate || 0})`}
    >
      <g>
        <g>{svgShape.path}</g>
      </g>
    </svg>
  );
};
export default svg;
