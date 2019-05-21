import React from "react";
import { Link } from "react-router-dom";

import Image from "./Image";

import "./generic.scss";

const Header = props => {
  const { width } = props;
  return (
    <div className="flex-row flex-start headerContainer">
      <Link to="/">
        <Image
          className="headerIcon"
          source="battlebadge"
          dimension={!width || width >= 800 ? 75 : 40}
        />
      </Link>
    </div>
  );
};

export default Header;