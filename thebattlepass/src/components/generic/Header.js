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
          margin={!width || width >= 1200 ? 10 : 0}
          dimension={!width || width >= 1200 ? 55 : 40}
        />
      </Link>
    </div>
  );
};

export default Header;
