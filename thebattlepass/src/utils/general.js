import React from "react";

import Navbar from "./../components/navbar";
import Footer from "./../components/footer";
import Header from "./../components/header";
import Disqus from "./../components/disqus";

import "./utils.scss";

const wrapComponent = (Component, disqus) => {
  return props => {
    const seasonNumber = props.match.params.number;
    return (
      <div className="flex-one flex-column ">
        {/* <Navbar /> */}
        <Header />
        <div className="pageBody flex-one flex-column">
          <Component {...props} />
          {disqus && (
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
export { wrapComponent };
