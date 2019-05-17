import React from "react";
import { Link } from "react-router-dom";

import { Image } from "./../generic";

import "./header.scss";

const Header = () => {
  return (
    <div className="flex-row flex-start headerContainer">
      <Link to="/">
        <Image source="battlebadge" dimension={75} />
      </Link>
    </div>
  );
};

export default Header;
