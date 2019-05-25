import React from "react";

import { Footer, Header, Navbar, Disqus } from "./../components/generic";
import { getNewSelected } from "./season";

import "./utils.scss";

const wrapComponent = (Component, params = {}) => {
  return props => {
    const seasonNumber = props.match.params.number;
    return (
      <div className="flex-one flex-column ">
        <Navbar />
        <Header width={props.width} />
        <div className="pageBody flex-one flex-column">
          <Component {...props} />
          {params.disqus && (
            <div className="disqus">
              <Disqus
                title={`Season ${seasonNumber}`}
                path={props.location.pathname}
                id={props.location.pathname}
              />
            </div>
          )}
          <Footer />
        </div>
      </div>
    );
  };
};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result.replace(/^data:(.*;base64,)?/, "");
      if (encoded.length % 4 > 0) {
        encoded += "=".repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = error => reject(error);
  });
}

const updateLocalStorage = (seasonNumber, keyOne, keyTwo) => {
  const local = JSON.parse(localStorage.getItem("season" + seasonNumber));
  const newLocal = getNewSelected(local, keyOne, keyTwo);
  localStorage.setItem("season" + seasonNumber, JSON.stringify(newLocal));
};
export { wrapComponent, getBase64, updateLocalStorage };
